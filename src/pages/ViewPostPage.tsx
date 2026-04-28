import { useCallback, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "sonner";
import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";
import AlertDialog from "@/components/ui/alert-dialog";
import ViewPostArticleMeta from "@/components/view-post/ViewPostArticleMeta";
import ViewPostAuthorSidebar from "@/components/view-post/ViewPostAuthorSidebar";
import ViewPostCommentsSection from "@/components/view-post/ViewPostCommentsSection";
import ViewPostHero from "@/components/view-post/ViewPostHero";
import ViewPostIntro from "@/components/view-post/ViewPostIntro";
import ViewPostMarkdownBody from "@/components/view-post/ViewPostMarkdownBody";
import ViewPostPageLoading from "@/components/view-post/ViewPostPageLoading";
import ViewPostShareBar from "@/components/view-post/ViewPostShareBar";
import { useAuth } from "@/context/AuthContext";
import useViewPostArticle from "@/hooks/useViewPostArticle";
import useViewPostComments from "@/hooks/useViewPostComments";
import { copyTextToClipboard } from "@/lib/clipboard";
import { getSocialShareUrl, openShareInNewWindow } from "@/lib/socialShare";
import NotFoundPage from "@/pages/NotFoundPage";
import type { SocialSharePlatform } from "@/types/socialShare";

const ViewPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated: isLoggedIn, token, isAuthReady } = useAuth();
  const navigate = useNavigate();
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const onRequireAuth = useCallback(() => setShowAlertDialog(true), []);

  const {
    post,
    loading,
    error,
    likes,
    userHasLiked,
    likeSubmitting,
    like,
  } = useViewPostArticle(id, { token, isAuthReady, isLoggedIn, onRequireAuth });

  const {
    comment,
    comments,
    commentsLoading,
    commentsError,
    commentSubmitting,
    fetchComments,
    submitComment,
    onCommentChange,
    onCommentFocus,
  } = useViewPostComments(id, { token, isLoggedIn, onRequireAuth });

  const handleCopyLink = useCallback(async () => {
    try {
      await copyTextToClipboard(window.location.href);
      toast.success("Copied!", {
        description: "This article has been copied to your clipboard.",
      });
    } catch {
      toast.error("Failed to copy link");
    }
  }, []);

  const handleShare = useCallback((platform: SocialSharePlatform) => {
    const shareUrl = getSocialShareUrl(platform, window.location.href);
    openShareInNewWindow(shareUrl);
  }, []);

  if (loading) {
    return <ViewPostPageLoading />;
  }

  if (error || !post) {
    return (
      <div className="bg-white min-h-screen">
        <NotFoundPage />
      </div>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 py-8">
        <ViewPostHero post={post} />
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <ViewPostArticleMeta post={post} />
            <ViewPostIntro post={post} />
            <ViewPostMarkdownBody post={post} />

            <div className="border-t border-brown-300 pt-6 mt-8">
              <ViewPostShareBar
                likes={likes}
                userHasLiked={userHasLiked}
                likeSubmitting={likeSubmitting}
                onLike={like}
                onCopyLink={() => void handleCopyLink()}
                onShare={handleShare}
              />
              <ViewPostCommentsSection
                comment={comment}
                comments={comments}
                commentsLoading={commentsLoading}
                commentsError={commentsError}
                commentSubmitting={commentSubmitting}
                onCommentChange={onCommentChange}
                onCommentFocus={onCommentFocus}
                onSubmit={submitComment}
                onRetryComments={() => void fetchComments()}
              />
            </div>
          </div>

          <ViewPostAuthorSidebar post={post} />
        </div>
      </div>

      <Footer />

      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        onSignup={() => navigate("/signup")}
        onLogin={() => navigate("/login")}
      />
    </div>
  );
};

export default ViewPostPage;
