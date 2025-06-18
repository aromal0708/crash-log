import Link from 'next/link';
import './icons.css';

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-[#171717] border-r border-[#2C2C2D] fixed left-0 top-0 z-10 shadow-xl shadow-black/20 flex flex-col">
      <div className="p-4 flex flex-col h-full">
        <div className="mb-8 pt-2 px-2">
          <div className="flex items-center">
            <svg viewBox="0 0 24 24" className="h-7 w-7 mr-2 text-[#7263FF]" fill="currentColor">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
            </svg>
            <h1 className="font-bold text-xl text-white tracking-tight">Crash<span className="text-[#7263FF]">-Log</span></h1>
          </div>
        </div>
        
        <div className="mb-2 px-2">
          <span className="text-[#6B7280] text-xs font-medium uppercase tracking-wider">Dashboard</span>
        </div>
        
        <nav className="space-y-1 mb-6">
          <SidebarLink href="/" active>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
            </svg>
            Projects
          </SidebarLink>
          <SidebarLink href="/analytics">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
            Analytics
          </SidebarLink>
          <SidebarLink href="/logs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Logs
          </SidebarLink>
        </nav>
        
        <div className="mb-2 px-2">
          <span className="text-[#6B7280] text-xs font-medium uppercase tracking-wider">Resources</span>
        </div>
        
        <nav className="space-y-1">
          <SidebarLink href="/documentation">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
            </svg>
            Documentation
          </SidebarLink>
          <SidebarLink href="/api-docs">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
            </svg>
            API Reference
          </SidebarLink>
        </nav>
          
        <div className="mt-auto">
          <div className="border-t border-[#2C2C2D] pt-4 pb-2 px-2 mb-2">
            <span className="text-[#6B7280] text-xs font-medium uppercase tracking-wider">Account</span>
          </div>
          
          <SidebarLink href="/settings">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            Settings
          </SidebarLink>
          
          <SidebarLink href="/profile">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
            Profile
          </SidebarLink>
          
          <SidebarLink href="/logout">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            Logout
          </SidebarLink>
          
          <div className="mt-6 px-3 py-3 bg-[#1D1D1D] rounded-lg border border-[#2C2C2D] hover:border-[#4F46E5]/40 transition-colors">
            <div className="flex items-center">
              <div className="w-9 h-9 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C70FF] text-white flex items-center justify-center text-sm font-medium mr-3 shadow-md">
                A
              </div>
              <div>
                <div className="text-sm font-medium text-white">Aromal Sunil</div>
                <div className="text-xs text-[#9CA3AF] flex items-center">
                  <span className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></span>
                  Pro Plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
}

function SidebarLink({ 
  href, 
  children, 
  active = false 
}: { 
  href: string; 
  children: React.ReactNode;
  active?: boolean;
}) {
  return (
    <Link 
      href={href}
      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-all ${
        active 
          ? 'bg-[#4F46E5] text-white shadow-md' 
          : 'text-[#9CA3AF] hover:text-white hover:bg-[#2C2C2D]'
      }`}
    >
      {children}
    </Link>
  );
}
