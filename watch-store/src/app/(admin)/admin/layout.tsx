import { redirect } from "next/navigation";
import { getSession, isStaff } from "@/lib/auth";
import { AdminSidebar } from "@/components/admin/admin-sidebar";
import { AdminHeader } from "@/components/admin/admin-header";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  if (!session || !isStaff(session.role)) {
    redirect("/login?redirect=/admin");
  }

  return (
    <div className="flex min-h-screen bg-muted/40">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader user={session} />
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  );
}
