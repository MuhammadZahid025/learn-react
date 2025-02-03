import { useContext, useState } from "react";
import { Task } from "./Content";
import { TaskContext } from "../context/TaskContext";

interface Props {
  task: Task;
  onClose: () => void;
}
export default function UpdateTask({ task, onClose }: Props) {
  const [taskData, setTaskData] = useState(task);
  const { dispatch } = useContext(TaskContext);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch({ type: "UPDATE_TASK", payload: { id: task.id, task: taskData } });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-none ">
      <div className="bg-white p-5 rounded shadow-lg w-110">
        <form onSubmit={handleFormSubmit}>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-semibold mb-4">Update Task</h2>

            <select
              name="status"
              value={taskData.status}
              onChange={handleInputChange}
              className="border p-2 rounded"
            >
              <option value="Planned">Planned</option>
              <option value="Active">Active</option>
              <option value="Resolved">Resolved</option>
            </select>
          </div>

          <input
            type="text"
            name="title"
            value={taskData.title}
            placeholder="Title"
            onChange={handleInputChange}
            className="w-full border p-2 mb-4 rounded"
          />
          <textarea
            name="description"
            value={taskData.description}
            onChange={handleInputChange}
            placeholder="Description"
            className="w-full border p-2 mb-4 rounded resize-y min-h-[100px]"
            rows={4}
          />
          <div className="flex justify-end">
            <button
              onClick={onClose}
              type="button"
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer "
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
