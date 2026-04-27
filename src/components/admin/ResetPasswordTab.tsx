import { CloseRoundIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

type ResetPasswordTabProps = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
  isConfirmOpen: boolean;
  isSubmitting: boolean;
  onCurrentPasswordChange: (value: string) => void;
  onNewPasswordChange: (value: string) => void;
  onConfirmPasswordChange: (value: string) => void;
  onCloseConfirm: () => void;
  onSubmitResetPassword: () => Promise<void>;
};

const ResetPasswordTab = ({
  currentPassword,
  newPassword,
  confirmPassword,
  isConfirmOpen,
  isSubmitting,
  onCurrentPasswordChange,
  onNewPasswordChange,
  onConfirmPasswordChange,
  onCloseConfirm,
  onSubmitResetPassword,
}: ResetPasswordTabProps) => {

  return (
    <>
      <div className="rounded-2xl border border-brown-300 bg-white p-8">
        <div className="flex max-w-[360px] flex-col gap-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="currentPassword" className="text-body-2 text-brown-500">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              placeholder="Current password"
              value={currentPassword}
              onChange={(event) => onCurrentPasswordChange(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="newPassword" className="text-body-2 text-brown-500">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              placeholder="New password"
              value={newPassword}
              onChange={(event) => onNewPasswordChange(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
          <div className="flex flex-col gap-2">
            <label htmlFor="confirmPassword" className="text-body-2 text-brown-500">
              Confirm new password
            </label>
            <input
              id="confirmPassword"
              type="password"
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(event) => onConfirmPasswordChange(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
        </div>
      </div>

      {isConfirmOpen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            aria-label="Close reset password modal"
            className="absolute inset-0 bg-black/30"
            onClick={onCloseConfirm}
          />
          <div className="relative z-10 w-full max-w-[640px] rounded-[32px] bg-white px-10 py-8 shadow-xl">
            <button
              type="button"
              onClick={onCloseConfirm}
              className="absolute right-8 top-8 cursor-pointer opacity-80 transition hover:opacity-100"
              aria-label="Close modal"
            >
              <img src={CloseRoundIcon} alt="Close" className="h-6 w-6" />
            </button>
            <div className="text-center">
              <h3 className="text-headline-3 text-brown-600">Reset password</h3>
              <p className="mt-4 text-headline-4 font-medium text-brown-500">
                Do you want to reset your password?
              </p>
            </div>
            <div className="mt-10 flex items-center justify-center gap-3">
              <Button
                type="button"
                variant="outline"
                className="min-w-[170px]"
                onClick={onCloseConfirm}
                disabled={isSubmitting}
              >
                Cancel
              </Button>
              <Button
                type="button"
                className="min-w-[170px]"
                onClick={() => void onSubmitResetPassword()}
                disabled={isSubmitting}
              >
                {isSubmitting ? "Resetting..." : "Reset"}
              </Button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default ResetPasswordTab;
