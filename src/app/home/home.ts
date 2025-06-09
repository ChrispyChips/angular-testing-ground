import { Component, OnInit, signal, inject, afterNextRender } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SeoService } from '../services/seo.service';
import { CmsService } from '../services/cms.service';
import { HomePageData } from '../types/home-page-data.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  // Use signals for reactive state
  pageData = signal<HomePageData | null>(null);
  loading = signal(true);
  imagesLoaded = signal<Set<string>>(new Set());

  constructor(
    private seoService: SeoService,
    private cmsService: CmsService,
    private sanitizer: DomSanitizer
  ) {
    // Use afterNextRender for browser-only operations
    afterNextRender(() => {
      // This runs only in browser after first render
      this.setupBrowserOptimizations();
    });
  }

  ngOnInit(): void {
    this.loadHomePageData();
  }

  /**
   * Setup browser-specific optimizations
   */
  private setupBrowserOptimizations(): void {
    // Preload critical images if data is already loaded
    if (this.pageData()) {
      this.preloadCriticalImages(this.pageData()?.reasons || []);
    }
  }

  /**
   * Safely sanitize HTML content
   */
  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }

  /**
   * Preload critical images for LCP optimization
   */
  private preloadCriticalImages(reasons: any[]): void {
    // Preload first 3 reason images (most likely to be in viewport)
    const criticalImages = reasons.slice(0, 3).map(reason => reason.image?.url).filter(Boolean);
    
    criticalImages.forEach(imageUrl => {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = imageUrl;
      document.head.appendChild(link);
    });
  }

  /**
   * Track image loading for performance monitoring
   */
  onImageLoad(imageUrl: string): void {
    this.imagesLoaded.update(loaded => new Set([...loaded, imageUrl]));
  }

  /**
   * Get optimized image URL with size parameters
   */
  getOptimizedImageUrl(imageUrl: string | undefined, width: number = 120): string {
    if (!imageUrl) return '';
    
    try {
      // Add size parameters for CDN optimization
      const url = new URL(imageUrl);
      url.searchParams.set('w', width.toString());
      url.searchParams.set('h', width.toString());
      url.searchParams.set('fit', 'cover');
      url.searchParams.set('q', '85'); // Quality optimization
      
      return url.toString();
    } catch {
      // Return original URL if URL parsing fails
      return imageUrl;
    }
  }

  /**
   * Check if image is loaded
   */
  isImageLoaded(imageUrl: string): boolean {
    return this.imagesLoaded().has(imageUrl);
  }

  private loadHomePageData(): void {
    // Add a small delay to prioritize critical rendering
    setTimeout(() => {
      this.cmsService.getHomePageData().subscribe({
        next: (data: HomePageData) => {
          console.log('HomePageData:', data);
          this.pageData.set(data);
          this.loading.set(false);

          // Preload critical images for LCP optimization
          if (data.reasons?.length) {
            this.preloadCriticalImages(data.reasons);
          }

          // Set SEO metadata from CMS data
          this.setSEOFromCMS(data);
        },
        error: () => {
          this.loading.set(false);
          console.log('Error: Loading set to false after error, loading:', this.loading());
        }
      });
    }, 0);
  }

  private setSEOFromCMS(data: HomePageData): void {
    // Set comprehensive SEO using the updated SEO model
    this.seoService.setSEO({
      title: data.seo.seoTitle,
      description: data.seo.metaDescription,
      keywords: data.seo.canonicalUrl,
      author: data.seo.canonicalUrl,
      ogUrl: data.seo.canonicalUrl,
      ogImage: data.seo.shareImage?.url
    });
  }
}
