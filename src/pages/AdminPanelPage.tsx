import { Navigate, Route, Routes } from "react-router-dom";
import AdminPanelShell from "@/components/admin/AdminPanelShell";
import ArticleManagementRouteElement from "@/components/admin/ArticleManagementRouteElement";
import CategoryManagementRouteElement from "@/components/admin/CategoryManagementRouteElement";
import CreateArticleRouteElement from "@/components/admin/CreateArticleRouteElement";
import CreateCategoryRouteElement from "@/components/admin/CreateCategoryRouteElement";
import PlaceholderContent from "@/components/admin/PlaceholderContent";
import ProfileRouteElement from "@/components/admin/ProfileRouteElement";
import ResetPasswordTabRouteElement from "@/components/admin/ResetPasswordTabRouteElement";
import TabLayout from "@/components/admin/TabLayout";

const AdminPanelPage = () => {
  return (
    <AdminPanelShell>
      <Routes>
        <Route path="articles/create" element={<CreateArticleRouteElement />} />
        <Route
          path="articles/edit/:articleId"
          element={<CreateArticleRouteElement />}
        />
        <Route path="articles" element={<ArticleManagementRouteElement />} />
        <Route
          path="category/create"
          element={<CreateCategoryRouteElement />}
        />
        <Route
          path="category/edit/:categoryId"
          element={<CreateCategoryRouteElement />}
        />
        <Route path="categories" element={<CategoryManagementRouteElement />} />
        <Route path="profile" element={<ProfileRouteElement />} />
        <Route
          path="notifications"
          element={
            <TabLayout title="Notification">
              <PlaceholderContent title="Notification" />
            </TabLayout>
          }
        />
        <Route
          path="reset-password"
          element={<ResetPasswordTabRouteElement />}
        />
        <Route path="*" element={<Navigate to="articles" replace />} />
      </Routes>
    </AdminPanelShell>
  );
};

export default AdminPanelPage;
