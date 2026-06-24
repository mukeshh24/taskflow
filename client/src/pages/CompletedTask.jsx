import AppBradcrumb from "@/components/common/AppBradcrumb";
import EmptyTask from "@/components/common/EmptyTask";
import TaskCard from "@/components/common/TaskCard";
import { TaskContext } from "@/context/TaskContext";
import { CircleCheckBig } from "lucide-react";
import React from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

const CompletedTask = () => {
  const { tasks } = useContext(TaskContext);
  const navigate = useNavigate();

  const completedTasks = tasks.filter((task) => task.completed);

  return (
    <section className="w-full">
      <AppBradcrumb currentPage="Complete" />
      <div className="flex flex-col gap-5">
        <div className="flex items-start flex-col gap-0">
          <p className="text-black font-semibold text-lg capitalize">
            Completed Tasks
          </p>
          <span className="text-black/50 text-sm">
            Review all completed tasks and track your accomplishments.
          </span>
        </div>
      </div>
      <div className="mt-5 space-y-4">
        {completedTasks.length > 0 ? (
          <>
            {completedTasks.map((task) => (
              <TaskCard key={task._id} task={task} />
            ))}
          </>
        ) : (
          <EmptyTask
            Icon={CircleCheckBig}
            title="No Completed Tasks"
            description="Complete a task to see it appear here."
            buttonText="Go to Dashboard"
            onClick={() => navigate("/dashboard")}
          />
        )}
      </div>
    </section>
  );
};

export default CompletedTask;
