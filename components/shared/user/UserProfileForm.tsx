"use client"

import { useActionState } from "react"
import { updateUserProfile } from "@/lib/actions/user.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface UserProfileFormProps {
  user: {
    name: string | null
    email: string | null
    image: string | null
  }
}

export default function UserProfileForm({ user }: UserProfileFormProps) {
  const [state, formAction, isPending] = useActionState(updateUserProfile, {
    success: false,
    message: "",
  })

  if (state.success && state.message) {
    toast.success(state.message)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>ویرایش پروفایل</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">نام</Label>
            <Input
              id="name"
              name="name"
              defaultValue={user.name || ""}
              placeholder="نام خود را وارد کنید"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">ایمیل</Label>
            <Input
              id="email"
              name="email"
              type="email"
              defaultValue={user.email || ""}
              placeholder="ایمیل خود را وارد کنید"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">لینک تصویر پروفایل</Label>
            <Input
              id="image"
              name="image"
              defaultValue={user.image || ""}
              placeholder="لینک تصویر خود را وارد کنید"
            />
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "در حال ذخیره..." : "ذخیره تغییرات"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
