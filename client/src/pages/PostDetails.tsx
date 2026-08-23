import { useEffect, useState } from "react";
import { ArrowLeft, Heart, MessageCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import api from "../services/api";
import type { Post } from "../types/post";

const PostDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState<Post | null>(null);
  const [liked, setLiked] = useState(false);
  const [likeLoading, setLikeLoading] = useState(false);
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

        const [postResponse, likeResponse] = await Promise.all([
          api.get(`/posts/${id}`),
          api.get(`/likes/status/${id}`),
        ]);

        setPost(postResponse.data.post);
        setLiked(likeResponse.data.liked);
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
            className="max-h-[500px] w-full object-cover"
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
    </article>
  );
};

export default PostDetails;
