import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleRegister = (e) => {
    e.preventDefault();

    if (!form.name || !form.email || !form.password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("user", form.name);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">
      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">
        <div className="hidden md:flex flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Create Your Workspace
          </h1>

          <p className="text-lg text-blue-100 mb-8">
            Plan projects, manage tasks, and keep your team aligned.
          </p>

          <div className="space-y-4 text-sm">
            <div className="bg-white/10 p-4 rounded-2xl">
              Project tracking dashboard
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              Team and task management
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              Simple workspace access
            </div>
          </div>
        </div>

        <div className="bg-white p-8 md:p-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Create Account
          </h2>

          <p className="text-gray-500 mb-8">
            Register to start managing your workspace
          </p>

          <form onSubmit={handleRegister}>
            <input
              type="text"
              name="name"
              placeholder="Enter Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="email"
              name="email"
              placeholder="Enter Email"
              value={form.email}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={form.password}
              onChange={handleChange}
              className="w-full border border-gray-300 p-4 rounded-xl mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold hover:scale-[1.02] transition"
            >
              Register
            </button>
          </form>

          <p className="text-center text-gray-600 mt-6">
            Already have an account?{" "}
            <Link to="/" className="text-blue-600 font-bold">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
