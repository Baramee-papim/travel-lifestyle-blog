import { CloseRoundIcon, EditIcon, ExpandDownIcon, SearchIcon, TrashIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { BlogPost } from "@/types/blog";

type ArticleManagementContentProps = {
  articles: BlogPost[];
  loading: boolean;
  error: string | null;
  searchInput: string;
  pendingDeleteId: number | null;
  isDeleting: boolean;
  onSearchChange: (value: string) => void;
  onEditArticle: (articleId: number) => void;
  onOpenDeleteModal: (articleId: number) => void;
  onCloseDeleteModal: () => void;
  onConfirmDelete: () => Promise<void>;
};

const ArticleManagementContent = ({
  articles,
  loading,
  error,
  searchInput,
  pendingDeleteId,
  isDeleting,
  onSearchChange,
  onEditArticle,
  onOpenDeleteModal,
  onCloseDeleteModal,
  onConfirmDelete,
}: ArticleManagementContentProps) => {

  return (
    <div className="rounded-2xl border border-brown-300 bg-white">
      <div className="flex items-center gap-4 border-b border-brown-300 p-4">
        <div className="flex h-11 w-full max-w-[360px] items-center gap-2 rounded-xl border border-brown-300 bg-brown-100 px-3">
          <img src={SearchIcon} alt="Search icon" className="h-4 w-4 opacity-70" />
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(event) => onSearchChange(event.target.value)}
            className="w-full bg-transparent text-body-2 text-brown-500 outline-none placeholder:text-brown-400"
          />
        </div>

        <div className="ml-auto flex items-center gap-3">
          <button
            type="button"
            className="flex h-11 min-w-[150px] items-center justify-between rounded-xl border border-brown-300 bg-brown-100 px-3 text-body-2 text-brown-500"
          >
            <span>Status</span>
            <img src={ExpandDownIcon} alt="Expand status" className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="flex h-11 min-w-[150px] items-center justify-between rounded-xl border border-brown-300 bg-brown-100 px-3 text-body-2 text-brown-500"
          >
            <span>Category</span>
            <img src={ExpandDownIcon} alt="Expand category" className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full min-w-[760px] text-left">
          <thead className="border-b border-brown-300 bg-brown-100/80 text-body-2 text-brown-500">
            <tr>
              <th className="px-4 py-3 font-semibold">Article title</th>
              <th className="px-4 py-3 font-semibold">Category</th>
              <th className="px-4 py-3 font-semibold">Status</th>
              <th className="px-4 py-3 font-semibold text-right">Actions</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-body-2 text-brown-400">
                  กำลังโหลด...
                </td>
              </tr>
            ) : error ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-body-2 text-red-600">
                  {error}
                </td>
              </tr>
            ) : articles.length === 0 ? (
              <tr>
                <td colSpan={4} className="px-4 py-8 text-center text-body-2 text-brown-400">
                  ยังไม่มีบทความ
                </td>
              </tr>
            ) : (
              articles.map((article) => {
                const categoryLabel = article.category || "—";
                const statusLabel = article.status || "—";
                const isDraft = (article.status ?? "").toLowerCase() === "draft";
                return (
                  <tr key={article.id} className="border-b border-brown-200 text-body-2 text-brown-500">
                    <td className="max-w-[460px] truncate px-4 py-4">{article.title}</td>
                    <td className="px-4 py-4">{categoryLabel}</td>
                    <td className="px-4 py-4">
                      <span
                        className={cn(
                          "inline-flex items-center gap-2",
                          isDraft ? "text-gray-500" : "text-brand-green",
                        )}
                      >
                        <span
                          className={cn(
                            "h-1.5 w-1.5 rounded-full",
                            isDraft ? "bg-gray-400" : "bg-brand-green",
                          )}
                        />
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-3">
                        <button
                          type="button"
                          className="cursor-pointer opacity-80 transition hover:opacity-100"
                          onClick={() => onEditArticle(article.id)}
                        >
                          <img src={EditIcon} alt="Edit article" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer opacity-80 transition hover:opacity-100"
                          onClick={() => onOpenDeleteModal(article.id)}
                        >
                          <img src={TrashIcon} alt="Delete article" className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {pendingDeleteId != null ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close delete article modal"
            className="absolute inset-0 bg-black/30"
            onClick={onCloseDeleteModal}
          />
          <div className="relative z-10 w-full max-w-[640px] rounded-[32px] bg-white px-10 py-8 shadow-xl">
            <button
              type="button"
              onClick={onCloseDeleteModal}
              className="absolute right-8 top-8 cursor-pointer opacity-80 transition hover:opacity-100"
              aria-label="Close modal"
            >
              <img src={CloseRoundIcon} alt="Close" className="h-6 w-6" />
            </button>
            <div className="text-center">
              <h3 className="text-headline-3 text-brown-600">Delete article</h3>
              <p className="mt-4 text-headline-4 font-medium text-brown-500">
                Do you want to delete this article?
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="min-w-[170px]"
                onClick={onCloseDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="min-w-[170px]"
                onClick={() => void onConfirmDelete()}
                disabled={isDeleting}
              >
                {isDeleting ? "Deleting..." : "Delete"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default ArticleManagementContent;
