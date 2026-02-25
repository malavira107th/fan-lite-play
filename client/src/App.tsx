import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/NotFound";
import { Route, Switch } from "wouter";
import ErrorBoundary from "./components/ErrorBoundary";
import { ThemeProvider } from "./contexts/ThemeContext";

// Public pages
import Home from "./pages/Home";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import Contact from "./pages/Contact";
import Terms from "./pages/Terms";
import Privacy from "./pages/Privacy";
import ResponsiblePlay from "./pages/ResponsiblePlay";

// Auth pages
import Login from "./pages/Login";
import Register from "./pages/Register";

// User pages
import Dashboard from "./pages/Dashboard";
import Challenges from "./pages/Challenges";
import MatchDetail from "./pages/MatchDetail";
import TeamBuilder from "./pages/TeamBuilder";
import Leaderboard from "./pages/Leaderboard";
import Profile from "./pages/Profile";

// Admin pages
import AdminLayout from "./pages/admin/AdminLayout";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminMatches from "./pages/admin/AdminMatches";
import AdminPlayers from "./pages/admin/AdminPlayers";
import AdminChallenges from "./pages/admin/AdminChallenges";
import AdminUsers from "./pages/admin/AdminUsers";

function Router() {
  return (
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
  );
}

function App() {
  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="dark">
        <TooltipProvider>
          <Toaster richColors position="top-right" />
          <Router />
        </TooltipProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
