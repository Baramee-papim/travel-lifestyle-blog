import axios from "axios";

function apiBase(): string {
  return import.meta.env.VITE_API_BASE_URL;
}

export async function uploadArticleImage(file: File, token?: string | null): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;

  const { data } = await axios.post<{ imageUrl: string }>(
    `${apiBase()}/api/upload/article-image`,
    formData,
    { headers },
  );
  return data.imageUrl;
}

export async function uploadProfileImage(file: File, token?: string | null): Promise<string> {
  const formData = new FormData();
  formData.append("file", file);
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;

  const { data } = await axios.post<{ imageUrl: string }>(
    `${apiBase()}/api/upload/profile-image`,
    formData,
    { headers },
  );
  return data.imageUrl;
}
