import Link from "next/link";
import { UserIcon, LayoutDashboardIcon, LogOutIcon } from "lucide-react";
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
async function UserButton() {
  const session = await auth();
  if(!session){
    return (
        <Button>
            <Link href="/sign-in" className="flex gap-3">
            <UserIcon/> حساب کاربری
            </Link>
        </Button>
    )
  }
  return (
    <div className="flex gap-2 items-center">
        <DropdownMenu>
            <DropdownMenuTrigger>
                <div className="flex items-center ">
                    <Button variant="ghost" className="relative rounded-md ml-2 flex items-center justify-center">
                        {session.user?.name}
                    </Button>
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56 " align="end">
                <DropdownMenuGroup>
                  <DropdownMenuLabel>حساب کاربری</DropdownMenuLabel>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                    <Button asChild variant="ghost" className="w-full justify-start gap-2">
                        <Link href="/user">
                            <LayoutDashboardIcon className="h-4 w-4" />
                            پنل کاربری
                        </Link>
                    </Button>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="p-0">
                    <form action={signOutUser} className="w-full">
                        <Button className="w-full py-4 px-2 h-4 justify-start gap-2" type="submit" variant="ghost">
                            <LogOutIcon className="h-4 w-4" />
                            خروج
                        </Button>
                    </form>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    </div>
  );
}

export default UserButton;
