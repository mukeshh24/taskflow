import { ClipboardList } from "lucide-react";
import { Settings } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";

const Header = () => {
  const auth = useSelector((state) => state.auth);

  return (
    <header className="flex items-center justify-between border-b h-18 fixed z-20 bg-zinc-50 top-0 left-0 w-full px-3 md:px-10 lg:px-40">
      <Link to="/" className="flex items-center gap-0.5 cursor-pointer">
        <ClipboardList className="w-6 h-6 text-black" />
        <span className="text-2xl font-bold text-black">TaskFlow</span>
      </Link>
      <div className="flex items-center gap-5">
        <Link
          to="/profile"
          className="cursor-pointer text-black/70 hover:text-black transition-all duration-300"
        >
          <Settings className="w-6 h-6" />
        </Link>
        <div className="flex items-center gap-2">
          <Avatar className="w-10 h-10 relative">
            <AvatarFallback className="text-black font-semibold text-lg">
              {auth?.user?.name[0]}
            </AvatarFallback>
            <div className="h-3 w-3 bg-green-400 rounded-full absolute -bottom-1 right-1"></div>
          </Avatar>
          <div className="hidden md:flex items-start flex-col">
            <p className="text-black font-semibold text-sm">
              {auth?.user?.name}
            </p>
            <span className="text-black/50 text-sm">{auth?.user?.email}</span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
