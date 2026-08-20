import { useState, type ChangeEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";
import useAuth from "../hooks/useAuth";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState<RegisterForm>({
    name: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { refreshUser } = useAuth();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      await api.post("/auth/register", form);
      await refreshUser();
      navigate("/");
    } catch (error: any) {
      setError("Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <form onSubmit={handleSubmit} className="w-full max-w-md space-y-4 p-6">
        <h1 className="text-3xl font-bold">Create Account</h1>

        {error && <p className="text-red-500">{error}</p>}

        <input
          type="text"
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-3 rounded"
        />

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
          onClick={handleSubmit}
          type="submit"
          disabled={loading}
          className="w-full bg-black text-white p-3 rounded"
        >
          {loading ? "Registring..." : "Register"}
        </button>

        <p>
          Already have an account?{" "}
          <Link to="/login" className="underline">
            Login
          </Link>
        </p>
      </form>
    </div>
  );
}

export default Register;
