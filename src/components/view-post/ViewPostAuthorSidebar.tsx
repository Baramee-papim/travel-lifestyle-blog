import type { BlogPost } from "@/types/blog";

const AUTHOR_AVATAR_FALLBACK =
  "https://res.cloudinary.com/dcbpjtd1r/image/upload/v1728449784/my-blog-post/xgfy0xnvyemkklcqodkg.jpg";

const DEFAULT_AUTHOR_BIO =
  "I am a passionate freelance writer who specializes in animal behavior and care. With a deep love for cats, I enjoy sharing insights on feline companionship and wellness. When I'm not writing, I spend my time volunteering at my local animal shelter, helping cats find loving homes.";

type ViewPostAuthorSidebarProps = {
  post: BlogPost;
};

const ViewPostAuthorSidebar = ({ post }: ViewPostAuthorSidebarProps) => {
  const authorLabel = post.author ?? "Author";

  return (
    <div className="lg:w-80 shrink-0">
      <div className="bg-brown-100 rounded-lg p-6 sticky top-4">
        <div className="flex flex-col items-center text-center">
          <img
            className="w-20 h-20 rounded-full mb-4 object-cover"
            src={AUTHOR_AVATAR_FALLBACK}
            alt={authorLabel}
          />
          <h3 className="text-headline-4 font-semibold text-brown-600 mb-3">{authorLabel}</h3>
          <p className="text-body-2 text-brown-500 leading-relaxed">{DEFAULT_AUTHOR_BIO}</p>
        </div>
      </div>
    </div>
  );
};

export default ViewPostAuthorSidebar;
