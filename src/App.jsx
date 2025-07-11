import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState, useEffect } from "react";
import Testimonials from "./sections/Testimonials";
import Footer from "./sections/Footer";
import Contact from "./sections/Contact";
import TechStack from "./sections/TechStack";
import Experience from "./sections/Experience";
import Hero from "./sections/Hero";
import ShowcaseSection from "./sections/ShowcaseSection";
import LogoShowcase from "./sections/LogoShowcase";
import FeatureCards from "./sections/FeatureCards";
import BlogSection from "./sections/BlogSection";
import Navbar from "./components/NavBar";
import BlogPage from "./pages/BlogPage";
import BlogDetailPage from "./pages/BlogDetailPage";
import TagPage from "./pages/TagPage";
import TermsPage from "./pages/TermsPage";
import DrivePage from "./pages/DrivePage";
import StatusPage from "./pages/StatusPage";
import VisualEffects from "./components/VisualEffects";
import SEO from "./components/SEO";

// Main homepage component
const HomePage = () => (
  <>
    <SEO 
      title="Home"
      canonicalUrl="/"
      description="Alora Mia - Full Stack Developer specializing in modern web applications, 3D graphics, and interactive experiences."
    />
    <Hero />
    <ShowcaseSection />
    <LogoShowcase />
    <FeatureCards />
    <Experience />
    <TechStack />
    <BlogSection />
    <Testimonials />
    <Contact />
  </>
);

const App = () => {
  return (
    <Router>
      {/* Default SEO for the entire app, will be overridden by specific pages */}
      <SEO />
      {/* Add visual effects to the entire app */}
      <VisualEffects />
      <div className="page-transition opacity-100 transition-opacity duration-500">
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/tag/:tag" element={<TagPage />} />
          <Route path="/blog/page/:page" element={<BlogPage />} />
          <Route path="/blog/post/:slug" element={<BlogDetailPage />} />
          <Route path="/terms" element={<TermsPage />} />
          <Route path="/drive" element={<DrivePage />} />
          <Route path="/status" element={<StatusPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
