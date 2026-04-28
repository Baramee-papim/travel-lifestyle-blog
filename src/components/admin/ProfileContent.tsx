import { UserDuotoneIcon } from "@/components/icon";

type ProfileContentProps = {
  name: string;
  username: string;
  email: string;
  bio: string;
  profilePic: string;
  isLoading: boolean;
  isUploadingImage: boolean;
  bioCharacterCount: number;
  onNameChange: (value: string) => void;
  onUsernameChange: (value: string) => void;
  onBioChange: (value: string) => void;
  onProfileImageChange: (file?: File | null) => void;
};

const ProfileContent = ({
  name,
  username,
  email,
  bio,
  profilePic,
  isLoading,
  isUploadingImage,
  bioCharacterCount,
  onNameChange,
  onUsernameChange,
  onBioChange,
  onProfileImageChange,
}: ProfileContentProps) => {
  if (isLoading) {
    return (
      <div className="rounded-2xl border border-brown-300 bg-white p-8 text-body-2 text-brown-500">
        Loading profile...
      </div>
    );
  }

  return (
    <div className="rounded-2xl border h-full overflow-y-auto border-brown-300 bg-white p-8">
      <div className="h-full max-w-[760px] ">
        <div className="mb-4 flex items-center gap-5 ">
          <span className="flex h-20 w-20 items-center justify-center overflow-hidden rounded-full border border-brown-300 bg-brown-100">
            {profilePic ? (
              <img src={profilePic} alt="Profile" className="h-full w-full object-cover" />
            ) : (
              <img src={UserDuotoneIcon} alt="Profile fallback" className="h-10 w-10 opacity-70" />
            )}
          </span>
          <label className="inline-flex cursor-pointer items-center justify-center rounded-full border border-brown-400 px-6 py-2 text-body-2 text-brown-600 transition hover:bg-brown-100">
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

        <div className="space-y-5">
          <div className="flex flex-col gap-2">
            <label htmlFor="admin-profile-name" className="text-body-2 text-brown-500">
              Name
            </label>
            <input
              id="admin-profile-name"
              type="text"
              value={name}
              onChange={(event) => onNameChange(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="admin-profile-username" className="text-body-2 text-brown-500">
              Username
            </label>
            <input
              id="admin-profile-username"
              type="text"
              value={username}
              onChange={(event) => onUsernameChange(event.target.value)}
              className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="admin-profile-email" className="text-body-2 text-brown-500">
              Email
            </label>
            <input
              id="admin-profile-email"
              type="email"
              value={email}
              disabled
              className="h-11 rounded-lg border border-brown-300 bg-brown-100 px-4 text-body-2 text-brown-500 outline-none"
            />
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="admin-profile-bio" className="text-body-2 text-brown-500">
              Bio ({bioCharacterCount}/300 letters)
            </label>
            <textarea
              id="admin-profile-bio"
              value={bio}
              maxLength={300}
              rows={4}
              onChange={(event) => onBioChange(event.target.value)}
              className="rounded-lg border border-brown-300 bg-white px-4 py-3 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileContent;
