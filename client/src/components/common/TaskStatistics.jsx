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

const taskStatistics = [
  {
    id: 1,
    title: "Total Tasks",
    value: 0,
    icon: ClipboardList,
    color: "text-blue-600",
    bgColor: "bg-blue-100",
  },
  {
    id: 2,
    title: "Completed",
    value: 0,
    icon: CircleCheckBig,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 3,
    title: "Pending",
    value: 0,
    icon: ListTodo,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 4,
    title: "Completion Rate",
    value: "0%",
    icon: ChartNoAxesCombined,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
  },
];

const TaskStatistics = () => {
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
              return (
                <div
                  key={task.id}
                  className="flex items-center gap-2 bg-black/4 p-5 rounded group"
                >
                  <div className="w-10 h-10 flex items-center justify-center bg-zinc-200 rounded">
                    <Icon className="h-5 w-5 text-black group-hover:scale-120 transition-all duration-300" />
                  </div>
                  <div className="flex items-start flex-col gap-0">
                    <p className="text-black font-semibold text-sm">
                      {task.value}
                    </p>
                    <span className="text-black/50 text-sm">{task.title}</span>
                  </div>
                </div>
              );
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
                0/0
              </div>
            </div>
            <div className="flex items-center gap-2 justify-between">
              <div className="w-full h-3 flex items-center justify-center bg-zinc-200 rounded-full"></div>
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
        </CardContent>
      </Card>
    </aside>
  );
};

export default TaskStatistics;
