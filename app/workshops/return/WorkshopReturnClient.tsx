"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

const NOTIFICATION_MESSAGES: Record<string, string> = {
  "session-deleted": "Your workshop session has ended.",
  "workshop-invalid": "The workshop is no longer available.",
  "session-unavailable": "No workshop capacity was available.",
  "session-invalid": "The workshop session expired or was removed.",
  "startup-timeout": "The workshop environment did not start in time.",
};

export default function WorkshopReturnClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const target = searchParams.get("target") || "/dashboard/it-professional";
    const notification = searchParams.get("notification");
    const safeTarget = target.startsWith("/") ? target : "/dashboard/it-professional";

    if (typeof window !== "undefined" && window.top && window.top !== window.self) {
      const url = notification
        ? `${safeTarget}?workshopNotification=${encodeURIComponent(notification)}`
        : safeTarget;
      window.top.location.href = url;
      return;
    }

    if (notification) {
      sessionStorage.setItem("workshopNotification", notification);
    }
    router.replace(safeTarget);
  }, [router, searchParams]);

  const notification = searchParams.get("notification");
  const message = notification ? NOTIFICATION_MESSAGES[notification] : null;

  return (
    <div className="flex min-h-[40vh] items-center justify-center p-6">
      <div className="text-center space-y-2">
        <p className="text-sm text-muted-foreground">Returning to NextGen portal...</p>
        {message && <p className="text-sm">{message}</p>}
      </div>
    </div>
  );
}
