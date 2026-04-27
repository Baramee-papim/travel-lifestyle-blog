import { AddRoundIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import useAdminArticles from "@/hooks/useAdminArticles";
import { Link, useNavigate } from "react-router-dom";
import ArticleManagementContent from "./ArticleManagementContent";
import TabLayout from "./TabLayout";

const ArticleManagementRouteElement = () => {
  const articleState = useAdminArticles();
  const navigate = useNavigate();

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
        categories={articleState.categories}
        isLoadingCategories={articleState.isLoadingCategories}
        selectedCategoryId={articleState.selectedCategoryId}
        selectedStatus={articleState.selectedStatus}
        searchInput={articleState.searchInput}
        pendingDeleteId={articleState.pendingDeleteId}
        isDeleting={articleState.isDeleting}
        onSearchChange={articleState.handleSearchChange}
        onCategoryChange={articleState.handleCategoryChange}
        onStatusChange={articleState.handleStatusChange}
        onEditArticle={(articleId) => navigate(`/admin/articles/edit/${articleId}`)}
        onOpenDeleteModal={articleState.handleOpenDeleteModal}
        onCloseDeleteModal={articleState.handleCloseDeleteModal}
        onConfirmDelete={articleState.handleConfirmDelete}
      />
    </TabLayout>
  );
};

export default ArticleManagementRouteElement;
