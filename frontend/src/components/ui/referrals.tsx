
import { AuthorityLayout } from "./authority-layout";
import { Briefcase, Home, BookOpen, Scale, HeartPulse, MessageCircle, Send } from "lucide-react";
import { GradientButton } from "./gradient-button";

export const ReferralsPage = () => {
  return (
    <AuthorityLayout
      title="Referrals & Services"
      subtitle="Connect verified refugees with integration and support services."
    >
      <div className="flex flex-col h-[calc(100vh-140px)] gap-6">
         
         {/* Summary Row */}
         <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
               <Briefcase className="h-6 w-6 text-blue-500 mb-2" />
               <span className="text-xl font-bold">24</span>
               <span className="text-xs text-gray-500">Employment</span>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
               <Home className="h-6 w-6 text-indigo-500 mb-2" />
               <span className="text-xl font-bold">12</span>
               <span className="text-xs text-gray-500">Housing</span>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
               <BookOpen className="h-6 w-6 text-orange-500 mb-2" />
               <span className="text-xl font-bold">45</span>
               <span className="text-xs text-gray-500">Education</span>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
               <Scale className="h-6 w-6 text-gray-500 mb-2" />
               <span className="text-xl font-bold">8</span>
               <span className="text-xs text-gray-500">Legal Aid</span>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
               <HeartPulse className="h-6 w-6 text-red-500 mb-2" />
               <span className="text-xl font-bold">19</span>
               <span className="text-xs text-gray-500">Healthcare</span>
            </div>
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-4 flex flex-col items-center justify-center text-center shadow-sm">
               <MessageCircle className="h-6 w-6 text-green-500 mb-2" />
               <span className="text-xl font-bold">62</span>
               <span className="text-xs text-gray-500">Language</span>
            </div>
         </div>

         {/* Referrals Table */}
         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex-1 flex flex-col overflow-hidden">
            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
               <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Suggested Referrals Pipeline</h3>
               <button className="text-sm font-medium text-blue-600 hover:text-blue-700">View Active Referrals</button>
            </div>
            <div className="flex-1 overflow-auto">
               <table className="w-full text-left whitespace-nowrap">
                  <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50 sticky top-0 shadow-sm z-10 border-b border-gray-200 dark:border-gray-800">
                     <tr>
                        <th className="px-6 py-4 font-semibold">Case</th>
                        <th className="px-6 py-4 font-semibold">Referral Type</th>
                        <th className="px-6 py-4 font-semibold">Suggested Organization</th>
                        <th className="px-6 py-4 font-semibold text-center">Status</th>
                        <th className="px-6 py-4 font-semibold text-right">Action</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                     {[
                        { name: "Ahmad Karimi", caseId: "BB-7821", type: "Job Placement", org: "Construction NGO Program", status: "Suggested", icon: Briefcase, color: "text-blue-500" },
                        { name: "Fatima Hassan", caseId: "BB-7800", type: "School Placement", org: "Local School District", status: "Approved", icon: BookOpen, color: "text-orange-500" },
                        { name: "Omar Khaled", caseId: "BB-7754", type: "Housing", org: "City Housing Authority", status: "Processing", icon: Home, color: "text-indigo-500" },
                        { name: "Zahra Ahmadi", caseId: "BB-7833", type: "Healthcare", org: "Red Cross Mobile Clinic", status: "Suggested", icon: HeartPulse, color: "text-red-500" },
                     ].map((r, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                           <td className="px-6 py-4">
                              <p className="font-semibold text-gray-900 dark:text-gray-100">{r.name}</p>
                              <p className="text-xs text-gray-500 mt-0.5">{r.caseId}</p>
                           </td>
                           <td className="px-6 py-4">
                              <div className="flex items-center text-sm font-medium">
                                 <r.icon className={`h-4 w-4 mr-2 ${r.color}`} /> {r.type}
                              </div>
                           </td>
                           <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-300">
                              {r.org}
                           </td>
                           <td className="px-6 py-4 text-center">
                              <span className={`inline-flex px-2.5 py-1 rounded-full text-xs font-semibold border ${
                                r.status === 'Approved' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:text-green-400 dark:border-green-800' :
                                r.status === 'Processing' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:text-yellow-400 dark:border-yellow-800' :
                                'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-700'
                              }`}>
                                {r.status}
                              </span>
                           </td>
                           <td className="px-6 py-4 text-right">
                              {r.status === 'Suggested' ? (
                                <GradientButton className="px-4 py-1.5 h-auto text-xs rounded-md inline-flex">
                                  Refer <Send className="h-3 w-3 ml-1.5" />
                                </GradientButton>
                              ) : (
                                <button className="px-4 py-1.5 text-xs font-medium text-gray-500 border border-gray-300 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                                  View Details
                                </button>
                              )}
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>
         
      </div>
    </AuthorityLayout>
  );
};
