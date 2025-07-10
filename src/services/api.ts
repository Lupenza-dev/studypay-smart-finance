import axios from 'axios';

const API_BASE_URL = 'https://api.eldizerfinance.co.tz/api';

interface LoginCredentials {
  email: string;
  password: string;
}

// Helper function to create form data from object
const createFormData = (data: Record<string, any>): FormData => {
  const formData = new FormData();
  Object.entries(data).forEach(([key, value]) => {
    if (Array.isArray(value)) {
      value.forEach(item => formData.append(`${key}[]`, item));
    } else if (value instanceof File) {
      formData.append(key, value);
    } else if (value !== null && value !== undefined) {
      formData.append(key, value);
    }
  });
  return formData;
};

export const newsService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/news`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch news');
      }
      throw error;
    }
  },
  
  create: async (data: {
    title: string;
    content: string;
    news_category_id: string;
    image?: File;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'POST'
      });

      const response = await axios.post(`${API_BASE_URL}/news`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log(error.response);
        throw new Error(error.response?.data?.message || 'Failed to create news');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  update: async (id: number, data: {
    title: string;
    content: string;
    news_category_id: string;
    image?: File;
    _method?: string;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'PUT'
      });

      const response = await axios.post(`${API_BASE_URL}/news/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to update news');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/news/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to delete news article');
      }
      throw new Error('An unexpected error occurred');
    }
  }
};

export const authService = {
  login: async (credentials: LoginCredentials) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, credentials);
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Login failed');
      }
      throw new Error('An unexpected error occurred');
    }
  },

  // Store the auth token
  setAuthToken: (token: string) => {
    if (token) {
      localStorage.setItem('token', token);
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  },

  // Remove the auth token
  removeAuthToken: () => {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common['Authorization'];
  },

  // Check if user is authenticated
  isAuthenticated: (): boolean => {
    return !!localStorage.getItem('token');
  }
};
