import useAuth from "../hooks/useAuth";

export const Home = () => {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Blog Home</h1>

      <p className="mt-2">Welcome, {user?.name}</p>
    </div>
  );
};
