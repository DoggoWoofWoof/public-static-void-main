
import { AuthorityLayout } from "./authority-layout";
import { ShieldCheck, BookOpen, Briefcase } from "lucide-react";
import { EvidenceGraph } from "./evidence-graph";

export const ScoringPage = () => {
  return (
    <AuthorityLayout
      title="Identity Confidence Engine"
      subtitle="Analyze how identity scores are calculated and dynamically updated."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         
         {/* Main Scoring Overview */}
         <div className="lg:col-span-2 space-y-8">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-8 shadow-sm">
               
               <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Ahmad Karimi</h2>
                    <p className="text-gray-500 dark:text-gray-400">Case #BB-7821 • Scoring Analysis</p>
                  </div>
                  <div className="flex items-center gap-4 bg-blue-50 dark:bg-blue-900/20 px-6 py-3 rounded-xl border border-blue-100 dark:border-blue-900/50">
                     <ShieldCheck className="h-8 w-8 text-blue-600 dark:text-blue-400" />
                     <div>
                       <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Current Confidence</p>
                       <p className="text-3xl font-bold text-blue-700 dark:text-blue-400">65<span className="text-lg font-medium text-blue-500 dark:text-blue-500/70">/100</span></p>
                     </div>
                  </div>
               </div>

               {/* Score Ranges Bar */}
               <div className="mb-10">
                  <div className="flex justify-between text-xs font-semibold text-gray-500 mb-2">
                     <span>0</span>
                     <span>39</span>
                     <span>59</span>
                     <span>79</span>
                     <span>100</span>
                  </div>
                  <div className="h-4 w-full flex rounded-full overflow-hidden shadow-inner">
                     <div className="h-full bg-red-400/80 w-[40%] flex items-center justify-center relative group cursor-pointer">
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap">Under Review</span>
                     </div>
                     <div className="h-full bg-yellow-400/80 w-[20%] flex items-center justify-center relative group cursor-pointer">
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap">Provisional</span>
                     </div>
                     <div className="h-full bg-blue-500 w-[20%] flex items-center justify-center relative group cursor-pointer">
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap text-center">
                          <span className="font-bold">Verified</span><br/>Current Score Range
                        </span>
                        {/* Indicator Needle */}
                        <div className="absolute top-1/2 left-1/4 w-1.5 h-6 bg-gray-900 dark:bg-white rounded-full -translate-y-1/2 shadow-sm z-10"></div>
                     </div>
                     <div className="h-full bg-green-500/80 w-[20%] flex items-center justify-center relative group cursor-pointer">
                        <span className="opacity-0 group-hover:opacity-100 absolute -top-8 bg-gray-900 text-white text-xs py-1 px-2 rounded transition-opacity whitespace-nowrap">High Confidence</span>
                     </div>
                  </div>
               </div>

               <h3 className="text-lg font-semibold mb-6 border-b border-gray-100 dark:border-gray-800 pb-2">Identity Evidence Map</h3>
               
               {/* Interactive Graph */}
               <EvidenceGraph />
            </div>
         </div>

         {/* Sidebar Breakdown */}
         <div className="space-y-6">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm">
               <h3 className="font-semibold border-b border-gray-100 dark:border-gray-800 pb-3 mb-4">Pending Points</h3>
               
               <div className="space-y-4">
                 <div className="border border-gray-200 dark:border-gray-700 border-dashed rounded-lg p-3 bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                         <BookOpen className="h-4 w-4 text-gray-400" />
                         <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Education Record</span>
                       </div>
                       <span className="text-xs font-bold text-gray-500">Up to +10</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Waiting for translation check.</p>
                    <button className="text-xs font-medium text-blue-600 hover:text-blue-700">Review Now →</button>
                 </div>

                 <div className="border border-gray-200 dark:border-gray-700 border-dashed rounded-lg p-3 bg-gray-50/50 dark:bg-gray-800/30">
                    <div className="flex justify-between items-start mb-2">
                       <div className="flex items-center gap-2">
                         <Briefcase className="h-4 w-4 text-gray-400" />
                         <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">Employer Reference</span>
                       </div>
                       <span className="text-xs font-bold text-gray-500">Up to +12</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-2">Contact attempted, pending response.</p>
                 </div>
               </div>
            </div>

            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-xl p-6 shadow-sm text-white">
               <h3 className="font-semibold mb-2">Score Ranges Guide</h3>
               <ul className="text-sm space-y-3 opacity-90">
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-red-300 font-medium">0–39</span> <span>Under Review</span>
                 </li>
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-yellow-300 font-medium">40–59</span> <span>Provisional</span>
                 </li>
                 <li className="flex justify-between border-b border-white/10 pb-2">
                   <span className="text-blue-300 font-medium">60–79</span> <span>Verified</span>
                 </li>
                 <li className="flex justify-between">
                   <span className="text-green-300 font-medium">80+</span> <span>High Confidence</span>
                 </li>
               </ul>
            </div>
         </div>
      </div>
    </AuthorityLayout>
  );
};
