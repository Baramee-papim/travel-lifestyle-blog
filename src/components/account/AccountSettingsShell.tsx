import type { ReactNode } from "react";
import { NavLink } from "react-router-dom";
import { UserDuotoneIcon } from "@/components/icon";
import Navbar from "@/components/Navbar";
import { useAuth } from "@/context/AuthContext";
import { cn } from "@/lib/utils";
import { accountMenuItems } from "./accountMenu";

type AccountSettingsShellProps = {
  title: string;
  children: ReactNode;
};

const navItemClassName =
  "flex items-center gap-3 rounded-xl px-4 py-3 text-body-2 text-brown-500 transition-colors";

const AccountSettingsShell = ({ title, children }: AccountSettingsShellProps) => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-[#fcfbf8]">
      <Navbar />
      <main className="mx-auto max-w-[1200px] px-6 py-8 md:px-10 md:py-10">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:gap-12">
          <aside className="w-full lg:max-w-[400px]">
            <div className="flex items-center gap-4">
              <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-brown-300 bg-white">
                {user?.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt={user.name || "User profile"}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <img src={UserDuotoneIcon} alt="User fallback" className="h-8 w-8 opacity-70" />
                )}
              </span>
              <div className="flex items-center gap-4 text-brown-600">
                <span className="text-headline-4 font-semibold">{user?.name || "Profile"}</span>
                <span className="hidden h-7 w-px bg-brown-300 sm:block" />
                <span className="hidden text-headline-4 font-semibold sm:block">{title}</span>
              </div>
            </div>

            <nav className="mt-8 flex flex-col gap-1">
              {accountMenuItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    cn(
                      navItemClassName,
                      isActive ? "bg-brown-200 text-brown-600" : "hover:bg-brown-100 hover:text-brown-600",
                    )
                  }
                >
                  <img src={item.icon} alt={item.label} className="h-4 w-4" />
                  {item.label}
                </NavLink>
              ))}
            </nav>
          </aside>

          <section className="min-w-0 flex-1">
            <h1 className="mb-6 text-headline-3 text-brown-600 sm:hidden">{title}</h1>
            {children}
          </section>
        </div>
      </main>
    </div>
  );
};

export default AccountSettingsShell;
