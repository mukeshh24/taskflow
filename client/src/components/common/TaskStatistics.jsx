import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { TrendingUp } from "lucide-react";
import {
  ClipboardList,
  CircleCheckBig,
  ListTodo,
  ChartNoAxesCombined,
} from "lucide-react";
import { Separator } from "../ui/separator";
import { Clock } from "lucide-react";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import TaskOverview from "./TaskOverview";

const TaskStatistics = () => {
  const { tasks } = useContext(TaskContext);

  const totalTasks = tasks.length;

  const completedTasks = tasks.filter((task) => task.completed).length;

  const pendingTasks = totalTasks - completedTasks;

  const completionRate =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  const taskStatistics = [
    {
      id: 1,
      title: "Total Tasks",
      value: totalTasks,
      icon: ClipboardList,
      color: "text-blue-500",
    },
    {
      id: 2,
      title: "Completed",
      value: completedTasks,
      icon: CircleCheckBig,
      color: "text-green-500",
    },
    {
      id: 3,
      title: "Pending",
      value: pendingTasks,
      icon: ListTodo,
      color: "text-orange-500",
    },
    {
      id: 4,
      title: "Completion Rate",
      value: `${completionRate}%`,
      icon: ChartNoAxesCombined,
      color: "text-violet-500",
    },
  ];

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const priorityStyle = {
    Low: "bg-green-100 text-green-700 border-green-200",
    Medium: "bg-orange-100 text-orange-700 border-orange-200",
    High: "bg-red-100 text-red-700 border-red-200",
  };

  return (
    <aside className="w-full lg:max-w-sm lg:sticky lg:top-23">
      <Card className="w-full bg-zinc-50 mb-5">
        <CardHeader className="flex items-center gap-2 mb-2">
          <TrendingUp className="w-5 h-5 text-black" />
          <span className="text-lg font-semibold text-black">
            Task Statistics
          </span>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {taskStatistics.map((task) => {
              const Icon = task.icon;
              return <TaskOverview key={task.id} task={task} Icon={Icon} />;
            })}
          </div>
          <Separator className="my-5" />
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 justify-between">
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 bg-black rounded-full"></span>
                <p className="text-black font-semibold text-sm">
                  Task Progress
                </p>
              </div>
              <div className="w-fit h-5 flex items-center justify-center bg-zinc-200 rounded-full py-1.5 px-2">
                {completedTasks}/{totalTasks}
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="w-full h-3 bg-zinc-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-green-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${completionRate}%`,
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
      <Card className="w-full bg-zinc-50">
        <CardHeader className="flex items-center gap-2 mb-2">
          <Clock className="w-5 h-5 text-black" />
          <span className="text-lg font-semibold text-black">
            Recent Activity
          </span>
        </CardHeader>
        <CardContent>
          {tasks.length > 0 ? (
            tasks.slice(0, 2).map((task) => (
              <div
                key={task.id}
                className="bg-zinc-200 p-3 rounded mb-2.5 flex items-start justify-between gap-2"
              >
                <div className="flex flex-col ">
                  <p className="text-black font-semibold text-sm">
                    {task.title}
                  </p>
                  <span className="text-black/50 text-sm">
                    {formatDate(task.createdAt)}
                  </span>
                </div>
                {task.priority && (
                  <div
                    className={`${priorityStyle[task.priority]} flex items-center justify-center rounded-full py-0.5 px-2`}
                  >
                    {task.priority}
                  </div>
                )}
              </div>
            ))
          ) : (
            <div className="flex flex-col items-center gap-2">
              <div className="w-14 h-14 flex items-center justify-center bg-zinc-200 rounded-full">
                <Clock className="h-5 w-5 text-black" />
              </div>
              <div className="flex items-center justify-center flex-col gap-0">
                <p className="text-black font-semibold text-sm">
                  No recent activity
                </p>
                <span className="text-black/50 text-sm">
                  Tasks will appear here
                </span>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </aside>
  );
};

export default TaskStatistics;
