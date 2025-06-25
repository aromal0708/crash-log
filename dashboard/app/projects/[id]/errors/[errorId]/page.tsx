"use client";

import DashboardLayout from '../../../../components/DashboardLayout';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { formatDate } from '../../../../utils/dateFormat';

// Mock error data
const mockErrors = [
  { 
    id: '507f1f77bcf86cd799439021',
    projectId: '507f1f77bcf86cd799439011',
    apiKey: 'pk_live_*******************ba',
    message: 'TypeError: Cannot read property &apos;items&apos; of undefined', 
    stack: `TypeError: Cannot read property 'items' of undefined
    at checkout.js:214:23
    at processCheckout (checkout.js:180:10)
    at handleSubmit (form.js:32:15)
    at HTMLFormElement.onsubmit (checkout.html:25:77)`,
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
      ip: '192.168.1.1',
      projectName: 'E-commerce Dashboard',
      occurrences: 7,
      firstSeen: '2025-06-22T10:15:30Z',
      lastSeen: '2025-06-24T14:22:18Z',
      environment: 'Production',
      userId: 'user_123456',
      page: 'Checkout',
      component: 'CartSummary',
      cartId: 'cart_9876543'
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
    stack: `Failed to load resource: the server responded with a status of 404
    at fetchData (api.js:45:12)
    at loadProducts (products.js:12:8)`,
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
      ip: '192.168.1.2',
      projectName: 'E-commerce Dashboard',
      occurrences: 4,
      firstSeen: '2025-06-23T09:15:30Z',
      lastSeen: '2025-06-24T13:15:42Z',
      environment: 'Production',
      userId: 'user_789012',
      page: 'Products',
      resourceUrl: '/api/products/images/product123.jpg',
      requestId: 'req_456789'
    },
    resolved: false,
    createdAt: '2025-06-24T13:15:42Z',
    updatedAt: '2025-06-24T13:15:42Z'
  }
];

export default function ErrorDetail() {
  const params = useParams();
  const errorId = params.errorId as string;
  const projectId = params.id as string;
  
  // Find the error by ID
  const error = mockErrors.find(e => e.id === errorId);
  
  if (!error) {
    return (
      <DashboardLayout>
        <div className="max-w-7xl mx-auto">
          <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-8 text-center">
            <h2 className="text-xl font-semibold text-white mb-2">Error Not Found</h2>
            <p className="text-[#9CA3AF] mb-6">The error you're looking for doesn't exist or has been resolved.</p>
            <Link href={`/projects/${projectId}`}>
              <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors cursor-pointer">
                Return to Project
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
        {/* Error Header */}
        <div className="mb-6">
          <div className="flex items-center mb-2">
            <Link href={`/projects/${projectId}`} className="text-[#9CA3AF] hover:text-white mr-2">
              <span className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                </svg>
                Back to Project
              </span>
            </Link>
          </div>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between">
            <div className="flex items-center">
              <div className={`mr-3 flex-shrink-0 w-3 h-3 rounded-full ${
                error.severity === 'error' 
                  ? 'bg-red-400' 
                  : error.severity === 'warning' 
                    ? 'bg-yellow-400' 
                    : 'bg-blue-400'
              }`}></div>
              <h1 className="text-xl font-semibold text-white">{error.message}</h1>
            </div>
            
            <div className="flex items-center space-x-3 mt-4 sm:mt-0">
              {!error.resolved ? (
                <button className="flex items-center gap-2 px-4 py-2 bg-green-500/10 text-green-400 border border-green-500/20 rounded-md text-sm hover:bg-green-500/20 transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Mark as Resolved
                </button>
              ) : (
                <button className="flex items-center gap-2 px-4 py-2 bg-[#252526] text-[#9CA3AF] border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:text-white transition-all cursor-pointer">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Reopen
                </button>
              )}
              
              <button className="flex items-center gap-2 px-4 py-2 bg-red-500/10 text-red-400 border border-red-500/20 rounded-md text-sm hover:bg-red-500/20 transition-all cursor-pointer">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
                Delete
              </button>
            </div>
          </div>
          <div className="text-sm text-[#9CA3AF] mt-2">
            {error.metadata?.occurrences && `${error.metadata.occurrences} occurrences • `}
            {error.metadata?.firstSeen && `First seen ${formatDate(error.metadata.firstSeen)} • `}
            {error.metadata?.lastSeen && `Last seen ${formatDate(error.metadata.lastSeen)}`}
          </div>
        </div>
        
        {/* Error Details */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            {/* Stack Trace */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg mb-6">
              <div className="px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">Stack Trace</h3>
              </div>
              <div className="p-4 bg-[#252526]">
                <pre className="text-xs font-mono text-white whitespace-pre-wrap">
                  {error.stack}
                </pre>
              </div>
            </div>
            
            {/* Browser Information */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg mb-6">
              <div className="px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">Browser Information</h3>
              </div>
              <div className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {error.metadata?.browser && (
                    <div>
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Browser</h4>
                      <p className="text-sm text-white">{error.metadata.browser}</p>
                    </div>
                  )}
                  {error.metadata?.os && (
                    <div>
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Operating System</h4>
                      <p className="text-sm text-white">{error.metadata.os}</p>
                    </div>
                  )}
                  {error.metadata?.url && (
                    <div>
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">URL</h4>
                      <p className="text-sm text-white line-clamp-1">{error.metadata.url}</p>
                    </div>
                  )}
                  {error.metadata?.ip && (
                    <div>
                      <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">IP Address</h4>
                      <p className="text-sm text-white">{error.metadata.ip}</p>
                    </div>
                  )}
                </div>
                
                {error.metadata?.userAgent && (
                  <div className="mt-4">
                    <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">User Agent</h4>
                    <p className="text-sm text-white break-words">{error.metadata.userAgent}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Metadata */}
            {Object.keys(error.metadata || {}).filter(key => 
              !['browser', 'os', 'url', 'ip', 'userAgent', 'projectName', 'environment', 'userId', 'occurrences', 'firstSeen', 'lastSeen'].includes(key)
            ).length > 0 && (
              <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg">
                <div className="px-6 py-4 border-b border-[#3A3A3B]">
                  <h3 className="text-md font-medium text-white">Additional Metadata</h3>
                </div>
                <div className="p-6">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(error.metadata || {})
                      .filter(([key]) => !['browser', 'os', 'url', 'ip', 'userAgent', 'projectName', 'environment', 'userId', 'occurrences', 'firstSeen', 'lastSeen'].includes(key))
                      .map(([key, value]) => (
                      <div key={key}>
                        <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">{key}</h4>
                        <p className="text-sm text-white break-words">{value as string}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>
          
          {/* Sidebar */}
          <div className="lg:col-span-1">
            {/* Project Info */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg mb-6">
              <div className="px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">Project Information</h3>
              </div>
              <div className="p-6">
                <div className="mb-4">
                  <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Project</h4>
                  <p className="text-sm text-white">{error.metadata?.projectName || "N/A"}</p>
                </div>
                <div className="mb-4">
                  <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Environment</h4>
                  <p className="text-sm text-white">{error.metadata?.environment || "N/A"}</p>
                </div>
                <div>
                  <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">Status</h4>
                  <p className="text-sm">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      error.resolved 
                        ? 'bg-green-500/10 text-green-400' 
                        : 'bg-red-500/10 text-red-400'
                    }`}>
                      {error.resolved ? 'Resolved' : 'Unresolved'}
                    </span>
                  </p>
                </div>
              </div>
            </div>
            
            {/* User Info */}
            {error.metadata.userId && (
              <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg mb-6">
                <div className="px-6 py-4 border-b border-[#3A3A3B]">
                  <h3 className="text-md font-medium text-white">User Information</h3>
                </div>
                <div className="p-6">
                  <div>
                    <h4 className="text-xs uppercase text-[#9CA3AF] mb-1">User ID</h4>
                    <p className="text-sm text-white">{error.metadata.userId}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Actions */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg">
              <div className="px-6 py-4 border-b border-[#3A3A3B]">
                <h3 className="text-md font-medium text-white">Actions</h3>
              </div>
              <div className="p-6">
                <div className="space-y-3">
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Copy as JSON
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    Ignore Similar Errors
                  </button>
                  
                  <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-[#252526] text-white border border-[#3A3A3B] rounded-md text-sm hover:border-[#4F46E5] hover:bg-[#252526]/80 transition-all cursor-pointer">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
                    </svg>
                    Share Error
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
