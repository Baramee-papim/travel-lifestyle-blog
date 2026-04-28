import { Button } from "@/components/ui/button";
import useAdminProfile from "@/hooks/useAdminProfile";
import ProfileContent from "./ProfileContent";
import TabLayout from "./TabLayout";

const ProfileRouteElement = () => {
  const profileState = useAdminProfile();

  return (
    <TabLayout
      title="Profile"
      headerAction={
        <Button
          className="h-11 min-w-[120px] rounded-full bg-brown-600 px-8 hover:bg-brown-700"
          onClick={() => void profileState.handleSaveProfile()}
          disabled={profileState.isSaving || profileState.isLoading}
        >
          {profileState.isSaving ? "Saving..." : "Save"}
        </Button>
      }
    >
      <ProfileContent
        name={profileState.name}
        username={profileState.username}
        email={profileState.email}
        bio={profileState.bio}
        profilePic={profileState.profilePic}
        isLoading={profileState.isLoading}
        isUploadingImage={profileState.isUploadingImage}
        bioCharacterCount={profileState.bioCharacterCount}
        onNameChange={profileState.setName}
        onUsernameChange={profileState.setUsername}
        onBioChange={profileState.setBio}
        onProfileImageChange={profileState.handleUploadProfileImage}
      />
    </TabLayout>
  );
};

export default ProfileRouteElement;
