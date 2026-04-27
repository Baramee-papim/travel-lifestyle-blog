import { AddRoundIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import useAdminArticles from "@/hooks/useAdminArticles";
import ArticleManagementContent from "./ArticleManagementContent";
import TabLayout from "./TabLayout";

const ArticleManagementRouteElement = () => {
  const articleState = useAdminArticles();

  return (
    <TabLayout
      title="Article management"
      headerAction={
        <Button className="h-11 gap-2 px-6">
          <img src={AddRoundIcon} alt="Add article" className="h-4 w-4 invert" />
          Create article
        </Button>
      }
    >
      <ArticleManagementContent
        articles={articleState.articles}
        loading={articleState.loading}
        error={articleState.error}
        pendingDeleteId={articleState.pendingDeleteId}
        isDeleting={articleState.isDeleting}
        onOpenDeleteModal={articleState.handleOpenDeleteModal}
        onCloseDeleteModal={articleState.handleCloseDeleteModal}
        onConfirmDelete={articleState.handleConfirmDelete}
      />
    </TabLayout>
  );
};

export default ArticleManagementRouteElement;
