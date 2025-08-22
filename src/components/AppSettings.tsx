import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Bell, 
  Shield, 
  Globe, 
  Palette,
  Download,
  Trash2,
  Edit3,
  Save,
  Camera,
  Moon,
  Sun,
  Smartphone,
  Mail,
  Lock
} from 'lucide-react';

const AppSettings: React.FC = () => {
  const [activeSection, setActiveSection] = useState<'profile' | 'notifications' | 'privacy' | 'preferences' | 'data'>('profile');
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState({
    tripReminders: true,
    budgetAlerts: true,
    groupMessages: true,
    documentExpiry: true,
    emailNotifications: false,
    pushNotifications: true
  });
  
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150',
    currency: 'USD',
    language: 'English',
    timezone: 'America/New_York'
  });

  const sections = [
    { id: 'profile' as const, label: 'Profile', icon: User },
    { id: 'notifications' as const, label: 'Notifications', icon: Bell },
    { id: 'privacy' as const, label: 'Privacy & Security', icon: Shield },
    { id: 'preferences' as const, label: 'Preferences', icon: Palette },
    { id: 'data' as const, label: 'Data Management', icon: Download },
  ];

  const currencies = ['USD', 'EUR', 'GBP', 'JPY', 'CAD', 'AUD'];
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian', 'Portuguese'];
  const timezones = [
    'America/New_York',
    'America/Los_Angeles', 
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  const handleNotificationChange = (key: keyof typeof notifications) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const renderProfileSection = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-6">
        <div className="relative">
          <img
            src={profile.avatar}
            alt="Profile"
            className="w-20 h-20 rounded-full object-cover"
          />
          <button className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors">
            <Camera className="w-4 h-4" />
          </button>
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900">{profile.name}</h3>
          <p className="text-gray-600">{profile.email}</p>
          <button className="mt-2 text-blue-600 hover:text-blue-700 transition-colors flex items-center space-x-1">
            <Edit3 className="w-4 h-4" />
            <span>Edit Profile</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile(prev => ({ ...prev, name: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
          <input
            type="email"
            value={profile.email}
            onChange={(e) => setProfile(prev => ({ ...prev, email: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number</label>
          <input
            type="tel"
            value={profile.phone}
            onChange={(e) => setProfile(prev => ({ ...prev, phone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Default Currency</label>
          <select
            value={profile.currency}
            onChange={(e) => setProfile(prev => ({ ...prev, currency: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {currencies.map(currency => (
              <option key={currency} value={currency}>{currency}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Language</label>
          <select
            value={profile.language}
            onChange={(e) => setProfile(prev => ({ ...prev, language: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {languages.map(language => (
              <option key={language} value={language}>{language}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Timezone</label>
          <select
            value={profile.timezone}
            onChange={(e) => setProfile(prev => ({ ...prev, timezone: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {timezones.map(timezone => (
              <option key={timezone} value={timezone}>{timezone}</option>
            ))}
          </select>
        </div>
      </div>

      <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors flex items-center space-x-2">
        <Save className="w-4 h-4" />
        <span>Save Changes</span>
      </button>
    </div>
  );

  const renderNotificationSection = () => (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Bell className="w-5 h-5 text-blue-600" />
          <h3 className="font-semibold text-blue-900">Stay Updated</h3>
        </div>
        <p className="text-blue-800 text-sm">
          Choose which notifications you want to receive to stay on top of your travels.
        </p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Trip Reminders</div>
              <div className="text-sm text-gray-600">Get notified about upcoming trips and deadlines</div>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange('tripReminders')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.tripReminders ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.tripReminders ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Budget Alerts</div>
              <div className="text-sm text-gray-600">Receive alerts when approaching budget limits</div>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange('budgetAlerts')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.budgetAlerts ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.budgetAlerts ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Group Messages</div>
              <div className="text-sm text-gray-600">Get notified of new messages in group chats</div>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange('groupMessages')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.groupMessages ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.groupMessages ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Bell className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Document Expiry</div>
              <div className="text-sm text-gray-600">Reminders for passport, visa, and insurance expiration</div>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange('documentExpiry')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.documentExpiry ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.documentExpiry ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Mail className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Email Notifications</div>
              <div className="text-sm text-gray-600">Receive notifications via email</div>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange('emailNotifications')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.emailNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.emailNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>

        <div className="flex items-center justify-between p-4 bg-white border border-gray-200 rounded-lg">
          <div className="flex items-center space-x-3">
            <Smartphone className="w-5 h-5 text-gray-600" />
            <div>
              <div className="font-medium text-gray-900">Push Notifications</div>
              <div className="text-sm text-gray-600">Receive push notifications on your device</div>
            </div>
          </div>
          <button
            onClick={() => handleNotificationChange('pushNotifications')}
            className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
              notifications.pushNotifications ? 'bg-blue-600' : 'bg-gray-200'
            }`}
          >
            <span
              className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                notifications.pushNotifications ? 'translate-x-6' : 'translate-x-1'
              }`}
            />
          </button>
        </div>
      </div>
    </div>
  );

  const renderPrivacySection = () => (
    <div className="space-y-6">
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Shield className="w-5 h-5 text-red-600" />
          <h3 className="font-semibold text-red-900">Privacy & Security</h3>
        </div>
        <p className="text-red-800 text-sm">
          Manage your privacy settings and account security options.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Account Security</h4>
          <div className="space-y-4">
            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Lock className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Change Password</div>
                  <div className="text-sm text-gray-600">Update your account password</div>
                </div>
              </div>
              <Edit3 className="w-4 h-4 text-gray-400" />
            </button>

            <button className="w-full flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
              <div className="flex items-center space-x-3">
                <Shield className="w-5 h-5 text-gray-600" />
                <div className="text-left">
                  <div className="font-medium text-gray-900">Two-Factor Authentication</div>
                  <div className="text-sm text-gray-600">Add an extra layer of security</div>
                </div>
              </div>
              <div className="text-sm text-green-600 font-medium">Enabled</div>
            </button>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Data Privacy</h4>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Profile Visibility</div>
                <div className="text-sm text-gray-600">Control who can see your travel profile</div>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option>Friends Only</option>
                <option>Public</option>
                <option>Private</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Location Sharing</div>
                <div className="text-sm text-gray-600">Share your location with trip companions</div>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Analytics & Usage Data</div>
                <div className="text-sm text-gray-600">Help us improve by sharing usage statistics</div>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-gray-200"
              >
                <span className="inline-block h-4 w-4 transform translate-x-1 rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPreferencesSection = () => (
    <div className="space-y-6">
      <div className="bg-purple-50 border border-purple-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Palette className="w-5 h-5 text-purple-600" />
          <h3 className="font-semibold text-purple-900">App Preferences</h3>
        </div>
        <p className="text-purple-800 text-sm">
          Customize your app experience to match your preferences.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Appearance</h4>
          
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              {darkMode ? <Moon className="w-5 h-5 text-gray-600" /> : <Sun className="w-5 h-5 text-gray-600" />}
              <div>
                <div className="font-medium text-gray-900">Dark Mode</div>
                <div className="text-sm text-gray-600">Toggle between light and dark themes</div>
              </div>
            </div>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                darkMode ? 'bg-blue-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                  darkMode ? 'translate-x-6' : 'translate-x-1'
                }`}
              />
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Accent Color</label>
            <div className="flex space-x-3">
              {['blue', 'green', 'purple', 'orange', 'red'].map(color => (
                <button
                  key={color}
                  className={`w-8 h-8 rounded-full bg-${color}-500 border-2 ${
                    color === 'blue' ? 'border-gray-800' : 'border-transparent'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Default Settings</h4>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Default Trip Duration</div>
                <div className="text-sm text-gray-600">Auto-fill duration for new trips</div>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <option>7 days</option>
                <option>14 days</option>
                <option>21 days</option>
                <option>Custom</option>
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Budget Currency</div>
                <div className="text-sm text-gray-600">Default currency for new trip budgets</div>
              </div>
              <select className="px-3 py-1 border border-gray-300 rounded-lg text-sm">
                {currencies.map(currency => (
                  <option key={currency} value={currency}>{currency}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium text-gray-900">Auto-save Drafts</div>
                <div className="text-sm text-gray-600">Automatically save unsaved changes</div>
              </div>
              <button
                className="relative inline-flex h-6 w-11 items-center rounded-full bg-blue-600"
              >
                <span className="inline-block h-4 w-4 transform translate-x-6 rounded-full bg-white transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderDataSection = () => (
    <div className="space-y-6">
      <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
        <div className="flex items-center space-x-3 mb-2">
          <Download className="w-5 h-5 text-orange-600" />
          <h3 className="font-semibold text-orange-900">Data Management</h3>
        </div>
        <p className="text-orange-800 text-sm">
          Export, backup, or delete your travel data.
        </p>
      </div>

      <div className="space-y-4">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Export Data</h4>
          <p className="text-gray-600 text-sm mb-4">
            Download a copy of all your travel data including trips, expenses, documents, and memories.
          </p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
            <Download className="w-4 h-4" />
            <span>Export All Data</span>
          </button>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h4 className="font-semibold text-gray-900 mb-4">Storage Usage</h4>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Photos & Documents</span>
              <span className="font-medium">2.3 GB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Trip Data</span>
              <span className="font-medium">45 MB</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Offline Maps</span>
              <span className="font-medium">1.8 GB</span>
            </div>
            <div className="border-t border-gray-200 pt-3 flex justify-between items-center">
              <span className="font-medium text-gray-900">Total Used</span>
              <span className="font-bold">4.1 GB</span>
            </div>
          </div>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-6">
          <h4 className="font-semibold text-red-900 mb-2">Danger Zone</h4>
          <p className="text-red-700 text-sm mb-4">
            These actions are permanent and cannot be undone.
          </p>
          <div className="space-y-3">
            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
              <Trash2 className="w-4 h-4" />
              <span>Delete All Data</span>
            </button>
            <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg transition-colors">
              Close Account
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderActiveSection = () => {
    switch (activeSection) {
      case 'profile':
        return renderProfileSection();
      case 'notifications':
        return renderNotificationSection();
      case 'privacy':
        return renderPrivacySection();
      case 'preferences':
        return renderPreferencesSection();
      case 'data':
        return renderDataSection();
      default:
        return renderProfileSection();
    }
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Settings</h2>
        <p className="text-gray-600">Manage your account and app preferences</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Settings Navigation */}
        <div className="lg:col-span-1">
          <nav className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            {sections.map((section) => {
              const Icon = section.icon;
              return (
                <button
                  key={section.id}
                  onClick={() => setActiveSection(section.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-4 text-left transition-colors ${
                    activeSection === section.id
                      ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                      : 'text-gray-700 hover:bg-gray-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${activeSection === section.id ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-medium">{section.label}</span>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Settings Content */}
        <div className="lg:col-span-3">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
            {renderActiveSection()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppSettings;