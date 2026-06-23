import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { CalendarDays } from "lucide-react";
import { Clock3 } from "lucide-react";
import { Button } from "../ui/button";
import { FilePenLine } from "lucide-react";
import { Trash2 } from "lucide-react";
import { Badge } from "../ui/badge";

const TaskCard = ({ task, onEdit, onDelete, updateTask }) => {
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

  const priorityDot = {
    Low: "bg-green-500",
    Medium: "bg-orange-500",
    High: "bg-red-500",
  };

  return (
    <Card className="bg-black/4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
      <CardHeader className="flex flex-row justify-between items-start">
        <div className="flex gap-3">
          <div
            className={`sm:mt-2 sm:h-3 sm:w-3 rounded-full ${priorityDot[task.priority]}`}
          />
          <div>
            <CardTitle className="text-lg">{task.title}</CardTitle>
            <CardDescription className="mt-2">
              {task.description}
            </CardDescription>
          </div>
        </div>
        <Badge
          className={`rounded-full border ${priorityStyle[task.priority]}`}
        >
          {task.priority}
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col gap-2">
        <div className="flex flex-wrap gap-2 sm:gap-6 text-sm text-muted-foreground pl-6">
          <div className="flex items-center gap-2">
            <CalendarDays className="h-4 w-4" />
            Due {formatDate(task.dueDate)}
          </div>
          <div className="flex items-center gap-2">
            <Clock3 className="h-4 w-4" />
            Created {formatDate(task.createdAt)}
          </div>
        </div>
        {updateTask && (
          <div className="flex items-center gap-2 self-end">
            <Button
              size="icon"
              variant="outline"
              className="cursor-pointer"
              onClick={() => onEdit(task)}
            >
              <FilePenLine className="h-4 w-4" />
            </Button>
            <Button
              size="icon"
              variant="destructive"
              className="cursor-pointer"
              onClick={() => onDelete(task?._id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default TaskCard;
