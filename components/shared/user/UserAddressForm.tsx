"use client"

import { useActionState } from "react"
import { updateUserAddress } from "@/lib/actions/user.action"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { toast } from "sonner"

interface Address {
  fullName?: string
  street?: string
  city?: string
  postalCode?: string
  country?: string
  phone?: string
}

interface UserAddressFormProps {
  address: Address | null
}

export default function UserAddressForm({ address }: UserAddressFormProps) {
  const [state, formAction, isPending] = useActionState(updateUserAddress, {
    success: false,
    message: "",
  })

  if (state.success && state.message) {
    toast.success(state.message)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>آدرس ارسال</CardTitle>
      </CardHeader>
      <CardContent>
        <form action={formAction} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">نام کامل</Label>
            <Input
              id="fullName"
              name="fullName"
              defaultValue={address?.fullName || ""}
              placeholder="نام کامل خود را وارد کنید"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">آدرس خیابان</Label>
            <Input
              id="street"
              name="street"
              defaultValue={address?.street || ""}
              placeholder="آدرس کامل را وارد کنید"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city">شهر</Label>
              <Input
                id="city"
                name="city"
                defaultValue={address?.city || ""}
                placeholder="شهر"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">کد پستی</Label>
              <Input
                id="postalCode"
                name="postalCode"
                defaultValue={address?.postalCode || ""}
                placeholder="کد پستی"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="country">کشور</Label>
              <Input
                id="country"
                name="country"
                defaultValue={address?.country || "ایران"}
                placeholder="کشور"
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="phone">شماره تلفن</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                defaultValue={address?.phone || ""}
                placeholder="شماره تلفن"
                required
              />
            </div>
          </div>

          {state.message && !state.success && (
            <p className="text-sm text-destructive">{state.message}</p>
          )}

          <Button type="submit" disabled={isPending}>
            {isPending ? "در حال ذخیره..." : "ذخیره آدرس"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
