import { SearchIcon } from '../components/Icons';

export default function Header() {
  return (
    <header className="h-16 fixed top-0 right-0 left-64 bg-[#111111] border-b border-[#2C2C2D] z-10 flex items-center px-6">
      <div className="flex items-center ml-2 relative">
        <input 
          type="search" 
          placeholder="Search Project/Errors" 
          className="py-2 pl-10 pr-4 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent w-[300px] transition-all"
        />
        <div className="absolute left-0 ml-3 pointer-events-none">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
        </div>
      </div>
      
      <div className="flex-1"></div>
      
      <div className="flex items-center space-x-4">
        <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium flex items-center hover:bg-[#4338CA] transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          New Project
        </button>
        
        <div className="relative">
          <div className="w-5 h-5 rounded-full bg-red-500 absolute -top-1 -right-1 flex items-center justify-center text-[10px] text-white font-medium z-10">3</div>
          <button className="p-1.5 hover:bg-[#252526] rounded-md transition-colors relative">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
          </button>
        </div>
        
        <div className="flex items-center space-x-3 pl-3 border-l border-[#2C2C2D]">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C70FF] text-white flex items-center justify-center text-sm font-medium">
            A
          </div>
          <div className="hidden md:block">
            <div className="text-sm text-white font-medium">Aromal Sunil</div>
            <div className="text-xs text-[#9CA3AF]">Admin</div>
          </div>
          <button className="p-1 hover:bg-[#252526] rounded-md transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
