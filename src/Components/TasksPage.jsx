
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  clearTaskError,
} from "../Redux/taskSlice";

const initialFormState = {
  title: "",
  description: "",
  status: "pending",
  priority: "medium",
};

const TasksPage = () => {
  const dispatch = useDispatch();
  const { items: tasks, loading, error } = useSelector((state) => state.tasks);

  const [formData, setFormData] = useState(initialFormState);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [localError, setLocalError] = useState("");

  useEffect(() => {
    dispatch(fetchTasks({}));
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLocalError("");

    if (!formData.title.trim()) {
      setLocalError("Title is required");
      return;
    }

    try {
      if (editingTaskId) {
        await dispatch(
          updateTask({ id: editingTaskId, data: formData })
        ).unwrap();
      } else {
        await dispatch(createTask(formData)).unwrap();
      }

      setFormData(initialFormState);
      setEditingTaskId(null);
    } catch (err) {
      console.error("Task error:", err);
    }
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setFormData({
      title: task.title || "",
      description: task.description || "",
      status: task.status || "pending",
      priority: task.priority || "medium",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (taskId) => {
    if (!window.confirm("Are you sure you want to delete this task?")) return;
    try {
      await dispatch(deleteTask(taskId)).unwrap();
    } catch (err) {
      console.error("Delete error:", err);
    }
  };

  const handleCancelEdit = () => {
    setEditingTaskId(null);
    setFormData(initialFormState);
    setLocalError("");
  };

  const handleApplyFilters = () => {
    dispatch(fetchTasks({ status: statusFilter, search }));
  };

  const handleClearError = () => {
    dispatch(clearTaskError());
    setLocalError("");
  };

  const showError = localError || error;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6">
      <div className="max-w-6xl mx-auto flex flex-col gap-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <h1 className="text-2xl sm:text-3xl font-bold">
            Task Manager Dashboard
          </h1>
          <p className="text-sm text-gray-300">
            Create, manage, filter, and delete your tasks.
          </p>
        </div>

        {/* Error Alert */}
        {showError && (
          <div className="alert alert-error shadow-lg">
            <div className="flex-1">
              <span>{showError}</span>
            </div>
            <button
              className="btn btn-sm btn-ghost text-white"
              onClick={handleClearError}
            >
              ✕
            </button>
          </div>
        )}

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
          {/* Form Card */}
          <div className="lg:col-span-1">
            <div className="card bg-neutral text-neutral-content shadow-xl">
              <div className="card-body">
                <h2 className="card-title text-lg">
                  {editingTaskId ? "Edit Task" : "Create New Task"}
                </h2>

                <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                  {/* Title */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-200">
                        Title <span className="text-red-500">*</span>
                      </span>
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleChange}
                      placeholder="e.g., Finish frontend assignment"
                      className="input input-bordered w-full bg-black text-white"
                    />
                  </div>

                  {/* Description */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-200">
                        Description
                      </span>
                    </label>
                    <textarea
                      name="description"
                      rows={3}
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Optional details about this task"
                      className="textarea textarea-bordered w-full bg-black text-white"
                    />
                  </div>

                  {/* Status + Priority */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-200">Status</span>
                      </label>
                      <select
                        name="status"
                        value={formData.status}
                        onChange={handleChange}
                        className="select select-bordered w-full bg-black text-white"
                      >
                        <option value="pending">Pending</option>
                        <option value="in-progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>

                    <div className="form-control">
                      <label className="label">
                        <span className="label-text text-gray-200">
                          Priority
                        </span>
                      </label>
                      <select
                        name="priority"
                        value={formData.priority}
                        onChange={handleChange}
                        className="select select-bordered w-full bg-black text-white"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>

                  {/* Buttons */}
                  <div className="card-actions justify-start mt-2 gap-3">
                    <button
                      type="submit"
                      className={`btn btn-primary ${
                        loading ? "btn-disabled" : ""
                      }`}
                    >
                      {editingTaskId
                        ? loading
                          ? "Updating..."
                          : "Update Task"
                        : loading
                        ? "Creating..."
                        : "Create Task"}
                    </button>

                    {editingTaskId && (
                      <button
                        type="button"
                        onClick={handleCancelEdit}
                        className="btn btn-outline"
                      >
                        Cancel
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Filters + List */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            {/* Filters */}
            <div className="card bg-neutral shadow-lg">
              <div className="card-body">
                <h2 className="card-title text-sm sm:text-base">
                  Filters & Search
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                  {/* Search */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-200">Search</span>
                    </label>
                    <input
                      type="text"
                      value={search}
                      onChange={(e) => setSearch(e.target.value)}
                      placeholder="Search by title/description"
                      className="input input-bordered w-full bg-black text-white"
                    />
                  </div>

                  {/* Status filter */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text text-gray-200">
                        Status Filter
                      </span>
                    </label>
                    <select
                      value={statusFilter}
                      onChange={(e) => setStatusFilter(e.target.value)}
                      className="select select-bordered w-full bg-black text-white"
                    >
                      <option value="">All</option>
                      <option value="pending">Pending</option>
                      <option value="in-progress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>

                  {/* Apply */}
                  <div className="form-control">
                    <button
                      onClick={handleApplyFilters}
                      className={`btn btn-accent mt-7 ${
                        loading ? "btn-disabled" : ""
                      }`}
                    >
                      {loading ? "Loading..." : "Apply"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Tasks Table */}
            <div className="card bg-neutral shadow-xl overflow-x-auto">
              <div className="card-body">
                <div className="flex items-center justify-between mb-3">
                  <h2 className="card-title text-base sm:text-lg">
                    Tasks ({tasks.length})
                  </h2>
                </div>

                {loading && tasks.length === 0 ? (
                  <div className="flex justify-center py-6">
                    <span className="loading loading-spinner loading-lg"></span>
                  </div>
                ) : tasks.length === 0 ? (
                  <p className="text-gray-300 text-sm">
                    No tasks found. Create your first task on the left 🚀
                  </p>
                ) : (
                  <div className="overflow-x-auto">
                    <table className="table table-zebra w-full text-sm">
                      <thead>
                        <tr className="text-gray-300 text-xs uppercase">
                          <th>Title</th>
                          <th className="hidden sm:table-cell">Description</th>
                          <th>Status</th>
                          <th>Priority</th>
                          <th className="hidden md:table-cell">Created</th>
                          <th className="text-right">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {tasks.map((task) => (
                          <tr key={task._id}>
                            <td className="font-semibold">{task.title}</td>
                            <td className="hidden sm:table-cell text-gray-300">
                              {task.description || "-"}
                            </td>
                            <td>
                              <div
                                className={`badge badge-sm ${
                                  task.status === "completed"
                                    ? "badge-success"
                                    : task.status === "in-progress"
                                    ? "badge-warning"
                                    : "badge-ghost"
                                }`}
                              >
                                {task.status}
                              </div>
                            </td>
                            <td>
                              <div
                                className={`badge badge-sm ${
                                  task.priority === "high"
                                    ? "badge-error"
                                    : task.priority === "low"
                                    ? "badge-info"
                                    : "badge-neutral"
                                }`}
                              >
                                {task.priority}
                              </div>
                            </td>
                            <td className="hidden md:table-cell text-xs text-gray-400">
                              {task.createdAt
                                ? new Date(task.createdAt).toLocaleString()
                                : "-"}
                            </td>
                            <td className="text-right">
                              <div className="flex justify-end gap-2">
                                <button
                                  className="btn btn-xs btn-outline"
                                  onClick={() => handleEdit(task)}
                                >
                                  Edit
                                </button>
                                <button
                                  className="btn btn-xs btn-error"
                                  onClick={() => handleDelete(task._id)}
                                >
                                  Delete
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TasksPage;
