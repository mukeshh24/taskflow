import AppBradcrumb from "@/components/common/AppBradcrumb";
import React from "react";
import { CircleCheckBig, ListTodo, ChartNoAxesCombined } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { User } from "lucide-react";
import { useState } from "react";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import signupSchema from "@/schema/signupSchema";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import taskSchema from "@/schema/taskSchema";
import { Textarea } from "@/components/ui/textarea";
import { FilePenLine } from "lucide-react";
import { CirclePlus } from "lucide-react";
import { ListSortDescending } from "lucide-react";
import { Flag } from "lucide-react";
import {
  NativeSelect,
  NativeSelectOptGroup,
  NativeSelectOption,
} from "@/components/ui/native-select";
import { CalendarDays } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { errorHandler } from "@/lib/errorHandlre";
import {
  addTask,
  editTask,
  getAllTask,
  taskDelete,
} from "@/services/taskServices";
import { useNavigate } from "react-router-dom";
import { LoaderCircle } from "lucide-react";
import { useEffect } from "react";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock3 } from "lucide-react";
import { Trash2 } from "lucide-react";

const taskStatistics = [
  {
    id: 1,
    title: "Low Priority",
    value: 0,
    icon: CircleCheckBig,
    color: "text-green-600",
    bgColor: "bg-green-100",
  },
  {
    id: 2,
    title: "Medium Priority",
    value: 0,
    icon: ListTodo,
    color: "text-orange-600",
    bgColor: "bg-orange-100",
  },
  {
    id: 3,
    title: "High Priority",
    value: "0%",
    icon: ChartNoAxesCombined,
    color: "text-violet-600",
    bgColor: "bg-violet-100",
  },
];

const Dashboard = () => {
  const form = useForm({
    resolver: zodResolver(taskSchema),
    defaultValues: {
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      status: "In Progress",
    },
  });

  const taskFormId = useId();

  const auth = useSelector((state) => state.auth);

  const firstName = auth?.user?.name?.split(" ")[0];

  const hour = new Date().getHours();

  let greeting = "";

  if (hour < 12) {
    greeting = "Good Morning";
  } else if (hour < 17) {
    greeting = "Good Afternoon";
  } else if (hour < 21) {
    greeting = "Good Evening";
  } else {
    greeting = "Good Night";
  }

  const [open, setOpen] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [editingTask, setEditingTask] = useState(null);

  async function onSubmit(data) {
    try {
      const payload = {
        title: data.title,
        description: data.description,
        priority: data.priority,
        dueDate: data.dueDate,
        completed: data.status === "Completed",
      };

      let response;

      if (editingTask) {
        response = await editTask(editingTask._id, payload);
      } else {
        response = await addTask(payload);
      }

      if (response.success) {
        toast.success(response.message);

        form.reset();
        setEditingTask(null);
        setOpen(false);

        await fetchTask();
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";

      toast.error(message);
      console.log(errorHandler(error));
    }
  }

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

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });

  const handleAddTask = () => {
    setEditingTask(null);

    form.reset({
      title: "",
      description: "",
      priority: "Low",
      dueDate: "",
      status: "In Progress",
    });

    setOpen(true);
  };

  const handleEditTask = (task) => {
    setEditingTask(task);

    form.reset({
      title: task.title,
      description: task.description,
      priority: task.priority,
      dueDate: task.dueDate.split("T")[0],
      status: task.completed ? "Completed" : "In Progress",
    });

    setOpen(true);
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const response = await taskDelete(taskId);

      if (response.success) {
        toast.success(response.message);
        await fetchTask();
      }
    } catch (error) {
      const message = error?.response?.data?.message || "Something went wrong";
      toast.error(message);
      console.log(errorHandler(error));
    }
  };

  return (
    <section className="w-full">
      <AppBradcrumb currentPage="" />
      <div className="mb-5 flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-5">
        <div className="flex items-start flex-col gap-0">
          <p className="text-black font-semibold text-lg">
            {greeting}, {firstName} <span className="wave">🖐🏼</span>
          </p>
          <span className="text-black/50 text-sm">
            Stay organized and keep your tasks on track.
          </span>
        </div>
        <Dialog
          open={open}
          onOpenChange={(value) => {
            setOpen(value);

            if (!value) {
              setEditingTask(null);

              form.reset({
                title: "",
                description: "",
                priority: "Low",
                dueDate: "",
                status: "In Progress",
              });
            }
          }}
        >
          <DialogTrigger>
            <Button
              type="button"
              onClick={handleAddTask}
              className="w-fit py-5.5 cursor-pointer bg-black/80 hover:bg-black flex items-center gap-2"
            >
              <Plus className="w-5 h-5" />
              <span>Add New Task</span>
            </Button>
          </DialogTrigger>
          <DialogContent
            onOpenAutoFocus={(e) => {
              e.preventDefault();
            }}
          >
            <DialogHeader>
              <DialogTitle>
                <div className="flex items-center justify-center gap-2">
                  <CirclePlus className="w-5 h-5 text-black" />
                  <span className="text-lg font-semibold text-black">
                    {editingTask ? "Update Task" : "Create New Task"}
                  </span>
                </div>
              </DialogTitle>
              <DialogDescription>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <FieldGroup className="mb-3">
                    <Controller
                      name="title"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <FieldLabel
                            htmlFor={`${taskFormId}-title`}
                            className="text-[16px] flex items-center gap-1"
                          >
                            <FilePenLine className="w-3.5 h-3.5" />
                            <span>Title</span>
                          </FieldLabel>
                          <Input
                            {...field}
                            type="text"
                            id={`${taskFormId}-title`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Enter task title"
                            autoComplete="title"
                            className="py-5 rounded focus-visible:ring-0"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <FieldGroup className="mb-3">
                    <Controller
                      name="description"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-1"
                        >
                          <FieldLabel
                            htmlFor={`${taskFormId}-description`}
                            className="text-[16px] flex items-center gap-1"
                          >
                            <ListSortDescending className="w-3.5 h-3.5" />
                            <span>Description</span>
                          </FieldLabel>
                          <Textarea
                            {...field}
                            type="text"
                            id={`${taskFormId}-description`}
                            aria-invalid={fieldState.invalid}
                            placeholder="Add details about your task"
                            autoComplete="description"
                            className="rounded focus-visible:ring-0"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <div className="flex md:gap-4 flex-col md:flex-row">
                    <FieldGroup className="mb-3">
                      <Controller
                        name="priority"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1"
                          >
                            <FieldLabel
                              htmlFor={`${taskFormId}-priority`}
                              className="text-[16px] flex items-center gap-1"
                            >
                              <Flag className="w-3.5 h-3.5" />
                              <span>Priority</span>
                            </FieldLabel>
                            <select
                              {...field}
                              id={`${taskFormId}-priority`}
                              className="w-full rounded-md border border-input bg-background px-1.5 py-2.5 text-sm focus:outline-none"
                            >
                              <option value="">Select Priority</option>
                              <option value="Low">Low</option>
                              <option value="Medium">Medium</option>
                              <option value="High">High</option>
                            </select>
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                    <FieldGroup className="mb-3">
                      <Controller
                        name="dueDate"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field
                            data-invalid={fieldState.invalid}
                            className="gap-1"
                          >
                            <FieldLabel
                              htmlFor={`${taskFormId}-dueDate`}
                              className="text-[16px] flex items-center gap-1"
                            >
                              <CalendarDays className="w-3.5 h-3.5" />
                              <span>Due Date</span>
                            </FieldLabel>
                            <Input
                              {...field}
                              type="date"
                              id={`${taskFormId}-dueDate`}
                              aria-invalid={fieldState.invalid}
                              className="py-5 rounded focus-visible:ring-0"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                    </FieldGroup>
                  </div>
                  <FieldGroup className="mb-3">
                    <Controller
                      name="status"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field
                          data-invalid={fieldState.invalid}
                          className="gap-2"
                        >
                          <FieldLabel className="text-[16px] flex items-center gap-1">
                            <CircleCheckBig className="w-3.5 h-3.5" />
                            <span>Status</span>
                          </FieldLabel>
                          <RadioGroup
                            value={field.value}
                            onValueChange={field.onChange}
                            className="flex items-center gap-6"
                          >
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                value="In Progress"
                                id={`${taskFormId}-in-progress`}
                              />
                              <label
                                htmlFor={`${taskFormId}-in-progress`}
                                className="text-sm font-medium cursor-pointer"
                              >
                                In Progress
                              </label>
                            </div>
                            <div className="flex items-center gap-2">
                              <RadioGroupItem
                                value="Completed"
                                id={`${taskFormId}-completed`}
                              />
                              <label
                                htmlFor={`${taskFormId}-completed`}
                                className="text-sm font-medium cursor-pointer"
                              >
                                Completed
                              </label>
                            </div>
                          </RadioGroup>
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error]} />
                          )}
                        </Field>
                      )}
                    />
                  </FieldGroup>
                  <Button
                    type="submit"
                    disabled={form.formState.isSubmitting}
                    className="w-full py-5.5 cursor-pointer bg-black/80 hover:bg-black"
                  >
                    {form.formState.isSubmitting ? (
                      editingTask ? (
                        <span className="flex items-center justify-center gap-2">
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Updating Task...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <LoaderCircle className="h-4 w-4 animate-spin" />
                          Creating Task...
                        </span>
                      )
                    ) : editingTask ? (
                      "Update Task"
                    ) : (
                      "Create Task"
                    )}
                  </Button>
                </form>
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
                <p className="text-black font-semibold text-sm">{task.value}</p>
                <span className="text-black/50 text-sm">{task.title}</span>
              </div>
            </div>
          );
        })}
      </div>
      <div className="mt-6 space-y-4">
        {tasks.map((task) => (
          <Card
            key={task._id}
            className="bg-black/4 transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
          >
            <CardHeader className="flex flex-row justify-between items-start">
              <div className="flex gap-3">
                <div
                  className={`mt-2 h-3 w-3 rounded-full ${priorityDot[task.priority]}`}
                />
                <div>
                  <CardTitle className="text-lg">{task.title}</CardTitle>
                  <CardDescription className="mt-2 line-clamp-2">
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
              <div className="flex flex-wrap gap-6 text-sm text-muted-foreground pl-6">
                <div className="flex items-center gap-2">
                  <CalendarDays className="h-4 w-4" />
                  Due {formatDate(task.dueDate)}
                </div>
                <div className="flex items-center gap-2">
                  <Clock3 className="h-4 w-4" />
                  Created {formatDate(task.createdAt)}
                </div>
              </div>
              <div className="flex items-center gap-2 self-end">
                <Button
                  size="icon"
                  variant="outline"
                  className="cursor-pointer"
                  onClick={() => handleEditTask(task)}
                >
                  <FilePenLine className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="destructive"
                  className="cursor-pointer"
                  onClick={() => handleDeleteTask(task?._id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default Dashboard;
