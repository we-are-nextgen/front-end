"use client";

import { useSearchParams, useRouter } from "next/navigation";
import EducatesPanel from "@/app/lab/components/EducatesPanel";

export default function ActiveWorkshopClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const activationUrl = searchParams.get("url");
  const workshopName = searchParams.get("workshopName") ?? undefined;
  const returnPath = searchParams.get("returnPath") ?? "/dashboard/it-professional";

  async function retrySession(): Promise<string | null> {
    if (!workshopName) return null;

    const res = await fetch("/api/workshops/sessions", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ workshopName, returnPath }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data.error || "Failed to create workshop session");
    }

    const data = await res.json();
    const newUrl = data.sessionActivationUrl as string | undefined;
    if (newUrl) {
      const params = new URLSearchParams({
        url: newUrl,
        workshopName,
        returnPath,
      });
      router.replace(`/workshops/active?${params.toString()}`);
    }
    return newUrl ?? null;
  }

  if (!activationUrl) {
    return (
      <div className="p-6 text-sm text-muted-foreground">
        No workshop session URL provided.
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-80px)] w-full">
      <EducatesPanel
        sessionActivationUrl={activationUrl}
        workshopName={workshopName}
        returnPath={returnPath}
        onRetry={workshopName ? retrySession : undefined}
      />
    </div>
  );
}
