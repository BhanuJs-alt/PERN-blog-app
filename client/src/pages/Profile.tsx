import useAuth from "../hooks/useAuth";

export const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">Profile</h1>
      <p>{user?.name}</p>
      <p>{user?.id}</p>
      <p>{user?.email}</p>
    </div>
  );
};
