import Link from 'next/link';

interface ProjectCardProps {
  id: string;
  name: string;
  apiKey: string;
  description: string;
  userId: string;
  lastError?: string;
  errorCount: {
    errors: number;
    warnings: number;
    info: number;
  };
  metadata?: {
    environment?: string;
    framework?: string;
    status?: string;
  };
  createdAt: string;
  updatedAt: string;
}

export default function ProjectCard({ 
  id, 
  name, 
  apiKey, 
  description, 
  lastError, 
  errorCount, 
  metadata,
  createdAt
}: ProjectCardProps) {
  return (
    <div className="group bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg overflow-hidden hover:border-[#4F46E5] hover:shadow-lg hover:shadow-[#4F46E5]/10 transition-all">
      <div className="p-5 flex flex-col h-full">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold text-[17px] text-white group-hover:text-[#7C70FF] transition-colors line-clamp-1">{name}</h3>
          <div className="flex space-x-1">
            <button className="p-1 text-[#9CA3AF] hover:text-white rounded-md hover:bg-[#3A3A3B] transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />
              </svg>
            </button>
          </div>
        </div>
        
        <div className="flex items-center mb-3 bg-[#252526] rounded-md px-2 py-1.5 border border-[#3A3A3B] cursor-pointer hover:border-[#4F46E5]/50 group-hover:border-[#4F46E5]/50 transition-colors">
          <div className="flex items-center flex-1 truncate">
            <span className="text-xs font-medium text-[#9CA3AF] truncate">
              {apiKey}
            </span>
            <button className="ml-2 text-[#9CA3AF] hover:text-white p-0.5 rounded-md hover:bg-[#3A3A3B] transition-colors flex-shrink-0 cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
              </svg>
            </button>
          </div>
        </div>
        
        <p className="text-xs text-[#9CA3AF] mb-3 line-clamp-2">{description}</p>

        <div className="mb-3 flex flex-wrap gap-2">
          {metadata?.environment && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              metadata.environment === 'Production' 
                ? 'bg-green-500/10 text-green-400' 
                : metadata.environment === 'Staging' 
                  ? 'bg-yellow-500/10 text-yellow-400' 
                  : 'bg-blue-500/10 text-blue-400'
            }`}>
              {metadata.environment}
            </span>
          )}
          {metadata?.framework && (
            <span className="px-2 py-0.5 text-xs font-medium rounded-full bg-purple-500/10 text-purple-400">
              {metadata.framework}
            </span>
          )}
          {metadata?.status && (
            <span className={`px-2 py-0.5 text-xs font-medium rounded-full ${
              metadata.status === 'Active' 
                ? 'bg-green-500/10 text-green-400' 
                : metadata.status === 'Maintenance' 
                  ? 'bg-orange-500/10 text-orange-400' 
                  : 'bg-red-500/10 text-red-400'
            }`}>
              {metadata.status}
            </span>
          )}
        </div>

        <div className="mb-4 bg-[#252526] rounded-md p-2.5 border border-[#3A3A3B] group-hover:border-[#4F46E5]/20 transition-colors flex-grow cursor-default">
          {lastError ? (
            <p className="text-xs text-[#E74C3C] line-clamp-2 font-mono">
              {lastError}
            </p>
          ) : (
            <p className="text-xs text-[#9CA3AF] italic">
              No errors recorded
            </p>
          )}
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <div className="text-xs text-[#9CA3AF]">
            <span className="inline-flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {new Date(createdAt).toLocaleDateString()}
            </span>
          </div>
          <div className="flex space-x-3">
            <span className="flex items-center text-xs text-red-400 font-medium">
              <span className="w-2 h-2 bg-red-400 rounded-full mr-1"></span>
              {errorCount.errors}
            </span>
            <span className="flex items-center text-xs text-yellow-400 font-medium">
              <span className="w-2 h-2 bg-yellow-400 rounded-full mr-1"></span>
              {errorCount.warnings}
            </span>
            <span className="flex items-center text-xs text-blue-400 font-medium">
              <span className="w-2 h-2 bg-blue-400 rounded-full mr-1"></span>
              {errorCount.info}
            </span>
          </div>
        </div>
        
        <Link href={`/projects/${id}`} className="w-full">
          <button className="w-full py-2 text-sm font-medium text-white bg-[#4F46E5] rounded-md hover:bg-[#4338CA] transition-colors mt-auto group-hover:shadow-md cursor-pointer">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
}
