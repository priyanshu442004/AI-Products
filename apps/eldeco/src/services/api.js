// API Service for Frontend
import { apiUrl } from "../lib/apiPath";
const API_BASE_URL = import.meta.env.VITE_API_URL || apiUrl('/api/v1');

// Get Firebase token for authentication
const getAuthToken = async () => {
  const { auth } = await import('../firebase/config');
  const { onAuthStateChanged } = await import('firebase/auth');
  
  return new Promise((resolve) => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        user.getIdToken().then(resolve);
      } else {
        resolve(null);
      }
    });
  });
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const token = await getAuthToken();
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers
  };

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  if (!response.ok) {
    const error = await response.json().catch(() => ({ error: 'Network error' }));
    throw new Error(error.error || 'API request failed');
  }

  return response.json();
};

// Document APIs
export const documentAPI = {
  // Upload document
  upload: async (file, documentType) => {
    const token = await getAuthToken();
    const formData = new FormData();
    formData.append('file', file);
    formData.append('document_type', documentType);

    const response = await fetch(`${API_BASE_URL}/documents/upload`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formData
    });

    if (!response.ok) {
      const error = await response.json().catch(() => ({ error: 'Upload failed' }));
      throw new Error(error.error || 'Upload failed');
    }

    return response.json();
  },

  // Get document status
  getStatus: (documentId) => 
    apiRequest(`/documents/${documentId}/status`),

  // Get document results
  getResults: (documentId) => 
    apiRequest(`/documents/${documentId}/results`),

  // Get user documents (history)
  getHistory: (params = {}) => {
    const queryParams = new URLSearchParams(params).toString();
    return apiRequest(`/documents?${queryParams}`);
  },

  // Download document
  getDownloadUrl: (documentId, format = 'pdf') => 
    apiRequest(`/documents/${documentId}/download?format=${format}`),

  // Delete document
  delete: (documentId) => 
    apiRequest(`/documents/${documentId}`, { method: 'DELETE' })
};

// User APIs
export const userAPI = {
  // Get user settings
  getSettings: (userId) => 
    apiRequest(`/users/${userId}/settings`),

  // Update user settings
  updateSettings: (userId, settings) => 
    apiRequest(`/users/${userId}/settings`, {
      method: 'PUT',
      body: JSON.stringify(settings)
    })
};

// Analytics APIs
export const analyticsAPI = {
  // Get user analytics
  getAnalytics: (userId) => 
    apiRequest(`/analytics/${userId}`)
};

// Support APIs
export const supportAPI = {
  // Create support ticket
  createTicket: (data) => 
    apiRequest('/support/contact', {
      method: 'POST',
      body: JSON.stringify(data)
    })
};

export default {
  documentAPI,
  userAPI,
  analyticsAPI,
  supportAPI
};


