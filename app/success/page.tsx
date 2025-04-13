import { Suspense } from "react";

import SuccessClientPage from "@/components/success/success-client-page";

export default function SuccessPage() {
  return (
    <Suspense>
      <SuccessClientPage />
    </Suspense>
  );
}
