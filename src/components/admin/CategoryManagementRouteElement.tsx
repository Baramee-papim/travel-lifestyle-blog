import { AddRoundIcon } from "@/components/icon";
import { Button } from "@/components/ui/button";
import useAdminCategories from "@/hooks/useAdminCategories";
import { Link, useNavigate } from "react-router-dom";
import CategoryManagementContent from "./CategoryManagementContent";
import TabLayout from "./TabLayout";

const CategoryManagementRouteElement = () => {
  const categoryState = useAdminCategories();
  const navigate = useNavigate();

  return (
    <TabLayout
      title="Category management"
      headerAction={
        <Button asChild className="h-11 gap-2 px-6">
          <Link to="/admin/category/create">
            <img src={AddRoundIcon} alt="Add category" className="h-4 w-4 invert" />
            Create category
          </Link>
        </Button>
      }
    >
      <CategoryManagementContent
        categories={categoryState.categories}
        loading={categoryState.loading}
        error={categoryState.error}
        searchInput={categoryState.searchInput}
        pendingDeleteId={categoryState.pendingDeleteId}
        isDeleting={categoryState.isDeleting}
        onSearchChange={categoryState.setSearchInput}
        onEditCategory={(categoryId) => navigate(`/admin/category/edit/${categoryId}`)}
        onOpenDeleteModal={categoryState.handleOpenDeleteModal}
        onCloseDeleteModal={categoryState.handleCloseDeleteModal}
        onConfirmDelete={categoryState.handleConfirmDelete}
      />
    </TabLayout>
  );
};

export default CategoryManagementRouteElement;
