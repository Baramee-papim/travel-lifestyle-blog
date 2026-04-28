import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { getCategories } from "@/services/categoryService";
import { createArticle, getAdminArticleById, updateArticle } from "@/services/articleService";
import { uploadArticleImage } from "@/services/storageService";
import type { Category } from "@/types/category";

type ArticleStatus = "draft" | "published";

const resolveUploadErrorMessage = (error: unknown): string => {
  if (!axios.isAxiosError(error)) {
    return "Could not upload thumbnail. Please try again.";
  }

  const backendMessage = (error.response?.data?.message as string | undefined)?.toLowerCase() ?? "";
  if (backendMessage.includes("size") || backendMessage.includes("5mb")) {
    return "Image is too large. Please upload an image up to 5MB.";
  }
  if (
    backendMessage.includes("jpeg") ||
    backendMessage.includes("png") ||
    backendMessage.includes("webp") ||
    backendMessage.includes("allowed")
  ) {
    return "Unsupported file type. Please upload .jpg, .png, or .webp image.";
  }
  if (error.response?.status === 401) {
    return "Unauthorized upload. Please login again.";
  }

  return (error.response?.data?.message as string | undefined) || "Could not upload thumbnail. Please try again.";
};

const useCreateArticle = (articleId?: string) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const isEditMode = articleId != null && articleId !== "";
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(true);
  const [isLoadingArticle, setIsLoadingArticle] = useState(isEditMode);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [content, setContent] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [articleCategoryName, setArticleCategoryName] = useState<string | null>(null);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const loadCategories = async () => {
      try {
        setIsLoadingCategories(true);
        const response = await getCategories();
        if (!cancelled) {
          setCategories(response);
          if (!isEditMode) {
            setSelectedCategoryId(response[0]?.id ?? null);
          }
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
  }, [isEditMode]);

  useEffect(() => {
    if (!isEditMode || !articleId) {
      setIsLoadingArticle(false);
      return;
    }

    if (token == null || token === "") {
      setIsLoadingArticle(false);
      return;
    }

    let cancelled = false;
    const loadArticle = async () => {
      try {
        setIsLoadingArticle(true);
        const article = await getAdminArticleById(articleId, token);
        if (cancelled) return;
        setTitle(article.title ?? "");
        setDescription(article.description ?? "");
        setContent(article.content ?? "");
        setThumbnailUrl(article.image ?? "");
        setArticleCategoryName(article.category ?? null);
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          toast.error("Could not load article details.");
          navigate("/admin/articles");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingArticle(false);
        }
      }
    };

    void loadArticle();
    return () => {
      cancelled = true;
    };
  }, [articleId, isEditMode, navigate, token]);

  useEffect(() => {
    if (categories.length === 0 || articleCategoryName == null) return;
    const matchedCategory = categories.find(
      (category) => category.name.toLowerCase() === articleCategoryName.toLowerCase(),
    );
    if (matchedCategory) {
      setSelectedCategoryId(matchedCategory.id);
      setArticleCategoryName(null);
    }
  }, [articleCategoryName, categories]);

  const canSubmit = useMemo(() => {
    return (
      !isSubmitting &&
      !isUploadingImage &&
      !isLoadingArticle &&
      selectedCategoryId != null &&
      thumbnailUrl.trim() !== "" &&
      title.trim() !== "" &&
      description.trim() !== "" &&
      content.trim() !== ""
    );
  }, [content, description, isLoadingArticle, isSubmitting, isUploadingImage, selectedCategoryId, thumbnailUrl, title]);

  const handleUploadThumbnail = async (file: File) => {
    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsUploadingImage(true);
    try {
      const uploadedUrl = await uploadArticleImage(file, token);
      setThumbnailUrl(uploadedUrl);
      toast.success("Thumbnail uploaded successfully.");
    } catch (error: unknown) {
      console.error(error);
      toast.error(resolveUploadErrorMessage(error));
    } finally {
      setIsUploadingImage(false);
    }
  };

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
      const payload = {
        image: thumbnailUrl.trim(),
        category_id: selectedCategoryId,
        title: title.trim(),
        description: description.trim(),
        content: content.trim(),
        status,
      } as const;

      if (isEditMode && articleId) {
        await updateArticle(articleId, payload, token);
        if (status === "published") {
          toast.success("Article updated and published successfully.");
        } else {
          toast.success("Article draft updated successfully.");
        }
      } else {
        await createArticle(payload, token);
        if (status === "published") {
          toast.success("Article published successfully.");
        } else {
          toast.success("Article saved as draft successfully.");
        }
      }
      navigate("/admin/articles");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || (isEditMode ? "Could not update article. Please try again." : "Could not create article. Please try again."));
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
    thumbnailUrl,
    selectedCategoryId,
    isSubmitting,
    isUploadingImage,
    isLoadingArticle,
    isEditMode,
    canSubmit,
    setTitle,
    setDescription,
    setContent,
    setSelectedCategoryId,
    handleUploadThumbnail,
    handleSubmit,
  };
};

export default useCreateArticle;
