import React from "react";
import { Button } from "../ui/button";

const EmptyTask = ({ Icon, title, description, buttonText, onClick }) => {
  return (
    <div className="flex flex-col items-center justify-center gap-3 rounded-lg border border-dashed bg-zinc-50 py-16">
      <div className="flex h-16 w-16 items-center justify-center rounded-full bg-zinc-200">
        <Icon className="h-8 w-8 text-zinc-500" />
      </div>
      <h3 className="text-lg font-semibold text-black">{title}</h3>
      <p className="max-w-sm text-center text-sm text-zinc-500">
        {description}
      </p>
      {buttonText && (
        <Button
          onClick={onClick}
          className="w-fit py-5.5 cursor-pointer bg-black/80 hover:bg-black flex items-center justify-center"
        >
          {buttonText}
        </Button>
      )}
    </div>
  );
};

export default EmptyTask;
