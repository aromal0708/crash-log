"use client";

import { formatDate } from '@/app/utils/dateFormat';
import DashboardLayout from '../../components/DashboardLayout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useState } from 'react';

// Mock data - in a real app, you would fetch this based on the projectId
const projectsData = [
  {
    id: '507f1f77bcf86cd799439011',
    name: 'E-commerce Dashboard',
    apiKey: 'pk_live_*******************ba',
    description: 'Main e-commerce platform dashboard tracking sales and user activity',
    userId: '507f191e810c19729de860ea',
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

// Mock error data
const mockErrors = [
  { 
    id: '507f1f77bcf86cd799439021',
    projectId: '507f1f77bcf86cd799439011',
    apiKey: 'pk_live_*******************ba',
    message: 'TypeError: Cannot read property \'items\' of undefined', 
    stack: 'at checkout.js:214\nat processCheckout (checkout.js:180)\nat handleSubmit (form.js:32)', 
    severity: 'error',
    fileName: 'checkout.js',
    path: '/checkout',
    method: 'POST',
    file: 'checkout.js',
    timestamp: '2025-06-24T14:22:18Z',
    metadata: {
      browser: 'Chrome 120.0.0',
      os: 'Windows 11',
      url: '/checkout',
      userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      userId: 'user_123456'
    },
    resolved: false,
    createdAt: '2025-06-24T14:22:18Z',
    updatedAt: '2025-06-24T14:22:18Z'
  },
  { 
    id: '507f1f77bcf86cd799439022',
    projectId: '507f1f77bcf86cd799439011',
    apiKey: 'pk_live_*******************ba',
    message: 'Failed to load resource: the server responded with a status of 404', 
    stack: 'at fetchData (api.js:45)\nat loadProducts (products.js:12)', 
    severity: 'error',
    fileName: 'api.js',
    path: '/products',
    method: 'GET',
    file: 'api.js',
    timestamp: '2025-06-24T13:15:42Z',
    metadata: {
      browser: 'Firefox 118.0',
      os: 'macOS 16.1',
      url: '/products',
      userAgent: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.16; rv:118.0) Gecko/20100101 Firefox/118.0',
      resourceUrl: '/api/products/images/product123.jpg'
    },
    resolved: false,
    createdAt: '2025-06-24T13:15:42Z',
    updatedAt: '2025-06-24T13:15:42Z'
  },
  { 
    id: '507f1f77bcf86cd799439023',
    projectId: '507f1f77bcf86cd799439011',
    apiKey: 'pk_live_*******************ba',
    message: 'Warning: Each child in a list should have a unique "key" prop', 
    stack: 'at ProductList (products.js:78)\nat HomePage (home.js:24)', 
    severity: 'warning',
    fileName: 'products.js',
    path: '/home',
    method: 'GET',
    file: 'products.js',
    timestamp: '2025-06-23T22:08:11Z',
    metadata: {
      browser: 'Safari 17.2',
      os: 'iOS 17.5',
      url: '/home',
      component: 'ProductList'
    },
    resolved: false,
    createdAt: '2025-06-23T22:08:11Z',
    updatedAt: '2025-06-23T22:08:11Z'
  },
  { 
    id: '507f1f77bcf86cd799439024',
    projectId: '507f1f77bcf86cd799439011',
    apiKey: 'pk_live_*******************ba',
    message: 'Uncaught (in promise) SyntaxError: Unexpected token in JSON at position 4', 
    stack: 'at parseJSON (utils.js:32)\nat handleResponse (api.js:67)\nat processData (data.js:18)', 
    severity: 'error',
    fileName: 'utils.js',
    path: '/api/data',
    method: 'GET',
    file: 'utils.js',
    timestamp: '2025-06-23T19:44:55Z',
    metadata: {
      browser: 'Edge 120.0.0',
      os: 'Windows 11',
      url: '/api/data',
      requestId: 'req_456789'
    },
    resolved: false,
    createdAt: '2025-06-23T19:44:55Z',
    updatedAt: '2025-06-23T19:44:55Z'
  },
  { 
    id: '507f1f77bcf86cd799439025',
    projectId: '507f1f77bcf86cd799439011',
    apiKey: 'pk_live_*******************ba',
    message: 'ResizeObserver loop limit exceeded', 
    stack: 'at observeElements (resize.js:45)', 
    severity: 'info',
    fileName: 'resize.js',
    path: '/dashboard',
    method: 'GET',
    file: 'resize.js',
    timestamp: '2025-06-23T16:30:22Z',
    metadata: {
      browser: 'Chrome 120.0.0',
      os: 'Android 14',
      url: '/dashboard'
    },
    resolved: false,
    createdAt: '2025-06-23T16:30:22Z',
    updatedAt: '2025-06-23T16:30:22Z'
  }
];

export default function ProjectDetail() {
  const params = useParams();
  const projectId = params.id as string;
  const [activeTab, setActiveTab] = useState('overview');
  
  // Find the project by ID from the URL
  const project = projectsData.find(p => String(p.id) === String(projectId));
  
  // If project not found, show error message
  if (!project) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Project Not Found</h2>
            <p className="text-[#9CA3AF] mb-6">The project you're looking for doesn't exist or has been deleted.</p>
            <Link href="/projects">
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors cursor-pointer">
                Return to Projects
              </button>
            </Link>
          </div>
        </div>
      </DashboardLayout>
    );
  }
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Project Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6">
          <div>
            <div className="flex items-center mb-2">
              <Link href="/projects" className="text-[#9CA3AF] hover:text-white mr-2">
                <span className="flex items-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                  </svg>
                  Back to Projects
                </span>
              </Link>
              <h1 className="text-2xl font-semibold text-white">{project.name}</h1>
              <span className={`ml-3 px-2 py-1 text-xs font-medium rounded-full ${
                project.metadata?.environment === 'Production' 
                  ? 'bg-green-500/10 text-green-400' 
                  : project.metadata?.environment === 'Staging' 
                    ? 'bg-yellow-500/10 text-yellow-400' 
                    : 'bg-blue-500/10 text-blue-400'
              }`}>
                {project.metadata?.environment || 'Development'}
              </span>
            </div>
            <p className="text-[#9CA3AF] text-sm">{project.description}</p>
          </div>
          
          <div className="flex items-center space-x-3 mt-4 sm:mt-0">
            <button className="flex items-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
              </svg>
              Edit
            </button>
            
            <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-sm hover:bg-red-500/20 transition-all cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Delete
            </button>
          </div>
        </div>
        
        {/* API Key Section */}
        <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-4 mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-white mb-1">API Key</h3>
              <div className="flex items-center">
                <code className="bg-[#252526] px-3 py-1.5 rounded text-xs text-[#9CA3AF] font-mono">{project.apiKey}</code>
                <button className="ml-2 p-1.5 text-[#9CA3AF] hover:text-white rounded-md hover:bg-[#3A3A3B] transition-colors cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="mt-4 sm:mt-0">
              <button className="flex items-center gap-2 px-3 py-1.5 bg-[#4F46E5] text-white rounded-md text-xs font-medium hover:bg-[#4338CA] transition-colors cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Regenerate Key
              </button>
            </div>
          </div>
        </div>
        
        {/* Tabs */}
        <div className="border-b border-[#2C2C2D] mb-6">
          <nav className="flex -mb-px space-x-6">
            <button 
              onClick={() => setActiveTab('overview')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview' 
                  ? 'border-[#4F46E5] text-white' 
                  : 'border-transparent text-[#9CA3AF] hover:text-white hover:border-[#3A3A3B]'
              }`}
            >
              Overview
            </button>
            <button 
              onClick={() => setActiveTab('errors')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'errors' 
                  ? 'border-[#4F46E5] text-white' 
                  : 'border-transparent text-[#9CA3AF] hover:text-white hover:border-[#3A3A3B]'
              }`}
            >
              Errors
            </button>
            <button 
              onClick={() => setActiveTab('settings')}
              className={`pb-3 px-1 text-sm font-medium border-b-2 transition-colors cursor-pointer ${
                activeTab === 'settings' 
                  ? 'border-[#4F46E5] text-white' 
                  : 'border-transparent text-[#9CA3AF] hover:text-white hover:border-[#3A3A3B]'
              }`}
            >
              Settings
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div>
            {/* Error Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-[#9CA3AF]">Errors</h3>
                  <div className="p-2 bg-red-500/10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{project.errorCount.errors}</p>
                <p className="text-xs text-red-400 mt-1">+5 from yesterday</p>
              </div>
              
              <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-[#9CA3AF]">Warnings</h3>
                  <div className="p-2 bg-yellow-500/10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-yellow-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{project.errorCount.warnings}</p>
                <p className="text-xs text-yellow-400 mt-1">-2 from yesterday</p>
              </div>
              
              <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-5">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-medium text-[#9CA3AF]">Info</h3>
                  <div className="p-2 bg-blue-500/10 rounded-md">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                </div>
                <p className="text-2xl font-bold text-white">{project.errorCount.info}</p>
                <p className="text-xs text-blue-400 mt-1">+3 from yesterday</p>
              </div>
            </div>
            
            {/* Project Info */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg mb-6">
              <div className="px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">Project Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Framework</h4>
                      <p className="text-sm text-white">{project.metadata?.framework}</p>
                    </div>
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Status</h4>
                      <p className="text-sm">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-500/10 text-green-400">
                          {project.metadata?.status}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div>
                    <div className="mb-4">
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Created On</h4>
                      <p className="text-sm text-white">{formatDate(project.createdAt)}</p>
                    </div>
                    <div>
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Last Error</h4>
                      <p className="text-sm text-white">Today</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Recent Errors */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">Recent Errors</h3>
                <button 
                  className="text-xs text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
                  onClick={() => setActiveTab('errors')}
                >
                  View All
                </button>
              </div>
              <div className="divide-y divide-[#3A3A3B]">
                {mockErrors.slice(0, 3).map(error => (
                  <div key={error.id} className="p-4 hover:bg-[#252526]/40 transition-colors cursor-pointer">
                    <Link href={`/projects/${projectId}/errors/${error.id}`} className="block">
                      <div className="flex items-start">
                        <div className={`mt-0.5 mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          error.severity === 'error' 
                            ? 'bg-red-400' 
                            : error.severity === 'warning' 
                              ? 'bg-yellow-400' 
                              : 'bg-blue-400'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white line-clamp-1">{error.message}</p>
                          <p className="text-xs text-[#9CA3AF] mt-1 font-mono line-clamp-1">{error.stack}</p>
                          <div className="flex items-center mt-2 space-x-4">
                            <span className="text-xs text-[#9CA3AF]">{formatDate(error.timestamp)}</span>
                            <span className="text-xs text-[#9CA3AF]">{error.metadata?.browser}</span>
                            <span className="text-xs text-[#9CA3AF]">{error.metadata?.url || error.path}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'errors' && (
          <div>
            {/* Errors List */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg">
              <div className="flex items-center justify-between px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">All Errors</h3>
                <div className="flex items-center space-x-2">
                  <div className="relative">
                    <select className="py-1.5 pl-3 pr-8 bg-[#252526] border border-[#3A3A3B] rounded-md text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] appearance-none transition-colors hover:border-[#4F46E5] cursor-pointer">
                      <option value="all">All Severities</option>
                      <option value="error">Errors Only</option>
                      <option value="warning">Warnings Only</option>
                      <option value="info">Info Only</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                  
                  <div className="relative">
                    <select className="py-1.5 pl-3 pr-8 bg-[#252526] border border-[#3A3A3B] rounded-md text-xs text-white focus:outline-none focus:ring-1 focus:ring-[#4F46E5] focus:border-[#4F46E5] appearance-none transition-colors hover:border-[#4F46E5] cursor-pointer">
                      <option value="newest">Newest First</option>
                      <option value="oldest">Oldest First</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-[#9CA3AF]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Error List */}
              <div className="divide-y divide-[#3A3A3B]">
                {mockErrors.map(error => (
                  <div key={error.id} className="p-4 hover:bg-[#252526]/40 transition-colors cursor-pointer">
                    <Link href={`/projects/${projectId}/errors/${error.id}`} className="block">
                      <div className="flex items-start">
                        <div className={`mt-0.5 mr-3 flex-shrink-0 w-2 h-2 rounded-full ${
                          error.severity === 'error' 
                            ? 'bg-red-400' 
                            : error.severity === 'warning' 
                              ? 'bg-yellow-400' 
                              : 'bg-blue-400'
                        }`}></div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-white line-clamp-1">{error.message}</p>
                          <p className="text-xs text-[#9CA3AF] mt-1 font-mono line-clamp-1">{error.stack}</p>
                          <div className="flex flex-wrap items-center mt-2 gap-x-4 gap-y-1">
                            <span className="text-xs text-[#9CA3AF]">{formatDate(error.timestamp)}</span>
                            <span className="text-xs text-[#9CA3AF]">{error.metadata?.browser}</span>
                            <span className="text-xs text-[#9CA3AF]">{error.metadata?.os}</span>
                            <span className="text-xs text-[#9CA3AF]">{error.metadata?.url || error.path}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                    <div className="flex items-center justify-end mt-1">
                      <button className="p-1.5 text-[#9CA3AF] hover:text-white rounded-md hover:bg-[#3A3A3B] transition-colors cursor-pointer">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* Pagination */}
              <div className="px-6 py-4 flex items-center justify-between border-t border-[#3A3A3B]">
                <div className="flex items-center">
                  <span className="text-xs text-[#9CA3AF]">Showing 1-5 of 24 errors</span>
                </div>
                <div className="flex items-center space-x-2">
                  <button className="p-1.5 text-[#9CA3AF] hover:text-white rounded-md hover:bg-[#3A3A3B] transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed" disabled>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button className="p-1.5 text-[#9CA3AF] hover:text-white rounded-md hover:bg-[#3A3A3B] transition-colors cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {activeTab === 'settings' && (
          <div>
            {/* Project Settings */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Project Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="projectName" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Project Name
                  </label>
                  <input 
                    type="text" 
                    id="projectName" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent cursor-text"
                    defaultValue={project.name}
                  />
                </div>
                
                <div>
                  <label htmlFor="environment" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Environment
                  </label>
                  <select 
                    id="environment" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent appearance-none cursor-pointer"
                    defaultValue={project.metadata?.environment}
                  >
                    <option value="Production">Production</option>
                    <option value="Staging">Staging</option>
                    <option value="Development">Development</option>
                  </select>
                </div>
                
                <div>
                  <label htmlFor="description" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Description
                  </label>
                  <textarea 
                    id="description" 
                    rows={3}
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent cursor-text"
                    defaultValue={project.description}
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors cursor-pointer">
                  Save Changes
                </button>
              </div>
            </div>
            
            {/* Notification Settings */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6 mb-6">
              <h3 className="text-lg font-medium text-white mb-4">Notification Settings</h3>
              
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Email Notifications</p>
                    <p className="text-xs text-[#9CA3AF]">Receive email alerts for critical errors</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" defaultChecked />
                    <div className="w-11 h-6 bg-[#3A3A3B] rounded-full peer peer-checked:bg-[#4F46E5] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4F46E5]/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Slack Notifications</p>
                    <p className="text-xs text-[#9CA3AF]">Send error alerts to your Slack workspace</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#3A3A3B] rounded-full peer peer-checked:bg-[#4F46E5] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4F46E5]/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Discord Notifications</p>
                    <p className="text-xs text-[#9CA3AF]">Send error alerts to your Discord server</p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input type="checkbox" className="sr-only peer" />
                    <div className="w-11 h-6 bg-[#3A3A3B] rounded-full peer peer-checked:bg-[#4F46E5] peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-[#4F46E5]/50 after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:after:translate-x-full"></div>
                  </label>
                </div>
              </div>
            </div>
            
            {/* Danger Zone */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6">
              <h3 className="text-lg font-medium text-white mb-4">Danger Zone</h3>
              
              <div className="border border-red-500/20 rounded-md p-4 bg-red-500/5">
                <h4 className="text-sm font-medium text-red-400 mb-2">Delete Project</h4>
                <p className="text-xs text-[#9CA3AF] mb-4">Once you delete a project, there is no going back. All error logs and data will be permanently deleted.</p>
                <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors cursor-pointer">
                  Delete Project
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
