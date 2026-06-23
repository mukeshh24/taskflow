import React from "react";

const TaskOverview = ({task,Icon}) => {
  return (
    <div
      key={task.id}
      className="flex items-center gap-2 bg-black/4 p-5 rounded group"
    >
      <div className="w-10 h-10 flex items-center justify-center bg-zinc-200 rounded">
        <Icon
          className={`h-5 w-5 ${task.color} group-hover:scale-120 transition-all duration-300`}
        />
      </div>
      <div className="flex items-start flex-col gap-0">
        <p className="text-black font-semibold text-sm">{task.value}</p>
        <span className="text-black/50 text-sm">{task.title}</span>
      </div>
    </div>
  );
};

export default TaskOverview;
