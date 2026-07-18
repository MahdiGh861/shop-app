import { auth } from "@/auth"
import { getAllUsers } from "@/lib/actions/admin.actions"
import UsersTable from "@/components/shared/admin/UsersTable"

export default async function AdminUsersPage() {
  const session = await auth()
  const result = await getAllUsers()

  return (
    <UsersTable
      users={result.success ? result.data : []}
      currentUserId={session?.user?.id || ""}
    />
  )
}
