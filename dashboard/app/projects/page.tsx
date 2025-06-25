"use client";

import DashboardLayout from '../components/DashboardLayout';
import ProjectCard from '../components/ProjectCard';
import { useState } from 'react';

// Project Type based on the backend model
interface Project {
  id: string;
  name: string;
  description: string;
  apiKey: string;
  userId: string;
  errorCount: { 
    errors: number;
    warnings: number;
    info: number;
  };
  lastError?: string;
  metadata?: {
    environment?: string;
    framework?: string;
    status?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function Projects() {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  // Mock data for projects based on the backend model
  const projects: Project[] = [
    {
      id: '507f1f77bcf86cd799439011',
      name: 'E-commerce Dashboard',
      description: 'Main e-commerce platform dashboard tracking sales and user activity',
      apiKey: 'pk_live_*******************ba',
      userId: '507f191e810c19729de860ea',
      errorCount: { errors: 23, warnings: 8, info: 12 },
      lastError: 'TypeError: Cannot read property \'items\' of undefined at checkout.js:214',
      metadata: {
        environment: 'Production',
        framework: 'React',
        status: 'Active'
      },
      createdAt: '2025-05-10T10:30:00Z',
      updatedAt: '2025-06-24T15:45:12Z'
    },
    {
      id: '507f1f77bcf86cd799439012',
      name: 'User Analytics Platform',
      description: 'Analytics dashboard for tracking user behavior and engagement',
      apiKey: 'ua_prod_*******************cd',
      userId: '507f191e810c19729de860ea',
      errorCount: { errors: 7, warnings: 15, info: 9 },
      lastError: 'SyntaxError: Unexpected token in JSON at position 4 in analytics.js:45',
      metadata: {
        environment: 'Production',
        framework: 'Vue.js',
        status: 'Active'
      },
      createdAt: '2025-05-15T14:20:30Z',
      updatedAt: '2025-06-23T09:12:45Z'
    },
    {
      id: '507f1f77bcf86cd799439013',
      name: 'CRM System',
      description: 'Customer relationship management system for sales team',
      apiKey: 'crm_api_*******************ef',
      userId: '507f191e810c19729de860ea',
      errorCount: { errors: 15, warnings: 4, info: 7 },
      lastError: 'ReferenceError: authToken is not defined at users/authenticate.js:78',
      metadata: {
        environment: 'Staging',
        framework: 'Angular',
        status: 'Active'
      },
      createdAt: '2025-05-20T08:15:00Z',
      updatedAt: '2025-06-22T16:40:22Z'
    },
    {
      id: '507f1f77bcf86cd799439014',
      name: 'Content Management',
      description: 'Content management system for marketing team',
      apiKey: 'cms_key_*******************gh',
      userId: '507f191e810c19729de860ea',
      errorCount: { errors: 12, warnings: 11, info: 5 },
      lastError: 'Error: Network request failed at data-fetcher.js:92',
      metadata: {
        environment: 'Development',
        framework: 'Next.js',
        status: 'Active'
      },
      createdAt: '2025-05-25T11:45:30Z',
      updatedAt: '2025-06-21T14:22:18Z'
    },
    {
      id: '507f1f77bcf86cd799439015',
      name: 'Customer Portal',
      description: 'Customer self-service portal for account management',
      apiKey: 'cp_live_*******************ij',
      userId: '507f191e810c19729de860ea',
      errorCount: { errors: 19, warnings: 6, info: 3 },
      lastError: 'TypeError: Cannot read property \'user\' of null at profile.js:132',
      metadata: {
        environment: 'Production',
        framework: 'React',
        status: 'Active'
      },
      createdAt: '2025-06-01T09:30:45Z',
      updatedAt: '2025-06-20T11:35:18Z'
    },
    {
      id: '507f1f77bcf86cd799439016',
      name: 'Payment Gateway',
      description: 'Payment processing system for e-commerce transactions',
      apiKey: 'pg_test_*******************kl',
      userId: '507f191e810c19729de860ea',
      errorCount: { errors: 31, warnings: 14, info: 8 },
      lastError: 'RangeError: Invalid array length at transactions.js:76',
      metadata: {
        environment: 'Staging',
        framework: 'Node.js',
        status: 'Maintenance'
      },
      createdAt: '2025-06-05T16:20:10Z',
      updatedAt: '2025-06-19T08:45:30Z'
    }
  ];

  return (
    <DashboardLayout>
      <div className="mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between mb-6 gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">All Projects</h2>
            <p className="text-sm text-[#9CA3AF] mt-1">Manage and monitor your projects</p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="relative w-full sm:w-64">
              <input 
                type="text" 
                placeholder="Search projects..." 
                className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent pl-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-[#9CA3AF] absolute left-3 top-2.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            
            <select 
              className="w-full sm:w-auto py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent cursor-pointer"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Environments</option>
              <option value="production">Production</option>
              <option value="staging">Staging</option>
              <option value="development">Development</option>
            </select>
            
            <button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
              </svg>
              New Project
            </button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects
            .filter(project => {
              // Apply environment filter
              if (filter !== 'all' && project.metadata?.environment?.toLowerCase() !== filter) {
                return false;
              }
              
              // Apply search filter
              if (searchQuery && !project.name.toLowerCase().includes(searchQuery.toLowerCase()) && 
                  !project.description.toLowerCase().includes(searchQuery.toLowerCase())) {
                return false;
              }
              
              return true;
            })
            .map(project => (
            <ProjectCard 
              key={project.id}
              id={project.id}
              name={project.name}
              apiKey={project.apiKey}
              description={project.description}
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
    </DashboardLayout>
  );
}
