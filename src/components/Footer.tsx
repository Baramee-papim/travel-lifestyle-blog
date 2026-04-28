import { Github, Linkedin, Mail } from "lucide-react";
import type { ReactNode } from "react";

interface FooterIcon {
  name: string;
  icon: ReactNode;
  href: string;
}

const Footer = () => {
  const icons: FooterIcon[] = [
    {
      name: "LinkedIn",
      icon: <Linkedin className="w-4 h-4 text-white" />,
      href: "https://linkedin.com"
    },
    {
      name: "GitHub",
      icon: <Github className="w-4 h-4 text-white" />,
      href: "https://github.com"
    },
    {
      name: "Mail",
      icon: <Mail className="w-4 h-4 text-white" />,
      href: "https://hotmail.com"
    }
  ]
  
  return (
    <footer className="bg-brown-200 px-8 py-6">
      <div className="max-w-7xl mx-auto bg-brown-200 px-8 py-6 rounded-lg flex flex-col md:flex-row items-center justify-between gap-1.5">
        {/* Left Section - Get in touch with social icons */}
        <div className="flex items-center gap-4">
          <p className="text-body-1 text-brown-500">Get in touch</p>
          
          {/* Social Media Icons */}
          <div className="flex items-center gap-3">
            {icons.map((icon) => (
              <a 
              href={icon.href} 
              key={icon.name}
              target="_blank"
              rel="noreferrer"
              className="w-6 h-6 rounded-full bg-brown-500 flex items-center justify-center hover:bg-brown-500 transition-colors"
              >
                {icon.icon}
              </a>
            ))}           
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
