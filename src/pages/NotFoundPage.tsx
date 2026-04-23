import { Link } from "react-router-dom";
import { Button } from "../components/ui/button";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const NotFoundPage = () => {
    return (
        <div className="min-h-screen flex flex-col bg-white">
            <Navbar />
            <div className="flex-1 flex flex-col items-center justify-center gap-8 px-4">
                {/* Circular Icon with Exclamation Mark */}
                <div className="w-24 h-24 rounded-full border-4 border-black flex items-center justify-center">
                    <span className="text-5xl font-bold text-black">!</span>
                </div>
                
                {/* Page Not Found Text */}
                <h1 className="text-4xl font-bold text-black">Page Not Found</h1>
                
                {/* Go To Homepage Button */}
                <Link to="/">
                    <Button 
                        variant="default" 
                        size="lg"
                        className="bg-black text-white hover:bg-black/90 rounded-md px-6 py-3"
                    >
                        Go To Homepage
                    </Button>
                </Link>
            </div>
            <Footer />
        </div>
    );
};

export default NotFoundPage;