import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
import { Toaster } from "./components/ui/sonner";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/post/:id" element={<ViewPostPage />} />
      </Routes>
      <Toaster position="bottom-right" />
    </Router>
  );
}

export default App;
