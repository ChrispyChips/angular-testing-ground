import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { HomePageData } from '../types/home-page-data.interface';

@Injectable({
  providedIn: 'root'
})
export class CmsService {
  private http = inject(HttpClient);

  /**
   * Get home page data specifically
   */
  getHomePageData(): Observable<HomePageData> {
    return this.http.get<HomePageData>(`https://expatexplore.com/v3/pages/newstatic/home.json`);
  }
}
