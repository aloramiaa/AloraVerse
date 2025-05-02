import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';
import TagFilter from '../components/blog/TagFilter';
import blogService from '../services/BlogService';
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import SEO from '../components/SEO';

const BlogPage = () => {
  const { tag, page } = useParams();
  const [tags, setTags] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredPosts, setFilteredPosts] = useState([]);

  useGSAP(() => {
    gsap.fromTo(
      ".blog-hero-content h1",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" }
    );
    gsap.fromTo(
      ".blog-hero-content p",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, delay: 0.3, ease: "power2.inOut" }
    );
  });

  useEffect(() => {
    const fetchTags = async () => {
      try {
        const allTags = await blogService.getAllTags();
        setTags(allTags);
      } catch (error) {
        console.error('Error fetching tags:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTags();
  }, []);

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };
  
  // SEO Title and description based on tag or page params
  const getSeoTitle = () => {
    if (tag) return `Blog - ${tag} Articles`;
    if (page) return `Blog - Page ${page}`;
    return 'Blog';
  };
  
  const getSeoDescription = () => {
    if (tag) {
      return `Browse articles about ${tag} - Alora Mia's development blog featuring tutorials, insights, and experiences in web development and game design.`;
    }
    return "Alora Mia's development blog featuring tutorials, insights, and experiences in web development, game design, and creative coding.";
  };

  return (
    <section id="blog" className="relative overflow-hidden min-h-screen">
      <SEO 
        title={getSeoTitle()}
        description={getSeoDescription()}
        canonicalUrl={tag ? `/blog/tag/${tag}` : page ? `/blog/page/${page}` : '/blog'}
        keywords={`blog, programming, web development, game design, ${tag || ''}`}
      />
      
      <div className="absolute top-0 left-0 z-10">
        <img src="/images/bg.png" alt="" />
      </div>

      {/* Add vector effects like main page */}
      <div className="gradient-edge"></div>
      <div className="gradient-edge"></div>
      
      <div className="hero-layout md:h-[60vh] h-[50vh]">
        {/* Hero Content section similar to main page Hero */}
        <div className="blog-hero-content container mx-auto px-5 md:px-20 text-center">
          <div className="hero-badge mb-5">Welcome to my blog</div>
          <h1 className="md:text-[60px] text-[40px] font-semibold text-white-50">Alora's Coding Journey</h1>
          <p className="text-white-50 md:text-xl mt-5 max-w-xl mx-auto">
            Thoughts, tutorials, and adventures in programming and game development
          </p>
        </div>
      </div>

      <div className="container mx-auto px-5 md:px-20 py-12 relative z-10">
        <div className="blog-layout lg:gap-8 gap-6">
          <aside className="blog-sidebar lg:max-w-[300px] w-full">
            <div className="blog-sidebar-sticky bg-black-50 p-6 rounded-xl">
              <div className="search-container mb-6 relative">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="blog-search w-full bg-black-100 text-white-50 p-3 pl-4 pr-10 rounded-lg"
                  value={searchQuery}
                  onChange={handleSearch}
                />
                {searchQuery && (
                  <button
                    onClick={clearSearch}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-blue-50 hover:text-white-50"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                      <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                      <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
                    </svg>
                  </button>
                )}
              </div>
              
              <h3 className="sidebar-title text-white-50 text-xl font-semibold mb-3">Categories</h3>
              {loading ? (
                <div className="tag-loading">Loading tags...</div>
              ) : (
                <TagFilter tags={tags} activeTag={tag} />
              )}
              
              <div className="sidebar-about mt-8">
                <h3 className="sidebar-title text-white-50 text-xl font-semibold mb-3">About Me</h3>
                <div className="sidebar-profile">
                  <img src="/images/alora.jpg" alt="Alora Mia" className="profile-image w-20 h-20 rounded-full mb-3" />
                  <p className="text-white-50 text-sm">
                    Hi! I'm Alora, a 17-year-old developer passionate about web development, 
                    game design, and creative coding. This blog documents my journey and 
                    the things I learn along the way.
                  </p>
                </div>
              </div>
            </div>
          </aside>
          
          <main className="blog-main flex-1">
            <BlogList searchQuery={searchQuery} />
          </main>
        </div>
      </div>
    </section>
  );
};

export default BlogPage; 