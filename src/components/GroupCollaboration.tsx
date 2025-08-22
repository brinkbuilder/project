import React, { useState } from 'react';
import { 
  Users, 
  Plus, 
  MessageCircle, 
  Share2, 
  Vote,
  UserPlus,
  Settings,
  Send,
  CheckCircle,
  X,
  Calendar,
  MapPin,
  DollarSign,
  Bell
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

interface GroupMember {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: 'admin' | 'member';
  status: 'active' | 'invited' | 'inactive';
  joinedDate: string;
}

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  message: string;
  timestamp: string;
  type: 'message' | 'system' | 'poll';
}

interface Poll {
  id: string;
  question: string;
  options: { id: string; text: string; votes: number }[];
  createdBy: string;
  createdAt: string;
  endsAt: string;
  votes: { userId: string; optionId: string }[];
}

interface GroupCollaborationProps {
  trips: Trip[];
}

const GroupCollaboration: React.FC<GroupCollaborationProps> = ({ trips }) => {
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(trips[0] || null);
  const [activeTab, setActiveTab] = useState<'chat' | 'members' | 'polls'>('chat');
  const [newMessage, setNewMessage] = useState('');
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [showPollModal, setShowPollModal] = useState(false);

  // Sample data
  const groupMembers: GroupMember[] = [
    {
      id: '1',
      name: 'You',
      email: 'you@example.com',
      avatar: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100',
      role: 'admin',
      status: 'active',
      joinedDate: '2024-05-01'
    },
    {
      id: '2',
      name: 'Sarah Johnson',
      email: 'sarah@example.com',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      role: 'member',
      status: 'active',
      joinedDate: '2024-05-02'
    },
    {
      id: '3',
      name: 'Mike Chen',
      email: 'mike@example.com',
      avatar: 'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=100',
      role: 'member',
      status: 'active',
      joinedDate: '2024-05-02'
    },
    {
      id: '4',
      name: 'Alex Rivera',
      email: 'alex@example.com',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      role: 'member',
      status: 'invited',
      joinedDate: '2024-05-10'
    }
  ];

  const chatMessages: ChatMessage[] = [
    {
      id: '1',
      senderId: '2',
      senderName: 'Sarah',
      message: 'Hey everyone! I found some great restaurant recommendations for Barcelona. Should I add them to our itinerary?',
      timestamp: '2024-05-10T14:30:00',
      type: 'message'
    },
    {
      id: '2',
      senderId: '1',
      senderName: 'You',
      message: 'That sounds awesome! Please share them. I\'ve been looking for authentic tapas places.',
      timestamp: '2024-05-10T14:32:00',
      type: 'message'
    },
    {
      id: '3',
      senderId: '3',
      senderName: 'Mike',
      message: 'I booked the tickets for Sagrada Familia! They\'re for June 15th at 4:30 PM. Hope that works for everyone.',
      timestamp: '2024-05-10T15:45:00',
      type: 'message'
    },
    {
      id: '4',
      senderId: 'system',
      senderName: 'System',
      message: 'Mike updated the Barcelona itinerary with new activities.',
      timestamp: '2024-05-10T15:46:00',
      type: 'system'
    },
    {
      id: '5',
      senderId: '2',
      senderName: 'Sarah',
      message: 'Perfect timing! I was just about to ask about that. Can\'t wait to see it!',
      timestamp: '2024-05-10T16:00:00',
      type: 'message'
    }
  ];

  const polls: Poll[] = [
    {
      id: '1',
      question: 'What should be our first activity in Barcelona?',
      options: [
        { id: '1', text: 'Visit Sagrada Familia', votes: 3 },
        { id: '2', text: 'Walk through Gothic Quarter', votes: 1 },
        { id: '3', text: 'Go to Park Güell', votes: 2 },
        { id: '4', text: 'Beach day at Barceloneta', votes: 0 }
      ],
      createdBy: 'You',
      createdAt: '2024-05-09T10:00:00',
      endsAt: '2024-05-12T23:59:59',
      votes: [
        { userId: '1', optionId: '1' },
        { userId: '2', optionId: '1' },
        { userId: '3', optionId: '1' }
      ]
    }
  ];

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('en-US', { 
      hour: '2-digit', 
      minute: '2-digit' 
    });
  };

  const handleSendMessage = () => {
    if (newMessage.trim() && selectedTrip) {
      // In a real app, this would send to backend
      console.log('Sending message:', newMessage);
      setNewMessage('');
    }
  };

  if (!selectedTrip) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-gray-900 mb-2">No group trips</h3>
          <p className="text-gray-600">Create a trip to start collaborating with friends</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Group Collaboration</h2>
          <p className="text-gray-600">Plan together, travel together</p>
        </div>
        <button 
          onClick={() => setShowInviteModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <UserPlus className="w-4 h-4" />
          <span>Invite Friend</span>
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

      {/* Trip Overview */}
      <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-xl p-6 text-white mb-6">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-xl font-bold mb-2">{selectedTrip.destination}</h3>
            <div className="flex flex-wrap gap-4 text-blue-100">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{new Date(selectedTrip.startDate).toLocaleDateString()} - {new Date(selectedTrip.endDate).toLocaleDateString()}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Users className="w-4 h-4" />
                <span>{groupMembers.filter(m => m.status === 'active').length} members</span>
              </div>
              <div className="flex items-center space-x-1">
                <DollarSign className="w-4 h-4" />
                <span>${selectedTrip.budget.toLocaleString()} budget</span>
              </div>
            </div>
          </div>
          <div className="flex -space-x-2">
            {groupMembers.slice(0, 4).map((member) => (
              <img
                key={member.id}
                src={member.avatar}
                alt={member.name}
                className="w-10 h-10 rounded-full border-2 border-white"
              />
            ))}
            {groupMembers.length > 4 && (
              <div className="w-10 h-10 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-sm font-medium">
                +{groupMembers.length - 4}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div className="border-b border-gray-200">
          <nav className="flex">
            {[
              { id: 'chat', label: 'Group Chat', icon: MessageCircle },
              { id: 'members', label: 'Members', icon: Users },
              { id: 'polls', label: 'Polls', icon: Vote }
            ].map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id as any)}
                className={`flex-1 flex items-center justify-center space-x-2 px-6 py-4 border-b-2 transition-colors ${
                  activeTab === id
                    ? 'border-blue-600 text-blue-600 bg-blue-50'
                    : 'border-transparent text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                }`}
              >
                <Icon className="w-5 h-5" />
                <span className="font-medium">{label}</span>
              </button>
            ))}
          </nav>
        </div>

        <div className="h-96">
          {/* Chat Tab */}
          {activeTab === 'chat' && (
            <div className="h-full flex flex-col">
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {chatMessages.map((message) => (
                  <div key={message.id} className={`flex items-start space-x-3 ${
                    message.senderId === '1' ? 'justify-end' : 'justify-start'
                  }`}>
                    {message.senderId !== '1' && message.type !== 'system' && (
                      <img
                        src={groupMembers.find(m => m.name === message.senderName)?.avatar || ''}
                        alt={message.senderName}
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    )}
                    
                    <div className={`max-w-xs lg:max-w-md ${
                      message.senderId === '1' ? 'order-first' : ''
                    }`}>
                      {message.type === 'system' ? (
                        <div className="bg-gray-100 text-gray-600 px-4 py-2 rounded-lg text-center text-sm">
                          <Bell className="w-4 h-4 inline mr-1" />
                          {message.message}
                        </div>
                      ) : (
                        <div className={`rounded-lg px-4 py-2 ${
                          message.senderId === '1'
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-900'
                        }`}>
                          {message.senderId !== '1' && (
                            <div className="text-xs font-medium mb-1 opacity-75">
                              {message.senderName}
                            </div>
                          )}
                          <p className="text-sm">{message.message}</p>
                          <div className={`text-xs mt-1 ${
                            message.senderId === '1' ? 'text-blue-100' : 'text-gray-500'
                          }`}>
                            {formatTime(message.timestamp)}
                          </div>
                        </div>
                      )}
                    </div>

                    {message.senderId === '1' && message.type !== 'system' && (
                      <img
                        src={groupMembers.find(m => m.id === '1')?.avatar || ''}
                        alt="You"
                        className="w-8 h-8 rounded-full flex-shrink-0"
                      />
                    )}
                  </div>
                ))}
              </div>
              
              <div className="border-t border-gray-200 p-4">
                <div className="flex space-x-2">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                    placeholder="Type your message..."
                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={!newMessage.trim()}
                    className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-2 rounded-lg transition-colors"
                  >
                    <Send className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Members Tab */}
          {activeTab === 'members' && (
            <div className="p-4 space-y-4">
              {groupMembers.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center space-x-4">
                    <img
                      src={member.avatar}
                      alt={member.name}
                      className="w-12 h-12 rounded-full"
                    />
                    <div>
                      <div className="font-medium text-gray-900">{member.name}</div>
                      <div className="text-sm text-gray-600">{member.email}</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.status === 'active' ? 'bg-green-100 text-green-700' :
                      member.status === 'invited' ? 'bg-yellow-100 text-yellow-700' :
                      'bg-gray-100 text-gray-700'
                    }`}>
                      {member.status}
                    </span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                      member.role === 'admin' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700'
                    }`}>
                      {member.role}
                    </span>
                    {member.id !== '1' && (
                      <button className="text-gray-400 hover:text-red-600 transition-colors">
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Polls Tab */}
          {activeTab === 'polls' && (
            <div className="p-4 space-y-4">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-900">Group Polls</h3>
                <button 
                  onClick={() => setShowPollModal(true)}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded-lg transition-colors text-sm flex items-center space-x-1"
                >
                  <Plus className="w-4 h-4" />
                  <span>New Poll</span>
                </button>
              </div>

              {polls.map((poll) => (
                <div key={poll.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-4">
                    <h4 className="font-medium text-gray-900">{poll.question}</h4>
                    <div className="text-sm text-gray-500">
                      by {poll.createdBy}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {poll.options.map((option) => {
                      const totalVotes = poll.options.reduce((sum, opt) => sum + opt.votes, 0);
                      const percentage = totalVotes > 0 ? (option.votes / totalVotes) * 100 : 0;
                      const userVoted = poll.votes.some(v => v.userId === '1' && v.optionId === option.id);

                      return (
                        <div key={option.id} className="relative">
                          <button className={`w-full text-left p-3 rounded-lg border transition-colors ${
                            userVoted ? 'border-blue-500 bg-blue-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                          }`}>
                            <div className="flex justify-between items-center">
                              <span className="font-medium">{option.text}</span>
                              <div className="flex items-center space-x-2">
                                <span className="text-sm text-gray-600">{option.votes} votes</span>
                                {userVoted && <CheckCircle className="w-4 h-4 text-blue-600" />}
                              </div>
                            </div>
                            <div className="mt-2 bg-gray-200 rounded-full h-2">
                              <div 
                                className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                                style={{ width: `${percentage}%` }}
                              />
                            </div>
                          </button>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 text-sm text-gray-500">
                    Ends on {new Date(poll.endsAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Invite Modal */}
      {showInviteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Invite Friends</h3>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                <input
                  type="email"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="friend@example.com"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Personal Message (optional)</label>
                <textarea
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Hey! Want to join our Barcelona trip?"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowInviteModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Send Invitation
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default GroupCollaboration;