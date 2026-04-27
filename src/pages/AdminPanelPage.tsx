import { Navigate, Route, Routes } from "react-router-dom";
import AdminPanelShell from "@/components/admin/AdminPanelShell";
import ArticleManagementRouteElement from "@/components/admin/ArticleManagementRouteElement";
import PlaceholderContent from "@/components/admin/PlaceholderContent";
import ResetPasswordTabRouteElement from "@/components/admin/ResetPasswordTabRouteElement";
import TabLayout from "@/components/admin/TabLayout";

const AdminPanelPage = () => {
  return (
    <AdminPanelShell>
      <Routes>
        <Route path="articles" element={<ArticleManagementRouteElement />} />
        
        <Route
          path="categories"
          element={
            <TabLayout title="Category management">
              <PlaceholderContent title="Category management" />
            </TabLayout>
          }
        />
        <Route
          path="profile"
          element={
            <TabLayout title="Profile">
              <PlaceholderContent title="Profile" />
            </TabLayout>
          }
        />
        <Route
          path="notifications"
          element={
            <TabLayout title="Notification">
              <PlaceholderContent title="Notification" />
            </TabLayout>
          }
        />
        <Route path="reset-password" element={<ResetPasswordTabRouteElement />} />
        <Route path="*" element={<Navigate to="articles" replace />} />
      </Routes>
    </AdminPanelShell>
  );
};

export default AdminPanelPage;
