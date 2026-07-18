"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  UsersIcon,
  LayoutDashboardIcon,
  ShoppingBagIcon,
} from "lucide-react"

const adminLinks = [
  {
    href: "/dashboard",
    label: "داشبورد",
    icon: LayoutDashboardIcon,
  },
  {
    href: "/users",
    label: "کاربران",
    icon: UsersIcon,
  },
]

export default function AdminSidebar() {
  const pathname = usePathname()

  return (
    <nav className="flex flex-col gap-1 w-full">
      {adminLinks.map((link) => {
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
