
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { LandingPage } from './components/ui/landing-page';
import { AnimatedLoginPage } from './components/ui/animated-characters-login-page';
import { AuthorityDashboard } from './components/ui/dashboard-with-collapsible-sidebar';
import { CaseDetail } from './components/ui/case-detail';
import { ClientRegistration } from './components/ui/client-registration';
import { RefugeePortal } from './components/ui/refugee-portal';
import { CasesPage } from './components/ui/cases';
import { EvidenceReviewPage } from './components/ui/evidence-review';
import { ScoringPage } from './components/ui/scoring';
import { AnnouncementsPage } from './components/ui/announcements';
import { ReferralsPage } from './components/ui/referrals';
import { CaseTimelinePage } from './components/ui/case-timeline';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<AnimatedLoginPage />} />
        <Route path="/dashboard" element={<AuthorityDashboard />} />
        <Route path="/cases" element={<CasesPage />} />
        <Route path="/case/:id" element={<CaseDetail />} />
        <Route path="/timeline" element={<CaseTimelinePage />} />
        <Route path="/timeline/:id" element={<CaseTimelinePage />} />
        <Route path="/evidence" element={<EvidenceReviewPage />} />
        <Route path="/scoring" element={<ScoringPage />} />
        <Route path="/announcements" element={<AnnouncementsPage />} />
        <Route path="/referrals" element={<ReferralsPage />} />
        
        {/* Registration paths */}
        <Route path="/registration" element={<ClientRegistration />} />
        
        {/* Refugee Portal paths */}
        <Route path="/refugee" element={<RefugeePortal />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
