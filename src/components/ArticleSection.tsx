import { useState, useEffect } from "react";
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
  const [posts, setPosts] = useState<BlogPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get<PostsApiResponse>("https://blog-post-project-api.vercel.app/posts");
        setPosts(response.data.posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const filteredPosts = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return posts.filter((post) => {
      const inCategory = category === "Highlight" ? true : post.category === category;
      const inQuery =
        !normalizedQuery ||
        post.title.toLowerCase().includes(normalizedQuery) ||
        post.description.toLowerCase().includes(normalizedQuery);

      return inCategory && inQuery;
    });
  }, [posts, category, query]);

  return (
    <section className="bg-white py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-headline-3 text-brown-600 px-4 mb-6 ">Latest articles</h2>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4 bg-brown-100 py-4 px-6 rounded-[16px]">
          {/* Category Buttons */}
          <div className="flex items-center gap-2">
            {categories.map((cat) => (
              <button
              disabled={category === cat} // ปิดการคลิกปุ่มที่ถูกเลือก
              onClick={() => setCategory(cat)} // เปลี่ยน State เมื่อคลิก
              className={`px-4 py-2 rounded-sm transition-colors ${
                category === cat ? "bg-brown-500 text-white" : " hover:bg-gray-300" // สีปุ่มเมื่อไม่ได้ถูกเลือก
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
            <label className="block text-body-1 text-brown-400 mb-2">Category</label>
            <Select 
            value={category}
            onValueChange={(value) => setCategory(value)}

            >
              <SelectTrigger className="w-full px-4 py-3 border border-brown-300 text-brown-400 bg-white text-body-1 ">
                <SelectValue 
                placeholder="Select category"
                />
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
      {filteredPosts.map((blog) => (
        <BlogCard 
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
          })} />
      ))}
      </div>
    </section>
  );
};

export default ArticleSection;
