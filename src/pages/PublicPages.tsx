/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect } from "react";
import { store, useGlobalStore, DEFAULT_FILTERS, FilterState } from "../store";
import { BRANDS, CATEGORIES, FAQS, BLOG_POSTS, OFF_LOCATIONS } from "../data";
import { Vehicle, BlogPost, Brand } from "../types";
import { 
  ArrowRight, Search, Sliders, LayoutGrid, LayoutList, 
  MapPin, Gauge, ShieldCheck, Heart, User, Star, Calendar, 
  ChevronRight, CalendarClock, Phone, Sparkles, AlertCircle, Check, 
  ChevronLeft, Award, HelpCircle, Eye, Share2, Calculator, Flame, X
} from "lucide-react";
import FinancingCalculator from "../components/FinancingCalculator";

// ==========================================
// 1. HOME VIEW
// ==========================================
export function HomeView() {
  const { vehicles } = useGlobalStore();
  const featured = vehicles.filter((v) => v.isFeatured && v.status === "Active").slice(0, 3);
  const latest = vehicles.filter((v) => v.status === "Active").slice(0, 4);

  const [searchWord, setSearchWord] = useState("");

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    store.setFilters({ ...DEFAULT_FILTERS, model: searchWord });
    store.navigate("browse");
  };

  return (
    <div id="home-view" className="bg-[#0A0A0A] text-white">
      {/* Cinematic Luxury Hero Area */}
      <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden px-4 sm:px-6 lg:px-8 border-b border-gray-950">
        {/* Extreme luxury background overlay */}
        <div className="absolute inset-0 bg-cover bg-center opacity-25 mix-blend-color-dodge transition-all duration-1000" 
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1511919884226-fd3cad34687c?q=80&w=1600')" }}>
        </div>
        
        {/* Golden vignette glow */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-[120px] pointer-events-none"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-[#F7E7CE]/5 rounded-full blur-[120px] pointer-events-none"></div>

        {/* Ambient Dark-reflection Grid pattern */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#121212_1px,transparent_1px),linear-gradient(to_bottom,#121212_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>

        <div className="relative max-w-6xl mx-auto text-center flex flex-col items-center gap-7 pt-12">
          
          <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-1 block">
            MUSEUM QUALITY HYPERCARS DISPATCH
          </span>

          <h1 className="text-5xl sm:text-7xl md:text-[100px] lg:text-[135px] leading-[0.85] font-black tracking-tighter uppercase text-white font-sans">
            TIMELESS SPEED<br/>
            <span className="stroke-text">SOVEREIGN CRAFT</span>
          </h1>

          <p className="font-sans text-xs sm:text-sm text-[#8B8B8B] tracking-wide max-w-xl mx-auto leading-relaxed">
            Acquire, consign, and showcase the planet's rarest automotive achievements. Privately audited chasses, fully secured financial escrows, global white-glove transport.
          </p>

          {/* Quick Search bar */}
          <form onSubmit={handleSearchSubmit} className="w-full max-w-2xl bg-[#0F0F0F]/80 backdrop-blur-md border border-gray-800 rounded-xl p-2 flex flex-col sm:flex-row gap-2 mt-4 shadow-2xl">
            <div className="flex-1 flex items-center gap-2.5 px-3">
              <Search className="h-4 w-4 text-gray-500" />
              <input
                type="text"
                value={searchWord}
                onChange={(e) => setSearchWord(e.target.value)}
                placeholder="Search Lamborghini, Ferrari, Hypercars..."
                className="w-full bg-transparent border-none text-xs text-white placeholder-gray-600 outline-none font-mono"
              />
            </div>
            <button
              type="submit"
              className="bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-semibold text-xs tracking-wider uppercase px-6 py-3 rounded-lg transition-colors duration-200"
            >
              Browse Showroom
            </button>
          </form>

        </div>
      </section>


      {/* Featured Vehicles Carousel Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-900">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-2 block">
              FEATURED SPECS CHASSES
            </span>
            <h2 className="font-sans text-4xl font-extrabold tracking-tighter uppercase text-white">
              The Curated Stable
            </h2>
          </div>
          <button
            onClick={() => { store.resetFilters(); store.navigate("browse"); }}
            className="group flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-gray-400 hover:text-[#D4AF37] transition"
          >
            <span>Inspect All Chasses</span>
            <ChevronRight className="h-4 w-4 text-gray-600 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {featured.map((car) => (
            <VehicleCard key={car.id} car={car} />
          ))}
        </div>
      </section>

      {/* Stats Panel */}
      <section className="bg-[#070707] border-y border-gray-900 py-16 my-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
            
            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight">$1.24B</span>
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-1">Consigned Outlay Volume</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-bold font-sans text-[#D4AF37] tracking-tight">150⁺</span>
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-1">Point Physical Audits</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight">98.4%</span>
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-1">NPS Client Valuation</span>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-3xl sm:text-4xl font-bold font-sans text-white tracking-tight">4</span>
              <span className="text-[10px] font-mono tracking-widest text-gray-500 uppercase mt-1">Universal Escrow Hubs</span>
            </div>

          </div>
        </div>
      </section>

      {/* Brands Grid block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-2 block">
            PRESTIGIOUS HOUSES
          </span>
          <h2 className="font-sans text-4xl font-extrabold tracking-tighter uppercase text-white mt-1">
            Partner Manufacturers
          </h2>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-8 gap-4">
          {BRANDS.map((brand) => (
            <button
              key={brand.id}
              onClick={() => store.navigate(`brand/${brand.id}`)}
              className="bg-[#0E0E0E] hover:bg-gray-950 border border-gray-900 hover:border-gray-800 rounded-xl p-5 text-center flex flex-col items-center justify-center gap-2 cursor-pointer transition"
            >
              <span className="text-3xl">{brand.logo}</span>
              <span className="text-xs font-mono text-gray-400 font-semibold tracking-wider uppercase mt-1">{brand.name}</span>
            </button>
          ))}
        </div>
      </section>

      {/* Product Categories display Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-900">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-2 block">
              BY DESIGN ARCHITECTURE
            </span>
            <h2 className="font-sans text-4xl font-extrabold tracking-tighter uppercase text-white mt-1">
              Chassis Classifications
            </h2>
          </div>
          <button onClick={() => store.navigate("categories")} className="text-xs font-mono text-gray-500 hover:text-white transition uppercase">All Shapes</button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {CATEGORIES.slice(0, 4).map((cat) => (
            <div
              key={cat.id}
              onClick={() => {
                store.setFilters({ ...DEFAULT_FILTERS, bodyType: cat.name });
                store.navigate("browse");
              }}
              className="group cursor-pointer bg-[#0E0E0E] border border-gray-900 hover:border-[#D4AF37]/50 rounded-xl overflow-hidden shadow transition relative h-56"
            >
              <img
                src={cat.img}
                alt={cat.name}
                className="w-full h-full object-cover opacity-30 group-hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-left">
                <span className="text-2xl mr-2">{cat.icon}</span>
                <h3 className="text-sm font-sans font-semibold uppercase tracking-wider text-white mt-2">{cat.name}</h3>
                <p className="text-[11px] text-gray-400 mt-0.5 line-clamp-2">{cat.description}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials Block */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 border-t border-gray-900">
        <div className="text-center mb-12">
          <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-2 block">
            VERIFIED LEDGER ASSURANCE
          </span>
          <h2 className="font-sans text-4xl font-extrabold tracking-tighter uppercase text-white mt-1">
            Connoisseur Endorsements
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#0E0E0E]/60 border border-gray-800 p-6 rounded-xl flex flex-col justify-between gap-6">
            <p className="text-xs text-gray-300 italic font-sans leading-relaxed">
              "LuxeDrive has revolutionized how I rotate assets in my Swiss compound. Their inspector spent 6 hours analyzing the paint depth of a Chiron I consigned, ensuring the eventual buyer received absolute transparency. The private escrow was dispatched within 2 hours of wire verification."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xs text-[#D4AF37]">H.N.</div>
              <div>
                <p className="text-xs font-mono text-white font-bold">Hans-Dieter Neuhaus</p>
                <p className="text-[10px] text-gray-550 font-mono">Bespoke Collector • Zürich</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0E0E0E]/60 border border-[#D4AF37]/35 p-6 rounded-xl flex flex-col justify-between gap-6 relative">
            <div className="absolute top-4 right-4 text-[#D4AF37] text-xs font-mono border border-[#D4AF37] rounded px-1 px-1.5">PATRON MEMBERSHIP</div>
            <p className="text-xs text-gray-300 italic font-sans leading-relaxed">
              "When coordinating high-ticket trades, absolute discretion is mandatory. We negotiated the purchase of a 911 GT3 RS with a seller in London completely out of public eye. LuxeDrive acted as the flawless, legally bound fiduciary agent. Impeccable white-glove logistics."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xs text-[#D4AF37]">L.M.</div>
              <div>
                <p className="text-xs font-mono text-white font-bold">Lady Montgomery</p>
                <p className="text-[10px] text-gray-550 font-mono">Sovereign Wealth Office • London</p>
              </div>
            </div>
          </div>

          <div className="bg-[#0E0E0E]/60 border border-gray-800 p-6 rounded-xl flex flex-col justify-between gap-6">
            <p className="text-xs text-gray-300 italic font-sans leading-relaxed">
              "The digital platform runs exactly like an F1 pit crew. Everything from dynamic pre-approvals on financing balloon terms to real-time chats with the asset owners is flawless. Highly recommended."
            </p>
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 bg-gray-800 rounded-full flex items-center justify-center font-bold text-xs text-[#D4AF37]">R.A.</div>
              <div>
                <p className="text-xs font-mono text-white font-bold">Rodrigo Al-Thani</p>
                <p className="text-[10px] text-gray-550 font-mono">Ventures Capital • Beverly Hills</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* Latest Listings Layout & CALL TO ACTION */}
      <section className="bg-[#0E0E0E]/40 border-t border-gray-900 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto flex flex-col gap-4 items-center">
            <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-1 block">
              READY FOR TRANSACTIONS?
            </span>
            <h2 className="font-sans text-5xl font-black tracking-tighter uppercase text-white">
              CONSIGN YOUR AUTOMOTIVE ART
            </h2>
            <p className="text-xs sm:text-sm text-[#8B8B8B] tracking-wide max-w-lg leading-relaxed">
              Unlock maximum international valuation. Reach pre-vetted family offices, sovereign groups, and private collectors. Let us design your custom campaign.
            </p>
            <div className="flex flex-wrap gap-4 mt-2 justify-center">
              <button
                onClick={() => store.navigate("sell")}
                className="bg-[#D4AF37] hover:bg-[#F7E7CE] text-black text-xs font-mono font-bold tracking-wider uppercase px-6 py-3 rounded-lg transition"
              >
                Launch Escrow Consignment
              </button>
              <button
                onClick={() => store.navigate("contact")}
                className="border border-gray-800 text-white hover:bg-gray-900 text-xs font-mono uppercase tracking-wider px-6 py-3 rounded-lg transition"
              >
                Inquire With Concierge
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// ==========================================
// 2. BROWSE SHOWROOM VIEW
// ==========================================
export function BrowseView() {
  const { vehicles, filters, sortKey, viewMode } = useGlobalStore();

  const [localSearch, setLocalSearch] = useState(filters.model);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    setLocalSearch(filters.model);
  }, [filters.model]);

  // Apply real-time client side filters
  const filteredVehicles = vehicles.filter((v) => {
    // Only show Active approved ones
    if (v.status !== "Active") return false;

    // Search query matches model or brand
    if (
      localSearch &&
      !v.model.toLowerCase().includes(localSearch.toLowerCase()) &&
      !v.brand.toLowerCase().includes(localSearch.toLowerCase())
    ) {
      return false;
    }

    // Brand filter
    if (filters.brand !== "All" && v.brand !== filters.brand) return false;

    // BodyType filter
    if (filters.bodyType !== "All" && v.bodyType !== filters.bodyType) return false;

    // Transmission
    if (filters.transmission !== "All" && v.transmission !== filters.transmission) return false;

    // FuelType
    if (filters.fuelType !== "All" && v.fuelType !== filters.fuelType) return false;

    // Price range
    if (v.price < filters.minPrice || v.price > filters.maxPrice) return false;

    // Year range
    if (v.year < filters.minYear || v.year > filters.maxYear) return false;

    return true;
  });

  // Sort filtered chasses
  const sortedVehicles = [...filteredVehicles].sort((a, b) => {
    switch (sortKey) {
      case "price-desc":
        return b.price - a.price;
      case "price-asc":
        return a.price - b.price;
      case "year-desc":
        return b.year - a.year;
      case "mileage-asc":
        return a.mileage - b.mileage;
      case "popular":
        return b.views - a.views;
      default:
        return b.isFeatured ? 1 : -1; // featured first
    }
  });

  const handleBrandFilter = (brandName: string) => {
    store.setFilters({ brand: brandName });
  };

  const handleBodyFilter = (body: string) => {
    store.setFilters({ bodyType: body });
  };

  const handleReset = () => {
    setLocalSearch("");
    store.resetFilters();
  };

  return (
    <div id="browse-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      {/* Search & Top Filters board */}
      <div className="flex flex-col gap-6 mb-8 border-b border-gray-900 pb-8">
        <div>
          <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-1.5 block">VETTED VAULT</span>
          <h1 className="font-sans text-5xl font-black tracking-tighter uppercase text-white mt-1">International Showroom</h1>
          <p className="text-xs text-gray-400 mt-1.5 font-sans leading-relaxed tracking-wide">
            Browse through {vehicles.filter(v => v.status === "Active").length} factory certified hypercars and collectors chasses with secure logistics.
          </p>
        </div>

        {/* Filters and Controls row */}
        <div className="flex flex-col md:flex-row gap-4 justify-between items-center bg-[#0C0C0C] border border-gray-900 p-4 rounded-xl shadow-md">
          
          {/* Quick inline search */}
          <div className="w-full md:w-80 bg-black/60 border border-gray-800 focus-within:border-[#D4AF37] rounded-lg px-3 py-1.5 flex items-center gap-2.5 transition">
            <Search className="h-4 w-4 text-gray-500" />
            <input
              type="text"
              value={localSearch}
              onChange={(e) => {
                setLocalSearch(e.target.value);
                store.setFilters({ model: e.target.value });
              }}
              placeholder="Search specifications, engine..."
              className="bg-transparent border-none text-xs text-white placeholder-gray-600 outline-none w-full font-mono"
            />
          </div>

          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto justify-end">
            
            {/* Show / Hide Filters Toggle */}
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 border px-4 py-2 rounded-lg text-xs font-mono transition cursor-pointer ${
                showFilters ? "border-[#D4AF37] text-white bg-gray-950" : "border-gray-800 text-gray-400 hover:text-white"
              }`}
            >
              <Sliders className="h-4 w-4" />
              <span>{showFilters ? "Close Filters" : "Advanced Filters"}</span>
            </button>

            {/* Layout selectors */}
            <div className="flex border border-gray-850 rounded-lg overflow-hidden">
              <button
                onClick={() => store.setViewMode("grid")}
                className={`p-2 transition ${viewMode === "grid" ? "bg-gray-900 text-[#D4AF37]" : "text-gray-500 hover:text-white bg-transparent"}`}
                title="Grid layout"
              >
                <LayoutGrid className="h-4 w-4" />
              </button>
              <button
                onClick={() => store.setViewMode("list")}
                className={`p-2 transition ${viewMode === "list" ? "bg-gray-900 text-[#D4AF37]" : "text-gray-500 hover:text-white bg-transparent"}`}
                title="List layout"
              >
                <LayoutList className="h-4 w-4" />
              </button>
            </div>

            {/* Sort Dropdown */}
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-gray-500 uppercase">SORT BY:</span>
              <select
                value={sortKey}
                onChange={(e) => store.setSort(e.target.value)}
                className="bg-[#0B0B0B] border border-gray-800 text-xs text-white rounded-lg px-2.5 py-1.5 font-mono outline-none focus:border-[#D4AF37]"
              >
                <option value="featured">Featured Allocation</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="year-desc">Year: Newest Built</option>
                <option value="mileage-asc">Mileage: Lowest Run</option>
                <option value="popular">Popularity Views</option>
              </select>
            </div>

          </div>

        </div>

      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Side Advanced Filter controls (Collapsible) */}
        {(showFilters || window.innerWidth > 1024) && (
          <div className="lg:col-span-1 flex flex-col gap-6 bg-[#0B0B0B] border border-gray-900 p-5 rounded-xl shadow-md self-start text-left">
            <div className="flex justify-between items-center border-b border-gray-850 pb-3">
              <h3 className="text-xs font-mono text-white tracking-widest uppercase font-bold">Query Parameters</h3>
              <button onClick={handleReset} className="text-[10px] font-mono text-[#D4AF37] hover:underline uppercase">Reset All</button>
            </div>

            {/* Manufacturer filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase">MANUFACTURER</label>
              <select
                value={filters.brand}
                onChange={(e) => handleBrandFilter(e.target.value)}
                className="bg-black border border-gray-800 text-xs text-gray-300 rounded-lg p-2 font-mono"
              >
                <option value="All">All Marques</option>
                {BRANDS.map((b) => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            {/* Body shape filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase">CHASSIS CLASSIFICATION</label>
              <select
                value={filters.bodyType}
                onChange={(e) => handleBodyFilter(e.target.value)}
                className="bg-black border border-gray-800 text-xs text-gray-300 rounded-lg p-2 font-mono"
              >
                <option value="All">All Classifications</option>
                <option value="Hypercar">Hypercar</option>
                <option value="Supercar">Supercar</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Luxury SUV">Luxury SUV</option>
                <option value="Convertible">Convertible</option>
                <option value="Coupe">Coupe</option>
                <option value="Sedan">Sedan</option>
              </select>
            </div>

            {/* Pricing range filter sliders */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase flex justify-between">
                <span>MAX VALUATION</span>
                <span className="text-[#D4AF37]">${(filters.maxPrice / 1000).toFixed(0)}k</span>
              </label>
              <input
                type="range"
                min="100000"
                max="5000000"
                step="50000"
                value={filters.maxPrice}
                onChange={(e) => store.setFilters({ maxPrice: Number(e.target.value) })}
                className="w-full accent-[#D4AF37] bg-gray-800 h-1 rounded cursor-pointer"
              />
            </div>

            {/* Transmission filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase">GEARBOX MECHANICS</label>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                {["All", "Dual-Clutch", "Automatic", "Manual"].map((trans) => (
                  <label key={trans} className="flex items-center gap-2 cursor-pointer py-0.5 hover:text-white transition">
                    <input
                      type="radio"
                      name="transmission"
                      checked={filters.transmission === trans}
                      onChange={() => store.setFilters({ transmission: trans })}
                      className="accent-[#D4AF37]"
                    />
                    <span>{trans}</span>
                  </label>
                ))}
              </div>
            </div>

            {/* Fuel Type filter */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-mono text-gray-400 uppercase">PROPULSION ENGINEERING</label>
              <div className="flex flex-col gap-1.5 text-xs text-gray-400">
                {["All", "Petrol", "Hybrid", "Electric"].map((fuel) => (
                  <label key={fuel} className="flex items-center gap-2 cursor-pointer py-0.5 hover:text-white transition">
                    <input
                      type="radio"
                      name="fuel"
                      checked={filters.fuelType === fuel}
                      onChange={() => store.setFilters({ fuelType: fuel })}
                      className="accent-[#D4AF37]"
                    />
                    <span>{fuel}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="bg-gray-950 p-2.5 rounded border border-gray-850 text-[10px] font-mono text-gray-500 leading-relaxed uppercase">
              <span>PROVENANCE DISCLOSURE: ALL SPECIMENS PASS CERTIFIED METALLURGY REPORT AUDITING.</span>
            </div>
          </div>
        )}

        {/* Showroom List/Grid mapping */}
        <div className={`lg:col-span-${showFilters || window.innerWidth > 1024 ? "3" : "4"} flex flex-col gap-8`}>
          
          {sortedVehicles.length === 0 ? (
            <div className="text-center py-20 px-4 border border-dashed border-gray-800 rounded-2xl bg-[#090909]/40">
              <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto mb-4" />
              <h3 className="text-lg font-sans font-semibold text-white">No Matching Chasses Confirmed</h3>
              <p className="text-xs text-gray-400 mt-1 max-w-sm mx-auto">
                No active factory listings found matching current filters. Try resetting the telemetry metrics.
              </p>
              <button
                onClick={handleReset}
                className="mt-5 bg-[#D4AF37] text-black text-xs font-mono font-semibold px-4 py-2.5 rounded-lg"
              >
                Reset Engine Queries
              </button>
            </div>
          ) : (
            <>
              <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8" : "flex flex-col gap-6"}>
                {sortedVehicles.map((car) => {
                  if (viewMode === "grid") {
                    return <VehicleCard key={car.id} car={car} />;
                  } else {
                    return <VehicleListRow key={car.id} car={car} />;
                  }
                })}
              </div>

              {/* Secure Paginate indicator */}
              <div className="flex justify-between items-center bg-[#0C0C0C]/40 border border-gray-900 rounded-xl p-4 text-xs font-mono text-gray-500 mt-4">
                <span>Displaying {sortedVehicles.length} of {sortedVehicles.length} Certified listings</span>
                <div className="flex gap-2">
                  <button disabled className="border border-gray-850 px-2.5 py-1 rounded text-gray-700 cursor-not-allowed">PREV</button>
                  <button disabled className="border border-[#D4AF37] px-2.5 py-1 rounded text-white bg-gray-900">1</button>
                  <button disabled className="border border-gray-850 px-2.5 py-1 rounded text-gray-700 cursor-not-allowed">NEXT</button>
                </div>
              </div>
            </>
          )}

        </div>

      </div>

    </div>
  );
}

// ==========================================
// 3. CAR DETAILS VIEW (The Interactive Virtual Showroom)
// ==========================================
export function VehicleDetailsView({ id }: { id: string }) {
  const { vehicles, savedVehicleIds, currentUser } = useGlobalStore();
  const car = vehicles.find((v) => v.id === id);

  const [activeImgIndex, setActiveImgIndex] = useState(0);
  const [scrubAngle, setScrubAngle] = useState(0); // 0 to 4 (represent dynamic lighting/rotational perspectives!)
  const [is360Mode, setIs360Mode] = useState(false);
  const [scheduleDate, setScheduleDate] = useState("");
  const [scheduleTime, setScheduleTime] = useState("10:00 AM");
  const [inquiryText, setInquiryText] = useState("");
  const [modalOpen, setModalOpen] = useState<"none" | "schedule" | "offer">("none");

  if (!car) {
    return (
      <div className="text-center py-20 bg-[#0A0A0A]">
        <AlertCircle className="h-12 w-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold font-sans text-white mt-4">Asset Code Mismatch</h2>
        <p className="text-xs text-gray-400 mt-1">This chassis has been rotated from our active escrow index.</p>
        <button onClick={() => store.navigate("browse")} className="mt-6 bg-[#D4AF37] text-black text-xs font-mono font-semibold px-4 py-2 rounded">
          Return To Showroom
        </button>
      </div>
    );
  }

  // Pre-calculated orbital angle mock paths based on original image
  const scrubAngles = [
    car.images[0],
    "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=1200", // front-right
    "https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200", // side-profile
    "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?q=80&w=1200", // rear-quarter
    car.images[1] || car.images[0] // interior cockpit
  ];

  const handleToggleWishlist = () => {
    store.toggleWishlist(car.id);
  };

  const handleConsignInquiry = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Please access an authorized session to engage fiduciaries.");
      store.navigate("login");
      return;
    }
    store.sendMessage(car.sellerId, inquiryText || `Interested in configuring purchase escrow details for the ${car.brand} ${car.model}.`, car.id, `${car.brand} ${car.model}`);
    setInquiryText("");
    setModalOpen("none");
    alert("Inquiry registered! Navigating to your secure concierge dispatch portal.");
    store.navigate("dashboard/messages");
  };

  const handleScheduleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Secure showroom viewing scheduled on ${scheduleDate} at ${scheduleTime}. A private executive host will escort you shortly.`);
    setModalOpen("none");
  };

  const isFavorited = savedVehicleIds.includes(car.id);

  return (
    <div id="car-details-page" className="bg-[#0A0A0A] text-white">
      
      {/* Dynamic Sub-header Navigation parameters */}
      <div className="bg-[#0C0C0C] border-b border-gray-900 py-4 font-mono text-[11px] text-gray-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center py-1">
          <div className="flex items-center gap-1.5">
            <button onClick={() => store.navigate("home")} className="hover:text-white transition">LUXEDRIVE</button>
            <ChevronRight className="h-3 w-3" />
            <button onClick={() => store.navigate("browse")} className="hover:text-white transition">SHOWROOM</button>
            <ChevronRight className="h-3 w-3" />
            <span className="text-white font-semibold uppercase">{car.brand} {car.model}</span>
          </div>
          <div className="flex items-center gap-4">
            <span className="text-[10px] bg-gray-900 border border-gray-850 px-2 py-0.5 rounded text-emerald-400 font-mono">CONFIRMED GENUINE CHASSIS</span>
            <span className="text-gray-400">CHASSIS REF #: #{car.id.toUpperCase()}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col gap-10">
        
        {/* Gallery & Interactive angle board */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          <div className="lg:col-span-8 flex flex-col gap-4">
            
            {/* Massive Display panel */}
            <div className="bg-[#080808] border border-gray-900 rounded-2xl relative overflow-hidden flex items-center justify-center min-h-[300px] md:min-h-[460px]">
              
              {is360Mode ? (
                /* Orbital external scrubber view */
                <div className="w-full h-full flex flex-col items-center justify-center p-4">
                  <img
                    src={scrubAngles[scrubAngle]}
                    alt={`${car.brand} orbital view`}
                    className="w-full h-auto max-h-[360px] object-contain select-none pointer-events-none rounded transition-opacity duration-300"
                    referrerPolicy="no-referrer"
                  />
                  <div className="w-full max-w-sm mt-4 flex flex-col gap-1.5 px-4">
                    <div className="flex justify-between items-center text-[10px] font-mono text-gray-400">
                      <span>STANCE SCRUBBER</span>
                      <span>PERSPECTIVE {scrubAngle * 90}° DIRECTION</span>
                    </div>
                    <input
                      type="range"
                      min="0"
                      max="4"
                      value={scrubAngle}
                      onChange={(e) => setScrubAngle(Number(e.target.value))}
                      className="w-full accent-[#D4AF37] bg-gray-800 h-1 rounded cursor-pointer"
                    />
                  </div>
                </div>
              ) : (
                /* Classic full image zoom view */
                <img
                  src={car.images[activeImgIndex] || car.images[0]}
                  alt={`${car.brand} spec sheet`}
                  className="w-full h-auto max-h-[440px] object-contain rounded p-2"
                  referrerPolicy="no-referrer"
                />
              )}

              {/* Angle View toggles */}
              <div className="absolute top-4 right-4 flex gap-1 bg-black/85 backdrop-blur border border-gray-850 rounded-lg p-1 text-xs">
                <button
                  onClick={() => setIs360Mode(false)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded transition ${
                    !is360Mode ? "bg-[#D4AF37] text-black" : "text-gray-400 hover:text-white"
                  }`}
                >
                  Gallery
                </button>
                <button
                  onClick={() => setIs360Mode(true)}
                  className={`px-2.5 py-1 text-[10px] font-mono uppercase rounded transition-all ${
                    is360Mode ? "bg-[#D4AF37] text-black font-semibold" : "text-gray-400 hover:text-white animate-pulse"
                  }`}
                >
                  360° Studio
                </button>
              </div>

              {/* Extreme chassis views index */}
              <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md border border-gray-850 rounded px-2.5 py-1 font-mono text-[10px] text-gray-500">
                <span>VIEWS INVENTORY: {car.views} INQUIRIES: {car.inquiries}</span>
              </div>
            </div>

            {/* Sub-thumb grid */}
            {!is360Mode && (
              <div className="grid grid-cols-4 gap-3">
                {car.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImgIndex(i)}
                    className={`bg-[#0C0C0C] border rounded-lg h-24 overflow-hidden relative group cursor-pointer ${
                      activeImgIndex === i ? "border-[#D4AF37]" : "border-gray-900"
                    }`}
                  >
                    <img
                      src={img}
                      alt="Thumbnail spec"
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                      referrerPolicy="no-referrer"
                    />
                  </button>
                ))}
              </div>
            )}

          </div>

          {/* Secure Purchase Control board */}
          <div className="lg:col-span-4 bg-[#0E0E0E] border border-gray-900 rounded-2xl p-6 flex flex-col justify-between gap-6 relative shadow-lg text-left">
            
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">{car.year} BUILD YEAR</span>
                <button
                  onClick={handleToggleWishlist}
                  className={`p-1.5 rounded-full border transition ${
                    isFavorited ? "border-red-900/60 bg-red-900/10 text-red-500" : "border-gray-850 text-gray-500 hover:text-white"
                  }`}
                >
                  <Heart className="h-4 w-4" fill={isFavorited ? "currentColor" : "none"} />
                </button>
              </div>

              <h1 className="font-sans text-2xl sm:text-3xl font-bold tracking-tight text-white mt-1">
                {car.brand} <br />
                <span className="text-gray-400">{car.model}</span>
              </h1>
              
              <div className="flex items-baseline gap-1.5 mt-2">
                <span className="text-2xl sm:text-3xl font-bold font-sans text-white">
                  ${car.price.toLocaleString()}
                </span>
                <span className="text-[10px] font-mono text-gray-400 uppercase">AUDITED VAT EXCLUDED</span>
              </div>

              <p className="text-xs text-gray-400 leading-relaxed mt-2 line-clamp-4">
                {car.description}
              </p>
            </div>

            {/* Spec chips */}
            <div className="grid grid-cols-2 gap-2 border-t border-b border-gray-900 py-4 text-xs font-mono">
              <div className="bg-[#080808] border border-gray-950 p-2.5 rounded flex flex-col gap-0.5">
                <span className="text-[9px] text-gray-550 uppercase">POWER STRENGTH</span>
                <span className="text-white font-semibold">{car.power}</span>
              </div>
              <div className="bg-[#080808] border border-gray-950 p-2.5 rounded flex flex-col gap-0.5">
                <span className="text-[9px] text-gray-550 uppercase">0-60 MPH LAUNCH</span>
                <span className="text-[#D4AF37] font-semibold">{car.acceleration}</span>
              </div>
              <div className="bg-[#080808] border border-gray-950 p-2.5 rounded flex flex-col gap-0.5">
                <span className="text-[9px] text-gray-550 uppercase">PEAK SPEED</span>
                <span className="text-white font-semibold">{car.topSpeed}</span>
              </div>
              <div className="bg-[#080808] border border-gray-950 p-2.5 rounded flex flex-col gap-0.5">
                <span className="text-[9px] text-gray-550 uppercase">ENGINE LAYOUT</span>
                <span className="text-white truncate font-semibold" title={car.engine}>{car.engine}</span>
              </div>
            </div>

            {/* Escrow seller card info */}
            <div className="bg-gray-950 p-3 rounded-xl border border-gray-900 flex items-center justify-between gap-4">
              <div className="flex items-center gap-2">
                <img
                  src={car.sellerAvatar}
                  alt={car.sellerName}
                  className="h-8 w-8 rounded-full border border-gray-800"
                  referrerPolicy="no-referrer"
                />
                <div className="text-left leading-tight">
                  <p className="text-xs font-mono font-bold text-white leading-none">{car.sellerName}</p>
                  <p className="text-[9px] text-gray-500 font-mono mt-0.5">Verified Fiduciary Member</p>
                </div>
              </div>
              <div className="flex items-center gap-1 font-mono text-[11px] text-white">
                <Star className="h-3 w-3 text-yellow-500 fill-yellow-500" />
                <span>{car.sellerRating.toFixed(1)}</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col gap-2.5">
              <button
                onClick={() => setModalOpen("offer")}
                className="w-full bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-200"
              >
                Inquire For Procurement
              </button>
              <button
                onClick={() => setModalOpen("schedule")}
                className="w-full border border-gray-800 hover:bg-gray-900 text-white font-sans text-xs tracking-wider uppercase py-3.5 rounded-xl transition-all duration-200"
              >
                Schedule Showroom Viewing
              </button>
            </div>

          </div>

        </div>

        {/* Extended Vehicle Technical Specifications */}
        <section className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start text-left border-t border-gray-900 pt-10">
          
          <div className="md:col-span-4">
            <h3 className="text-xs font-mono text-[#D4AF37] tracking-widest uppercase mb-1">AUDIT PORTFOLIO</h3>
            <h2 className="text-2xl font-sans font-bold text-white">Technical Dossier</h2>
            <p className="text-xs text-gray-400 mt-2 leading-relaxed">
              Every designated hypercar is subjected to absolute digital spectroscopy and visual paint validation logs before listing.
            </p>
          </div>

          <div className="md:col-span-8 bg-[#0E0E0E]/40 border border-gray-900 rounded-2xl p-6 grid grid-cols-2 gap-x-8 gap-y-4 font-mono text-xs">
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Chassis Body Classification</span>
              <span className="text-white font-medium">{car.bodyType}</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Powertrain Engineering</span>
              <span className="text-white font-medium">{car.fuelType}</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Transmission Gears</span>
              <span className="text-white font-medium">{car.transmission}</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Year of Commission</span>
              <span className="text-white font-medium">{car.year}</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Odometer Run</span>
              <span className="text-white font-medium">{car.mileage.toLocaleString()} miles</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Primary Skin Paint</span>
              <span className="text-white font-medium truncate max-w-[150px]" title={car.color}>{car.color}</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Bespoke Cabin Hide</span>
              <span className="text-white font-medium truncate max-w-[150px]" title={car.interiorColor}>{car.interiorColor}</span>
            </div>
            <div className="flex justify-between border-b border-gray-900 pb-2.5">
              <span className="text-gray-500">Escrow Hub Registry</span>
              <span className="text-[#D4AF37] font-medium">{car.location}</span>
            </div>
          </div>

        </section>

        {/* Financing Calculator Box */}
        <section className="border-t border-gray-900 pt-10">
          <FinancingCalculator vehiclePrice={car.price} vehicleModel={`${car.brand} ${car.model}`} />
        </section>

      </div>

      {/* MODAL WINDOWS FOR SCHEDULING INSPECTIONS OR SENDING OFFERS */}
      {modalOpen !== "none" && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-[#0E0E0E] border border-gray-800 rounded-2xl max-w-md w-full p-6 text-left relative shadow-2xl">
            
            <button
              onClick={() => setModalOpen("none")}
              className="absolute top-4 right-4 text-gray-500 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>

            {modalOpen === "schedule" ? (
              <form onSubmit={handleScheduleSubmit} className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">INSPECTION ESCORT</span>
                  <h3 className="text-lg font-sans font-bold text-white mt-1">Book Showroom Slot</h3>
                  <p className="text-xs text-gray-400 mt-1">Schedule a private holding suite tour with our master inspectors.</p>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">SELECT DAY</label>
                  <input
                    type="date"
                    required
                    value={scheduleDate}
                    onChange={(e) => setScheduleDate(e.target.value)}
                    className="bg-black border border-gray-800 rounded-lg p-2.5 text-xs font-mono text-white"
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-[10px] font-mono text-gray-500 uppercase">SELECT PREFERRED TIME</label>
                  <select
                    value={scheduleTime}
                    onChange={(e) => setScheduleTime(e.target.value)}
                    className="bg-black border border-gray-800 rounded-lg p-2.5 text-xs font-mono text-white"
                  >
                    <option>09:00 AM</option>
                    <option>11:00 AM</option>
                    <option>01:00 PM</option>
                    <option>03:00 PM</option>
                    <option>05:00 PM (Sunset Hour)</option>
                  </select>
                </div>

                <button
                  type="submit"
                  className="bg-[#D4AF37] text-black font-sans font-semibold text-xs py-3 rounded-lg mt-2 uppercase tracking-wide"
                >
                  Confirm Showroom Dispatch
                </button>
              </form>
            ) : (
              <form onSubmit={handleConsignInquiry} className="flex flex-col gap-4">
                <div>
                  <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">ESCROW PROCUREMENT</span>
                  <h3 className="text-lg font-sans font-bold text-white mt-1">Inquire Valuation & Terms</h3>
                  <p className="text-xs text-gray-400 mt-1">Dispatch secure questions to the legal fiduciary regarding contracts.</p>
                </div>

                <div className="flex flex-col gap-1.5 mt-2">
                  <label className="text-[10px] font-mono text-gray-500 uppercase font-bold">MESSAGE RECORD TEXT</label>
                  <textarea
                    required
                    rows={4}
                    value={inquiryText}
                    onChange={(e) => setInquiryText(e.target.value)}
                    placeholder={`Interested in purchasing original chassis of the ${car.brand} ${car.model}. Please send escrow details...`}
                    className="bg-black border border-gray-800 focus:border-[#D4AF37] rounded-lg p-2.5 text-xs text-white placeholder-gray-600 outline-none resize-none font-mono"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="bg-[#D4AF37] text-black font-sans font-bold text-xs py-3 rounded-lg mt-2 uppercase tracking-widest"
                >
                  Dispatch Secured Message
                </button>
              </form>
            )}

          </div>
        </div>
      )}

    </div>
  );
}

// ==========================================
// 4. SELL YOUR CAR VIEW (Consign Asset Wizard)
// ==========================================
export function SellYourCarView() {
  const { currentUser } = useGlobalStore();

  const [step, setStep] = useState(1);
  const [brand, setBrand] = useState("Lamborghini");
  const [model, setModel] = useState("");
  const [year, setYear] = useState(2025);
  const [price, setPrice] = useState(450000);
  const [mileage, setMileage] = useState(150);
  const [bodyType, setBodyType] = useState<any>("Hypercar");
  const [fuelType, setFuelType] = useState<any>("Petrol");
  const [transmission, setTransmission] = useState<any>("Dual-Clutch");
  const [engine, setEngine] = useState("");
  const [power, setPower] = useState("");
  const [acceleration, setAcceleration] = useState("");
  const [topSpeed, setTopSpeed] = useState("");
  const [color, setColor] = useState("");
  const [location, setLocation] = useState("Monaco");
  const [description, setDescription] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  const handlePublish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) {
      alert("Authorized session required to register escrow commissions.");
      store.navigate("login");
      return;
    }

    const defaultImg = imageUrl || "https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?q=80&w=800";

    store.addListing({
      brand,
      model,
      year,
      price,
      mileage,
      fuelType,
      transmission,
      bodyType,
      engine: engine || "6.0L V12",
      power: power || "800 HP",
      acceleration: acceleration || "0-60 in 2.8s",
      topSpeed: topSpeed || "210 mph",
      color: color || "Grigio Titanio (Silver Metallic)",
      interiorColor: "Nero Full Hide",
      location,
      description: description || "Prestige collectors specimen with perfect factory documentation dossier.",
      images: [defaultImg, "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800"]
    });

    alert("Chassis successfully consigned! Status is set to 'Pending Review' awaiting factory catalog auditing.");
    store.navigate("dashboard/listings");
  };

  return (
    <div id="sell-car-page" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      
      {/* Intro header */}
      <div className="border-b border-gray-900 pb-6 mb-8 text-center">
        <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">CONSIGN ASSET PROCESS UNIT</span>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">Consign Asset Platform</h1>
        <p className="text-xs text-gray-400 mt-2 max-w-sm mx-auto">
          Consign your high-value vehicle securely. Our global legal network handles title transfer, physical auditing, and prompt wires.
        </p>
      </div>

      {/* Progress metrics */}
      <div className="flex justify-between items-center bg-[#0C0C0C] border border-gray-900 rounded-xl p-4 font-mono text-xs mb-8">
        <div className="flex gap-4">
          <span className={step >= 1 ? "text-[#D4AF37]" : "text-gray-600"}>1. SPECIFICATIONS</span>
          <span className="text-gray-700">|</span>
          <span className={step >= 2 ? "text-[#D4AF37]" : "text-gray-600"}>2. PRICING & MEDIA</span>
          <span className="text-gray-700">|</span>
          <span className={step >= 3 ? "text-[#D4AF37]" : "text-[#D4AF37]/40"}>3. CONSIGN REVIEW</span>
        </div>
        <span className="text-white">STEP {step} / 3</span>
      </div>

      {/* Step 1: Specs */}
      {step === 1 && (
        <div className="bg-[#0E0E0E] p-6 rounded-xl border border-gray-900 flex flex-col gap-5">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase mb-1">Vehicle Classification</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Brand/Marque</label>
              <select value={brand} onChange={(e) => setBrand(e.target.value)} className="bg-black border border-gray-805 rounded p-2.5 text-white">
                {BRANDS.map(b => (
                  <option key={b.id} value={b.name}>{b.name}</option>
                ))}
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Model Specification</label>
              <input
                type="text"
                required
                value={model}
                onChange={(e) => setModel(e.target.value)}
                placeholder="e.g. Aventador SVJ Coupe"
                className="bg-black border border-gray-805 rounded p-2.5 text-white outline-none focus:border-[#D4AF37]"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Commision year</label>
              <input
                type="number"
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="bg-black border border-gray-805 rounded p-2.5 text-white outline-none"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Chassis Class</label>
              <select value={bodyType} onChange={(e: any) => setBodyType(e.target.value)} className="bg-black border border-gray-810 rounded p-2.5 text-white">
                <option value="Hypercar">Hypercar</option>
                <option value="Supercar">Supercar</option>
                <option value="Sports Car">Sports Car</option>
                <option value="Luxury SUV">Luxury SUV</option>
                <option value="Convertible">Convertible</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Engine Details</label>
              <input
                type="text"
                value={engine}
                onChange={(e) => setEngine(e.target.value)}
                placeholder="e.g. 6.5L NA V12"
                className="bg-black border border-gray-805 rounded p-2.5 text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Power Output</label>
              <input
                type="text"
                value={power}
                onChange={(e) => setPower(e.target.value)}
                placeholder="e.g. 770 HP"
                className="bg-black border border-gray-805 rounded p-2.5 text-white"
              />
            </div>

          </div>

          <button
            onClick={() => {
              if (!model) {
                alert("Please declare the precise model layout.");
                return;
              }
              setStep(2);
            }}
            className="w-full bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold text-xs py-3 rounded-lg uppercase tracking-wide mt-4"
          >
            Advance Specifications
          </button>
        </div>
      )}

      {/* Step 2: PRICING & MEDIA */}
      {step === 2 && (
        <div className="bg-[#0E0E0E] p-6 rounded-xl border border-gray-900 flex flex-col gap-5">
          <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase mb-1">Pricing & Image Host</h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-xs">
            
            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Asset Target Valuation ($)</label>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="bg-black border border-gray-805 rounded p-2.5 text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Exact Mileage Run</label>
              <input
                type="number"
                value={mileage}
                onChange={(e) => setMileage(Number(e.target.value))}
                className="bg-black border border-gray-805 rounded p-2.5 text-white"
              />
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Consign Location Desk</label>
              <select value={location} onChange={(e) => setLocation(e.target.value)} className="bg-black border border-[#111] rounded p-2.5 text-white">
                <option value="Beverly Hills, USA">Beverly Hills</option>
                <option value="Monaco">Monaco Escrow Office</option>
                <option value="London, UK">London Hub</option>
                <option value="Zurich, Switzerland">Zürich Vault</option>
              </select>
            </div>

            <div className="flex flex-col gap-1">
              <label className="text-gray-500 uppercase">Exterior Color Finish</label>
              <input
                type="text"
                value={color}
                onChange={(e) => setColor(e.target.value)}
                placeholder="e.g. Monterey Bronze Pearl"
                className="bg-black border border-gray-805 rounded p-2.5 text-white"
              />
            </div>

          </div>

          <div className="flex flex-col gap-1 font-mono text-xs">
            <label className="text-gray-500 uppercase">Automotive Image URL</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800"
              className="bg-black border border-[#121212] rounded p-2.5 text-xs text-white"
            />
            <p className="text-[10px] text-gray-500 mt-1">Leave empty to use high-contrast factory placeholders.</p>
          </div>

          {/* Drag & Drop mock panel */}
          <div className="border border-dashed border-gray-800 rounded-xl p-8 text-center bg-gray-950/40 font-mono text-xs text-gray-550">
            <span>Drag and drop certified registry files or title deeds to bind</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(1)}
              className="flex-1 border border-gray-800 hover:bg-gray-900 text-white font-mono text-xs py-3 rounded-lg uppercase"
            >
              PREVIOUS
            </button>
            <button
              onClick={() => setStep(3)}
              className="flex-1 bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold text-xs py-3 rounded-lg uppercase"
            >
              PREVIEW CONSIGNMENT
            </button>
          </div>
        </div>
      )}

      {/* Step 3: PREVIEW REVIEW */}
      {step === 3 && (
        <form onSubmit={handlePublish} className="bg-[#0E0E0E] p-6 rounded-xl border border-gray-900 flex flex-col gap-6">
          <div>
            <h2 className="text-sm font-mono text-[#D4AF37] tracking-wider uppercase mb-1">Verification Commission Ledger</h2>
            <p className="text-xs text-gray-400">Please review the details prior to legal submission.</p>
          </div>

          <div className="bg-black/60 border border-gray-850 rounded-xl p-4 font-mono text-xs flex flex-col gap-2">
            <div className="flex justify-between border-b border-gray-900 pb-1.5"><span className="text-gray-500">MANUFACTURER</span><span className="text-white uppercase font-bold">{brand}</span></div>
            <div className="flex justify-between border-b border-gray-900 pb-1.5"><span className="text-gray-500">MODEL SPECIFICATION</span><span className="text-white font-bold">{model}</span></div>
            <div className="flex justify-between border-b border-gray-900 pb-1.5"><span className="text-gray-500">BUILD YEAR</span><span className="text-white">{year}</span></div>
            <div className="flex justify-between border-b border-gray-900 pb-1.5"><span className="text-gray-500">TARGET PRICE</span><span className="text-[#D4AF37] font-bold">${price.toLocaleString()}</span></div>
            <div className="flex justify-between border-b border-gray-900 pb-1.5"><span className="text-gray-500">Clearance mileage</span><span className="text-white">{mileage} miles</span></div>
            <div className="flex justify-between"><span className="text-gray-500">Escrow Hub</span><span className="text-white">{location}</span></div>
          </div>

          <div className="font-mono text-[10px] text-yellow-500 bg-yellow-500/5 border border-yellow-500/20 p-3 rounded-lg leading-relaxed flex gap-2">
            <AlertCircle className="h-4 w-4 shrink-0 mt-0.5" />
            <span>Submission legally binds LuxeDrive to execute a physical appraisal of this asset within 48 hours. Title checks will be performed against Interpol ledgers.</span>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => setStep(2)}
              className="flex-1 border border-gray-800 hover:bg-gray-900 text-white font-mono text-xs py-3 rounded-lg uppercase"
            >
              PREVIOUS
            </button>
            <button
              type="submit"
              className="flex-1 bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold text-xs py-3 rounded-lg uppercase tracking-wider"
            >
              LAUNCH FIDUCIARY AUDIT
            </button>
          </div>
        </form>
      )}

    </div>
  );
}

// ==========================================
// 5. BRANDS MATRIX VIEW
// ==========================================
export function BrandsView() {
  return (
    <div id="brands-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-1.5 block">THE HERITAGE INDEX</span>
        <h1 className="font-sans text-5xl font-black tracking-tighter uppercase text-white mt-1">Automotive Houses</h1>
        <p className="text-xs text-gray-400 mt-2 font-sans tracking-wide">Explore the historical, engineering-driven lineage of our partner supercar manufacturers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
        {BRANDS.map((brand) => (
          <div
            key={brand.id}
            onClick={() => store.navigate(`brand/${brand.id}`)}
            className="group cursor-pointer bg-[#0E0E0E] border border-gray-950 hover:border-[#D4AF37]/50 rounded-xl overflow-hidden shadow transition flex flex-col justify-between"
          >
            <div className="h-44 overflow-hidden relative">
              <img
                src={brand.featuredImg}
                alt={brand.name}
                className="w-full h-full object-cover group-hover:scale-105 duration-500 transition-transform"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent"></div>
              <span className="absolute top-4 left-4 text-3xl bg-black/40 backdrop-blur rounded p-2">{brand.logo}</span>
            </div>
            
            <div className="p-5 flex-1 flex flex-col justify-between gap-3">
              <div className="flex flex-col gap-1">
                <h3 className="text-base font-sans font-bold text-white uppercase">{brand.name}</h3>
                <p className="text-[11px] font-mono text-gray-500 uppercase tracking-widest">{brand.country} • FOUNDED {brand.founded}</p>
              </div>
              <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed">
                {brand.story}
              </p>
              <span className="text-[10px] font-mono text-[#D4AF37] group-hover:underline uppercase flex items-center gap-1.5 mt-2">
                <span>Explore brand chasses</span>
                <ChevronRight className="h-3.5 w-3.5" />
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 6. BRAND DETAILS VIEW
// ==========================================
export function BrandDetailsView({ id }: { id: string }) {
  const { vehicles } = useGlobalStore();
  const brand = BRANDS.find((b) => b.id === id);

  if (!brand) {
    return (
      <div className="text-center py-20 bg-black">
        <AlertCircle className="h-10 w-10 text-yellow-500 mx-auto" />
        <h2 className="text-lg font-bold text-white mt-4">Brand Not Logged</h2>
        <button onClick={() => store.navigate("brands")} className="mt-5 bg-[#D4AF37] px-4 py-2 text-black text-xs font-mono">Back to All Brands</button>
      </div>
    );
  }

  const brandVehicles = vehicles.filter((v) => v.brand.toLowerCase() === brand.name.toLowerCase() && v.status === "Active");

  return (
    <div id="brand-detail" className="bg-[#0A0A0A] text-white">
      {/* Brand Hero Story */}
      <section className="relative h-[55vh] flex items-center justify-center overflow-hidden border-b border-gray-900">
        <img
          src={brand.featuredImg}
          alt={brand.name}
          className="absolute inset-0 w-full h-full object-cover opacity-25"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A] via-[#0A0A0A]/50 to-transparent"></div>
        
        <div className="relative text-center max-w-2xl px-4 flex flex-col gap-3">
          <span className="text-3xl bg-black/40 backdrop-blur rounded p-2.5 self-center">{brand.logo}</span>
          <p className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">{brand.country} • COMMISSION EST. {brand.founded}</p>
          <h1 className="text-4xl sm:text-5xl font-sans font-bold uppercase tracking-tight text-white">{brand.name}</h1>
        </div>
      </section>

      {/* Brand Story and Active Listings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 text-left">
        
        <div className="lg:col-span-4 flex flex-col gap-4">
          <h3 className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">Historical Narrative</h3>
          <p className="text-xs text-gray-300 leading-relaxed bg-[#0E0E0E] border border-gray-900 p-5 rounded-xl font-sans">
            {brand.story}
          </p>
        </div>

        <div className="lg:col-span-8">
          <h2 className="text-sm font-mono tracking-widest text-white uppercase border-b border-gray-900 pb-3 mb-6">Available Brand allocations ({brandVehicles.length})</h2>

          {brandVehicles.length === 0 ? (
            <div className="text-center py-16 bg-gray-950/40 border border-dashed border-gray-900 rounded-xl">
              <span className="text-xs text-gray-500 font-mono">No active chasses on site today. Submissions are welcome.</span>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {brandVehicles.map((car) => (
                <VehicleCard key={car.id} car={car} />
              ))}
            </div>
          )}
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 7. CATEGORIES MATRIX VIEW
// ==========================================
export function CategoriesView() {
  return (
    <div id="categories-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-[11px] font-bold tracking-[0.5em] text-[#D4AF37] uppercase mb-1.5 block">ENGINEERING PHYSIQUE</span>
        <h1 className="font-sans text-5xl font-black tracking-tighter uppercase text-white mt-1">Design Classes</h1>
        <p className="text-xs text-gray-400 mt-2 font-sans tracking-wide">Locate your preferred speed style based on carbon design silhouettes.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 text-left">
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => {
              store.setFilters({ ...DEFAULT_FILTERS, bodyType: cat.name });
              store.navigate("browse");
            }}
            className="group cursor-pointer bg-[#0E0E0E] border border-gray-950 hover:border-[#D4AF37]/50 rounded-xl overflow-hidden relative shadow transition h-64 flex flex-col justify-end"
          >
            <img
              src={cat.img}
              alt={cat.name}
              className="absolute inset-0 w-full h-full object-cover opacity-25 group-hover:scale-105 duration-700 transition-transform"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent"></div>
            
            <div className="p-5 relative z-10 flex flex-col gap-1.5">
              <div className="flex items-center gap-2">
                <span className="text-2xl">{cat.icon}</span>
                <h3 className="text-base font-sans font-bold text-white uppercase tracking-wider">{cat.name}</h3>
              </div>
              <p className="text-xs text-gray-400 font-sans leading-relaxed">
                {cat.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 8. ABOUT US (Heritage view)
// ==========================================
export function AboutView() {
  return (
    <div id="about-us" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="text-center mb-12 border-b border-gray-900 pb-6">
        <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">ESTABLISHED MEMORANDUM</span>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">The LuxeDrive Heritage</h1>
        <p className="text-xs text-gray-400 mt-2 max-w-md mx-auto">Founded in Monaco in 2026 to elevate global high-asset automotive procurement to fine-art guidelines.</p>
      </div>

      <div className="flex flex-col gap-10 text-xs text-gray-400 font-sans leading-relaxed">
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-mono text-white uppercase">Sovereign Mission</h3>
            <p>
              We exist to dismantle the noise and lack of transparency historically inherent in high-ticket vehicle transactions. By injecting rigid physical inspections, factory metadata verification, and legally compliant escrow frameworks, we configure purchase certainty.
            </p>
          </div>
          <div className="flex flex-col gap-3">
            <h3 className="text-sm font-mono text-white uppercase">Sovereign Vision</h3>
            <p>
              To act as the permanent universal digital registry for hypercars. A rolling ledger of paint depth, metallurgy reports, and verified title histories, allowing family offices and collectors to trade globally smoothly in any weather.
            </p>
          </div>
        </div>

        <div className="border-t border-gray-900 pt-8">
          <h3 className="text-sm font-mono text-[#D4AF37] uppercase mb-4">Core Operating Principles</h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-mono text-xs">
            <div className="bg-[#0E0E0E] p-4 border border-gray-950 rounded-xl">
              <span className="text-white font-bold block mb-1">01. SPECTROSCOPY</span>
              <span>All paint coats audited by physical density measurement filters.</span>
            </div>
            <div className="bg-[#0E0E0E] p-4 border border-gray-950 rounded-xl">
              <span className="text-white font-bold block mb-1">02. TITLE ESCROW</span>
              <span>Wire transactions finalized in private bank custodial loops.</span>
            </div>
            <div className="bg-[#0E0E0E] p-4 border border-gray-950 rounded-xl">
              <span className="text-white font-bold block mb-1">03. GLOBAL LOGISTICS</span>
              <span>Chassis freight handled entirely via custom pressurized containers.</span>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}

// ==========================================
// 9. CONTACT VIEW
// ==========================================
export function ContactView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubject] = useState("Escrow Consultation");
  const [message, setMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Secure handshake dispatch received from ${name}. An executive concierge will initiate contact shortly.`);
    setName("");
    setEmail("");
    setMessage("");
  };

  return (
    <div id="contact-page" className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">FIDUCIARY CONNECT</span>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">Convene With Fiduciary</h1>
        <p className="text-xs text-gray-400 mt-2">Connect privately with physical hub locations or legal office advisors.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-stretch">
        
        {/* Contact details */}
        <div className="md:col-span-5 flex flex-col justify-between gap-6 bg-[#0E0E0E] border border-gray-900 p-6 rounded-2xl">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-mono text-[#D4AF37] uppercase">Universal Contacts</h3>
            <div className="flex flex-col gap-2 font-mono text-[11px] text-gray-400">
              <p className="text-white font-sans text-xs">Principal desk</p>
              <p>EMAIL: concierge@luxedrive.com</p>
              <p>PHONE: +377 93 55 01 22</p>
              <p>TELEGRAM SECURED: @LuxeDriveConcierge</p>
            </div>
          </div>

          <div className="flex flex-col gap-2 font-mono text-[10px] text-gray-550 border-t border-gray-900 pt-5 leading-relaxed uppercase">
            <p>● ENCRYPTED AES-256 CONNECTION</p>
            <p>● FULL CONCIERGE COVERAGE EMEA/APAC</p>
          </div>

        </div>

        {/* Form panel */}
        <form onSubmit={handleSubmit} className="md:col-span-7 bg-[#0E0E0E] border border-gray-900 p-6 rounded-2xl flex flex-col gap-4 font-mono text-xs">
          
          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 uppercase">Authorized Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Alexander Sovereign"
              className="bg-black border border-gray-805 rounded p-2.5 text-white placeholder-gray-700 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 uppercase">Registry Email Address</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. alex@sovereign.com"
              className="bg-black border border-gray-805 rounded p-2.5 text-white placeholder-gray-700 outline-none"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 uppercase">Consult Classification</label>
            <select value={subject} onChange={(e) => setSubject(e.target.value)} className="bg-black border border-gray-805 rounded p-2.5 text-white">
              <option>Escrow Consultation</option>
              <option>Bespoke Track Consignments</option>
              <option>Cross-Border Port Shipping</option>
              <option>Legal Private Sales Inquiry</option>
            </select>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-gray-500 uppercase">Brief Inquiry Text</label>
            <textarea
              required
              rows={4}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Explain the required parameters..."
              className="bg-black border border-gray-805 rounded p-2.5 text-xs text-white placeholder-gray-750 outline-none resize-none"
            ></textarea>
          </div>

          <button
            type="submit"
            className="w-full bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold text-xs py-3 rounded-lg uppercase tracking-wide mt-2"
          >
            Dispatch Inquiry Handshake
          </button>
        </form>

      </div>
    </div>
  );
}

// ==========================================
// 10. FAQ VIEW
// ==========================================
export function FAQView() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div id="faq-page" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      <div className="text-center mb-12">
        <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">ESCROW TRANSPARENCY</span>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">Disclosures & FAQs</h1>
        <p className="text-xs text-gray-400 mt-2">Critical procedural details for multi-million dollar high-ticket trades.</p>
      </div>

      <div className="flex flex-col gap-4 font-sans text-xs">
        {FAQS.map((faq, idx) => (
          <div
            key={idx}
            className="bg-[#0E0E0E] border border-gray-900 rounded-xl overflow-hidden transition"
          >
            <button
              onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
              className="w-full flex justify-between items-center p-5 text-left text-white font-medium hover:bg-gray-950 transition outline-none font-sans text-sm"
            >
              <span>{faq.question}</span>
              <span className="text-[#D4AF37] text-lg font-mono">{openIndex === idx ? "−" : "⁺"}</span>
            </button>
            {openIndex === idx && (
              <div className="px-5 pb-5 pt-1 text-gray-400 text-xs leading-relaxed border-t border-gray-950 font-sans">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 11. BLOG JOURNAL VIEW
// ==========================================
export function BlogView() {
  const { blogPosts } = useGlobalStore();

  return (
    <div id="journal-page" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="text-center max-w-2xl mx-auto mb-12">
        <span className="text-xs font-mono tracking-widest text-[#D4AF37] uppercase">AUTOMOTIVE MONOGRAPHS</span>
        <h1 className="font-sans text-3xl font-bold tracking-tight text-white mt-1">LuxeDrive Journal</h1>
        <p className="text-xs text-gray-400 mt-2">Deep dives into vehicle physics, collectors markets, and Goodwood bespoke crafting.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            onClick={() => store.navigate(`blog/${post.id}`)}
            className="group cursor-pointer bg-[#0E0E0E] border border-gray-950 hover:border-gray-800 rounded-xl overflow-hidden shadow transition flex flex-col justify-between"
          >
            <div className="h-52 overflow-hidden relative">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
                referrerPolicy="no-referrer"
              />
              <span className="absolute top-4 left-4 bg-[#D4AF37] text-black text-[9px] font-mono font-bold uppercase rounded px-2 py-0.5">
                {post.category}
              </span>
            </div>

            <div className="p-5 flex-1 flex flex-col justify-between gap-4">
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-mono text-gray-550 uppercase">{post.publishDate} • {post.readTime}</p>
                <h3 className="font-sans text-base font-bold text-white leading-snug group-hover:text-[#D4AF37] transition">
                  {post.title}
                </h3>
                <p className="text-xs text-gray-400 line-clamp-3 leading-relaxed mt-1">
                  {post.excerpt}
                </p>
              </div>

              <div className="flex items-center gap-2 border-t border-gray-900 pt-3.5">
                <img
                  src={post.authorAvatar}
                  alt={post.author}
                  className="h-6 w-6 rounded-full"
                  referrerPolicy="no-referrer"
                />
                <span className="text-[10px] font-mono text-gray-300 font-bold">{post.author}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// ==========================================
// 12. BLOG DETAILS VIEW
// ==========================================
export function BlogDetailsView({ id }: { id: string }) {
  const { blogPosts } = useGlobalStore();
  const post = blogPosts.find((p) => p.id === id);

  if (!post) {
    return (
      <div className="text-center py-20 bg-black text-white">
        <AlertCircle className="h-10 w-10 text-red-500 mx-auto" />
        <h2 className="text-lg font-bold font-sans mt-4">Research Paper Not Logged</h2>
        <button onClick={() => store.navigate("blog")} className="mt-5 bg-[#D4AF37] px-4 py-2 text-black text-xs font-mono">Back to Journal</button>
      </div>
    );
  }

  return (
    <div id="blog-details" className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 text-left">
      
      <button
        onClick={() => store.navigate("blog")}
        className="flex items-center gap-1.5 text-xs font-mono text-gray-500 hover:text-white transition uppercase mb-6"
      >
        <ChevronLeft className="h-4 w-4" />
        <span>Return to journal index</span>
      </button>

      <div className="flex flex-col gap-4">
        <span className="bg-[#D4AF37]/10 border border-[#D4AF37]/35 text-[#D4AF37] text-[10px] font-mono font-bold uppercase rounded px-2.5 py-1 self-start">
          {post.category}
        </span>
        
        <h1 className="font-sans text-3xl sm:text-4xl font-bold tracking-tight text-white leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 border-b border-gray-900 pb-6 mb-6">
          <img
            src={post.authorAvatar}
            alt={post.author}
            className="h-8 w-8 rounded-full border border-gray-800"
            referrerPolicy="no-referrer"
          />
          <div className="leading-tight font-mono text-[11px] text-gray-400">
            <p className="text-white font-bold leading-none">{post.author}</p>
            <p className="text-[10px] mt-0.5 text-gray-550 uppercase">{post.publishDate} • {post.readTime} • {post.views} VIEWS</p>
          </div>
        </div>
      </div>

      <div className="h-80 w-full rounded-2xl overflow-hidden mb-8">
        <img
          src={post.image}
          alt={post.title}
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
      </div>

      <div className="font-sans text-sm sm:text-base text-gray-300 leading-relaxed space-y-6">
        <p className="first-letter:text-4xl first-letter:font-sans first-letter:font-semibold first-letter:text-[#D4AF37] first-letter:mr-1">
          {post.content}
        </p>
        <p className="text-xs text-gray-500 border-t border-gray-900 pt-6 font-mono uppercase">
          LuxeDrive Advisory Group • Private publication archives • Fiduciary certification #Ad-190.
        </p>
      </div>

    </div>
  );
}

// ==========================================
// SUB-COMPONENTS & LAYOUT CARDS
// ==========================================
export function VehicleCard({ car }: { car: Vehicle; key?: string }) {
  const { savedVehicleIds } = useGlobalStore();
  const isFavorited = savedVehicleIds.includes(car.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleWishlist(car.id);
  };

  const handleCardClick = () => {
    store.navigate(`vehicle/${car.id}`);
  };

  return (
    <div
      onClick={handleCardClick}
      className="group cursor-pointer bg-[#0E0E0E] border border-gray-950 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow duration-300 transition flex flex-col justify-between text-left h-[390px]"
    >
      {/* Top Banner aspect ratio 4:3 */}
      <div className="h-50 overflow-hidden relative">
        <img
          src={car.images[0]}
          alt={`${car.brand} image view`}
          className="w-full h-full object-cover group-hover:scale-105 duration-700 transition-transform"
          referrerPolicy="no-referrer"
        />
        
        {/* Transparent gradient mask */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E0E] to-transparent"></div>

        {/* Favorite circle */}
        <button
          onClick={handleToggle}
          className={`absolute top-3 right-3 p-1.5 rounded-full backdrop-blur-md border transition ${
            isFavorited ? "border-red-900/40 bg-red-900/10 text-red-500" : "border-black/50 bg-black/40 text-gray-400 hover:text-white"
          }`}
        >
          <Heart className="h-3.5 w-3.5" fill={isFavorited ? "currentColor" : "none"} />
        </button>

        {/* Dynamic Badge */}
        {car.isFeatured && (
          <span className="absolute bottom-3 left-3 bg-[#D4AF37] text-black text-[8px] font-mono font-bold uppercase rounded px-2 py-0.5 tracking-wider">
            FEATURED CHASSIS
          </span>
        )}
      </div>

      {/* Narrative details */}
      <div className="p-5 flex-1 flex flex-col justify-between gap-3 text-xs">
        
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-center font-mono text-[10px] text-gray-500 uppercase">
            <span>{car.year} commission</span>
            <span className="text-gray-400 font-sans font-semibold">${car.price.toLocaleString()}</span>
          </div>
          <h3 className="font-sans text-sm font-bold text-white group-hover:text-[#D4AF37] transition uppercase tracking-wide leading-snug">
            {car.brand} {car.model}
          </h3>
        </div>

        {/* Rapid specs row */}
        <div className="grid grid-cols-2 gap-2 bg-black/40 p-2.5 rounded-lg border border-gray-950 font-mono text-[10px] text-gray-400 leading-tight">
          <div className="flex justify-between"><span>Acc:</span><span className="text-white">{car.acceleration}</span></div>
          <div className="flex justify-between pl-1"><span>Power:</span><span className="text-white">{car.power}</span></div>
          <div className="flex justify-between"><span>P Speed:</span><span className="text-white">{car.topSpeed}</span></div>
          <div className="flex justify-between pl-1"><span>Run:</span><span className="text-white">{car.mileage} m</span></div>
        </div>

        <div className="flex justify-between items-center border-t border-gray-900 pt-3 text-[10px] font-mono text-gray-500 mt-0.5">
          <div className="flex items-center gap-1">
            <MapPin className="h-3 w-3 text-[#D4AF37]" />
            <span className="truncate max-w-[125px]">{car.location.split(",")[0]}</span>
          </div>
          <span className="text-[#D4AF37] group-hover:underline">INSPECT FILE ⁺</span>
        </div>

      </div>
    </div>
  );
}

export function VehicleListRow({ car }: { car: Vehicle; key?: string }) {
  const { savedVehicleIds } = useGlobalStore();
  const isFavorited = savedVehicleIds.includes(car.id);

  const handleToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    store.toggleWishlist(car.id);
  };

  const handleRowClick = () => {
    store.navigate(`vehicle/${car.id}`);
  };

  return (
    <div
      onClick={handleRowClick}
      className="group cursor-pointer bg-[#0E0E0E] border border-gray-950 hover:border-[#D4AF37]/50 rounded-2xl overflow-hidden shadow transition flex flex-col md:flex-row text-left hover:scale-[1.005]"
    >
      <div className="md:w-64 h-44 overflow-hidden relative shrink-0">
        <img
          src={car.images[0]}
          alt={`${car.brand}`}
          className="w-full h-full object-cover group-hover:scale-102 transition duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E0E0E]"></div>
      </div>

      <div className="p-5 flex-1 flex flex-col justify-between gap-4">
        
        <div className="flex flex-col gap-1">
          <div className="flex justify-between items-baseline font-mono text-[10px] text-gray-500 uppercase">
            <span>{car.year} commission YEAR</span>
            <span className="text-base font-sans font-bold text-white">${car.price.toLocaleString()}</span>
          </div>
          <h3 className="font-sans text-base font-bold text-white group-hover:text-[#D4AF37] transition uppercase tracking-wide mt-1">
            {car.brand} {car.model}
          </h3>
          <p className="text-xs text-gray-400 mt-1 line-clamp-2 leading-relaxed">
            {car.description}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-950 pt-3 text-[10px] font-mono text-gray-500">
          <div className="flex gap-4">
            <span>RUN: <strong className="text-white">{car.mileage} miles</strong></span>
            <span>ENGINE: <strong className="text-white">{car.engine}</strong></span>
            <span>ACC: <strong className="text-white">{car.acceleration}</strong></span>
          </div>
          
          <div className="flex items-center gap-3">
            <button
              onClick={handleToggle}
              className={`p-1.5 rounded-full border transition ${
                isFavorited ? "border-red-900/40 bg-red-900/10 text-red-500" : "border-gray-850 text-gray-500 hover:text-white"
              }`}
            >
              <Heart className="h-3.5 w-3.5" fill={isFavorited ? "currentColor" : "none"} />
            </button>
            <span className="text-[#D4AF37] group-hover:underline">INSPECT SHOWN ATELIER ⁺</span>
          </div>
        </div>

      </div>
    </div>
  );
}
