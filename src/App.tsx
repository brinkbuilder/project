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
  CheckCircle
} from 'lucide-react';
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
  const [activeTab, setActiveTab] = useState<Tab>('dashboard');
  const [trips, setTrips] = useState<Trip[]>([
    {
      id: '1',
      destination: 'Barcelona, Spain',
      startDate: '2024-06-15',
      endDate: '2024-06-22',
      status: 'planning',
      budget: 2500,
      spent: 800,
      participants: ['You', 'Sarah', 'Mike']
    },
    {
      id: '2',
      destination: 'Tokyo, Japan',
      startDate: '2024-08-10',
      endDate: '2024-08-20',
      status: 'planning',
      budget: 4000,
      spent: 1200,
      participants: ['You', 'Alex']
    }
  ]);

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
            <div className="flex items-center space-x-4">
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