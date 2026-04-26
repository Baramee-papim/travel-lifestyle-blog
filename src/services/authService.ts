import axios from "axios";

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
