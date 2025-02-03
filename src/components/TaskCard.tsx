import { useState } from "react";
import { TrashIcon } from "@heroicons/react/16/solid";
import DeleteTask from "./DeleteTask";

interface TaskCardProps {
  title: string;
  description: string;
  status: "Planned" | "Active" | "Resolved";
  onClick: () => void;
}

export const statusColors = {
  Planned: "bg-blue-200 text-blue-800",
  Active: "bg-yellow-200 text-yellow-800",
  Resolved: "bg-green-200 text-green-800",
};

export default function TaskCard({
  title,
  description,
  status,
  onClick,
}: TaskCardProps) {
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  return (
    <div
      onClick={onClick}
      className="border border-gray-300 rounded-lg p-4 mb-4 mt-4 bg-white shadow-sm hover:shadow-md transition-shadow cursor-pointer hover:bg-gray-50"
    >
      <div className="flex justify-between items-center">
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <TrashIcon
          className="w-6 h-6 text-gray-600"
          onClick={(e) => {
            e.stopPropagation();
            setShowDeleteDialog(true);
          }}
        />
      </div>
      <p className="text-sm text-gray-600 mb-4">{description}</p>

      <div className="flex justify-between items-center">
        <span
          className={`px-3 py-1 text-xs font-semibold rounded-full ${statusColors[status]}`}
        >
          {status}
        </span>

        {showDeleteDialog && (
          <DeleteTask onClose={() => setShowDeleteDialog(false)} />
        )}
      </div>
    </div>
  );
}
