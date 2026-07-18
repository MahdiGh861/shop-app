"use client"

import { useState } from "react"
import { useActionState } from "react"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { TrashIcon } from "lucide-react"
import { deleteUser } from "@/lib/actions/admin.actions"

type User = {
  id: string
  name: string | null
  email: string | null
  role: string
  createdAt: string
}

export default function UsersTable({
  users,
  currentUserId,
}: {
  users: User[]
  currentUserId: string
}) {
  const router = useRouter()
  const [openDialog, setOpenDialog] = useState<string | null>(null)

  const [state, formAction, isPending] = useActionState(
    async (_prev: unknown, userId: string) => {
      const result = await deleteUser(userId)
      if (result.success) {
        toast.success(result.message)
        setOpenDialog(null)
        router.refresh()
      } else {
        toast.error(result.message)
      }
      return result
    },
    { success: false, message: "" }
  )

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold">مدیریت کاربران</h1>
        <p className="text-muted-foreground">لیست تمام کاربران ثبت‌نام شده</p>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>نام</TableHead>
            <TableHead>ایمیل</TableHead>
            <TableHead>نقش</TableHead>
            <TableHead>تاریخ عضویت</TableHead>
            <TableHead className="text-left">عملیات</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">
                {user.name || "-"}
              </TableCell>
              <TableCell>{user.email || "-"}</TableCell>
              <TableCell>
                <Badge variant={user.role === "admin" ? "default" : "secondary"}>
                  {user.role === "admin" ? "مدیر" : "کاربر"}
                </Badge>
              </TableCell>
              <TableCell>
                {new Date(user.createdAt).toLocaleDateString("fa-IR")}
              </TableCell>
              <TableCell>
                {user.id !== currentUserId && (
                  <Dialog
                    open={openDialog === user.id}
                    onOpenChange={(open) => setOpenDialog(open ? user.id : null)}
                  >
                    <DialogTrigger
                      render={
                        <Button variant="destructive" size="icon-sm" />
                      }
                    >
                      <TrashIcon />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>حذف کاربر</DialogTitle>
                        <DialogDescription>
                          آیا مطمئن هستید که می‌خواهید کاربر{" "}
                          <strong>{user.name || user.email}</strong> را حذف
                          کنید؟ این عمل قابل بازگشت نیست.
                        </DialogDescription>
                      </DialogHeader>
                      <DialogFooter>
                        <Button
                          variant="outline"
                          onClick={() => setOpenDialog(null)}
                        >
                          انصراف
                        </Button>
                        <Button
                          variant="destructive"
                          disabled={isPending}
                          onClick={() => formAction(user.id)}
                        >
                          {isPending ? "در حال حذف..." : "حذف"}
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                )}
              </TableCell>
            </TableRow>
          ))}
          {users.length === 0 && (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-muted-foreground py-8">
                هیچ کاربری یافت نشد.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}
