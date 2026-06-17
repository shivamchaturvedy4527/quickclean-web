import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";

export default async function AdminDashboardGuard() {
  if (!(await isAuthenticated())) {
    redirect("/admin");
  }
  const { default: Dashboard } = await import("./dashboard-client");
  return <Dashboard />;
}
