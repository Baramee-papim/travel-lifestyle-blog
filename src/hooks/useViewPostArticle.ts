import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import { getArticleById, likeArticle } from "@/services/articleService";
import type { BlogPost } from "@/types/blog";

type UseViewPostArticleOptions = {
  token: string | null;
  isAuthReady: boolean;
  isLoggedIn: boolean;
  onRequireAuth: () => void;
};

const useViewPostArticle = (id: string | undefined, options: UseViewPostArticleOptions) => {
  const { token, isAuthReady, isLoggedIn, onRequireAuth } = options;
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [likes, setLikes] = useState(0);
  const [userHasLiked, setUserHasLiked] = useState(false);
  const [likeSubmitting, setLikeSubmitting] = useState(false);

  useEffect(() => {
    const fetchPost = async () => {
      if (!isAuthReady) {
        return;
      }
      if (!id) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const article = await getArticleById(id, token);
        setPost(article);
        setLikes(article.likes_count ?? article.likes ?? 0);
        setError(null);
        setUserHasLiked(Boolean(article.liked_by_me));
      } catch (fetchError) {
        console.error("Error fetching post:", fetchError);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    void fetchPost();
  }, [id, token, isAuthReady]);

  const like = useCallback(async () => {
    if (!isLoggedIn || !token) {
      onRequireAuth();
      return;
    }
    if (!id || likeSubmitting || userHasLiked) {
      return;
    }
    setLikeSubmitting(true);
    try {
      const result = await likeArticle(id, token);
      setLikes(result.likes_count);
      setUserHasLiked(true);
      if (result.already_liked) {
        toast.info("You already liked this article.");
      } else {
        toast.success("Thanks for liking this article!");
      }
    } catch (likeError) {
      console.error("Like error:", likeError);
      toast.error("Could not save your like. Please try again.");
    } finally {
      setLikeSubmitting(false);
    }
  }, [id, token, isLoggedIn, likeSubmitting, userHasLiked, onRequireAuth]);

  return {
    post,
    loading,
    error,
    likes,
    userHasLiked,
    likeSubmitting,
    like,
  };
};

export default useViewPostArticle;
