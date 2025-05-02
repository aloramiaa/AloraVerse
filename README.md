<div align="center">
  <br />
  <a href="#" target="_blank">
    <img src="public/images/readme.png" alt="AloraVerse Banner" width="100%">
  </a>
  <br />

  <div>
    <img src="https://img.shields.io/badge/-React_19-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React 19" />
    <img src="https://img.shields.io/badge/-Three.js-black?style=for-the-badge&logo=three.js&logoColor=white" alt="Three.js" />
    <img src="https://img.shields.io/badge/-GSAP-88CE02?style=for-the-badge&logo=greensock&logoColor=white" alt="GSAP" />
    <img src="https://img.shields.io/badge/-Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS" />
  </div>

  <h1 align="center">AloraVerse</h1>
  <p align="center">
    A stunning 3D portfolio and blog platform with interactive elements and modern design
  </p>
</div>

## 📋 Table of Contents

1. 🌟 [Introduction](#introduction)
2. ✨ [Features](#features)
3. 🛠️ [Tech Stack](#tech-stack)
4. 🚀 [Getting Started](#getting-started)
5. 📝 [Creating Blog Posts](#creating-blog-posts)
6. 🔍 [Project Structure](#project-structure)
7. 🔄 [Deployment](#deployment)
8. 🧩 [Customization](#customization)

## 🌟 Introduction <a name="introduction"></a>

AloraVerse is a modern, interactive 3D portfolio and blog platform built with React 19 and Three.js. It features smooth animations, responsive design, and a fully functional blog system with markdown support. The site showcases creative work, technical skills, and provides a platform for sharing knowledge through well-designed blog posts.

## ✨ Features <a name="features"></a>

- **Interactive 3D Elements** - Engaging Three.js powered 3D models and effects
- **Modern UI/UX** - Sleek design with smooth animations using GSAP
- **Responsive Design** - Perfect viewing experience on all devices
- **Blog Platform** - Full-featured blog with:
  - Markdown support
  - Tag filtering
  - Related posts
  - Social sharing
  - Search functionality
- **Performance Optimized** - Fast loading times and smooth animations
- **SEO Ready** - Built-in SEO component for better search engine visibility
- **Accessibility Focused** - Inclusive design for all users

## 🛠️ Tech Stack <a name="tech-stack"></a>

- **Frontend Framework**: React 19 with React Router v7
- **3D Rendering**: Three.js with React Three Fiber & Drei
- **Animation**: GSAP (GreenSock Animation Platform)
- **Styling**: Tailwind CSS v4
- **Blog System**: Markdown with gray-matter & react-markdown
- **Build Tool**: Vite
- **Email Integration**: EmailJS

## 🚀 Getting Started <a name="getting-started"></a>

### Prerequisites

- Node.js 18+ and npm/pnpm
- Git

### Installation

1. Clone the repository
```bash
git clone https://github.com/your-username/AloraVerse.git
cd AloraVerse
```

2. Install dependencies
```bash
npm install
# or with pnpm
pnpm install
```

3. Configure environment variables (optional)
Create a `.env` file in the root directory with the following content:
```env
VITE_APP_EMAILJS_SERVICE_ID=your_service_id
VITE_APP_EMAILJS_TEMPLATE_ID=your_template_id
VITE_APP_EMAILJS_PUBLIC_KEY=your_public_key
```

4. Start the development server
```bash
npm run dev
# or with pnpm
pnpm dev
```

5. Build for production
```bash
npm run build
# or with pnpm
pnpm build
```

## 📝 Creating Blog Posts <a name="creating-blog-posts"></a>

AloraVerse uses a simple file-based blog system with markdown files. To create a new blog post:

1. Create a new markdown (`.md`) file in the `public/blog-posts` directory
2. Add front matter at the top of the file with required metadata:

```md
---
title: Your Blog Post Title
date: 2025-05-01
author: Your Name
excerpt: A brief summary of your blog post that will appear in previews.
coverImage: /images/blog/your-image.jpg
tags: [Tag1, Tag2, Tag3]
featured: false
---

Your markdown content goes here...
```

3. Write your blog content using Markdown syntax
4. Add the new file to the blog manifest:
   - Open `public/blog-posts/manifest.json`
   - Add your new filename to the "files" array
   - Update the "lastUpdated" field

```json
{
  "files": [
    "getting-started-with-web-dev.md",
    "your-new-post.md"
  ],
  "lastUpdated": "2025-05-01T12:00:00Z"
}
```

5. Save the files and restart the development server to see your new post

### Blog Post Front Matter Fields

| Field | Description | Required |
|-------|-------------|----------|
| title | The title of your blog post | Yes |
| date | Publication date (YYYY-MM-DD) | Yes |
| author | Author's name | Yes |
| excerpt | Brief summary for previews | Yes |
| coverImage | Path to the cover image | Yes |
| tags | Array of related tags | No |
| featured | Whether to feature on homepage | No |

### Adding Images to Blog Posts

Store blog images in `public/images/blog/` and reference them in your markdown:

```md
![Image description](/images/blog/your-image.jpg)
```

## 🔍 Project Structure <a name="project-structure"></a>

```
AloraVerse/
├── public/               # Static assets
│   ├── blog-posts/       # Markdown blog posts
│   ├── images/           # Images and media
│   ├── models/           # 3D models
│   └── cursors/          # Custom cursor images
├── src/
│   ├── components/       # Reusable UI components
│   ├── constants/        # Configuration and constants
│   ├── pages/            # Page components
│   ├── sections/         # Page sections
│   ├── services/         # Service classes and API
│   ├── App.jsx           # Application entry
│   └── main.jsx          # React initialization
├── package.json          # Dependencies and scripts
├── vite.config.js        # Vite configuration
└── tailwind.config.js    # Tailwind CSS configuration
```

## 🔄 Deployment <a name="deployment"></a>

AloraVerse can be deployed to various platforms:

### Vercel (Recommended)

```bash
npm install -g vercel
vercel
```

### Netlify

```bash
npm install -g netlify-cli
netlify deploy
```

### GitHub Pages

Update `vite.config.js` with your base path:

```js
export default defineConfig({
  base: '/your-repo-name/',
  // other config...
})
```

Then deploy using GitHub Actions or manually:

```bash
npm run build
# Use GitHub Actions or manually deploy the 'dist' folder
```

## 🧩 Customization <a name="customization"></a>

### Theming

Edit `tailwind.config.js` to customize the color palette and design tokens:

```js
module.exports = {
  theme: {
    extend: {
      colors: {
        primary: '#your-primary-color',
        secondary: '#your-secondary-color',
        // Add your custom colors
      },
    },
  },
  // other config...
}
```

### 3D Models

Replace or add 3D models in the `public/models/` directory. Update references in the component files under `src/sections/` or `src/components/`.

### Content

Update personal information, projects, and experiences in the files under `src/constants/` directory.

---

<div align="center">
  <p>Created with ❤️ by <a href="https://github.com/your-username">Your Name</a></p>
  <p>
    <a href="https://twitter.com/your-twitter" target="_blank">
      <img src="https://img.shields.io/badge/Twitter-1DA1F2?style=for-the-badge&logo=twitter&logoColor=white" alt="Twitter" />
    </a>
    <a href="https://linkedin.com/in/your-linkedin" target="_blank">
      <img src="https://img.shields.io/badge/LinkedIn-0077B5?style=for-the-badge&logo=linkedin&logoColor=white" alt="LinkedIn" />
    </a>
  </p>
</div>
