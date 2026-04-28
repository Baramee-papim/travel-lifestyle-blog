import ReactMarkdown from "react-markdown";
import type { BlogPost } from "@/types/blog";

type ViewPostMarkdownBodyProps = {
  post: BlogPost;
};

const ViewPostMarkdownBody = ({ post }: ViewPostMarkdownBodyProps) => {
  return (
    <div className="markdown">
      <ReactMarkdown>{post.content ?? ""}</ReactMarkdown>
    </div>
  );
};

export default ViewPostMarkdownBody;
