const Navbar = () => {
  return (
    <nav className="bg-brown-100 px-6 py-3 flex items-center justify-between border-b border-brown-300">
      {/* Logo Section */}
      <div className="flex items-center gap-1">
        <img src="src/assets/logo.png" alt="logo" />
      </div>

      {/* Buttons Section - Shown on desktop */}
      <div className="hidden md:flex items-center gap-4">
        <button className="px-6 py-2 bg-white border border-brown-300 text-brown-500 rounded-md hover:bg-brown-100 transition-colors">
          Log In
        </button>
        <button className="px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-500 transition-colors">
          Sign up
        </button>
      </div>

      {/* Hamburger button - Shown on mobile only */}
      <button className="md:hidden p-2">
        <img src="src/assets/hamburger.png" alt="hamburger" />
      </button>
    </nav>
  )
}

export default Navbar
