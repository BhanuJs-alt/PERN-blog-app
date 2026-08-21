import { Heart, MessageCircle } from "lucide-react";
import type { Post } from "../types/post";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  return (
    <article className="group flex min-h-[220px] gap-6 border-b border-gray-200 py-8">
      {/* Left - Post Content */}
      <div className="flex min-w-0 flex-1 flex-col">
        {/* Author + Date */}
        <div className="mb-3 flex items-center gap-2 text-sm text-gray-500">
          <div className="flex h-7 w-7 items-center justify-center rounded-full bg-gray-200 text-xs font-medium text-gray-700">
            {post.author.name.charAt(0).toUpperCase()}
          </div>

          <span className="font-medium text-gray-700">{post.author.name}</span>

          <span>·</span>

          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
        </div>

        {/* Title */}
        <h2 className="line-clamp-2 text-2xl font-bold leading-tight text-gray-900 transition-colors group-hover:text-gray-600">
          {post.title}
        </h2>

        {/* Content Preview */}
        <p className="mt-3 line-clamp-2 text-base leading-relaxed text-gray-600">
          {post.content}
        </p>

        {/* Bottom Stats */}
        <div className="mt-auto flex items-center gap-6 pt-5 text-sm text-gray-500">
          <div className="flex items-center gap-1.5">
            <Heart size={18} strokeWidth={1.8} />
            <span>{post._count.likes}</span>
          </div>

          <div className="flex items-center gap-1.5">
            <MessageCircle size={18} strokeWidth={1.8} />
            <span>{post._count.comments}</span>
          </div>
        </div>
      </div>

      {/* Right - Image */}
      {post.imageUrl && (
        <div className="w-56 shrink-0">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="h-36 w-full rounded-md object-cover"
          />
        </div>
      )}
    </article>
  );
};

export default PostCard;
