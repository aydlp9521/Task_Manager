import { useEffect, useState } from "react";
import axios from "axios";
import Sidebar from "../components/Sidebar";

const API_URL = "http://localhost:5000/api/team";

function TeamMembers() {
  const [members, setMembers] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "Member",
  });
  const [editId, setEditId] = useState(null);

  const fetchMembers = async () => {
    try {
      const res = await axios.get(API_URL);
      setMembers(res.data);
    } catch (err) {
      console.error("Failed to fetch team members:", err);
    }
  };

  useEffect(() => {
    let ignore = false;

    axios
      .get(API_URL)
      .then((res) => {
        if (!ignore) {
          setMembers(res.data);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch team members:", err);
      });

    return () => {
      ignore = true;
    };
  }, []);

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      role: "Member",
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

    if (!form.name || !form.email) {
      alert("Fill all fields");
      return;
    }

    try {
      if (editId) {
        await axios.put(`${API_URL}/${editId}`, form);
      } else {
        await axios.post(API_URL, form);
      }

      resetForm();
      await fetchMembers();
    } catch (err) {
      console.error("Failed to save team member:", err);
    }
  };

  const deleteMember = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      await fetchMembers();
    } catch (err) {
      console.error("Failed to delete team member:", err);
    }
  };

  const editMember = (member) => {
    setForm({
      name: member.name || "",
      email: member.email || "",
      role: member.role || "Member",
    });
    setEditId(member._id);
  };

  return (
    <div>
      <Sidebar />

      <div className="ml-[300px] min-h-screen bg-gray-100 p-8">
        <h1 className="text-5xl font-bold mb-8">Team Members</h1>

        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-2xl shadow-lg p-8 mb-10"
        >
          <h2 className="text-3xl font-bold mb-8">
            {editId ? "Edit Member" : "Add Team Member"}
          </h2>

          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mb-4"
            required
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mb-4"
            required
          />

          <select
            name="role"
            value={form.role}
            onChange={handleChange}
            className="w-full border p-4 rounded-xl mb-6"
          >
            <option>Member</option>
            <option>Admin</option>
            <option>Manager</option>
          </select>

          <div className="flex gap-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl"
            >
              {editId ? "Update Member" : "Add Member"}
            </button>

            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 hover:bg-gray-600 text-white px-8 py-3 rounded-xl"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        <h2 className="text-4xl font-bold mb-6">All Members</h2>

        {members.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center text-gray-500 text-xl">
            No team members added yet.
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {members.map((member) => (
              <div
                key={member._id}
                className="bg-white rounded-2xl shadow-lg p-8"
              >
                <h3 className="text-3xl font-bold mb-3">{member.name}</h3>

                <p className="text-lg mb-2">Email: {member.email}</p>

                <p className="text-lg mb-6">Role: {member.role}</p>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => editMember(member)}
                    className="bg-yellow-500 hover:bg-yellow-600 text-white px-6 py-2 rounded-xl"
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    onClick={() => deleteMember(member._id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-6 py-2 rounded-xl"
                  >
                    Remove
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

export default TeamMembers;
