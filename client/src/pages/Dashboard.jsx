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
import { useState } from "react";
import { useId } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
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
import { CalendarDays } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { errorHandler } from "@/lib/errorHandlre";
import { addTask, editTask, taskDelete } from "@/services/taskServices";
import { LoaderCircle } from "lucide-react";
import { useContext } from "react";
import { TaskContext } from "@/context/TaskContext";
import TaskCard from "@/components/common/TaskCard";
import TaskOverview from "@/components/common/TaskOverview";
import EmptyTask from "@/components/common/EmptyTask";
import { ClipboardList } from "lucide-react";

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
  const [editingTask, setEditingTask] = useState(null);
  const { tasks, fetchTask } = useContext(TaskContext);

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

  const lowPriorityTask = tasks.filter((task) => task.priority === "Low");
  const mediumPriorityTask = tasks.filter((task) => task.priority === "Medium");
  const highPriorityTask = tasks.filter((task) => task.priority === "High");
  const taskStatistics = [
    {
      id: 1,
      title: "Low Priority",
      value: lowPriorityTask.length,
      icon: CircleCheckBig,
      color: "text-green-500",
    },
    {
      id: 2,
      title: "Medium Priority",
      value: mediumPriorityTask.length,
      icon: ListTodo,
      color: "text-orange-500",
    },
    {
      id: 3,
      title: "High Priority",
      value: highPriorityTask.length,
      icon: ChartNoAxesCombined,
      color: "text-red-500",
    },
  ];

  return (
    <section className="w-full">
      <AppBradcrumb currentPage="" />
      <div className="mb-5 flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between gap-5">
        <div className="flex items-start flex-col gap-0">
          <p className="text-black font-semibold text-lg capitalize">
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
          <DialogTrigger className="w-fit">
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
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
        {taskStatistics.map((task) => {
          const Icon = task.icon;
          return <TaskOverview key={task.id} task={task} Icon={Icon} />;
        })}
      </div>
      <div className="mt-6 space-y-4">
        {tasks.length > 0 ? (
          <>
            {tasks.map((task) => (
              <TaskCard
                key={task._id}
                task={task}
                onEdit={handleEditTask}
                onDelete={handleDeleteTask}
                updateTask={true}
              />
            ))}
          </>
        ) : (
          <EmptyTask
            Icon={ClipboardList}
            title="No Tasks Yet"
            description="You haven't created any tasks yet. Click 'Add New Task' to create your first task."
          />
        )}
      </div>
    </section>
  );
};

export default Dashboard;
