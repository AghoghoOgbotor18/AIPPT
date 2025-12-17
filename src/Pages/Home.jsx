import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import Auth from "../Components/Auth";
import Footer from "../Components/Footer";
import Testimonials from "../Components/Testimonials";
import FAQ from "../Components/FAQ";
import Hero from "../Components/Hero";
import Features from "../Components/Features";
import Workflow from "../Components/Workflow";
import Projects from "../Components/Projects";
import Cta from "../Components/Cta";

const Home = ({ isLoggedIn, setIsLoggedIn }) => {
  const [isUser, setIsUser] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const navigate = useNavigate();

  // Auto-redirect when user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/workspace");
    }
  }, [isLoggedIn, navigate]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const handleAuthSuccess = () => {
    setIsUser(false);
    setIsLoggedIn(true);
  };

  return (
    <div className="min-h-screen stars">
      <nav>
        <Header setIsUser={setIsUser} />
      </nav>
      <main>
        {/* Hero Section */}
        <Hero isUser={isUser} setIsUser={setIsUser} isVisible={isVisible} />
        
        {/* Features Section */}
        <Features />

        {/* How It Works */}
        <Workflow />

        {/* Projects Section */}
        <Projects setIsUser={setIsUser} />

        {/* Testimonial Section */}
        <Testimonials />

        {/* FAQ Section */}
        <FAQ />

        {/* CTA Section */}
        <Cta setIsUser={setIsUser} />

        {/* AUTH MODAL */}
        {isUser && (
          <div className="fixed inset-0 w-screen min-h-full z-50 flex justify-center items-center bg-black/60 backdrop-blur-sm">
            <div className="bg-white rounded-2xl shadow-2xl relative max-w-md w-full mx-4 animate-fadeIn">
              <Auth
                onSuccess={handleAuthSuccess}
                onClose={() => setIsUser(false)}
              />
            </div>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default Home;