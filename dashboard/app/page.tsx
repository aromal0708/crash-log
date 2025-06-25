import DashboardLayout from './components/DashboardLayout';
import ProjectCard from './components/ProjectCard';

export default function Home() {
  // Mock data for projects
  const projects = [
    {
      id: '507f1f77bcf86cd799439011',
      name: 'E-commerce Dashboard',
      apiKey: 'pk_live_*******************ba',
      description: 'Main e-commerce platform dashboard tracking sales and user activity',
      userId: '507f191e810c19729de860ea',
      lastError: "TypeError: Cannot read property &apos;items&apos; of undefined at checkout.js:214",
      errorCount: { errors: 23, warnings: 8, info: 12 },
      createdAt: '2025-05-10T10:30:00Z',
      updatedAt: '2025-06-24T15:45:12Z',
      metadata: {
        environment: 'Production',
        framework: 'React',
        status: 'Active'
      }
    },
    {
      id: '507f1f77bcf86cd799439012',
      name: 'User Analytics Platform',
      apiKey: 'ua_prod_*******************cd',
      description: 'Analytics dashboard for tracking user behavior and engagement',
      userId: '507f191e810c19729de860ea',
      lastError: 'SyntaxError: Unexpected token in JSON at position 4 in analytics.js:45',
      errorCount: { errors: 7, warnings: 15, info: 9 },
      createdAt: '2025-05-15T14:20:30Z',
      updatedAt: '2025-06-23T09:12:45Z',
      metadata: {
        environment: 'Production',
        framework: 'Vue.js',
        status: 'Active'
      }
    },
    {
      id: '507f1f77bcf86cd799439013',
      name: 'CRM System',
      apiKey: 'crm_api_*******************ef',
      description: 'Customer relationship management system for sales team',
      userId: '507f191e810c19729de860ea',
      lastError: 'ReferenceError: authToken is not defined at users/authenticate.js:78',
      errorCount: { errors: 15, warnings: 4, info: 7 },
      createdAt: '2025-05-20T08:15:00Z',
      updatedAt: '2025-06-22T16:40:22Z',
      metadata: {
        environment: 'Staging',
        framework: 'Angular',
        status: 'Active'
      }
    },
    {
      id: '507f1f77bcf86cd799439014',
      name: 'Content Management',
      apiKey: 'cms_key_*******************gh',
      description: 'Content management system for marketing team',
      userId: '507f191e810c19729de860ea',
      lastError: 'Error: Network request failed at data-fetcher.js:92',
      errorCount: { errors: 12, warnings: 11, info: 5 },
      createdAt: '2025-05-25T11:45:30Z',
      updatedAt: '2025-06-21T14:22:18Z',
      metadata: {
        environment: 'Development',
        framework: 'Next.js',
        status: 'Active'
      }
    }
  ];
  
  return (
    <DashboardLayout>
      {/* Projects Section */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold text-white mb-4 sm:mb-0">Projects</h2>
          
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <select className="py-2 pl-4 pr-10 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] appearance-none transition-colors hover:border-[#4F46E5] cursor-pointer">
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
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z" />
              </svg>
              Filter
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all cursor-pointer">
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
              id={project.id}
              name={project.name}
              description={project.description}
              apiKey={project.apiKey}
              userId={project.userId}
              lastError={project.lastError}
              errorCount={project.errorCount}
              metadata={project.metadata}
              createdAt={project.createdAt}
              updatedAt={project.updatedAt}
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
          <button className="flex items-center gap-2 px-4 py-2 bg-[#4F46E5] text-white rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors cursor-pointer">
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
