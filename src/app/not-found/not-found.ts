import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SeoService } from '../services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound implements OnInit {
  constructor(
    private location: Location,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.seoService.setSEO({
      title: '404 - Page Not Found | Testing Ground',
      description: 'The page you are looking for could not be found. Please check the URL or navigate back to our homepage.',
      robots: 'noindex, nofollow', // Tell search engines not to index 404 pages
      ogType: 'website'
    });
  }

  goBack(): void {
    this.location.back();
  }
}
