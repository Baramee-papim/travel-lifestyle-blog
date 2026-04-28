import type { BlogPost } from "@/types/blog";

type ViewPostHeroProps = {
  post: BlogPost;
};

const ViewPostHero = ({ post }: ViewPostHeroProps) => {
  return (
    <div className="mb-6">
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-[580px] object-cover rounded-lg"
      />
    </div>
  );
};

export default ViewPostHero;
