import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import {
  createCategory,
  getCategories,
  updateCategory,
} from "@/services/categoryService";

const useCreateCategory = (categoryId?: string) => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const isEditMode = categoryId != null && categoryId !== "";
  const [categoryName, setCategoryName] = useState("");
  const [isLoadingCategory, setIsLoadingCategory] = useState(isEditMode);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!isEditMode || !categoryId) {
      setIsLoadingCategory(false);
      return;
    }

    let cancelled = false;
    const loadCategory = async () => {
      try {
        setIsLoadingCategory(true);
        const categories = await getCategories();
        if (cancelled) return;
        const targetCategory = categories.find(
          (category) => category.id === Number(categoryId),
        );
        if (!targetCategory) {
          toast.error("Could not load category details.");
          navigate("/admin/categories");
          return;
        }
        setCategoryName(targetCategory.name);
      } catch (error) {
        console.error(error);
        if (!cancelled) {
          toast.error("Could not load category details.");
          navigate("/admin/categories");
        }
      } finally {
        if (!cancelled) {
          setIsLoadingCategory(false);
        }
      }
    };

    void loadCategory();
    return () => {
      cancelled = true;
    };
  }, [categoryId, isEditMode, navigate]);

  const canSubmit = useMemo(() => {
    return (
      !isSubmitting &&
      !isLoadingCategory &&
      categoryName.trim() !== ""
    );
  }, [categoryName, isLoadingCategory, isSubmitting]);

  const handleSubmit = async () => {
    if (!canSubmit) {
      toast.error("Please complete category name.");
      return;
    }

    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (isEditMode && categoryId) {
        await updateCategory(Number(categoryId), categoryName.trim(), token);
        toast.success("Category updated successfully.");
      } else {
        await createCategory(categoryName.trim(), token);
        toast.success("Category created successfully.");
      }
      navigate("/admin/categories");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(
        message ||
          (isEditMode
            ? "Could not update category. Please try again."
            : "Could not create category. Please try again."),
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isEditMode,
    categoryName,
    isLoadingCategory,
    isSubmitting,
    canSubmit,
    setCategoryName,
    handleSubmit,
  };
};

export default useCreateCategory;
