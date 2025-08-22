import React from 'react';
import { 
  MapPin, 
  Calendar, 
  DollarSign, 
  Users, 
  TrendingUp, 
  Clock,
  CheckCircle,
  AlertTriangle,
  Plane
} from 'lucide-react';

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

interface DashboardProps {
  trips: Trip[];
  setActiveTab: (tab: string) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ trips, setActiveTab }) => {
  const activeTrip = trips.find(trip => trip.status === 'active');
  const upcomingTrips = trips.filter(trip => trip.status === 'planning');
  const completedTrips = trips.filter(trip => trip.status === 'completed');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric',
      year: 'numeric'
    });
  };

  const getDaysUntil = (dateString: string) => {
    const today = new Date();
    const tripDate = new Date(dateString);
    const diffTime = tripDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  return (
    <div className="p-6">
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome back!</h2>
        <p className="text-gray-600">Here's what's happening with your travels</p>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Plane className="w-8 h-8" />
            <span className="text-blue-100 text-sm font-medium">Active Trips</span>
          </div>
          <div className="text-3xl font-bold mb-1">{trips.filter(t => t.status === 'active').length}</div>
          <div className="text-blue-100 text-sm">Currently traveling</div>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <Calendar className="w-8 h-8" />
            <span className="text-green-100 text-sm font-medium">Upcoming</span>
          </div>
          <div className="text-3xl font-bold mb-1">{upcomingTrips.length}</div>
          <div className="text-green-100 text-sm">Trips planned</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-orange-100 text-sm font-medium">Total Budget</span>
          </div>
          <div className="text-3xl font-bold mb-1">${trips.reduce((sum, trip) => sum + trip.budget, 0).toLocaleString()}</div>
          <div className="text-orange-100 text-sm">Across all trips</div>
        </div>

        <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" />
            <span className="text-purple-100 text-sm font-medium">Completed</span>
          </div>
          <div className="text-3xl font-bold mb-1">{completedTrips.length}</div>
          <div className="text-purple-100 text-sm">Adventures done</div>
        </div>
      </div>

      {/* Current/Upcoming Trips */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        {/* Active Trip */}
        {activeTrip && (
          <div className="bg-gradient-to-r from-cyan-50 to-blue-50 rounded-xl p-6 border-2 border-cyan-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Current Trip</h3>
              <span className="bg-cyan-500 text-white px-3 py-1 rounded-full text-sm font-medium">Active</span>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{activeTrip.destination}</h4>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(activeTrip.startDate)} - {formatDate(activeTrip.endDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{activeTrip.participants.join(', ')}</span>
              </div>
            </div>
            <div className="bg-white rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-gray-600">Budget Progress</span>
                <span className="text-sm text-gray-600">${activeTrip.spent} / ${activeTrip.budget}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-cyan-500 h-2 rounded-full transition-all duration-500"
                  style={{ width: `${Math.min((activeTrip.spent / activeTrip.budget) * 100, 100)}%` }}
                ></div>
              </div>
            </div>
          </div>
        )}

        {/* Next Upcoming Trip */}
        {upcomingTrips.length > 0 && (
          <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Next Adventure</h3>
              <span className="bg-orange-100 text-orange-600 px-3 py-1 rounded-full text-sm font-medium">
                {getDaysUntil(upcomingTrips[0].startDate)} days
              </span>
            </div>
            <div className="mb-4">
              <h4 className="text-xl font-bold text-gray-900 mb-2">{upcomingTrips[0].destination}</h4>
              <div className="flex items-center text-gray-600 mb-2">
                <Calendar className="w-4 h-4 mr-2" />
                <span>{formatDate(upcomingTrips[0].startDate)} - {formatDate(upcomingTrips[0].endDate)}</span>
              </div>
              <div className="flex items-center text-gray-600">
                <Users className="w-4 h-4 mr-2" />
                <span>{upcomingTrips[0].participants.join(', ')}</span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => setActiveTab('planner')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                View Itinerary
              </button>
              <button 
                onClick={() => setActiveTab('packing')}
                className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
              >
                Packing List
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            onClick={() => setActiveTab('budget')}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-colors group"
          >
            <DollarSign className="w-8 h-8 text-gray-400 group-hover:text-blue-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">Track Expenses</span>
          </button>

          <button 
            onClick={() => setActiveTab('documents')}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-green-300 hover:bg-green-50 transition-colors group"
          >
            <CheckCircle className="w-8 h-8 text-gray-400 group-hover:text-green-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-green-700">Check Documents</span>
          </button>

          <button 
            onClick={() => setActiveTab('memories')}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-purple-300 hover:bg-purple-50 transition-colors group"
          >
            <TrendingUp className="w-8 h-8 text-gray-400 group-hover:text-purple-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-purple-700">Add Memory</span>
          </button>

          <button 
            onClick={() => setActiveTab('group')}
            className="flex flex-col items-center p-4 rounded-lg border border-gray-200 hover:border-cyan-300 hover:bg-cyan-50 transition-colors group"
          >
            <Users className="w-8 h-8 text-gray-400 group-hover:text-cyan-500 mb-2" />
            <span className="text-sm font-medium text-gray-700 group-hover:text-cyan-700">Group Chat</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;