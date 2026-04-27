import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getCategories } from "@/services/categoryService";
import { createArticle } from "@/services/articleService";
import type { Category } from "@/types/category";

type ArticleStatus = "draft" | "published";

const useCreateArticle = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await getCategories();
        if (!cancelled) {
          setCategories(response);
          setSelectedCategoryId(response[0]?.id ?? null);
        }
      } catch (error) {
        console.error(error);
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

  const canSubmit = useMemo(() => {
    return (
      !isSubmitting &&
      selectedCategoryId != null &&
      title.trim() !== "" &&
      description.trim() !== "" &&
      content.trim() !== ""
    );
  }, [content, description, isSubmitting, selectedCategoryId, title]);

  const handleSubmit = async (status: ArticleStatus) => {
    if (!canSubmit || selectedCategoryId == null) {
      toast.error("Please complete all required fields.");
      return;
    }

    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsSubmitting(true);
    try {
      await createArticle(
        {
          image: "",
          category_id: selectedCategoryId,
          title: title.trim(),
          description: description.trim(),
          content: content.trim(),
          status,
        },
        token,
      );
      if (status === "published") {
        toast.success("Article published successfully.");
        navigate("/admin/articles");
      } else {
        toast.success("Article saved as draft successfully.");
        navigate("/admin/articles");
      }
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not create article. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    categories,
    isLoadingCategories,
    title,
    description,
    content,
    selectedCategoryId,
    isSubmitting,
    canSubmit,
    setTitle,
    setDescription,
    setContent,
    setSelectedCategoryId,
    handleSubmit,
  };
};

export default useCreateArticle;
