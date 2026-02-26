import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { lazy, Suspense } from "react";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";
import { PromoWidget } from "./components/PromoWidget";

// Critical path: Home loaded eagerly (needed for first paint)
import Home from "./pages/Home";

// All other pages lazy-loaded to reduce initial bundle
const About = lazy(() => import("./pages/About"));
const HowItWorks = lazy(() => import("./pages/HowItWorks"));
const Contact = lazy(() => import("./pages/Contact"));
const Terms = lazy(() => import("./pages/Terms"));
const Privacy = lazy(() => import("./pages/Privacy"));
const ResponsiblePlay = lazy(() => import("./pages/ResponsiblePlay"));
const NotFound = lazy(() => import("./pages/NotFound"));

// Auth pages
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));

// User pages
const Dashboard = lazy(() => import("./pages/Dashboard"));
const Challenges = lazy(() => import("./pages/Challenges"));
const MatchDetail = lazy(() => import("./pages/MatchDetail"));
const TeamBuilder = lazy(() => import("./pages/TeamBuilder"));
const Leaderboard = lazy(() => import("./pages/Leaderboard"));
const Profile = lazy(() => import("./pages/Profile"));

// Admin pages (heaviest — always lazy)
const AdminLayout = lazy(() => import("./pages/admin/AdminLayout"));
const AdminDashboard = lazy(() => import("./pages/admin/AdminDashboard"));
const AdminMatches = lazy(() => import("./pages/admin/AdminMatches"));
const AdminPlayers = lazy(() => import("./pages/admin/AdminPlayers"));
const AdminChallenges = lazy(() => import("./pages/admin/AdminChallenges"));
const AdminUsers = lazy(() => import("./pages/admin/AdminUsers"));

// Minimal spinner shown while lazy chunks load
function PageLoader() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

function Router() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Switch>
        {/* Public */}
        <Route path="/" component={Home} />
        <Route path="/about" component={About} />
        <Route path="/how-it-works" component={HowItWorks} />
        <Route path="/contact" component={Contact} />
        <Route path="/terms" component={Terms} />
        <Route path="/privacy" component={Privacy} />
        <Route path="/responsible-play" component={ResponsiblePlay} />

        {/* Auth */}
        <Route path="/login" component={Login} />
        <Route path="/register" component={Register} />

        {/* User */}
        <Route path="/dashboard" component={Dashboard} />
        <Route path="/challenges" component={Challenges} />
        <Route path="/match/:id" component={MatchDetail} />
        <Route path="/team-builder/:challengeId/:matchId" component={TeamBuilder} />
        <Route path="/leaderboard" component={Leaderboard} />
        <Route path="/leaderboard/:challengeId" component={Leaderboard} />
        <Route path="/profile" component={Profile} />

        {/* Admin */}
        <Route path="/admin" component={() => <AdminLayout><AdminDashboard /></AdminLayout>} />
        <Route path="/admin/matches" component={() => <AdminLayout><AdminMatches /></AdminLayout>} />
        <Route path="/admin/players/:matchId" component={() => <AdminLayout><AdminPlayers /></AdminLayout>} />
        <Route path="/admin/challenges" component={() => <AdminLayout><AdminChallenges /></AdminLayout>} />
        <Route path="/admin/users" component={() => <AdminLayout><AdminUsers /></AdminLayout>} />

        <Route component={NotFound} />
      </Switch>
    </Suspense>
  );
}

function App() {
  return (
      <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <PromoWidget />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
