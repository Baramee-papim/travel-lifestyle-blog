import { useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { resetPassword } from "@/services/authService";

const useResetPassword = () => {
  const { token } = useAuth();
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOpenConfirm = () => setIsConfirmOpen(true);

  const handleCloseConfirm = () => {
    if (!isSubmitting) {
      setIsConfirmOpen(false);
    }
  };

  const handleResetPassword = async () => {
    if (!currentPassword || !newPassword || !confirmPassword) {
      toast.error("Please fill in all fields");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("New password and confirm password do not match");
      return;
    }

    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await resetPassword({ currentPassword, newPassword, confirmPassword }, token);
      toast.success(response.message || "Password updated successfully");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmPassword("");
      setIsConfirmOpen(false);
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not reset password. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    currentPassword,
    newPassword,
    confirmPassword,
    isConfirmOpen,
    isSubmitting,
    setCurrentPassword,
    setNewPassword,
    setConfirmPassword,
    handleOpenConfirm,
    handleCloseConfirm,
    handleResetPassword,
  };
};

export default useResetPassword;
