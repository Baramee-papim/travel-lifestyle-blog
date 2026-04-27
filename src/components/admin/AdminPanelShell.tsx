import type { ReactNode } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { bottomMenuItems, topMenuItems } from "./adminMenu";

type AdminPanelShellProps = {
  children: ReactNode;
};

const sidebarNavItemBase =
  "flex items-center gap-3 px-4 py-4 text-body-2 text-brown-500 antialiased transition-colors";

const AdminPanelShell = ({ children }: AdminPanelShellProps) => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-brown-100">
      <div className="flex h-screen w-full overflow-hidden border border-brown-300 bg-white shadow-sm">
        <aside className="flex w-[260px] flex-col border-r border-brown-300 bg-brown-100">
          <div className="border-b border-brown-300 p-6">
            <p className="text-[40px] font-semibold leading-none text-brown-600">hh.</p>
            <p className="mt-2 text-body-2 text-brand-orange">Admin panel</p>
          </div>

          <nav className="flex-1">
            {topMenuItems.map((item) => (
              <NavLink
                key={item.path}
                to={`/admin/${item.path}`}
                className={({ isActive }) =>
                  cn(sidebarNavItemBase, isActive ? "bg-brown-300/60 text-brown-600" : "hover:bg-brown-200")
                }
              >
                <img src={item.icon} alt={item.label} className="h-4 w-4" />
                {item.label}
              </NavLink>
            ))}
          </nav>

          <div className="border-t border-brown-300">
            <a href="/" target="_blank" rel="noreferrer" className={cn(sidebarNavItemBase, "hover:bg-brown-200")}>
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

        <main className="flex-1 bg-white">{children}</main>
      </div>
    </div>
  );
};

export default AdminPanelShell;
