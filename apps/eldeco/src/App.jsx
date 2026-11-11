import { useEffect } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Home from "./pages/Home";
import LoginPage from "./pages/Login";
import MainLayout from "./layout/MainLayout";
import Signup from "./pages/Signup";
import Pricing from "./pages/Pricing";
import AboutUs from "./pages/AboutUs";
import Profile from "./pages/Profile";
import DashboardPage from "./pages/DashboardPage";
import UploadPage from "./pages/UploadPage";
import ProcessingPage from "./pages/ProcessingPage";
import ResultsPage from "./pages/ResultsPage";
import HistoryPage from "./pages/History";
import SettingsPage from "./pages/Settings";
import SupportPage from "./pages/Support";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./firebase/useAuth";
import Features from "./pages/Features";
import Navbar from "./common/Navbar";
import TrialBalance from "./pages/TrialBalance";
import TrialBalancePreview from "./pages/TrialBalancePreview";
import ProcessTrialBalance from "./pages/ProcessTrialBalance";
import ResultTrialBalance from "./pages/ResultTrialBalance";
import FormatPL from "./formats/FormatPL";
import FormatCFS from "./formats/FormatCFS";
import FormatSOCE from "./formats/FormatSOCE";
import TBSummary from "./components/TBSummary";
import FormatBS from "./formats/FormatBS";
import Notes from "./pages/Notes";
import ResultNotes from "./pages/ResultNotes";
import BalanceSheet from "./pages/BalanceSheet";
import PL from "./pages/PL";
import AIAssistantPage from "./pages/AIAssistantPage";
import { ToastProvider } from "./context/ToastContext";
import Placeholder from "./pages/Placeholder";



function AppContent() {
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, loading } = useAuth();

  // Handle navigation when user becomes authenticated
  useEffect(() => {
    if (!loading && currentUser) {
      // Check if we're on login or signup page, then redirect to dashboard
      const currentPath = location.pathname;
      if (currentPath === "/login" || currentPath === "/signup") {
        navigate("/dashboard", { replace: true });
      }
    }
  }, [currentUser, loading, navigate, location.pathname]);

  return (
    <>
      {/* Navbar always visible on all pages */}
      {/* <Navbar /> */}
      <Routes>
        {/* LAYOUT ROUTE */}
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Home />} /> {/* /  → Home */}
          <Route path="login" element={<LoginPage />} /> {/* /login */}
          <Route path="signup" element={<Signup />} />
          <Route path="/pricing" element={<Pricing />} /> {/* <-- Route */}
          <Route path="/about" element={<AboutUs />} />
          <Route path="/features" element={<Features />} />
          <Route
            path="/dashboard/trial-balance/result-notes"
            element={
              <ProtectedRoute>
                <ResultNotes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/dashboard/trial-balance/notes"
            element={
              <ProtectedRoute>
                <Notes />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            }
          />
        </Route>

        {/* DASHBOARD ROUTES (Wrapped in MainLayout for Sidebar) */}
        <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/dashboard/upload" element={<UploadPage />} />
          <Route path="/dashboard/processing" element={<ProcessingPage />} />
          <Route path="/dashboard/trial-balance-preview" element={<TrialBalancePreview />} />
          <Route path="/dashboard/results" element={<ResultsPage />} />
          <Route path="/dashboard/history" element={<HistoryPage />} />
          <Route path="/dashboard/settings" element={<SettingsPage />} />
          <Route path="/dashboard/support" element={<SupportPage />} />
          <Route path="/dashboard/trial-balance/summary" element={<TBSummary />} />
          <Route path="/dashboard/PL" element={<FormatPL />} />
          <Route path="/dashboard/trial-balance/balance-sheet" element={<BalanceSheet />} />
          <Route path="/dashboard/trial-balance/profit-loss" element={<PL />} />
          <Route path="/dashboard/CFS" element={<FormatCFS />} />
          <Route path="/dashboard/trial-balance/notes" element={<Notes />} />
          <Route path="/dashboard/SOCE" element={<FormatSOCE />} />
          <Route path="/dashboard/trial-balance/balance-sheet/processed" element={<FormatBS />} />
          <Route path="/dashboard/trial-balance/profit-loss/processed" element={<FormatPL />} />
          <Route path="/dashboard/trial-balance/result-notes" element={<ResultNotes />} />
          <Route path="/dashboard/ai-assistant" element={<AIAssistantPage />} />
          <Route path="/dashboard/trial-balance/cash-flow" element={<FormatCFS />} />
          <Route path="/dashboard/working-sheets/soce" element={<FormatSOCE />} />
          <Route path="/dashboard/working-sheets/:sheet" element={<Placeholder />} />
          <Route path="/dashboard/*" element={<Placeholder notFound />} />
        </Route>

        {/* LEGACY / EXTERNAL ROUTES */}
        <Route path="/process/trialBalance" element={<ProtectedRoute><ProcessTrialBalance /></ProtectedRoute>} />
        <Route path="/process/trialBalance/results" element={<ProtectedRoute><ResultTrialBalance /></ProtectedRoute>} />
        <Route path="*" element={<Placeholder notFound />} />
      </Routes>
    </>
  );
}

function App() {
  return (
    // basename = vite "base" (e.g. /app/eldeco) so every route/link is relative to it
    <BrowserRouter basename={import.meta.env.BASE_URL.replace(/[/]$/, "") || "/"}>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </BrowserRouter>
  );
}


export default App;
