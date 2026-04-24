export type AuthUser = {
  id: string;
  email: string | null;
  username: string;
  name: string;
  role: string;
  profilePic?: string | null;
};
