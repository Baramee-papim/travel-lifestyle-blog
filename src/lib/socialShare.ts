import type { SocialSharePlatform } from "@/types/socialShare";

export function getSocialShareUrl(platform: SocialSharePlatform, pageUrl: string): string {
  const encoded = encodeURIComponent(pageUrl);
  switch (platform) {
    case "Facebook":
      return `https://www.facebook.com/share.php?u=${encoded}`;
    case "LinkedIn":
      return `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`;
    case "Twitter":
      return `https://www.twitter.com/share?&url=${encoded}`;
  }
}

export function openShareInNewWindow(shareUrl: string): void {
  window.open(shareUrl, "_blank", "width=600,height=400");
}
