import { useCallback, useEffect, useState } from "react";
import type { ChangeEvent, FormEvent, FocusEvent } from "react";
import { toast } from "sonner";
import {
  createArticleComment,
  getArticleComments,
  getCommentRequestErrorMessage,
  mapCommentRowToDisplay,
} from "@/services/commentService";
import type { ArticleCommentDisplay } from "@/types/comment";

type UseViewPostCommentsOptions = {
  token: string | null;
  isLoggedIn: boolean;
  onRequireAuth: () => void;
};

const useViewPostComments = (id: string | undefined, options: UseViewPostCommentsOptions) => {
  const { token, isLoggedIn, onRequireAuth } = options;
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState<ArticleCommentDisplay[]>([]);
  const [commentsLoading, setCommentsLoading] = useState(false);
  const [commentsError, setCommentsError] = useState<string | null>(null);
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const fetchComments = useCallback(async () => {
    if (!id) {
      return;
    }
    setCommentsLoading(true);
    setCommentsError(null);
    try {
      const rows = await getArticleComments(id);
      setComments(rows.map(mapCommentRowToDisplay));
    } catch (err) {
      console.error("Error fetching comments:", err);
      setComments([]);
      setCommentsError(
        getCommentRequestErrorMessage(err, "Could not load comments. Please try again."),
      );
    } finally {
      setCommentsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    void fetchComments();
  }, [fetchComments]);

  const submitComment = useCallback(
    (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!isLoggedIn || !token) {
        onRequireAuth();
        return;
      }
      if (!id || !comment.trim() || commentSubmitting) {
        return;
      }

      const contentToSend = comment.trim();
      setCommentSubmitting(true);
      void (async () => {
        try {
          const row = await createArticleComment(id, contentToSend, token);
          const display = mapCommentRowToDisplay(row);
          setComments((prev) => [...prev, display]);
          setComment("");
          toast.success("Comment posted");
        } catch (err) {
          console.error("Comment submit error:", err);
          toast.error(
            getCommentRequestErrorMessage(err, "Could not post your comment. Please try again."),
          );
        } finally {
          setCommentSubmitting(false);
        }
      })();
    },
    [id, token, isLoggedIn, comment, commentSubmitting, onRequireAuth],
  );

  const onCommentChange = useCallback((e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const onCommentFocus = useCallback(
    (e: FocusEvent<HTMLTextAreaElement>) => {
      if (!isLoggedIn) {
        onRequireAuth();
        e.target.blur();
      }
    },
    [isLoggedIn, onRequireAuth],
  );

  return {
    comment,
    comments,
    commentsLoading,
    commentsError,
    commentSubmitting,
    fetchComments,
    submitComment,
    onCommentChange,
    onCommentFocus,
  };
};

export default useViewPostComments;
