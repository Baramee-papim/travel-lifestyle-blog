import { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { useAuth } from "@/context/AuthContext";
import { getCurrentUser, updateProfile } from "@/services/authService";
import { uploadProfileImage } from "@/services/storageService";

const MAX_BIO_LENGTH = 300;

const useAccountProfile = () => {
  const { token, user, updateAuthUser } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isUploadingImage, setIsUploadingImage] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.name ?? "");
      setUsername(user.username ?? "");
      setEmail(user.email ?? "");
      setBio(user.bio ?? "");
      setProfilePic(user.profilePic ?? "");
    }
  }, [user]);

  useEffect(() => {
    const initProfile = async () => {
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const currentUser = await getCurrentUser(token);
        setName(currentUser.name ?? "");
        setUsername(currentUser.username ?? "");
        setEmail(currentUser.email ?? "");
        setBio(currentUser.bio ?? "");
        setProfilePic(currentUser.profilePic ?? "");
        updateAuthUser(currentUser);
      } catch {
        // Fall back to the cached auth context values.
      } finally {
        setIsLoading(false);
      }
    };

    void initProfile();
  }, [token, updateAuthUser]);

  const handleUploadProfileImage = async (file?: File | null) => {
    if (!file) {
      return;
    }
    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsUploadingImage(true);
    try {
      const imageUrl = await uploadProfileImage(file, token);
      setProfilePic(imageUrl);
      toast.success("Profile picture uploaded");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not upload image. Please try again.");
    } finally {
      setIsUploadingImage(false);
    }
  };

  const handleSaveProfile = async () => {
    if (!name.trim() || !username.trim()) {
      toast.error("Name and username are required");
      return;
    }
    if (!token) {
      toast.error("Your session has expired. Please login again.");
      return;
    }

    setIsSaving(true);
    try {
      const response = await updateProfile(
        {
          name: name.trim(),
          username: username.trim(),
          bio: bio.trim().slice(0, MAX_BIO_LENGTH),
          profilePic,
        },
        token,
      );
      updateAuthUser(response.user);
      setName(response.user.name ?? "");
      setUsername(response.user.username ?? "");
      setEmail(response.user.email ?? "");
      setBio(response.user.bio ?? "");
      setProfilePic(response.user.profilePic ?? "");
      toast.success(response.message || "Profile updated successfully");
    } catch (error: unknown) {
      const message = axios.isAxiosError(error)
        ? (error.response?.data?.message as string | undefined)
        : undefined;
      toast.error(message || "Could not update profile. Please try again.");
    } finally {
      setIsSaving(false);
    }
  };

  return {
    name,
    username,
    email,
    profilePic,
    isLoading,
    isSaving,
    isUploadingImage,
    setName,
    setUsername,
    handleUploadProfileImage,
    handleSaveProfile,
  };
};

export default useAccountProfile;
