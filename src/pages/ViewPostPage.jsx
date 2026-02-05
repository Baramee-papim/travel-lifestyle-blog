import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Facebook, Linkedin, Twitter, Copy, Send } from "lucide-react";

const ViewPostPage = () => {
    const [comment, setComment] = useState("");

    // Hardcoded post data
    const post = {
        id: 1,
        image: "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449771/my-blog-post/gsutzgam24abrvgee9r4.jpg",
        category: "Pets",
        title: "The Fascinating World of Cats: Why We Love Our Furry Friends",
        description: "Cats have captivated human hearts for thousands of years. Whether lounging in a sunny spot or playfully chasing a string, these furry companions bring warmth and joy to millions of homes. But what makes cats so special? Let's delve into the unique traits, behaviors, and quirks that make cats endlessly fascinating.",
        author: "Thompson P.",
        date: "8 September 2024",
        content: `## 1. Independent yet Affectionate

Cats are known for their unique balance between independence and affection. They can entertain themselves for hours, yet they also seek out human companionship when they want it. This makes them perfect pets for people who appreciate a companion that respects personal space while still offering love and warmth.

* Cats can be left alone for longer periods than dogs
* They show affection on their own terms
* Their independent nature makes them low-maintenance pets

## 2. Playful Personalities

Cats are naturally curious and playful creatures. From chasing a laser pointer to pouncing on a toy mouse, their playful antics can provide endless entertainment. This playful nature isn't just for fun—it's also how they stay mentally and physically stimulated.

### Communication Through Body Language

Cats communicate in subtle ways, and learning to read their body language can deepen your bond with your feline friend.

* Purring: Usually a sign of contentment, though cats may also purr when anxious or in pain.
* Tail Position: A tail held high usually indicates a happy and confident cat, while a puffed-up tail suggests fear or aggression.
* Slow Blinks: Often a slow blink indicates trust and affection. If your cat slow blinks at you, try returning the gesture to strengthen your bond.

## 3. Health Benefits of Having a Cat

Owning a cat can be good for your health. Studies have shown that petting a cat can reduce stress and blood pressure. The calming sound of a cat's purr can even help with healing. The companionship of a cat can combat loneliness and provide emotional support, making cat owners less likely to experience feelings of anxiety and depression.

## 4. History with Humans

Cats were first domesticated around 9,500 years ago, originally valued for their ability to control pests. In ancient Egypt, cats were revered and even worshipped. Killing a cat was punishable by death, and families often mummified their cats to honor them after death. Today, cats remain cherished members of the family, bringing joy and companionship to millions of homes worldwide.`
    };

    const handleCopyLink = () => {
        navigator.clipboard.writeText(window.location.href);
        alert("Link copied to clipboard!");
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        // Handle comment submission here
        console.log("Comment:", comment);
        setComment("");
    };

    // Parse content sections (assuming content is markdown-like format)
    const contentSections = post.content ? post.content.split('\n\n').filter(section => section.trim()) : [];

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
                                    {post.date}
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
                                    <button className="p-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
                                        <Facebook className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-blue-700 text-white rounded-md hover:bg-blue-800 transition-colors">
                                        <Linkedin className="w-4 h-4" />
                                    </button>
                                    <button className="p-2 bg-blue-400 text-white rounded-md hover:bg-blue-500 transition-colors">
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
                                        onChange={(e) => setComment(e.target.value)}
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
        </div>
    );
};

export default ViewPostPage;
