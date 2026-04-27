import axios from "axios";
import type { BlogPost } from "@/types/blog";

function apiBase(): string {
  return import.meta.env.VITE_API_BASE_URL;
}

function normalizeArticlesPayload(data: unknown): BlogPost[] {
  if (Array.isArray(data)) {
    return data as BlogPost[];
  }
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.posts)) {
      return record.posts as BlogPost[];
    }
    if (Array.isArray(record.articles)) {
      return record.articles as BlogPost[];
    }
    if (Array.isArray(record.data)) {
      return record.data as BlogPost[];
    }
  }
  return [];
}

type GetArticlesParams = {
  keyword?: string;
  category?: number;
  status?: "draft" | "published";
  page?: number;
  limit?: number;
};

export type CreateArticlePayload = {
  image: string;
  category_id: number;
  title: string;
  description: string;
  content: string;
  status: "draft" | "published";
};

export async function getArticles(
  token?: string | null,
  params?: GetArticlesParams,
): Promise<BlogPost[]> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  const { data } = await axios.get<unknown>(`${apiBase()}/api/article`, {
    headers,
    params,
  });
  return normalizeArticlesPayload(data);
}

export async function getArticleById(id: string | number): Promise<BlogPost> {
  const { data } = await axios.get<{ data: BlogPost }>(`${apiBase()}/api/article/${id}`);
  return data.data;
}

export async function deleteArticle(
  articleId: string | number,
  token?: string | null,
): Promise<void> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  await axios.delete(`${apiBase()}/api/article/${articleId}`, { headers });
}

export async function createArticle(
  payload: CreateArticlePayload,
  token?: string | null,
): Promise<void> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  await axios.post(`${apiBase()}/api/article`, payload, { headers });
}

export async function updateArticle(
  articleId: string | number,
  payload: CreateArticlePayload,
  token?: string | null,
): Promise<void> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  await axios.put(`${apiBase()}/api/article/${articleId}`, payload, { headers });
}
