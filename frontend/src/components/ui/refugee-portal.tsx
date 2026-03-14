"use client"
import { useState, useEffect } from "react";
import {
  Home,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  Settings,
  HelpCircle,
  User,
  Moon,
  Sun,
  ChevronDown,
  ChevronsRight,
  Shield,
  Clock,
  CheckCircle2,
  AlertCircle
} from "lucide-react";
import { Link } from "react-router-dom";
import { GradientButton } from "./gradient-button";
import { ShaderAnimation } from "./shader-animation";

export const RefugeePortal = () => {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#030712'; // Tailwind gray-950
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '';
    }
  }, [isDark]);

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <Sidebar />
        <PortalContent isDark={isDark} setIsDark={setIsDark} />
      </div>
    </div>
  );
};

const Sidebar = () => {
  const [open, setOpen] = useState(true);
  const [selected, setSelected] = useState("My Case");

  return (
    <nav
      className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out ${
        open ? 'w-64' : 'w-16'
      } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-2 shadow-sm`}
    >
      <TitleSection open={open} />

      <div className="space-y-1 mb-8">
        <Option Icon={Home} title="My Case" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Calendar} title="Appointments" selected={selected} setSelected={setSelected} open={open} notifs={1} />
        <Option Icon={MessageSquare} title="Messages" selected={selected} setSelected={setSelected} open={open} notifs={3} />
        <Option Icon={FileText} title="Evidence & Docs" selected={selected} setSelected={setSelected} open={open} />
        <Option Icon={Bell} title="Announcements" selected={selected} setSelected={setSelected} open={open} />
      </div>

      {open && (
        <div className="border-t border-gray-200 dark:border-gray-800 pt-4 space-y-1">
          <div className="px-3 py-2 text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wide">
            Account
          </div>
          <Option Icon={Settings} title="Settings" selected={selected} setSelected={setSelected} open={open} />
          <Option Icon={HelpCircle} title="Help Guide" selected={selected} setSelected={setSelected} open={open} />
        </div>
      )}

      <ToggleClose open={open} setOpen={setOpen} />
    </nav>
  );
};

interface OptionProps { Icon: any; title: string; selected: string; setSelected: (title: string) => void; open: boolean; notifs?: number; }
const Option = ({ Icon, title, selected, setSelected, open, notifs }: OptionProps) => {
  const isSelected = selected === title;
  
  return (
    <button
      onClick={() => setSelected(title)}
      className={`relative flex h-11 w-full items-center rounded-md transition-all duration-200 ${
        isSelected 
          ? "bg-blue-50 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 shadow-sm border-l-2 border-blue-500" 
          : "text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-12 place-content-center">
        <Icon className="h-4 w-4" />
      </div>
      
      {open && (
        <span className={`text-sm font-medium transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
          {title}
        </span>
      )}

      {notifs && open && (
        <span className="absolute right-3 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 dark:bg-blue-600 text-xs text-white font-medium">
          {notifs}
        </span>
      )}
    </button>
  );
};

const TitleSection = ({ open }: { open: boolean }) => {
  return (
    <div className="mb-6 border-b border-gray-200 dark:border-gray-800 pb-4">
      <div className="flex cursor-pointer items-center justify-between rounded-md p-2 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800">
        <div className="flex items-center gap-3">
          <div className="grid size-10 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
            <svg width="20" height="auto" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white">
              <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
              <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
            </svg>
          </div>
          {open && (
            <div className={`transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
              <div className="flex items-center gap-2">
                <div>
                  <span className="block text-sm font-semibold text-gray-900 dark:text-gray-100">BorderBridge</span>
                  <span className="block text-xs text-gray-500 dark:text-gray-400">Refugee Portal</span>
                </div>
              </div>
            </div>
          )}
        </div>
        {open && <ChevronDown className="h-4 w-4 text-gray-400 dark:text-gray-500" />}
      </div>
    </div>
  );
};

const ToggleClose = ({ open, setOpen }: { open: boolean; setOpen: (open: boolean) => void }) => {
  return (
    <button
      onClick={() => setOpen(!open)}
      className="absolute bottom-0 left-0 right-0 border-t border-gray-200 dark:border-gray-800 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800"
    >
      <div className="flex items-center p-3">
        <div className="grid size-10 place-content-center">
          <ChevronsRight className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${open ? "rotate-180" : ""}`} />
        </div>
        {open && (
          <span className={`text-sm font-medium text-gray-600 dark:text-gray-300 transition-opacity duration-200 ${open ? 'opacity-100' : 'opacity-0'}`}>
            Hide
          </span>
        )}
      </div>
    </button>
  );
};


interface PortalContentProps { isDark: boolean; setIsDark: (dark: boolean) => void; }

const PortalContent = ({ isDark, setIsDark }: PortalContentProps) => {
  const [activeTab, setActiveTab] = useState("profile");

  return (
    <div className="relative flex-1 overflow-auto bg-gray-50 dark:bg-gray-950 p-6 lg:p-8">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 opacity-[0.08] dark:opacity-[0.14]">
          <ShaderAnimation className="h-full w-full" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-gray-50/95 via-gray-50/84 to-gray-50/96 dark:from-gray-950/95 dark:via-gray-950/84 dark:to-gray-950/97" />
      </div>
      {/* Top Navbar */}
      <div className="relative z-10 flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">My Case</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">View your case status, submit information, and check announcements.</p>
        </div>
        <div className="flex items-center gap-4">
          <button className="relative p-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
            <Bell className="h-5 w-5" />
            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-bold text-white">2</span>
          </button>
          <button
            onClick={() => setIsDark(!isDark)}
            className="flex h-10 w-10 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <Link to="/" className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 transition-colors">
             <User className="h-4 w-4" />
             <span className="text-sm font-medium">Anna K.</span>
          </Link>
        </div>
      </div>

      <div className="relative z-10 max-w-6xl space-y-6">
        
        {/* Case Status */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
          <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/20">
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Shield className="h-5 w-5 text-blue-500" />
              Case Status: BorderBridge Active
            </h2>
          </div>
          <div className="p-6">
            <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
               <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">Current Phase</p>
                  <p className="text-xl font-medium text-gray-900 dark:text-gray-100">Identity Verification</p>
               </div>
               <div className="flex-1 w-full max-w-md hidden md:block">
                  {/* Progress Bar */}
                  <div className="h-2 w-full bg-gray-100 dark:bg-gray-800 rounded-full overflow-hidden">
                     <div className="h-full bg-blue-500 w-1/3 rounded-full"></div>
                  </div>
                  <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-2 font-medium">
                    <span>Registered</span>
                    <span className="text-blue-600 dark:text-blue-400">Verifying</span>
                    <span>Interview</span>
                    <span>Decision</span>
                  </div>
               </div>
               <div className="flex gap-4">
                 <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium">
                    <Clock className="w-4 h-4" />
                    Pending Evidence
                 </div>
               </div>
            </div>
          </div>
        </section>

        {/* Self-declaration Forms Area */}
        <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm overflow-hidden">
           <div className="p-5 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 transition-all">
             <h2 className="text-lg font-semibold mb-1">
                {activeTab === 'profile' ? "My Profile" : "Submit Information"}
             </h2>
             <p className="text-sm text-gray-500 dark:text-gray-400">
               {activeTab === 'profile' 
                 ? "Manage your identity profile and view recent case activity."
                 : "You can submit self-declared details below. These will be reviewed by an officer — they do not directly change your score or status until verified."
               }
             </p>
           </div>
           
           <div className="border-b border-gray-200 dark:border-gray-800">
             <nav className="flex overflow-x-auto hide-scrollbar">
                {["profile", "family", "education", "needs"].map((tab) => (
                   <button 
                     key={tab}
                     onClick={() => setActiveTab(tab)}
                     className={`px-6 py-3 text-sm font-medium whitespace-nowrap transition-colors border-b-2 
                       ${activeTab === tab 
                          ? 'border-blue-500 text-blue-600 dark:text-blue-400 bg-blue-50/50 dark:bg-blue-900/10' 
                          : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-200 hover:border-gray-300 dark:hover:border-gray-700'
                       }`}
                   >
                     {tab.charAt(0).toUpperCase() + tab.slice(1).replace('-', ' ')}
                   </button>
                ))}
             </nav>
           </div>

           <div className="p-6">
              {activeTab === 'profile' && (
                <div className="flex flex-col xl:flex-row gap-8">
                  {/* Avatar & Basic Info Card */}
                  <div className="bg-white dark:bg-gray-800/80 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden shadow-sm flex-1">
                    {/* Banner */}
                    <div className="h-40 bg-gradient-to-r from-blue-600 to-indigo-600 relative overflow-hidden">
                       <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10 mix-blend-overlay"></div>
                       <div className="absolute left-6 bottom-6 w-24 h-24 rounded-full border-4 border-white dark:border-gray-900 bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-4xl shadow-md overflow-hidden">
                         <img src={`https://api.dicebear.com/7.x/notionists/svg?seed=Anna&backgroundColor=e2e8f0`} alt="Avatar" className="w-full h-full object-cover" />
                       </div>
                    </div>
                    
                    <div className="px-6 pb-6 relative">
                      {/* Bio */}
                      <div className="mt-6">
                        <div className="flex items-center gap-2">
                          <h3 className="text-2xl font-bold text-gray-900 dark:text-gray-100">Anna K.</h3>
                          <CheckCircle2 className="w-5 h-5 text-blue-500" />
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Origin: <span className="font-medium text-gray-700 dark:text-gray-300">Kyiv, Ukraine</span> • Joined Oct 2026</p>
                        
                        <p className="mt-4 text-gray-700 dark:text-gray-300 text-sm leading-relaxed">
                          Displaced from Kyiv. Currently residing in Camp Alpha. Seeking employment in education and looking to reunite with my brother.
                        </p>
                        
                        {/* Metrics Ribbon */}
                        <div className="flex gap-6 mt-6 pt-6 border-t border-gray-100 dark:border-gray-700 text-sm">
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">145</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Days in System</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">4</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Verified Docs</span>
                          </div>
                          <div className="flex flex-col">
                            <span className="text-xl font-bold text-gray-900 dark:text-gray-100">2</span>
                            <span className="text-gray-500 dark:text-gray-400 font-medium">Family Links</span>
                          </div>
                        </div>
                        
                        {/* Actions */}
                        <div className="mt-8 flex gap-3">
                           <GradientButton type="button" className="px-5 py-2.5 rounded-lg flex-1">
                             Edit Profile
                           </GradientButton>
                           <button className="px-5 py-2.5 rounded-lg border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                             Declare Information
                           </button>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Activity Feed */}
                  <div className="flex-[1.2] space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3 px-1">Case Timeline</h3>
                    
                    <div className="space-y-4">
                      {/* Activity Item 1 */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center shrink-0 border border-blue-200 dark:border-blue-800">
                          <FileText className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-100 dark:border-gray-800 flex-1 hover:border-gray-200 dark:hover:border-gray-700 transition-colors shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Uploaded Diploma</p>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">2 days ago</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Submitted University degree for verification to assist with employment referrals in the education sector.</p>
                        </div>
                      </div>
                      
                      {/* Activity Item 2 */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-green-100 dark:bg-green-900/50 flex items-center justify-center shrink-0 border border-green-200 dark:border-green-800">
                          <Shield className="w-5 h-5 text-green-600 dark:text-green-400" />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-100 dark:border-gray-800 flex-1 hover:border-gray-200 dark:hover:border-gray-700 transition-colors shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Status Upgraded</p>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">1 week ago</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Identity verified by Case Officer Smith. Trust tier increased to "Provisional Identity".</p>
                        </div>
                      </div>

                      {/* Activity Item 3 */}
                      <div className="flex gap-4">
                        <div className="w-10 h-10 rounded-full bg-purple-100 dark:bg-purple-900/50 flex items-center justify-center shrink-0 border border-purple-200 dark:border-purple-800">
                          <User className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-800/40 p-5 rounded-xl border border-gray-100 dark:border-gray-800 flex-1 hover:border-gray-200 dark:hover:border-gray-700 transition-colors shadow-sm">
                          <div className="flex justify-between items-start mb-1">
                            <p className="font-semibold text-gray-900 dark:text-gray-100">Joined BorderBridge</p>
                            <span className="text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-800 px-2 py-1 rounded-md border border-gray-100 dark:border-gray-700 shadow-sm">Oct 2026</span>
                          </div>
                          <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">Initial intake completed at Border Checkpoint Alpha. Welcome to the Refugee Self-Service Portal.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              {activeTab !== 'profile' && (
                 <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                    <p>Form content for {activeTab} will appear here.</p>
                 </div>
              )}
           </div>
        </section>

        {/* Bottom Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
           
           {/* Family Connections */}
           <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Family Connections</h2>
                <button className="text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">Manage</button>
             </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Declared family links are reviewed and verified by officers.</p>
             
             <div className="space-y-3">
               {[
                 { name: "John Doe", relation: "Sibling", status: "Verified", icon: CheckCircle2, color: "text-green-500" },
                 { name: "Jane Smith", relation: "Spouse", status: "Pending Evidence", icon: AlertCircle, color: "text-yellow-500" },
               ].map((member, i) => (
                 <div key={i} className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/50">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-sm font-medium">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{member.relation}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-medium bg-white dark:bg-gray-900 px-2 py-1 rounded shadow-sm border border-gray-100 dark:border-gray-800">
                      <member.icon className={`w-3.5 h-3.5 ${member.color}`} />
                      {member.status}
                    </div>
                 </div>
               ))}
             </div>
           </section>

           {/* Announcements Feed */}
           <section className="bg-white dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800 shadow-sm p-6">
             <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Announcements</h2>
                <button className="text-sm font-medium text-gray-500 hover:text-gray-900 dark:hover:text-gray-100">View All</button>
             </div>
             <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Official one-way notices from authorities — appointments, services, next steps.</p>
             
             <div className="space-y-4">
               {[
                 { title: "Required Documentation Update", date: "Today at 9:00 AM", unread: true },
                 { title: "Upcoming Interview Schedule", date: "Yesterday at 2:30 PM", unread: false },
                 { title: "Welcome to BorderBridge", date: "Oct 12, 2026", unread: false },
               ].map((announcement, i) => (
                 <div key={i} className="flex gap-4 p-3 -mx-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer">
                    <div className="mt-1 flex-shrink-0">
                       <div className={`w-2 h-2 rounded-full ${announcement.unread ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                    </div>
                    <div>
                      <p className={`text-sm ${announcement.unread ? 'font-semibold text-gray-900 dark:text-gray-100' : 'font-medium text-gray-700 dark:text-gray-300'}`}>
                        {announcement.title}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">{announcement.date}</p>
                    </div>
                 </div>
               ))}
             </div>
           </section>

        </div>
      </div>
    </div>
  );
};
