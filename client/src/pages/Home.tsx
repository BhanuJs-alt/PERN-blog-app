import { useState, useEffect } from "react";
import useAuth from "../hooks/useAuth";
import api from "../services/api";
import type { Post } from "../types/post";
import PostCard from "../components/PostCard";

export const Home = () => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await api.get("/posts");

        setPosts(response.data.posts);

        console.log("Fetched posts:", response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (loading) {
    return (
      <div className="mx-auto max-w-3xl py-10">
        <p className="text-gray-500">Loading...</p>
      </div>
    );
  }
  return (
    <div>
      <h1 className="text-3xl font-bold">Blog Home</h1>

      <p className="mt-2 text-gray-500">Welcome, {user?.name}</p>

      <div className="mt-8">
        <h2 className="text-xl font-semibold">Latest Posts</h2>

        <div className="mt-6 space-y-6">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
};
