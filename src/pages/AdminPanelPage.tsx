import type { ReactNode } from "react";
import { NavLink, Navigate, Route, Routes } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  AddRoundIcon,
  BellIcon,
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

type MenuItem = {
  label: string;
  path: string;
  icon: string;
};

type ArticleItem = {
  title: string;
  category: string;
  status: string;
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

const articleRows: ArticleItem[] = [
  {
    title: "Understanding Cat Behavior: Why Your Feline Friend Acts the Way They Do",
    category: "Cat",
    status: "Published",
  },
  {
    title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Finding Motivation: How to Stay Inspired Through Life's Challenges",
    category: "General",
    status: "Published",
  },
  {
    title: "The Science of the Cat's Purr: How It Benefits Cats and Humans Alike",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Top 10 Health Tips to Keep Your Cat Happy and Healthy",
    category: "Cat",
    status: "Published",
  },
  {
    title: "Unlocking Creativity: Simple Habits to Spark Inspiration Daily",
    category: "Inspiration",
    status: "Published",
  },
];

const PlaceholderContent = ({ title }: { title: string }) => (
  <div className="rounded-2xl border border-brown-300 bg-white p-8 text-brown-500">
    <h2 className="text-headline-4 text-brown-600">{title}</h2>
    <p className="mt-3 text-body-2 text-brown-400">This tab is ready for future content.</p>
  </div>
);

const ArticleManagementContent = () => (
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
          {articleRows.map((article) => (
            <tr key={article.title} className="border-b border-brown-200 text-body-2 text-brown-500">
              <td className="max-w-[460px] truncate px-4 py-4">{article.title}</td>
              <td className="px-4 py-4">{article.category}</td>
              <td className="px-4 py-4">
                <span className="inline-flex items-center gap-2 text-brand-green">
                  <span className="h-1.5 w-1.5 rounded-full bg-brand-green" />
                  {article.status}
                </span>
              </td>
              <td className="px-4 py-4">
                <div className="flex justify-end gap-3">
                  <button type="button" className="cursor-pointer opacity-80 transition hover:opacity-100">
                    <img src={EditIcon} alt="Edit article" className="h-4 w-4" />
                  </button>
                  <button type="button" className="cursor-pointer opacity-80 transition hover:opacity-100">
                    <img src={TrashIcon} alt="Delete article" className="h-4 w-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

const TabLayout = ({ title, children }: { title: string; children: ReactNode }) => (
  <div className="flex flex-1 flex-col p-8">
    <header className="mb-6 flex items-center justify-between">
      <h1 className="text-headline-3 text-brown-600">{title}</h1>
      {title === "Article management" ? (
        <Button className="h-11 gap-2 px-6">
          <img src={AddRoundIcon} alt="Add article" className="h-4 w-4 invert" />
          Create article
        </Button>
      ) : null}
    </header>
    {children}
  </div>
);

const AdminPanelShell = () => (
  <div className="min-h-screen bg-brown-100">
    <div className=" flex h-screen w-full  overflow-hidden  border border-brown-300 bg-white shadow-sm">
      <aside className="flex w-[260px] flex-col border-r border-brown-300 bg-brown-100">
        <div className="border-b border-brown-300 p-6">
          <p className="text-[40px] font-semibold leading-none text-brown-600">hh.</p>
          <p className="mt-2 text-body-2 text-brand-orange">Admin panel</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {topMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
                className={({ isActive }) =>
                  cn(
                    "flex items-center gap-3 rounded-xl px-4 py-3 text-body-2 text-brown-500 transition-colors",
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

        <div className="space-y-2 border-t border-brown-300 p-4">
          {bottomMenuItems.map((item) => (
            <NavLink
              key={item.path}
              to={`/admin/${item.path}`}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-xl px-4 py-3 text-body-2 text-brown-500 transition-colors",
                  isActive ? "bg-brown-300/60 text-brown-600" : "hover:bg-brown-200",
                )
              }
            >
              <img src={item.icon} alt={item.label} className="h-4 w-4" />
              {item.label}
            </NavLink>
          ))}
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
              <TabLayout title="Reset password">
                <PlaceholderContent title="Reset password" />
              </TabLayout>
            }
          />
          <Route
            path="website"
            element={
              <TabLayout title="hh. website">
                <PlaceholderContent title="hh. website" />
              </TabLayout>
            }
          />
          <Route
            path="logout"
            element={
              <TabLayout title="Log out">
                <PlaceholderContent title="Log out" />
              </TabLayout>
            }
          />
          <Route path="*" element={<Navigate to="articles" replace />} />
        </Routes>
      </main>
    </div>
  </div>
);

export default AdminPanelShell;
