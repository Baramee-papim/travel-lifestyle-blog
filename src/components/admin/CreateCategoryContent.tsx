type CreateCategoryContentProps = {
  categoryName: string;
  isSubmitting: boolean;
  isLoadingCategory?: boolean;
  onCategoryNameChange: (value: string) => void;
};

const CreateCategoryContent = ({
  categoryName,
  isSubmitting,
  isLoadingCategory = false,
  onCategoryNameChange,
}: CreateCategoryContentProps) => {
  return (
    <div className="rounded-2xl border border-brown-300 bg-white p-8">
      <div className="flex max-w-[360px] flex-col gap-5">
        <div className="flex flex-col gap-2">
          <label htmlFor="categoryName" className="text-body-2 text-brown-500">
            Category name
          </label>
          <input
            id="categoryName"
            type="text"
            placeholder="Category name"
            value={categoryName}
            onChange={(event) => onCategoryNameChange(event.target.value)}
            className="h-11 rounded-lg border border-brown-300 bg-white px-4 text-body-2 text-brown-600 outline-none placeholder:text-brown-400 focus:border-brown-500"
            disabled={isSubmitting || isLoadingCategory}
          />
        </div>
      </div>
    </div>
  );
};

export default CreateCategoryContent;
