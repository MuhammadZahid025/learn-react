import { useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { Task } from "./Content";

interface Props {
  isOpen: boolean;
  onClose: () => void;
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TaskStatusEnum = {
  Planned: "Planned",
  Active: "Active",
  Resolved: "Resolved",
};

export default function AddTaskModal({ isOpen, onClose, setTasks }: Props) {
  if (!isOpen) return null;

  const [taskData, setTaskData] = useState({ title: "", description: "" });

  useEffect(() => {
    if (isOpen) {
      setTaskData({ title: "", description: "" });
    }
  }, []);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setTaskData({ ...taskData, [name]: value });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newTask = {
      id: nanoid(),
      status: TaskStatusEnum.Planned,
      ...taskData,
    };

    localStorage.setItem(
      "tasks",
      JSON.stringify([
        ...JSON.parse(localStorage.getItem("tasks") || "[]"),
        newTask,
      ])
    );

    setTasks(JSON.parse(localStorage.getItem("tasks") || "[]") as Task[]);

    onClose();
    setTaskData({ title: "", description: "" });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-none ">
      <div className="bg-white p-5 rounded shadow-lg w-110">
        <form onSubmit={handleFormSubmit}>
          <h2 className="text-lg font-semibold mb-4">Create New Task</h2>
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
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded mr-2 cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-50"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
