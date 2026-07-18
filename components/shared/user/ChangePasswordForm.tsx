"use client"

import { useActionState } from "react"
import { changeUserPassword } from "@/lib/actions/user.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

export default function ChangePasswordForm() {
  const [state, formAction, isPending] = useActionState(changeUserPassword, {
    success: false,
    message: "",
  })

  if (state.success && state.message) {
    toast.success(state.message)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>تغییر رمز عبور</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="currentPassword">رمز عبور فعلی</Label>
            <Input
              id="currentPassword"
              name="currentPassword"
              type="password"
              placeholder="رمز عبور فعلی خود را وارد کنید"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="newPassword">رمز عبور جدید</Label>
            <Input
              id="newPassword"
              name="newPassword"
              type="password"
              placeholder="رمز عبور جدید را وارد کنید"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirmPassword">تکرار رمز عبور جدید</Label>
            <Input
              id="confirmPassword"
              name="confirmPassword"
              type="password"
              placeholder="رمز عبور جدید را تکرار کنید"
              required
            />
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "در حال تغییر..." : "تغییر رمز عبور"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
