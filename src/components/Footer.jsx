import { Github, Linkedin, Facebook } from "lucide-react";
const Footer = () => {
  return (
    <footer className="bg-brown-200 px-8 py-6">
      <div className="max-w-7xl mx-auto bg-brown-200 px-8 py-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-1.5">
        {/* Left Section - Get in touch with social icons */}
        <div className="flex items-center gap-4">
          <p className="text-body-1 text-brown-500">Get in touch</p>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            {/* LinkedIn Icon */}
            <a 
              href="https://linkedin.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5 text-white" />
            </a>

            {/* GitHub Icon */}
            <a 
              href="https://github.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5 text-white" />
            </a>

            {/* Facebook Icon */}
            <a 
              href="https://facebook.com" 
              target="_blank" 
              rel="noopener noreferrer"
              className="w-6 h-6 rounded-full bg-brown-600 flex items-center justify-center hover:bg-brown-500 transition-colors"
              aria-label="Facebook"
            >
              <Facebook className="w-5 h-5 text-white" />
            </a>
          </div>
        </div>

        {/* Right Section - Home page link */}
        <div className="pt-4 gap-3">
          <a 
            href="/" 
            className="text-body-1 text-brown-600 underline hover:text-brown-500 transition-colors"
          >
            Home page
          </a>
        </div>
      </div>
    </footer>
  )
}

export default Footer
