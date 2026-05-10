// Event Types
export interface Event {
  id: string;
  title: string;
  description: string;
  date: Date;
  location: string;
  capacity: number;
  registeredCount: number;
  status: 'draft' | 'scheduled' | 'ongoing' | 'completed' | 'cancelled';
  thumbnail?: string;
  organizer: string;
  category: string;
  price: number;
}

// Registration Types
export interface Registration {
  id: string;
  eventId: string;
  userId: string;
  userName: string;
  userEmail: string;
  registeredAt: Date;
  status: 'registered' | 'checked-in' | 'cancelled';
  ticketType: 'regular' | 'vip' | 'premium';
  qrCode?: string;
}

// Payment Types
export interface Payment {
  id: string;
  eventId: string;
  registrationId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: 'card' | 'upi' | 'wallet';
  timestamp: Date;
  transactionId: string;
}

// Invoice Types
export interface Invoice {
  id: string;
  eventId: string;
  paymentId: string;
  totalAmount: number;
  taxAmount: number;
  netAmount: number;
  generatedAt: Date;
  dueDate: Date;
  status: 'draft' | 'sent' | 'paid' | 'overdue';
}

// User Types
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'admin' | 'organizer' | 'attendee' | 'customer';
  createdAt: Date;
}

// Dashboard Stats
export interface DashboardStats {
  totalEvents: number;
  totalRegistrations: number;
  totalRevenue: number;
  upcomingEvents: number;
  activeRegistrations: number;
  conversionRate: number;
}

// Notification Types
export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  read: boolean;
  timestamp: Date;
  actionUrl?: string;
}

// Form Types
export interface CreateEventForm {
  title: string;
  description: string;
  date: Date;
  time: string;
  location: string;
  capacity: number;
  price: number;
  category: string;
  image?: File;
}

export interface RegistrationForm {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  ticketType: 'regular' | 'vip' | 'premium';
  specialRequests?: string;
}

// Analytics Types
export interface EventAnalytics {
  eventId: string;
  totalViews: number;
  totalRegistrations: number;
  conversionRate: number;
  totalRevenue: number;
  averageTicketPrice: number;
  registrationTrend: { date: string; count: number }[];
  revenueByTicketType: { type: string; amount: number }[];
  geographicDistribution: { location: string; count: number }[];
}
