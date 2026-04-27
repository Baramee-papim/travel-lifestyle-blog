import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { deleteArticle, getArticles } from "@/services/articleService";
import type { BlogPost } from "@/types/blog";

const useAdminArticles = () => {
  const { token } = useAuth();
  const [articles, setArticles] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pendingDeleteId, setPendingDeleteId] = useState<number | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const load = async () => {
      try {
        setLoading(true);
        setError(null);
        const list = await getArticles(token);
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
  }, [token]);

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
    pendingDeleteId,
    isDeleting,
    handleOpenDeleteModal,
    handleCloseDeleteModal,
    handleConfirmDelete,
  };
};

export default useAdminArticles;
