import useCreateArticle from "@/hooks/useCreateArticle";
import { Button } from "@/components/ui/button";
import CreateArticleContent from "./CreateArticleContent";
import TabLayout from "./TabLayout";

const CreateArticleRouteElement = () => {
  const createArticleState = useCreateArticle();

  return (
    <TabLayout
      title="Create article"
      headerAction={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 px-6"
            disabled={!createArticleState.canSubmit}
            onClick={() => void createArticleState.handleSubmit("draft")}
          >
            Save as draft
          </Button>
          <Button
            className="h-11 px-6"
            disabled={!createArticleState.canSubmit}
            onClick={() => void createArticleState.handleSubmit("published")}
          >
            Save and publish
          </Button>
        </div>
      }
    >
      <CreateArticleContent
        categories={createArticleState.categories}
        isLoadingCategories={createArticleState.isLoadingCategories}
        title={createArticleState.title}
        description={createArticleState.description}
        content={createArticleState.content}
        selectedCategoryId={createArticleState.selectedCategoryId}
        isSubmitting={createArticleState.isSubmitting}
        onTitleChange={createArticleState.setTitle}
        onDescriptionChange={createArticleState.setDescription}
        onContentChange={createArticleState.setContent}
        onCategoryChange={createArticleState.setSelectedCategoryId}
      />
    </TabLayout>
  );
};

export default CreateArticleRouteElement;
