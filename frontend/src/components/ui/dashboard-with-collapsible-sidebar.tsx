
import { AuthorityLayout } from "./authority-layout";
import {
  Monitor, Tag, BarChart3, Users, Clock, AlertCircle, FileText, PlusCircle, ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { GradientButton } from "./gradient-button";

export const AuthorityDashboard = () => {
  return (
    <AuthorityLayout
      title="Dashboard"
      subtitle="Overview of Border Actions and Case Flow"
      headerActions={
         <GradientButton 
            className="h-9 px-3 py-1 min-w-0" 
            onClick={() => window.location.href = '/registration'}
          >
            <PlusCircle className="mr-2 h-4 w-4" />
            Register Case
          </GradientButton>
      }
    >
      {/* Top Value Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard label="Active Cases" value="35" icon={<Monitor className="h-5 w-5" />} color="text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20" trend="+3 today" />
        <MetricCard label="Evidence Pending" value="12" icon={<Clock className="h-5 w-5" />} color="text-yellow-600 bg-yellow-50 dark:text-yellow-400 dark:bg-yellow-900/20" trend="Needs verification" />
        <MetricCard label="High Priority Cases" value="4" icon={<AlertCircle className="h-5 w-5" />} color="text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20" trend="Vulnerable individuals" />
        <MetricCard label="Integration Ready" value="7" icon={<Users className="h-5 w-5" />} color="text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20" trend="Passed verification" />
      </div>

      {/* Case Pipeline Overview */}
      <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm mb-8">
         <h3 className="text-lg font-semibold mb-6 flex justify-between items-center">
            Case Processing Pipeline
            <Link to="/cases" className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">View All</Link>
         </h3>
         
         {/* Simple pipeline graphic */}
         <div className="w-full relative py-6">
            <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-100 dark:bg-gray-800 -translate-y-1/2"></div>
            
            <div className="relative flex justify-between">
               
               {/* Step 1 */}
               <div className="flex flex-col items-center">
                 <div className="h-8 w-8 rounded-full bg-blue-600 border-4 border-white dark:border-gray-900 flex items-center justify-center relative z-10 shadow-sm">
                   <PlusCircle className="h-4 w-4 text-white" />
                 </div>
                 <div className="mt-3 text-center">
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Arrival / Intake</p>
                   <p className="text-xs text-gray-500 font-medium">18 Active</p>
                 </div>
               </div>

               {/* Step 2 */}
               <div className="flex flex-col items-center">
                 <div className="h-8 w-8 rounded-full bg-yellow-500 border-4 border-white dark:border-gray-900 flex items-center justify-center relative z-10 shadow-sm">
                   <FileText className="h-4 w-4 text-white" />
                 </div>
                 <div className="mt-3 text-center">
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Identity Review</p>
                   <p className="text-xs text-gray-500 font-medium">12 Pending</p>
                 </div>
               </div>

               {/* Step 3 */}
               <div className="flex flex-col items-center">
                 <div className="h-8 w-8 rounded-full bg-indigo-500 border-4 border-white dark:border-gray-900 flex items-center justify-center relative z-10 shadow-sm">
                   <BarChart3 className="h-4 w-4 text-white" />
                 </div>
                 <div className="mt-3 text-center">
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Verified Score</p>
                   <p className="text-xs text-gray-500 font-medium">5 Assessing</p>
                 </div>
               </div>

               {/* Step 4 */}
               <div className="flex flex-col items-center">
                 <div className="h-8 w-8 rounded-full bg-green-500 border-4 border-white dark:border-gray-900 flex items-center justify-center relative z-10 shadow-sm">
                   <Tag className="h-4 w-4 text-white" />
                 </div>
                 <div className="mt-3 text-center">
                   <p className="text-sm font-bold text-gray-900 dark:text-white">Integration Ready</p>
                   <p className="text-xs text-gray-500 font-medium">7 Approved</p>
                 </div>
               </div>

            </div>
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
         
         {/* Recent Cases */}
         <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex flex-col">
           <h3 className="text-lg font-semibold mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Recent Cases</h3>
           <div className="space-y-4 flex-1">
             {[
               { name: "Ahmad Karimi", state: "Intake Completed", color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400" },
               { name: "Fatima Hassan", state: "Evidence Pending", color: "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400" },
               { name: "Omar Khaled", state: "Integration Ready", color: "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400" },
               { name: "Zahra Ahmadi", state: "Identity Review", color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400" },
             ].map((c, i) => (
                <Link to="/case/BB-7800" key={i} className="flex justify-between items-center p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-800">
                  <span className="font-medium">{c.name}</span>
                  <span className={`text-xs px-2.5 py-1 rounded-full font-semibold ${c.color}`}>{c.state}</span>
                </Link>
             ))}
           </div>
           <Link to="/cases" className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 flex items-center justify-center p-2 rounded-lg bg-blue-50 dark:bg-blue-900/10 dark:text-blue-400 transition-colors">
              View All Pipeline <ArrowRight className="h-4 w-4 ml-1" />
           </Link>
         </div>

         {/* Alerts & Context Data */}
         <div className="space-y-8 flex flex-col">
            
            {/* Evidence Alerts */}
            <div className="bg-white dark:bg-gray-900 border border-red-100 dark:border-red-900/30 rounded-xl p-6 shadow-sm">
               <h3 className="text-lg font-semibold mb-4 text-gray-900 dark:text-gray-100 flex items-center">
                 <AlertCircle className="h-5 w-5 mr-2 text-red-500" /> Action Required
               </h3>
               <div className="space-y-3">
                 <Link to="/evidence" className="flex items-center gap-3 p-3 rounded-lg bg-orange-50 dark:bg-orange-900/10 border border-orange-100 dark:border-orange-900/30 hover:bg-orange-100 dark:hover:bg-orange-900/20 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-orange-200 dark:bg-orange-800/50 flex items-center justify-center text-orange-700 dark:text-orange-300 font-bold">5</div>
                    <span className="text-sm font-medium text-orange-900 dark:text-orange-100">Documents waiting verification</span>
                 </Link>
                 <Link to="/evidence" className="flex items-center gap-3 p-3 rounded-lg bg-indigo-50 dark:bg-indigo-900/10 border border-indigo-100 dark:border-indigo-900/30 hover:bg-indigo-100 dark:hover:bg-indigo-900/20 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-indigo-200 dark:bg-indigo-800/50 flex items-center justify-center text-indigo-700 dark:text-indigo-300 font-bold">3</div>
                    <span className="text-sm font-medium text-indigo-900 dark:text-indigo-100">Family link matches detected</span>
                 </Link>
               </div>
            </div>

            {/* Announcements */}
            <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-6 shadow-sm flex-1">
               <h3 className="text-lg font-semibold mb-4 border-b border-gray-100 dark:border-gray-800 pb-2">Recent Announcements Broadcasts</h3>
               <ul className="space-y-3">
                 <li className="flex items-start gap-3">
                   <div className="h-2 w-2 rounded-full bg-blue-500 mt-1.5 shrink-0"></div>
                   <div>
                     <p className="text-sm font-medium">Food distribution schedule updated</p>
                     <p className="text-xs text-gray-500">Sent to Camp A • 2h ago</p>
                   </div>
                 </li>
                 <li className="flex items-start gap-3">
                   <div className="h-2 w-2 rounded-full bg-gray-300 mt-1.5 shrink-0"></div>
                   <div>
                     <p className="text-sm font-medium text-gray-700 dark:text-gray-300">Language classes starting Monday</p>
                     <p className="text-xs text-gray-500">Sent to Syrian Nationals • Yesterday</p>
                   </div>
                 </li>
               </ul>
            </div>
         </div>
      </div>
    </AuthorityLayout>
  );
};

const MetricCard = ({ label, value, icon, color, trend }: any) => (
  <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-5 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
    <div className={`absolute -right-6 -top-6 rounded-full w-24 h-24 opacity-10 ${color.split(' ')[0]} bg-current group-hover:scale-150 transition-transform duration-500`}></div>
    <div className="flex justify-between items-start mb-4 relative z-10">
      <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
    </div>
    <div className="relative z-10">
      <p className="text-3xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-sm font-semibold text-gray-600 dark:text-gray-400 mt-1">{label}</p>
      <p className="text-xs text-gray-500 mt-2 font-medium bg-gray-50 dark:bg-gray-800 inline-block px-2 py-0.5 rounded">{trend}</p>
    </div>
  </div>
);

export default AuthorityDashboard;
