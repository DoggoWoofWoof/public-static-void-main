import { AuthorityLayout } from "./authority-layout";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, MapPin, UserCheck, ShieldCheck, HeartHandshake,
  CheckCircle2, Clock, Check
} from "lucide-react";
import { GradientButton } from "./gradient-button";

export const CaseTimelinePage = () => {
  return (
    <AuthorityLayout
      title="Case Timeline Journey"
      subtitle="Visual progress tracking for Ahmad Karimi (BB-7821)"
    >
      <div className="max-w-4xl mx-auto py-6">
         
         <div className="flex items-center justify-between mb-8">
            <Link to="/case/BB-7821" className="flex items-center text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-200 transition-colors">
               <ArrowLeft className="h-4 w-4 mr-2" /> Back to Case Details
            </Link>
            <GradientButton className="h-9 px-4 rounded-lg pointer-events-none shadow-sm opacity-90">
               Status: Verified
            </GradientButton>
         </div>

         {/* The Main Timeline Visualization */}
         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-2xl shadow-sm overflow-hidden p-8 sm:p-12 relative">
            
            {/* Connecting Vertical Line */}
            <div className="absolute left-12 sm:left-[88px] top-24 bottom-24 w-1 bg-gradient-to-b from-blue-500 via-indigo-500 to-gray-200 dark:to-gray-800 rounded-full"></div>

            <div className="space-y-16">
               
               {/* Phase 1: Arrival & Intake (Completed) */}
               <div className="relative flex gap-6 sm:gap-12">
                  <div className="relative z-10 flex flex-col items-center">
                     <div className="h-12 w-12 rounded-full bg-blue-500 border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-md shrink-0">
                        <MapPin className="h-5 w-5 text-white" />
                     </div>
                     <div className="mt-2 text-xs font-bold text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-900/30 px-2 py-1 rounded-full border border-blue-200 dark:border-blue-800/50">
                        Oct 10
                     </div>
                  </div>
                  <div className="flex-1 pt-1">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                        Arrival & Initial Intake <CheckCircle2 className="h-5 w-5 ml-2 text-blue-500" />
                     </h3>
                     <p className="text-sm text-gray-500 mt-1 mb-4">Initial border crossing registered and basic demographic data recorded.</p>
                     
                     <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800">
                        <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                           <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Border Arrival Logged</li>
                           <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Self-Declaration Form Submitted</li>
                           <li className="flex items-center gap-2"><Check className="h-4 w-4 text-green-500" /> Primary Health Check Passed</li>
                        </ul>
                     </div>
                  </div>
               </div>

               {/* Phase 2: Evidence Review (Completed) */}
               <div className="relative flex gap-6 sm:gap-12">
                  <div className="relative z-10 flex flex-col items-center">
                     <div className="h-12 w-12 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-900 flex items-center justify-center shadow-md shrink-0">
                        <UserCheck className="h-5 w-5 text-white" />
                     </div>
                     <div className="mt-2 text-xs font-bold text-indigo-600 dark:text-indigo-400 bg-indigo-50 dark:bg-indigo-900/30 px-2 py-1 rounded-full border border-indigo-200 dark:border-indigo-800/50">
                        Oct 12
                     </div>
                  </div>
                  <div className="flex-1 pt-1">
                     <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 flex items-center">
                        Evidence Review <CheckCircle2 className="h-5 w-5 ml-2 text-indigo-500" />
                     </h3>
                     <p className="text-sm text-gray-500 mt-1 mb-4">Biometrics and supporting documentation verified by the system and officers.</p>
                     
                     <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-4 border border-gray-100 dark:border-gray-800 flex gap-4 overflow-x-auto hide-scrollbar">
                        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[150px] shadow-sm">
                           <p className="text-xs text-gray-500 font-medium">Biometrics</p>
                           <p className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1 mt-1"><Check className="h-3 w-3" /> Validated</p>
                        </div>
                        <div className="bg-white dark:bg-gray-900 p-3 rounded-lg border border-gray-200 dark:border-gray-700 min-w-[150px] shadow-sm">
                           <p className="text-xs text-gray-500 font-medium">NGO Link</p>
                           <p className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-1 mt-1"><Check className="h-3 w-3" /> Confirmed</p>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Phase 3: Identity Verified (Active) */}
               <div className="relative flex gap-6 sm:gap-12">
                  <div className="relative z-10 flex flex-col items-center">
                     <div className="h-12 w-12 rounded-full bg-white dark:bg-gray-900 border-4 border-blue-500 flex items-center justify-center shadow-md shrink-0 relative overflow-hidden">
                        {/* Pulse effect for active state */}
                        <div className="absolute inset-0 bg-blue-500/20 animate-pulse"></div>
                        <ShieldCheck className="h-5 w-5 text-blue-600 dark:text-blue-400 z-10" />
                     </div>
                     <div className="mt-2 text-xs font-bold text-gray-600 dark:text-gray-400 bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded-full border border-gray-200 dark:border-gray-700">
                        Today
                     </div>
                  </div>
                  <div className="flex-1 pt-1 opacity-100">
                     <h3 className="text-xl font-bold text-blue-600 dark:text-blue-400 flex items-center">
                        Identity Verified
                     </h3>
                     <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 mb-4">Confidence score threshold reached. Ready for integration services assignment.</p>
                     
                     <div className="bg-blue-50 dark:bg-blue-900/10 rounded-xl p-5 border border-blue-100 dark:border-blue-900/30 inline-block w-full sm:w-auto">
                        <div className="flex items-end gap-3">
                           <div>
                              <p className="text-xs font-semibold text-blue-800 dark:text-blue-200 uppercase tracking-wider mb-1">Final Confidence Score</p>
                              <p className="text-4xl font-black text-blue-600 dark:text-blue-400 leading-none">65</p>
                           </div>
                           <Link to="/scoring" className="text-sm font-medium text-blue-700 dark:text-blue-300 hover:underline mb-1 ml-4">
                              View Engine Analysis →
                           </Link>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Phase 4: Integration (Pending) */}
               <div className="relative flex gap-6 sm:gap-12">
                  <div className="relative z-10 flex flex-col items-center">
                     <div className="h-12 w-12 rounded-full bg-gray-100 dark:bg-gray-800 border-4 border-gray-200 dark:border-gray-700 flex items-center justify-center shrink-0">
                        <HeartHandshake className="h-5 w-5 text-gray-400" />
                     </div>
                  </div>
                  <div className="flex-1 pt-1 opacity-50">
                     <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 flex items-center">
                        Integration & Settlement <Clock className="h-4 w-4 ml-2" />
                     </h3>
                     <p className="text-sm text-gray-500 mt-1 mb-4">Pending referral matching and service deployment.</p>
                     
                     <div className="bg-dashed border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl p-6 text-center">
                        <p className="text-sm font-medium text-gray-500 mb-3">No active referrals deployed yet.</p>
                        <Link to="/referrals" className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700 transition-colors shadow-sm">
                           Manage Referrals
                        </Link>
                     </div>
                  </div>
               </div>

            </div>
         </div>

      </div>
    </AuthorityLayout>
  );
};
