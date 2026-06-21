import React from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/common/AppSidebar";
import { Outlet } from "react-router-dom";
import Header from "@/components/common/Header";

const WebLayout = () => {
  return (
    <SidebarProvider>
      <Header />
      <AppSidebar />
      <main className="w-full bg-white text-zinc-800">
        <div className="w-full min-h-screen pt-22 pb-5 px-2 md:px-3 lg:px-5">
          {/* <SidebarTrigger /> */}
          <Outlet />
        </div>
      </main>
    </SidebarProvider>
  );
};

export default WebLayout;
