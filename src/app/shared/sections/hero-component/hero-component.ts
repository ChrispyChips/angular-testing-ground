import { Component, input } from '@angular/core';
import { NgStyle } from '@angular/common';
import { Image, ImageText } from '../../../types/home-page-data.interface';

@Component({
  selector: 'app-hero-component',
  imports: [
    NgStyle
  ],
  standalone: true,
  templateUrl: './hero-component.html',
  styleUrl: './hero-component.scss'
})
export class HeroComponent {
  // Angular 20 input signals - modern approach
  desktopImage = input<Image | undefined>(undefined);
  searchText = input<ImageText | undefined>(undefined);
  mobileHeader = input<Image | undefined>(undefined);
  desktopOverlayOpacity = input<number>(0);
}
