import axios from "axios";
import type { ArticleCommentDisplay, ArticleCommentRow } from "@/types/comment";

function apiBase(): string {
  return import.meta.env.VITE_API_BASE_URL;
}

export function mapCommentRowToDisplay(row: ArticleCommentRow): ArticleCommentDisplay {
  const author =
    (row.author_name && row.author_name.trim()) || row.author_username || "Member";
  return {
    id: row.id,
    author,
    avatar: row.author_avatar?.trim() || null,
    date: formatCommentDate(row.created_at),
    content: row.content,
  };
}

function formatCommentDate(iso: string): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) {
    return "";
  }
  return (
    d.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }) +
    " at " +
    d.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    })
  );
}

export async function getArticleComments(articleId: string | number): Promise<ArticleCommentRow[]> {
  const { data } = await axios.get<{ data: ArticleCommentRow[] }>(
    `${apiBase()}/api/article/${articleId}/comments`,
  );
  return Array.isArray(data.data) ? data.data : [];
}

export async function createArticleComment(
  articleId: string | number,
  content: string,
  token: string | null | undefined,
): Promise<ArticleCommentRow> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  const { data } = await axios.post<{ data: ArticleCommentRow }>(
    `${apiBase()}/api/article/${articleId}/comments`,
    { content },
    { headers },
  );
  return data.data;
}

export function getCommentRequestErrorMessage(error: unknown, fallback: string): string {
  if (axios.isAxiosError(error)) {
    const data = error.response?.data;
    if (data && typeof data === "object") {
      const msg = (data as Record<string, unknown>).message;
      if (typeof msg === "string" && msg.trim()) {
        return msg;
      }
      if (Array.isArray(msg) && typeof msg[0] === "string") {
        return msg[0];
      }
    }
    if (error.response?.status === 404) {
      return "Article not found.";
    }
    if (error.response?.status === 401) {
      return "Please sign in to comment.";
    }
  }
  return fallback;
}
