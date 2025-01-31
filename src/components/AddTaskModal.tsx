interface Props {
  isOpen: boolean;
  onClose: () => void;
}

export default function AddTaskModal({ isOpen, onClose }: Props) {
  if (!isOpen) return null;

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      {/* <div className=""> */}
      <h2 className="text-lg font-semibold mb-4">Add New Task</h2>

      <input
        type="text"
        placeholder="Task Name"
        className="border border-gray-300 rounded-md px-3 py-2 mb-4"
      />

      <button
        onClick={onClose}
        className="bg-blue-500 text-white font-semibold py-2 px-4 rounded"
      >
        Save
      </button>
      <button
        onClick={onClose}
        className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded ml-2"
      >
        Cancel
      </button>
      {/* </div> */}
    </div>
  );
}
