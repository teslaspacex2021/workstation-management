"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Building2,
  Boxes,
  UserCog,
  Users,
  LayoutDashboard,
  FileText,
  MonitorPlay,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";

const navItems = [
  {
    title: "大屏展示",
    href: "/",
    icon: MonitorPlay,
  },
  {
    title: "办公地点信息管理",
    icon: Building2,
    items: [
      { title: "房产信息管理", href: "/properties" },
      { title: "办公区信息管理", href: "/offices" },
      { title: "工位规划信息管理", href: "/workstations" },
    ],
  },
  {
    title: "工位分配管理",
    icon: UserCog,
    items: [
      { title: "工位分配", href: "/assignments" },
      { title: "员工管理", href: "/employees" },
    ],
  },
  {
    title: "报表展示",
    href: "/reports",
    icon: FileText,
  },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={cn(
      "flex h-screen flex-col border-r bg-gradient-to-b from-card to-card/95 transition-all duration-300 relative shadow-lg",
      isCollapsed ? "w-16" : "w-56"
    )}>
      {/* 折叠按钮 */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-6 z-50 h-6 w-6 rounded-full border bg-background p-0 shadow-md hover:bg-accent"
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>

      <div className="flex h-16 items-center border-b px-4 bg-gradient-to-r from-primary/5 to-transparent">
        <Building2 className="h-6 w-6 text-primary flex-shrink-0" />
        {!isCollapsed && (
          <h1 className="ml-2 text-lg font-semibold whitespace-nowrap">工位信息管理</h1>
        )}
      </div>
      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        {navItems.map((item) => {
          if (item.items) {
            return (
              <div key={item.title} className="space-y-1">
                <div className={cn(
                  "flex items-center px-3 py-2 text-sm font-medium text-muted-foreground rounded-md bg-accent/50",
                  isCollapsed && "justify-center px-0"
                )}>
                  <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
                  {!isCollapsed && item.title}
                </div>
                {!isCollapsed && (
                  <div className="ml-6 space-y-1 border-l-2 border-border/50 pl-2">
                    {item.items.map((subItem) => (
                      <Link
                        key={subItem.href}
                        href={subItem.href}
                        className={cn(
                          "flex items-center rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                          pathname === subItem.href
                            ? "bg-primary/10 text-primary font-medium border-l-2 border-primary"
                            : "text-muted-foreground"
                        )}
                      >
                        {subItem.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            );
          }
          return (
            <Link
              key={item.href}
              href={item.href}
              title={isCollapsed ? item.title : undefined}
              className={cn(
                "flex items-center rounded-md px-3 py-2 text-sm transition-all hover:bg-accent hover:text-accent-foreground hover:shadow-sm",
                pathname === item.href
                  ? "bg-primary/10 text-primary font-medium shadow-sm"
                  : "text-muted-foreground",
                isCollapsed && "justify-center px-0"
              )}
            >
              <item.icon className={cn("h-4 w-4", !isCollapsed && "mr-2")} />
              {!isCollapsed && item.title}
            </Link>
          );
        })}
      </nav>
      {!isCollapsed && (
        <div className="border-t p-4 bg-gradient-to-r from-muted/30 to-transparent">
          <div className="text-xs text-muted-foreground">
            省公司综合生产楼房间及工位信息管理系统 v1.0
          </div>
        </div>
      )}
    </div>
  );
}

