/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export interface Vehicle {
  id: string;
  brand: string; // e.g. "Lamborghini"
  model: string; // e.g. "Revuelto"
  year: number;
  price: number;
  mileage: number;
  fuelType: "Petrol" | "Electric" | "Hybrid" | "Diesel";
  transmission: "Automatic" | "Manual" | "Dual-Clutch";
  bodyType: "SUV" | "Sedan" | "Coupe" | "Sports Car" | "Supercar" | "Hypercar" | "Luxury SUV" | "Convertible";
  engine: string; // e.g. "6.5L V12 Hybrid"
  power: string; // e.g. "1,001 HP"
  acceleration: string; // e.g. "0-60 mph in 2.5s"
  topSpeed: string; // e.g. "217 mph"
  color: string; // e.g. "Arancio Apodis (Orange Metallic)"
  interiorColor: string; // e.g. "Nero Ade / Arancio Leonis"
  location: string; // e.g. "Monaco"
  description: string;
  images: string[];
  sellerId: string;
  sellerName: string;
  sellerAvatar: string;
  sellerRating: number;
  views: number;
  inquiries: number;
  status: "Active" | "Pending" | "Sold";
  isFeatured?: boolean;
}

export interface Brand {
  id: string;
  name: string;
  logo: string;
  founded: string;
  country: string;
  story: string;
  featuredImg: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  icon: string;
  img: string;
}

export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorAvatar: string;
  publishDate: string;
  readTime: string;
  category: string;
  image: string;
  views: number;
}

export interface Message {
  id: string;
  senderId: string;
  senderName: string;
  senderAvatar: string;
  receiverId: string;
  vehicleId?: string;
  vehicleName?: string;
  text: string;
  timestamp: string;
  isRead: boolean;
}

export interface User {
  id: string;
  email: string;
  name: string;
  phone: string;
  role: "Buyer" | "Seller" | "Admin";
  bio?: string;
  avatar: string;
  listingsCount: number;
}

export interface AnalyticsSummary {
  totalRevenue: number;
  totalUsers: number;
  totalListings: number;
  listingViews: number;
  activeChats: number;
}
