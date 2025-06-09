import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

export interface CMSPageData {
  id: string;
  title: string;
  description: string;
  content: string;
  seo: {
    title: string;
    description: string;
    keywords?: string;
    ogImage?: string;
  };
  slug: string;
  publishedAt: string;
  author?: string;
}

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);

  private apiUrl = 'https://your-cms-api.com/api';

  /**
   * Get page data from CMS
   */
  getPageData(slug: string): Observable<CMSPageData> {
    return this.http.get<CMSPageData>(`https://expatexplore.com/v3/pages/newstatic/home.json`).pipe(
      catchError(error => {
        console.log('--Error fetching real CMS data');
        // Return fallback data
        return of(this.getFallbackData(slug));
      })
    );
  }

  /**
   * Get home page data specifically
   */
  getHomePageData(): Observable<CMSPageData> {
    return this.getPageData('home');
  }

  /**
   * Fallback data if API fails
   */
  private getFallbackData(slug: string): CMSPageData {
    return {
      id: 'Main fallback on service',
      title: 'Main fallback on service',
      description: 'Main fallback on service',
      content: 'Main fallback on service',
      seo: {
        title: 'Main fallback on service',
        description: 'Main fallback on service',
        keywords: 'Main fallback on service',
      },
      slug,
      publishedAt: new Date().toISOString()
    };
  }
}
