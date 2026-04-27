import { AddRoundIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import useAdminArticles from "@/hooks/useAdminArticles";
import { Link } from "react-router-dom";
import ArticleManagementContent from "./ArticleManagementContent";
import TabLayout from "./TabLayout";

const ArticleManagementRouteElement = () => {
  const articleState = useAdminArticles();

  return (
    <TabLayout
      title="Article management"
      headerAction={
        <Button asChild className="h-11 gap-2 px-6">
          <Link to="/admin/articles/create">
            <img src={AddRoundIcon} alt="Add article" className="h-4 w-4 invert" />
            Create article
          </Link>
        </Button>
      }
    >
      <ArticleManagementContent
        articles={articleState.articles}
        loading={articleState.loading}
        error={articleState.error}
        searchInput={articleState.searchInput}
        pendingDeleteId={articleState.pendingDeleteId}
        isDeleting={articleState.isDeleting}
        onSearchChange={articleState.handleSearchChange}
        onOpenDeleteModal={articleState.handleOpenDeleteModal}
        onCloseDeleteModal={articleState.handleCloseDeleteModal}
        onConfirmDelete={articleState.handleConfirmDelete}
      />
    </TabLayout>
  );
};

export default ArticleManagementRouteElement;
