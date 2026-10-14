import Link from "next/link";
import { UserIcon, LayoutDashboardIcon, LogOutIcon, ShoppingBagIcon, SettingsIcon, MapPinIcon, CreditCardIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { auth } from "@/auth";
import { signOutUser } from "@/lib/actions/user.action";
import { Badge } from "@/components/ui/badge";

async function UserButton() {
  const session = await auth();
  if(!session){
    return (
      <Link href="/sign-in">
        <Button size="sm" className="h-11 px-5 rounded-2xl text-sm font-bold cursor-pointer">
          <UserIcon className="w-4.5 h-4.5 ml-2" strokeWidth={2} />
          <span className="hidden sm:inline">ورود | ثبت نام</span>
          <span className="sm:hidden">ورود</span>
        </Button>
      </Link>
    )
  }
  const initials = session.user?.name ? session.user.name.charAt(0).toUpperCase() : "U";
  return (
    <div className="flex gap-2 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-11 pl-2 pr-3 md:pr-4 rounded-2xl hover:bg-accent/70 transition-all duration-300 gap-2"
                >
                  <div className="relative">
                    <div className="w-8 h-8 md:w-9 md:h-9 rounded-xl gradient-primary flex items-center justify-center text-white font-black text-sm shadow-soft">
                      {initials}
                    </div>
                    <span className="absolute -top-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-green-500 border-2 border-background dark:border-background" />
                  </div>
                  <span className="hidden md:block text-sm font-bold">{session.user?.name}</span>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64 rounded-2xl p-1.5 shadow-soft-xl border-border/70" align="end">
                <DropdownMenuGroup className="p-2 rounded-xl bg-linear-to-br from-accent/50 to-transparent mb-1">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-xl gradient-primary flex items-center justify-center text-white font-black shadow-soft shrink-0">
                      {initials}
                    </div>
                    <div className="min-w-0">
                      <DropdownMenuLabel className="p-0 font-black text-base truncate">{session.user?.name}</DropdownMenuLabel>
                      <p className="text-xs text-muted-foreground truncate" dir="ltr">{session.user?.email}</p>
                    </div>
                  </div>
                </DropdownMenuGroup>
                <DropdownMenuSeparator className="my-1" />
                <div className="space-y-1 my-1">
                <DropdownMenuItem className="p-0">
                    <Button  variant="ghost" className="w-full justify-start gap-3 h-11 px-3 rounded-xl text-sm font-medium">
                        <Link href="/user">
                            <LayoutDashboardIcon className="w-4.5 h-4.5 text-indigo-500" strokeWidth={2} />
                            پنل کاربری
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                    <Button  variant="ghost" className="w-full justify-start gap-3 h-11 px-3 rounded-xl text-sm font-medium">
                        <Link href="/user/orders">
                            <ShoppingBagIcon className="w-4.5 h-4.5 text-violet-500" strokeWidth={2} />
                            سفارش‌های من
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                    <Button  variant="ghost" className="w-full justify-start gap-3 h-11 px-3 rounded-xl text-sm font-medium">
                        <Link href="/user/addresses">
                            <MapPinIcon className="w-4.5 h-4.5 text-emerald-500" strokeWidth={2} />
                            آدرس‌ها
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuItem className="p-0">
                    <Button  variant="ghost" className="w-full justify-start gap-3 h-11 px-3 rounded-xl text-sm font-medium">
                        <Link href="/user/settings">
                            <SettingsIcon className="w-4.5 h-4.5 text-amber-500" strokeWidth={2} />
                            تنظیمات
                        </Link>
                    </Button>
                </DropdownMenuItem>
                </div>
                <DropdownMenuSeparator className="my-1" />
                <DropdownMenuItem className="p-0 my-1">
                    <form action={signOutUser} className="w-full">
                        <Button className="w-full h-11 px-3 justify-start gap-3" type="submit" variant="ghost">
                            <LogOutIcon className="w-4.5 h-4.5 text-rose-500" strokeWidth={2} />
                            <span className="text-sm font-medium text-rose-600 dark:text-rose-400">خروج از حساب</span>
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}

export default UserButton;
