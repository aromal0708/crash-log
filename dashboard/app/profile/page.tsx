import DashboardLayout from '../components/DashboardLayout';

export default function Profile() {
  return (
    <DashboardLayout>
      <div className="max-w-4xl mx-auto">
        <h1 className="text-2xl font-semibold text-white mb-6">Profile</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Info */}
          <div className="md:col-span-1">
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6">
              <div className="flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-[#4F46E5] to-[#7C70FF] text-white flex items-center justify-center text-3xl font-medium mb-4">
                  A
                </div>
                <h2 className="text-lg font-medium text-white">Aromal Sunil</h2>
                <p className="text-sm text-[#9CA3AF] mt-1">Admin</p>
                <div className="mt-2 px-3 py-1 bg-[#4F46E5]/10 rounded-full">
                  <span className="text-xs font-medium text-[#7C70FF]">Pro Plan</span>
                </div>
                
                <button className="mt-6 w-full bg-[#252526] border border-[#3A3A3B] hover:border-[#4F46E5] text-white px-4 py-2 rounded-md text-sm transition-colors">
                  Change Avatar
                </button>
              </div>
              
              <div className="mt-6 pt-6 border-t border-[#3A3A3B]">
                <h3 className="text-sm font-medium text-white mb-3">Account Info</h3>
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#9CA3AF]">Member Since</span>
                    <span className="text-xs text-white">June 10, 2025</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-[#9CA3AF]">Last Login</span>
                    <span className="text-xs text-white">Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Edit Profile Form */}
          <div className="md:col-span-2">
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6 mb-6">
              <h2 className="text-lg font-medium text-white mb-4">Personal Information</h2>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    First Name
                  </label>
                  <input 
                    type="text" 
                    id="firstName" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    defaultValue="Aromal"
                  />
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Last Name
                  </label>
                  <input 
                    type="text" 
                    id="lastName" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    defaultValue="Sunil"
                  />
                </div>
                
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
                  <label htmlFor="role" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Role
                  </label>
                  <input 
                    type="text" 
                    id="role" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    defaultValue="Admin"
                    disabled
                  />
                </div>
                
                <div>
                  <label htmlFor="company" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Company
                  </label>
                  <input 
                    type="text" 
                    id="company" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    defaultValue="CrashLog Inc."
                  />
                </div>
                
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Website
                  </label>
                  <input 
                    type="url" 
                    id="website" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    defaultValue="https://crashlog.example.com"
                  />
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors">
                  Save Changes
                </button>
              </div>
            </div>
            
            {/* Password Section */}
            <div className="bg-[#2C2C2D] border border-[#3A3A3B] rounded-lg p-6">
              <h2 className="text-lg font-medium text-white mb-4">Change Password</h2>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Current Password
                  </label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    New Password
                  </label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                
                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#9CA3AF] mb-1">
                    Confirm New Password
                  </label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="w-full py-2 px-3 bg-[#252526] border border-[#3A3A3B] rounded-md text-sm text-white focus:outline-none focus:ring-2 focus:ring-[#4F46E5] focus:border-transparent"
                    placeholder="••••••••"
                  />
                </div>
                
                <div className="text-xs text-[#9CA3AF] bg-[#252526] p-3 rounded-md border border-[#3A3A3B]">
                  <p className="font-medium text-white mb-1">Password requirements:</p>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Minimum of 8 characters</li>
                    <li>At least one uppercase letter</li>
                    <li>At least one number</li>
                    <li>At least one special character</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6">
                <button className="bg-[#4F46E5] text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-[#4338CA] transition-colors">
                  Update Password
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}
