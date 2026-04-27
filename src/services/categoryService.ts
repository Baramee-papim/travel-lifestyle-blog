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

export async function createCategory(
  categoryName: string,
  token?: string | null,
): Promise<void> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  await axios.post(
    `${apiBase()}/api/category`,
    { name: categoryName },
    { headers },
  );
}

export async function updateCategory(
  categoryId: number,
  categoryName: string,
  token?: string | null,
): Promise<void> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  await axios.put(
    `${apiBase()}/api/category/${categoryId}`,
    { name: categoryName },
    { headers },
  );
}

export async function deleteCategory(
  categoryId: number,
  token?: string | null,
): Promise<void> {
  const headers =
    token != null && token !== "" ? { Authorization: `Bearer ${token}` } : undefined;
  await axios.delete(`${apiBase()}/api/category/${categoryId}`, { headers });
}
