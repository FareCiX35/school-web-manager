import { Switch, Route, Router as WouterRouter, useLocation } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

import { PublicLayout } from "@/components/layout/PublicLayout";
import { AdminLayout } from "@/components/layout/AdminLayout";

import Home from "@/pages/home";
import EventsPage from "@/pages/events";
import StudentsPage from "@/pages/students";
import TeachersPage from "@/pages/teachers";
import GalleryPage from "@/pages/gallery";
import AlumniPage from "@/pages/alumni";
import ContactPage from "@/pages/contact";
import NotFound from "@/pages/not-found";

import AdminLogin from "@/pages/admin/login";
import AdminDashboard from "@/pages/admin/dashboard";
import AdminAnnouncements from "@/pages/admin/crud-announcements";
import AdminEvents from "@/pages/admin/crud-events";
import { 
  AdminNews, 
  AdminStudents, 
  AdminTeachers, 
  AdminAlumni, 
  AdminGallery, 
  AdminClubs, 
  AdminContact, 
  AdminSettings 
} from "@/pages/admin/index";

const queryClient = new QueryClient();

function PublicRoutes() {
  return (
    <PublicLayout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/etkinlikler" component={EventsPage} />
        <Route path="/ogrenci-kosesi" component={StudentsPage} />
        <Route path="/ogretmen-atolyesi" component={TeachersPage} />
        <Route path="/mezunlar-kulubu" component={AlumniPage} />
        <Route path="/galeri" component={GalleryPage} />
        <Route path="/iletisim" component={ContactPage} />
        {/* We catch 404 in main router */}
      </Switch>
    </PublicLayout>
  );
}

function AdminRoutes() {
  const [location] = useLocation();
  if (location === "/admin/login") {
    return <AdminLogin />;
  }

  return (
    <AdminLayout>
      <Switch>
        <Route path="/admin" component={AdminDashboard} />
        <Route path="/admin/announcements" component={AdminAnnouncements} />
        <Route path="/admin/events" component={AdminEvents} />
        <Route path="/admin/news" component={AdminNews} />
        <Route path="/admin/students" component={AdminStudents} />
        <Route path="/admin/teachers" component={AdminTeachers} />
        <Route path="/admin/alumni" component={AdminAlumni} />
        <Route path="/admin/gallery" component={AdminGallery} />
        <Route path="/admin/clubs" component={AdminClubs} />
        <Route path="/admin/contact" component={AdminContact} />
        <Route path="/admin/settings" component={AdminSettings} />
      </Switch>
    </AdminLayout>
  );
}

function Router() {
  const [location] = useLocation();
  const isAdmin = location.startsWith("/admin");

  if (isAdmin) {
    return <AdminRoutes />;
  }

  return (
    <Switch>
      <Route path="/" component={PublicRoutes} />
      <Route path="/etkinlikler" component={PublicRoutes} />
      <Route path="/ogrenci-kosesi" component={PublicRoutes} />
      <Route path="/ogretmen-atolyesi" component={PublicRoutes} />
      <Route path="/mezunlar-kulubu" component={PublicRoutes} />
      <Route path="/galeri" component={PublicRoutes} />
      <Route path="/iletisim" component={PublicRoutes} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
