# EventHub - Futuristic Event Management System

A next-generation event management platform with immersive 3D visuals, premium UI design, and enterprise-level functionality. Built with cutting-edge web technologies for seamless event planning, registration, and billing.

## 🌟 Features

### 1. **Hero Section**
- Stunning 3D floating sphere with shader effects
- Animated particle field background
- Real-time stats counters
- Glassmorphism design elements
- Smooth scroll animations

### 2. **Event Planning Module**
- Create and manage events with intuitive interface
- Drag-and-drop event scheduler
- Real-time capacity tracking
- Event status management (draft, scheduled, ongoing, completed)
- Team collaboration features

### 3. **Registration System**
- Multi-step registration wizard
- Dynamic ticket categories (Regular, VIP, Premium)
- QR code ticket generation
- Real-time registration tracking
- Email/SMS confirmation UI

### 4. **Billing & Payments**
- Revenue analytics dashboard
- Payment history tracking
- Invoice generation
- Multiple payment method support
- Financial reports with interactive charts

### 5. **Admin Dashboard**
- Real-time event monitoring
- Live analytics and metrics
- Activity feed with notifications
- Quick actions panel
- Performance insights

### 6. **Design Features**
- Dark futuristic theme with glassmorphism
- Neon gradient effects (purple, blue, cyan)
- Smooth 3D animations and transitions
- Fully responsive design (desktop, tablet, mobile)
- Premium typography with Inter/Poppins fonts
- Cinematic animations with Framer Motion

## 🛠 Tech Stack

### Frontend
- **React 18.3** - UI library
- **Next.js 14.2** - Framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js + React Three Fiber** - 3D visuals
- **Recharts** - Data visualization

### State Management
- **Zustand** - Lightweight store

### UI Components & Icons
- **React Icons** - Icon library
- **QR Code React** - QR code generation

### Utilities
- **GSAP** - Advanced animations
- **Axios** - HTTP client
- **React Hot Toast** - Notifications

## 📁 Project Structure

```
src/
├── app/                    # Next.js app directory
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   ├── events/
│   │   ├── page.tsx       # Events listing
│   │   ├── create/        # Create event
│   │   └── [id]/          # Event details
│   ├── planning/          # Planning module
│   ├── register/          # Registration
│   └── dashboard/         # Admin dashboard
├── components/            # React components
│   ├── Layout.tsx
│   ├── Navbar.tsx
│   ├── Footer.tsx
│   ├── Notifications.tsx
│   ├── 3d/               # 3D components
│   │   └── Scene3D.tsx
│   ├── background/       # Background elements
│   ├── hero/            # Hero section
│   ├── planning/        # Planning module
│   ├── registration/    # Registration forms
│   ├── billing/         # Billing components
│   └── dashboard/       # Dashboard components
├── store/               # Zustand store
├── hooks/              # Custom React hooks
├── types/              # TypeScript types
├── styles/             # Global styles
└── lib/               # Utilities

```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
```

2. **Install dependencies**
```bash
npm install
```

3. **Run development server**
```bash
npm run dev
```

4. **Open in browser**
Navigate to `http://localhost:3000`

## 📖 Usage Guide

### Creating an Event
1. Navigate to `/planning` or click "Create Event" button
2. Fill in event details (title, description, date, location, etc.)
3. Set capacity and ticket price
4. Review and confirm creation
5. Event appears on dashboard immediately

### Registering for an Event
1. Browse events at `/events`
2. Click on event card to view details
3. Click "Register Now" button
4. Complete multi-step registration form
5. Receive QR code ticket
6. Confirmation email sent automatically

### Viewing Analytics
1. Go to `/dashboard`
2. View real-time stats and metrics
3. Review revenue trends
4. Monitor registrations
5. Export reports

## 🎨 Design System

### Color Palette
- **Primary**: Purple (#a855f7)
- **Secondary**: Cyan (#06b6d4)
- **Accent**: Blue (#0ea5e9)
- **Background**: Dark Navy (#0f172a)
- **Text**: Light Gray (#e2e8f0)

### Typography
- **Display**: Poppins / Inter
- **Body**: Inter
- **Monospace**: Courier New

### Animations
- **Smooth Transitions**: 0.3s - 0.6s
- **Staggered Animations**: 0.1s delay
- **Hover Effects**: Scale + glow
- **Scroll Animations**: Fade-in on viewport

## 🔧 Configuration

### Environment Variables
Create `.env.local`:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NEXT_PUBLIC_STRIPE_KEY=your_stripe_key
```

### Tailwind Configuration
Customized theme with:
- Custom color schemes
- Extended animations
- Custom shadows (neon-glow effects)
- Glassmorphism utilities

## 📱 Responsive Design

- **Mobile**: < 640px (single column)
- **Tablet**: 640px - 1024px (2 columns)
- **Desktop**: > 1024px (3+ columns)

All components scale gracefully with CSS media queries.

## 🎯 API Integration (Future)

Endpoints to connect:
- `/api/events` - Event management
- `/api/registrations` - Registration handling
- `/api/payments` - Payment processing
- `/api/analytics` - Analytics data
- `/api/users` - User management

## 🔐 Security Features

- CSRF protection
- Input validation
- XSS prevention
- Secure session management
- Rate limiting ready

## ⚡ Performance Optimization

- **Code Splitting**: Route-based splitting
- **Image Optimization**: Next.js Image component
- **Lazy Loading**: Dynamic imports
- **Caching**: Next.js built-in caching
- **Bundle Size**: ~250KB (gzipped)

## 📊 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📧 Support

For support, email support@eventhub.com or open an issue on GitHub.

## 🚀 Deployment

### Vercel (Recommended)
```bash
npm install -g vercel
vercel
```

### Docker
```bash
docker build -t eventhub .
docker run -p 3000:3000 eventhub
```

## 📚 Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org)
- [React Three Fiber](https://docs.pmnd.rs/react-three-fiber)

## 🎓 Learning Path

1. Start with hero section to understand 3D setup
2. Explore event planning module for form handling
3. Check registration for multi-step workflows
4. Review billing for chart integration
5. Study dashboard for real-time updates

## 🔮 Future Enhancements

- [ ] AI event recommendations
- [ ] Voice command interface
- [ ] AR/VR event previews
- [ ] Real-time collaboration features
- [ ] Advanced reporting tools
- [ ] Mobile native apps (React Native)
- [ ] GraphQL API
- [ ] Webhooks integration
- [ ] Custom themes builder
- [ ] Multi-language support

---

**Built with ❤️ for event creators worldwide**
