import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import SignupPage from "./pages/SignupPage";
import { Toaster } from "./components/ui/sonner";
import NotFoundPage from "./pages/NotFoundPage";
// import LoginPage from "./pages/LoginPage";
import ComponentsPage from "./pages/ComponentsPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<ViewPostPage />} />
        {/* <Route path="/signup" element={<SignupPage />} />
        <Route path="/login" element={<LoginPage />} /> */}
        <Route path="/components" element={<ComponentsPage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
