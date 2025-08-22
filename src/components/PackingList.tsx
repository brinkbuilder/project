import React, { useState } from 'react';
import { 
  Package, 
  Plus, 
  Check, 
  Trash2,
  Sun,
  Cloud,
  Snowflake,
  Shirt,
  Camera,
  Briefcase,
  Heart,
  Zap
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

interface PackingItem {
  id: string;
  name: string;
  category: 'clothing' | 'electronics' | 'toiletries' | 'documents' | 'essentials' | 'other';
  packed: boolean;
  quantity: number;
  notes?: string;
}

interface PackingListProps {
  trips: Trip[];
}

const PackingList: React.FC<PackingListProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [showAddItem, setShowAddItem] = useState(false);
  const [newItem, setNewItem] = useState({
    name: '',
    category: 'essentials' as PackingItem['category'],
    quantity: 1,
    notes: ''
  });

  // Sample packing list based on destination
  const [packingItems, setPackingItems] = useState<PackingItem[]>([
    // Essentials
    { id: '1', name: 'Passport', category: 'documents', packed: true, quantity: 1 },
    { id: '2', name: 'Travel Insurance', category: 'documents', packed: true, quantity: 1 },
    { id: '3', name: 'Flight Tickets', category: 'documents', packed: false, quantity: 1 },
    { id: '4', name: 'Hotel Confirmation', category: 'documents', packed: false, quantity: 1 },
    
    // Clothing
    { id: '5', name: 'T-shirts', category: 'clothing', packed: false, quantity: 5 },
    { id: '6', name: 'Jeans', category: 'clothing', packed: false, quantity: 2 },
    { id: '7', name: 'Underwear', category: 'clothing', packed: false, quantity: 7 },
    { id: '8', name: 'Socks', category: 'clothing', packed: false, quantity: 7 },
    { id: '9', name: 'Light Jacket', category: 'clothing', packed: false, quantity: 1 },
    { id: '10', name: 'Comfortable Shoes', category: 'clothing', packed: false, quantity: 1 },
    
    // Electronics
    { id: '11', name: 'Phone Charger', category: 'electronics', packed: false, quantity: 1 },
    { id: '12', name: 'Camera', category: 'electronics', packed: false, quantity: 1 },
    { id: '13', name: 'Power Bank', category: 'electronics', packed: false, quantity: 1 },
    { id: '14', name: 'Headphones', category: 'electronics', packed: false, quantity: 1 },
    
    // Toiletries
    { id: '15', name: 'Toothbrush', category: 'toiletries', packed: false, quantity: 1 },
    { id: '16', name: 'Toothpaste', category: 'toiletries', packed: false, quantity: 1 },
    { id: '17', name: 'Shampoo', category: 'toiletries', packed: false, quantity: 1 },
    { id: '18', name: 'Sunscreen', category: 'toiletries', packed: false, quantity: 1 },
    
    // Essentials
    { id: '19', name: 'Medications', category: 'essentials', packed: false, quantity: 1, notes: 'Prescription drugs' },
    { id: '20', name: 'First Aid Kit', category: 'essentials', packed: false, quantity: 1 },
    { id: '21', name: 'Travel Adapter', category: 'essentials', packed: false, quantity: 1 },
  ]);

  const getCategoryIcon = (category: PackingItem['category']) => {
    switch (category) {
      case 'clothing': return <Shirt className="w-4 h-4" />;
      case 'electronics': return <Zap className="w-4 h-4" />;
      case 'toiletries': return <Heart className="w-4 h-4" />;
      case 'documents': return <Briefcase className="w-4 h-4" />;
      case 'essentials': return <Package className="w-4 h-4" />;
      default: return <Package className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: PackingItem['category']) => {
    switch (category) {
      case 'clothing': return 'bg-blue-100 text-blue-600';
      case 'electronics': return 'bg-yellow-100 text-yellow-600';
      case 'toiletries': return 'bg-pink-100 text-pink-600';
      case 'documents': return 'bg-red-100 text-red-600';
      case 'essentials': return 'bg-green-100 text-green-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const togglePacked = (itemId: string) => {
    setPackingItems(items => 
      items.map(item => 
        item.id === itemId ? { ...item, packed: !item.packed } : item
      )
    );
  };

  const deleteItem = (itemId: string) => {
    setPackingItems(items => items.filter(item => item.id !== itemId));
  };

  const handleAddItem = () => {
    if (newItem.name) {
      const item: PackingItem = {
        id: Date.now().toString(),
        name: newItem.name,
        category: newItem.category,
        quantity: newItem.quantity,
        packed: false,
        notes: newItem.notes || undefined
      };
      
      setPackingItems(items => [...items, item]);
      setShowAddItem(false);
      setNewItem({ name: '', category: 'essentials', quantity: 1, notes: '' });
    }
  };

  const groupedItems = packingItems.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {} as Record<PackingItem['category'], PackingItem[]>);

  const totalItems = packingItems.length;
  const packedItems = packingItems.filter(item => item.packed).length;
  const packingProgress = totalItems > 0 ? (packedItems / totalItems) * 100 : 0;

  if (!selectedTrip) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Package className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips to pack for</h3>
          <p className="text-gray-600">Create a trip first to start your packing list</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Packing List</h2>
          <p className="text-gray-600">Never forget anything important</p>
        </div>
        <button 
          onClick={() => setShowAddItem(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Item</span>
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
                selectedTrip.id === trip.id
                  ? 'bg-blue-600 text-white border-blue-600'
                  : 'bg-white text-gray-700 border-gray-200 hover:border-blue-300 hover:bg-blue-50'
              }`}
            >
              {trip.destination}
            </button>
          ))}
        </div>
      </div>

      {/* Progress Overview */}
      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">Packing Progress</h3>
            <p className="text-green-100">
              {packedItems} of {totalItems} items packed for {selectedTrip.destination}
            </p>
          </div>
          <div className="text-3xl font-bold">
            {Math.round(packingProgress)}%
          </div>
        </div>
        <div className="w-full bg-green-400/30 rounded-full h-3">
          <div 
            className="bg-white h-3 rounded-full transition-all duration-500"
            style={{ width: `${packingProgress}%` }}
          ></div>
        </div>
      </div>

      {/* Weather Insight */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Weather Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center space-x-3 p-4 bg-yellow-50 rounded-lg border border-yellow-200">
            <Sun className="w-6 h-6 text-yellow-500" />
            <div>
              <div className="font-medium text-yellow-800">Sunny Days</div>
              <div className="text-sm text-yellow-600">Pack sunscreen, hat, and light clothing</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
            <Cloud className="w-6 h-6 text-blue-500" />
            <div>
              <div className="font-medium text-blue-800">Some Rain</div>
              <div className="text-sm text-blue-600">Don't forget an umbrella or rain jacket</div>
            </div>
          </div>
          <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <Snowflake className="w-6 h-6 text-gray-500" />
            <div>
              <div className="font-medium text-gray-800">Cool Evenings</div>
              <div className="text-sm text-gray-600">Pack a light jacket for evenings</div>
            </div>
          </div>
        </div>
      </div>

      {/* Packing Categories */}
      <div className="space-y-6">
        {Object.entries(groupedItems).map(([category, items]) => (
          <div key={category} className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(category as PackingItem['category'])}`}>
                    {getCategoryIcon(category as PackingItem['category'])}
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 capitalize">{category}</h3>
                </div>
                <span className="text-sm text-gray-500">
                  {items.filter(item => item.packed).length} of {items.length} packed
                </span>
              </div>
            </div>
            
            <div className="divide-y divide-gray-100">
              {items.map((item) => (
                <div 
                  key={item.id} 
                  className={`p-4 flex items-center justify-between transition-colors ${
                    item.packed ? 'bg-green-50' : 'hover:bg-gray-50'
                  }`}
                >
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => togglePacked(item.id)}
                      className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-colors ${
                        item.packed 
                          ? 'bg-green-500 border-green-500 text-white' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {item.packed && <Check className="w-4 h-4" />}
                    </button>
                    <div>
                      <div className={`font-medium ${item.packed ? 'text-green-700 line-through' : 'text-gray-900'}`}>
                        {item.name}
                        {item.quantity > 1 && (
                          <span className="text-sm text-gray-500 ml-2">×{item.quantity}</span>
                        )}
                      </div>
                      {item.notes && (
                        <div className="text-sm text-gray-500 mt-1">{item.notes}</div>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={() => deleteItem(item.id)}
                    className="text-gray-400 hover:text-red-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Add Item Modal */}
      {showAddItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Item</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Item Name</label>
                <input
                  type="text"
                  value={newItem.name}
                  onChange={(e) => setNewItem(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What do you need to pack?"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newItem.category}
                    onChange={(e) => setNewItem(prev => ({ ...prev, category: e.target.value as PackingItem['category'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="essentials">Essentials</option>
                    <option value="clothing">Clothing</option>
                    <option value="electronics">Electronics</option>
                    <option value="toiletries">Toiletries</option>
                    <option value="documents">Documents</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    value={newItem.quantity}
                    onChange={(e) => setNewItem(prev => ({ ...prev, quantity: parseInt(e.target.value) || 1 }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <input
                  type="text"
                  value={newItem.notes}
                  onChange={(e) => setNewItem(prev => ({ ...prev, notes: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Any specific details..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddItem(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddItem}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Item
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PackingList;