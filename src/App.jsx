import { Toaster } from "@/components/ui/toaster"
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClientInstance } from '@/lib/query-client'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PageNotFound from './lib/PageNotFound';
import { AuthProvider, useAuth } from '@/lib/AuthContext';
import UserNotRegisteredError from '@/components/UserNotRegisteredError';

// Page imports
import Home from '@/pages/Home';
import ContinentsPage from '@/pages/ContinentsPage';
import ContinentDetail from '@/pages/ContinentDetail';
import CountriesPage from '@/pages/CountriesPage';
import CountryDetail from '@/pages/CountryDetail';
import ProjectsPage from '@/pages/ProjectsPage';
import PartnershipsPage from '@/pages/PartnershipsPage';
import PartnershipForm from '@/pages/PartnershipForm';
import ReportsPage from '@/pages/ReportsPage';

const AuthenticatedApp = () => {
  const { isLoadingAuth, isLoadingPublicSettings, authError, navigateToLogin } = useAuth();

  if (isLoadingPublicSettings || isLoadingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-[hsl(222,47%,11%)]">
        <div className="text-center">
          <div className="w-10 h-10 border-2 border-amber-400/30 border-t-amber-400 rounded-full animate-spin mx-auto mb-4" />
          <div className="text-amber-400/60 text-sm">Loading Global Development Hub...</div>
        </div>
      </div>
    );
  }

  if (authError) {
    if (authError.type === 'user_not_registered') {
      return <UserNotRegisteredError />;
    } else if (authError.type === 'auth_required') {
      navigateToLogin();
      return null;
    }
  }

  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/continents" element={<ContinentsPage />} />
      <Route path="/continents/:id" element={<ContinentDetail />} />
      <Route path="/countries" element={<CountriesPage />} />
      <Route path="/countries/:iso" element={<CountryDetail />} />
      <Route path="/projects" element={<ProjectsPage />} />
      <Route path="/projects/new" element={<ProjectsPage />} />
      <Route path="/partnerships" element={<PartnershipsPage />} />
      <Route path="/partnerships/new" element={<PartnershipForm />} />
      <Route path="/reports" element={<ReportsPage />} />
      <Route path="*" element={<PageNotFound />} />
    </Routes>
  );
};

function App() {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        <Router>
          <AuthenticatedApp />
        </Router>
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  )
}

export default App