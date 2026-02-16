import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Facebook, Linkedin, Twitter, Copy, Send, RefreshCw } from "lucide-react";
import axios from "axios";
import AlertDialog from "../components/ui/alert-dialog";

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
    const [likes, setLikes] = useState(321); // จำนวนไลก์เริ่มต้น

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

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
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
        // Handle comment submission here
        console.log("Comment:", comment);
        setComment("");
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

    // Parse content sections (assuming content is markdown-like format)
    const contentSections = post?.content ? post.content.split('\n\n').filter(section => section.trim()) : [];

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
                <div className="flex flex-col lg:flex-row gap-8">
                    {/* Main Article Content */}
                    <div className="flex-1">
                        {/* Hero Image */}
                        <div className="mb-6">
                            <img 
                                src={post.image} 
                                alt={post.title}
                                className="w-full h-[400px] object-cover rounded-lg"
                            />
                        </div>

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
                        <div className="mb-8 space-y-6">
                            {contentSections.map((section, index) => {
                                // Check if section is a heading (starts with ##)
                                if (section.startsWith('##')) {
                                    const headingText = section.replace('##', '').trim();
                                    return (
                                        <div key={index}>
                                            <h2 className="text-headline-4 font-semibold text-brown-600 mb-3">
                                                {headingText}
                                            </h2>
                                        </div>
                                    );
                                } else {
                                    // Regular paragraph
                                    const lines = section.split('\n').filter(line => line.trim());
                                    return (
                                        <div key={index} className="space-y-3">
                                            {lines.map((line, lineIndex) => {
                                                // Check if line is a bullet point
                                                if (line.trim().startsWith('*')) {
                                                    const bulletText = line.replace('*', '').trim();
                                                    return (
                                                        <div key={lineIndex} className="flex items-start gap-2 ml-4">
                                                            <span className="text-brown-600 mt-2">•</span>
                                                            <p className="text-body-1 text-brown-500">{bulletText}</p>
                                                        </div>
                                                    );
                                                } else {
                                                    return (
                                                        <p key={lineIndex} className="text-body-1 text-brown-500 leading-relaxed">
                                                            {line.trim()}
                                                        </p>
                                                    );
                                                }
                                            })}
                                        </div>
                                    );
                                }
                            })}
                        </div>

                        {/* Share and Comment Section */}
                        <div className="border-t border-brown-300 pt-6 mt-8">
                            {/* Like Button */}
                            <div className="mb-6">
                                <button
                                    onClick={handleLike}
                                    className="flex items-center gap-2 px-4 py-2 bg-brown-100 text-brown-600 rounded-md hover:bg-brown-200 transition-colors text-body-2"
                                >
                                    <RefreshCw className="w-4 h-4" />
                                    {likes}
                                </button>
                            </div>

                            {/* Share Buttons */}
                            <div className="flex items-center gap-4 mb-6">
                                <button className="px-4 py-2 bg-brown-100 text-brown-600 rounded-md hover:bg-brown-200 transition-colors text-body-2">
                                    All
                                </button>
                                <button 
                                    onClick={handleCopyLink}
                                    className="flex items-center gap-2 px-4 py-2 bg-brown-100 text-brown-600 rounded-md hover:bg-brown-200 transition-colors text-body-2"
                                >
                                    <Copy className="w-4 h-4" />
                                    Copy link
                                </button>
                                <div className="flex items-center gap-2">
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
                                <form onSubmit={handleCommentSubmit} className="space-y-4">
                                    <textarea
                                        value={comment}
                                        onChange={handleCommentChange}
                                        onFocus={handleCommentFocus}
                                        placeholder="What are your thoughts?"
                                        className="w-full px-4 py-3 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent resize-none"
                                        rows="4"
                                    />
                                    <button
                                        type="submit"
                                        className="flex items-center gap-2 px-6 py-2 bg-brown-600 text-white rounded-md hover:bg-brown-500 transition-colors"
                                    >
                                        <Send className="w-4 h-4" />
                                        Send
                                    </button>
                                </form>
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
        </div>
    );
};

export default ViewPostPage;
