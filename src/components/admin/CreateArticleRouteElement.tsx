import useCreateArticle from "@/hooks/useCreateArticle";
import { Button } from "@/components/ui/button";
import CreateArticleContent from "./CreateArticleContent";
import TabLayout from "./TabLayout";
import { useParams } from "react-router-dom";

const CreateArticleRouteElement = () => {
  const { articleId } = useParams();
  const createArticleState = useCreateArticle(articleId);

  return (
    <TabLayout
      title={createArticleState.isEditMode ? "Edit article" : "Create article"}
      headerAction={
        <div className="flex items-center gap-3">
          <Button
            variant="outline"
            className="h-11 px-6"
            disabled={!createArticleState.canSubmit || createArticleState.isLoadingArticle}
            onClick={() => void createArticleState.handleSubmit("draft")}
          >
            Save as draft
          </Button>
          <Button
            className="h-11 px-6"
            disabled={!createArticleState.canSubmit || createArticleState.isLoadingArticle}
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
        thumbnailUrl={createArticleState.thumbnailUrl}
        selectedCategoryId={createArticleState.selectedCategoryId}
        isSubmitting={createArticleState.isSubmitting}
        isUploadingImage={createArticleState.isUploadingImage}
        isLoadingInitialData={createArticleState.isLoadingArticle}
        onTitleChange={createArticleState.setTitle}
        onDescriptionChange={createArticleState.setDescription}
        onContentChange={createArticleState.setContent}
        onCategoryChange={createArticleState.setSelectedCategoryId}
        onUploadThumbnail={createArticleState.handleUploadThumbnail}
      />
    </TabLayout>
  );
};

export default CreateArticleRouteElement;
