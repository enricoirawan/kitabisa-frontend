import { Suspense } from "react";

import LoginClientPage from "@/components/auth/login-client";

export default function LoginPage() {
  return (
    <Suspense>
      <LoginClientPage />
    </Suspense>
  );
}
