"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  UserIcon,
  MapPinIcon,
  ShoppingBagIcon,
  SettingsIcon,
  LayoutDashboardIcon,
  ShieldIcon,
} from "lucide-react"

const baseSidebarLinks = [
  {
    href: "/user",
    label: "داشبورد",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/user/profile",
    label: "پروفایل",
    icon: UserIcon,
  },
  {
    href: "/user/addresses",
    label: "آدرس‌ها",
    icon: MapPinIcon,
  },
  {
    href: "/user/orders",
    label: "سفارشات",
    icon: ShoppingBagIcon,
  },
  {
    href: "/user/settings",
    label: "تنظیمات",
    icon: SettingsIcon,
  },
]

const adminLink = {
  href: "/dashboard",
  label: "پنل مدیریت",
  icon: ShieldIcon,
}

export default function UserSidebar({ role }: { role?: string }) {
  const pathname = usePathname()
  const sidebarLinks =
    role === "admin" ? [...baseSidebarLinks, adminLink] : baseSidebarLinks

  return (
    <nav className="flex flex-col gap-1 w-full">
      {sidebarLinks.map((link) => {
        const isActive = pathname === link.href
        return (
          <Button
            key={link.href}
            variant={isActive ? "secondary" : "ghost"}
            className={cn(
              "justify-start gap-3 h-12",
              isActive && "bg-primary/10 text-primary font-semibold"
            )}
          >
            <Link href={link.href}>
              <link.icon className="h-5 w-5" />
              {link.label}
            </Link>
          </Button>
        )
      })}
    </nav>
  )
}
