"use client"
import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Home, Monitor, Tag, BarChart3, Users, ChevronsRight, GitCommit,
  Moon, Sun, Bell, User, BellRing
} from "lucide-react";
import { ShaderAnimation } from "./shader-animation";

export const AuthorityLayout = ({ 
  children, 
  title, 
  subtitle, 
  headerActions 
}: { 
  children: React.ReactNode; 
  title: string; 
  subtitle: string; 
  headerActions?: React.ReactNode;
}) => {
  const [isDark, setIsDark] = useState(false);
  const [open, setOpen] = useState(true);
  const location = useLocation();

  useEffect(() => {
    if (isDark) {
      document.body.classList.add('dark');
      document.body.style.backgroundColor = '#030712';
    } else {
      document.body.classList.remove('dark');
      document.body.style.backgroundColor = '';
    }
  }, [isDark]);

  return (
    <div className={`flex min-h-screen w-full ${isDark ? 'dark' : ''}`}>
      <div className="flex w-full bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        
        {/* Sidebar */}
        <nav
          className={`sticky top-0 h-screen shrink-0 border-r transition-all duration-300 ease-in-out z-20 ${
            open ? 'w-64' : 'w-16'
          } border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 shadow-sm flex flex-col`}
        >
          {/* Brand */}
          <div className="p-4 border-b border-gray-200 dark:border-gray-800 h-[72px] flex items-center">
            <Link to="/dashboard" className="flex items-center gap-3 w-full hover:opacity-80 transition-opacity overflow-hidden">
               <div className="grid size-8 shrink-0 place-content-center rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 shadow-sm">
                 <svg width="16" height="auto" viewBox="0 0 50 39" fill="none" xmlns="http://www.w3.org/2000/svg" className="fill-white">
                   <path d="M16.4992 2H37.5808L22.0816 24.9729H1L16.4992 2Z" />
                   <path d="M17.4224 27.102L11.4192 36H33.5008L49 13.0271H32.7024L23.2064 27.102H17.4224Z" />
                 </svg>
               </div>
               {open && (
                 <div className="flex flex-col">
                   <span className="text-sm font-bold text-gray-900 dark:text-white leading-tight">Beyond Borders</span>
                   <span className="text-[10px] text-gray-500 dark:text-gray-400 font-medium tracking-wide uppercase">Authority System</span>
                 </div>
               )}
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="p-2 space-y-1 mt-4 flex-1 overflow-y-auto hide-scrollbar">
             <Option Icon={Home} label="Dashboard" to="/dashboard" currentPath={location.pathname} open={open} />
             <Option Icon={Monitor} label="Cases" to="/cases" currentPath={location.pathname} open={open} notifs={35} />
             <Option Icon={GitCommit} label="Case Timeline" to="/timeline" currentPath={location.pathname} open={open} />
             <Option Icon={Tag} label="Evidence Review" to="/evidence" currentPath={location.pathname} open={open} notifs={12} />
             <Option Icon={BarChart3} label="Scoring Engine" to="/scoring" currentPath={location.pathname} open={open} />
             <Option Icon={BellRing} label="Announcements" to="/announcements" currentPath={location.pathname} open={open} />
             <Option Icon={Users} label="Referrals" to="/referrals" currentPath={location.pathname} open={open} notifs={7} />
          </div>

          {/* Bottom Toggle */}
          <button 
            onClick={() => setOpen(!open)} 
            className="mt-auto border-t border-gray-200 dark:border-gray-800 bg-gray-50/50 dark:bg-gray-800/30 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <div className="flex items-center p-3 h-14">
              <div className="grid size-8 shrink-0 place-content-center">
                <ChevronsRight className={`h-4 w-4 transition-transform duration-300 text-gray-500 dark:text-gray-400 ${open ? "rotate-180" : ""}`} />
              </div>
              {open && <span className="text-sm font-medium text-gray-600 dark:text-gray-300 ml-2">Collapse Sidebar</span>}
            </div>
          </button>
        </nav>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden">
            
            {/* Top Header */}
            <header className="flex-shrink-0 flex items-center justify-between px-6 lg:px-8 h-[72px] border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900/80 backdrop-blur-sm z-10 w-full">
               <div>
                  <h1 className="text-xl font-bold text-gray-900 dark:text-white">{title}</h1>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">{subtitle}</p>
               </div>
               <div className="flex items-center gap-3">
                  {headerActions && (
                    <div className="mr-2 flex items-center">
                      {headerActions}
                    </div>
                  )}
                  <button className="relative p-2 rounded-lg bg-gray-50 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    <Bell className="h-4 w-4 text-gray-600 dark:text-gray-300" />
                    <span className="absolute top-1 right-1 h-2 w-2 bg-red-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                  </button>
                  <button onClick={() => setIsDark(!isDark)} className="flex h-9 w-9 items-center justify-center rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800 hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                    {isDark ? <Sun className="h-4 w-4 text-gray-600 dark:text-gray-300" /> : <Moon className="h-4 w-4 text-gray-600 dark:text-gray-300" />}
                  </button>
                  <div className="h-6 w-px bg-gray-200 dark:bg-gray-700 mx-1"></div>
                  <Link to="/" className="flex items-center gap-2 group p-1.5 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors">
                    <div className="h-8 w-8 rounded-full bg-blue-100 dark:bg-blue-900/50 flex items-center justify-center">
                      <User className="h-4 w-4 text-blue-600 dark:text-blue-400" />
                    </div>
                    <span className="text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:block mr-1">Officer J.</span>
                  </Link>
               </div>
            </header>
            
            {/* Scrollable Page Space */}
            <main className="relative flex-1 overflow-auto bg-gray-50/50 dark:bg-gray-950/50 p-6 lg:p-8">
               <div className="pointer-events-none absolute inset-0 overflow-hidden">
                 <div className="absolute inset-0 opacity-[0.1] dark:opacity-[0.16]">
                   <ShaderAnimation className="h-full w-full" />
                 </div>
                 <div className="absolute inset-0 bg-gradient-to-b from-gray-50/92 via-gray-50/78 to-gray-50/95 dark:from-gray-950/94 dark:via-gray-950/82 dark:to-gray-950/96" />
               </div>
               <div className="relative z-10 max-w-7xl mx-auto w-full pb-12">
                 {children}
               </div>
            </main>

        </div>
      </div>
    </div>
  );
};

const Option = ({ Icon, label, to, currentPath, open, notifs }: any) => {
  const isSelected = currentPath.startsWith(to) || (to === '/dashboard' && currentPath === '/dashboard');
  
  return (
    <Link
      to={to}
      className={`relative flex h-[42px] w-full items-center rounded-lg transition-all duration-200 border border-transparent ${
        isSelected 
          ? "bg-white dark:bg-gray-800 shadow-sm border-gray-200 dark:border-gray-700 text-blue-600 dark:text-blue-400" 
          : "text-gray-600 dark:text-gray-400 hover:bg-white dark:hover:bg-gray-800/80 hover:text-gray-900 dark:hover:text-gray-200"
      }`}
    >
      <div className="grid h-full w-[42px] shrink-0 place-content-center">
        <Icon className={`h-[18px] w-[18px] ${isSelected ? 'text-blue-600 dark:text-blue-400' : ''}`} />
      </div>
      
      {open && (
        <span className={`text-sm tracking-wide ${isSelected ? 'font-semibold' : 'font-medium'}`}>{label}</span>
      )}

      {notifs && open && (
        <span className="absolute right-2.5 flex h-[18px] min-w-[18px] px-1 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/50 text-[10px] text-blue-700 dark:text-blue-300 font-bold border border-blue-200 dark:border-blue-800">
          {notifs}
        </span>
      )}
    </Link>
  );
};
