/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { store } from "../store";
import { Mail, Globe2, Sparkles, Send, ShieldCheck, HelpCircle } from "lucide-react";
import { OFF_LOCATIONS } from "../data";

export default function Footer() {
  const navigateTo = (route: string) => {
    store.navigate(route);
  };

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Subscription registered. Welcome to LuxeDrive Private Briefings.");
  };

  return (
    <footer id="footer-section" className="bg-[#050505] border-t border-gray-900/90 pt-16 pb-12 text-gray-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top visual newsletter section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center border-b border-gray-900 pb-12 mb-12">
          <div className="lg:col-span-7">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-[#D4AF37]" />
              <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">PRIVATE JOURNAL</span>
            </div>
            <h3 className="text-xl sm:text-2xl font-sans font-semibold tracking-tight text-white">
              The Sovereign Briefing
            </h3>
            <p className="text-sm text-gray-500 mt-1 max-w-lg">
              Receive confidential dispatches regarding paint-to-sample hypercars, tax-sheltered asset import laws, and private track commission registries.
            </p>
          </div>

          <div className="lg:col-span-5 w-full">
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                placeholder="Enter elite email address"
                required
                className="w-full bg-[#0B0B0B] border border-gray-800 focus:border-[#D4AF37] rounded-lg px-4 py-3 text-xs text-white placeholder-gray-600 outline-none font-mono transition"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] hover:bg-[#F7E7CE] text-black text-xs font-mono font-semibold px-5 py-3 rounded-lg transition-all flex items-center gap-1.5 shrink-0"
              >
                <span>Dispatch</span>
                <Send className="h-3.5 w-3.5" />
              </button>
            </form>
          </div>
        </div>

        {/* Categories, Brands & Offices mapping */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 mb-12 text-xs">
          
          {/* Column 1: Showroom collections */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase font-bold">DIRECTORY COLLECTION</h4>
            <div className="flex flex-col gap-2 font-sans text-gray-500">
              <button onClick={() => navigateTo("browse?type=Hypercar")} className="text-left hover:text-white transition">Hypercars</button>
              <button onClick={() => navigateTo("browse?type=Supercar")} className="text-left hover:text-white transition">Supercars</button>
              <button onClick={() => navigateTo("browse?type=Sports Car")} className="text-left hover:text-white transition font-semibold text-gray-400">Track Editions</button>
              <button onClick={() => navigateTo("browse?type=Luxury SUV")} className="text-left hover:text-white transition">Whispering SUVs</button>
              <button onClick={() => navigateTo("browse?type=Convertible")} className="text-left hover:text-white transition">Convertible Chasses</button>
            </div>
          </div>

          {/* Column 2: Selected Brands */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase font-bold">PREMIER MARQUES</h4>
            <div className="flex flex-col gap-2 font-sans text-gray-500">
              <button onClick={() => navigateTo("brand/lamborghini")} className="text-left hover:text-white transition">Lamborghini</button>
              <button onClick={() => navigateTo("brand/ferrari")} className="text-left hover:text-white transition">Ferrari</button>
              <button onClick={() => navigateTo("brand/porsche")} className="text-left hover:text-white transition">Porsche AG</button>
              <button onClick={() => navigateTo("brand/rolls-royce")} className="text-left hover:text-white transition">Rolls-Royce Motor Cars</button>
              <button onClick={() => navigateTo("brand/bugatti")} className="text-left hover:text-white transition">Bugatti SAS</button>
            </div>
          </div>

          {/* Column 3: Corporate Heritage */}
          <div className="flex flex-col gap-3">
            <h4 className="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase font-bold">THE ATELIER</h4>
            <div className="flex flex-col gap-2 font-sans text-gray-500">
              <button onClick={() => navigateTo("about")} className="text-left hover:text-white transition">Heritage & Vision</button>
              <button onClick={() => navigateTo("blog")} className="text-left hover:text-white transition">Automotive Journal</button>
              <button onClick={() => navigateTo("faq")} className="text-left hover:text-white transition">Secured Audits Q&A</button>
              <button onClick={() => navigateTo("contact")} className="text-left hover:text-white transition">Escrow Locations</button>
              <button onClick={() => navigateTo("dashboard/overview")} className="text-left hover:text-white transition">Authorized Sign-In</button>
            </div>
          </div>

          {/* Column 4 & 5: Global Escrow Desks */}
          <div className="col-span-2 flex flex-col gap-4">
            <h4 className="text-[10px] font-mono text-[#D4AF37] tracking-wider uppercase font-bold">GLOBAL ESCROW CENTRES</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-mono text-[11px] text-gray-500 leading-relaxed">
              {OFF_LOCATIONS.map((loc) => (
                <div key={loc.city} className="border-l border-[#D4AF37]/35 pl-3">
                  <p className="text-white font-sans font-medium text-xs mb-0.5">{loc.city}</p>
                  <p className="text-[10px] text-gray-650 truncate" title={loc.address}>{loc.address}</p>
                  <p className="text-[10px] text-gray-650">{loc.phone}</p>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Floating security and copyright parameters */}
        <div className="border-t border-gray-950 pt-8 mt-12 flex flex-col md:flex-row justify-between items-center gap-6 text-[11px] font-mono text-gray-650">
          <div className="flex items-center gap-2">
            <Globe2 className="h-4 w-4 text-[#D4AF37]" />
            <span>ENCRYPTED PORTAL | LUXEDRIVE INC. ALL SOVEREIGN RIGHTS RESERVED © 2026.</span>
          </div>

          <div className="flex gap-6 items-center">
            <button onClick={() => navigateTo("faq")} className="hover:text-white transition flex items-center gap-1">
              <HelpCircle className="h-3 w-3" />
              <span>Escrow Disclosures</span>
            </button>
            <div className="flex items-center gap-1.5 text-[#D4AF37]">
              <ShieldCheck className="h-3.5 w-3.5" />
              <span>FACTORY AUDITED CERTIFICATE</span>
            </div>
          </div>
        </div>

      </div>
    </footer>
  );
}
