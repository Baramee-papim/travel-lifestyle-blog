import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";

const ViewPostPageLoading = () => {
  return (
    <div className="bg-white min-h-screen">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex items-center justify-center min-h-[400px]">
          <p className="text-body-1 text-brown-500">Loading...</p>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default ViewPostPageLoading;
