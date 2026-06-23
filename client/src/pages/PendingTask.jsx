import AppBradcrumb from "@/components/common/AppBradcrumb";
import TaskCard from "@/components/common/TaskCard";
import { TaskContext } from "@/context/TaskContext";
import React from "react";
import { useContext } from "react";

const PendingTask = () => {
  const { tasks } = useContext(TaskContext);

  const pendingTasks = tasks.filter((task) => !task.completed);

  return (
    <section className="w-full">
      <AppBradcrumb currentPage="Pending" />
      <div className="flex flex-col gap-5">
        <div className="flex items-start flex-col gap-0">
          <p className="text-black font-semibold text-lg capitalize">
            Pending Tasks
          </p>
          <span className="text-black/50 text-sm">
            Manage and complete your pending tasks before their due dates.
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {pendingTasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </section>
  );
};

export default PendingTask;
