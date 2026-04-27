import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { NavLink, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  AddRoundIcon,
  BellIcon,
  CloseRoundIcon,
  EditIcon,
  ExpandDownIcon,
  NotebookIcon,
  OutIcon,
  RefreshIcon,
  SearchIcon,
  SignOutSquareIcon,
  TrashIcon,
  UserDuotoneIcon,
} from "@/components/icon";
import { cn } from "@/lib/utils";
import { useAuth } from "@/context/AuthContext";
import { deleteArticle, getArticles } from "@/services/articleService";
import { resetPassword } from "@/services/authService";
import type { BlogPost } from "@/types/blog";

type MenuItem = {
  label: string;
  path: string;
  icon: string;
};

const topMenuItems: MenuItem[] = [
  { label: "Article management", path: "articles", icon: NotebookIcon },
  { label: "Category management", path: "categories", icon: OutIcon },
  { label: "Profile", path: "profile", icon: UserDuotoneIcon },
  { label: "Notification", path: "notifications", icon: BellIcon },
  { label: "Reset password", path: "reset-password", icon: RefreshIcon },
];

const bottomMenuItems: MenuItem[] = [
  { label: "hh. website", path: "website", icon: OutIcon },
  { label: "Log out", path: "logout", icon: SignOutSquareIcon },
];

const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="rounded-2xl border border-brown-300 bg-white p-8 text-brown-500">
    <h2 className="text-headline-4 text-brown-600">{title}</h2>
    <p className="mt-3 text-body-2 text-brown-400">This tab is ready for future content.</p>
  </div>
);

const ArticleManagementContent = () => {
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

  return (
    <div className="rounded-2xl border border-brown-300 bg-white">
      <div className="flex items-center gap-4 border-b border-brown-300 p-4">
        <div className="flex h-11 w-full max-w-[360px] items-center gap-2 rounded-xl border border-brown-300 bg-brown-100 px-3">
          <img src={SearchIcon} alt="Search icon" className="h-4 w-4 opacity-70" />
          <input
            type="text"
            placeholder="Search..."
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
                return (
                  <tr key={article.id} className="border-b border-brown-200 text-body-2 text-brown-500">
                    <td className="max-w-[460px] truncate px-4 py-4">{article.title}</td>
                    <td className="px-4 py-4">{categoryLabel}</td>
                    <td className="px-4 py-4">
                      <span className="inline-flex items-center gap-2 text-brand-green">
                        <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                        {statusLabel}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex justify-end gap-3">
                        <button type="button" className="cursor-pointer opacity-80 transition hover:opacity-100">
                          <img src={EditIcon} alt="Edit article" className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          className="cursor-pointer opacity-80 transition hover:opacity-100"
                          onClick={() => handleOpenDeleteModal(article.id)}
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
            onClick={handleCloseDeleteModal}
          />
          <div className="relative z-10 w-full max-w-[640px] rounded-[32px] bg-white px-10 py-8 shadow-xl">
            <button
              type="button"
              onClick={handleCloseDeleteModal}
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
                onClick={handleCloseDeleteModal}
                disabled={isDeleting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="min-w-[170px]"
                onClick={() => void handleConfirmDelete()}
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

const ResetPasswordTab = () => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenConfirm = () => setIsConfirmOpen(true);

  const handleCloseConfirm = () => {
    if (!isSubmitting) {
      setIsConfirmOpen(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await resetPassword(
        { currentPassword, newPassword, confirmPassword },
        token,
      );
      toast.success(response.message || "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsConfirmOpen(false);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <TabLayout
      title="Reset password"
      headerAction={
        <Button className="h-11 px-8" onClick={handleOpenConfirm}>
          Reset password
        </Button>
      }
    >
      <div className="rounded-2xl border border-brown-300 bg-white p-8">
        <div className="flex max-w-[360px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="currentPassword" className="text-body-2 text-brown-500">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(event) => setCurrentPassword(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-body-2 text-brown-500">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-body-2 text-brown-500">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
        </div>
      </div>

      {isConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close reset password modal"
            className="absolute inset-0 bg-black/30"
            onClick={handleCloseConfirm}
          />
          <div className="relative z-10 w-full max-w-[640px] rounded-[32px] bg-white px-10 py-8 shadow-xl">
            <button
              type="button"
              onClick={handleCloseConfirm}
              className="absolute right-8 top-8 cursor-pointer opacity-80 transition hover:opacity-100"
              aria-label="Close modal"
            >
              <img src={CloseRoundIcon} alt="Close" className="h-6 w-6" />
            </button>
            <div className="text-center">
              <h3 className="text-headline-3 text-brown-600">Reset password</h3>
              <p className="mt-4 text-headline-4 font-medium text-brown-500">
                Do you want to reset your password?
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="min-w-[170px]"
                onClick={handleCloseConfirm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="min-w-[170px]"
                onClick={() => void handleResetPassword()}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </TabLayout>
  );
};

const TabLayout = ({
  title,
  children,
  headerAction,
}: {
  title: string;
  children: ReactNode;
  headerAction?: ReactNode;
}) => (
  <div className="flex flex-1 flex-col p-8">
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-headline-3 text-brown-600">{title}</h1>
      {title === "Article management" ? (
        <Button className="h-11 gap-2 px-6">
          <img src={AddRoundIcon} alt="Add article" className="h-4 w-4 invert" />
          Create article
        </Button>
      ) : headerAction ? (
        headerAction
      ) : null}
    </header>
    {children}
  </div>
);

/** Shared sidebar row styles so <a> and <button> render identical typography. */
const sidebarNavItemBase =
  "flex items-center gap-3 px-4 py-4 text-body-2 text-brown-500 antialiased transition-colors";

const AdminPanelShell = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-brown-100">
      <div className=" flex h-screen w-full  overflow-hidden  border border-brown-300 bg-white shadow-sm">
      <aside className="flex w-[260px] flex-col border-r border-brown-300 bg-brown-100">
        <div className="border-b border-brown-300 p-6">
          <p className="text-[40px] font-semibold leading-none text-brown-600">hh.</p>
          <p className="mt-2 text-body-2 text-brand-orange">Admin panel</p>
        </div>

        <nav className="flex-1 ">
          <div className="">
            {topMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    sidebarNavItemBase,
                    isActive ? "bg-brown-300/60 text-brown-600" : "hover:bg-brown-200",
                  )
                }
              >
                <img src={item.icon} alt={item.label} className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </div>
        </nav>

          <div className="border-t border-brown-300">
            <a
              href="/"
              target="_blank"
              rel="noreferrer"
              className={cn(sidebarNavItemBase, "hover:bg-brown-200")}
            >
              <img src={bottomMenuItems[0].icon} alt={bottomMenuItems[0].label} className="h-4 w-4" />
              {bottomMenuItems[0].label}
            </a>
            <button
              type="button"
              onClick={handleLogout}
              className={cn(
                sidebarNavItemBase,
                "w-full cursor-pointer appearance-none border-0 bg-transparent text-left hover:bg-brown-200",
              )}
            >
              <img src={bottomMenuItems[1].icon} alt={bottomMenuItems[1].label} className="h-4 w-4" />
              {bottomMenuItems[1].label}
            </button>
          </div>
      </aside>

      <main className="flex-1 bg-white">
        <Routes>
          <Route
            path="articles"
            element={
              <TabLayout title="Article management">
                <ArticleManagementContent />
              </TabLayout>
            }
          />
          <Route
            path="categories"
            element={
              <TabLayout title="Category management">
                <PlaceholderContent title="Category management" />
              </TabLayout>
            }
          />
          <Route
            path="profile"
            element={
              <TabLayout title="Profile">
                <PlaceholderContent title="Profile" />
              </TabLayout>
            }
          />
          <Route
            path="notifications"
            element={
              <TabLayout title="Notification">
                <PlaceholderContent title="Notification" />
              </TabLayout>
            }
          />
          <Route
            path="reset-password"
            element={
              <ResetPasswordTab />
            }
          />
          <Route path="*" element={<Navigate to="articles" replace />} />
        </Routes>
      </main>
    </div>
  </div>
  );
};

export default AdminPanelShell;
