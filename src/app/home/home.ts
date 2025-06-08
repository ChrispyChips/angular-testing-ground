import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SeoService } from '../services/seo.service';
import { CmsService, CMSPageData } from '../services/cms.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home.html',
  styleUrl: './home.scss'
})
export class Home implements OnInit {
  // Use signals for reactive state
  pageData = signal<CMSPageData | null>(null);
  loading = signal(true);

  constructor(
    private seoService: SeoService,
    private cmsService: CmsService
  ) {}

  ngOnInit(): void {
    console.log('Home component initialized, loading:', this.loading());
    this.loadHomePageData();
  }

  private loadHomePageData(): void {
    this.cmsService.getHomePageData().subscribe({
      next: (data: CMSPageData) => {
        console.log('1234:', data);
        this.pageData.set(data);
        this.loading.set(false);
        console.log('Loading set to false, loading:', this.loading());

        // Set SEO metadata from CMS data
        // this.setSEOFromCMS(data);

        // Testing it with fallback SEO
        this.setSEOFromCMS({
          id: 'TestID',
          title: 'Testing fallback SEO title from home page',
          description: 'Testing fallback SEO description from home page',
          content: 'Test content',
          seo: {
            title: 'Testing seo.title',
            description: 'Testing seo.description',
            keywords: 'Testing seo.keywords',
            ogImage: 'Testing seo.ogImage',
          },
          slug: 'testing slug',
          publishedAt: 'testing publishedAt',
          author: 'testing author',
        });
      },
      error: (error) => {
        console.error('222 error:', error);
        this.loading.set(false);
        console.log('Loading set to false after error, loading:', this.loading());

        // Set fallback SEO
        this.setFallbackSEO();
      }
    });
  }

  private setSEOFromCMS(data: CMSPageData): void {
    // Set comprehensive SEO
    this.seoService.setSEO({
      title: data.seo.title,
      description: data.seo.description,
      keywords: data.seo.keywords,
      author: data.author,
      ogUrl: 'https://yourdomain.com',
      ogImage: data.seo.ogImage
    });
  }

  private setFallbackSEO(): void {
    // Set fallback SEO if CMS fails
    this.seoService.setWebsiteSEO(
      'Testing Ground - Modern Angular 20 Application',
      'A modern Angular 20 application built with the latest web technologies.',
      'Angular 20, SSR, CMS, Modern Web Development'
    );
  }
}
