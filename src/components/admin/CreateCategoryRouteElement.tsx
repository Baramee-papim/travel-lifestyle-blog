import { Button } from "@/components/ui/button";
import useCreateCategory from "@/hooks/useCreateCategory";
import { useParams } from "react-router-dom";
import CreateCategoryContent from "./CreateCategoryContent";
import TabLayout from "./TabLayout";

const CreateCategoryRouteElement = () => {
  const { categoryId } = useParams();
  const createCategoryState = useCreateCategory(categoryId);

  return (
    <TabLayout
      title={createCategoryState.isEditMode ? "Edit category" : "Create category"}
      headerAction={
        <Button
          className="h-11 px-8"
          disabled={!createCategoryState.canSubmit || createCategoryState.isLoadingCategory}
          onClick={() => void createCategoryState.handleSubmit()}
        >
          {createCategoryState.isSubmitting ? "Saving..." : "Save"}
        </Button>
      }
    >
      <CreateCategoryContent
        categoryName={createCategoryState.categoryName}
        isSubmitting={createCategoryState.isSubmitting}
        isLoadingCategory={createCategoryState.isLoadingCategory}
        onCategoryNameChange={createCategoryState.setCategoryName}
      />
    </TabLayout>
  );
};

export default CreateCategoryRouteElement;
