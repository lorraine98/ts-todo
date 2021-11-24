import { createContext, ReactChild, useContext } from "react";
import useLocalStorage from "../hooks/useLocalStorage";

interface Task {
  id: number;
  content: string;
  complete: boolean;
}

interface ITaskContext {
  tasks: Task[];
  addTask(content: string): void;
  updateTask(id: number, status: boolean): void;
  removeTask(id: number): void;
}

const TaskContext = createContext<ITaskContext>({} as ITaskContext);
export const useTasks = () => useContext(TaskContext);

interface Props {
  children: ReactChild;
  initialTasks?: Task[];
}

const TaskProvider = ({ children, initialTasks = [] }: Props) => {
  const [tasks, setTasks] = useLocalStorage<Task[]>("task", initialTasks);

  const addTask = (content: string) => {
    setTasks([
      ...tasks,
      {
        id: Date.now(),
        content,
        complete: false,
      },
    ]);
  };

  const updateTask = (id: number, status: boolean) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, complete: status } : item
      )
    );
  };
  const removeTask = (id: number) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  return (
    <TaskContext.Provider value={{ tasks, addTask, updateTask, removeTask }}>
      {children}
    </TaskContext.Provider>
  );
};
export default TaskProvider;
