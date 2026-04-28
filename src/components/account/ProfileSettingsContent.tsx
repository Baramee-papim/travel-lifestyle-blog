import { UserDuotoneIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";

type ProfileSettingsContentProps = {
  name: string;
  username: string;
  email: string;
  profilePic: string;
  isLoading: boolean;
  isSaving: boolean;
  isUploadingImage: boolean;
  onNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onProfileImageChange: (file?: File | null) => void;
  onSave: () => Promise<void>;
};

const inputClassName =
  "h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500";

const ProfileSettingsContent = ({
  name,
  username,
  email,
  profilePic,
  isLoading,
  isSaving,
  isUploadingImage,
  onNameChange,
  onUsernameChange,
  onProfileImageChange,
  onSave,
}: ProfileSettingsContentProps) => {
  if (isLoading) {
    return (
      <div className="rounded-[24px] bg-brown-100 p-8 text-body-2 text-brown-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="max-w-[640px] rounded-[24px] bg-brown-100 p-6 shadow-sm sm:p-8">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        <span className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-full border border-brown-300 bg-white">
          {profilePic ? (
            <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
          ) : (
            <img src={UserDuotoneIcon} alt="Profile fallback" className="h-11 w-11 opacity-70" />
          )}
        </span>

        <label className="inline-flex h-12 cursor-pointer items-center justify-center rounded-full border border-brown-400 bg-white px-6 text-body-2 text-brown-600 transition hover:bg-brown-50">
          {isUploadingImage ? "Uploading..." : "Upload profile picture"}
          <input
            type="file"
            accept="image/png,image/jpeg,image/webp"
            className="hidden"
            disabled={isUploadingImage}
            onChange={(event) => onProfileImageChange(event.target.files?.[0] ?? null)}
          />
        </label>
      </div>

      <div className="my-6 border-t border-brown-300" />

      <div className="space-y-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="account-profile-name" className="text-body-2 text-brown-500">
            Name
          </label>
          <input
            id="account-profile-name"
            type="text"
            value={name}
            onChange={(event) => onNameChange(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="account-profile-username" className="text-body-2 text-brown-500">
            Username
          </label>
          <input
            id="account-profile-username"
            type="text"
            value={username}
            onChange={(event) => onUsernameChange(event.target.value)}
            className={inputClassName}
          />
        </div>

        <div className="flex flex-col gap-2">
          <label htmlFor="account-profile-email" className="text-body-2 text-brown-400">
            Email
          </label>
          <input
            id="account-profile-email"
            type="email"
            value={email}
            disabled
            className="h-11 rounded-lg border border-brown-300 bg-brown-100 px-4 text-body-2 text-brown-400 outline-none"
          />
        </div>
      </div>

      <Button
        type="button"
        className="mt-8 min-w-[120px]"
        disabled={isSaving}
        onClick={() => void onSave()}
      >
        {isSaving ? "Saving..." : "Save"}
      </Button>
    </div>
  );
};

export default ProfileSettingsContent;
