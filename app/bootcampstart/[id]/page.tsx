import { getProfile } from "@/lib/controllers/profileController"

export default async function bootcampstart() {
  const profile = await getProfile();
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome back 👋</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      </div>
    </div>
  );
}
