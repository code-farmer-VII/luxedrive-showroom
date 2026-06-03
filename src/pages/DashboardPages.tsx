/**
 * @license
 * SPDX-License-Identifier: Apache-2.5
 */

import React, { useState, useEffect, useRef } from "react";
import { store, useGlobalStore, DEFAULT_USER } from "../store";
import { BRANDS, CATEGORIES } from "../data";
import { Vehicle, BlogPost, Message, User } from "../types";
import { 
  ArrowUpRight, BarChart3, Bookmark, MessageSquare, Layers, Usb,
  Settings, LogOut, CheckCircle2, ShieldAlert, Trash2, Send, 
  HelpCircle, Eye, RefreshCw, X, ShieldCheck, Mail, Lock, UserPlus, 
  Sparkles, FileText, Plus, Check, Star, Users, Briefcase, TrendingUp
} from "lucide-react";

// ==========================================
// AUTHENTICATION VIEWS (13 to 16)
// ==========================================
export function LoginView() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    store.login({
      ...DEFAULT_USER,
      email,
      role: email.toLowerCase().includes("admin") ? "Admin" : "Buyer"
    });
    alert(`Identity confirmed. Welcome to LuxeDrive ${email.toLowerCase().includes("admin") ? "Executive" : "Sovereign"} Suite.`);
    store.navigate("home");
  };

  return (
    <div id="login-view" className="max-w-md mx-auto my-16 p-8 bg-[#0E0E0E] border border-gray-900 rounded-2xl text-left relative shadow-2xl font-mono">
      <div className="absolute top-0 right-0 w-24 h-24 bg-[#D4AF37]/5 rounded-full blur-xl"></div>
      <div className="mb-6 flex flex-col gap-1 text-center">
        <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase">SECURED SESSION AUDIT</span>
        <h2 className="text-xl font-sans font-bold text-white mt-1">Access Luxe Lodge</h2>
      </div>

      <form onSubmit={handleLogin} className="flex flex-col gap-4 text-xs font-mono">
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Registry Email Address</label>
          <div className="bg-black border border-gray-805 rounded p-2.5 flex items-center gap-2">
            <Mail className="h-4 w-4 text-gray-600" />
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter active email or admin@luxedrive.com"
              className="bg-transparent border-none text-white outline-none w-full"
            />
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Secure Key Phrase</label>
          <div className="bg-black border border-gray-805 rounded p-2.5 flex items-center gap-2">
            <Lock className="h-4 w-4 text-gray-600" />
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••••"
              className="bg-transparent border-none text-white outline-none w-full"
            />
          </div>
        </div>

        <div className="flex justify-between items-center text-[11px] text-gray-500 pb-1">
          <label className="flex items-center gap-1.5 cursor-pointer hover:text-white transition">
            <input type="checkbox" className="accent-[#D4AF37]" defaultChecked />
            <span>Keep session active</span>
          </label>
          <button type="button" onClick={() => store.navigate("forgot-password")} className="hover:text-white transition">Forgot Security Phrase?</button>
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold py-3 rounded-lg uppercase tracking-wider"
        >
          Confirm Authentication
        </button>

        <p className="text-center text-[11px] text-gray-500 mt-2 font-sans">
          Don't have a secure deed?{" "}
          <button type="button" onClick={() => store.navigate("register")} className="text-[#D4AF37] hover:underline font-mono">
            Register Seat
          </button>
        </p>
      </form>
    </div>
  );
}

export function RegisterView() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [pass, setPass] = useState("");

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    store.login({
      id: `user-${Date.now()}`,
      email,
      name,
      phone: phone || "+1 (310) 555-0101",
      role: "Buyer",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=150",
      listingsCount: 0
    });
    alert("Welcome! Fiduciary seat registration accomplished.");
    store.navigate("home");
  };

  return (
    <div id="register-view" className="max-w-md mx-auto my-14 p-8 bg-[#0E0E0E] border border-gray-900 rounded-2xl text-left shadow-2xl font-mono">
      <div className="mb-6 flex flex-col gap-1 text-center">
        <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase">REGISTRATION PROTOCOL</span>
        <h2 className="text-xl font-sans font-bold text-white mt-1">Constitute Member Account</h2>
      </div>

      <form onSubmit={handleRegister} className="flex flex-col gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Full Authorized Name</label>
          <input
            type="text"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Alexander Sovereign"
            className="bg-black border border-gray-805 p-2.5 rounded text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Secure Email address</label>
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="alex@sovereign.com"
            className="bg-black border border-gray-805 p-2.5 rounded text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Secure phone Line</label>
          <input
            type="tel"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 (310) 555-0321"
            className="bg-black border border-gray-805 p-2.5 rounded text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Personal security key phrase</label>
          <input
            type="password"
            required
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="••••••••••••••"
            className="bg-black border border-gray-805 p-2.5 rounded text-white outline-none focus:border-[#D4AF37]"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold py-3 rounded-lg uppercase tracking-wider mt-2"
        >
          Publish Registry seat
        </button>

        <p className="text-center text-[11px] text-gray-500 mt-2 font-sans font-mono">
          Already registered?{" "}
          <button type="button" onClick={() => store.navigate("login")} className="text-[#D4AF37] hover:underline font-mono">
            Access Session
          </button>
        </p>
      </form>
    </div>
  );
}

export function ForgotPasswordView() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Dispatch completed. Please review your secure email mailbox for reset keys.");
    store.navigate("reset-password");
  };

  return (
    <div id="forgot-pass" className="max-w-md mx-auto my-20 p-8 bg-[#0E0E0E] border border-gray-900 rounded-2xl text-left shadow-2xl font-mono">
      <h3 className="text-xs text-[#D4AF37] tracking-widest uppercase mb-1">DEED RECOVERY HUB</h3>
      <h2 className="text-lg font-sans font-bold text-white mb-2">Recover Keyphrase</h2>
      <p className="text-xs text-gray-400 mb-6 font-sans">Submit your registered email. An audited 6-digit cryptographic seed will be dispatched.</p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs">
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">REGISTERED ACCOUNT EMAIL</label>
          <input
            type="email"
            required
            placeholder="alex@sovereign.com"
            className="bg-black border border-gray-805 p-2.5 rounded text-white outline-none"
          />
        </div>
        <button type="submit" className="w-full bg-[#D4AF37] text-black font-sans font-bold py-3 rounded-lg uppercase font-mono">
          Dispatch Seed Code
        </button>
      </form>
    </div>
  );
}

export function ResetPasswordView() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Signature reset completed. Please authorize access with your new security key phrase.");
    store.navigate("login");
  };

  return (
    <div id="reset-pass" className="max-w-md mx-auto my-20 p-8 bg-[#0E0E0E] border border-gray-900 rounded-2xl text-left shadow-2xl font-mono">
      <span className="text-[10px] text-[#D4AF37] tracking-widest uppercase">SEED CONFIRMATION RE-WRITE</span>
      <h2 className="text-lg font-sans font-bold text-white mt-1 mb-4">Reset Security Phrase</h2>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 text-xs text-left">
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-550 uppercase">6-DIGIT VERIFICATION SEED</label>
          <input type="text" maxLength={6} required placeholder="982301" className="bg-black border border-gray-805 p-2.5 rounded text-white tracking-widest font-bold" />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-gray-550 uppercase">NEW SECURITY KEY PHRASE</label>
          <input type="password" required placeholder="••••••••••••••" className="bg-black border border-gray-805 p-2.5 rounded text-white" />
        </div>
        <button type="submit" className="w-full bg-[#D4AF37] text-black font-sans font-bold py-3 rounded-lg uppercase">
          Set New signature phrase
        </button>
      </form>
    </div>
  );
}


// ==========================================
// CENTRALIZED DASHBOARD LAYOUT & SWITCHER
// ==========================================
interface DashboardLayoutProps {
  children: React.ReactNode;
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { currentRoute, currentUser } = useGlobalStore();

  const handleLogout = () => {
    store.logout();
  };

  return (
    <div id="dashboard-layout" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start text-left">
        
        {/* Left Side Navigation Sidebar */}
        <div className="lg:col-span-3 bg-[#0E0E0E] border border-gray-900 rounded-2xl p-5 flex flex-col gap-6 shadow-md justify-between">
          
          {/* User profile Summary widget */}
          {currentUser && (
            <div className="flex items-center gap-3 pb-5 border-b border-gray-900">
              <img
                src={currentUser.avatar}
                alt={currentUser.name}
                className="h-10 w-10 rounded-full border border-[#D4AF37]"
                referrerPolicy="no-referrer"
              />
              <div className="leading-tight">
                <h4 className="text-xs font-mono font-bold text-white">{currentUser.name}</h4>
                <span className="text-[9px] font-mono text-gray-500 uppercase tracking-widest">{currentUser.role} Member</span>
              </div>
            </div>
          )}

          {/* Navigation link block */}
          <div className="flex flex-col gap-1.5 font-mono text-xs">
            <span className="text-[9px] text-gray-650 uppercase px-2 mb-2">Member Terminal</span>
            
            <button
              onClick={() => store.navigate("dashboard/overview")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                currentRoute === "dashboard/overview" ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <Layers className="h-4 w-4" />
              <span>Sovereign Overview</span>
            </button>

            <button
              onClick={() => store.navigate("dashboard/listings")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                currentRoute === "dashboard/listings" ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <Plus className="h-4 w-4" />
              <span>My Consignments</span>
            </button>

            <button
              onClick={() => store.navigate("dashboard/saved")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                currentRoute === "dashboard/saved" ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <Bookmark className="h-4 w-4" />
              <span>Saved Wishlist</span>
            </button>

            <button
              onClick={() => store.navigate("dashboard/messages")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                currentRoute === "dashboard/messages" ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <MessageSquare className="h-4 w-4" />
              <span>Escrow Dispatch Log</span>
            </button>

            <button
              onClick={() => store.navigate("dashboard/profile")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                currentRoute === "dashboard/profile" ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <UserPlus className="h-4 w-4" />
              <span>Atelier Profile</span>
            </button>

            <button
              onClick={() => store.navigate("dashboard/account")}
              className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                currentRoute === "dashboard/account" ? "bg-[#D4AF37]/5 border-l-2 border-[#D4AF37] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Security Controls</span>
            </button>

            {currentUser?.role === "Admin" && (
              <div className="flex flex-col gap-1 mt-4 pt-4 border-t border-gray-900">
                <span className="text-[9px] text-[#D4AF37] uppercase px-2 mb-2 font-bold flex items-center gap-1">
                  <ShieldAlert className="h-3.5 w-3.5" />
                  <span>Executive Center</span>
                </span>

                <button
                  onClick={() => store.navigate("admin/overview")}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-lg transition text-left ${
                    currentRoute.startsWith("admin/") ? "bg-yellow-500/5 text-yellow-500 border-l-2 border-yellow-500" : "text-gray-500 hover:text-white"
                  }`}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span>HQ Terminal Overview</span>
                </button>
              </div>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2.5 px-3 py-2.5 rounded-lg font-mono text-xs text-red-400 hover:bg-gray-900 transition text-left border-t border-gray-900 pt-5 mt-6"
          >
            <LogOut className="h-4 w-4" />
            <span>End Secured Session</span>
          </button>

        </div>

        {/* Dynamic child content area */}
        <div className="lg:col-span-9 flex flex-col gap-8">
          {children}
        </div>

      </div>

    </div>
  );
}

// ==========================================
// 17. MEMBER OVERVIEW
// ==========================================
export function DashboardOverview() {
  const { currentUser, vehicles, messages } = useGlobalStore();
  const listings = vehicles.filter(v => v.sellerId === currentUser?.id);
  const unreadMessagesCount = messages.filter(m => m.receiverId === currentUser?.id && !m.isRead).length;

  return (
    <div id="overview-desk" className="flex flex-col gap-6 font-mono">
      
      {/* Dynamic Welcome card */}
      <div className="bg-[#0E0E0E] border border-gray-900 rounded-2xl p-6 relative overflow-hidden text-left flex justify-between items-center bg-gradient-to-r from-black via-gray-950 to-gray-900">
        <div className="absolute top-0 right-0 w-32 h-32 bg-[#D4AF37]/5 rounded-full blur-2xl"></div>
        <div>
          <span className="text-[9px] text-[#D4AF37] tracking-widest uppercase">SOVEREIGN MEMORIAL PORTFOLIO</span>
          <h2 className="text-2xl font-bold font-sans text-white mt-1">Sovereign, {currentUser?.name.split(" ")[0]}</h2>
          <p className="text-xs text-gray-400 mt-2 font-sans max-w-md">
            Your private holdings are actively tracked against live international luxury markets. All escrows run on encrypted fiduciaries.
          </p>
        </div>
        <div className="hidden sm:block text-right">
          <span className="text-[10px] text-gray-500 uppercase">AUDIT INDEX RATING</span>
          <span className="text-2xl font-bold block text-[#D4AF37]">9.98</span>
        </div>
      </div>

      {/* Overview indicators */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-xs text-left">
        
        <div className="bg-[#0E0E0E] border border-gray-900 p-5 rounded-2xl flex flex-col gap-1">
          <span className="text-gray-500 uppercase">ACTIVE CONSIGNMENTS</span>
          <span className="text-2xl font-bold text-white font-sans mt-0.5">{listings.length}</span>
        </div>

        <div className="bg-[#0E0E0E] border border-gray-900 p-5 rounded-2xl flex flex-col gap-1">
          <span className="text-gray-500 uppercase">DESPATC CHATS LOG</span>
          <span className="text-2xl font-bold text-[#D4AF37] font-sans mt-0.5">{messages.length}</span>
        </div>

        <div className="bg-[#0E0E0E] border border-gray-900 p-5 rounded-2xl flex flex-col gap-1 col-span-2 md:col-span-1">
          <span className="text-gray-500 uppercase">PORTFOLIO VALUE TARGET</span>
          <span className="text-2xl font-bold text-white font-sans mt-0.5">
            ${listings.reduce((sum, v) => sum + v.price, 0).toLocaleString()}
          </span>
        </div>

      </div>

      {/* Recents holdings activity table */}
      <div className="bg-[#0E0E0E] border border-gray-900 rounded-2xl p-5 text-left">
        <h3 className="text-xs text-[#D4AF37] tracking-widest uppercase mb-4 font-bold border-b border-gray-900 pb-3">Dossier activity ledger</h3>
        
        {listings.length === 0 ? (
          <div className="text-center py-10 font-sans text-xs text-gray-500">
            No active chasses on your catalog. Consign your first vehicle to launch.
          </div>
        ) : (
          <div className="flex flex-col gap-3 font-mono text-xs">
            {listings.map((v) => (
              <div key={v.id} className="flex justify-between items-center bg-black/40 border border-gray-950 p-3 rounded-lg">
                <div className="flex items-center gap-3">
                  <span className="text-xl bg-[#0F0F0F] rounded p-1">🏎️</span>
                  <div>
                    <p className="text-white font-bold font-sans uppercase">{v.brand} {v.model}</p>
                    <p className="text-[10px] text-gray-500">YEAR: {v.year} • SPEC REFIL: #{v.id.toUpperCase()}</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="text-white font-bold">${v.price.toLocaleString()}</p>
                    <span className={`text-[9px] uppercase px-2 py-0.5 rounded font-mono ${
                      v.status === "Active" ? "bg-emerald-950 text-emerald-400" : "bg-yellow-950 text-yellow-500"
                    }`}>
                      {v.status}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
}

// ==========================================
// 18. MY LISTINGS (Manage own chasses)
// ==========================================
export function MyListings() {
  const { currentUser, vehicles } = useGlobalStore();
  const myListings = vehicles.filter(v => v.sellerId === currentUser?.id);

  const handleDelete = (id: string) => {
    if (confirm("Verify permanent rotation of list parameters. Immediate deletion can not be rolled back.")) {
      store.deleteListing(id);
    }
  };

  return (
    <div id="my-listings" className="flex flex-col gap-6 text-left">
      <div className="flex justify-between items-center border-b border-gray-900 pb-4">
        <div>
          <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">ASSET RECORD LOGS</span>
          <h2 className="text-xl font-sans font-bold text-white mt-1">My Consignment Assets</h2>
        </div>
        <button
          onClick={() => store.navigate("sell")}
          className="bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold text-xs px-4 py-2 rounded uppercase tracking-wider"
        >
          Consign New Asset
        </button>
      </div>

      {myListings.length === 0 ? (
        <div className="text-center py-20 bg-[#0E0E0E]/40 border border-dashed border-gray-950 rounded-2xl">
          <Layers className="h-10 w-10 text-gray-700 mx-auto mb-4" />
          <h3 className="text-white font-sans text-sm font-semibold">No Owned Assets Logged</h3>
          <p className="text-xs text-gray-400 mt-1">Start your transaction path by launching custom consignments.</p>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          {myListings.map((v) => (
            <div key={v.id} className="bg-[#0E0E0E] border border-gray-900 p-5 rounded-2xl flex flex-col sm:flex-row gap-5 items-stretch justify-between">
              
              <div className="flex gap-4">
                <img
                  src={v.images[0]}
                  alt="Holding specifications"
                  className="w-28 h-20 object-cover rounded-lg bg-black"
                  referrerPolicy="no-referrer"
                />
                <div className="flex flex-col justify-between font-mono text-xs">
                  <div>
                    <h3 className="font-sans text-sm font-bold text-white uppercase">{v.brand} {v.model}</h3>
                    <p className="text-gray-500 text-[10px] mt-0.5">ESTIMATED ASSET TARGET: ${v.price.toLocaleString()}</p>
                  </div>
                  <div className="flex gap-2 items-center">
                    <span className={`text-[9px] uppercase px-2 py-0.5 rounded ${
                      v.status === "Active" ? "bg-emerald-950 text-emerald-400" : "bg-yellow-950 text-yellow-500"
                    }`}>
                      {v.status}
                    </span>
                    <span className="text-[10px] text-gray-500">ACC: {v.acceleration} • ODO: {v.mileage} miles</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-row sm:flex-col justify-between items-end gap-2 text-right border-t sm:border-t-0 border-gray-900 pt-3 sm:pt-0">
                <span className="text-[10px] font-mono text-gray-500 uppercase">VETTED CHASSIS DEED</span>
                <div className="flex gap-2">
                  <button
                    onClick={() => store.navigate(`vehicle/${v.id}`)}
                    className="border border-gray-800 hover:bg-gray-950 text-xs font-mono text-gray-300 px-3 py-1.5 rounded"
                  >
                    Atelier View
                  </button>
                  <button
                    onClick={() => handleDelete(v.id)}
                    className="border border-red-900/60 hover:bg-red-950/20 text-xs font-mono text-red-400 px-3 py-1.5 rounded"
                    title="Delete listing"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

// ==========================================
// 21. SAVED VEHICLES (Wishlist)
// ==========================================
export function SavedVehicles() {
  const { savedVehicleIds, vehicles } = useGlobalStore();
  const wishlisted = vehicles.filter(v => savedVehicleIds.includes(v.id) && v.status === "Active");

  return (
    <div id="saved-wis" className="flex flex-col gap-6 text-left">
      <div className="border-b border-gray-900 pb-4">
        <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] uppercase">COLLECTOR WISHLIST</span>
        <h2 className="text-xl font-sans font-bold text-white mt-1">Saved Showroom Chasses</h2>
      </div>

      {wishlisted.length === 0 ? (
        <div className="text-center py-20 bg-[#0E0E0E]/40 border border-transparent rounded-2xl text-xs font-mono text-gray-500">
          <Bookmark className="h-10 w-10 text-gray-800 mx-auto mb-4" />
          <span>No wishlisted chasses tagged. Click the heart icons on showroom cards.</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {wishlisted.map((v) => (
            <div key={v.id} className="relative group">
              <button
                onClick={() => store.toggleWishlist(v.id)}
                className="absolute top-3 right-3 p-1.5 rounded-full bg-black/60 backdrop-blur border border-red-900/40 text-red-500 z-10 transition hover:bg-black"
              >
                <Trash2 className="h-3.5 w-3.5" />
              </button>
              
              <div onClick={() => store.navigate(`vehicle/${v.id}`)} className="cursor-pointer bg-[#0E0E0E] rounded-xl overflow-hidden border border-gray-950 group-hover:border-gray-800 transition">
                <img
                  src={v.images[0]}
                  alt="Holding"
                  className="w-full h-40 object-cover"
                  referrerPolicy="no-referrer"
                />
                <div className="p-4 font-mono text-xs">
                  <div className="flex justify-between">
                    <span className="text-white font-bold font-sans uppercase truncate max-w-[170px]">{v.brand} {v.model}</span>
                    <span className="text-[#D4AF37]">${v.price.toLocaleString()}</span>
                  </div>
                  <p className="text-gray-550 text-[10px] mt-1">Hub registry: {v.location.split(",")[0]}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}

// ==========================================
// 22. SECURE MESSAGES (Live-feeling chat system between buyer/seller)
// ==========================================
export function SecureMessages() {
  const { messages, currentUser } = useGlobalStore();
  const [typedMsg, setTypedMsg] = useState("");
  const chatBottomRef = useRef<HTMLDivElement>(null);

  // Group messages by contact thread
  const senderMap = new Map<string, Message[]>();
  messages.forEach((m) => {
    const key = m.senderId === currentUser?.id ? m.receiverId : m.senderId;
    if (!senderMap.has(key)) {
      senderMap.set(key, []);
    }
    senderMap.get(key)!.push(m);
  });

  const [activeThreadId, setActiveThreadId] = useState<string>(
    senderMap.keys().next().value || ""
  );

  const activeThreadMessages = activeThreadId 
    ? [...(senderMap.get(activeThreadId) || [])].sort((a, b) => new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime())
    : [];

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!typedMsg.trim() || !activeThreadId) return;
    
    // Send standard message via store
    store.sendMessage(activeThreadId, typedMsg);
    setTypedMsg("");
  };

  // Scroll to bottom on updates
  useEffect(() => {
    chatBottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, activeThreadId]);

  return (
    <div id="messages-hub" className="bg-[#0E0E0E] border border-gray-900 rounded-2xl overflow-hidden grid grid-cols-1 md:grid-cols-12 min-h-[500px] text-left">
      
      {/* Contact sidebar */}
      <div className="md:col-span-4 border-r border-gray-900 flex flex-col">
        <div className="p-4 border-b border-gray-905 bg-black/40">
          <span className="text-[9px] font-mono tracking-widest text-gray-550 uppercase">ENCRYPTED THREADS</span>
          <h3 className="text-xs font-semibold text-white mt-1 uppercase font-mono">Dossier contacts</h3>
        </div>

        <div className="flex flex-col flex-1 divide-y divide-gray-905 overflow-y-auto">
          {senderMap.size === 0 ? (
            <div className="p-6 text-center font-sans text-xs text-gray-500">
              No active fiduciaries. Engage sellers on the showroom.
            </div>
          ) : (
            Array.from(senderMap.entries()).map(([contId, list]) => {
              const lastM = list[list.length - 1];
              const isSelected = contId === activeThreadId;

              return (
                <button
                  key={contId}
                  onClick={() => setActiveThreadId(contId)}
                  className={`w-full text-left p-4 transition flex items-center gap-3 ${
                    isSelected ? "bg-gray-900/60 text-white" : "text-gray-400 hover:bg-gray-950/40"
                  }`}
                >
                  <img
                    src={lastM.senderId === contId ? lastM.senderAvatar : "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150"}
                    alt="avatar"
                    className="h-8 w-8 rounded-full border border-gray-800"
                    referrerPolicy="no-referrer"
                  />
                  <div className="flex-1 min-w-0 font-mono text-xs leading-snug">
                    <div className="flex justify-between items-baseline mb-0.5">
                      <span className="font-bold truncate text-white">{lastM.senderId === contId ? lastM.senderName : "Luxe Support"}</span>
                      <span className="text-[8px] text-gray-650">{new Date(lastM.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
                    </div>
                    <p className="truncate text-[11px] text-gray-500">{lastM.text}</p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>

      {/* Primary chat window */}
      <div className="md:col-span-8 flex flex-col justify-between h-[450px] md:h-auto">
        {activeThreadId ? (
          <>
            {/* Header */}
            <div className="p-4 border-b border-gray-905 bg-black/40 flex justify-between items-center font-mono">
              <div className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-xs font-bold text-white uppercase">Secure Session channel</span>
              </div>
              <span className="text-[9px] text-gray-500">SECURE HANDSHAKE AES-256</span>
            </div>

            {/* Bubble list */}
            <div className="flex-1 p-4 overflow-y-auto space-y-4 flex flex-col bg-[#080808]">
              {activeThreadMessages.map((m) => {
                const isMine = m.senderId === currentUser?.id;
                return (
                  <div
                    key={m.id}
                    className={`max-w-[75%] p-3 rounded-xl text-xs font-sans ${
                      isMine 
                        ? "bg-[#D4AF37]/5 border border-[#D4AF37]/35 text-white ml-auto rounded-tr-none" 
                        : "bg-gray-900 text-gray-300 mr-auto rounded-tl-none border border-gray-800/40"
                    }`}
                  >
                    {!isMine && (
                      <p className="font-mono text-[9px] text-[#D4AF37] mb-1 uppercase font-bold">{m.senderName}</p>
                    )}
                    <p className="leading-relaxed whitespace-pre-wrap">{m.text}</p>
                    
                    {m.vehicleName && (
                      <div className="mt-2 bg-black/40 border border-gray-850 p-1.5 rounded flex items-center justify-between text-[10px] font-mono">
                        <span className="text-gray-400">REF CHASSIS: {m.vehicleName}</span>
                      </div>
                    )}
                    
                    <span className="block text-[8px] font-mono text-gray-500 mt-1 text-right">
                      {new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                  </div>
                );
              })}
              <div ref={chatBottomRef} />
            </div>

            {/* Typing box */}
            <form onSubmit={handleSend} className="p-3 border-t border-gray-905 bg-black/40 flex gap-2">
              <input
                type="text"
                required
                value={typedMsg}
                onChange={(e) => setTypedMsg(e.target.value)}
                placeholder="Type dynamic message dispatch..."
                className="w-full bg-black border border-gray-805 rounded-xl px-4 py-3 text-xs text-white outline-none focus:border-[#D4AF37] font-mono placeholder-gray-700"
              />
              <button
                type="submit"
                className="bg-[#D4AF37] text-black px-4 py-3 rounded-xl hover:bg-[#F7E7CE] transition font-mono text-xs font-bold shrink-0 flex items-center gap-1"
              >
                <span>SEND</span>
                <Send className="h-3 w-3" />
              </button>
            </form>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center font-mono text-xs text-gray-500">
            <span>Select thread from sidebar</span>
          </div>
        )}
      </div>

    </div>
  );
}

// ==========================================
// 23. Profile & Account Settings
// ==========================================
export function ProfileSettings() {
  const { currentUser } = useGlobalStore();
  const [name, setName] = useState(currentUser?.name || "");
  const [phone, setPhone] = useState(currentUser?.phone || "");
  const [bio, setBio] = useState(currentUser?.bio || "");

  const handleUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentUser) return;
    store.login({
      ...currentUser,
      name,
      phone,
      bio
    });
    alert("Profile parameters updated and signed internally.");
  };

  return (
    <form onSubmit={handleUpdate} className="bg-[#0E0E0E] border border-gray-900 rounded-2xl p-6 flex flex-col gap-5 text-left font-mono text-xs relative">
      <div className="border-b border-gray-900 pb-3 mb-2">
        <h3 className="text-xs text-[#D4AF37] tracking-widest uppercase mb-1 font-bold">Atelier Personal Sheet</h3>
        <p className="text-xs text-gray-400 font-sans">Verify biography elements mapped to trade registers.</p>
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gray-500 uppercase">Universal Legal Name</label>
        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="bg-black border border-gray-805 p-2.5 rounded text-white" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gray-500 uppercase">Secure Contact Phone</label>
        <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="bg-black border border-gray-805 p-2.5 rounded text-white" />
      </div>

      <div className="flex flex-col gap-1.5">
        <label className="text-gray-500 uppercase">Personal Bio Briefing</label>
        <textarea rows={3} value={bio} onChange={(e) => setBio(e.target.value)} className="bg-black border border-gray-805 p-2.5 rounded text-white resize-none"></textarea>
      </div>

      <button type="submit" className="bg-[#D4AF37] hover:bg-[#F7E7CE] text-black font-sans font-bold py-3.5 rounded-lg uppercase tracking-wide">
        Commit Dossier Changes
      </button>
    </form>
  );
}

export function AccountSettings() {
  const handlePassUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Seed authorization has updated signature passwords successfully.");
  };

  return (
    <div id="account-sec" className="flex flex-col gap-6 text-left font-mono">
      
      <form onSubmit={handlePassUpdate} className="bg-[#0E0E0E] border border-gray-900 p-6 rounded-2xl flex flex-col gap-5 text-xs text-left">
        <div className="border-b border-gray-900 pb-3 mb-2">
          <h3 className="text-[#D4AF37] tracking-widest uppercase mb-1 font-bold">Key Signature password</h3>
          <p className="text-xs text-gray-400 font-sans">Cycle signature keyphrases periodically to preserve security.</p>
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">Existing keyphrase</label>
          <input type="password" required className="bg-black border border-gray-805 p-2.5 rounded text-white" />
        </div>

        <div className="flex flex-col gap-1.5">
          <label className="text-gray-500 uppercase">New secure keyphrase</label>
          <input type="password" required className="bg-black border border-gray-805 p-2.5 rounded text-white" />
        </div>

        <button type="submit" className="bg-[#D4AF37] text-black font-sans font-bold py-3 rounded-lg uppercase">
          Commit new credentials
        </button>
      </form>

      {/* Notifications matrix config */}
      <div className="bg-[#0E0E0E] border border-gray-900 p-6 rounded-2xl flex flex-col gap-4 text-xs">
        <h3 className="text-sm font-sans font-semibold text-white">Advisory Alert Metrics</h3>
        <p className="text-xs text-gray-400 font-sans leading-relaxed">Adjust email alerts for auction catalogs, physical review appointments, and sovereign trades.</p>
        
        <div className="flex flex-col gap-2.5 font-mono text-[11px] text-gray-300">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#D4AF37]" defaultChecked />
            <span>Notify for live bid inquiries</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" className="accent-[#D4AF37]" defaultChecked />
            <span>Weekly general intelligence advisory sheets</span>
          </label>
        </div>
      </div>

    </div>
  );
}


// ==========================================
// EXECUTIVE LEVEL: ADMIN DASHBOARDS (25 to 31)
// ==========================================
export function AdminOverview() {
  const { vehicles, blogPosts, messages } = useGlobalStore();
  const pending = vehicles.filter(v => v.status === "Pending");
  const activeAll = vehicles.filter(v => v.status === "Active");

  return (
    <div id="admin-hq-terminal" className="flex flex-col gap-8 text-left font-mono">
      
      {/* Top executive bar */}
      <div className="bg-gradient-to-r from-red-950/20 via-[#0A0A0A] to-red-900/10 border border-gray-850 p-6 rounded-2xl relative">
        <span className="text-[9px] text-yellow-500 font-bold uppercase tracking-widest flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-yellow-500" />
          <span>EXECUTIVE CONTROLS STATUS DIRECT</span>
        </span>
        <h1 className="text-2xl font-sans font-bold text-white mt-1">LuxeDrive Operational HQ</h1>
        <p className="text-xs text-gray-400 mt-2 font-sans">
          Manage pending title registrations, approve dealership marques, track active blog posts, and measure escrow transactional logs.
        </p>
      </div>

      {/* Admin Quick stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-xs font-mono">
        <div className="bg-[#0E0E0E] border border-gray-900 p-4 rounded-xl flex flex-col gap-0.5">
          <span className="text-gray-500 uppercase">LIQUID VALUE TRADED</span>
          <span className="text-xl font-bold text-white mt-1">$48,290,000</span>
        </div>
        <div className="bg-[#0E0E0E] bg-yellow-950/10 border border-yellow-500/20 p-4 rounded-xl flex flex-col gap-0.5 relative">
          <span className="text-yellow-500 uppercase font-bold">PENDING CONSIGN</span>
          <span className="text-xl font-bold text-white mt-1 font-sans">{pending.length} Vehicles</span>
        </div>
        <div className="bg-[#0E0E0E] border border-gray-900 p-4 rounded-xl flex flex-col gap-0.5">
          <span className="text-gray-500 uppercase">ACTIVE CATALOG</span>
          <span className="text-xl font-bold text-white mt-1 font-sans">{activeAll.length} Vehicles</span>
        </div>
        <div className="bg-[#0E0E0E] border border-gray-900 p-4 rounded-xl flex flex-col gap-0.5">
          <span className="text-gray-500 uppercase">JOURNAL REVIEWS</span>
          <span className="text-xl font-bold text-white mt-1 font-sans">{blogPosts.length} Papers</span>
        </div>
      </div>

      {/* Admin Action Tabs mapping (Sub-router switches inside HQ) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left column: Manage Pending queue */}
        <div className="lg:col-span-8 flex flex-col gap-6">
          <div className="bg-[#0E0E0E] border border-gray-900 rounded-2xl p-5">
            <h3 className="text-xs text-[#D4AF37] tracking-widest uppercase mb-4 font-bold border-b border-gray-900 pb-3 flex items-center justify-between">
              <span>PENDING CONSIGNMENT ESCROW REVIEWS</span>
              <span className="text-[10px] bg-yellow-500/15 text-yellow-500 border border-yellow-500/30 px-2 py-0.5 rounded">Action REQ</span>
            </h3>

            {pending.length === 0 ? (
              <div className="text-center py-10 font-sans text-xs text-gray-500">
                All platform chasses are currently vetted and actively listed! Zero pending queues.
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {pending.map((v) => (
                  <div key={v.id} className="bg-black border border-gray-905 p-3 rounded-xl flex justify-between items-center text-xs">
                    <div>
                      <h4 className="font-sans font-bold text-white uppercase">{v.brand} {v.model}</h4>
                      <p className="text-[10px] text-gray-500">TARGET: ${v.price.toLocaleString()} • Owner Ref: {v.sellerName}</p>
                    </div>

                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          store.approveListing(v.id);
                          alert("Chassis successfully published! Listed live in public showroom catalogs.");
                        }}
                        className="bg-emerald-950 text-emerald-400 border border-emerald-900 hover:bg-emerald-900/40 px-2.5 py-1 rounded text-[11px] font-mono cursor-pointer"
                      >
                        APPROVE LIVE
                      </button>
                      <button
                        onClick={() => handleDelete(v.id)}
                        className="text-red-400 bg-red-950/10 hover:bg-red-950/30 px-2.5 py-1 rounded border border-red-950 text-[11px] font-mono"
                      >
                        REJECT
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right sub-menu columns */}
        <div className="lg:col-span-4 flex flex-col gap-6">
          
          {/* Registered Users brief */}
          <div className="bg-[#0E0E0E] border border-gray-900 p-5 rounded-2xl">
            <h4 className="text-xs text-[#D4AF37] tracking-widest uppercase font-bold border-b border-gray-900 pb-2 mb-3">AUTHORIZED DEAF DEALS</h4>
            <div className="flex flex-col gap-2.5 text-xs text-gray-400">
              <div className="flex justify-between"><span>Alexander Sovereign</span><span className="text-white font-mono uppercase bg-yellow-950 text-yellow-500 px-1 py-0.5 rounded text-[9px]">Admin</span></div>
              <div className="flex justify-between"><span>Victoria Sterling</span><span className="text-gray-300">Seller</span></div>
              <div className="flex justify-between"><span>Consierge Support Desk</span><span className="text-[#D4AF37]">Fiduciary</span></div>
            </div>
          </div>

          {/* Quick CMS actions */}
          <div className="bg-[#0E0E0E] border border-[#D4AF37]/35 p-5 rounded-2xl font-mono text-xs flex flex-col gap-3">
            <h4 className="text-[#D4AF37] tracking-widest uppercase font-bold">HQ QUICK DISPATCH</h4>
            <button onClick={() => {
              const text = prompt("Enter draft title for new paper:");
              if(text) store.addBlogPost({
                title: text,
                excerpt: "New platform article published officially by the board director.",
                content: "Detailed analytical research insights regarding modern supercar design classifications and luxury compound investments.",
                author: "Board HQ Team",
                authorAvatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=150",
                category: "Executive Paper",
                image: "https://images.unsplash.com/photo-1544829099-b9a0c07fad1a?q=80&w=800",
                readTime: "4 min read",
              });
              alert("New study published in Journal archives!");
            }} className="w-full bg-[#121212] border border-gray-805 text-white hover:bg-gray-950 p-2 rounded text-left">
              ⁺ Publish New Journal Study
            </button>
            <button onClick={() => {
              store.resetFilters();
              store.navigate("browse");
            }} className="w-full bg-[#121212] border border-gray-805 text-white hover:bg-gray-950 p-2 rounded text-left">
              🔍 Trigger General Audits
            </button>
          </div>

        </div>

      </div>

    </div>
  );

  function handleDelete(id: string) {
    if(confirm("Confirm rejection of chassis consignment request.")) {
      store.deleteListing(id);
    }
  }
}
