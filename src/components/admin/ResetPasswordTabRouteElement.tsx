import { Button } from "@/components/ui/button";
import useResetPassword from "@/hooks/useResetPassword";
import ResetPasswordTab from "./ResetPasswordTab";
import TabLayout from "./TabLayout";

const ResetPasswordTabRouteElement = () => {
  const resetPasswordState = useResetPassword();

  return (
    <TabLayout
      title="Reset password"
      headerAction={
        <Button className="h-11 px-8" onClick={resetPasswordState.handleOpenConfirm}>
          Reset password
        </Button>
      }
    >
      <ResetPasswordTab
        currentPassword={resetPasswordState.currentPassword}
        newPassword={resetPasswordState.newPassword}
        confirmPassword={resetPasswordState.confirmPassword}
        isConfirmOpen={resetPasswordState.isConfirmOpen}
        isSubmitting={resetPasswordState.isSubmitting}
        onCurrentPasswordChange={resetPasswordState.setCurrentPassword}
        onNewPasswordChange={resetPasswordState.setNewPassword}
        onConfirmPasswordChange={resetPasswordState.setConfirmPassword}
        onCloseConfirm={resetPasswordState.handleCloseConfirm}
        onSubmitResetPassword={resetPasswordState.handleResetPassword}
      />
    </TabLayout>
  );
};

export default ResetPasswordTabRouteElement;
