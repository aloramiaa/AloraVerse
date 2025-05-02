import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

const SEO = ({
  title,
  description = "Alora Mia - Full Stack Developer specializing in modern web applications, 3D graphics, and interactive experiences.",
  keywords = "Full Stack Developer, Web Developer, 3D Graphics, React, Three.js, JavaScript, GSAP",
  canonicalUrl,
  ogType = "website",
  ogImage = "/images/og-image.jpg",
  twitterCard = "summary_large_image"
}) => {
  // Construct the full title with site name
  const fullTitle = title ? `${title} | Alora Mia - Full Stack Developer` : "Alora Mia - Full Stack Developer";
  
  // Construct the canonical URL
  const siteUrl = "https://alora.is-a.dev";
  const canonical = canonicalUrl ? `${siteUrl}${canonicalUrl}` : siteUrl;
  
  return (
    <Helmet>
      {/* Basic metadata */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={canonical} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:url" content={canonical} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:url" content={canonical} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={`${siteUrl}${ogImage}`} />
      
      {/* Additional tags */}
      <meta name="theme-color" content="#000000" />
      <meta name="robots" content="index, follow" />
      <meta name="author" content="Alora Mia" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    </Helmet>
  );
};

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  canonicalUrl: PropTypes.string,
  ogType: PropTypes.string,
  ogImage: PropTypes.string,
  twitterCard: PropTypes.string
};

export default SEO; 