import { Suspense } from "react";
import WorkshopReturnClient from "./WorkshopReturnClient";

export default function WorkshopReturnPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-[40vh] items-center justify-center p-6">
          <p className="text-sm text-muted-foreground">Returning to NextGen portal...</p>
        </div>
      }
    >
      <WorkshopReturnClient />
    </Suspense>
  );
}
