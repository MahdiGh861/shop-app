"use client";
import { useTheme } from "next-themes";
import { SunIcon, MoonIcon, SunMoonIcon, MonitorIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuCheckboxItem,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";

function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();
  useEffect(() => {
    setMounted(true);
  }, []);
  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon-lg"
              className="rounded-2xl focus-visible:ring-0 focus-visible:ring-offset-0 hover:bg-accent/70 hover:text-primary transition-all duration-300"
            />
          }
        >
          <div className="transition-transform duration-500 hover:rotate-12">
            {!mounted ? (
              <SunMoonIcon className="w-5 h-5" strokeWidth={2} />
            ) : theme === "system" ? (
              <MonitorIcon className="w-5 h-5" strokeWidth={2} />
            ) : theme === "dark" ? (
              <MoonIcon className="w-5 h-5" strokeWidth={2} />
            ) : (
              <SunIcon className="w-5 h-5" strokeWidth={2} />
            )}
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="rounded-2xl p-1.5 w-44 shadow-soft-xl border-border/70" align="end">
          <DropdownMenuGroup>
            <DropdownMenuLabel className="px-3 py-2 text-xs font-black text-muted-foreground tracking-wider uppercase">
              تم نمایشگاه
            </DropdownMenuLabel>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <div className="space-y-1 mt-1">
            <DropdownMenuCheckboxItem
              checked={theme === "system"}
              onClick={() => {
                setTheme("system");
              }}
              className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              <MonitorIcon className="w-4 h-4 ml-2 text-muted-foreground" strokeWidth={2} />
              سیستم
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "dark"}
              onClick={() => {
                setTheme("dark");
              }}
              className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              <MoonIcon className="w-4 h-4 ml-2 text-indigo-500" strokeWidth={2} />
              تم تیره
            </DropdownMenuCheckboxItem>
            <DropdownMenuCheckboxItem
              checked={theme === "light"}
              onClick={() => {
                setTheme("light");
              }}
              className="rounded-xl px-3 py-2.5 text-sm font-medium hover:bg-accent transition-colors cursor-pointer"
            >
              <SunIcon className="w-4 h-4 ml-2 text-amber-500" strokeWidth={2} />
              تم روشن
            </DropdownMenuCheckboxItem>
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
}

export default ThemeToggle;
