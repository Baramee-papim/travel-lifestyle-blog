import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu } from "@/components/ui/menu";
import { useAuth } from "@/context/AuthContext";
import {
  BellIcon,
  RefreshIcon,
  SignOutSquareIcon,
  UserDuotoneIcon,
} from "@/components/icon";
import { useState } from "react";

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, isAuthReady, logout } = useAuth();
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);

  const handleLogout = () => {
    logout();
    setShowProfileDropdown(false);
    navigate("/");
  };

  return (
    <nav className="bg-brown-100 px-30 py-3 flex items-center justify-between border-b border-brown-300">
      {/* Logo Section */}
      <div className="flex items-center gap-1">
        <Link to="/">
          <img src="/src/assets/logo.png" alt="logo" />
        </Link>
      </div>

      {/* Buttons Section - Shown on desktop */}
      <div className="hidden md:flex items-center gap-4">
        {!isAuthReady ? null : isAuthenticated && user ? (
          <>
            <button className="w-12 border border-brown-200 bg-white rounded-full h-12 flex items-center justify-center hover:border-brown-400 transition-colors hover:cursor-pointer">
              <img src={BellIcon} alt="bell" />
            </button>
            <div className="relative">
              <button
                type="button"
                className="flex items-center gap-2 cursor-pointer"
                onClick={() => setShowProfileDropdown((prev) => !prev)}
              >
              <span className="w-12 h-12 rounded-full border border-brown-300 bg-white flex items-center justify-center hover:border-brown-400 transition-colors hover:cursor-pointer">
                {user.profilePic ? (
                  <img
                    src={user.profilePic}
                    alt="user"
                    className="object-cover rounded-full"
                  />
                ) : (
                  <img
                  src={UserDuotoneIcon}
                  alt="user"
                  className="object-cover rounded-full"
                />
                )}
              </span>
              <span className="text-sm text-brown-600 whitespace-nowrap">
                {user.name}
              </span>
              </button>

              {showProfileDropdown ? (
                <div className="absolute right-0 top-full mt-2 w-[320px] rounded-[12px] bg-brown-100 shadow-[2px_2px_16px_0_rgba(0,0,0,0.1)] overflow-hidden z-20">
                  <Menu
                    icon={UserDuotoneIcon}
                    name="Profile"
                    className="rounded-none bg-transparent shadow-none"
                    onClick={() => setShowProfileDropdown(false)}
                  />
                  <Menu
                    icon={RefreshIcon}
                    name="Reset password"
                    className="rounded-none bg-transparent shadow-none"
                    onClick={() => {
                      setShowProfileDropdown(false);
                      navigate("/reset-password");
                    }}
                  />
                  <div className="border-t border-brown-300" />
                  <Menu
                    icon={SignOutSquareIcon}
                    name="Log out"
                    className="rounded-none bg-transparent shadow-none"
                    onClick={handleLogout}
                  />
                </div>
              ) : null}
            </div>
          </>
        ) : (
          <>
            <Button
              variant="outline"
              state="default"
              className="w-[120px]"
              onClick={() => navigate("/login")}
            >
              Log In
            </Button>
            <Button
              variant="default"
              state="default"
              className="w-[120px]"
              onClick={() => navigate("/signup")}
            >
              Sign up
            </Button>
          </>
        )}
      </div>

      {/* Hamburger button - Shown on mobile only */}
      <button className="md:hidden p-2">
        <img src="src/assets/hamburger.png" alt="hamburger" />
      </button>
    </nav>
  );
};

export default Navbar;
