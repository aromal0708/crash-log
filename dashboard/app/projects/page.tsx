import DashboardLayout from '../components/DashboardLayout';
import ProjectCard from '../components/ProjectCard';

export default function Projects() {
  // Mock data for projects
  const projects = [
    {
      id: 1,
      title: 'E-commerce Platform',
      apiKey: 'pk_test_abc123def456',
      lastError: 'TypeError: Cannot read property \'items\' of undefined at checkout.js:214',
      errorCount: { errors: 23, warnings: 8, info: 12 }
    },
    {
      id: 2,
      title: 'Marketing Website',
      apiKey: 'pk_test_xyz789uvw012',
      lastError: 'SyntaxError: Unexpected token in JSON at position 4 in analytics.js:45',
      errorCount: { errors: 7, warnings: 15, info: 9 }
    },
    {
      id: 3,
      title: 'Mobile API Backend',
      apiKey: 'pk_test_ghi456jkl789',
      lastError: 'ReferenceError: authToken is not defined at users/authenticate.js:78',
      errorCount: { errors: 15, warnings: 4, info: 7 }
    },
    {
      id: 4,
      title: 'Admin Dashboard',
      apiKey: 'pk_test_mno123pqr456',
      lastError: 'Error: Network request failed at data-fetcher.js:92',
      errorCount: { errors: 12, warnings: 11, info: 5 }
    },
    {
      id: 5,
      title: 'Customer Portal',
      apiKey: 'pk_test_stu789vwx012',
      lastError: 'TypeError: Cannot read property \'user\' of null at profile.js:132',
      errorCount: { errors: 19, warnings: 6, info: 3 }
    },
    {
      id: 6,
      title: 'Payment Gateway',
      apiKey: 'pk_test_yza123bcd456',
      lastError: 'RangeError: Invalid array length at transactions.js:76',
      errorCount: { errors: 31, warnings: 14, info: 8 }
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-2xl font-semibold text-[var(--text-primary)]">All Projects</h2>
            <p className="text-sm text-[var(--text-muted)] mt-1">Manage and monitor your projects</p>
          </div>
          
          <div className="flex items-center gap-3">
            <select className="py-2 px-3 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-md text-sm text-[var(--text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--primary-color)]">
              <option>All</option>
              <option>Active</option>
              <option>Archived</option>
            </select>
            
            <button className="flex items-center gap-2 rounded bg-[var(--card-bg)] border border-[var(--border-color)] px-3 py-2 text-sm text-[var(--text-primary)]">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3 3a1 1 0 011-1h12a1 1 0 011 1v3a1 1 0 01-.293.707L12 11.414V15a1 1 0 01-.293.707l-2 2A1 1 0 018 17v-5.586L3.293 6.707A1 1 0 013 6V3z" clipRule="evenodd" />
              </svg>
              Filter
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
    </DashboardLayout>
  );
}
