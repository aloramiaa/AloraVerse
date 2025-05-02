import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogService from '../../services/BlogService';

const BlogDetail = () => {
  const { slug } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const fetchedPost = await blogService.getPostBySlug(slug);
        
        if (!fetchedPost) {
          setError('Blog post not found');
          return;
        }
        
        setPost(fetchedPost);
        
        // Fetch related posts (posts with similar tags)
        if (fetchedPost.frontMatter.tags && fetchedPost.frontMatter.tags.length > 0) {
          const allPosts = await blogService.getAllPosts();
          
          // Filter posts with at least one matching tag, excluding the current post
          const related = allPosts
            .filter(p => 
              p.slug !== slug && 
              p.frontMatter.tags && 
              p.frontMatter.tags.some(tag => 
                fetchedPost.frontMatter.tags.includes(tag)
              )
            )
            .slice(0, 3); // Limit to 3 related posts
          
          setRelatedPosts(related);
        }
      } catch (err) {
        console.error('Error fetching blog post:', err);
        setError('Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPost();
  }, [slug, navigate]);

  // Render loading state
  if (loading) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="blog-error">
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <Link to="/blog" className="back-to-blog">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Render empty state (should never happen, but just in case)
  if (!post) {
    return (
      <div className="blog-empty">
        <h3>Post not found</h3>
        <p>The blog post you're looking for doesn't exist.</p>
        <Link to="/blog" className="back-to-blog">
          Back to Blog
        </Link>
      </div>
    );
  }

  // Destructure post data
  const { frontMatter, content } = post;
  const { 
    title, 
    formattedDate, 
    coverImage, 
    tags, 
    author 
  } = frontMatter;

  return (
    <div className="blog-detail">
      <div className="blog-detail-header">
        <Link to="/blog" className="back-to-blog">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
            <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
          </svg>
          Back to Blog
        </Link>
        
        <h1 className="blog-detail-title">{title}</h1>
        
        <div className="blog-detail-meta">
          <span className="blog-detail-date">{formattedDate}</span>
          <span className="blog-detail-author">by {author}</span>
        </div>
        
        <div className="blog-detail-tags">
          {tags && tags.map((tag, index) => (
            <Link key={index} to={`/blog/tag/${tag.toLowerCase()}`} className="blog-tag">
              {tag}
            </Link>
          ))}
        </div>
      </div>
      
      {coverImage && (
        <div className="blog-detail-cover">
          <img 
            src={coverImage} 
            alt={title}
            className="blog-detail-image"
          />
        </div>
      )}
      
      <div className="blog-detail-content">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>
          {content}
        </ReactMarkdown>
      </div>
      
      {relatedPosts.length > 0 && (
        <div className="blog-related">
          <h3 className="blog-related-title">Related Posts</h3>
          <div className="blog-related-grid">
            {relatedPosts.map((relatedPost) => (
              <div key={relatedPost.slug} className="blog-related-card">
                <Link to={`/blog/${relatedPost.slug}`}>
                  <img 
                    src={relatedPost.frontMatter.coverImage || '/images/blog/default.jpg'} 
                    alt={relatedPost.frontMatter.title}
                    className="blog-related-image"
                  />
                  <h4 className="blog-related-card-title">{relatedPost.frontMatter.title}</h4>
                </Link>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default BlogDetail; 