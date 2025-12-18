import React, { lazy, Suspense, useState, } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Workspace from "./Pages/Workspace";
import Home from "./Pages/Home";
const SlideReview = lazy(() => (import("./Pages/SlideReview")))
import ScrollToTop from "./Components/ScrollToTop";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route 
          path="/" 
          element={<Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} 
        />
        <Route path="/workspace" element={<Workspace setIsLoggedIn={setIsLoggedIn} />} />
        <Route path="/slideReview" element={
          <Suspense fallback={<p>Loading...</p>}>
            <SlideReview />
          </Suspense>
        } />
      </Routes>
    </Router>
  );
}

export default App;
