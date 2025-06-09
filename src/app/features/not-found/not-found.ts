import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { Location } from '@angular/common';
import { SeoService } from '../../services/seo.service';

@Component({
  selector: 'app-not-found',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './not-found.html',
  styleUrl: './not-found.scss'
})
export class NotFound implements OnInit {
  constructor(
    private location: Location,
    private seoService: SeoService
  ) {}

  ngOnInit(): void {
    this.setSEO();
  }

  private setSEO(): void {
    this.seoService.setSEO({
      title: '404 - Page Not Found',
      description: 'The page you are looking for does not exist.',
      ogTitle: '404 - Page Not Found',
      ogDescription: 'The page you are looking for does not exist.',
      ogType: 'website'
    });
  }

  goBack(): void {
    this.location.back();
  }
}
