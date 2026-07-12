export type TourCategory = 'nature' | 'cultural' | 'hiking' | 'exotic';
export type TourDifficulty = 'easy' | 'moderate' | 'challenging';

export interface ItineraryItem {
  day: number;
  title: string;
  description: string;
}

export interface Tour {
  id: string;
  title: string;
  description: string;
  longDescription: string;
  duration: string;
  price: number;
  image: string;
  category: TourCategory;
  difficulty: TourDifficulty;
  dates: string[];
  itinerary: ItineraryItem[];
  included: string[];
  notIncluded: string[];
  featured?: boolean;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  author: string;
  image: string;
  readTime: string;
}

export interface Review {
  id: string;
  name: string;
  tourName: string;
  rating: number;
  comment: string;
  date: string;
  avatar: string;
}

export interface BookingSubmission {
  id: string;
  tourId: string;
  tourTitle: string;
  fullName: string;
  email: string;
  phone: string;
  peopleCount: number;
  date: string;
  message?: string;
  submittedAt: string;
}
