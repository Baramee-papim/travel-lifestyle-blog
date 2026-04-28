import { RefreshIcon, UserDuotoneIcon } from "@/components/icon";

export const accountMenuItems = [
  { label: "Profile", path: "/profile", icon: UserDuotoneIcon },
  { label: "Reset password", path: "/reset-password", icon: RefreshIcon },
] as const;
