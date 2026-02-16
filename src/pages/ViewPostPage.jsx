import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Facebook, Linkedin, Twitter, Copy, Send, Heart } from "lucide-react";
import axios from "axios";
import AlertDialog from "../components/ui/alert-dialog";
import ReactMarkdown from "react-markdown";
import { toast } from "sonner";

const ViewPostPage = () => {
    const { id } = useParams();
    const [comment, setComment] = useState("");
    const [post, setPost] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        // ตรวจสอบสถานะ login จาก localStorage
        return localStorage.getItem("isLoggedIn") === "true";
    });
    const [showAlertDialog, setShowAlertDialog] = useState(false);
    const [likes, setLikes] = useState(0); // จำนวนไลก์จะดึงจาก database
    const [comments, setComments] = useState([
        // Mock comments data - จะดึงจาก database ในอนาคต
        {
            id: 1,
            author: "Jacob Lash",
            avatar: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
            date: "12 September 2024 at 18:30",
            content: "I loved this article! It really explains why my cat is so independent yet loving. The purring section was super interesting."
        },
        {
            id: 2,
            author: "Ahri",
            avatar: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
            date: "12 September 2024 at 18:30",
            content: "Such a great read! I've always wondered why my my cat slow blinks at me—now I know it's her way of showing trust!"
        },
        {
            id: 3,
            author: "Mimi mama",
            avatar: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
            date: "12 September 2024 at 18:30",
            content: "This article perfectly captures why cats make such amazing pets. I had no idea their purring could help with healing. Fascinating stuff!"
        }
    ]);

    useEffect(() => {
        fetchPost();
    }, [id]);

    const fetchPost = async () => {
        try {
            setLoading(true);
            const response = await axios.get("https://blog-post-project-api.vercel.app/posts");
            const posts = response.data.posts;
            const foundPost = posts.find(p => p.id === parseInt(id));
            
            if (foundPost) {
                setPost(foundPost);
                // ดึง likes จาก database
                setLikes(foundPost.likes || 0);
            } else {
                setError("Post not found");
            }
        } catch (error) {
            console.error("Error fetching post:", error);
            setError("Failed to load post");
        } finally {
            setLoading(false);
        }
    };

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

    const handleLike = () => {
        if (!isLoggedIn) {
            setShowAlertDialog(true);
            return;
        }
        // Handle like functionality here
        setLikes(prev => prev + 1);
    };

    const handleShareClick = (platform) => {
        if (!isLoggedIn) {
            setShowAlertDialog(true);
            return;
        }
        // Handle share functionality here
        console.log(`Sharing to ${platform}`);
    };

    const handleCommentSubmit = (e) => {
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
            avatar: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg",
            date: new Date().toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric"
            }) + " at " + new Date().toLocaleTimeString("en-GB", {
                hour: "2-digit",
                minute: "2-digit"
            }),
            content: comment
        };
        
        setComments([...comments, newComment]);
        setComment("");
        
        // TODO: ส่ง comment ไป backend
        // await axios.post(`/posts/${id}/comments`, { content: comment });
    };

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentFocus = () => {
        if (!isLoggedIn) {
            setShowAlertDialog(true);
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
                <Navbar />
                <div className="max-w-7xl mx-auto px-4 py-8">
                    <div className="flex items-center justify-center min-h-[400px]">
                        <p className="text-body-1 text-brown-500">{error || "Post not found"}</p>
                    </div>
                </div>
                <Footer />
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
                                    {post.category}
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
                            <ReactMarkdown>
                                {post.content}
                            </ReactMarkdown>
                        </div>

                        {/* Share and Comment Section */}
                        <div className="border-t border-brown-300 pt-6 mt-8">
                            

                            {/* Share Buttons */}
                            <div className="flex justify-between items-center gap-4 mb-6 bg-brown-200 rounded-md p-4">
                                {/* Like Button */}
                            <div>
                                <button
                                    onClick={handleLike}
                                    className="flex items-center gap-2 px-4 py-2 bg-white text-brown-600 rounded-full border border-brown-400 hover:bg-brown-300 transition-colors text-body-2"
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
                                <h3 className="text-headline-4 font-semibold text-brown-600 mb-4">Comment</h3>
                                <form onSubmit={handleCommentSubmit} className="space-y-4 mb-8">
                                    <textarea
                                        value={comment}
                                        onChange={handleCommentChange}
                                        onFocus={handleCommentFocus}
                                        placeholder="What are your thoughts?"
                                        className="w-full px-4 py-3 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent resize-none"
                                        rows="4"
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
                                    alt={post.author}
                                />
                                
                                {/* Author Name */}
                                <h3 className="text-headline-4 font-semibold text-brown-600 mb-3">
                                    {post.author}
                                </h3>
                                
                                {/* Author Bio */}
                                <p className="text-body-2 text-brown-500 leading-relaxed">
                                    I am a passionate freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness. When I'm not writing, I spend my time volunteering at my local animal shelter, helping cats find loving homes.
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
                onConfirm={handleAlertConfirm}
            />
            {/* <Toaster /> */}
        </div>
    );
};

export default ViewPostPage;
