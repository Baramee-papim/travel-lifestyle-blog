import axios from "axios";
import type { Category } from "@/types/category";

function apiBase(): string {
  return import.meta.env.VITE_API_BASE_URL;
}

function normalizeCategoriesPayload(data: unknown): Category[] {
  if (Array.isArray(data)) {
    return data as Category[];
  }
  if (data && typeof data === "object") {
    const record = data as Record<string, unknown>;
    if (Array.isArray(record.categories)) {
      return record.categories as Category[];
    }
    if (Array.isArray(record.data)) {
      return record.data as Category[];
    }
  }
  return [];
}

export async function getCategories(): Promise<Category[]> {
  const { data } = await axios.get<unknown>(`${apiBase()}/api/category`);
  return normalizeCategoriesPayload(data);
}
