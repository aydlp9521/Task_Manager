import { useNavigate, useLocation } from "react-router-dom";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/");
  };

  const menuClass = (path) =>
    `w-full text-left px-5 py-3 rounded-xl text-lg font-medium transition
    ${
      location.pathname === path
        ? "bg-blue-700 shadow-md"
        : "hover:bg-blue-500"
    }`;

  return (
    <div className="fixed top-0 left-0 w-[300px] h-screen bg-blue-600 text-white p-6 flex flex-col justify-between shadow-xl z-50">

      {/* Top Section */}
      <div>
        <h1 className="text-4xl font-bold mb-10">
          Task Manager 🚀
        </h1>

        <div className="space-y-4">

          <button
            onClick={() => navigate("/dashboard")}
            className={menuClass("/dashboard")}
          >
            Dashboard
          </button>

          <button
            onClick={() => navigate("/projects")}
            className={menuClass("/projects")}
          >
            Projects
          </button>

          <button
            onClick={() => navigate("/tasks")}
            className={menuClass("/tasks")}
          >
            Tasks
          </button>

          <button
            onClick={() => navigate("/team")}
            className={menuClass("/team")}
          >
            Team
          </button>

        </div>
      </div>

      {/* Logout Bottom */}
      <button
        onClick={handleLogout}
        className="w-full bg-red-500 hover:bg-red-600 px-5 py-3 rounded-xl text-lg font-semibold transition"
      >
        Logout
      </button>

    </div>
  );
}

export default Sidebar;