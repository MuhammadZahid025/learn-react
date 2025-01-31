import { useState } from "react";
import AddTaskModal from "./AddTaskModal";

export default function Content() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative grid grid-cols-3 gap-4 p-4 border rounded-lg border-gray-400">
      <div className="border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh]">
        <h4 className="text-lg  text-center border-b pb-2">Planned</h4>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gray-300 text-sm px-4 py-2 rounded mt-2 hover:bg-gray-400 "
        >
          + Add Task
        </button>
      </div>

      {isOpen && (
        <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      <div className="border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh]">
        <h4 className="text-lg text-center border-b pb-2">Active</h4>
      </div>
      <div className="border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh]">
        <h4 className="text-lg text-center border-b pb-2">Resolved</h4>
      </div>
    </div>
  );
}
