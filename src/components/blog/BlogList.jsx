import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import BlogCard from './BlogCard';
import blogService from '../../services/BlogService';

const BlogList = ({ limit, searchQuery = '' }) => {
  const { page: pageParam, tag } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalPosts: 0,
    perPage: 6,
    hasNextPage: false,
    hasPrevPage: false,
  });

  // Parse the page parameter or default to 1
  const page = pageParam ? parseInt(pageParam, 10) || 1 : 1;
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        
        let result;
        if (limit) {
          // When limit is specified, just get the latest posts
          const latestPosts = await blogService.getLatestPosts(limit);
          result = {
            posts: latestPosts,
            pagination: {
              currentPage: 1,
              totalPages: 1,
              perPage: limit,
              totalPosts: latestPosts.length,
              hasNextPage: false,
              hasPrevPage: false,
            }
          };
        } else {
          // Otherwise, get paginated posts
          result = await blogService.getPaginatedPosts(page, 6);
        }
        
        setPosts(result.posts);
        setAllPosts(result.posts); // Store all posts for search filtering
        setPagination(result.pagination);
        
        // If page is out of range, redirect to page 1
        if (page > result.pagination.totalPages && result.pagination.totalPages > 0) {
          navigate('/blog');
        }
      } catch (err) {
        console.error('Error fetching blog posts:', err);
        setError('Failed to load blog posts. Please try again later.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [page, limit, navigate, tag]);

  // Filter posts based on search query
  useEffect(() => {
    if (!searchQuery.trim()) {
      setFilteredPosts(allPosts);
      return;
    }

    const query = searchQuery.toLowerCase();
    const filtered = allPosts.filter(post => {
      const { title, excerpt, tags, author } = post.frontMatter;
      return (
        title.toLowerCase().includes(query) ||
        excerpt.toLowerCase().includes(query) ||
        (author && author.toLowerCase().includes(query)) ||
        (tags && tags.some(tag => tag.toLowerCase().includes(query)))
      );
    });

    setFilteredPosts(filtered);
  }, [searchQuery, allPosts]);

  // Use filtered posts if search query exists, otherwise use original posts
  const displayPosts = searchQuery ? filteredPosts : posts;

  // Render loading state
  if (loading) {
    return (
      <div className="blog-loading flex-center flex-col py-20">
        <div className="spinner size-12 border-4 border-blue-50 border-t-accent rounded-full animate-spin mb-4"></div>
        <p className="text-white-50">Loading blog posts...</p>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
      <div className="blog-error flex-col-center py-20 text-center">
        <h3 className="text-white-50 text-2xl font-semibold mb-4">Something went wrong</h3>
        <p className="text-blue-50 mb-6">{error}</p>
        <button onClick={() => window.location.reload()} className="bg-accent hover:bg-accent/80 text-white py-2 px-6 rounded-full transition-colors duration-300">Try Again</button>
      </div>
    );
  }

  // Render empty state
  if (displayPosts.length === 0) {
    return (
      <div className="blog-empty flex-col-center py-20 text-center">
        {searchQuery ? (
          <>
            <h3 className="text-white-50 text-2xl font-semibold mb-4">No matching posts found</h3>
            <p className="text-blue-50 mb-6">No posts match your search for "{searchQuery}".</p>
          </>
        ) : (
          <>
            <h3 className="text-white-50 text-2xl font-semibold mb-4">No posts found</h3>
            <p className="text-blue-50 mb-6">There are no blog posts available at the moment.</p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="blog-list-container">
      {searchQuery && (
        <div className="search-results-header mb-8">
          <h2 className="text-white-50 text-xl font-semibold">
            {filteredPosts.length} {filteredPosts.length === 1 ? 'result' : 'results'} for "{searchQuery}"
          </h2>
        </div>
      )}
      
      <div className="blog-grid grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {displayPosts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
      
      {!searchQuery && !limit && pagination.totalPages > 1 && (
        <div className="blog-pagination flex items-center justify-center gap-4 mt-12">
          {pagination.hasPrevPage && (
            <Link 
              to={`/blog${pagination.currentPage - 1 === 1 ? '' : `/page/${pagination.currentPage - 1}`}`}
              className="pagination-btn prev flex items-center gap-2 bg-black-50 hover:bg-black-100 text-white-50 py-2 px-4 rounded-lg transition-colors duration-300"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"/>
              </svg>
              Previous
            </Link>
          )}
          
          <div className="pagination-numbers flex gap-2">
            {[...Array(pagination.totalPages).keys()].map((i) => (
              <Link
                key={i + 1}
                to={`/blog${i + 1 === 1 ? '' : `/page/${i + 1}`}`}
                className={`pagination-number size-10 flex-center rounded-full transition-colors duration-300 
                  ${pagination.currentPage === i + 1 
                    ? 'bg-accent text-white' 
                    : 'bg-black-100 text-white-50 hover:bg-black-200'}`}
              >
                {i + 1}
              </Link>
            ))}
          </div>
          
          {pagination.hasNextPage && (
            <Link
              to={`/blog/page/${pagination.currentPage + 1}`}
              className="pagination-btn next flex items-center gap-2 bg-black-50 hover:bg-black-100 text-white-50 py-2 px-4 rounded-lg transition-colors duration-300"
            >
              Next
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"/>
              </svg>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default BlogList; 