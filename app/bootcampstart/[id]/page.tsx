import HeaderSection from "../components/Header";
import BootcampModules from "@/app/userbootcamp/components/BootcampModules";
import { getBootcamp } from "@/lib/controllers/bootcampController";
import Link from "next/link";
import { use } from "react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default function BootcampStart({ params }: PageProps) {
  const { id } = use(params);
  const bootcamp = use(getBootcamp(id));

  const firstLabModule = bootcamp?.layers
    ?.flatMap((layer: any) => layer.modules ?? [])
    .find(
      (module: any) =>
        (module.linkedLabs && module.linkedLabs.length > 0) ||
        module.components?.some((c: any) => c.type === "lab")
    );

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-semibold">Welcome back</h1>
      <HeaderSection bootcamp={bootcamp} />

      {firstLabModule && (
        <div className="border rounded-xl p-5 bg-background shadow-sm">
          <h2 className="font-semibold mb-2">Ready to start?</h2>
          <p className="text-sm text-muted-foreground mb-4">
            Your first hands-on module is{" "}
            <span className="font-medium text-foreground">{firstLabModule.name}</span>.
            Enroll in the bootcamp from the catalog, then launch environments from your cohort page.
          </p>
          <Link
            href={`/bootcamp/${id}`}
            className="text-sm underline underline-offset-4"
          >
            View bootcamp details
          </Link>
        </div>
      )}

      <div>
        <h2 className="text-xl font-semibold mb-4">Curriculum preview</h2>
        <BootcampModules
          bootcampId={id}
          layers={bootcamp?.layers ?? []}
          returnPath={`/bootcampstart/${id}`}
        />
      </div>
    </div>
  );
}
