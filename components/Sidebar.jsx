"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Users,
  Clock,
  Calendar,
  FileText,
  DollarSign,
  LogOut,
  Menu,
  UserCheck,
  ClipboardList,
  Briefcase,
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const Sidebar = () => {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Set mounted state to prevent hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Don't render until we're sure we're on the client
  if (!isMounted || !user) return null;

  // Navigation items based on user role
  const navItems = {
    admin: [
      { title: "Dashboard", href: "/dashboard/admin", icon: LayoutDashboard },
      { title: "Employees", href: "/dashboard/admin/employee", icon: Users },
      { title: "Attendance", href: "/dashboard/admin/attendance", icon: Clock },
      {
        title: "Leave Management",
        href: "/dashboard/admin/leave",
        icon: FileText,
      },
      {
        title: "Salary / Payroll",
        href: "/dashboard/admin/salary",
        icon: DollarSign,
      },
      { title: "Calendar", href: "/dashboard/admin/calendar", icon: Calendar },
    ],
    "team-lead": [
      {
        title: "Dashboard",
        href: "/dashboard/team-lead",
        icon: LayoutDashboard,
      },
      { title: "Team Members", href: "/dashboard/team-lead/team", icon: Users },
      {
        title: "Team Attendance",
        href: "/dashboard/team-lead/attendance",
        icon: Clock,
      },
      {
        title: "Leave Approvals",
        href: "/dashboard/team-lead/leave",
        icon: ClipboardList,
      },
      {
        title: "Calendar",
        href: "/dashboard/team-lead/calendar",
        icon: Calendar,
      },
    ],
    employee: [
      {
        title: "Dashboard",
        href: "/dashboard/employee",
        icon: LayoutDashboard,
      },
      {
        title: "My Attendance",
        href: "/dashboard/employee/attendance",
        icon: Clock,
      },
      {
        title: "My Leaves",
        href: "/dashboard/employee/leave",
        icon: FileText,
      },
      {
        title: "Salary / Payslip",
        href: "/dashboard/employee/salary",
        icon: DollarSign,
      },
      {
        title: "Calendar",
        href: "/dashboard/employee/calendar",
        icon: Calendar,
      },
    ],
  };

  // Icons for different roles
  const roleIcons = {
    admin: Briefcase,
    "team-lead": UserCheck,
    employee: Users,
  };

  // Labels for different roles
  const roleLabels = {
    admin: "Admin",
    "team-lead": "Team Lead",
    employee: "Employee",
  };

  // Get user's navigation and icon
  const userNavItems = navItems[user.role] || [];
  const RoleIcon = roleIcons[user.role] || Users;

  // Sidebar content (used for both desktop and mobile)
  const renderSidebarContent = () => (
    <div className="flex flex-col h-full bg-gray-900 text-white">
      {/* Logo section */}
      <div className="h-16 flex items-center px-6 border-b border-green-400">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
            <RoleIcon className="h-4 w-4 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-sm">Employee System</h2>
            <p className="text-xs text-gray-400">{roleLabels[user.role]}</p>
          </div>
        </div>
      </div>

      {/* Navigation links */}
      <div className="flex-1 py-4 overflow-y-auto">
        <nav className="px-3 space-y-1">
          {userNavItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsMobileOpen(false)}
                className={cn(
                  "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                  isActive
                    ? "bg-blue-600 text-white"
                    : "text-gray-400 hover:bg-gray-800 hover:text-white"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.title}
              </Link>
            );
          })}
        </nav>
      </div>

      {/* User info and logout */}
      <div className="p-4 border-t border-gray-800">
        <div className="flex items-center gap-3 px-3 py-2 mb-2">
          <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center">
            <span className="text-xs font-medium text-white">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </span>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">
              {user.name}
            </p>
            <p className="text-xs text-gray-400 truncate">{user.email}</p>
          </div>
        </div>
        <button
          className="w-full flex items-center justify-start text-gray-400 hover:text-red-400 hover:bg-gray-800 px-3 py-2 rounded-md text-sm font-medium"
          onClick={logout}
        >
          <LogOut className="h-4 w-4 mr-3" />
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop sidebar (visible on large screens) */}
      <aside className="hidden lg:flex w-64 flex-col fixed inset-y-0 left-0 z-40 border-r border-gray-800">
        {renderSidebarContent()}
      </aside>

      {/* Mobile sidebar */}
      <div className="lg:hidden">
        {/* Mobile menu button */}
        <button
          onClick={() => setIsMobileOpen(true)}
          className="fixed top-4 right-4 z-50 bg-gray-900 border border-gray-700 w-10 h-10 rounded-md flex items-center justify-center"
        >
          <Menu className="h-5 w-5 text-white" />
          <span className="sr-only">Open menu</span>
        </button>

        {/* Mobile overlay (click to close) */}
        {isMobileOpen && (
          <div
            className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsMobileOpen(false)}
          />
        )}

        {/* Mobile sidebar panel */}
        <div
          className={`fixed top-0 left-0 h-full w-64 z-50 transform transition-transform duration-300 ${
            isMobileOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {renderSidebarContent()}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
