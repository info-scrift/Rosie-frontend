
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layouts
import PublicLayout from "./layouts/PublicLayout";
import AuthLayout from "./layouts/AuthLayout";
import ClientLayout from "./layouts/ClientLayout";
import AdminLayout from "./layouts/AdminLayout";


// Public Pages
import Index from "./pages/Index";
import Jobs from "./pages/Jobs";
import JobDetail from "./pages/JobDetail";
import VoiceBot from "./pages/VoiceBot";
import UploadResume from "./pages/UploadResume";
import JobMatches from "./pages/JobMatches";
import QuickApply from "./pages/QuickApply";
// Auth Pages
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";

// Profile Pages
import Profile from "./pages/profile/Profile";
import EditProfile from "./pages/profile/EditProfile";
import MyApplications from "./pages/profile/MyApplications";
import ApplicationDetail from "./pages/profile/ApplicationDetail";
import SavedJobs from "./pages/profile/SavedJobs";
import Notifications from "./pages/profile/Notifications";
import ProfileSettings from "./pages/profile/ProfileSettings";
import DeleteAccount from "./pages/profile/DeleteAccount";

// Hiring Pages
import HireLanding from "./pages/HireLanding";
import BookCall from "./pages/BookCall";
import RequestProposal from "./pages/RequestProposal";

// Client Pages
import ClientLogin from "./pages/client/ClientLogin";
import ClientRegister from "./pages/client/ClientRegister";
import ClientForgotPassword from "./pages/client/ClientForgotPassword";
import ClientResetPassword from "./pages/client/ClientResetPassword";
import ClientDashboard from "./pages/client/ClientDashboard";
import ClientJobs from "./pages/client/ClientJobs";
import CreateJob from "./pages/client/CreateJob";
import EditJob from "./pages/client/EditJob";
import ViewJob from "./pages/client/ViewJob";
import ClientCandidates from "./pages/client/ClientCandidates";
import ViewCandidate from "./pages/client/ViewCandidate";
import SavedCandidates from "./pages/client/SavedCandidates";
import ClientMessages from "./pages/client/ClientMessages";
import ClientAnalytics from "./pages/client/ClientAnalytics";
import ClientBilling from "./pages/client/ClientBilling";
import ClientSettings from "./pages/client/ClientSettings";
import TeamManagement from "./pages/client/TeamManagement";

// Admin Pages
import AdminLogin from "./pages/admin/AdminLogin";
import AdminForgotPassword from "./pages/admin/AdminForgotPassword";
import AdminResetPassword from "./pages/admin/AdminResetPassword";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminJobs from "./pages/admin/AdminJobs";
import AdminCreateJob from "./pages/admin/AdminCreateJob";
import AdminEditJob from "./pages/admin/AdminEditJob";
import AdminJobDetail from "./pages/admin/AdminJobDetail";
import AdminCandidates from "./pages/admin/AdminCandidates";
import AdminCandidateProfile from "./pages/admin/AdminCandidateProfile";
import AdminClients from "./pages/admin/AdminClients";
import AdminClientProfile from "./pages/admin/AdminClientProfile";
import AdminUsers from "./pages/admin/AdminUsers";
import AdminUserProfile from "./pages/admin/AdminUserProfile";
import AdminAnalytics from "./pages/admin/AdminAnalytics";
import AdminInvoices from "./pages/admin/AdminInvoices";
import AdminReferrals from "./pages/admin/AdminReferrals";
import AdminNotifications from "./pages/admin/AdminNotifications";
import AdminLogs from "./pages/admin/AdminLogs";
import AdminSettings from "./pages/admin/AdminSettings";
import AdminFeatureFlags from "./pages/admin/AdminFeatureFlags";

// Error Pages
import NotFound from "./pages/NotFound";
import Unauthorized from "./pages/Unauthorized";
import ServerError from "./pages/ServerError";
import Interview from "./pages/Interview";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<PublicLayout />}>
            <Route index element={<Index />} />
            <Route path="jobs" element={<Jobs />} />
            <Route path="jobs/:jobId" element={<JobDetail />} />
            <Route path="voice-bot" element={<VoiceBot />} />
            <Route path="interview" element={<Interview />}/>
            <Route path="upload-resume" element={<UploadResume />} />
            <Route path="job-matches" element={<JobMatches />} />
            <Route path="apply" element={<QuickApply />} />
            <Route path="hire" element={<HireLanding />} />
            <Route path="hire/book-call" element={<BookCall />} />
            <Route path="hire/proposal" element={<RequestProposal />} />
          </Route>

          {/* Auth Routes */}
          <Route element={<AuthLayout />}>
          
            <Route path="login" element={<Login />} />
            <Route path="register" element={<Register />} />
            <Route path="forgot-password" element={<ForgotPassword />} />
            <Route path="reset-password" element={<ResetPassword />} />
          </Route>

          {/* Profile Routes */}
          <Route path="profile" element={<PublicLayout />}>
            <Route index element={<Profile />} />
            <Route path="edit" element={<EditProfile />} />
            <Route path="applications" element={<MyApplications />} />
            <Route path="applications/:applicationId" element={<ApplicationDetail />} />
            <Route path="saved-jobs" element={<SavedJobs />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="settings" element={<ProfileSettings />} />
            <Route path="delete" element={<DeleteAccount />} />
          </Route>

          {/* Client Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="client/login" element={<ClientLogin />} />
            <Route path="client/register" element={<ClientRegister />} />
            <Route path="client/forgot-password" element={<ClientForgotPassword />} />
            <Route path="client/reset-password" element={<ClientResetPassword />} />
          </Route>

          {/* Client Portal Routes */}
          <Route path="client/portal" element={<ClientLayout />}>
            <Route index element={<ClientDashboard />} />
            <Route path="jobs" element={<ClientJobs />} />
            <Route path="jobs/create" element={<CreateJob />} />
            <Route path="jobs/:jobId" element={<ViewJob />} />
            <Route path="jobs/:jobId/edit" element={<EditJob />} />
            <Route path="candidates" element={<ClientCandidates />} />
            <Route path="candidates/:candidateId" element={<ViewCandidate />} />
            <Route path="saved-candidates" element={<SavedCandidates />} />
            <Route path="messages" element={<ClientMessages />} />
            <Route path="analytics" element={<ClientAnalytics />} />
            <Route path="billing" element={<ClientBilling />} />
            <Route path="settings" element={<ClientSettings />} />
            <Route path="team" element={<TeamManagement />} />
          </Route>

          {/* Admin Auth Routes */}
          <Route element={<AuthLayout />}>
            <Route path="admin/login" element={<AdminLogin />} />
            <Route path="admin/forgot-password" element={<AdminForgotPassword />} />
            <Route path="admin/reset-password" element={<AdminResetPassword />} />
          </Route>

          {/* Admin Portal Routes */}
          <Route path="admin" element={<AdminLayout />}>
            <Route index element={<AdminDashboard />} />
            <Route path="dashboard" element={<AdminDashboard />} />
            <Route path="jobs" element={<AdminJobs />} />
            <Route path="jobs/create" element={<AdminCreateJob />} />
            <Route path="jobs/:jobId" element={<AdminJobDetail />} />
            <Route path="jobs/:jobId/edit" element={<AdminEditJob />} />
            <Route path="candidates" element={<AdminCandidates />} />
            <Route path="candidates/:candidateId" element={<AdminCandidateProfile />} />
            <Route path="clients" element={<AdminClients />} />
            <Route path="clients/:clientId" element={<AdminClientProfile />} />
            <Route path="users" element={<AdminUsers />} />
            <Route path="users/:userId" element={<AdminUserProfile />} />
            <Route path="analytics" element={<AdminAnalytics />} />
            <Route path="invoices" element={<AdminInvoices />} />
            <Route path="referrals" element={<AdminReferrals />} />
            <Route path="notifications" element={<AdminNotifications />} />
            <Route path="logs" element={<AdminLogs />} />
            <Route path="settings" element={<AdminSettings />} />
            <Route path="feature-flags" element={<AdminFeatureFlags />} />
          </Route>

          {/* Error Routes */}
          <Route path="401" element={<Unauthorized />} />
          <Route path="500" element={<ServerError />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
