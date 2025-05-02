import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/blog/BlogList';

const BlogSection = () => {
  return (
    <section id="blog" className="relative w-full py-20 md:py-28 overflow-hidden" style={{ background: '#000000' }}>
      <div className="container relative z-10 mx-auto px-5 md:px-10">
        <div className="mb-4 flex justify-center">
          <div className="hero-badge bg-black-200 py-2 px-4 rounded-full">
            <p className="text-sm md:text-base">Latest Articles</p>
          </div>
        </div>
        
        <h1 className="font-semibold md:text-5xl text-3xl text-center text-white-50 mb-8">
          My Blog
        </h1>
        
        <div className="mb-12">
          <p className="text-center text-white-50 text-base md:text-lg max-w-2xl mx-auto">
            I share my journey, coding adventures, and what I've learned along the way. 
            Check out my latest thoughts on programming, game development, and more!
          </p>
        </div>
        
        {/* Display latest 6 blog posts */}
        <BlogList limit={6} />
        
        <div className="mt-12 text-center">
          <Link to="/blog" className="view-all-button inline-flex items-center gap-2 px-5 py-3 bg-accent rounded-lg text-white font-semibold transition-all hover:bg-accent/90 hover:translate-y-[-2px]">
            <span>View All Posts</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogSection; 