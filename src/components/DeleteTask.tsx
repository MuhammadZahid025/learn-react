interface Props {
  onClose: () => void;
}

export default function DeleteTask({ onClose }: Props) {
  return (
    <div className="fixed inset-0 flex items-center justify-center backdrop-blur-none">
      <div className="bg-white p-6 rounded shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-4">Delete Task</h2>
        <p className="text-gray-700 mb-6">
          Are you sure you want to delete this task?
        </p>

        <div className="flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded bg-gray-400 hover:bg-gray-500 text-white"
          >
            Cancel
          </button>
          <button
            onClick={() => {}}
            className="px-4 py-2 rounded bg-red-600 hover:bg-red-700 text-white"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
