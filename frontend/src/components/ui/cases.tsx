
import { AuthorityLayout } from "./authority-layout";
import { Link } from "react-router-dom";
import { Filter, Search } from "lucide-react";

export const CasesPage = () => {
  return (
    <AuthorityLayout
      title="Cases"
      subtitle="View and manage individual refugee cases."
    >
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm overflow-hidden flex flex-col h-full">
         
         {/* Toolbar */}
         <div className="p-4 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
            <div className="relative w-full max-w-sm">
               <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
               <input 
                 type="text" 
                 placeholder="Search by ID, Name, or Origin..." 
                 className="w-full pl-9 pr-4 py-2 border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
               />
            </div>
            <button className="flex items-center gap-2 px-4 py-2 text-sm font-medium border border-gray-300 dark:border-gray-700 rounded-lg bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
               <Filter className="h-4 w-4" /> Filter Status
            </button>
         </div>

         {/* Data Table */}
         <div className="overflow-x-auto">
            <table className="w-full text-left text-sm whitespace-nowrap">
               <thead className="bg-gray-50 dark:bg-gray-800 text-gray-500 dark:text-gray-400 font-semibold text-xs tracking-wider uppercase border-b border-gray-200 dark:border-gray-800">
                  <tr>
                     <th className="px-6 py-4">Name</th>
                     <th className="px-6 py-4">Origin</th>
                     <th className="px-6 py-4">Status</th>
                     <th className="px-6 py-4">Identity Confidence Score</th>
                     <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
               </thead>
               <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
                  {[
                    { id: 'BB-7821', name: "Ahmad Karimi", origin: "Syria", status: "Evidence Review", score: 45 },
                    { id: 'BB-7800', name: "Fatima Hassan", origin: "Iraq", status: "Verified", score: 72 },
                    { id: 'BB-7754', name: "Omar Khaled", origin: "Syria", status: "Integration Ready", score: 81 },
                    { id: 'BB-7833', name: "Zahra Ahmadi", origin: "Afghanistan", status: "Arrival Recorded", score: 10 },
                    { id: 'BB-7829', name: "Hassan Ali", origin: "Lebanon", status: "Provisional", score: 55 },
                  ].map((c) => (
                    <tr key={c.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                       <td className="px-6 py-4">
                          <div className="font-semibold text-gray-900 dark:text-gray-100">{c.name}</div>
                          <div className="text-xs text-gray-500 mt-0.5">{c.id}</div>
                       </td>
                       <td className="px-6 py-4">{c.origin}</td>
                       <td className="px-6 py-4">
                          <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
                              c.status === 'Integration Ready' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/30 dark:border-green-800' :
                              c.status === 'Verified' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/30 dark:border-blue-800' :
                              c.status === 'Evidence Review' ? 'bg-yellow-50 text-yellow-700 border-yellow-200 dark:bg-yellow-900/30 dark:border-yellow-800' :
                              'bg-gray-100 text-gray-700 border-gray-200 dark:bg-gray-800 dark:text-gray-300'
                          }`}>
                            {c.status}
                          </span>
                       </td>
                       <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                             <div className="w-16 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                                <div 
                                  className={`h-full rounded-full ${c.score >= 80 ? 'bg-green-500' : c.score >= 60 ? 'bg-blue-500' : 'bg-yellow-500'}`}
                                  style={{ width: `${c.score}%` }}
                                ></div>
                             </div>
                             <span className="font-bold">{c.score}</span>
                          </div>
                       </td>
                       <td className="px-6 py-4 text-right">
                          <Link to={`/case/${c.id}`} className="inline-flex items-center justify-center px-4 py-1.5 text-xs font-semibold text-blue-700 bg-blue-100 hover:bg-blue-200 dark:bg-blue-900/40 dark:text-blue-300 dark:hover:bg-blue-900/60 rounded-md transition-colors">
                            View Case
                          </Link>
                       </td>
                    </tr>
                  ))}
               </tbody>
            </table>
         </div>
         {/* Pagination Mock */}
         <div className="mt-auto px-6 py-4 border-t border-gray-200 dark:border-gray-800 text-sm text-gray-500 flex justify-between items-center">
            <span>Showing 1 to 5 of 35 cases</span>
            <div className="flex gap-1">
               <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 rounded-md disabled:opacity-50">Prev</button>
               <button className="px-3 py-1 bg-blue-600 text-white rounded-md">1</button>
               <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">2</button>
               <button className="px-3 py-1 border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md">Next</button>
            </div>
         </div>
      </div>
    </AuthorityLayout>
  );
};
