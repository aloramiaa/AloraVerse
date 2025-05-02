import React from 'react';
import { Link } from 'react-router-dom';

const BlogCard = ({ post }) => {
  const { slug, frontMatter } = post;
  const { title, excerpt, formattedDate, coverImage, tags, author } = frontMatter;

  return (
    <div className="card-border bg-black-50 rounded-xl overflow-hidden transition-all duration-300 hover:translate-y-[-5px]">
      <div className="flex flex-col h-full">
        <div className="h-48 overflow-hidden bg-black-200">
          <img 
            src={coverImage || '/images/blog/react-native.jpg'} 
            alt={title}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            onError={(e) => {
              e.target.style.display = 'none';
            }}
          />
        </div>
        
        <div className="p-6 flex flex-col flex-grow">
          <div className="flex items-center gap-3 text-blue-50 text-sm mb-3">
            <span>{formattedDate}</span>
            {author && (
              <>
                <span className="text-accent">•</span>
                <span>by {author}</span>
              </>
            )}
          </div>
          
          <h3 className="text-xl font-semibold mb-3 text-white-50">
            <Link to={`/blog/post/${slug}`} className="hover:text-accent transition-colors">{title}</Link>
          </h3>
          
          <p className="text-white-50 opacity-80 mb-4 flex-grow">{excerpt}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {tags && tags.slice(0, 3).map((tag, index) => (
              <Link key={index} to={`/blog/tag/${tag.toLowerCase()}`} className="px-3 py-1 bg-black-200 text-blue-50 rounded-full text-xs hover:bg-accent/20 hover:text-accent transition-colors">
                {tag}
              </Link>
            ))}
            {tags && tags.length > 3 && (
              <span className="px-3 py-1 bg-black-200 text-blue-50 rounded-full text-xs">+{tags.length - 3}</span>
            )}
          </div>
          
          <Link to={`/blog/post/${slug}`} className="text-accent font-medium flex items-center gap-1 group">
            Read More
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16" className="transition-transform duration-300 group-hover:translate-x-1">
              <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default BlogCard; 