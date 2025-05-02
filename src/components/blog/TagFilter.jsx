import React from 'react';
import { Link } from 'react-router-dom';

const TagFilter = ({ tags = [], activeTag }) => {
  if (tags.length === 0) {
    return null;
  }

  return (
    <div className="tag-filter">
      <div className="tag-filter-list flex flex-wrap gap-2 mb-6">
        <Link 
          to="/blog" 
          className={`tag-filter-item px-4 py-2 rounded-full text-sm transition-colors duration-300 ${!activeTag ? 'bg-accent text-white font-medium' : 'bg-black-100 text-blue-50 hover:bg-black-200'}`}
        >
          All
        </Link>
        {tags.map((tag) => (
          <Link
            key={tag}
            to={`/blog/tag/${tag.toLowerCase()}`}
            className={`tag-filter-item px-4 py-2 rounded-full text-sm transition-colors duration-300 ${activeTag === tag.toLowerCase() ? 'bg-accent text-white font-medium' : 'bg-black-100 text-blue-50 hover:bg-black-200'}`}
          >
            {tag}
          </Link>
        ))}
      </div>
    </div>
  );
};

export default TagFilter; 