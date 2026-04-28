import { useState, useEffect, useCallback, useMemo, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { getArticles } from "@/services/articleService";
import { getCategories } from "@/services/categoryService";
import type { BlogPost } from "@/types/blog";
import type { Category } from "@/types/category";
import BlogCard from "./BlogCard";
import BlogCardSkeleton from "./BlogCardSkeleton";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";

const PAGE_SIZE = 6;
const ALL_CATEGORY_VALUE = "all";

const normalizeValue = (value?: string | null): string => String(value ?? "").trim().toLowerCase();

const isPublishedArticle = (article: BlogPost): boolean => {
  const status = normalizeValue(article.status);
  return status === "published" || status === "publish";
};

const matchesSearch = (article: BlogPost, query: string): boolean => {
  const normalizedQuery = normalizeValue(query);
  if (!normalizedQuery) {
    return true;
  }

  const title = normalizeValue(article.title);
  const description = normalizeValue(article.description);
  const content = normalizeValue(article.content);

  return (
    title.includes(normalizedQuery) ||
    description.includes(normalizedQuery) ||
    content.includes(normalizedQuery)
  );
};

const ArticleSection = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const isFetchingRef = useRef(false);

  const fetchPosts = useCallback(
    async (
      pageNum: number,
      { replace, categoryId }: { replace: boolean; categoryId: number | null },
    ): Promise<void> => {
      if (isFetchingRef.current) return;

      try {
        isFetchingRef.current = true;
        setLoading(true);
        setErrorMessage(null);

        const fetchedPosts = await getArticles({
          status: "published",
          page: pageNum,
          limit: PAGE_SIZE,
          ...(categoryId != null ? { category: categoryId } : {}),
        });

        const newPosts = fetchedPosts.filter(isPublishedArticle);

        if (replace) {
          setAllPosts(newPosts);
        } else {
          setAllPosts((prev) => {
            const merged = [...prev, ...newPosts];
            return merged.filter(
              (post, index, currentPosts) =>
                currentPosts.findIndex((currentPost) => currentPost.id === post.id) === index,
            );
          });
        }

        setHasMore(fetchedPosts.length === PAGE_SIZE);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setErrorMessage("Unable to load articles right now. Please try again.");
        setHasMore(false);
      } finally {
        setLoading(false);
        isFetchingRef.current = false;
      }
    },
    [],
  );

  useEffect(() => {
    let cancelled = false;
    void getCategories()
      .then((list) => {
        if (!cancelled) {
          setCategories(list);
        }
      })
      .catch((error) => {
        console.error("Error fetching categories:", error);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    setPage(1);
    setLoading(true);
    setAllPosts([]);
    setHasMore(true);
    isFetchingRef.current = false;
    void fetchPosts(1, { replace: true, categoryId: selectedCategoryId });
  }, [selectedCategoryId, fetchPosts]);

  const handleViewMore = () => {
    if (loading || !hasMore) {
      return;
    }

    const nextPage = page + 1;
    setPage(nextPage);
    void fetchPosts(nextPage, { replace: false, categoryId: selectedCategoryId });
  };

  const filteredPosts = useMemo(
    () => allPosts.filter((post) => matchesSearch(post, searchQuery)),
    [allPosts, searchQuery],
  );

  const handlePostClick = (postId: number) => {
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
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              disabled={selectedCategoryId === null}
              onClick={() => setSelectedCategoryId(null)}
              className={`px-4 py-2 rounded-sm transition-colors ${
                selectedCategoryId === null
                  ? "bg-brown-500 text-white"
                  : " hover:bg-gray-300"
              } `}
            >
              All
            </button>
            {categories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                disabled={selectedCategoryId === cat.id}
                onClick={() => setSelectedCategoryId(cat.id)}
                className={`px-4 py-2 rounded-sm transition-colors ${
                  selectedCategoryId === cat.id
                    ? "bg-brown-500 text-white"
                    : " hover:bg-gray-300"
                } `}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Search Input */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
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
              value={searchQuery}
              onChange={(event) => setSearchQuery(event.target.value)}
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
              value={selectedCategoryId === null ? ALL_CATEGORY_VALUE : String(selectedCategoryId)}
              onValueChange={(value) => {
                if (value === ALL_CATEGORY_VALUE) {
                  setSelectedCategoryId(null);
                  return;
                }
                const id = Number(value);
                if (!Number.isNaN(id)) {
                  setSelectedCategoryId(id);
                }
              }}
            >
              <SelectTrigger className="w-full px-4 py-3 border border-brown-300 text-brown-400 bg-white text-body-1 ">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value={ALL_CATEGORY_VALUE}>All</SelectItem>
                {categories.map((cat) => (
                  <SelectItem key={cat.id} value={String(cat.id)}>
                    {cat.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>
      {errorMessage && (
        <p className="px-4 text-body-2 text-red-600" role="alert">
          {errorMessage}
        </p>
      )}
      <div
        className="grid grid-cols-1 md:grid-cols-2 gap-4 px-4 py-4"
        aria-busy={loading && allPosts.length === 0}
      >
        {loading && allPosts.length === 0 ? (
          Array.from({ length: PAGE_SIZE }, (_, index) => (
            <BlogCardSkeleton key={`article-skeleton-${index}`} />
          ))
        ) : allPosts.length > 0 ? (
          allPosts.map((blog) => (
            <BlogCard
              key={blog.id}
              id={blog.id}
              image={blog.image}
              category={blog.category}
              title={blog.title}
              description={blog.description}
              author={blog.author ?? ""}
              date={new Date(blog.date).toLocaleDateString("en-GB", {
                day: "numeric",
                month: "long",
                year: "numeric",
              })}
            />
          ))
        ) : !errorMessage ? (
          <p
            className="col-span-1 md:col-span-2 py-12 text-center text-body-1 text-brown-500"
            role="status"
          >
            {selectedCategoryId !== null
              ? "No articles for this category."
              : "No articles yet."}
          </p>
        ) : null}
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
