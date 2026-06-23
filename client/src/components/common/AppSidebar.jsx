import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { ListCheck } from "lucide-react";
import { CircleCheck } from "lucide-react";
import { House } from "lucide-react";
import { ClipboardList } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { Sparkles } from "lucide-react";
import { Lightbulb } from "lucide-react";
import { Settings } from "lucide-react";
import { useSelector } from "react-redux";

export function AppSidebar() {
  const { setOpenMobile } = useSidebar();
  const auth = useSelector((state) => state.auth);

  return (
    <Sidebar>
      <SidebarHeader className="flex items-start justify-center h-18 border-b px-4">
        <Link to="/" className="flex items-center gap-0.5 cursor-pointer">
          <ClipboardList className="w-6 h-6 text-black" />
          <span className="text-2xl font-bold text-black">TaskFlow</span>
        </Link>
      </SidebarHeader>
      <SidebarContent className="px-3">
        <SidebarGroup className="py-5">
          <div className="flex items-center gap-2">
            <Avatar className="w-10 h-10">
              <AvatarFallback className="text-black font-semibold text-sm capitalize">
                {auth?.user?.name[0]}
              </AvatarFallback>
            </Avatar>
            <div className="flex items-start flex-col">
              <p className="text-black font-semibold text-sm capitalize">
                Hey, {auth?.user?.name}
              </p>
              <p className="text-black/50 text-sm flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-black" />
                <span>Let's crush some tasks!</span>
              </p>
            </div>
          </div>
        </SidebarGroup>
        <SidebarGroup>
          <SidebarGroupLabel>Platform</SidebarGroupLabel>
          <SidebarMenu className="px-5">
            <SidebarMenuItem className="mb-2">
              <SidebarMenuButton asChild className="">
                <NavLink
                  to="/dashboard"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center gap-2 py-6"
                >
                  <House className="h-5 w-5 text-black" />
                  <span className="text-sm">Dashboard</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="mb-2">
              <SidebarMenuButton asChild className="">
                <NavLink
                  to="/pending"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center gap-2 py-6"
                >
                  <ListCheck className="h-5 w-5 text-black" />
                  <span className="text-sm">Pending Task</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="mb-2">
              <SidebarMenuButton asChild className="">
                <NavLink
                  to="/complete"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center gap-2 py-6"
                >
                  <CircleCheck className="h-5 w-5 text-black" />
                  <span className="text-sm">Complete Task</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem className="mb-2">
              <SidebarMenuButton asChild className="">
                <NavLink
                  to="/profile"
                  onClick={() => setOpenMobile(false)}
                  className="flex items-center gap-2 py-6"
                >
                  <Settings className="h-5 w-5 text-black" />
                  <span className="text-sm">Profile</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarGroup>
        <SidebarGroup className="pt-20 md:pt-40">
          <div className="bg-black/4 p-5 flex flex-col gap-1 rounded">
            <div className="flex items-center gap-3">
              <div className="w-16 h-9 flex items-center justify-center bg-zinc-200 rounded">
                <Lightbulb className="h-5 w-5 text-black" />
              </div>
              <div className="flex items-start flex-col">
                <p className="text-black font-semibold text-sm">Pro Tip</p>
                <p className="text-black/50 text-[12px]">
                  Use keyboard shortcuts to boost productivity!
                </p>
              </div>
            </div>
            <div className="flex items-center">
              <p className="text-black font-normal text-sm">
                Visit{" "}
                <Link
                  to="/"
                  className="text-black font-semibold text-sm hover:underline underline-offset-2 transition-all duration-300"
                >
                  Mukesh Suthar
                </Link>
              </p>
            </div>
          </div>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
