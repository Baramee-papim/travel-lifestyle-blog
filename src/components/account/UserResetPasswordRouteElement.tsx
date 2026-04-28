import useResetPassword from "@/hooks/useResetPassword";
import AccountSettingsShell from "./AccountSettingsShell";
import ResetPasswordContent from "./ResetPasswordContent";

const UserResetPasswordRouteElement = () => {
  const resetPasswordState = useResetPassword();

  return (
    <AccountSettingsShell title="Reset password">
      <ResetPasswordContent
        currentPassword={resetPasswordState.currentPassword}
        newPassword={resetPasswordState.newPassword}
        confirmPassword={resetPasswordState.confirmPassword}
        isConfirmOpen={resetPasswordState.isConfirmOpen}
        isSubmitting={resetPasswordState.isSubmitting}
        onCurrentPasswordChange={resetPasswordState.setCurrentPassword}
        onNewPasswordChange={resetPasswordState.setNewPassword}
        onConfirmPasswordChange={resetPasswordState.setConfirmPassword}
        onOpenConfirm={resetPasswordState.handleOpenConfirm}
        onCloseConfirm={resetPasswordState.handleCloseConfirm}
        onSubmitResetPassword={resetPasswordState.handleResetPassword}
      />
    </AccountSettingsShell>
  );
};

export default UserResetPasswordRouteElement;
