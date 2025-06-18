import DashboardLayout from './components/DashboardLayout';
import ProjectCard from './components/ProjectCard';
import StatCard from './components/StatCard';
import Image from 'next/image';

export default function Home() {
  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'E-commerce Dashboard',
      apiKey: 'pk_live_*******************ba',
      lastError: 'TypeError: Cannot read property \'items\' of undefined at checkout.js:214',
      errorCount: { errors: 23, warnings: 8, info: 12 }
    },
    {
      id: 2,
      title: 'User Analytics Platform',
      apiKey: 'ua_prod_*******************cd',
      lastError: 'SyntaxError: Unexpected token in JSON at position 4 in analytics.js:45',
      errorCount: { errors: 7, warnings: 15, info: 9 }
    },
    {
      id: 3,
      title: 'CRM System',
      apiKey: 'crm_api_*******************ef',
      lastError: 'ReferenceError: authToken is not defined at users/authenticate.js:78',
      errorCount: { errors: 15, warnings: 4, info: 7 }
    },
    {
      id: 4,
      title: 'Content Management',
      apiKey: 'cms_key_*******************gh',
      lastError: 'Error: Network request failed at data-fetcher.js:92',
      errorCount: { errors: 12, warnings: 11, info: 5 }
    }
  ];
  
  return (
    <DashboardLayout>
      {/* Summary Statistics Section */}
      <div className="mb-10">
        <h2 className="text-2xl font-semibold text-white mb-6">Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            title="Total Projects" 
            value="4" 
            change="+2 from last month"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z" />
              </svg>
            }
            iconBgColor="bg-[#4F46E5]/10"
            iconTextColor="text-[#7C70FF]"
          />
          
          <StatCard 
            title="Total Errors" 
            value="57" 
            change="+13 in the last 24h"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            }
            iconBgColor="bg-red-500/10"
            iconTextColor="text-red-400"
          />
          
          <StatCard 
            title="Warnings" 
            value="38" 
            change="-5 from yesterday"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBgColor="bg-yellow-500/10"
            iconTextColor="text-yellow-400"
          />
          
          <StatCard 
            title="Info Logs" 
            value="33" 
            change="+8 from last week"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            }
            iconBgColor="bg-blue-500/10"
            iconTextColor="text-blue-400"
          />
        </div>
      </div>
      
      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-0">Projects</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select className="py-2 pl-4 pr-10 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] appearance-none transition-colors hover:border-[#4F46E5]">
                <option value="">All Projects</option>
                <option value="active">Active</option>
                <option value="archived">Archived</option>
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4h13M3 8h9m-9 4h9m5-4v12m0 0l-4-4m4 4l4-4" />
              </svg>
              Sort
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {projects.map(project => (
            <ProjectCard 
              key={project.id}
              title={project.title}
              apiKey={project.apiKey}
              lastError={project.lastError}
              errorCount={project.errorCount}
            />
          ))}
        </div>
      </div>
      
      {/* Empty State - Will show when no projects exist */}
      {projects.length === 0 && (
        <div className="flex flex-col items-center justify-center py-16 px-4 border border-dashed border-[#3A3A3B] rounded-lg bg-[#252526]/30">
          <div className="p-4 bg-[#4F46E5]/10 rounded-full mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-[#7C70FF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
            </svg>
          </div>
          <h3 className="text-xl font-medium text-white mb-2">No projects yet</h3>
          <p className="text-[#9CA3AF] text-center mb-6 max-w-md">Create your first project to start tracking errors and get insights into your application's performance.</p>
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
            Create New Project
          </button>
        </div>
      )}
    </DashboardLayout>
  );
}
