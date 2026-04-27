import { useRef, type ChangeEvent } from "react";
import { ImageBoxIcon } from "@/components/icon";
import type { Category } from "@/types/category";

type CreateArticleContentProps = {
  categories: Category[];
  isLoadingCategories: boolean;
  title: string;
  description: string;
  content: string;
  thumbnailUrl: string;
  selectedCategoryId: number | null;
  isSubmitting: boolean;
  isUploadingImage: boolean;
  isLoadingInitialData?: boolean;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
  onContentChange: (value: string) => void;
  onCategoryChange: (categoryId: number) => void;
  onUploadThumbnail: (file: File) => Promise<void>;
};

const inputClassName =
  "h-11 w-1/2 rounded-xl border border-brown-300 bg-brown-100 px-3 text-body-2 text-brown-500 outline-none placeholder:text-brown-400";

const CreateArticleContent = ({
  categories,
  isLoadingCategories,
  title,
  description,
  content,
  thumbnailUrl,
  selectedCategoryId,
  isSubmitting,
  isUploadingImage,
  isLoadingInitialData = false,
  onTitleChange,
  onDescriptionChange,
  onContentChange,
  onCategoryChange,
  onUploadThumbnail,
}: CreateArticleContentProps) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleClickUpload = () => {
    if (!isSubmitting && !isUploadingImage) {
      fileInputRef.current?.click();
    }
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    void onUploadThumbnail(file);
    event.target.value = "";
  };

  return (
    <div className="min-h-0 h-full overflow-hidden rounded-2xl border border-brown-300 bg-white">
      <div className="h-full overflow-y-auto p-6">
        <div className="grid gap-6">
          <div className="grid gap-3">
            <p className="text-body-2 text-brown-500">Thumbnail image</p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex h-[130px] w-[180px] items-center justify-center rounded-xl border border-brown-300 bg-brown-100">
                {thumbnailUrl ? (
                  <img src={thumbnailUrl} alt="Article thumbnail preview" className="h-full w-full rounded-xl object-cover" />
                ) : (
                  <img src={ImageBoxIcon} alt="Thumbnail placeholder" className="h-8 w-8 opacity-50" />
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleFileChange}
                disabled={isSubmitting || isUploadingImage || isLoadingInitialData}
              />
              <button
                type="button"
                onClick={handleClickUpload}
                disabled={isSubmitting || isUploadingImage || isLoadingInitialData}
                className="inline-flex h-11 items-center justify-center rounded-full border border-brown-600 px-5 text-body-2 font-semibold text-brown-600 transition-colors hover:border-brown-400 hover:text-brown-400"
              >
                {isLoadingInitialData ? "Loading..." : isUploadingImage ? "Uploading..." : "Upload thumbnail image"}
              </button>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="flex flex-col gap-2">
              <label htmlFor="category" className="text-body-2 text-brown-500">
                Category
              </label>
              <select
                id="category"
                value={selectedCategoryId ?? ""}
                onChange={(event) => onCategoryChange(Number(event.target.value))}
                className={inputClassName}
                disabled={isLoadingCategories || categories.length === 0 || isSubmitting || isLoadingInitialData}
              >
                {categories.length === 0 ? <option value="">No categories</option> : null}
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid gap-2">
              <label htmlFor="title" className="text-body-2 text-brown-500">
                Title
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(event) => onTitleChange(event.target.value)}
                placeholder="Article title"
                className={inputClassName}
                disabled={isSubmitting || isLoadingInitialData}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="description" className="text-body-2 text-brown-500">
                Introduction (max 120 letters)
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(event) => onDescriptionChange(event.target.value.slice(0, 120))}
                placeholder="Introduction"
                className="min-h-[110px] w-full rounded-xl border border-brown-300 bg-brown-100 px-3 py-3 text-body-2 text-brown-500 outline-none placeholder:text-brown-400"
                disabled={isSubmitting || isLoadingInitialData}
              />
            </div>

            <div className="grid gap-2">
              <label htmlFor="content" className="text-body-2 text-brown-500">
                Content
              </label>
              <textarea
                id="content"
                value={content}
                onChange={(event) => onContentChange(event.target.value)}
                placeholder="Content"
                className="min-h-[280px] w-full rounded-xl border border-brown-300 bg-brown-100 px-3 py-3 text-body-2 text-brown-500 outline-none placeholder:text-brown-400"
                disabled={isSubmitting || isLoadingInitialData}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateArticleContent;
