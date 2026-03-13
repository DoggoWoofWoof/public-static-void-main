"use client"
import { useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  ShieldAlert,
  ShieldCheck,
  Clock,
  User,
  MapPin,
  Calendar,
  AlertCircle,
  FileCheck,
  Plus,
  RefreshCw,
  Share2,
  TrendingDown,
  TrendingUp,
  FileText
} from "lucide-react";
import { Link } from "react-router-dom";
import { GradientButton } from "./gradient-button";
import { ShaderAnimation } from "./shader-animation";

export const CaseDetail = () => {
  const [isDark] = useState(false);

  // Mock data representing a fetched case
  const caseData = {
    id: "BB-7821",
    status: "Under Review",
    score: 68,
    person: {
      name: "Ahmad Karimi",
      dob: "1985-04-12",
      nationality: "Syrian",
      sex: "Male",
      language: "Arabic"
    },
    evidence: [
      { id: 1, type: "Biometric Match", class: "Official", state: "Accepted", date: "Oct 12, 2023" },
      { id: 2, type: "NGO Validation", class: "Official", state: "Accepted", date: "Oct 14, 2023" },
      { id: 3, type: "Family Link", class: "Corroborated", state: "Pending Review", date: "Oct 15, 2023" },
      { id: 4, type: "Education Claim", class: "Self-Declared", state: "Pending Review", date: "Oct 15, 2023" },
    ],
    scoreBreakdown: [
      { factor: "Biometric Match Accepted", impact: "+28", type: "positive" },
      { factor: "Verified NGO Record", impact: "+15", type: "positive" },
      { factor: "Family Link Pending Review", impact: "0", type: "neutral" },
      { factor: "Missing Official Travel Document", impact: "-12", type: "negative" }
    ]
  };

  return (
    <div className={`relative flex min-h-screen w-full overflow-hidden bg-gray-50/50 dark:bg-gray-950 font-sans ${isDark ? 'dark' : ''}`}>
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 opacity-[0.1]">
          <ShaderAnimation className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/94 via-gray-50/82 to-gray-50/96 dark:from-gray-950/95 dark:via-gray-950/86 dark:to-gray-950/96" />
      </div>
      <div className="relative z-10 flex-1 overflow-auto p-4 md:p-8 max-w-6xl mx-auto">
        
        {/* Breadcrumb / Back Navigation */}
        <nav className="flex items-center text-sm font-medium text-gray-500 mb-6 group">
          <Link to="/dashboard" className="flex items-center hover:text-gray-900 transition-colors">
            <ArrowLeft className="h-4 w-4 mr-1 transition-transform group-hover:-translate-x-1" />
            Dashboard
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-gray-400" />
          <span className="text-gray-900 font-semibold">{caseData.id}</span>
        </nav>

        {/* Header Section */}
        <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900">Case {caseData.id}</h1>
              <Badge status={caseData.status} />
            </div>
            <p className="text-gray-500 text-sm max-w-xl">
              Manage evidence, review identity flags, and monitor confidence scores for this individual.
            </p>
          </div>

          {/* Big Score Indicator */}
          <div className="flex items-center bg-white border border-gray-200 shadow-sm rounded-xl p-4 min-w-[200px]">
            <div className="mr-5">
              <p className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-1">Confidence Score</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-gray-900">{caseData.score}</span>
                <span className="text-sm font-medium text-yellow-600 bg-yellow-50 px-2 py-0.5 rounded-md">Provisional</span>
              </div>
            </div>
            {caseData.score >= 60 ? (
               <div className="h-12 w-12 rounded-full bg-blue-50 flex items-center justify-center">
                 <ShieldCheck className="h-6 w-6 text-blue-600" />
               </div>
            ) : (
                <div className="h-12 w-12 rounded-full bg-yellow-50 flex items-center justify-center">
                  <ShieldAlert className="h-6 w-6 text-yellow-600" />
                </div>
            )}
          </div>
        </header>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Person & Score Breakdown) */}
          <div className="lg:col-span-1 space-y-8">
            
            {/* Person Details Card */}
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Person Details</h2>
                <User className="h-5 w-5 text-gray-400" />
              </div>
              <div className="p-6">
                <dl className="space-y-4">
                  <div>
                    <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Full Name</dt>
                    <dd className="text-base font-medium text-gray-900">{caseData.person.name}</dd>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <Calendar className="h-3.5 w-3.5" /> DOB
                      </dt>
                      <dd className="text-sm text-gray-900">{caseData.person.dob}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <User className="h-3.5 w-3.5" /> Sex
                      </dt>
                      <dd className="text-sm text-gray-900">{caseData.person.sex}</dd>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1 flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" /> Nationality
                      </dt>
                      <dd className="text-sm text-gray-900">{caseData.person.nationality}</dd>
                    </div>
                    <div>
                      <dt className="text-xs font-medium text-gray-500 uppercase tracking-wider mb-1">Language</dt>
                      <dd className="text-sm text-gray-900">{caseData.person.language}</dd>
                    </div>
                  </div>
                </dl>
              </div>
            </section>

            {/* Score Breakdown Card */}
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-100">
                <h2 className="text-lg font-semibold text-gray-900">Score Breakdown</h2>
                <p className="text-xs text-gray-500 mt-1">Factors influencing the ML confidence score.</p>
              </div>
              <div className="p-2">
                <ul className="divide-y divide-gray-50">
                  {caseData.scoreBreakdown.map((item, idx) => (
                    <li key={idx} className="flex items-center justify-between p-4 hover:bg-gray-50 rounded-lg transition-colors">
                      <div className="flex items-center gap-3">
                        <div className={`p-1.5 rounded-full ${
                          item.type === 'positive' ? 'bg-green-100 text-green-600' :
                          item.type === 'negative' ? 'bg-red-100 text-red-600' :
                          'bg-gray-100 text-gray-500'
                        }`}>
                          {item.type === 'positive' ? <TrendingUp className="h-3.5 w-3.5" /> :
                           item.type === 'negative' ? <TrendingDown className="h-3.5 w-3.5" /> :
                           <AlertCircle className="h-3.5 w-3.5" />}
                        </div>
                        <span className="text-sm font-medium text-gray-700">{item.factor}</span>
                      </div>
                      <span className={`text-sm font-bold ${
                          item.type === 'positive' ? 'text-green-600' :
                          item.type === 'negative' ? 'text-red-600' :
                          'text-gray-500'
                      }`}>{item.impact}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>

          {/* Right Column (Evidence & Graph) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Evidence Table */}
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-6 py-5 border-b border-gray-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold text-gray-900">Submitted Evidence</h2>
                  <p className="text-sm text-gray-500 mt-1">Review documents, biometrics, and corroborated links.</p>
                </div>
                <GradientButton className="h-10 px-4 py-2 min-w-0 rounded-lg">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Evidence
                </GradientButton>
              </div>
              
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Trust Class</th>
                      <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                      <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {caseData.evidence.map((item) => (
                      <tr key={item.id} className="hover:bg-gray-50 transition-colors cursor-pointer group">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="flex items-center">
                            <FileText className="h-5 w-5 text-gray-400 mr-3 group-hover:text-blue-500 transition-colors" />
                            <span className="text-sm font-medium text-gray-900">{item.type}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className="text-sm text-gray-600">{item.class}</span>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <EvidenceStateBadge state={item.state} />
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-500">
                          {item.date}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Identity Evidence Graph Placeholder */}
            <section className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden flex flex-col h-[400px]">
               <div className="px-6 py-5 border-b border-gray-100 flex items-center justify-between">
                <h2 className="text-lg font-semibold text-gray-900">Identity Evidence Graph</h2>
                <div className="p-2 bg-gray-50 rounded-lg">
                  <Share2 className="h-4 w-4 text-gray-500" />
                </div>
              </div>
              <div className="flex-1 bg-gray-50/50 relative overflow-hidden flex items-center justify-center p-6">
                 {/* Visual Mock of vis-network graph */}
                 <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50"></div>
                 
                 <div className="relative w-full h-full flex items-center justify-center">
                    {/* Center Node */}
                    <div className="absolute z-10 flex flex-col items-center">
                       <div className="h-16 w-16 bg-blue-600 rounded-full shadow-lg border-4 border-white flex items-center justify-center">
                          <User className="h-6 w-6 text-white" />
                       </div>
                       <span className="mt-2 text-sm font-bold text-gray-900 bg-white/80 backdrop-blur-sm px-2 py-1 rounded">Ahmad</span>
                    </div>

                    {/* Surrounding Nodes */}
                    <div className="absolute -top-4 -left-12 flex flex-col items-center opacity-80">
                       <div className="h-12 w-12 bg-green-500 rounded-full shadow border-2 border-white flex items-center justify-center">
                          <FileCheck className="h-5 w-5 text-white" />
                       </div>
                    </div>
                    
                    <div className="absolute top-12 right-4 flex flex-col items-center opacity-80">
                       <div className="h-12 w-12 bg-green-500 rounded-full shadow border-2 border-white flex items-center justify-center">
                          <ShieldCheck className="h-5 w-5 text-white" />
                       </div>
                    </div>

                    <div className="absolute bottom-4 left-10 flex flex-col items-center opacity-50">
                       <div className="h-10 w-10 bg-yellow-400 rounded-full shadow border-2 border-white flex items-center justify-center">
                          <AlertCircle className="h-5 w-5 text-white" />
                       </div>
                    </div>

                    {/* SVG Connecting Lines */}
                    <svg className="absolute inset-0 h-full w-full pointer-events-none" preserveAspectRatio="none">
                      <path d="M 50% 50% L 35% 25%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                      <path d="M 50% 50% L 65% 35%" stroke="#cbd5e1" strokeWidth="2" />
                      <path d="M 50% 50% L 40% 70%" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
                    </svg>
                 </div>
              </div>
            </section>

          </div>
        </div>

        {/* Global Action Bar */}
        <div className="mt-8 pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-center justify-end gap-4">
          <button className="w-full sm:w-auto px-5 py-2.5 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 hover:text-gray-900 shadow-sm transition-colors focus:ring-2 focus:ring-offset-2 focus:ring-gray-200 flex items-center justify-center">
            <RefreshCw className="h-4 w-4 mr-2" />
            Recompute Score
          </button>
          <GradientButton className="w-full sm:w-auto rounded-lg">
            Create Referral
            <ChevronRight className="h-4 w-4 ml-1" />
          </GradientButton>
        </div>

      </div>
    </div>
  );
};

// --- Helper Components ---

const Badge = ({ status }: { status: string }) => {
  const isReview = status.toLowerCase().includes('review');
  const isVerified = status.toLowerCase().includes('verified');
  
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
      isReview ? 'bg-yellow-50 text-yellow-700 border-yellow-200' : 
      isVerified ? 'bg-green-50 text-green-700 border-green-200' : 
      'bg-gray-50 text-gray-700 border-gray-200'
    }`}>
      {isReview && <Clock className="h-3 w-3 mr-1" />}
      {isVerified && <ShieldCheck className="h-3 w-3 mr-1" />}
      {status}
    </span>
  );
};

const EvidenceStateBadge = ({ state }: { state: string }) => {
  const isAccepted = state === "Accepted";
  const isPending = state === "Pending Review";
  const isDisputed = state === "Disputed";

  return (
    <span className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
      isAccepted ? 'bg-green-100 text-green-700' :
      isPending ? 'bg-gray-100 text-gray-600' :
      isDisputed ? 'bg-red-100 text-red-700' :
      'bg-gray-100 text-gray-700'
    }`}>
      {state}
    </span>
  );
};

export default CaseDetail;
