import { useMutation } from "@tanstack/react-query";

import { editProfile } from "@/lib/api";
import { EDIT_PROFILE_KEY } from "@/common/contants";

export function useEditProfile() {
  return useMutation({
    mutationKey: [EDIT_PROFILE_KEY],
    mutationFn: editProfile,
  });
}
