/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from "react";
import { Vehicle, Brand, Category, BlogPost, Message, User, AnalyticsSummary } from "./types";
import { INITIAL_VEHICLES, BLOG_POSTS } from "./data";

// Type definitions for our global state
export interface FilterState {
  brand: string;
  model: string;
  minPrice: number;
  maxPrice: number;
  minYear: number;
  maxYear: number;
  bodyType: string;
  transmission: string;
  fuelType: string;
}

export const DEFAULT_FILTERS: FilterState = {
  brand: "All",
  model: "",
  minPrice: 0,
  maxPrice: 5000000,
  minYear: 2010,
  maxYear: 2026,
  bodyType: "All",
  transmission: "All",
  fuelType: "All"
};

// Simulated messages
const INITIAL_MESSAGES: Message[] = [
  {
    id: "msg-1",
    senderId: "seller-1",
    senderName: "Aura Elite Direct",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
    receiverId: "buyer-default",
    vehicleId: "veh-1",
    vehicleName: "Lamborghini Revuelto",
    text: "Greetings. The 2025 Revuelto has just completed its 150-point factory certification. Would you like to schedule an on-site private inspection?",
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    isRead: false
  },
  {
    id: "msg-2",
    senderId: "buyer-default",
    senderName: "Alexander Sovereign",
    senderAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150",
    receiverId: "seller-1",
    vehicleId: "veh-1",
    vehicleName: "Lamborghini Revuelto",
    text: "Thank you. Is the paint fully original or does it have an active PPF coating?",
    timestamp: new Date(Date.now() - 3600000 * 1.8).toISOString(),
    isRead: true
  },
  {
    id: "msg-3",
    senderId: "seller-1",
    senderName: "Aura Elite Direct",
    senderAvatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
    receiverId: "buyer-default",
    vehicleId: "veh-1",
    vehicleName: "Lamborghini Revuelto",
    text: "It has a complete self-healing XPEL Stealth satin protective film applied by the factory, covering 100% of the visible carbon panels.",
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    isRead: false
  }
];

// Active mock user
export const DEFAULT_USER: User = {
  id: "buyer-default",
  email: "strongakame@gmail.com",
  name: "Alexander Sovereign",
  phone: "+1 (310) 555-8822",
  role: "Admin", // Admin gives access to both Buyers/Sellers screens and Admin Dashboard!
  bio: "Connoisseur of rare speed and fine watchmaking. Building an elite hypercar garage.",
  avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
  listingsCount: 2
};

// Global State interface
export interface GlobalState {
  currentRoute: string; // e.g. "home", "browse", "vehicle/veh-1", "dashboard/overview", etc.
  currentUser: User | null;
  vehicles: Vehicle[];
  savedVehicleIds: string[];
  messages: Message[];
  blogPosts: BlogPost[];
  filters: FilterState;
  sortKey: string;
  viewMode: "grid" | "list";
}

// Global state dispatcher implementation
type Listener = (state: GlobalState) => void;
let listeners: Listener[] = [];

// Load state from local storage or default
const getSavedState = (): GlobalState => {
  try {
    const saved = localStorage.getItem("luxedrive_state_v1");
    if (saved) {
      const parsed = JSON.parse(saved);
      // Fallback for new properties
      return {
        currentRoute: parsed.currentRoute || "home",
        currentUser: parsed.currentUser !== undefined ? parsed.currentUser : DEFAULT_USER,
        vehicles: parsed.vehicles || INITIAL_VEHICLES,
        savedVehicleIds: parsed.savedVehicleIds || ["veh-1", "veh-3"],
        messages: parsed.messages || INITIAL_MESSAGES,
        blogPosts: parsed.blogPosts || BLOG_POSTS,
        filters: parsed.filters || DEFAULT_FILTERS,
        sortKey: parsed.sortKey || "featured",
        viewMode: parsed.viewMode || "grid"
      };
    }
  } catch (e) {
    console.error("Local storage recovery failed", e);
  }

  // Fallback initial
  return {
    currentRoute: "home",
    currentUser: DEFAULT_USER,
    vehicles: INITIAL_VEHICLES,
    savedVehicleIds: ["veh-1", "veh-3"],
    messages: INITIAL_MESSAGES,
    blogPosts: BLOG_POSTS,
    filters: DEFAULT_FILTERS,
    sortKey: "featured",
    viewMode: "grid"
  };
};

let globalState: GlobalState = getSavedState();

// Parse hash on startup
const getHashRoute = () => {
  const hash = window.location.hash || "#home";
  return hash.replace("#", "");
};

globalState.currentRoute = getHashRoute();

// Notify all React listeners
const emit = () => {
  localStorage.setItem("luxedrive_state_v1", JSON.stringify(globalState));
  listeners.forEach((listener) => listener(globalState));
};

// Live URL Hashimoto sync
window.addEventListener("hashchange", () => {
  const route = getHashRoute();
  if (globalState.currentRoute !== route) {
    globalState.currentRoute = route;
    emit();
  }
});

export const store = {
  getState: () => globalState,
  
  subscribe: (listener: Listener) => {
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  },

  navigate: (route: string) => {
    globalState.currentRoute = route;
    window.location.hash = `#${route}`;
    emit();
    // Scroll to top elegantly
    window.scrollTo({ top: 0, behavior: "smooth" });
  },

  login: (user: User) => {
    globalState.currentUser = user;
    emit();
  },

  logout: () => {
    globalState.currentUser = null;
    emit();
    store.navigate("home");
  },

  toggleWishlist: (vehicleId: string) => {
    if (globalState.savedVehicleIds.includes(vehicleId)) {
      globalState.savedVehicleIds = globalState.savedVehicleIds.filter((id) => id !== vehicleId);
    } else {
      globalState.savedVehicleIds.push(vehicleId);
    }
    emit();
  },

  setFilters: (newFilters: Partial<FilterState>) => {
    globalState.filters = { ...globalState.filters, ...newFilters };
    emit();
  },

  resetFilters: () => {
    globalState.filters = DEFAULT_FILTERS;
    emit();
  },

  setSort: (key: string) => {
    globalState.sortKey = key;
    emit();
  },

  setViewMode: (mode: "grid" | "list") => {
    globalState.viewMode = mode;
    emit();
  },

  addListing: (vehicle: Omit<Vehicle, "id" | "views" | "inquiries" | "status" | "sellerId" | "sellerName" | "sellerAvatar" | "sellerRating">) => {
    const newId = `veh-${Date.now()}`;
    const newVehicle: Vehicle = {
      ...vehicle,
      id: newId,
      views: 0,
      inquiries: 0,
      status: "Pending", // Needs Admin approval
      sellerId: globalState.currentUser?.id || "seller-1",
      sellerName: globalState.currentUser?.name || "Anonymous Member",
      sellerAvatar: globalState.currentUser?.avatar || "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150",
      sellerRating: 5.0
    };
    globalState.vehicles = [newVehicle, ...globalState.vehicles];
    emit();
    return newId;
  },

  updateListing: (id: string, updatedFields: Partial<Vehicle>) => {
    globalState.vehicles = globalState.vehicles.map((v) => 
      v.id === id ? { ...v, ...updatedFields } : v
    );
    emit();
  },

  deleteListing: (id: string) => {
    globalState.vehicles = globalState.vehicles.filter((v) => v.id !== id);
    emit();
  },

  approveListing: (id: string) => {
    globalState.vehicles = globalState.vehicles.map((v) => 
      v.id === id ? { ...v, status: "Active" as const } : v
    );
    emit();
  },

  rejectListing: (id: string) => {
    globalState.vehicles = globalState.vehicles.map((v) => 
      v.id === id ? { ...v, status: "Pending" as const } : v
    );
    emit();
  },

  sendMessage: (receiverId: string, text: string, vehicleId?: string, vehicleName?: string) => {
    if (!globalState.currentUser) return;
    const newMsg: Message = {
      id: `msg-${Date.now()}`,
      senderId: globalState.currentUser.id,
      senderName: globalState.currentUser.name,
      senderAvatar: globalState.currentUser.avatar,
      receiverId,
      vehicleId,
      vehicleName,
      text,
      timestamp: new Date().toISOString(),
      isRead: true
    };
    globalState.messages = [...globalState.messages, newMsg];
    emit();

    // Trigger auto luxury concierge response after 1.5 seconds for incredible interactivity!
    setTimeout(() => {
      const responses = [
        "A luxury consultant has been notified and is retrieving this build sheet. We can schedule a Zoom call or dynamic FaceTime tour of the details.",
        "Beautiful configuration. The owner is open to selective trades for limited-edition hypercars. We will present your inquiry to them immediately.",
        "Inquiry received. The chassis is currently stored in our climate-controlled vault in Monaco. Shipping logistics can be dispatched within 48 hours.",
        "Your proposal is being structured. We can coordinate custom finance packages backed by high-yield portfolios if required.",
        "Excellent choice. Let's arrange a telephone briefing with our chief mechanical officer regarding this vehicle's service dossier."
      ];
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const autoReply: Message = {
        id: `msg-${Date.now() + 1}`,
        senderId: receiverId,
        senderName: "LuxeDrive Concierge Support",
        senderAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150",
        receiverId: globalState.currentUser!.id,
        vehicleId,
        vehicleName,
        text: randomResponse,
        timestamp: new Date().toISOString(),
        isRead: false
      };
      
      globalState.messages = [...globalState.messages, autoReply];
      emit();
    }, 1500);
  },

  // Blog admin
  addBlogPost: (post: Omit<BlogPost, "id" | "views" | "publishDate">) => {
    const newPost: BlogPost = {
      ...post,
      id: `blog-${Date.now()}`,
      views: 0,
      publishDate: new Date().toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    };
    globalState.blogPosts = [newPost, ...globalState.blogPosts];
    emit();
  },

  deleteBlogPost: (id: string) => {
    globalState.blogPosts = globalState.blogPosts.filter((post) => post.id !== id);
    emit();
  }
};

// React hook to connect to state changes
export function useGlobalStore() {
  const [state, setState] = useState<GlobalState>(globalState);

  useEffect(() => {
    setState(globalState); // Update with absolute latest on mount
    const unsubscribe = store.subscribe((newState) => {
      setState({ ...newState });
    });
    return unsubscribe;
  }, []);

  return state;
}
