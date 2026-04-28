import {
  BellIcon,
  NotebookIcon,
  OutIcon,
  RefreshIcon,
  SignOutSquareIcon,
  UserDuotoneIcon,
} from "@/components/icon";

export type MenuItem = {
  label: string;
  path: string;
  icon: string;
};

export const topMenuItems: MenuItem[] = [
  { label: "Article management", path: "articles", icon: NotebookIcon },
  { label: "Category management", path: "categories", icon: OutIcon },
  { label: "Profile", path: "profile", icon: UserDuotoneIcon },
  { label: "Notification", path: "notifications", icon: BellIcon },
  { label: "Reset password", path: "reset-password", icon: RefreshIcon },
];

export const bottomMenuItems: MenuItem[] = [
  { label: "hh. website", path: "website", icon: OutIcon },
  { label: "Log out", path: "logout", icon: SignOutSquareIcon },
];
