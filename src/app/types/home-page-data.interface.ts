export interface HomePageData {
    slug: string;
    seo: Seo;
    searchText: SearchText;
    mobileHeader: MobileHeader;
    desktopImage: DesktopImage;
    opacityPercentage: number;
    featuredTours: FeaturedTour[];
    reasonsHeading: string;
    reasons: Reason[];
    categoryCarouselHeading: string;
    categoryCarouselText: string;
    categoryCarousel: CategoryCarousel[];
    filtersHeading: string;
    filtersText: string;
    filters: Filter[];
    homePageTourSlider: HomePageTourSlider[];
    travelInspirationHeading: string;
    travelInspirationText: string;
    travelStoriesText: string;
    travelTipsText: string;
    travelStories: TravelStory[];
    blogCategoryName: string;
    memberships: Membership[];
    footerImage: Image;
    footerImageMobile: Image;
  }
  
  export interface Seo {
    slug: string;
    seoTitle: string;
    metaDescription: string;
    robotsFollow: boolean;
    robotsIndex: boolean;
    canonicalUrl: string;
    shareTitle: string;
    shareDescription: string;
    shareImage: ShareImage;
    shareType: string;
    shareUrl: string;
  }
  
  export interface ShareImage {
    title: string;
    description: string;
    url: string;
  }
  
  export interface SearchText {
    name: string;
    shortText: string;
    text: string;
  }
  
  export interface MobileHeader {
    title: string;
    description: string;
    url: string;
  }
  
  export interface DesktopImage {
    title: string;
    description: string;
    url: string;
  }
  
  export interface FeaturedTour {
    name: string;
    autoplay: boolean;
    cardType: string[];
    slideImage: SlideImage;
    shortText?: string;
    text: string;
    url: string;
    buttonText?: string;
  }
  
  export interface SlideImage {
    title: string;
    description: string;
    url: string;
  }
  
  export interface Reason {
    name: string;
    image: Image;
    text: string;
  }
  
  export interface Image {
    title?: string;
    description?: string;
    url?: string;
  }
  
  export interface CategoryCarousel {
    name: string;
    image: Image;
    heading: string;
    text: string;
    url: string;
    category: string[];
  }

  export interface Filter {
    name: string;
    image: Image;
    shortText: string;
    url: string;
  }
  
  
  export interface HomePageTourSlider {
    name: string;
    tabTitle: string;
    isFeatured: boolean;
    tabHeader: string;
    tabDescription: string;
    tours: string[];
    viewAllText?: string;
    viewAllRoute?: string;
  }
  
  export interface TravelStory {
    name: string;
    shortTextOne: string;
    shortTextTwo: string;
    longTextOne: string;
    image: Image;
  }
  
  export interface Membership {
    name: string;
    shortTextOne: string;
    longTextOne: string;
    image: Image;
  }
  