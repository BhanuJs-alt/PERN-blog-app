import { useState, type ChangeEvent, type FormEvent } from "react";
import api from "../services/api";
import { Link, useNavigate } from "react-router-dom";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
  });
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");
      await api.post("/auth/login", form);
      navigate("/");
    } catch (error: any) {
      setError(error.response?.message || "Invalid email or password");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-3xl font-bold">Login</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        <p>
          Don't have an account?{" "}
          <Link to="/register" className="underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Login;
