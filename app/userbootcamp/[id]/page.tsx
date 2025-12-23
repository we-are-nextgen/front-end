
import HeaderSection from "../components/Header";
import { getUserBootcamp } from "@/lib/controllers/bootcampController";

import { use } from "react";



interface PageProps {
  params: Promise<{ id: string }>;
}

export default  function UserBootcamp({ params }: PageProps) {
  const { id } = use(params);
  const bootcampId = id;
  // data fetching must still be awaited
  const userBootcampStart = use(getUserBootcamp(bootcampId));

  return (
    <div className="space-y-6">
      <HeaderSection userBootcampStart={userBootcampStart} />
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      </div>
    </div>
  );
}
