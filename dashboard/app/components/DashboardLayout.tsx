import Sidebar from './Sidebar';
import Header from './Header';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-[#111111] antialiased">
      <Sidebar />
      
      <div className="ml-64 transition-all">
        <Header />
        
        <main className="pt-24 px-6 md:px-8 pb-16">
          {children}
        </main>
        
        <footer className="px-8 py-6 text-center text-[#6B7280] text-xs border-t border-[#2C2C2D]">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center">
            <p>© 2025 CrashLog. All rights reserved.</p>
            <div className="flex items-center space-x-4 mt-3 sm:mt-0">
              <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors">Terms</a>
              <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors">Privacy</a>
              <a href="#" className="text-[#9CA3AF] hover:text-white transition-colors">Docs</a>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Background Stripes - Matching the Figma design */}
      <div className="fixed inset-0 z-[-1] opacity-15 pointer-events-none">
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(90deg, #2E2E2E, #2E2E2E 1px, transparent 1px, transparent 60px)',
          backgroundSize: '60px 100%'
        }}></div>
        <div className="absolute inset-0" style={{
          backgroundImage: 'repeating-linear-gradient(0deg, #2E2E2E, #2E2E2E 1px, transparent 1px, transparent 60px)',
          backgroundSize: '100% 60px'
        }}></div>
        
        {/* Subtle radial gradient for depth */}
        <div className="absolute inset-0 bg-gradient-radial from-[#1a1a1a] via-transparent to-transparent opacity-70"></div>
      </div>
    </div>
  );
}
