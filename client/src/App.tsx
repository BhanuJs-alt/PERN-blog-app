import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Home } from "./pages/Home";
import { Explore } from "./pages/Explore";
import { CreatePost } from "./pages/CreatePost";
import { Profile } from "./pages/Profile";
import { Settings } from "./pages/Settings";
import ProtectedRoute from "./components/ProtectedRoute";
import MainLayout from "./layouts/MainLayout";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
            <Route path="/explore" element={<Explore />} />

            <Route path="/create-post" element={<CreatePost />} />

            <Route path="/profile" element={<Profile />} />

            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
