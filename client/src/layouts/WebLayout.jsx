import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";
import TaskStatistics from "@/components/common/TaskStatistics";

const WebLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <main className="w-full bg-white text-zinc-800">
        <section className="w-full min-h-screen pt-22 pb-5 px-5 flex flex-col lg:flex-row items-start justify-between gap-5">
          {/* <SidebarTrigger /> */}
          <div className="flex-1 w-full">
            <Outlet />
          </div>
          <TaskStatistics />
        </section>
      </main>
    </SidebarProvider>
  );
};

export default WebLayout;
