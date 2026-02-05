import { BrowserRouter as Router, Routes, Route, useParams } from "react-router-dom";
import HomePage from "./pages/HomePage";
import ViewPostPage from "./pages/ViewPostPage";
function App() {
  const params = useParams();

  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/post/:id" element={<ViewPostPage params={params} />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
