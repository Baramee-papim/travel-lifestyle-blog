import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { deleteArticle, getAdminArticles } from "@/services/articleService";
import { getCategories } from "@/services/categoryService";
import type { BlogPost } from "@/types/blog";
import type { Category } from "@/types/category";

type ArticleFilterStatus = "all" | "draft" | "published";

const useAdminArticles = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<ArticleFilterStatus>("all");
  const [searchInput, setSearchInput] = useState("");
  const [debouncedKeyword, setDebouncedKeyword] = useState("");
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const list = await getCategories();
        if (!cancelled) {
          setCategories(list);
        }
      } catch (loadError) {
        console.error(loadError);
        if (!cancelled) {
          toast.error("Could not load categories.");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCategories(false);
        }
      }
    };

    void loadCategories();
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedKeyword(searchInput.trim());
    }, 500);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [searchInput]);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await getAdminArticles(token, {
          keyword: debouncedKeyword || undefined,
          category: selectedCategoryId ?? undefined,
          status: selectedStatus === "all" ? undefined : selectedStatus,
        });
        if (!cancelled) {
          setArticles(list);
        }
      } catch (fetchError) {
        console.error(fetchError);
        if (!cancelled) {
          setError("ไม่สามารถโหลดรายการบทความได้");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    void load();
    return () => {
      cancelled = true;
    };
  }, [debouncedKeyword, selectedCategoryId, selectedStatus, token]);

  const handleSearchChange = (value: string) => {
    setSearchInput(value);
  };

  const handleCategoryChange = (value: string) => {
    if (value === "all") {
      setSelectedCategoryId(null);
      return;
    }
    const next = Number(value);
    if (Number.isInteger(next) && next > 0) {
      setSelectedCategoryId(next);
    }
  };

  const handleStatusChange = (value: string) => {
    if (value === "all" || value === "draft" || value === "published") {
      setSelectedStatus(value);
    }
  };

  const handleOpenDeleteModal = (articleId: number) => {
    setPendingDeleteId(articleId);
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
      await deleteArticle(pendingDeleteId, token);
      setArticles((prev) => prev.filter((a) => a.id !== pendingDeleteId));
      toast.success("Article deleted successfully");
      setPendingDeleteId(null);
    } catch (err: unknown) {
      const message = axios.isAxiosError(err)
        ? (err.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not delete article. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  return {
    articles,
    loading,
    error,
    categories,
    isLoadingCategories,
    selectedCategoryId,
    selectedStatus,
    searchInput,
    pendingDeleteId,
    isDeleting,
    handleSearchChange,
    handleCategoryChange,
    handleStatusChange,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
};

export default useAdminArticles;
