import { useState, useEffect } from "react";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [title, setTitle] = useState("");
  const [assignTo, setAssignTo] = useState("");
  const [status, setStatus] = useState("Pending");
  const [date, setDate] = useState("");
  const [editIndex, setEditIndex] = useState(null);

  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  /* Add Task */
  const handleAddTask = () => {
    if (!title || !assignTo || !date) {
      alert("Please fill all fields");
      return;
    }

    const newTask = {
      title,
      assignTo,
      status,
      date
    };

    setTasks([...tasks, newTask]);

    setTitle("");
    setAssignTo("");
    setStatus("Pending");
    setDate("");
  };

  /* Delete */
  const handleDelete = (id) => {
    const updated = tasks.filter(
      (_, index) => index !== id
    );
    setTasks(updated);
  };

  /* Edit */
  const handleEdit = (index) => {
    const task = tasks[index];

    setTitle(task.title);
    setAssignTo(task.assignTo);
    setStatus(task.status);
    setDate(task.date);

    setEditIndex(index);
  };

  /* Update */
  const handleUpdateTask = () => {
    const updatedTasks = [...tasks];

    updatedTasks[editIndex] = {
      title,
      assignTo,
      status,
      date
    };

    setTasks(updatedTasks);

    setTitle("");
    setAssignTo("");
    setStatus("Pending");
    setDate("");
    setEditIndex(null);
  };

  /* Counts */
  const completedTasks = tasks.filter(
    (task) => task.status === "Completed"
  ).length;

  const pendingTasks = tasks.filter(
    (task) => task.status === "Pending"
  ).length;

  const overdueTasks = tasks.filter(
    (task) => task.status === "Overdue"
  ).length;

  /* Search + Filter */
  const filteredTasks = tasks.filter((task) => {
    const matchSearch =
      task.title
        .toLowerCase()
        .includes(search.toLowerCase()) ||
      task.assignTo
        .toLowerCase()
        .includes(search.toLowerCase());

    const matchFilter =
      filterStatus === "All" ||
      task.status === filterStatus;

    return matchSearch && matchFilter;
  });

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="ml-[300px] p-8">

        <h1 className="text-4xl font-bold mb-8">
          Welcome Anand 👋
        </h1>

        {/* Cards */}
        <div className="grid md:grid-cols-4 gap-6">

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>Total Tasks</h2>
            <p className="text-4xl font-bold text-blue-600">
              {tasks.length}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>Completed</h2>
            <p className="text-4xl font-bold text-green-600">
              {completedTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>Pending</h2>
            <p className="text-4xl font-bold text-red-500">
              {pendingTasks}
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow">
            <h2>Overdue</h2>
            <p className="text-4xl font-bold text-orange-500">
              {overdueTasks}
            </p>
          </div>

        </div>

        {/* Form */}
        <div className="bg-white p-8 rounded-2xl shadow mt-8">

          <h2 className="text-2xl font-bold mb-6">
            Create / Edit Task
          </h2>

          <input
            type="text"
            placeholder="Task Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full border p-4 rounded-xl mb-4"
          />

          <input
            type="text"
            placeholder="Assign To"
            value={assignTo}
            onChange={(e) =>
              setAssignTo(e.target.value)
            }
            className="w-full border p-4 rounded-xl mb-4"
          />

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
            className="w-full border p-4 rounded-xl mb-4"
          >
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>

          <input
            type="date"
            value={date}
            onChange={(e) =>
              setDate(e.target.value)
            }
            className="w-full border p-4 rounded-xl mb-6"
          />

          {editIndex === null ? (
            <button
              onClick={handleAddTask}
              className="bg-blue-600 text-white px-8 py-3 rounded-xl"
            >
              Add Task
            </button>
          ) : (
            <button
              onClick={handleUpdateTask}
              className="bg-green-600 text-white px-8 py-3 rounded-xl"
            >
              Update Task
            </button>
          )}

        </div>

        {/* Search */}
        <div className="flex gap-4 mt-8 mb-6">

          <input
            type="text"
            placeholder="Search Task..."
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
            className="w-full border p-4 rounded-xl"
          />

          <select
            value={filterStatus}
            onChange={(e) =>
              setFilterStatus(e.target.value)
            }
            className="border p-4 rounded-xl"
          >
            <option>All</option>
            <option>Pending</option>
            <option>Completed</option>
            <option>Overdue</option>
          </select>

        </div>

        {/* Task List */}
        <div className="bg-white p-8 rounded-2xl shadow">

          <h2 className="text-2xl font-bold mb-6">
            Task List
          </h2>

          {filteredTasks.length === 0 ? (
            <p className="text-gray-500 text-center">
              No matching tasks found.
            </p>
          ) : (
            <div className="space-y-5">

              {filteredTasks.map(
                (task, index) => (
                  <div
                    key={index}
                    className="border p-5 rounded-xl"
                  >
                    <h3 className="text-2xl font-bold">
                      {task.title}
                    </h3>

                    <p>
                      Assign To:
                      {task.assignTo}
                    </p>

                    <p>
                      Status:
                      {task.status}
                    </p>

                    <p>
                      Date:
                      {task.date}
                    </p>

                    <div className="flex gap-4 mt-4">

                      <button
                        onClick={() =>
                          handleEdit(index)
                        }
                        className="bg-yellow-500 text-white px-5 py-2 rounded-xl"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() =>
                          handleDelete(index)
                        }
                        className="bg-red-500 text-white px-5 py-2 rounded-xl"
                      >
                        Delete
                      </button>

                    </div>

                  </div>
                )
              )}

            </div>
          )}

        </div>

      </div>
    </div>
  );
}

export default Dashboard;