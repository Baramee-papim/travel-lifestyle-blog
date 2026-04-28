import useAccountProfile from "@/hooks/useAccountProfile";
import AccountSettingsShell from "./AccountSettingsShell";
import ProfileSettingsContent from "./ProfileSettingsContent";

const UserProfileRouteElement = () => {
  const profileState = useAccountProfile();

  return (
    <AccountSettingsShell title="Profile">
      <ProfileSettingsContent
        name={profileState.name}
        username={profileState.username}
        email={profileState.email}
        profilePic={profileState.profilePic}
        isLoading={profileState.isLoading}
        isSaving={profileState.isSaving}
        isUploadingImage={profileState.isUploadingImage}
        onNameChange={profileState.setName}
        onUsernameChange={profileState.setUsername}
        onProfileImageChange={profileState.handleUploadProfileImage}
        onSave={profileState.handleSaveProfile}
      />
    </AccountSettingsShell>
  );
};

export default UserProfileRouteElement;
