import React, { useState } from 'react';
import { 
  FileText, 
  Upload, 
  Download, 
  Eye, 
  Trash2,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Shield,
  CreditCard,
  Plane,
  Building2,
  Plus
} from 'lucide-react';

interface Document {
  id: string;
  name: string;
  type: 'passport' | 'visa' | 'insurance' | 'ticket' | 'booking' | 'other';
  uploadDate: string;
  expiryDate?: string;
  status: 'valid' | 'expiring' | 'expired';
  fileSize: string;
  notes?: string;
}

const DocumentManager: React.FC = () => {
  const [documents, setDocuments] = useState<Document[]>([
    {
      id: '1',
      name: 'US Passport',
      type: 'passport',
      uploadDate: '2024-01-15',
      expiryDate: '2028-03-20',
      status: 'valid',
      fileSize: '2.4 MB',
      notes: 'Valid for 4+ years'
    },
    {
      id: '2',
      name: 'Travel Insurance Policy',
      type: 'insurance',
      uploadDate: '2024-05-10',
      expiryDate: '2024-12-31',
      status: 'expiring',
      fileSize: '1.8 MB',
      notes: 'Expires end of year - need renewal'
    },
    {
      id: '3',
      name: 'Barcelona Flight Tickets',
      type: 'ticket',
      uploadDate: '2024-05-01',
      expiryDate: '2024-06-15',
      status: 'valid',
      fileSize: '845 KB'
    },
    {
      id: '4',
      name: 'Hotel Arts Booking',
      type: 'booking',
      uploadDate: '2024-05-02',
      expiryDate: '2024-06-22',
      status: 'valid',
      fileSize: '1.2 MB'
    },
    {
      id: '5',
      name: 'Schengen Visa',
      type: 'visa',
      uploadDate: '2024-02-20',
      expiryDate: '2024-02-19',
      status: 'expired',
      fileSize: '1.5 MB',
      notes: 'URGENT: Visa expired!'
    }
  ]);

  const [showUploadModal, setShowUploadModal] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const getDocumentIcon = (type: Document['type']) => {
    switch (type) {
      case 'passport': return <Shield className="w-5 h-5" />;
      case 'visa': return <FileText className="w-5 h-5" />;
      case 'insurance': return <Shield className="w-5 h-5" />;
      case 'ticket': return <Plane className="w-5 h-5" />;
      case 'booking': return <Building2 className="w-5 h-5" />;
      default: return <FileText className="w-5 h-5" />;
    }
  };

  const getDocumentColor = (type: Document['type']) => {
    switch (type) {
      case 'passport': return 'bg-blue-100 text-blue-600';
      case 'visa': return 'bg-purple-100 text-purple-600';
      case 'insurance': return 'bg-green-100 text-green-600';
      case 'ticket': return 'bg-orange-100 text-orange-600';
      case 'booking': return 'bg-cyan-100 text-cyan-600';
      default: return 'bg-gray-100 text-gray-600';
    }
  };

  const getStatusColor = (status: Document['status']) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-700 border-green-200';
      case 'expiring': return 'bg-yellow-100 text-yellow-700 border-yellow-200';
      case 'expired': return 'bg-red-100 text-red-700 border-red-200';
    }
  };

  const getStatusIcon = (status: Document['status']) => {
    switch (status) {
      case 'valid': return <CheckCircle className="w-4 h-4" />;
      case 'expiring': return <AlertTriangle className="w-4 h-4" />;
      case 'expired': return <AlertTriangle className="w-4 h-4" />;
    }
  };

  const getDaysUntilExpiry = (expiryDate: string) => {
    const today = new Date();
    const expiry = new Date(expiryDate);
    const diffTime = expiry.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const validDocuments = documents.filter(doc => doc.status === 'valid').length;
  const expiringDocuments = documents.filter(doc => doc.status === 'expiring').length;
  const expiredDocuments = documents.filter(doc => doc.status === 'expired').length;

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      // Handle file upload
      console.log('Files dropped:', e.dataTransfer.files);
    }
  };

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Document Manager</h2>
          <p className="text-gray-600">Keep all your travel documents organized and secure</p>
        </div>
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors flex items-center space-x-2"
        >
          <Upload className="w-4 h-4" />
          <span>Upload Document</span>
        </button>
      </div>

      {/* Status Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <CheckCircle className="w-8 h-8" />
            <span className="text-green-100 text-sm font-medium">Valid</span>
          </div>
          <div className="text-3xl font-bold mb-1">{validDocuments}</div>
          <div className="text-green-100 text-sm">Documents ready</div>
        </div>

        <div className="bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-yellow-100 text-sm font-medium">Expiring Soon</span>
          </div>
          <div className="text-3xl font-bold mb-1">{expiringDocuments}</div>
          <div className="text-yellow-100 text-sm">Need attention</div>
        </div>

        <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-6 text-white">
          <div className="flex items-center justify-between mb-4">
            <AlertTriangle className="w-8 h-8" />
            <span className="text-red-100 text-sm font-medium">Expired</span>
          </div>
          <div className="text-3xl font-bold mb-1">{expiredDocuments}</div>
          <div className="text-red-100 text-sm">Urgent action needed</div>
        </div>
      </div>

      {/* Action Required Section */}
      {(expiringDocuments > 0 || expiredDocuments > 0) && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex items-center space-x-3 mb-4">
            <AlertTriangle className="w-6 h-6 text-red-600" />
            <h3 className="text-lg font-semibold text-red-900">Action Required</h3>
          </div>
          <div className="space-y-2">
            {documents
              .filter(doc => doc.status === 'expired' || doc.status === 'expiring')
              .map(doc => (
                <div key={doc.id} className="flex items-center justify-between bg-white rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${getDocumentColor(doc.type)}`}>
                      {getDocumentIcon(doc.type)}
                    </div>
                    <div>
                      <div className="font-medium text-gray-900">{doc.name}</div>
                      <div className="text-sm text-red-600">
                        {doc.status === 'expired' 
                          ? `Expired ${Math.abs(getDaysUntilExpiry(doc.expiryDate!))} days ago`
                          : `Expires in ${getDaysUntilExpiry(doc.expiryDate!)} days`
                        }
                      </div>
                    </div>
                  </div>
                  <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg transition-colors text-sm">
                    {doc.status === 'expired' ? 'Renew Now' : 'Review'}
                  </button>
                </div>
              ))}
          </div>
        </div>
      )}

      {/* Documents Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {documents.map((document) => (
          <div key={document.id} className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
            <div className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className={`p-3 rounded-lg ${getDocumentColor(document.type)}`}>
                  {getDocumentIcon(document.type)}
                </div>
                <div className={`flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(document.status)}`}>
                  {getStatusIcon(document.status)}
                  <span className="capitalize">{document.status}</span>
                </div>
              </div>

              <h3 className="font-semibold text-gray-900 mb-2">{document.name}</h3>
              
              <div className="space-y-2 mb-4">
                <div className="flex items-center text-sm text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  <span>Uploaded: {new Date(document.uploadDate).toLocaleDateString()}</span>
                </div>
                
                {document.expiryDate && (
                  <div className="flex items-center text-sm text-gray-600">
                    <AlertTriangle className="w-4 h-4 mr-2" />
                    <span>
                      Expires: {new Date(document.expiryDate).toLocaleDateString()}
                      {document.status === 'expiring' && (
                        <span className="text-yellow-600 ml-1">
                          ({getDaysUntilExpiry(document.expiryDate)} days)
                        </span>
                      )}
                    </span>
                  </div>
                )}
                
                <div className="text-sm text-gray-500">
                  Size: {document.fileSize}
                </div>
              </div>

              {document.notes && (
                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-sm text-gray-700">{document.notes}</p>
                </div>
              )}

              <div className="flex items-center justify-between">
                <div className="flex space-x-2">
                  <button className="text-blue-600 hover:text-blue-700 transition-colors">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button className="text-green-600 hover:text-green-700 transition-colors">
                    <Download className="w-4 h-4" />
                  </button>
                  <button className="text-red-600 hover:text-red-700 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <span className="text-xs text-gray-500 capitalize">{document.type}</span>
              </div>
            </div>
          </div>
        ))}

        {/* Add Document Card */}
        <button 
          onClick={() => setShowUploadModal(true)}
          className="bg-gray-50 hover:bg-gray-100 border-2 border-dashed border-gray-300 rounded-xl p-6 transition-colors flex flex-col items-center justify-center space-y-4 text-gray-600 hover:text-gray-800 min-h-[280px]"
        >
          <Plus className="w-12 h-12" />
          <div className="text-center">
            <div className="font-medium">Add Document</div>
            <div className="text-sm">Upload a new travel document</div>
          </div>
        </button>
      </div>

      {/* Upload Modal */}
      {showUploadModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md mx-4">
            <h3 className="text-xl font-bold text-gray-900 mb-4">Upload Document</h3>
            
            {/* Drag & Drop Area */}
            <div
              className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                dragActive ? 'border-blue-400 bg-blue-50' : 'border-gray-300'
              }`}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Drag and drop your document here</p>
              <p className="text-sm text-gray-500 mb-4">or</p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Choose File
              </button>
            </div>

            <div className="mt-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Type</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                  <option value="passport">Passport</option>
                  <option value="visa">Visa</option>
                  <option value="insurance">Travel Insurance</option>
                  <option value="ticket">Flight Ticket</option>
                  <option value="booking">Hotel Booking</option>
                  <option value="other">Other</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Document Name</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="e.g., US Passport"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Expiry Date (optional)</label>
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setShowUploadModal(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors">
                Upload Document
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DocumentManager;