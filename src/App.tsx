import React, { useState, useEffect } from 'react';
import { 
  MapPin, 
  DollarSign, 
  Package, 
  FileText, 
  Camera, 
  Users, 
  Settings,
  Home,
  Plus,
  Calendar,
  Clock,
  CheckCircle,
  LogOut,
  User
} from 'lucide-react';
import { useAuth } from './state/auth';
import Dashboard from './components/Dashboard';
import TripPlanner from './components/TripPlanner';
import BudgetTracker from './components/BudgetTracker';
import PackingList from './components/PackingList';
import DocumentManager from './components/DocumentManager';
import MemoryArchive from './components/MemoryArchive';
import GroupCollaboration from './components/GroupCollaboration';
import AppSettings from './components/AppSettings';

type Tab = 'dashboard' | 'planner' | 'budget' | 'packing' | 'documents' | 'memories' | 'group' | 'settings';

interface Trip {
  id: string;
  destination: string;
  startDate: string;
  endDate: string;
  status: 'planning' | 'active' | 'completed';
  budget: number;
  spent: number;
  participants: string[];
}

function App() {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [trips, setTrips] = useState<Trip[]>([]);
  const [showUserMenu, setShowUserMenu] = useState(false);

  // Load user's trips from localStorage on component mount
  useEffect(() => {
    if (user) {
      const storedTrips = localStorage.getItem(`travelPro_trips_${user.id}`);
      if (storedTrips) {
        try {
          setTrips(JSON.parse(storedTrips));
        } catch {
          // If parsing fails, start with sample data
          const sampleTrips = [
            {
              id: '1',
              destination: 'Barcelona, Spain',
              startDate: '2024-06-15',
              endDate: '2024-06-22',
              status: 'planning' as const,
              budget: 2500,
              spent: 800,
              participants: ['You', 'Sarah', 'Mike']
            },
            {
              id: '2',
              destination: 'Tokyo, Japan',
              startDate: '2024-08-10',
              endDate: '2024-08-20',
              status: 'planning' as const,
              budget: 4000,
              spent: 1200,
              participants: ['You', 'Alex']
            }
          ];
          setTrips(sampleTrips);
          localStorage.setItem(`travelPro_trips_${user.id}`, JSON.stringify(sampleTrips));
        }
      } else {
        // First time user - set up sample data
        const sampleTrips = [
          {
            id: '1',
            destination: 'Barcelona, Spain',
            startDate: '2024-06-15',
            endDate: '2024-06-22',
            status: 'planning' as const,
            budget: 2500,
            spent: 800,
            participants: ['You', 'Sarah', 'Mike']
          }
        ];
        setTrips(sampleTrips);
        localStorage.setItem(`travelPro_trips_${user.id}`, JSON.stringify(sampleTrips));
      }
    }
  }, [user]);

  // Save trips to localStorage whenever trips change
  useEffect(() => {
    if (user && trips.length > 0) {
      localStorage.setItem(`travelPro_trips_${user.id}`, JSON.stringify(trips));
    }
  }, [trips, user]);

  const tabs = [
    { id: 'dashboard' as Tab, label: 'Dashboard', icon: Home },
    { id: 'planner' as Tab, label: 'Trip Planner', icon: MapPin },
    { id: 'budget' as Tab, label: 'Budget', icon: DollarSign },
    { id: 'packing' as Tab, label: 'Packing', icon: Package },
    { id: 'documents' as Tab, label: 'Documents', icon: FileText },
    { id: 'memories' as Tab, label: 'Memories', icon: Camera },
    { id: 'group' as Tab, label: 'Group', icon: Users },
    { id: 'settings' as Tab, label: 'Settings', icon: Settings },
  ];

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard trips={trips} setActiveTab={setActiveTab} />;
      case 'planner':
        return <TripPlanner trips={trips} setTrips={setTrips} />;
      case 'budget':
        return <BudgetTracker trips={trips} setTrips={setTrips} />;
      case 'packing':
        return <PackingList trips={trips} />;
      case 'documents':
        return <DocumentManager />;
      case 'memories':
        return <MemoryArchive trips={trips} />;
      case 'group':
        return <GroupCollaboration trips={trips} />;
      case 'settings':
        return <AppSettings />;
      default:
        return <Dashboard trips={trips} setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">TravelPro</h1>
                <p className="text-sm text-gray-500">Your Holiday Companion</p>
              </div>
            </div>
            <div className="flex items-center space-x-4 relative">
              {/* Welcome Message */}
              <div className="hidden md:block text-right">
                <p className="text-sm text-gray-600">Welcome back,</p>
                <p className="text-sm font-medium text-gray-900">
                  {user?.firstName || user?.email?.split('@')[0] || 'Traveler'}
                </p>
              </div>
              
              {/* User Menu */}
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <User className="w-4 h-4 text-white" />
                  </div>
                </button>
                
                {showUserMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-medium text-gray-900">
                        {user?.firstName ? `${user.firstName} ${user.lastName || ''}`.trim() : user?.email}
                      </p>
                      <p className="text-xs text-gray-500">{user?.email}</p>
                    </div>
                    <button
                      onClick={() => {
                        setActiveTab('settings');
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center space-x-2"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Account Settings</span>
                    </button>
                    <button
                      onClick={() => {
                        logout();
                        setShowUserMenu(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 flex items-center space-x-2"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
              
              <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
                <Clock className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>New Trip</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Click outside to close user menu */}
      {showUserMenu && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowUserMenu(false)}
        />
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-4 py-3 text-left transition-colors ${
                      activeTab === tab.id
                        ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className={`w-5 h-5 ${activeTab === tab.id ? 'text-blue-600' : 'text-gray-400'}`} />
                    <span className="font-medium">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-100 min-h-[600px]">
              {renderActiveTab()}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;