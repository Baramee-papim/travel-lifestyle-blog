function BlogCardSkeleton() {
  return (
    <div className="flex flex-col gap-4" aria-hidden>
      <div className="h-[212px] sm:h-[360px] animate-pulse rounded-md bg-brown-100" />
      <div className="flex flex-col">
        <div className="flex">
          <span className="mb-2 h-7 w-24 animate-pulse rounded-full bg-brown-200" />
        </div>
        <div className="mb-2 space-y-2">
          <div className="h-6 w-[92%] animate-pulse rounded bg-brown-200" />
          <div className="h-6 w-[70%] animate-pulse rounded bg-brown-200" />
        </div>
        <div className="mb-4 space-y-2">
          <div className="h-4 w-full animate-pulse rounded bg-brown-100" />
          <div className="h-4 w-full animate-pulse rounded bg-brown-100" />
          <div className="h-4 w-[85%] animate-pulse rounded bg-brown-100" />
        </div>
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 shrink-0 animate-pulse rounded-full bg-brown-200" />
          <div className="h-4 flex-1 max-w-[200px] animate-pulse rounded bg-brown-100" />
        </div>
      </div>
    </div>
  );
}

export default BlogCardSkeleton;
