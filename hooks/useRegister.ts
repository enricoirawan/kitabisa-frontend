import { useMutation } from "@tanstack/react-query";

import { userRegister } from "@/lib/api";

export function useRegister() {
  return useMutation({
    mutationFn: userRegister,
  });
}
