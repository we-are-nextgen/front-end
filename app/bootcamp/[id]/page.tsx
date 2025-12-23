

import HeaderSection from "../components/Header";
import DescriptionSection from "../components/Description"
import CurriculumSection from "../components/Curriculum"
import { getBootcamp } from "@/lib/controllers/bootcampController";

import { use } from "react";
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>;
}

export default  function Bootcamp({ params }: PageProps) {
  const { id } = use(params);
  const bootcampId = id;
  // data fetching must still be awaited
  const bootcamp = use(getBootcamp(bootcampId));

  return (
    <div className="space-y-6 m-2">
      <Link href="/dashboard/it-professional">
          <Button variant="ghost" className="mb-1 cursor-pointer">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Dashboard
          </Button>
        </Link>
        <HeaderSection bootcamp={bootcamp} />
        <DescriptionSection bootcamp={bootcamp} />
        <CurriculumSection layers={bootcamp.layers} />
    </div>
  );
}
