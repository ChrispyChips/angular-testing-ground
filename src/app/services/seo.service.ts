import { Injectable } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  ogUrl?: string;
  ogType?: string;
  twitterCard?: string;
  author?: string;
  robots?: string;
}

@Injectable({
  providedIn: 'root'
})
export class SeoService {
  private defaultUrl = 'https://yourdomain.com';
  private defaultImage = 'https://yourdomain.com/assets/images/og-image.jpg';

  constructor(
    private meta: Meta,
    private title: Title
  ) {}

  /**
   * Set comprehensive SEO metadata for a page
   */
  setSEO(data: SEOData): void {
    // Set page title
    this.title.setTitle(data.title);

    // Set meta description
    this.meta.updateTag({ name: 'description', content: data.description });

    // Set keywords if provided
    if (data.keywords) {
      this.meta.updateTag({ name: 'keywords', content: data.keywords });
    }

    // Open Graph tags
    this.meta.updateTag({ property: 'og:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ property: 'og:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ property: 'og:type', content: data.ogType || 'website' });
    this.meta.updateTag({ property: 'og:url', content: data.ogUrl || this.defaultUrl });
    this.meta.updateTag({ property: 'og:image', content: data.ogImage || this.defaultImage });

    // Twitter Card tags
    this.meta.updateTag({ name: 'twitter:card', content: data.twitterCard || 'summary_large_image' });
    this.meta.updateTag({ name: 'twitter:title', content: data.ogTitle || data.title });
    this.meta.updateTag({ name: 'twitter:description', content: data.ogDescription || data.description });
    this.meta.updateTag({ name: 'twitter:image', content: data.ogImage || this.defaultImage });

    // Additional SEO tags
    this.meta.updateTag({ name: 'robots', content: data.robots || 'index, follow' });
    if (data.author) {
      this.meta.updateTag({ name: 'author', content: data.author });
    }
  }

  /**
   * Set basic SEO for a page (title and description only)
   */
  setBasicSEO(title: string, description: string): void {
    this.setSEO({ title, description });
  }

  /**
   * Set SEO for a blog post or article
   */
  setArticleSEO(title: string, description: string, author: string, publishedTime?: string, modifiedTime?: string): void {
    this.setSEO({
      title,
      description,
      author,
      ogType: 'article'
    });

    if (publishedTime) {
      this.meta.updateTag({ property: 'article:published_time', content: publishedTime });
    }
    if (modifiedTime) {
      this.meta.updateTag({ property: 'article:modified_time', content: modifiedTime });
    }
  }

  /**
   * Set SEO for a website homepage
   */
  setWebsiteSEO(title: string, description: string, keywords?: string): void {
    this.setSEO({
      title,
      description,
      keywords
    });
  }

  /**
   * Set SEO for an organization
   */
  setOrganizationSEO(organizationName: string, description: string): void {
    this.setSEO({
      title: `${organizationName} - Official Website`,
      description
    });
  }

  /**
   * Clear all SEO tags (useful for cleanup)
   */
  clearSEO(): void {
    this.meta.removeTag('name="description"');
    this.meta.removeTag('name="keywords"');
    this.meta.removeTag('property="og:title"');
    this.meta.removeTag('property="og:description"');
    this.meta.removeTag('property="og:type"');
    this.meta.removeTag('property="og:url"');
    this.meta.removeTag('property="og:image"');
    this.meta.removeTag('name="twitter:card"');
    this.meta.removeTag('name="twitter:title"');
    this.meta.removeTag('name="twitter:description"');
    this.meta.removeTag('name="twitter:image"');
    this.meta.removeTag('name="author"');
  }
} 