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
} 