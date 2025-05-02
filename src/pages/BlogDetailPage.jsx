import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import blogService from '../services/BlogService';
import SEO from '../components/SEO';

const BlogDetailPage = () => {
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
        const postData = await blogService.getPostBySlug(slug);
        
        if (!postData) {
          setError('Blog post not found');
          return;
        }
        
        setPost(postData);
        
        // Fetch related posts (posts with the same tags)
        if (postData.frontMatter.tags && postData.frontMatter.tags.length > 0) {
          const allPosts = await blogService.getAllPosts();
          const related = allPosts
            .filter(p => 
              p.slug !== slug && // Don't include current post
              p.frontMatter.tags && 
              p.frontMatter.tags.some(tag => 
                postData.frontMatter.tags.includes(tag)
              )
            )
            .slice(0, 3); // Get up to 3 related posts
          
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
  }, [slug]);

  // Handle loading state
  if (loading) {
    return (
      <div className="blog-loading">
        <div className="spinner"></div>
        <p>Loading blog post...</p>
      </div>
    );
  }

  // Handle error state
  if (error) {
    return (
      <div className="blog-error">
        <SEO 
          title="Blog Post Not Found"
          description="The requested blog post could not be found."
          canonicalUrl={`/blog/post/${slug}`}
        />
        <h3>Something went wrong</h3>
        <p>{error}</p>
        <button onClick={() => navigate('/blog')}>Back to Blog</button>
      </div>
    );
  }

  // If post is loaded successfully
  const { frontMatter, content } = post;
  const { title, author, formattedDate, coverImage, tags, readTime, excerpt } = frontMatter;
  
  // Create a description from the excerpt or first part of content
  const description = excerpt || content.slice(0, 160).replace(/[#*_]/g, '').trim() + '...';
  
  // Create a string of keywords from tags
  const keywordsString = tags ? tags.join(', ').toLowerCase() : '';

  return (
    <div className="blog-detail-page">
      <SEO
        title={title}
        description={description}
        canonicalUrl={`/blog/post/${slug}`}
        ogType="article"
        ogImage={coverImage || '/images/blog/default.jpg'}
        keywords={`blog, ${keywordsString}`}
      />
      
      <div className="blog-detail-hero" style={{ backgroundImage: `url(${coverImage || '/images/blog/default.jpg'})` }}>
        <div className="blog-detail-hero-overlay">
          <div className="container mx-auto px-4 py-24">
            <Link to="/blog" className="back-to-blog">
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"/>
              </svg>
              Back to Blog
            </Link>
            
            <h1 className="blog-detail-title">{title}</h1>
            
            <div className="blog-detail-meta">
              <div className="blog-detail-author">
                <img src="/images/alora.jpg" alt={author} className="author-image" />
                <span>{author}</span>
              </div>
              <div className="blog-meta-divider"></div>
              <div className="blog-detail-date">{formattedDate}</div>
              {readTime && (
                <>
                  <div className="blog-meta-divider"></div>
                  <div className="blog-detail-read-time">{readTime} min read</div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 py-12">
        <div className="blog-detail-layout">
          <main className="blog-detail-content">
            <div className="blog-tags">
              {tags && tags.map((tag, index) => (
                <Link key={index} to={`/blog/tag/${tag.toLowerCase()}`} className="blog-tag">
                  {tag}
                </Link>
              ))}
            </div>
            
            <article className="blog-markdown">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                {content}
              </ReactMarkdown>
            </article>
            
            <div className="blog-share">
              <h3>Share this article</h3>
              <div className="share-buttons">
                <a href={`https://twitter.com/intent/tweet?text=${title}&url=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-button twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M5.026 15c6.038 0 9.341-5.003 9.341-9.334 0-.14 0-.282-.006-.422A6.685 6.685 0 0 0 16 3.542a6.658 6.658 0 0 1-1.889.518 3.301 3.301 0 0 0 1.447-1.817 6.533 6.533 0 0 1-2.087.793A3.286 3.286 0 0 0 7.875 6.03a9.325 9.325 0 0 1-6.767-3.429 3.289 3.289 0 0 0 1.018 4.382A3.323 3.323 0 0 1 .64 6.575v.045a3.288 3.288 0 0 0 2.632 3.218 3.203 3.203 0 0 1-.865.115 3.23 3.23 0 0 1-.614-.057 3.283 3.283 0 0 0 3.067 2.277A6.588 6.588 0 0 1 .78 13.58a6.32 6.32 0 0 1-.78-.045A9.344 9.344 0 0 0 5.026 15z"/>
                  </svg>
                </a>
                <a href={`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`} target="_blank" rel="noopener noreferrer" className="share-button facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                  </svg>
                </a>
                <a href={`https://www.linkedin.com/shareArticle?mini=true&url=${window.location.href}&title=${title}`} target="_blank" rel="noopener noreferrer" className="share-button linkedin">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 0 1 .016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z"/>
                  </svg>
                </a>
              </div>
            </div>
          </main>
          
          <aside className="blog-detail-sidebar">
            <div className="blog-detail-sidebar-sticky">
              <div className="author-bio">
                <h3>About the Author</h3>
                <div className="author-info">
                  <img src="/images/alora.jpg" alt={author} className="author-image" />
                  <div>
                    <h4>{author}</h4>
                    <p>
                      A 17-year-old developer passionate about web development, game design, and creative coding.
                      Follow my journey as I learn and grow in the tech world!
                    </p>
                  </div>
                </div>
              </div>
              
              {relatedPosts.length > 0 && (
                <div className="related-posts">
                  <h3>Related Posts</h3>
                  <div className="related-posts-list">
                    {relatedPosts.map((relatedPost) => (
                      <Link 
                        key={relatedPost.slug}
                        to={`/blog/post/${relatedPost.slug}`}
                        className="related-post-item"
                      >
                        <img 
                          src={relatedPost.frontMatter.coverImage || '/images/blog/default.jpg'} 
                          alt={relatedPost.frontMatter.title} 
                        />
                        <div>
                          <h4>{relatedPost.frontMatter.title}</h4>
                          <span>{relatedPost.frontMatter.formattedDate}</span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
};

export default BlogDetailPage; 