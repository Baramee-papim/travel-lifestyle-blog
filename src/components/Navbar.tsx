import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
const Navbar = () => {
  const navigate = useNavigate();
  return (
    <nav className="bg-brown-100 px-6 py-3 flex items-center justify-between border-b border-brown-300">
      {/* Logo Section */}
      <div className="flex items-center gap-1">
        <Link to="/">
        <img src="/src/assets/logo.png" alt="logo" />
        </Link>
      </div>

      {/* Buttons Section - Shown on desktop */}
      <div className="hidden md:flex items-center gap-4">
        <Button variant="outline" state="default" className="w-[120px]">
          Log In
        </Button>
        <Button variant="default" state="default" className="w-[120px]">
          Sign up
        </Button>
      </div>

      {/* Hamburger button - Shown on mobile only */}
      <button className="md:hidden p-2">
        <img src="src/assets/hamburger.png" alt="hamburger" />
      </button>
    </nav>
  )
}

export default Navbar
