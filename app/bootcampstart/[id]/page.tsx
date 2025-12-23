
import HeaderSection from "../components/Header";
import { getBootcamp } from "@/lib/controllers/bootcampController";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default  function BootcampStart({ params }: PageProps) {
  const { id } = use(params);
  const bootcampId = id;
  // data fetching must still be awaited
  const bootcamp = use(getBootcamp(bootcampId));

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome back 👋</h1>
      <HeaderSection bootcamp={bootcamp} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      </div>
    </div>
  );
}
