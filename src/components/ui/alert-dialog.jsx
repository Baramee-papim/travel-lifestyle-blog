import { X } from "lucide-react";

const AlertDialog = ({ open, onClose, onConfirm }) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black/50" 
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-lg max-w-md w-full mx-4 z-50">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-black hover:text-gray-600 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Content */}
        <div className="p-6 pt-8">
          {/* Title */}
          <h2 className="text-center text-2xl font-bold text-black mb-6 pr-8">
            Create an account to continue
          </h2>
          
          {/* Button */}
          <div className="flex flex-col gap-4 px-15">
            <button
              onClick={onConfirm}
              className="w-full bg-black text-white py-3 px-10 rounded-full hover:bg-gray-900 transition-colors font-medium"
            >
              Create account
            </button>
            
            {/* Login Link */}
            <p className="text-center text-sm text-gray-600">
              Already have an account?{" "}
              <button
                onClick={onConfirm}
                className="text-gray-800 hover:underline font-medium"
              >
                Log in
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertDialog;
