import React from "react";
import { NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  MessageSquare,
  Image as ImageIcon,
  Mic2,
  Volume2,
  Sparkles,
  Command,
} from "lucide-react";
import { cn } from "../UI/Button";

const links = [
  { name: "Dashboard", path: "/", icon: LayoutDashboard },
  { name: "Text To Text", path: "/text-to-text", icon: MessageSquare },
  { name: "Image To Text", path: "/image-to-text", icon: ImageIcon },
  { name: "Audio To Text", path: "/audio-to-text", icon: Mic2 },
  { name: "Text To Audio", path: "/text-to-audio", icon: Volume2 },
  { name: "Text To Image", path: "/text-to-image", icon: Sparkles },
];

export const Sidebar = ({ isOpen, toggleSidebar }) => {
  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-72 bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-800 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 overflow-y-auto",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="p-6">
          <div className="flex items-center gap-3 px-2 mb-10">
            <div className="w-10 h-10 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30">
              <Command className="w-6 h-6" />
            </div>
            <div>
              <p className="text-[10px] uppercase tracking-widest text-slate-500 font-bold">
                Pro Assistant
              </p>
            </div>
          </div>

          <nav className="space-y-1">
            {links.map((link) => (
              <NavLink
                key={link.path}
                to={link.path}
                className={({ isActive }) =>
                  cn("nav-link", isActive && "active")
                }
                onClick={() => {
                  if (window.innerWidth < 1024) toggleSidebar();
                }}
              >
                <link.icon className="w-5 h-5" />
                <span>{link.name}</span>
              </NavLink>
            ))}
          </nav>
        </div>
      </aside>
    </>
  );
};
