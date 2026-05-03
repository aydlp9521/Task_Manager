import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    if (!email || !password) {
      alert("Please fill all fields");
      return;
    }

    localStorage.setItem("user", "Anand");
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 via-indigo-600 to-purple-700 flex items-center justify-center px-4">

      <div className="w-full max-w-5xl grid md:grid-cols-2 bg-white/10 backdrop-blur-xl rounded-3xl overflow-hidden shadow-2xl">

        {/* Left Side */}
        <div className="hidden md:flex flex-col justify-center p-12 text-white">
          <h1 className="text-5xl font-bold leading-tight mb-6">
            Manage Tasks <br /> Like a Pro 🚀
          </h1>

          <p className="text-lg text-blue-100 mb-8">
            Organize projects, track progress, and
            collaborate with your team in one place.
          </p>

          <div className="space-y-4 text-sm">

            <div className="bg-white/10 p-4 rounded-2xl">
              ✅ Smart Dashboard Analytics
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              ✅ Real-time Task Updates
            </div>

            <div className="bg-white/10 p-4 rounded-2xl">
              ✅ Search, Filter & Productivity Tools
            </div>

          </div>
        </div>

        {/* Right Side */}
        <div className="bg-white p-8 md:p-12">

          <h2 className="text-4xl font-bold text-gray-800 mb-2">
            Welcome Back 👋
          </h2>

          <p className="text-gray-500 mb-8">
            Login to continue your workspace
          </p>

          <input
            type="email"
            placeholder="Enter Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-5 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 p-4 rounded-xl mb-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <div className="flex justify-between items-center mb-6 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              Remember me
            </label>

            <span className="text-blue-600 cursor-pointer">
              Forgot Password?
            </span>
          </div>

          <button
            onClick={handleLogin}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-4 rounded-xl font-semibold hover:scale-[1.02] transition"
          >
            Login
          </button>

          <p className="text-center text-gray-600 mt-6">
            New User?{" "}
            <Link
              to="/register"
              className="text-blue-600 font-bold"
            >
              Create Account
            </Link>
          </p>

        </div>

      </div>

    </div>
  );
}

export default Login;