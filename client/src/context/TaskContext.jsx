import { getAllTask } from "@/services/taskServices";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const fetchTask = async () => {
    try {
      const response = await getAllTask();
      if (response.success) {
        setTasks(response?.task);
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };
  useEffect(() => {
    fetchTask();
  }, []);

  return (
    <TaskContext.Provider value={{ tasks, setTasks, fetchTask }}>
      {children}
    </TaskContext.Provider>
  );
};
