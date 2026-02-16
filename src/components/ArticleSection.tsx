import { useState, useEffect, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import axios from "axios";
import type { BlogPost, PostsApiResponse } from "../types/blog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const ArticleSection = () => {
  const navigate = useNavigate();
  const [category, setCategory] = useState("Highlight");
  const [query, setQuery] = useState("");
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const [allPosts, setAllPosts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(6);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const isFetchingRef = useRef(false);

  const fetchPosts = useCallback(
    async (selectedCategory, pageNum = 1, limitNum = 6) => {
      // Prevent duplicate requests
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;
        setLoading(true);
        let url = "https://blog-post-project-api.vercel.app/posts";
        const params = new URLSearchParams();

        if (selectedCategory) {
          params.append("category", selectedCategory);
        }
        params.append("page", pageNum.toString());
        params.append("limit", limitNum.toString());

        url += `?${params.toString()}`;

        const response = await axios.get(url);
        const newPosts = response.data.posts || [];

        if (pageNum === 1) {
          // First page - replace all posts
          setAllPosts(newPosts);
        } else {
          // Subsequent pages - append to existing posts
          setAllPosts((prev) => [...prev, ...newPosts]);
        }

        // Check if there are more posts
        setHasMore(newPosts.length === limitNum);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasMore(false);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [],
  );

  useEffect(() => {
    // Reset page to 1 when category changes
    setPage(1);
    setAllPosts([]);
    setHasMore(true);
    isFetchingRef.current = false; // Reset fetching flag
    fetchPosts(category, 1, 6);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  const handleViewMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchPosts(category, nextPage, limit);
  };

  // Filter posts based on search query (search in title, description, and content)
  const filteredPosts = searchQuery.trim()
    ? allPosts.filter((post) => {
        const query = searchQuery.toLowerCase();
        const title = (post.title || "").toLowerCase();
        const description = (post.description || "").toLowerCase();
        const content = (post.content || "").toLowerCase();
        return (
          title.includes(query) ||
          description.includes(query) ||
          content.includes(query)
        );
      })
    : [];

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
    setSearchQuery(""); // Clear search after navigation
  };
  return (
    <section className="bg-white py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-headline-3 text-brown-600 px-4 mb-6 ">
          Latest articles
        </h2>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4 bg-brown-100 py-4 px-6 rounded-[16px]">
          {/* Category Buttons */}
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                disabled={category === cat} // ปิดการคลิกปุ่มที่ถูกเลือก
                onClick={() => setCategory(cat)} // เปลี่ยน State เมื่อคลิก
                className={`px-4 py-2 rounded-sm transition-colors ${
                  category === cat
                    ? "bg-brown-500 text-white"
                    : " hover:bg-gray-300" // สีปุ่มเมื่อไม่ได้ถูกเลือก
                } `}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full px-4 py-2 pr-10 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />

            {/* Search Results Dropdown */}
            {searchQuery.trim() && filteredPosts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brown-300 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="w-full text-left px-4 py-3 hover:bg-brown-100 transition-colors border-b border-brown-200 last:border-b-0"
                  >
                    <p className="text-body-1 text-brown-600 font-medium">
                      {post.title}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 md:hidden bg-brown-200 px-4 py-4">
          {/* Search Bar */}
          <div className="relative bg-white rounded-md">
            <input
              type="text"
              placeholder="Search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              className="w-full px-4 py-2 pr-10 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />

            {/* Search Results Dropdown */}
            {searchQuery.trim() && filteredPosts.length > 0 && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-brown-300 rounded-md shadow-lg z-50 max-h-96 overflow-y-auto">
                {filteredPosts.map((post) => (
                  <button
                    key={post.id}
                    onClick={() => handlePostClick(post.id)}
                    className="w-full text-left px-4 py-3 hover:bg-brown-100 transition-colors border-b border-brown-200 last:border-b-0"
                  >
                    <p className="text-body-1 text-brown-600 font-medium">
                      {post.title}
                    </p>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="md:hidden w-full">
            <label className="block text-body-1 text-brown-400 mb-2">
              Category
            </label>
            <Select
              value={category || undefined}
              onValueChange={(value) => setCategory(value)}
            >
              <SelectTrigger className="w-full px-4 py-3 border border-brown-300 text-brown-400 bg-white text-body-1 ">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat} value={cat}>
                    {cat}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4">
        {allPosts.map((blog) => (
          <BlogCard
            key={blog.id}
            key={blog.id}
            id={blog.id}
            image={blog.image}
            category={blog.category}
            title={blog.title}
            description={blog.description}
            author={blog.author}
            date={new Date(blog.date).toLocaleDateString("en-GB", {
              day: "numeric",
              month: "long",
              year: "numeric",
            })}
          />
        ))}
      </div>

      {/* View More Button */}
      {hasMore && !searchQuery.trim() && allPosts.length > 0 && (
        <div className="flex justify-center mt-8 px-4">
          <button
            onClick={handleViewMore}
            disabled={loading}
            className="px-6 py-3 border-2 border-black bg-white text-black rounded-md hover:bg-black-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed text-body-1 font-medium"
          >
            {loading ? "Loading..." : "View more"}
          </button>
        </div>
      )}
    </section>
  );
};

export default ArticleSection;
