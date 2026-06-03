/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { store, useGlobalStore } from "../store";
import { 
  Menu, X, Car, Bookmark, ShieldAlert, 
  MessageSquare, User as UserIcon, LogOut, ChevronDown, 
  ArrowRight, Search, Layers, FileText, Landmark
} from "lucide-react";

export default function Navbar() {
  const { currentRoute, currentUser, savedVehicleIds } = useGlobalStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);

  const navigateTo = (route: string) => {
    store.navigate(route);
    setMobileMenuOpen(false);
    setMegaMenuOpen(false);
    setUserDropdownOpen(false);
  };

  const bookmarkCount = savedVehicleIds.length;

  return (
    <nav id="navbar-header" className="sticky top-0 z-50 bg-[#0A0A0A]/90 backdrop-blur-md border-b border-gray-900 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Brand Logo */}
          <div className="flex items-center gap-10">
            <button
              onClick={() => navigateTo("home")}
              className="flex items-center gap-2 group text-left cursor-pointer outline-none"
            >
              <span className="text-2xl font-sans font-bold tracking-[0.25em] text-white">
                LUXE<span className="text-[#D4AF37] group-hover:text-[#F7E7CE] transition-colors">DRIVE</span>
              </span>
              <span className="text-[9px] font-mono tracking-widest text-gray-500 block border-l border-gray-800 pl-2">
                SHOWN | EST. 2026
              </span>
            </button>

            {/* Desktop Navigation Link row */}
            <div className="hidden md:flex items-center gap-8">
              
              {/* Mega-menu Toggle */}
              <div className="relative">
                <button
                  onMouseEnter={() => setMegaMenuOpen(true)}
                  onClick={() => navigateTo("browse")}
                  className="flex items-center gap-1 text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] transition py-3 outline-none"
                >
                  <span>Showroom</span>
                  <ChevronDown className={`h-3 w-3 text-gray-500 transition-transform ${megaMenuOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Mega-menu interactive dropdown board */}
                {megaMenuOpen && (
                  <div
                    onMouseLeave={() => setMegaMenuOpen(false)}
                    className="absolute left-0 top-11 w-[550px] bg-[#0C0C0C] border border-gray-800/80 rounded-xl shadow-2xl p-6 grid grid-cols-2 gap-5 z-50 animate-fade-in-slide"
                  >
                    <div className="flex flex-col gap-4">
                      <h4 className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase border-b border-gray-850 pb-1.5 font-bold">BY VEHICLE CLASSIFICATION</h4>
                      <div className="flex flex-col gap-2">
                        <button onClick={() => navigateTo("browse?type=Hypercar")} className="text-left text-xs font-sans text-gray-400 hover:text-white transition flex items-center justify-between">
                          <span>Hypercars (Multi-Million Art)</span>
                          <ArrowRight className="h-3 w-3 text-gray-600" />
                        </button>
                        <button onClick={() => navigateTo("browse?type=Supercar")} className="text-left text-xs font-sans text-gray-400 hover:text-white transition flex items-center justify-between">
                          <span>Supercars (V12 Legends)</span>
                          <ArrowRight className="h-3 w-3 text-gray-600" />
                        </button>
                        <button onClick={() => navigateTo("browse?type=Sports Car")} className="text-left text-xs font-sans text-gray-400 hover:text-white transition flex items-center justify-between">
                          <span>Sports Cars (Tactile Road)</span>
                          <ArrowRight className="h-3 w-3 text-gray-600" />
                        </button>
                        <button onClick={() => navigateTo("browse?type=Luxury SUV")} className="text-left text-xs font-sans text-gray-400 hover:text-white transition flex items-center justify-between">
                          <span>Luxury Custom SUVs</span>
                          <ArrowRight className="h-3 w-3 text-gray-600" />
                        </button>
                      </div>
                    </div>

                    <div className="flex flex-col gap-4 border-l border-gray-850 pl-5">
                      <h4 className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase border-b border-gray-850 pb-1.5 font-bold">PREMIUM MARQUES</h4>
                      <div className="grid grid-cols-2 gap-2 text-xs font-sans text-gray-400">
                        <button onClick={() => navigateTo("brand/lamborghini")} className="text-left hover:text-white transition">Lamborghini</button>
                        <button onClick={() => navigateTo("brand/ferrari")} className="text-left hover:text-white transition">Ferrari</button>
                        <button onClick={() => navigateTo("brand/porsche")} className="text-left hover:text-white transition">Porsche</button>
                        <button onClick={() => navigateTo("brand/rolls-royce")} className="text-left hover:text-white transition">Rolls-Royce</button>
                        <button onClick={() => navigateTo("brand/bugatti")} className="text-left hover:text-white transition">Bugatti</button>
                        <button onClick={() => navigateTo("brand/mclaren")} className="text-left hover:text-white transition">McLaren</button>
                      </div>
                      <div className="mt-2 bg-gray-950/40 p-2.5 rounded border border-gray-850 text-[11px] text-gray-400">
                        Interested in bespoke delivery? Consult our concierge branch.
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <button
                onClick={() => navigateTo("brands")}
                className={`text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] transition ${currentRoute === "brands" ? "text-[#D4AF37]" : ""}`}
              >
                Brands
              </button>

              <button
                onClick={() => navigateTo("categories")}
                className={`text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] transition ${currentRoute === "categories" ? "text-[#D4AF37]" : ""}`}
              >
                Categories
              </button>

              <button
                onClick={() => navigateTo("blog")}
                className={`text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] transition ${currentRoute === "blog" ? "text-[#D4AF37]" : ""}`}
              >
                Journal
              </button>

              <button
                onClick={() => navigateTo("about")}
                className={`text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] transition ${currentRoute === "about" ? "text-[#D4AF37]" : ""}`}
              >
                Heritage
              </button>

              <button
                onClick={() => navigateTo("contact")}
                className={`text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] transition ${currentRoute === "contact" ? "text-[#D4AF37]" : ""}`}
              >
                Contact
              </button>
            </div>
            
          </div>

          {/* Right Action buttons */}
          <div className="hidden md:flex items-center gap-5">
            
            {/* Sell Car button */}
            <button
              onClick={() => navigateTo("sell")}
              className={`text-xs font-mono font-semibold tracking-wider text-black bg-[#D4AF37] hover:bg-[#F7E7CE] px-4 py-2 rounded transition-colors ${
                currentRoute === "sell" ? "bg-white text-black bg-none" : ""
              }`}
            >
              Consign Asset
            </button>

            {/* Bookmark button */}
            <button
              onClick={() => navigateTo("dashboard/saved")}
              className="relative p-2 text-gray-400 hover:text-white transition"
              title="Saved Vehicles"
            >
              <Bookmark className="h-5 w-5" />
              {bookmarkCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-[#D4AF37] text-black text-[9px] font-mono font-bold h-4 w-4 rounded-full flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            {/* Chat button */}
            {currentUser && (
              <button
                onClick={() => navigateTo("dashboard/messages")}
                className="p-2 text-gray-400 hover:text-white transition relative"
                title="Secure Messages"
              >
                <MessageSquare className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#D4AF37]"></span>
              </button>
            )}

            {/* Authentication / Dashboard User drop or sign-in selector */}
            {currentUser ? (
              <div className="relative">
                <button
                  onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                  className="flex items-center gap-2 hover:opacity-85 transition outline-none"
                >
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="h-8 w-8 rounded-full border border-gray-800"
                    referrerPolicy="no-referrer"
                  />
                  <span className="text-xs font-mono font-medium text-white">{currentUser.name.split(" ")[0]}</span>
                  <ChevronDown className="h-3 w-3 text-gray-500" />
                </button>

                {userDropdownOpen && (
                  <div className="absolute right-0 mt-3 w-56 bg-[#0E0E0E] border border-gray-800 rounded-lg shadow-2xl py-2 z-50">
                    <div className="px-4 py-2.5 border-b border-gray-850">
                      <p className="text-xs text-gray-500 font-mono">AUTHORIZED DEED</p>
                      <p className="text-xs font-semibold text-white truncate mt-0.5">{currentUser.email}</p>
                    </div>

                    <button
                      onClick={() => navigateTo("dashboard/overview")}
                      className="w-full text-left px-4 py-2 text-xs font-mono text-gray-300 hover:bg-gray-900 transition flex items-center gap-2"
                    >
                      <Layers className="h-3.5 w-3.5 text-[#D4AF37]" />
                      <span>Sovereign Dashboard</span>
                    </button>

                    {currentUser.role === "Admin" && (
                      <button
                        onClick={() => navigateTo("admin/overview")}
                        className="w-full text-left px-4 py-2 text-xs font-mono text-gray-300 hover:bg-gray-900 transition flex items-center gap-2 border-t border-gray-850/50"
                      >
                        <ShieldAlert className="h-3.5 w-3.5 text-yellow-500" />
                        <span>Executive Panel</span>
                      </button>
                    )}

                    <button
                      onClick={() => store.logout()}
                      className="w-full text-left px-4 py-2 text-xs font-mono text-red-400 hover:bg-gray-900 transition flex items-center gap-2 border-t border-gray-850"
                    >
                      <LogOut className="h-3.5 w-3.5" />
                      <span>Term Secure Session</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigateTo("login")}
                className="text-xs font-mono uppercase tracking-widest text-[#E5E4E2] hover:text-[#D4AF37] border border-gray-850 hover:border-[#D4AF37] px-4 py-2 rounded transition"
              >
                Access Lodge
              </button>
            )}

          </div>

          {/* Mobile hamburger menu toggle */}
          <div className="flex md:hidden items-center gap-4">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-gray-400 hover:text-white p-2"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer Navigation overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#0A0A0A] border-b border-gray-900 px-4 pt-2 pb-6 space-y-4">
          <div className="flex flex-col gap-3 font-mono text-xs uppercase tracking-wider">
            <button onClick={() => navigateTo("browse")} className="text-left text-gray-300 hover:text-[#D4AF37] py-2">Showroom</button>
            <button onClick={() => navigateTo("brands")} className="text-left text-gray-300 hover:text-[#D4AF37] py-2">Brands</button>
            <button onClick={() => navigateTo("categories")} className="text-left text-gray-300 hover:text-[#D4AF37] py-2">Categories</button>
            <button onClick={() => navigateTo("blog")} className="text-left text-gray-300 hover:text-[#D4AF37] py-2">Journal</button>
            <button onClick={() => navigateTo("about")} className="text-left text-gray-300 hover:text-[#D4AF37] py-2">Heritage</button>
            <button onClick={() => navigateTo("contact")} className="text-left text-gray-300 hover:text-[#D4AF37] py-2">Contact</button>
            <button onClick={() => navigateTo("faq")} className="text-left text-gray-400 hover:text-[#D4AF37] py-2">Support FAQs</button>
          </div>

          <div className="pt-4 border-t border-gray-900 flex flex-col gap-3">
            <button
              onClick={() => navigateTo("sell")}
              className="w-full text-center text-xs font-mono font-semibold tracking-wider text-black bg-[#D4AF37] py-2.5 rounded"
            >
              Consign Asset
            </button>

            {currentUser ? (
              <div className="flex flex-col gap-2">
                <button
                  onClick={() => navigateTo("dashboard/overview")}
                  className="w-full text-center text-xs font-mono text-white border border-gray-800 py-2.5 rounded"
                >
                  Sovereign Dashboard
                </button>
                <button
                  onClick={() => store.logout()}
                  className="w-full text-center text-xs font-mono text-red-400 bg-red-900/10 py-2.5 rounded"
                >
                  Terminate session
                </button>
              </div>
            ) : (
              <button
                onClick={() => navigateTo("login")}
                className="w-full text-center text-xs font-mono text-gray-300 border border-gray-800 py-2.5 rounded"
              >
                Access Session
              </button>
            )}
          </div>
        </div>
      )}

    </nav>
  );
}
