import { BrowserRouter as Router, Navigate, Route, Routes } from "react-router-dom";
import { Toaster } from "./components/ui/sonner";
import { AuthProvider, useAuth } from "./context/AuthContext";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import SignupPage from "./pages/SignupPage";
import LoginPage from "./pages/LoginPage";
import ComponentsPage from "./pages/ComponentsPage";
import AdminPanelPage from "./pages/AdminPanelPage";
import UserProfileRouteElement from "./components/account/UserProfileRouteElement";
import UserResetPasswordRouteElement from "./components/account/UserResetPasswordRouteElement";

function AdminRoute() {
  const { isAuthReady, isAuthenticated, user } = useAuth();

  if (!isAuthReady) {
    return <div className="p-6 text-center text-brown-500">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <AdminPanelPage />;
}

function AccountRoute({
  mode,
}: {
  mode: "profile" | "reset-password";
}) {
  const { isAuthReady, isAuthenticated, user } = useAuth();

  if (!isAuthReady) {
    return <div className="p-6 text-center text-brown-500">Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (user?.role === "admin") {
    return <Navigate to={`/admin/${mode}`} replace />;
  }

  return mode === "profile" ? <UserProfileRouteElement /> : <UserResetPasswordRouteElement />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<ViewPostPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/components" element={<ComponentsPage />} />
          <Route path="/profile" element={<AccountRoute mode="profile" />} />
          <Route path="/reset-password" element={<AccountRoute mode="reset-password" />} />
          <Route path="/admin/*" element={<AdminRoute />} />
        </Routes>
        <Toaster position="bottom-right" />
      </AuthProvider>
    </Router>
  );
}

export default App;
