/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useGlobalStore, store } from "./store";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

// Public pages imports
import {
  HomeView,
  BrowseView,
  VehicleDetailsView,
  SellYourCarView,
  BrandsView,
  BrandDetailsView,
  CategoriesView,
  AboutView,
  ContactView,
  FAQView,
  BlogView,
  BlogDetailsView
} from "./pages/PublicPages";

// Dashboard & Auth imports
import {
  LoginView,
  RegisterView,
  ForgotPasswordView,
  ResetPasswordView,
  DashboardLayout,
  DashboardOverview,
  MyListings,
  SavedVehicles,
  SecureMessages,
  ProfileSettings,
  AccountSettings,
  AdminOverview
} from "./pages/DashboardPages";

export default function App() {
  const { currentRoute, currentUser } = useGlobalStore();

  // URL Hash parser
  const renderCurrentView = () => {
    const routeParts = currentRoute.split("?")[0].split("/");
    const primaryRoute = routeParts[0];
    const subRouteId = routeParts[1] || "";

    // 1. PUBLIC ROUTES
    switch (primaryRoute) {
      case "home":
      case "":
        return <HomeView />;
      case "browse":
        return <BrowseView />;
      case "vehicle":
        return <VehicleDetailsView id={subRouteId} />;
      case "sell":
        return <SellYourCarView />;
      case "brands":
        return <BrandsView />;
      case "brand":
        return <BrandDetailsView id={subRouteId} />;
      case "categories":
        return <CategoriesView />;
      case "about":
        return <AboutView />;
      case "contact":
        return <ContactView />;
      case "faq":
        return <FAQView />;
      case "blog":
        return <BlogView />;
      case "blog-detail":
      case "blog":
        if (subRouteId) {
          return <BlogDetailsView id={subRouteId} />;
        }
        return <BlogView />;
      
      // 2. AUTHENTICATION ROUTES
      case "login":
        return <LoginView />;
      case "register":
        return <RegisterView />;
      case "forgot-password":
        return <ForgotPasswordView />;
      case "reset-password":
        return <ResetPasswordView />;

      // 3. PRIVATE USER CORE DASHBOARDS
      case "dashboard":
        if (!currentUser) {
          return <LoginView />;
        }
        return (
          <DashboardLayout>
            {(() => {
              switch (subRouteId) {
                case "overview":
                case "":
                  return <DashboardOverview />;
                case "listings":
                  return <MyListings />;
                case "saved":
                  return <SavedVehicles />;
                case "messages":
                  return <SecureMessages />;
                case "profile":
                  return <ProfileSettings />;
                case "account":
                  return <AccountSettings />;
                default:
                  return <DashboardOverview />;
              }
            })()}
          </DashboardLayout>
        );

      // 4. EXECUTIVE ADMIN HQ PANEL
      case "admin":
        if (!currentUser || currentUser.role !== "Admin") {
          return (
            <div className="max-w-md mx-auto my-20 bg-[#0E0E0E] border border-red-900/40 p-6 rounded-xl text-center">
              <h2 className="text-sm font-mono text-red-400 font-bold uppercase tracking-widest">ACCESS FORBIDDEN</h2>
              <p className="text-xs text-gray-400 mt-2">Executive permissions required. Please authorize using the Admin credentials.</p>
              <button
                onClick={() => {
                  useGlobalStore();
                  store.login({
                    id: "admin-default",
                    email: "admin@luxedrive.com",
                    name: "Alexander Sovereign",
                    phone: "+1 (310) 555-8822",
                    role: "Admin",
                    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=200",
                    listingsCount: 2
                  });
                  store.navigate("admin/overview");
                }}
                className="mt-5 bg-red-950/20 text-red-400 hover:bg-red-950/40 border border-red-900/50 text-xs px-4 py-2.5 rounded font-mono uppercase"
              >
                Auto-Authorize Admin profile
              </button>
            </div>
          );
        }
        return (
          <DashboardLayout>
            {(() => {
              switch (subRouteId) {
                case "overview":
                case "":
                default:
                  return <AdminOverview />;
              }
            })()}
          </DashboardLayout>
        );

      default:
        return <HomeView />;
    }
  };

  return (
    <div id="application-container" className="min-h-screen bg-[#0A0A0A] text-[#E5E4E2] flex flex-col justify-between selection:bg-[#D4AF37] selection:text-black antialiased transition-all duration-300">
      
      {/* Universal Luxury Navigation Headers bar */}
      <Navbar />

      {/* Main Dynamic Stage rendering center */}
      <main className="flex-grow">
        {renderCurrentView()}
      </main>

      {/* Sovereign Catalog map layout footer */}
      <Footer />

    </div>
  );
}
