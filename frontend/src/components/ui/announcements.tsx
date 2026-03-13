
import { AuthorityLayout } from "./authority-layout";
import { Megaphone, Calendar, Users, Send } from "lucide-react";
import { GradientButton } from "./gradient-button";

export const AnnouncementsPage = () => {
  return (
    <AuthorityLayout
      title="Announcements"
      subtitle="Broadcast official communications, schedules, and updates to designated groups."
    >
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
         {/* Manage List */}
         <div className="lg:col-span-2 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm flex flex-col h-[calc(100vh-200px)]">
            <div className="p-5 border-b border-gray-200 dark:border-gray-800 flex justify-between items-center bg-gray-50/50 dark:bg-gray-800/20">
               <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 flex items-center">
                 <Megaphone className="h-5 w-5 mr-2 text-blue-500" /> Communications History
               </h3>
               <div className="flex gap-2">
                 <button className="text-sm font-medium px-3 py-1.5 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700">All</button>
                 <button className="text-sm font-medium px-3 py-1.5 bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">Active</button>
                 <button className="text-sm font-medium px-3 py-1.5 bg-transparent text-gray-500 hover:text-gray-900 dark:hover:text-gray-200">Scheduled</button>
               </div>
            </div>

            <div className="flex-1 overflow-auto p-2">
               <table className="w-full text-left">
                  <thead className="text-xs uppercase text-gray-500 dark:text-gray-400 bg-gray-50/50 dark:bg-gray-800/50">
                     <tr>
                        <th className="px-4 py-3 font-semibold rounded-tl-lg">Title</th>
                        <th className="px-4 py-3 font-semibold">Audience</th>
                        <th className="px-4 py-3 font-semibold">Date</th>
                        <th className="px-4 py-3 font-semibold rounded-tr-lg">Status</th>
                     </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 dark:divide-gray-800/50">
                     {[
                        { title: "Food Distribution", audience: "Camp A", date: "Today", status: "Active" },
                        { title: "Language Classes", audience: "Refugees (Syria)", date: "Tomorrow", status: "Scheduled" },
                        { title: "Vaccination Drive", audience: "All Cases", date: "Oct 15", status: "Active" },
                        { title: "Job Training Program", audience: "Integration Ready", date: "Oct 20", status: "Draft" },
                        { title: "System Maintenance", audience: "Officers", date: "Oct 10", status: "Completed" },
                     ].map((a, i) => (
                        <tr key={i} className="hover:bg-gray-50 dark:hover:bg-gray-800/30 transition-colors">
                           <td className="px-4 py-4">
                              <p className="text-sm font-semibold text-gray-900 dark:text-gray-100">{a.title}</p>
                           </td>
                           <td className="px-4 py-4">
                              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                                 <Users className="h-3 w-3 mr-1.5" /> {a.audience}
                              </div>
                           </td>
                           <td className="px-4 py-4 text-sm text-gray-500">
                             {a.date}
                           </td>
                           <td className="px-4 py-4">
                              <span className={`inline-flex px-2 py-0.5 rounded text-xs font-medium border ${
                                a.status === 'Active' ? 'bg-green-50 text-green-700 border-green-200 dark:bg-green-900/20 dark:border-green-800' :
                                a.status === 'Scheduled' ? 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/20 dark:border-blue-800' :
                                a.status === 'Draft' ? 'bg-gray-100 text-gray-600 border-gray-200 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400' :
                                'bg-gray-50 text-gray-500 border-gray-200 dark:bg-gray-800 dark:border-gray-700'
                              }`}>
                                {a.status}
                              </span>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>
            </div>
         </div>

         {/* Create Form */}
         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-sm p-6 overflow-auto">
            <h3 className="text-lg font-semibold mb-6 flex items-center">
               <Send className="h-5 w-5 mr-2 text-blue-500" /> New Broadcast
            </h3>
            
            <form className="space-y-5">
               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Title</label>
                  <input type="text" className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Announcement subject..." />
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message Body</label>
                  <textarea rows={4} className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none" placeholder="Detail the context of the announcement..."></textarea>
               </div>

               <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Target Audience</label>
                  <select className="w-full px-3 py-2 bg-gray-50 dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none text-sm">
                     <option>All Active Cases</option>
                     <option>Specific Camp Group</option>
                     <option>Specific Language Speakers</option>
                     <option>Integration Ready Status</option>
                  </select>
               </div>

               <div className="pt-2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Publish Timeline</label>
                  <div className="flex gap-4">
                     <label className="flex items-center gap-2 text-sm">
                        <input type="radio" name="timing" defaultChecked className="text-blue-600 focus:ring-blue-500" /> Publish Immediately
                     </label>
                     <label className="flex items-center gap-2 text-sm text-gray-500">
                        <input type="radio" name="timing" className="text-blue-600 focus:ring-blue-500" /> Schedule
                        <Calendar className="h-4 w-4 ml-1" />
                     </label>
                  </div>
               </div>

               <div className="pt-6 border-t border-gray-200 dark:border-gray-800">
                  <GradientButton className="w-full rounded-lg py-3 flex justify-center items-center">
                     <Send className="h-4 w-4 mr-2" /> Broadcast Now
                  </GradientButton>
               </div>
            </form>
         </div>
      </div>
    </AuthorityLayout>
  );
};
