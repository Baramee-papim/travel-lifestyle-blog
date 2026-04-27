import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { deleteCategory, getCategories } from "@/services/categoryService";
import type { Category } from "@/types/category";

const useAdminCategories = () => {
  const { token } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchInput, setSearchInput] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await getCategories();
        if (!cancelled) {
          setCategories(list);
        }
      } catch (fetchError) {
        console.error(fetchError);
        if (!cancelled) {
          setError("ไม่สามารถโหลดรายการหมวดหมู่ได้");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const keyword = searchInput.trim().toLowerCase();
    if (keyword === "") return categories;
    return categories.filter((category) =>
      category.name.toLowerCase().includes(keyword),
    );
  }, [categories, searchInput]);

  const handleOpenDeleteModal = (categoryId: number) => {
    setPendingDeleteId(categoryId);
  };

  const handleCloseDeleteModal = () => {
    if (!isDeleting) {
      setPendingDeleteId(null);
    }
  };

  const handleConfirmDelete = async () => {
    if (pendingDeleteId == null) return;
    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsDeleting(true);
    try {
      await deleteCategory(pendingDeleteId, token);
      setCategories((prev) => prev.filter((category) => category.id !== pendingDeleteId));
      toast.success("Category deleted successfully");
      setPendingDeleteId(null);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not delete category. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    categories: filteredCategories,
    loading,
    error,
    searchInput,
    pendingDeleteId,
    isDeleting,
    setSearchInput,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
};

export default useAdminCategories;
