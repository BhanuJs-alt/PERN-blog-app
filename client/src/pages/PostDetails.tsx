import { useEffect, useState } from "react";
import { ArrowLeft, Heart, MessageCircle, Send, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import type { Post } from "../types/post";
import type { Comment } from "../types/comment";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState("");
  const [likeLoading, setLikeLoading] = useState(false);
  const [commentSubmitting, setCommentSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostDetails = async () => {
      if (!id) {
        setError("Post ID is missing");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const [postResponse, likeResponse, commentResposnse] =
          await Promise.all([
            api.get(`/posts/${id}`),
            api.get(`/likes/status/${id}`),
            api.get(`/comments/${id}`),
          ]);

        setPost(postResponse.data.post);
        setLiked(likeResponse.data.liked);
        setComments(commentResposnse.data);
      } catch (error) {
        console.error("Error fetching post:", error);
        setError("Unable to load this post.");
      } finally {
        setLoading(false);
      }
    };

    fetchPostDetails();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <p className="text-gray-500">Loading post...</p>
      </div>
    );
  }

  // Error
  if (error || !post) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm text-gray-600 hover:text-black"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        <div className="rounded-lg border border-red-200 bg-red-50 p-6">
          <p className="text-red-600">{error || "Post not found"}</p>
        </div>
      </div>
    );
  }
  //like
  const handleLike = async () => {
    if (likeLoading || !post || !id) {
      return;
    }

    try {
      setLikeLoading(true);

      if (liked) {
        await api.delete(`/likes/unlike/${id}`);
      } else {
        await api.post(`/likes/like/${id}`);
      }

      setLiked(!liked);
      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              _count: {
                ...currentPost._count,
                likes: currentPost._count.likes + (liked ? -1 : 1),
              },
            }
          : currentPost,
      );
    } catch (error) {
      console.error("Unable to update like:", error);
    } finally {
      setLikeLoading(false);
    }
  };

  //comment
  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim() || !id || commentSubmitting) return;

    try {
      setCommentSubmitting(true);
      const response = await api.post(`/comments/${id}`, {
        content: newComment.trim(),
      });

      const createdComment = response.data.comment || response.data;
      setComments((prev) => [createdComment, ...prev]);
      setNewComment("");

      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              _count: {
                ...currentPost._count,
                comments: currentPost._count.comments + 1,
              },
            }
          : currentPost,
      );
    } catch (err) {
      console.error("Failed to post comment:", err);
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleDeleteComment = async (commentId: string) => {
    try {
      await api.delete(`/comments/${commentId}`);
      setComments((prev) => prev.filter((c) => c.id !== commentId));
      setPost((currentPost) =>
        currentPost
          ? {
              ...currentPost,
              _count: {
                ...currentPost._count,
                comments: Math.max(0, currentPost._count.comments - 1),
              },
            }
          : currentPost,
      );
    } catch (err) {
      console.error("Failed to delete comment:", err);
    }
  };

  return (
    <article className="mx-auto max-w-3xl py-6">
      {/* Back */}
      <button
        onClick={() => navigate(-1)}
        className="mb-8 flex items-center gap-2 text-sm text-gray-500 transition hover:text-black"
      >
        <ArrowLeft size={18} />
        Back
      </button>

      {/* Author */}
      <div className="mb-6 flex items-center gap-3">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 font-medium text-gray-700">
          {post.author.name.charAt(0).toUpperCase()}
        </div>

        <div>
          <p className="font-medium text-gray-900">{post.author.name}</p>

          <p className="text-sm text-gray-500">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold leading-tight text-gray-900 md:text-5xl">
        {post.title}
      </h1>

      {/* Image */}
      {post.imageUrl && (
        <div className="mt-8 overflow-hidden rounded-xl">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="max-h-125 w-full object-cover"
          />
        </div>
      )}

      {/* Content */}
      <div className="mt-8 whitespace-pre-wrap text-lg leading-8 text-gray-700">
        {post.content}
      </div>

      {/* Engagement */}
      <div className="mt-10 flex items-center gap-6 border-t border-gray-200 pt-5 text-gray-500">
        <button
          onClick={handleLike}
          disabled={likeLoading}
          aria-label={liked ? "Unlike post" : "Like post"}
          className={`flex items-center gap-2 transition hover:text-red-500 disabled:cursor-not-allowed disabled:opacity-50 ${liked ? "text-red-500" : ""}`}
        >
          <Heart size={20} fill={liked ? "currentColor" : "none"} />
          <span>{post._count.likes}</span>
        </button>

        <button className="flex items-center gap-2 transition hover:text-blue-500">
          <MessageCircle size={20} />
          <span>{post._count.comments}</span>
        </button>
      </div>

      {/* Comments Section */}
      <section className="mt-10 border-t border-gray-100 pt-8">
        <h2 className="text-xl font-bold text-gray-900 mb-6">
          Comments ({comments.length})
        </h2>

        {/* New Comment Input */}
        <form onSubmit={handleCommentSubmit} className="mb-8">
          <div className="flex flex-col gap-3">
            <textarea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="What are your thoughts?"
              className="w-full rounded-lg border border-gray-300 p-3 text-sm focus:border-black focus:outline-none focus:ring-1 focus:ring-black"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!newComment.trim() || commentSubmitting}
                className="flex items-center gap-2 rounded-lg bg-black px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-800 disabled:opacity-50"
              >
                <Send size={15} />
                {commentSubmitting ? "Posting..." : "Comment"}
              </button>
            </div>
          </div>
        </form>

        {/* Comment List */}
        <div className="space-y-6">
          {comments.length === 0 ? (
            <p className="text-sm text-gray-500">
              No comments yet. Be the first to share your thoughts!
            </p>
          ) : (
            comments.map((comment) => (
              <div
                key={comment.id}
                className="flex gap-3 border-b border-gray-100 pb-5"
              >
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-200 text-xs font-semibold text-gray-700">
                  {comment.author.name.charAt(0).toUpperCase()}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-semibold text-sm text-gray-900">
                        {comment.author.name}
                      </span>
                      <span className="ml-2 text-xs text-gray-400">
                        {new Date(comment.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDeleteComment(comment.id)}
                      className="text-gray-400 hover:text-red-500 transition"
                      title="Delete comment"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                  <p className="mt-1 text-sm text-gray-700 whitespace-pre-wrap">
                    {comment.content}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </section>
    </article>
  );
};

export default PostDetails;
