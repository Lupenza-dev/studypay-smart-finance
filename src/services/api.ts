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

export const servicesService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/services`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch services');
      }
      throw error;
    }
  },
  
  create: async (data: {
    title: string;
    content: string;
    image?: File;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'POST'
      });

      const response = await axios.post(`${API_BASE_URL}/services`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to create service');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  update: async (id: number, data: {
    title: string;
    content: string;
    image?: File;
    _method?: string;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'PUT'
      });

      const response = await axios.post(`${API_BASE_URL}/services/${id}`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to update service');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/services/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to delete service');
      }
      throw new Error('An unexpected error occurred');
    }
  }
};

export const testimonialsService = {
  getAll: async () => {
    try {
      console.log('Fetching testimonials from:', `${API_BASE_URL}/testimonials`);
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }
      
      const response = await axios.get(`${API_BASE_URL}/testimonials`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
      
      console.log('Testimonials API response:', response);
      
      // Handle different response formats
      if (Array.isArray(response.data)) {
        return response.data; // Direct array response
      } else if (response.data && Array.isArray(response.data.data)) {
        return response.data.data; // { data: [...] } response
      } else if (response.data && response.data.success !== undefined && Array.isArray(response.data.testimonials)) {
        return response.data.testimonials; // { success: true, testimonials: [...] } response
      }
      
      // If we get here, the response format is unexpected
      console.error('Unexpected testimonials response format:', response.data);
      throw new Error('Unexpected response format from server');
      
    } catch (error) {
      console.error('Error in testimonialsService.getAll:', error);
      if (axios.isAxiosError(error)) {
        const message = error.response?.data?.message || 
                       error.response?.data?.error || 
                       'Failed to fetch testimonials';
        throw new Error(message);
      }
      throw error instanceof Error ? error : new Error('An unknown error occurred');
    }
  },
  
  create: async (data: {
    name: string;
    position: string;
    content: string;
    rating: number;
    image?: File;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'POST'
      });

      const response = await axios.post(`${API_BASE_URL}/testimonials`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Create testimonial error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to create testimonial');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  update: async (id: number, data: {
    name: string;
    position: string;
    content: string;
    rating: number;
    image?: File;
    status?: 'published' | 'draft';
    _method?: string;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'PUT'
      });

      const response = await axios.post(`${API_BASE_URL}/testimonials/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Update testimonial error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to update testimonial');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/testimonials/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete testimonial error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to delete testimonial');
      }
      throw new Error('An unexpected error occurred');
    }
  }
};

export const minServicesService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/min-services`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch min services');
      }
      throw error;
    }
  },
  
  create: async (data: {
    title: string;
    content: string;
    image?: File;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'POST'
      });

      const response = await axios.post(`${API_BASE_URL}/min-services`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to create min service');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  update: async (id: number, data: {
    title: string;
    content: string;
    image?: File;
    _method?: string;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'PUT'
      });

      const response = await axios.post(`${API_BASE_URL}/min-services/${id}`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to update min service');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/min-services/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to delete min service');
      }
      throw new Error('An unexpected error occurred');
    }
  }
};

export const sliderService = {
  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/sliders`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch sliders');
      }
      throw error;
    }
  },
  
  create: async (data: {
    title: string;
    subtitle: string;
    button_text: string;
    button_url: string;
    badge: string;
    features: string[];
    image: File;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        features: JSON.stringify(data.features),
        _method: 'POST'
      });

      const response = await axios.post(`${API_BASE_URL}/sliders`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to create slider');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  update: async (id: number, data: {
    title: string;
    subtitle: string;
    button_text: string;
    button_url: string;
    badge: string;
    features: string[];
    image?: File;
    _method?: string;
  }) => {
    try {
      // Create form data and ensure features is a JSON string
      const formData = new FormData();
      formData.append('title', data.title);
      formData.append('subtitle', data.subtitle);
      formData.append('button_text', data.button_text);
      formData.append('button_url', data.button_url);
      formData.append('badge', data.badge);
      formData.append('features', JSON.stringify(data.features));
      
      // Only append image if it exists
      if (data.image) {
        formData.append('image', data.image);
      }
      
      // Add _method for Laravel to handle as PUT
      formData.append('_method', 'PUT');

      const response = await axios.post(`${API_BASE_URL}/sliders/${id}`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to update slider');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/sliders/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.error('Delete error:', error.response);
        throw new Error(error.response?.data?.message || 'Failed to delete slider');
      }
      throw new Error('An unexpected error occurred');
    }
  }
};

export const faqService = {
  getCategories: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/faq-categories`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch FAQ categories');
      }
      throw error;
    }
  },

  getAll: async () => {
    try {
      const response = await axios.get(`${API_BASE_URL}/faqs`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to fetch FAQs');
      }
      throw error;
    }
  },
  
  create: async (data: {
    title: string;
    content: string;
    category_id: string;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'POST'
      });

      const response = await axios.post(`${API_BASE_URL}/faqs`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to create FAQ');
      }
      throw new Error('An unexpected error occurred');
    }
  },
  
  update: async (id: number, data: {
    title: string;
    content: string;
    category_id: string;
    status?: 'published' | 'draft';
    _method?: string;
  }) => {
    try {
      const formData = createFormData({
        ...data,
        _method: 'PUT'
      });

      const response = await axios.post(`${API_BASE_URL}/faqs/${id}`, formData, {
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
        throw new Error(error.response?.data?.message || 'Failed to update FAQ');
      }
      throw new Error('An unexpected error occurred');
    }
  },

  delete: async (id: number) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/faqs/${id}`, {
        headers: {
          'Accept': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        throw new Error(error.response?.data?.message || 'Failed to delete FAQ');
      }
      throw error;
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
