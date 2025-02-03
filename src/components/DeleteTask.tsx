import { useContext } from "react";
import { TaskContext } from "../context/TaskContext";

interface Props {
  onClose: () => void;
  taskId: string;
}

export default function DeleteTask({ onClose, taskId }: Props) {
  const { dispatch } = useContext(TaskContext);

  const handleCancelDeleteEvent = (e: React.MouseEvent) => {
    e.stopPropagation();
    onClose();
  };

  const handleDelteClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    dispatch({ type: "DELETE_TASK", payload: { id: taskId } });
    onClose();
  };
  return (
    <div
      className="fixed inset-0 flex items-center justify-center backdrop-blur-none"
      onClick={(e) => {
        e.stopPropagation();
      }}
    >
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={handleCancelDeleteEvent}
            className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white cursor-pointer"
          >
            Cancel
          </button>
          <button
            onClick={handleDelteClick}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white cursor-pointer"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
