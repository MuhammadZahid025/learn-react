import { useContext, useEffect, useState } from "react";
import { nanoid } from "nanoid";
import { TaskContext } from "../context/TaskContext";

interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export enum TaskStatusEnum {
  Planned = "Planned",
  Active = "Active",
  Resolved = "Resolved",
}

export default function AddTaskModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  const [taskData, setTaskData] = useState({ title: "", description: "" });
  const { dispatch } = useContext(TaskContext);

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

    dispatch({ type: "ADD_TASK", payload: newTask });

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
              className="bg-gray-400 text-white px-4 py-2 rounded mr-2 cursor-pointer hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-gray-500 text-white px-4 py-2 rounded cursor-pointer hover:bg-gray-50"
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
