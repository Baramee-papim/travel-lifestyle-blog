import axios from "axios";
import type { AuthUser } from "@/types/auth";

type ResetPasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

function apiBase(): string {
  return import.meta.env.VITE_API_BASE_URL;
}

export async function resetPassword(
  payload: ResetPasswordPayload,
  token?: string | null,
): Promise<{ message: string }> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;

  const { data } = await axios.post<{ message: string }>(
    `${apiBase()}/api/auth/reset-password`,
    payload,
    { headers },
  );

  return data;
}

export async function getCurrentUser(token?: string | null): Promise<AuthUser> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  const { data } = await axios.get<AuthUser>(`${apiBase()}/api/auth/get-user`, { headers });
  return data;
}

type UpdateProfilePayload = {
  name: string;
  username: string;
  bio: string;
  profilePic: string;
};

export async function updateProfile(
  payload: UpdateProfilePayload,
  token?: string | null,
): Promise<{ message: string; user: AuthUser }> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  const { data } = await axios.put<{ message: string; user: AuthUser }>(
    `${apiBase()}/api/auth/profile`,
    payload,
    { headers },
  );
  return data;
}
