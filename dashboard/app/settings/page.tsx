import DashboardLayout from '../components/DashboardLayout';

export default function Settings() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Settings</h1>
        
        {/* Account Settings Section */}
        <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">Account Settings</h2>
          
          <div className="space-y-4">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                Email Address
              </label>
              <input 
                type="email" 
                id="email" 
                className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                defaultValue="aromal@example.com"
              />
            </div>
            
            <div>
              <label htmlFor="timezone" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                Timezone
              </label>
              <select 
                id="timezone" 
                className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent appearance-none"
                defaultValue="UTC+0"
              >
                <option value="UTC-12">UTC-12:00</option>
                <option value="UTC-8">UTC-08:00</option>
                <option value="UTC-5">UTC-05:00</option>
                <option value="UTC+0">UTC+00:00</option>
                <option value="UTC+1">UTC+01:00</option>
                <option value="UTC+5.5">UTC+05:30</option>
                <option value="UTC+8">UTC+08:00</option>
                <option value="UTC+12">UTC+12:00</option>
              </select>
            </div>
          </div>
          
          <div className="mt-6">
            <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors">
              Save Changes
            </button>
          </div>
        </div>
        
        {/* Notification Settings */}
        <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6 mb-6">
          <h2 className="text-lg font-medium text-white mb-4">Notification Settings</h2>
          
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
          </div>
        </div>
        
        {/* API Keys */}
        <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-white">API Keys</h2>
            <button className="bg-[#252526] text-white px-3 py-1.5 rounded-md text-sm border border-[#3A3A3B] hover:border-[#4F46E5] transition-colors flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
              </svg>
              New Key
            </button>
          </div>
          
          <div className="bg-[#252526] border border-[#3A3A3B] rounded-md p-4 mb-3">
            <div className="flex items-center justify-between mb-2">
              <p className="text-sm font-medium text-white">Production Key</p>
              <div className="flex items-center space-x-2">
                <button className="p-1.5 text-[#9CA3AF] hover:text-white rounded-md hover:bg-[#3A3A3B] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </button>
                <button className="p-1.5 text-[#9CA3AF] hover:text-red-400 rounded-md hover:bg-[#3A3A3B] transition-colors">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              </div>
            </div>
            <div className="bg-[#1D1D1D] border border-[#3A3A3B] rounded p-2 font-mono text-xs text-[#9CA3AF]">
              sk_live_******************************aacc
            </div>
            <p className="text-xs text-[#9CA3AF] mt-2">Created on: June 18, 2025</p>
          </div>
        </div>
        
        {/* Danger Zone */}
        <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6">
          <h2 className="text-lg font-medium text-white mb-4">Danger Zone</h2>
          
          <div className="border border-red-500/20 rounded-md p-4 bg-red-500/5">
            <h3 className="text-sm font-medium text-red-400 mb-2">Delete Account</h3>
            <p className="text-xs text-[#9CA3AF] mb-4">Once you delete your account, there is no going back. Please be certain.</p>
            <button className="bg-red-500/10 text-red-400 border border-red-500/20 px-4 py-2 rounded-md text-sm font-medium hover:bg-red-500/20 transition-colors">
              Delete Account
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
