"use client";

import { useEffect, useState, use } from "react";
import HeaderSection from "../components/Header";
import DescriptionSection from "../components/Description"
import CurriculumSection from "../components/Curriculum"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BootcampStart({ params }: PageProps) {
  // unwrap params safely
  const { id } = use(params);

  const [bootcamp, setBootcamp] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/bootcamp/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch bootcamp");
        return res.json();
      })
      .then(setBootcamp)
      .catch(() => setBootcamp(null))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) {
    return <div className="text-sm text-gray-500">Loading...</div>;
  }

  if (!bootcamp) {
    return <div className="text-sm text-red-500">Bootcamp not found</div>;
  }

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
