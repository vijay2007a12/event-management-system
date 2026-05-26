import { create } from 'zustand';
import { Event, Registration, User, Notification, DashboardStats } from '@/types';

const sampleEvents: Event[] = [
  {
    id: 'event-tech-summit',
    title: 'Future Tech Summit',
    description: 'A full-day conference for builders, founders, and students exploring AI, cloud, robotics, and product innovation.',
    date: new Date('2026-06-18T09:30:00'),
    location: 'Bengaluru International Convention Centre',
    city: 'Bengaluru',
    thumbnail: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1200&q=80',
    halls: [
      { id: 'blr-orion', name: 'Orion Grand Hall', area: 'Rajajinagar', address: 'Dr Rajkumar Road, Rajajinagar' },
      { id: 'blr-phoenix', name: 'Phoenix Convention Arena', area: 'Whitefield', address: 'Mahadevapura Main Road' },
      { id: 'blr-forum', name: 'Forum Celebration Hall', area: 'Koramangala', address: 'Hosur Road, Koramangala' },
    ],
    capacity: 850,
    registeredCount: 612,
    status: 'scheduled',
    organizer: 'EventHub Labs',
    category: 'Tech & Innovation',
    price: 149,
  },
  {
    id: 'event-design-night',
    title: 'Design Systems Night',
    description: 'Hands-on sessions on scalable UI systems, accessibility, motion design, and collaboration between product and engineering teams.',
    date: new Date('2026-07-05T17:00:00'),
    location: 'Mumbai Creative District',
    city: 'Mumbai',
    thumbnail: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=1200&q=80',
    halls: [
      { id: 'mum-jio', name: 'Jio World Convention Hall', area: 'BKC', address: 'G Block, Bandra Kurla Complex' },
      { id: 'mum-nmacc', name: 'NMACC Studio Theatre', area: 'BKC', address: 'Jio World Centre, BKC' },
      { id: 'mum-prithvi', name: 'Prithvi House', area: 'Juhu', address: 'Janki Kutir, Juhu Church Road' },
    ],
    capacity: 240,
    registeredCount: 188,
    status: 'scheduled',
    organizer: 'Pixel Guild',
    category: 'Design',
    price: 79,
  },
  {
    id: 'event-startup-fair',
    title: 'Campus Startup Fair',
    description: 'Pitch showcases, investor office hours, and networking for early-stage teams looking for feedback and collaborators.',
    date: new Date('2026-08-12T10:00:00'),
    location: 'Delhi Innovation Hub',
    city: 'Delhi NCR',
    thumbnail: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1200&q=80',
    halls: [
      { id: 'del-bharat', name: 'Bharat Mandapam Hall', area: 'Pragati Maidan', address: 'Mathura Road, New Delhi' },
      { id: 'del-habitat', name: 'Habitat Centre Auditorium', area: 'Lodhi Road', address: 'India Habitat Centre' },
      { id: 'gur-cyber', name: 'CyberHub Event Deck', area: 'Gurugram', address: 'DLF Cyber City' },
    ],
    capacity: 500,
    registeredCount: 321,
    status: 'scheduled',
    organizer: 'Founder Circle',
    category: 'Business',
    price: 59,
  },
];

const sampleRegistrations: Registration[] = [
  {
    id: 'reg-001',
    eventId: 'event-tech-summit',
    userId: 'user-001',
    userName: 'Aarav Mehta',
    userEmail: 'aarav@example.com',
    registeredAt: new Date('2026-05-01T10:15:00'),
    status: 'registered',
    ticketType: 'premium',
    bookedSlot: '09:30 AM - 11:30 AM',
    bookedCity: 'Bengaluru',
    bookedHall: 'Orion Grand Hall',
    qrCode: 'QR-reg-001',
  },
  {
    id: 'reg-002',
    eventId: 'event-design-night',
    userId: 'user-002',
    userName: 'Nisha Rao',
    userEmail: 'nisha@example.com',
    registeredAt: new Date('2026-05-03T14:45:00'),
    status: 'checked-in',
    ticketType: 'vip',
    bookedSlot: '06:00 PM - 08:00 PM',
    bookedCity: 'Mumbai',
    bookedHall: 'Jio World Convention Hall',
    qrCode: 'QR-reg-002',
  },
];

const sampleNotifications: Notification[] = [
  {
    id: 'note-001',
    userId: 'current-user',
    title: 'Welcome to EventHub',
    message: 'Demo events and registrations are ready to explore.',
    type: 'info',
    read: false,
    timestamp: new Date('2026-05-10T09:00:00'),
    actionUrl: '/events',
  },
];

interface EventStore {
  // State
  events: Event[];
  registrations: Registration[];
  user: User | null;
  notifications: Notification[];
  isLoading: boolean;
  theme: 'dark' | 'light';
  stats: DashboardStats | null;

  // Events
  setEvents: (events: Event[]) => void;
  addEvent: (event: Event) => void;
  updateEvent: (id: string, event: Partial<Event>) => void;
  deleteEvent: (id: string) => void;

  // Registrations
  setRegistrations: (registrations: Registration[]) => void;
  addRegistration: (registration: Registration) => void;
  updateRegistration: (id: string, registration: Partial<Registration>) => void;

  // User
  setUser: (user: User | null) => void;

  // Notifications
  addNotification: (notification: Notification) => void;
  removeNotification: (id: string) => void;
  markNotificationAsRead: (id: string) => void;

  // UI
  setLoading: (loading: boolean) => void;
  setTheme: (theme: 'dark' | 'light') => void;

  // Stats
  setStats: (stats: DashboardStats) => void;
}

export const useEventStore = create<EventStore>((set) => ({
  events: sampleEvents,
  registrations: sampleRegistrations,
  user: null,
  notifications: sampleNotifications,
  isLoading: false,
  theme: 'dark',
  stats: null,

  setEvents: (events) => set({ events }),
  addEvent: (event) => set((state) => ({ events: [...state.events, event] })),
  updateEvent: (id, event) =>
    set((state) => ({
      events: state.events.map((e) => (e.id === id ? { ...e, ...event } : e)),
    })),
  deleteEvent: (id) =>
    set((state) => ({
      events: state.events.filter((e) => e.id !== id),
    })),

  setRegistrations: (registrations) => set({ registrations }),
  addRegistration: (registration) =>
    set((state) => ({ registrations: [...state.registrations, registration] })),
  updateRegistration: (id, registration) =>
    set((state) => ({
      registrations: state.registrations.map((r) =>
        r.id === id ? { ...r, ...registration } : r
      ),
    })),

  setUser: (user) => set({ user }),

  addNotification: (notification) =>
    set((state) => ({ notifications: [...state.notifications, notification] })),
  removeNotification: (id) =>
    set((state) => ({
      notifications: state.notifications.filter((n) => n.id !== id),
    })),
  markNotificationAsRead: (id) =>
    set((state) => ({
      notifications: state.notifications.map((n) =>
        n.id === id ? { ...n, read: true } : n
      ),
    })),

  setLoading: (isLoading) => set({ isLoading }),
  setTheme: (theme) => set({ theme }),

  setStats: (stats) => set({ stats }),
}));
