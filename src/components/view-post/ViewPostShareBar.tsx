import { Copy, Facebook, Heart, Linkedin, Twitter } from "lucide-react";
import { cn } from "@/lib/utils";
import type { SocialSharePlatform } from "@/types/socialShare";

type ViewPostShareBarProps = {
  likes: number;
  userHasLiked: boolean;
  likeSubmitting: boolean;
  onLike: () => void;
  onCopyLink: () => void;
  onShare: (platform: SocialSharePlatform) => void;
};

const ViewPostShareBar = ({
  likes,
  userHasLiked,
  likeSubmitting,
  onLike,
  onCopyLink,
  onShare,
}: ViewPostShareBarProps) => {
  return (
    <div className="flex justify-between items-center gap-4 mb-6 bg-brown-200 rounded-md p-4">
      <div>
        <button
          type="button"
          onClick={() => void onLike()}
          disabled={likeSubmitting || userHasLiked}
          title={userHasLiked ? "You liked this article" : undefined}
          className={cn(
            "flex items-center gap-2 px-4 py-2 rounded-full border border-brown-400 transition-colors text-body-2 disabled:opacity-60 disabled:pointer-events-none",
            userHasLiked
              ? "bg-white text-red-600 "
              : "bg-white text-brown-600 hover:bg-brown-300",
            likeSubmitting && "pointer-events-none",
          )}
        >
          <Heart className={cn("w-4 h-4", userHasLiked && "fill-red-500 text-red-500")} />
          {likes}
        </button>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={onCopyLink}
          className="flex items-center gap-2 px-4 py-2 bg-white text-brown-600 rounded-full border border-brown-400 hover:bg-brown-300 transition-colors text-body-2"
        >
          <Copy className="w-4 h-4" />
          Copy link
        </button>
        <button
          type="button"
          onClick={() => onShare("Facebook")}
          className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <Facebook className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onShare("LinkedIn")}
          className="p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
        >
          <Linkedin className="w-4 h-4" />
        </button>
        <button
          type="button"
          onClick={() => onShare("Twitter")}
          className="p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"
        >
          <Twitter className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ViewPostShareBar;
