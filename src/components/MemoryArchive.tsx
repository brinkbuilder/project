import React, { useState } from 'react';
import { 
  Camera, 
  Plus, 
  Heart, 
  MessageCircle, 
  Share2, 
  MapPin, 
  Calendar,
  Star,
  Upload,
  Filter,
  Search,
  Edit3
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

interface Memory {
  id: string;
  tripId: string;
  title: string;
  description: string;
  date: string;
  location: string;
  rating: number;
  photos: string[];
  tags: string[];
  type: 'photo' | 'note' | 'review';
}

interface MemoryArchiveProps {
  trips: Trip[];
}

const MemoryArchive: React.FC<MemoryArchiveProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [showAddMemory, setShowAddMemory] = useState(false);
  const [filter, setFilter] = useState<'all' | 'photos' | 'notes' | 'reviews'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Sample memories data
  const memories: Memory[] = [
    {
      id: '1',
      tripId: '1',
      title: 'First glimpse of Sagrada Familia',
      description: 'The moment we saw Gaudí\'s masterpiece for the first time was absolutely breathtaking. The intricate details and towering spires against the Barcelona sky - pure magic!',
      date: '2024-06-15',
      location: 'Sagrada Familia, Barcelona',
      rating: 5,
      photos: [
        'https://images.pexels.com/photos/2356059/pexels-photo-2356059.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      tags: ['architecture', 'landmark', 'amazing'],
      type: 'photo'
    },
    {
      id: '2',
      tripId: '1',
      title: 'Cal Pep Tapas Experience',
      description: 'Best tapas we\'ve ever had! The jamón ibérico melted in our mouths and the atmosphere was incredible. The owner recommended the perfect wine pairing.',
      date: '2024-06-15',
      location: 'Cal Pep, Barcelona',
      rating: 5,
      photos: [
        'https://images.pexels.com/photos/1126728/pexels-photo-1126728.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      tags: ['food', 'tapas', 'authentic'],
      type: 'review'
    },
    {
      id: '3',
      tripId: '1',
      title: 'Park Güell Sunrise',
      description: 'Woke up early to catch the sunrise at Park Güell. Having the place almost to ourselves was worth the early alarm. The mosaic work is even more beautiful in the golden hour light.',
      date: '2024-06-16',
      location: 'Park Güell, Barcelona',
      rating: 5,
      photos: [
        'https://images.pexels.com/photos/819764/pexels-photo-819764.jpeg?auto=compress&cs=tinysrgb&w=800',
        'https://images.pexels.com/photos/1388030/pexels-photo-1388030.jpeg?auto=compress&cs=tinysrgb&w=800'
      ],
      tags: ['sunrise', 'park', 'photography'],
      type: 'photo'
    },
    {
      id: '4',
      tripId: '1',
      title: 'Travel Tip: Metro System',
      description: 'The Barcelona metro is super efficient! Get a T-10 card for multiple rides. Line 2 (purple) connects most tourist spots. Avoid rush hours 8-9 AM and 6-7 PM.',
      date: '2024-06-16',
      location: 'Barcelona Metro',
      rating: 4,
      photos: [],
      tags: ['tip', 'transport', 'metro'],
      type: 'note'
    }
  ];

  const filteredMemories = memories.filter(memory => {
    const matchesTrip = !selectedTrip || memory.tripId === selectedTrip.id;
    const matchesFilter = filter === 'all' || memory.type === filter || (filter === 'photos' && memory.type === 'photo');
    const matchesSearch = !searchTerm || 
      memory.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
      memory.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    return matchesTrip && matchesFilter && matchesSearch;
  });

  const getMemoryIcon = (type: Memory['type']) => {
    switch (type) {
      case 'photo': return <Camera className="w-4 h-4" />;
      case 'review': return <Star className="w-4 h-4" />;
      case 'note': return <MessageCircle className="w-4 h-4" />;
    }
  };

  const getMemoryColor = (type: Memory['type']) => {
    switch (type) {
      case 'photo': return 'bg-blue-100 text-blue-600';
      case 'review': return 'bg-yellow-100 text-yellow-600';
      case 'note': return 'bg-green-100 text-green-600';
    }
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star 
            key={star}
            className={`w-4 h-4 ${star <= rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Memory Archive</h2>
          <p className="text-gray-600">Preserve your travel memories forever</p>
        </div>
        <button 
          onClick={() => setShowAddMemory(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Memory</span>
        </button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1 relative">
          <Search className="w-5 h-5 text-gray-400 absolute left-3 top-1/2 transform -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search memories, locations, tags..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="flex space-x-2">
          {[
            { key: 'all', label: 'All', icon: Filter },
            { key: 'photos', label: 'Photos', icon: Camera },
            { key: 'reviews', label: 'Reviews', icon: Star },
            { key: 'notes', label: 'Notes', icon: MessageCircle }
          ].map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setFilter(key as any)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-colors ${
                filter === key
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              <Icon className="w-4 h-4" />
              <span>{label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Trip Selection */}
      {trips.length > 0 && (
        <div className="mb-6">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setSelectedTrip(null)}
              className={`px-4 py-2 rounded-lg border transition-colors ${
                !selectedTrip
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              All Trips
            </button>
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
      )}

      {/* Memories Grid */}
      {filteredMemories.length === 0 ? (
        <div className="text-center py-12">
          <Camera className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No memories yet</h3>
          <p className="text-gray-600 mb-6">Start capturing your travel experiences</p>
          <button 
            onClick={() => setShowAddMemory(true)}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition-colors"
          >
            Add Your First Memory
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMemories.map((memory) => (
            <div key={memory.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden">
              {/* Photos */}
              {memory.photos.length > 0 && (
                <div className="relative">
                  <img 
                    src={memory.photos[0]} 
                    alt={memory.title}
                    className="w-full h-48 object-cover"
                  />
                  {memory.photos.length > 1 && (
                    <div className="absolute top-3 right-3 bg-black bg-opacity-60 text-white px-2 py-1 rounded-full text-sm">
                      +{memory.photos.length - 1}
                    </div>
                  )}
                  <div className={`absolute top-3 left-3 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getMemoryColor(memory.type)}`}>
                    {getMemoryIcon(memory.type)}
                    <span className="capitalize">{memory.type}</span>
                  </div>
                </div>
              )}

              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h3 className="font-bold text-gray-900 mb-2 line-clamp-2">{memory.title}</h3>
                    <div className="flex items-center text-sm text-gray-600 mb-2">
                      <MapPin className="w-4 h-4 mr-1" />
                      <span>{memory.location}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-sm text-gray-500">
                        <Calendar className="w-4 h-4 mr-1" />
                        <span>{new Date(memory.date).toLocaleDateString()}</span>
                      </div>
                      {memory.rating > 0 && renderStarRating(memory.rating)}
                    </div>
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm mb-4 line-clamp-3">{memory.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {memory.tags.slice(0, 3).map((tag) => (
                    <span key={tag} className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                      #{tag}
                    </span>
                  ))}
                  {memory.tags.length > 3 && (
                    <span className="text-gray-500 text-xs">+{memory.tags.length - 3} more</span>
                  )}
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                  <div className="flex space-x-3">
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-red-600 transition-colors">
                      <Heart className="w-4 h-4" />
                      <span className="text-sm">12</span>
                    </button>
                    <button className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors">
                      <MessageCircle className="w-4 h-4" />
                      <span className="text-sm">3</span>
                    </button>
                    <button className="text-gray-600 hover:text-green-600 transition-colors">
                      <Share2 className="w-4 h-4" />
                    </button>
                  </div>
                  <button className="text-gray-600 hover:text-gray-800 transition-colors">
                    <Edit3 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Memory Modal */}
      {showAddMemory && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Memory</h3>
            
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Memory Type</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="photo">Photo</option>
                    <option value="review">Review</option>
                    <option value="note">Note</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Trip</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    {trips.map(trip => (
                      <option key={trip.id} value={trip.id}>{trip.destination}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Give your memory a title..."
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Where was this?"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Describe your experience..."
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Rating</label>
                  <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">No rating</option>
                    <option value="1">⭐</option>
                    <option value="2">⭐⭐</option>
                    <option value="3">⭐⭐⭐</option>
                    <option value="4">⭐⭐⭐⭐</option>
                    <option value="5">⭐⭐⭐⭐⭐</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Photos</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                  <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                  <p className="text-gray-600 mb-2">Drag photos here or click to upload</p>
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                    Choose Photos
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Add tags separated by commas..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddMemory(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Save Memory
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemoryArchive;