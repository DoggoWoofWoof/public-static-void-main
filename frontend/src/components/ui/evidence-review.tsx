import { useState } from "react";
import { AuthorityLayout } from "./authority-layout";
import { Check, X, MessageSquare, FileText, Fingerprint, Users, Link as LinkIcon, AlertCircle } from "lucide-react";
import { GradientButton } from "./gradient-button";

export const EvidenceReviewPage = () => {
  const [selectedEvidence, setSelectedEvidence] = useState<number | null>(1);

  const evidenceQueue = [
    { id: 1, type: "Passport Image", case: "Ahmad Karimi", caseId: "BB-7821", status: "Pending", icon: FileText, conf: "Medium" },
    { id: 2, type: "Family Match", case: "Fatima Hassan", caseId: "BB-7800", status: "Pending", icon: Users, conf: "High" },
    { id: 3, type: "Education Record", case: "Omar Khaled", caseId: "BB-7754", status: "Pending", icon: LinkIcon, conf: "Low" },
    { id: 4, type: "Biometric Scan", case: "Zahra Ahmadi", caseId: "BB-7833", status: "Pending", icon: Fingerprint, conf: "High" },
  ];

  const activeEvidence = evidenceQueue.find(e => e.id === selectedEvidence) || evidenceQueue[0];

  return (
    <AuthorityLayout
      title="Evidence Review"
      subtitle="Verify submitted documents and identity claims."
    >
      <div className="flex flex-col lg:flex-row gap-6 h-[calc(100vh-140px)]">
         
         {/* Queue List */}
         <div className="w-full lg:w-1/3 flex flex-col bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
               <h3 className="font-semibold text-gray-900 dark:text-gray-100">Pending Queue (12)</h3>
            </div>
            <div className="flex-1 overflow-auto divide-y divide-gray-100 dark:divide-gray-800">
               {evidenceQueue.map(e => (
                 <button 
                   key={e.id}
                   onClick={() => setSelectedEvidence(e.id)}
                   className={`w-full text-left p-4 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors ${selectedEvidence === e.id ? 'bg-blue-50/50 dark:bg-blue-900/10 border-l-4 border-l-blue-500' : 'border-l-4 border-l-transparent'}`}
                 >
                    <div className="flex justify-between items-start mb-1">
                       <span className={`text-xs font-semibold px-2 py-0.5 rounded-full ${
                         e.conf === 'High' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' :
                         e.conf === 'Medium' ? 'bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400' :
                         'bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400'
                       }`}>
                         {e.conf} Confidence
                       </span>
                       <span className="text-xs text-gray-500 font-medium">2h ago</span>
                    </div>
                    <div className="flex items-center gap-2 mt-2">
                       <div className="p-1.5 bg-gray-100 dark:bg-gray-800 rounded text-gray-600 dark:text-gray-400">
                         <e.icon className="h-4 w-4" />
                       </div>
                       <div>
                         <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{e.type}</p>
                         <p className="text-xs text-gray-500 dark:text-gray-400">{e.case} ({e.caseId})</p>
                       </div>
                    </div>
                 </button>
               ))}
            </div>
         </div>

         {/* Detail View */}
         <div className="w-full lg:w-2/3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col overflow-hidden">
            {activeEvidence ? (
              <>
                <div className="p-6 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
                   <div>
                     <h2 className="text-xl font-bold text-gray-900 dark:text-gray-100">{activeEvidence.type}</h2>
                     <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Submitted by {activeEvidence.case}</p>
                   </div>
                   <div className="flex gap-2">
                     <button className="px-4 py-2 border border-red-200 text-red-600 bg-red-50 hover:bg-red-100 dark:border-red-900/50 dark:text-red-400 dark:bg-red-900/10 dark:hover:bg-red-900/30 rounded-lg flex items-center font-medium transition-colors">
                        <X className="h-4 w-4 mr-2" /> Reject
                     </button>
                     <GradientButton className="px-4 py-2 rounded-lg flex items-center shadow-sm">
                        <Check className="h-4 w-4 mr-2" /> Approve (+15 pts)
                     </GradientButton>
                   </div>
                </div>

                <div className="flex-1 p-6 overflow-auto">
                   
                   {/* Mock Document Preview */}
                   <div className="w-full h-64 bg-gray-100 dark:bg-gray-800 rounded-lg border-2 border-dashed border-gray-300 dark:border-gray-700 flex flex-col items-center justify-center mb-6">
                      <FileText className="h-12 w-12 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500 font-medium">[Document Preview Rendered Here]</p>
                   </div>

                   <div className="grid grid-cols-2 gap-6">
                      <div className="space-y-4">
                         <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider">Metadata</h4>
                         <div className="bg-gray-50 dark:bg-gray-800/50 p-4 rounded-lg space-y-3">
                            <div className="flex justify-between">
                               <span className="text-sm text-gray-500">Source</span>
                               <span className="text-sm font-medium">Self-Declaration</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-sm text-gray-500">Date Issued</span>
                               <span className="text-sm font-medium">2021-05-14</span>
                            </div>
                            <div className="flex justify-between">
                               <span className="text-sm text-gray-500">Verification Engine</span>
                               <span className="text-sm font-medium text-blue-600 dark:text-blue-400">BorderAI Check</span>
                            </div>
                         </div>
                      </div>

                      <div className="space-y-4">
                         <h4 className="font-semibold text-sm text-gray-900 dark:text-gray-100 uppercase tracking-wider">Analysis</h4>
                         <div className="bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/30 p-4 rounded-lg">
                            <div className="flex gap-2 items-start">
                               <AlertCircle className="h-5 w-5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
                               <div>
                                  <p className="text-sm font-semibold text-blue-900 dark:text-blue-100">Match Found</p>
                                  <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">This document matches historical records from the requested origin region. Slight wear detected on photo edges but watermarks are valid.</p>
                               </div>
                            </div>
                         </div>
                      </div>
                   </div>

                   <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
                      <button className="flex items-center justify-center w-full px-4 py-3 border border-gray-300 dark:border-gray-700 text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors font-medium">
                         <MessageSquare className="h-4 w-4 mr-2" /> Request More Information from Applicant
                      </button>
                   </div>
                </div>
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                 <p className="text-gray-500">Select evidence from the queue to review.</p>
              </div>
            )}
         </div>

      </div>
    </AuthorityLayout>
  );
};
