import type { BlogPost } from "@/types/blog";

type ViewPostIntroProps = {
  post: BlogPost;
};

const ViewPostIntro = ({ post }: ViewPostIntroProps) => {
  return (
    <div className="mb-8">
      <p className="text-body-1 text-brown-500 leading-relaxed">{post.description}</p>
    </div>
  );
};

export default ViewPostIntro;
