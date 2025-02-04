import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  MouseSensor,
  // PointerSensor,
  TouchSensor,
  useDroppable,
  useSensor,
  useSensors,
} from "@dnd-kit/core";
import { useContext, useState } from "react";
import { TaskContext } from "../context/TaskContext";
import AddTaskModal, { TaskStatusEnum } from "./AddTaskModal";
import TaskCard from "./TaskCard";
import UpdateTask from "./UpdateTask";

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

  // const { dispatch } = useContext(TaskContext);

  const plannedColumn = useDroppable({
    id: "Planned",
  });
  const activeColumn = useDroppable({
    id: "Active",
  });
  const resolvedColumn = useDroppable({
    id: "Resolved",
  });

  const {
    state: { tasks },
  } = useContext(TaskContext);

  const handleTaskClick = (task: Task) => {
    setSelectedTask(task);
    setUpdateModalOpen(true);
  };

  const mouseSensor = useSensor(MouseSensor);
  const touchSensor = useSensor(TouchSensor);
  const keyboardSensor = useSensor(KeyboardSensor);
  // const pointerSensor = useSensor(PointerSensor);

  const sensors = useSensors(
    mouseSensor,
    touchSensor,
    keyboardSensor
    // pointerSensor
  );

  const handleDragEvent = (e: DragEndEvent) => {
    console.log("event---------->>>", e);
    const { active, over } = e;

    console.log("Dragged Item:", active);
    console.log("Over Droppable:", over);

    if (!over) return;
    const draggedTask = tasks.find((task) => task.id === active.id);
    if (!draggedTask) return;
    if (draggedTask && draggedTask.status !== over.id) {
      const newStatus = over.id as TaskStatusEnum;
      console.log("newStatus", newStatus);

      console.log("draggedTask>>>>>>>>>>>>>>", draggedTask);
      // Dispatch context update here
      // dispatch({
      //   type: "UPDATE_TASK_STATUS",
      //   payload: { id: draggedTask.id, status: over.id },
      // });
    }
  };

  return (
    <DndContext sensors={sensors} onDragEnd={handleDragEvent}>
      <div className="relative grid grid-cols-3 gap-4 p-4 border rounded-lg border-gray-400">
        <div
          ref={plannedColumn.setNodeRef}
          className={`border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh] ${
            plannedColumn.isOver ? "bg-blue-200" : ""
          }`}
        >
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
                id={task.id}
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

        <div
          ref={activeColumn.setNodeRef}
          className={`border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh] ${
            activeColumn.isOver ? "bg-blue-200" : ""
          }`}
        >
          <h4 className="text-lg text-center border-b pb-2">Active</h4>

          {tasks
            .filter((task) => task.status === "Active")
            .map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                onClick={() => handleTaskClick(task)}
              />
            ))}
        </div>
        <div
          ref={resolvedColumn.setNodeRef}
          className={`border border-gray-400 rounded-lg p-4 bg-gray-100 min-h-[80vh] ${
            resolvedColumn.isOver ? "bg-blue-200" : ""
          }`}
        >
          <h4 className="text-lg text-center border-b pb-2">Resolved</h4>

          {tasks
            .filter((task) => task.status === "Resolved")
            .map((task) => (
              <TaskCard
                key={task.id}
                id={task.id}
                title={task.title}
                description={task.description}
                status={task.status}
                onClick={() => handleTaskClick(task)}
              />
            ))}
        </div>
      </div>
    </DndContext>
  );
}
