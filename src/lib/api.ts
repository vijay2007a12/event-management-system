import axios, { AxiosError, AxiosInstance } from 'axios';
import { Event, Registration, User } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api';

class APIClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    // Add request interceptor
    this.client.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('authToken') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    // Add response interceptor
    this.client.interceptors.response.use(
      (response) => response,
      (error: AxiosError) => {
        if (error.response?.status === 401) {
          // Handle unauthorized
          if (typeof window !== 'undefined') {
            localStorage.removeItem('authToken');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }

  // Events API
  async getEvents(): Promise<Event[]> {
    const response = await this.client.get('/events');
    return response.data;
  }

  async getEvent(id: string): Promise<Event> {
    const response = await this.client.get(`/events/${id}`);
    return response.data;
  }

  async createEvent(event: Partial<Event>): Promise<Event> {
    const response = await this.client.post('/events', event);
    return response.data;
  }

  async updateEvent(id: string, event: Partial<Event>): Promise<Event> {
    const response = await this.client.put(`/events/${id}`, event);
    return response.data;
  }

  async deleteEvent(id: string): Promise<void> {
    await this.client.delete(`/events/${id}`);
  }

  // Registrations API
  async getRegistrations(eventId?: string): Promise<Registration[]> {
    const params = eventId ? { eventId } : {};
    const response = await this.client.get('/registrations', { params });
    return response.data;
  }

  async createRegistration(registration: Partial<Registration>): Promise<Registration> {
    const response = await this.client.post('/registrations', registration);
    return response.data;
  }

  async updateRegistration(id: string, registration: Partial<Registration>): Promise<Registration> {
    const response = await this.client.put(`/registrations/${id}`, registration);
    return response.data;
  }

  // Analytics API
  async getAnalytics(eventId: string) {
    const response = await this.client.get(`/analytics/${eventId}`);
    return response.data;
  }

  // Users API
  async getCurrentUser(): Promise<User> {
    const response = await this.client.get('/users/me');
    return response.data;
  }

  async updateProfile(user: Partial<User>): Promise<User> {
    const response = await this.client.put('/users/me', user);
    return response.data;
  }

  // Health check
  async healthCheck(): Promise<boolean> {
    try {
      const response = await this.client.get('/health');
      return response.status === 200;
    } catch {
      return false;
    }
  }
}

export const apiClient = new APIClient();
