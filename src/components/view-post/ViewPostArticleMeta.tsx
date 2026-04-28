import type { BlogPost } from "@/types/blog";

type ViewPostArticleMetaProps = {
  post: BlogPost;
};

const ViewPostArticleMeta = ({ post }: ViewPostArticleMetaProps) => {
  return (
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
      <h1 className="text-headline-2 font-bold text-brown-600 mb-6">{post.title}</h1>
    </div>
  );
};

export default ViewPostArticleMeta;
