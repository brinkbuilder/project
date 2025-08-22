import React, { useState } from 'react';
import { 
  MapPin, 
  Calendar, 
  Users, 
  Plus, 
  Edit3, 
  Trash2,
  Clock,
  Star,
  Navigation,
  Coffee,
  Camera,
  Utensils
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

interface Activity {
  id: string;
  title: string;
  time: string;
  duration: string;
  type: 'food' | 'sightseeing' | 'activity' | 'transport';
  location: string;
  notes?: string;
  cost?: number;
}

interface DayItinerary {
  date: string;
  activities: Activity[];
}

interface TripPlannerProps {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

const TripPlanner: React.FC<TripPlannerProps> = ({ trips, setTrips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [showNewTripModal, setShowNewTripModal] = useState(false);
  const [newTrip, setNewTrip] = useState({
    destination: '',
    startDate: '',
    endDate: '',
    budget: '',
    participants: ['']
  });

  // Sample itinerary data
  const sampleItinerary: DayItinerary[] = [
    {
      date: '2024-06-15',
      activities: [
        {
          id: '1',
          title: 'Arrival & Check-in',
          time: '14:00',
          duration: '2 hours',
          type: 'transport',
          location: 'Hotel Arts Barcelona',
          notes: 'Flight lands at 12:30, taxi to hotel',
          cost: 45
        },
        {
          id: '2',
          title: 'La Sagrada Familia',
          time: '16:30',
          duration: '3 hours',
          type: 'sightseeing',
          location: 'Carrer de Mallorca, 401',
          notes: 'Pre-booked tickets, audio guide included',
          cost: 85
        },
        {
          id: '3',
          title: 'Dinner at Cal Pep',
          time: '20:00',
          duration: '2 hours',
          type: 'food',
          location: 'Plaça de les Olles, 8',
          notes: 'Famous tapas bar, no reservations',
          cost: 120
        }
      ]
    },
    {
      date: '2024-06-16',
      activities: [
        {
          id: '4',
          title: 'Park Güell Visit',
          time: '09:00',
          duration: '3 hours',
          type: 'sightseeing',
          location: 'Carrer d\'Olot, s/n',
          notes: 'Early morning for better photos',
          cost: 30
        },
        {
          id: '5',
          title: 'Gothic Quarter Walk',
          time: '14:00',
          duration: '4 hours',
          type: 'activity',
          location: 'Barri Gòtic',
          notes: 'Free walking tour',
          cost: 15
        }
      ]
    }
  ];

  const getActivityIcon = (type: Activity['type']) => {
    switch (type) {
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'sightseeing': return <Camera className="w-4 h-4" />;
      case 'activity': return <Star className="w-4 h-4" />;
      case 'transport': return <Navigation className="w-4 h-4" />;
      default: return <Clock className="w-4 h-4" />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'food': return 'bg-orange-100 text-orange-600 border-orange-200';
      case 'sightseeing': return 'bg-purple-100 text-purple-600 border-purple-200';
      case 'activity': return 'bg-green-100 text-green-600 border-green-200';
      case 'transport': return 'bg-blue-100 text-blue-600 border-blue-200';
      default: return 'bg-gray-100 text-gray-600 border-gray-200';
    }
  };

  const handleCreateTrip = () => {
    if (newTrip.destination && newTrip.startDate && newTrip.endDate) {
      const trip: Trip = {
        id: Date.now().toString(),
        destination: newTrip.destination,
        startDate: newTrip.startDate,
        endDate: newTrip.endDate,
        status: 'planning',
        budget: parseInt(newTrip.budget) || 0,
        spent: 0,
        participants: newTrip.participants.filter(p => p.trim() !== '')
      };
      
      setTrips(prev => [...prev, trip]);
      setSelectedTrip(trip);
      setShowNewTripModal(false);
      setNewTrip({ destination: '', startDate: '', endDate: '', budget: '', participants: [''] });
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Trip Planner</h2>
          <p className="text-gray-600">Plan your perfect itinerary</p>
        </div>
        <button 
          onClick={() => setShowNewTripModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>New Trip</span>
        </button>
      </div>

      {/* Trip Selection */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {trips.map((trip) => (
            <button
              key={trip.id}
              onClick={() => setSelectedTrip(trip)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                selectedTrip?.id === trip.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {trip.destination}
            </button>
          ))}
        </div>
      </div>

      {selectedTrip ? (
        <div className="space-y-6">
          {/* Trip Header */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h3 className="text-2xl font-bold mb-2">{selectedTrip.destination}</h3>
                <div className="flex items-center space-x-4 text-blue-100">
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span>{new Date(selectedTrip.startDate).toLocaleDateString()} - {new Date(selectedTrip.endDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Users className="w-4 h-4" />
                    <span>{selectedTrip.participants.length} travelers</span>
                  </div>
                </div>
              </div>
              <button className="bg-white/20 hover:bg-white/30 text-white px-3 py-1 rounded-lg transition-colors">
                <Edit3 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Daily Itineraries */}
          <div className="space-y-4">
            {sampleItinerary.map((day, dayIndex) => (
              <div key={day.date} className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-center">
                    <h4 className="text-lg font-semibold text-gray-900">
                      Day {dayIndex + 1} - {new Date(day.date).toLocaleDateString('en-US', { 
                        weekday: 'long',
                        month: 'long', 
                        day: 'numeric' 
                      })}
                    </h4>
                    <button className="text-blue-600 hover:text-blue-700 flex items-center space-x-1">
                      <Plus className="w-4 h-4" />
                      <span>Add Activity</span>
                    </button>
                  </div>
                </div>

                <div className="p-6">
                  <div className="space-y-4">
                    {day.activities.map((activity, activityIndex) => (
                      <div key={activity.id} className="flex items-start space-x-4">
                        <div className="flex-shrink-0 w-16 text-center">
                          <div className="text-sm font-medium text-gray-900">{activity.time}</div>
                          <div className="text-xs text-gray-500">{activity.duration}</div>
                        </div>
                        
                        <div className="flex-1">
                          <div className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium border ${getActivityColor(activity.type)} mb-2`}>
                            {getActivityIcon(activity.type)}
                            <span className="capitalize">{activity.type}</span>
                          </div>
                          
                          <h5 className="font-semibold text-gray-900 mb-1">{activity.title}</h5>
                          <p className="text-sm text-gray-600 mb-2 flex items-center">
                            <MapPin className="w-3 h-3 mr-1" />
                            {activity.location}
                          </p>
                          
                          {activity.notes && (
                            <p className="text-sm text-gray-500 mb-2">{activity.notes}</p>
                          )}
                          
                          {activity.cost && (
                            <div className="text-sm font-medium text-green-600">
                              €{activity.cost}
                            </div>
                          )}
                        </div>

                        <div className="flex-shrink-0 flex items-center space-x-2">
                          <button className="text-gray-400 hover:text-blue-600 transition-colors">
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button className="text-gray-400 hover:text-red-600 transition-colors">
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Add Day Button */}
          <button className="w-full bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors flex items-center justify-center space-x-2 text-gray-600 hover:text-gray-800">
            <Plus className="w-5 h-5" />
            <span>Add Another Day</span>
          </button>
        </div>
      ) : (
        <div className="text-center py-12">
          <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips planned yet</h3>
          <p className="text-gray-600 mb-6">Create your first trip to start planning your itinerary</p>
          <button 
            onClick={() => setShowNewTripModal(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Plan Your First Trip
          </button>
        </div>
      )}

      {/* New Trip Modal */}
      {showNewTripModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Plan New Trip</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Destination</label>
                <input
                  type="text"
                  value={newTrip.destination}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, destination: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Where are you going?"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                  <input
                    type="date"
                    value={newTrip.startDate}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, startDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                  <input
                    type="date"
                    value={newTrip.endDate}
                    onChange={(e) => setNewTrip(prev => ({ ...prev, endDate: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Budget ($)</label>
                <input
                  type="number"
                  value={newTrip.budget}
                  onChange={(e) => setNewTrip(prev => ({ ...prev, budget: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Total budget"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowNewTripModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateTrip}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Create Trip
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TripPlanner;