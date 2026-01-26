import { Search } from "lucide-react";
import BlogCard from "./BlogCard";
import { blogPosts } from "../data/blogPosts";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
const ArticleSection = () => {
  const categories = ["Highlight", "Cat", "Inspiration", "General"];
  const selectedCategory = "Select category";

  return (
    <section className="bg-white py-8 md:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <h2 className="text-headline-3 text-brown-600 px-4 mb-6 ">Latest articles</h2>

        {/* Desktop Layout */}
        <div className="hidden md:flex items-center justify-between gap-4 bg-brown-100 py-4 px-6 rounded-[16px]">
          {/* Category Buttons */}
          <div className="flex items-center gap-2">
            {categories.map((category) => (
              <button
                key={category}
                className={`px-4 py-2 rounded-md text-body-1 transition-colors ${
                  selectedCategory === category
                    ? "bg-brown-300 text-brown-600"
                    : " text-brown-400 hover:bg-brown-100 "
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pr-10 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 bg-white focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
          </div>
        </div>

        {/* Mobile Layout */}
        <div className="flex flex-col gap-4 md:hidden bg-brown-200 px-4 py-4">
          {/* Search Bar */}
          <div className="relative bg-white rounded-md">
            <input
              type="text"
              placeholder="Search"
              className="w-full px-4 py-2 pr-10 border border-brown-300 rounded-md text-body-1 text-brown-600 placeholder-brown-400 focus:outline-none focus:ring-2 focus:ring-brown-400 focus:border-transparent"
            />
            <Search className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-brown-400 pointer-events-none" />
          </div>

          {/* Category Dropdown */}
          <div className="md:hidden w-full">
            <label className="block text-body-1 text-brown-400 mb-2">Category</label>
            <Select value="Highlight">
              <SelectTrigger className="w-full px-4 py-3 border border-brown-300 text-brown-400 bg-white text-body-1 ">
                <SelectValue 
                placeholder="Select category" 
                className="text-brown-400"
                />
              </SelectTrigger>
              <SelectContent className="bg-white border-brown-300">
                {categories.map((category) => (
                  <SelectItem key={category} value={category} className="text-brown-600 focus:bg-brown-100">
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4">
      {blogPosts.map((post) => (
        <BlogCard key={post.id} image={post.image} category={post.category} title={post.title} description={post.description} author={post.author} date={post.date} />
      ))}
      </div>
    </section>
  );
};

export default ArticleSection;
