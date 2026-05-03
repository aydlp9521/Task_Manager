import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const API_URL = "http://localhost:5000/api/tasks";

function Tasks() {
  const [tasks, setTasks] = useState([]);
  const [editId, setEditId] = useState(null);
  const [form, setForm] = useState({
    title: "",
    assignedTo: "",
    deadline: ""
  });

  const formatDate = (date) => {
    if (!date) return "";
    return String(date).slice(0, 10);
  };

  const fetchTasks = async () => {
    try {
      const res = await axios.get(API_URL);
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let isMounted = true;

    axios
      .get(API_URL)
      .then((res) => {
        if (isMounted) {
          setTasks(Array.isArray(res.data) ? res.data : []);
        }
      })
      .catch((error) => {
        console.log(error);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async () => {
    try {
      if (!form.title.trim() || !form.assignedTo.trim() || !form.deadline) {
        alert("Please fill all fields");
        return;
      }

      const payload = {
        title: form.title.trim(),
        assignedTo: form.assignedTo.trim(),
        deadline: form.deadline,
        status: "Pending"
      };

      if (editId) {
        await axios.put(`${API_URL}/${editId}`, payload);
      } else {
        await axios.post(API_URL, payload);
      }

      setForm({
        title: "",
        assignedTo: "",
        deadline: ""
      });
      setEditId(null);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.log(error);
    }
  };

  const editTask = (task) => {
    setForm({
      title: task.title || "",
      assignedTo: task.assignedTo || "",
      deadline: formatDate(task.deadline)
    });
    setEditId(task._id);
  };

  const cancelEdit = () => {
    setEditId(null);
    setForm({
      title: "",
      assignedTo: "",
      deadline: ""
    });
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <Sidebar />

      <div className="ml-[300px] p-8 min-h-screen">
        <h1 className="text-5xl font-bold mb-8">Tasks</h1>

        <div className="bg-white rounded-2xl shadow p-8 mb-10">
          <h2 className="text-3xl font-bold mb-6">
            {editId ? "Edit Task" : "Create New Task"}
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={form.title}
            onChange={(e) =>
              setForm({
                ...form,
                title: e.target.value
              })
            }
            className="w-full border p-4 rounded-xl mb-5"
          />

          <input
            type="text"
            placeholder="Assign To"
            value={form.assignedTo}
            onChange={(e) =>
              setForm({
                ...form,
                assignedTo: e.target.value
              })
            }
            className="w-full border p-4 rounded-xl mb-5"
          />

          <input
            type="date"
            value={form.deadline}
            onChange={(e) =>
              setForm({
                ...form,
                deadline: e.target.value
              })
            }
            className="w-full border p-4 rounded-xl mb-6"
          />

          <div className="flex gap-4">
            <button
              onClick={handleSubmit}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold"
            >
              {editId ? "Update Task" : "Add Task"}
            </button>

            {editId && (
              <button
                onClick={cancelEdit}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-4 rounded-xl font-semibold"
              >
                Cancel
              </button>
            )}
          </div>
        </div>

        <h2 className="text-4xl font-bold mb-6">All Tasks</h2>

        {tasks.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500 text-xl">
            No tasks available.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {tasks.map((task) => (
              <div key={task._id} className="bg-white rounded-2xl shadow p-8">
                <h3 className="text-3xl font-bold mb-3">{task.title}</h3>

                <p className="text-lg mb-2">
                  Assigned to: {task.assignedTo}
                </p>

                <p className="text-lg mb-2">
                  Deadline: {formatDate(task.deadline)}
                </p>

                <p className="text-lg mb-6">
                  Status:{" "}
                  <span className="text-orange-500 font-semibold">
                    {task.status}
                  </span>
                </p>

                <div className="flex gap-4">
                  <button
                    onClick={() => editTask(task)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-3 rounded-xl font-semibold"
                  >
                    Edit
                  </button>

                  <button
                    onClick={() => deleteTask(task._id)}
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

export default Tasks;
