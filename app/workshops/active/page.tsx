import { Suspense } from "react";
import ActiveWorkshopClient from "./ActiveWorkshopClient";

export default function ActiveWorkshopPage() {
  return (
    <Suspense
      fallback={
        <div className="p-6 text-sm text-muted-foreground">Loading workshop session...</div>
      }
    >
      <ActiveWorkshopClient />
    </Suspense>
  );
}
