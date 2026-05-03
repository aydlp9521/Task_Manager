import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const API_URL = "http://localhost:5000/api/projects";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [form, setForm] = useState({
    name: "",
    desc: "",
    deadline: "",
  });
  const [editId, setEditId] = useState(null);

  const fetchProjects = async () => {
    try {
      const res = await axios.get(API_URL);
      setProjects(res.data);
    } catch (error) {
      console.error("Failed to fetch projects:", error);
    }
  };

  useEffect(() => {
    let ignore = false;

    axios
      .get(API_URL)
      .then((res) => {
        if (!ignore) {
          setProjects(res.data);
        }
      })
      .catch((error) => {
        console.error("Failed to fetch projects:", error);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      desc: "",
      deadline: "",
    });
    setEditId(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prevForm) => ({
      ...prevForm,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, {
          ...form,
          status: "Active",
          assignedMembers: [],
        });
      }

      resetForm();
      await fetchProjects();
    } catch (error) {
      console.error("Failed to save project:", error);
    }
  };

  const deleteProject = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchProjects();
    } catch (error) {
      console.error("Failed to delete project:", error);
    }
  };

  const editProject = (project) => {
    setForm({
      name: project.name || "",
      desc: project.desc || "",
      deadline: project.deadline || "",
    });
    setEditId(project._id);
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-[300px] min-h-screen bg-gray-100 p-8">
        <h1 className="text-5xl font-bold mb-8">Project Management</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow p-8 mb-10"
        >
          <h2 className="text-3xl font-bold mb-8">
            {editId ? "Edit Project" : "Create New Project"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Project Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mb-5"
            required
          />

          <textarea
            name="desc"
            rows="4"
            placeholder="Project Description"
            value={form.desc}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mb-5"
            required
          />

          <input
            type="date"
            name="deadline"
            value={form.deadline}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mb-6"
            required
          />

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              {editId ? "Update Project" : "Create Project"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-4xl font-bold mb-6">All Projects</h2>

        {projects.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500 text-xl">
            No projects created yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {projects.map((project) => (
              <div
                key={project._id}
                className="bg-white rounded-2xl shadow p-8"
              >
                <h3 className="text-3xl font-bold mb-3">{project.name}</h3>

                <p className="text-gray-600 text-lg mb-4">{project.desc}</p>

                <p className="mb-2 text-lg">
                  Deadline: {project.deadline || "Not set"}
                </p>

                <p className="mb-6 text-lg">
                  Status:
                  <span className="text-green-600 font-semibold ml-2">
                    {project.status || "Active"}
                  </span>
                </p>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => editProject(project)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteProject(project._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default Projects;
