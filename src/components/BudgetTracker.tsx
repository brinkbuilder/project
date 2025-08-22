import React, { useState } from 'react';
import { 
  DollarSign, 
  TrendingUp, 
  TrendingDown, 
  Plus, 
  Edit3, 
  Trash2,
  PieChart,
  Receipt,
  CreditCard,
  Plane,
  Hotel,
  Utensils,
  ShoppingBag
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

interface Expense {
  id: string;
  title: string;
  amount: number;
  category: 'transport' | 'accommodation' | 'food' | 'activities' | 'shopping' | 'other';
  date: string;
  notes?: string;
  paidBy: string;
}

interface BudgetTrackerProps {
  trips: Trip[];
  setTrips: React.Dispatch<React.SetStateAction<Trip[]>>;
}

const BudgetTracker: React.FC<BudgetTrackerProps> = ({ trips, setTrips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [newExpense, setNewExpense] = useState({
    title: '',
    amount: '',
    category: 'food' as Expense['category'],
    date: new Date().toISOString().split('T')[0],
    notes: '',
    paidBy: 'You'
  });

  // Sample expenses data
  const expenses: Expense[] = [
    {
      id: '1',
      title: 'Flight to Barcelona',
      amount: 450,
      category: 'transport',
      date: '2024-05-15',
      notes: 'Round trip tickets',
      paidBy: 'You'
    },
    {
      id: '2',
      title: 'Hotel Arts Barcelona',
      amount: 180,
      category: 'accommodation',
      date: '2024-06-15',
      notes: '3 nights booking',
      paidBy: 'Sarah'
    },
    {
      id: '3',
      title: 'Dinner at Cal Pep',
      amount: 120,
      category: 'food',
      date: '2024-06-15',
      notes: 'Amazing tapas!',
      paidBy: 'Mike'
    },
    {
      id: '4',
      title: 'Sagrada Familia Tickets',
      amount: 85,
      category: 'activities',
      date: '2024-06-15',
      notes: 'Audio guide included',
      paidBy: 'You'
    }
  ];

  const getCategoryIcon = (category: Expense['category']) => {
    switch (category) {
      case 'transport': return <Plane className="w-4 h-4" />;
      case 'accommodation': return <Hotel className="w-4 h-4" />;
      case 'food': return <Utensils className="w-4 h-4" />;
      case 'activities': return <Receipt className="w-4 h-4" />;
      case 'shopping': return <ShoppingBag className="w-4 h-4" />;
      default: return <CreditCard className="w-4 h-4" />;
    }
  };

  const getCategoryColor = (category: Expense['category']) => {
    switch (category) {
      case 'transport': return 'bg-blue-100 text-blue-600';
      case 'accommodation': return 'bg-green-100 text-green-600';
      case 'food': return 'bg-orange-100 text-orange-600';
      case 'activities': return 'bg-purple-100 text-purple-600';
      case 'shopping': return 'bg-pink-100 text-pink-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const categoryTotals = expenses.reduce((acc, expense) => {
    acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
    return acc;
  }, {} as Record<Expense['category'], number>);

  const totalSpent = expenses.reduce((sum, expense) => sum + expense.amount, 0);
  const remaining = selectedTrip ? selectedTrip.budget - totalSpent : 0;

  const handleAddExpense = () => {
    if (newExpense.title && newExpense.amount && selectedTrip) {
      // In a real app, this would update the backend
      console.log('Adding expense:', newExpense);
      setShowAddExpense(false);
      setNewExpense({
        title: '',
        amount: '',
        category: 'food',
        date: new Date().toISOString().split('T')[0],
        notes: '',
        paidBy: 'You'
      });
    }
  };

  if (!selectedTrip) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <DollarSign className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No trips to track</h3>
          <p className="text-gray-600">Create a trip first to start tracking your budget</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Budget Tracker</h2>
          <p className="text-gray-600">Monitor your travel expenses</p>
        </div>
        <button 
          onClick={() => setShowAddExpense(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add Expense</span>
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

      {/* Budget Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <DollarSign className="w-8 h-8" />
            <span className="text-blue-100 text-sm font-medium">Total Budget</span>
          </div>
          <div className="text-3xl font-bold mb-1">${selectedTrip.budget.toLocaleString()}</div>
          <div className="text-blue-100 text-sm">For {selectedTrip.destination}</div>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <TrendingUp className="w-8 h-8" />
            <span className="text-orange-100 text-sm font-medium">Spent</span>
          </div>
          <div className="text-3xl font-bold mb-1">${totalSpent.toLocaleString()}</div>
          <div className="text-orange-100 text-sm">
            {((totalSpent / selectedTrip.budget) * 100).toFixed(1)}% of budget
          </div>
        </div>

        <div className={`rounded-xl p-6 text-white ${remaining >= 0 ? 'bg-gradient-to-r from-green-500 to-green-600' : 'bg-gradient-to-r from-red-500 to-red-600'}`}>
          <div className="flex items-center justify-between mb-4">
            {remaining >= 0 ? <TrendingDown className="w-8 h-8" /> : <TrendingUp className="w-8 h-8" />}
            <span className={`text-sm font-medium ${remaining >= 0 ? 'text-green-100' : 'text-red-100'}`}>
              {remaining >= 0 ? 'Remaining' : 'Over Budget'}
            </span>
          </div>
          <div className="text-3xl font-bold mb-1">${Math.abs(remaining).toLocaleString()}</div>
          <div className={`text-sm ${remaining >= 0 ? 'text-green-100' : 'text-red-100'}`}>
            {remaining >= 0 ? 'Still available' : 'Exceeding budget'}
          </div>
        </div>
      </div>

      {/* Budget Progress Bar */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 mb-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Budget Progress</h3>
          <span className="text-sm text-gray-600">
            ${totalSpent} / ${selectedTrip.budget}
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-3">
          <div 
            className={`h-3 rounded-full transition-all duration-500 ${
              totalSpent <= selectedTrip.budget ? 'bg-blue-500' : 'bg-red-500'
            }`}
            style={{ width: `${Math.min((totalSpent / selectedTrip.budget) * 100, 100)}%` }}
          ></div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Expenses List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900">Recent Expenses</h3>
            </div>
            <div className="divide-y divide-gray-100">
              {expenses.map((expense) => (
                <div key={expense.id} className="p-6 hover:bg-gray-50 transition-colors">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-4">
                      <div className={`p-2 rounded-lg ${getCategoryColor(expense.category)}`}>
                        {getCategoryIcon(expense.category)}
                      </div>
                      <div>
                        <h4 className="font-medium text-gray-900 mb-1">{expense.title}</h4>
                        <p className="text-sm text-gray-600 mb-1">
                          Paid by {expense.paidBy} on {new Date(expense.date).toLocaleDateString()}
                        </p>
                        {expense.notes && (
                          <p className="text-sm text-gray-500">{expense.notes}</p>
                        )}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-gray-900">${expense.amount}</div>
                      <div className="flex items-center space-x-2 mt-2">
                        <button className="text-gray-400 hover:text-blue-600 transition-colors">
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button className="text-gray-400 hover:text-red-600 transition-colors">
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Category Breakdown */}
        <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Spending by Category</h3>
          <div className="space-y-4">
            {Object.entries(categoryTotals).map(([category, amount]) => (
              <div key={category} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`p-2 rounded-lg ${getCategoryColor(category as Expense['category'])}`}>
                    {getCategoryIcon(category as Expense['category'])}
                  </div>
                  <span className="capitalize font-medium text-gray-700">{category}</span>
                </div>
                <span className="font-semibold text-gray-900">${amount}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Add Expense Modal */}
      {showAddExpense && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Add Expense</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <input
                  type="text"
                  value={newExpense.title}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="What did you spend on?"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Amount ($)</label>
                  <input
                    type="number"
                    value={newExpense.amount}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, amount: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="0.00"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    value={newExpense.category}
                    onChange={(e) => setNewExpense(prev => ({ ...prev, category: e.target.value as Expense['category'] }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    <option value="transport">Transport</option>
                    <option value="accommodation">Accommodation</option>
                    <option value="food">Food & Drinks</option>
                    <option value="activities">Activities</option>
                    <option value="shopping">Shopping</option>
                    <option value="other">Other</option>
                  </select>
                </div>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date"
                  value={newExpense.date}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, date: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes (optional)</label>
                <textarea
                  value={newExpense.notes}
                  onChange={(e) => setNewExpense(prev => ({ ...prev, notes: e.target.value }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Additional details..."
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowAddExpense(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleAddExpense}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
              >
                Add Expense
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BudgetTracker;