import { useContext, useState } from "react";
import AddTaskModal, { TaskStatusEnum } from "./AddTaskModal";
import TaskCard from "./TaskCard";
import UpdateTask from "./UpdateTask";
import { TaskContext } from "../context/TaskContext";

export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatusEnum;
}

export default function Content() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task>();
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const {
    state: { tasks },
  } = useContext(TaskContext);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setUpdateModalOpen(true);
  };

  return (
    <div className="relative grid grid-cols-3 gap-4 p-4 border rounded-lg border-gray-400">
      <div className="border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh]">
        <h4 className="text-lg  text-center border-b pb-2">Planned</h4>
        <button
          onClick={() => setIsOpen(true)}
          className="w-full bg-gray-300 text-sm px-4 py-2 rounded mt-2 cursor-pointer hover:bg-gray-300 "
        >
          + Add Task
        </button>
        {tasks
          .filter((task) => task.status === "Planned")
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onClick={() => handleTaskClick(task)}
            />
          ))}

        {updateModalOpen && selectedTask && (
          <UpdateTask
            task={selectedTask}
            onClose={() => setUpdateModalOpen(false)}
          />
        )}
      </div>

      {isOpen && (
        <AddTaskModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
      )}

      <div className="border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh]">
        <h4 className="text-lg text-center border-b pb-2">Active</h4>

        {tasks
          .filter((task) => task.status === "Active")
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onClick={() => handleTaskClick(task)}
            />
          ))}
      </div>
      <div className="border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh]">
        <h4 className="text-lg text-center border-b pb-2">Resolved</h4>

        {tasks
          .filter((task) => task.status === "Resolved")
          .map((task) => (
            <TaskCard
              key={task.id}
              title={task.title}
              description={task.description}
              status={task.status}
              onClick={() => handleTaskClick(task)}
            />
          ))}
      </div>
    </div>
  );
}
