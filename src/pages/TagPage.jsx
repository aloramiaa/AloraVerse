import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import BlogCard from '../components/blog/BlogCard';
import TagFilter from '../components/blog/TagFilter';
import blogService from '../services/BlogService';

const TagPage = () => {
  const { tag } = useParams();
  const [tags, setTags] = useState([]);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        // Fetch all tags
        const allTags = await blogService.getAllTags();
        setTags(allTags);
        
        // Fetch posts by tag
        const taggedPosts = await blogService.getPostsByTag(tag);
        setPosts(taggedPosts);
      } catch (err) {
        console.error('Error fetching tagged posts:', err);
        setError('Failed to load posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, [tag]);

  // Handle loading state
  if (loading) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading posts...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="blog-error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => window.location.reload()}>Try Again</button>
      </div>
    );
  }

  return (
    <div className="blog-page">
      <div className="blog-hero">
        <div className="blog-hero-content container mx-auto px-4 py-24 text-center">
          <h1 className="blog-title">Posts Tagged: {tag}</h1>
          <p className="blog-subtitle">
            Explore articles related to {tag.toLowerCase()}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="blog-layout">
          <aside className="blog-sidebar">
            <div className="blog-sidebar-sticky">
              <div className="search-container mb-8">
                <input
                  type="text"
                  placeholder="Search articles..."
                  className="blog-search"
                />
              </div>
              
              <h3 className="sidebar-title">Categories</h3>
              <TagFilter tags={tags} activeTag={tag} />
              
              <div className="sidebar-about">
                <h3 className="sidebar-title">About Me</h3>
                <div className="sidebar-profile">
                  <img src="/images/alora.jpg" alt="Alora Mia" className="profile-image" />
                  <p>
                    Hi! I'm Alora, a 17-year-old developer passionate about web development, 
                    game design, and creative coding. This blog documents my journey and 
                    the things I learn along the way.
                  </p>
                </div>
              </div>
            </div>
          </aside>
          
          <main className="blog-main">
            {posts.length === 0 ? (
              <div className="blog-empty">
                <h3>No posts found</h3>
                <p>There are no blog posts with the tag "{tag}" at the moment.</p>
                <Link to="/blog" className="back-to-all">View all posts</Link>
              </div>
            ) : (
              <div className="blog-tag-results">
                <h2 className="tag-results-title">
                  <span className="tag-results-count">{posts.length}</span> 
                  {posts.length === 1 ? ' article' : ' articles'} found
                </h2>
                
                <div className="blog-grid">
                  {posts.map((post) => (
                    <BlogCard key={post.slug} post={post} />
                  ))}
                </div>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default TagPage; 