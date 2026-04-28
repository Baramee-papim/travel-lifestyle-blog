import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContext";
import Footer from "../components/Footer";
import { Facebook, Linkedin, Twitter, Copy, Send, Heart } from "lucide-react";
import AlertDialog from "../components/ui/alert-dialog";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";
import type { ChangeEvent, FormEvent } from "react";
import type { BlogPost } from "../types/blog";
import { getArticleById, likeArticle } from "../services/articleService";
import NotFoundPage from "./NotFoundPage";
import { useNavigate } from "react-router-dom";

interface PostComment {
  id: number;
  author: string;
  avatar: string;
  date: string;
  content: string;
}

const ViewPostPage = () => {
  const { id } = useParams<{ id: string }>();
  const { isAuthenticated: isLoggedIn, token } = useAuth();
  const navigate = useNavigate();
  const [comment, setComment] = useState("");
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showAlertDialog, setShowAlertDialog] = useState(false);
  const [likes, setLikes] = useState(0); // จำนวนไลก์จะดึงจาก database
  const [likeSubmitting, setLikeSubmitting] = useState(false);
  const [comments, setComments] = useState<PostComment[]>([
    // Mock comments data - จะดึงจาก database ในอนาคต
    {
      id: 1,
      author: "Jacob Lash",
      avatar:
        "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
      date: "12 September 2024 at 18:30",
      content:
        "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting.",
    },
    {
      id: 2,
      author: "Ahri",
      avatar:
        "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
      date: "12 September 2024 at 18:30",
      content:
        "Such a great read! I've always wondered why my my cat slow blinks at me—now I know it's her way of showing trust!",
    },
    {
      id: 3,
      author: "Mimi mama",
      avatar:
        "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
      date: "12 September 2024 at 18:30",
      content:
        "This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!",
    },
  ]);

  useEffect(() => {
    const fetchPost = async () => {
      if (!id) {
        setError("Post not found");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        const article = await getArticleById(id);
        setPost(article);
        setLikes(article.likes_count ?? article.likes ?? 0);
        setError(null);
      } catch (fetchError) {
        console.error("Error fetching post:", fetchError);
        setError("Failed to load post");
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [id]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      toast.success("Copied!", {
        description: "This article has been copied to your clipboard.",
      });
    } catch (error) {
      toast.error("Failed to copy link");
    }
  };

  const handleLike = async () => {
    if (!isLoggedIn || !token) {
      setShowAlertDialog(true);
      return;
    }
    if (!id || likeSubmitting) {
      return;
    }
    setLikeSubmitting(true);
    try {
      const result = await likeArticle(id, token);
      setLikes(result.likes_count);
      if (result.already_liked) {
        toast.info("You already liked this article.");
      } else {
        toast.success("Thanks for liking this article!");
      }
    } catch (likeError) {
      console.error("Like error:", likeError);
      toast.error("Could not save your like. Please try again.");
    } finally {
      setLikeSubmitting(false);
    }
  };

  const handleShareClick = (platform: "Facebook" | "LinkedIn" | "Twitter") => {
    // Get the current article URL
    const articleUrl = encodeURIComponent(window.location.href);

    // Define sharing URLs for each platform
    let shareUrl = "";

    switch (platform) {
      case "Facebook":
        shareUrl = `https://www.facebook.com/share.php?u=${articleUrl}`;
        break;
      case "LinkedIn":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${articleUrl}`;
        break;
      case "Twitter":
        shareUrl = `https://www.twitter.com/share?&url=${articleUrl}`;
        break;
      default:
        return;
    }

    // Open the sharing URL in a new window
    window.open(shareUrl, "_blank", "width=600,height=400");
  };

  const handleCommentSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isLoggedIn) {
      setShowAlertDialog(true);
      return;
    }

    if (!comment.trim()) {
      return; // ไม่ส่ง comment ถ้าว่าง
    }

    // เพิ่ม comment ใหม่ (mock - จะเชื่อม API ในอนาคต)
    const newComment = {
      id: comments.length + 1,
      author: "You", // ในอนาคตจะดึงจาก user profile
      avatar:
        "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
      date:
        new Date().toLocaleDateString("en-GB", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }) +
        " at " +
        new Date().toLocaleTimeString("en-GB", {
          hour: "2-digit",
          minute: "2-digit",
        }),
      content: comment,
    };

    setComments([...comments, newComment]);
    setComment("");

    // TODO: ส่ง comment ไป backend
    // await axios.post(`/posts/${id}/comments`, { content: comment });
  };

  const handleCommentChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  };

  const handleCommentFocus = (e: React.FocusEvent<HTMLTextAreaElement>) => {
    if (!isLoggedIn) {
      setShowAlertDialog(true);
      e.target.blur();
      return;
    }
  };

  const handleAlertConfirm = () => {
    setShowAlertDialog(false);
    // ในอนาคตสามารถ redirect ไปหน้า login ได้
    // navigate("/login");
  };

  if (loading) {
    return (
      <div className="bg-white min-h-screen">
        <Navbar />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="flex items-center justify-center min-h-[400px]">
            <p className="text-body-1 text-brown-500">Loading...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
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

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Hero Image */}
        <div className="mb-6">
          <img
            src={post.image}
            alt={post.title}
            className="w-full h-[580px] object-cover rounded-lg"
          />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Article Content */}

          <div className="flex-1">
            {/* Article Metadata */}
            <div className="mb-4">
              <div className="flex items-center gap-4 mb-4">
                <span className="bg-green-200 rounded-full px-3 py-1 text-sm font-semibold text-green-600">
                  {post.category || "Article"}
                </span>
                <span className="text-body-2 text-brown-400">
                  {new Date(post.date).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-headline-2 font-bold text-brown-600 mb-6">
                {post.title}
              </h1>
            </div>

            {/* Article Introduction */}
            <div className="mb-8">
              <p className="text-body-1 text-brown-500 leading-relaxed">
                {post.description}
              </p>
            </div>

            {/* Article Sections */}
            <div className="markdown">
              <ReactMarkdown>{post.content ?? ""}</ReactMarkdown>
            </div>

            {/* Share and Comment Section */}
            <div className="border-t border-brown-300 pt-6 mt-8">
              {/* Share Buttons */}
              <div className="flex justify-between items-center gap-4 mb-6 bg-brown-200 rounded-md p-4">
                {/* Like Button */}
                <div>
                  <button
                    type="button"
                    onClick={() => void handleLike()}
                    disabled={likeSubmitting}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-brown-600 rounded-full border border-brown-400 hover:bg-brown-300 transition-colors text-body-2 disabled:opacity-60 disabled:pointer-events-none"
                  >
                    <Heart className="w-4 h-4" />
                    {likes}
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={handleCopyLink}
                    className="flex items-center gap-2 px-4 py-2 bg-white text-brown-600 rounded-full border border-brown-400 hover:bg-brown-300 transition-colors text-body-2"
                  >
                    <Copy className="w-4 h-4" />
                    Copy link
                  </button>
                  <button
                    onClick={() => handleShareClick("Facebook")}
                    className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                  >
                    <Facebook className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShareClick("LinkedIn")}
                    className="p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors"
                  >
                    <Linkedin className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleShareClick("Twitter")}
                    className="p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors"
                  >
                    <Twitter className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Comment Section */}
              <div className="mt-6">
                <h3 className="text-headline-4 font-semibold text-brown-600 mb-4">
                  Comment
                </h3>
                <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                  <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    onFocus={handleCommentFocus}
                    placeholder="What are your thoughts?"
                    className="w-full px-4 py-3 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent resize-none"
                    rows={4}
                  />
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      className="flex items-center gap-2 px-6 py-2 bg-brown-600 text-white rounded-full hover:bg-brown-500 transition-colors"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </form>

                {/* Comments List */}
                <div className="space-y-6">
                  {comments.map((commentItem, index) => (
                    <div key={commentItem.id}>
                      <div className="flex gap-4">
                        {/* Avatar */}
                        <div className="shrink-0">
                          <img
                            src={commentItem.avatar}
                            alt={commentItem.author}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                        </div>

                        {/* Comment Content */}
                        <div className="flex-1">
                          <div className="mb-2">
                            <h4 className="text-body-1 font-semibold text-brown-600">
                              {commentItem.author}
                            </h4>
                            <p className="text-body-2 text-brown-400">
                              {commentItem.date}
                            </p>
                          </div>
                          <p className="text-body-1 text-brown-500 leading-relaxed">
                            {commentItem.content}
                          </p>
                        </div>
                      </div>

                      {/* Divider */}
                      {index < comments.length - 1 && (
                        <div className="mt-6 border-t border-brown-200"></div>
                      )}
                    </div>
                  ))}

                  {comments.length === 0 && (
                    <p className="text-body-2 text-brown-400 text-center py-8">
                      No comments yet. Be the first to comment!
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar - Author Box */}
          <div className="lg:w-80 shrink-0">
            <div className="bg-brown-100 rounded-lg p-6 sticky top-4">
              <div className="flex flex-col items-center text-center">
                {/* Author Profile Picture */}
                <img
                  className="w-20 h-20 rounded-full mb-4 object-cover"
                  src="https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg"
                  alt={post.author ?? "Author"}
                />

                {/* Author Name */}
                <h3 className="text-headline-4 font-semibold text-brown-600 mb-3">
                  {post.author ?? "Author"}
                </h3>

                {/* Author Bio */}
                <p className="text-body-2 text-brown-500 leading-relaxed">
                  I am a passionate freelance writer who specializes in animal
                  behavior and care. With a deep love for cats, I enjoy sharing
                  insights on feline companionship and wellness. When I'm not
                  writing, I spend my time volunteering at my local animal
                  shelter, helping cats find loving homes.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />

      {/* Alert Dialog */}
      <AlertDialog
        open={showAlertDialog}
        onClose={() => setShowAlertDialog(false)}
        onSignup={() => navigate("/signup")}
        onLogin={() => navigate("/login")}
      />
      {/* <Toaster /> */}
    </div>
  );
};

export default ViewPostPage;
