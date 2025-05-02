import matter from 'gray-matter';
import { format } from 'date-fns';

class BlogService {
  // Fetch all blog posts
  async getAllPosts() {
    try {
      console.log('Fetching all blog posts...');
      // Fetch the manifest of all blog post files
      const response = await fetch('/blog-posts/manifest.json');
      console.log('Manifest response:', response.status, response.statusText);
      
      if (!response.ok) {
        console.warn('Manifest not found, using fallback method');
        // If manifest doesn't exist, try to get all markdown files directly
        return this.getAllPostsWithoutManifest();
      }
      
      const manifest = await response.json();
      console.log('Found manifest with', manifest.files.length, 'files');
      
      // Fetch and parse each file in the manifest
      const postsPromises = manifest.files.map(async (filename) => {
        try {
          const post = await this.getPostByFilename(filename);
          return post;
        } catch (error) {
          console.error(`Error loading post ${filename}:`, error);
          return null;
        }
      });
      
      const posts = await Promise.all(postsPromises);
      const validPosts = posts.filter(post => post !== null);
      console.log('Successfully loaded', validPosts.length, 'out of', manifest.files.length, 'posts');
      
      // Sort posts by date (newest first)
      return validPosts.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date));
    } catch (error) {
      console.error('Error fetching all blog posts:', error);
      // Fallback to getting posts without a manifest
      return this.getAllPostsWithoutManifest();
    }
  }
  
  // Alternative method to get posts without a manifest
  async getAllPostsWithoutManifest() {
    try {
      console.log('Using fallback method to get posts without manifest');
      // These are our sample blog posts for now, in a real app we would scan the directory
      const filenames = [
        'getting-started-with-web-dev.md',
        'game-development-basics.md',
        'my-favorite-coding-tools.md',
        'learning-three-js.md',
        'chatbots-with-ai.md',
        'mobile-app-with-react-native.md',
        'creative-coding-with-p5js.md'
      ];
      
      console.log('Attempting to load', filenames.length, 'hardcoded blog posts');
      
      // Fetch and parse each file
      const postsPromises = filenames.map(async (filename) => {
        try {
          const post = await this.getPostByFilename(filename);
          return post;
        } catch (error) {
          console.error(`Error loading post ${filename}:`, error);
          return null;
        }
      });
      
      const posts = await Promise.all(postsPromises);
      const validPosts = posts.filter(post => post !== null);
      console.log('Successfully loaded', validPosts.length, 'out of', filenames.length, 'posts');
      
      // Sort posts by date (newest first)
      return validPosts.sort((a, b) => new Date(b.frontMatter.date) - new Date(a.frontMatter.date));
    } catch (error) {
      console.error('Error fetching blog posts without manifest:', error);
      return [];
    }
  }
  
  // Get a single blog post by its filename
  async getPostByFilename(filename) {
    try {
      console.log(`Fetching blog post: ${filename}`);
      const response = await fetch(`/blog-posts/${filename}`);
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ${filename}: ${response.status} ${response.statusText}`);
      }
      
      const text = await response.text();
      
      // Parse the markdown file with front matter
      const { data, content } = matter(text);
      
      // Format the date
      const formattedDate = format(new Date(data.date), 'MMMM d, yyyy');
      
      // Generate a slug from the filename (remove .md extension)
      const slug = filename.replace(/\.md$/, '');
      
      console.log(`Successfully loaded ${filename}`);
      
      return {
        slug,
        frontMatter: {
          ...data,
          formattedDate,
        },
        content,
      };
    } catch (error) {
      console.error(`Error fetching blog post ${filename}:`, error);
      return null;
    }
  }
  
  // Get a post by its slug
  async getPostBySlug(slug) {
    return this.getPostByFilename(`${slug}.md`);
  }
  
  // Get featured posts
  async getFeaturedPosts() {
    const allPosts = await this.getAllPosts();
    return allPosts.filter(post => post.frontMatter.featured);
  }
  
  // Get posts by tag
  async getPostsByTag(tag) {
    const allPosts = await this.getAllPosts();
    return allPosts.filter(post => 
      post.frontMatter.tags && 
      post.frontMatter.tags.map(t => t.toLowerCase()).includes(tag.toLowerCase())
    );
  }
  
  // Get latest posts
  async getLatestPosts(count = 6) {
    const allPosts = await this.getAllPosts();
    return allPosts.slice(0, count);
  }
  
  // Get all unique tags from posts
  async getAllTags() {
    const allPosts = await this.getAllPosts();
    const tagsSet = new Set();
    
    allPosts.forEach(post => {
      if (post.frontMatter.tags) {
        post.frontMatter.tags.forEach(tag => {
          tagsSet.add(tag);
        });
      }
    });
    
    return Array.from(tagsSet).sort();
  }
  
  // Get paginated posts
  async getPaginatedPosts(page = 1, perPage = 6) {
    const allPosts = await this.getAllPosts();
    const totalPosts = allPosts.length;
    const totalPages = Math.ceil(totalPosts / perPage);
    
    // Calculate start and end indices
    const startIndex = (page - 1) * perPage;
    const endIndex = startIndex + perPage;
    
    return {
      posts: allPosts.slice(startIndex, endIndex),
      pagination: {
        currentPage: page,
        totalPages,
        perPage,
        totalPosts,
        hasNextPage: page < totalPages,
        hasPrevPage: page > 1,
      }
    };
  }
}

// Create a singleton instance
const blogService = new BlogService();
export default blogService; 