import { useEffect } from "react"
import api from "./services/api";

function App() {
  
  useEffect(() => {
    const fetchPosts = async () =>{
      try {
        const response = await api.get('/posts');
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    }

    fetchPosts();
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-gray-800">
      <h1 className="text-4xl font-bold">blog_app</h1>
    </div>
  )
}

export default App
