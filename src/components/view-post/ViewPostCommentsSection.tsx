import { Send } from "lucide-react";
import type { ChangeEvent, FocusEvent, FormEvent } from "react";
import type { ArticleCommentDisplay } from "@/types/comment";

type ViewPostCommentsSectionProps = {
  comment: string;
  comments: ArticleCommentDisplay[];
  commentsLoading: boolean;
  commentsError: string | null;
  commentSubmitting: boolean;
  onCommentChange: (e: ChangeEvent<HTMLTextAreaElement>) => void;
  onCommentFocus: (e: FocusEvent<HTMLTextAreaElement>) => void;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  onRetryComments: () => void;
};

const ViewPostCommentsSection = ({
  comment,
  comments,
  commentsLoading,
  commentsError,
  commentSubmitting,
  onCommentChange,
  onCommentFocus,
  onSubmit,
  onRetryComments,
}: ViewPostCommentsSectionProps) => {
  return (
    <div className="mt-6">
      <h3 className="text-headline-4 font-semibold text-brown-600 mb-4">Comment</h3>
      <form onSubmit={onSubmit} className="space-y-4 mb-8">
        <textarea
          value={comment}
          onChange={onCommentChange}
          onFocus={onCommentFocus}
          disabled={commentSubmitting}
          placeholder="What are your thoughts?"
          className="w-full px-4 py-3 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent resize-none disabled:opacity-60 disabled:cursor-not-allowed"
          rows={4}
        />
        <div className="flex justify-end">
          <button
            type="submit"
            disabled={commentSubmitting || !comment.trim()}
            className="flex items-center gap-2 px-6 py-2 bg-brown-600 text-white rounded-full hover:bg-brown-500 transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            <Send className="w-4 h-4" />
            {commentSubmitting ? "Sending…" : "Send"}
          </button>
        </div>
      </form>

      <div className="space-y-6">
        {commentsLoading && (
          <p className="text-body-2 text-brown-500 text-center py-8">Loading comments…</p>
        )}

        {!commentsLoading && commentsError && (
          <div className="rounded-md border border-red-200 bg-red-50 px-4 py-4 text-center space-y-3">
            <p className="text-body-2 text-red-700">{commentsError}</p>
            <button
              type="button"
              onClick={onRetryComments}
              className="text-body-2 font-medium text-brown-700 underline hover:text-brown-600"
            >
              Try again
            </button>
          </div>
        )}

        {!commentsLoading &&
          !commentsError &&
          comments.map((commentItem, index) => (
            <div key={commentItem.id}>
              <div className="flex gap-4">
                <div className="shrink-0">
                  <img
                    src={commentItem.avatar}
                    alt={commentItem.author}
                    className="w-10 h-10 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="mb-2">
                    <h4 className="text-body-1 font-semibold text-brown-600">
                      {commentItem.author}
                    </h4>
                    <p className="text-body-2 text-brown-400">{commentItem.date}</p>
                  </div>
                  <p className="text-body-1 text-brown-500 leading-relaxed whitespace-pre-wrap">
                    {commentItem.content}
                  </p>
                </div>
              </div>
              {index < comments.length - 1 && <div className="mt-6 border-t border-brown-200" />}
            </div>
          ))}

        {!commentsLoading && !commentsError && comments.length === 0 && (
          <p className="text-body-2 text-brown-400 text-center py-8">
            No comments yet. Be the first to comment!
          </p>
        )}
      </div>
    </div>
  );
};

export default ViewPostCommentsSection;
