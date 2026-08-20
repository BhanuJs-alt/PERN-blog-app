import { Outlet } from "react-router-dom";
import Sidebar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Sidebar />

      <main className="ml-64 min-h-screen">
        <div className="mx-auto max-w-6xl px-8 py-8">
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainLayout;
