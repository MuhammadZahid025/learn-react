import { createContext, Dispatch, useEffect, useReducer } from "react";
import { Task } from "../components/Content";

interface State {
  tasks: Task[];
}
type Action =
  | {
      type: "ADD_TASK";
      payload: Task;
    }
  | {
      type: "UPDATE_TASK";
      payload: { id: string; task: Partial<Task> };
    }
  | {
      type: "DELETE_TASK";
      payload: { id: string };
    };

interface TaskContextValue {
  state: State;
  dispatch: Dispatch<Action>;
}

export const TaskContext = createContext<TaskContextValue>({
  state: { tasks: [] },
  dispatch: () => {},
});

const initialState: State = {
  tasks: JSON.parse(localStorage.getItem("tasks") || "[]") as Task[],
};

function taskReducer(state: State, action: Action) {
  switch (action.type) {
    // While adding a new task
    case "ADD_TASK":
      localStorage.setItem(
        "tasks",
        JSON.stringify([...state.tasks, action.payload])
      );
      return { tasks: [...state.tasks, action.payload] };

    // While updating a task
    case "UPDATE_TASK": {
      const taskToUpdate = state.tasks.find(
        (task) => task.id === action.payload.id
      );

      if (!taskToUpdate) {
        return state;
      }

      const updatedTasks = state.tasks.map((task) =>
        task.id === action.payload.id
          ? { ...task, ...action.payload.task }
          : task
      );

      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }
    case "DELETE_TASK": {
      const updatedTasks = state.tasks.filter(
        (task) => task.id !== action.payload.id
      );
      localStorage.setItem("tasks", JSON.stringify(updatedTasks));
      return { tasks: updatedTasks };
    }

    default:
      return state;
  }
}

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(taskReducer, initialState);

  useEffect(() => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
      dispatch({ type: "ADD_TASK", payload: JSON.parse(storedTasks) });
    }
  }, []);

  return (
    <TaskContext.Provider value={{ state, dispatch }}>
      {children}
    </TaskContext.Provider>
  );
}
