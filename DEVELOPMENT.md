# Development Guide

## Quick Start

### Prerequisites
- Node.js 18+ (download from [nodejs.org](https://nodejs.org))
- npm 9+ or yarn 3+
- Git

### Setup

1. **Clone repository**
```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
```

2. **Install dependencies**
```bash
npm install
# or
yarn install
```

3. **Environment setup**
```bash
cp .env.example .env.local
# Edit .env.local with your configuration
```

4. **Start development server**
```bash
npm run dev
# or
yarn dev
```

5. **Open in browser**
```
http://localhost:3000
```

## Development Workflow

### Project Structure Overview

```
src/
├── app/              # Next.js app routes
├── components/       # React components
├── store/           # State management
├── hooks/           # Custom hooks
├── types/           # TypeScript definitions
├── styles/          # Global styles
└── lib/             # Utilities
```

### Common Commands

```bash
# Development server
npm run dev

# Build for production
npm run build

# Start production server
npm run start

# Lint code
npm run lint

# Type check
npm run type-check
```

### Component Development

1. Create component in `src/components/`
2. Import necessary dependencies (React, Framer Motion, etc.)
3. Use TypeScript for type safety
4. Add proper animations with Framer Motion
5. Test responsive design

Example component:
```tsx
'use client';

import React from 'react';
import { motion } from 'framer-motion';

const MyComponent = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="p-6 glass-card rounded-lg"
    >
      <h1 className="text-2xl font-bold">Hello World</h1>
    </motion.div>
  );
};

export default MyComponent;
```

### Styling Guidelines

- Use Tailwind CSS utility classes
- Custom colors: `text-purple-600`, `bg-cyan-500`
- Glass effect: `glass-card`, `glass-card-light`
- Neon glow: `shadow-neon-purple`, `shadow-neon-blue`
- Animations: `animate-float`, `animate-glow`, `animate-pulse-glow`

### Animation Patterns

**Fade in on scroll:**
```tsx
initial={{ opacity: 0 }}
whileInView={{ opacity: 1 }}
viewport={{ once: true }}
```

**Hover effect:**
```tsx
whileHover={{ scale: 1.05, y: -10 }}
whileTap={{ scale: 0.95 }}
```

**Stagger children:**
```tsx
variants={containerVariants}
initial="hidden"
animate="visible"
```

## API Integration

### Setting up API calls

1. Create API client in `src/lib/api.ts`
2. Use axios for HTTP requests
3. Handle errors with try-catch
4. Update store on successful response

Example:
```tsx
import axios from 'axios';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};
```

## State Management

Using Zustand for global state:

```tsx
import { useEventStore } from '@/store';

export default function MyComponent() {
  const { events, addEvent } = useEventStore();
  
  return (
    <div>
      {events.map(event => (
        <div key={event.id}>{event.title}</div>
      ))}
    </div>
  );
}
```

## Testing

### Manual Testing Checklist

- [ ] Hero section loads with 3D elements
- [ ] Navigation works on all pages
- [ ] Forms validate input correctly
- [ ] Animations smooth on desktop
- [ ] Mobile responsiveness looks good
- [ ] Dark theme applies correctly
- [ ] 3D scene renders without console errors

### Browser DevTools

- Check Network tab for API calls
- Monitor Console for errors
- Use Performance tab for optimization
- Test responsive design in Device Emulation

## Debugging

### Enable debugging
```bash
DEBUG=eventhub:* npm run dev
```

### Console logging
```tsx
console.log('Debug:', variable);
console.error('Error:', error);
console.time('label'); // measure performance
```

### React DevTools
- Install React DevTools browser extension
- Inspect component hierarchy
- Check props and state

## Performance Optimization

### Tips
- Lazy load 3D components
- Use Next.js Image component
- Split code with dynamic imports
- Monitor bundle size
- Optimize animations (use transform, opacity)

### Check bundle size
```bash
npm install --save-dev @next/bundle-analyzer
npm run analyze
```

## Deployment

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

### Environment variables in production
Set in your hosting platform:
- `NEXT_PUBLIC_API_URL`
- `STRIPE_SECRET_KEY`
- Other sensitive keys

## Troubleshooting

### Port already in use
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9
# or change port
npm run dev -- -p 3001
```

### Dependencies issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules
npm install
```

### Build errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### 3D rendering issues
- Check Three.js version compatibility
- Ensure GPU acceleration enabled
- Test on different browser/OS
- Check WebGL support

## Git Workflow

```bash
# Create feature branch
git checkout -b feature/my-feature

# Make changes and commit
git add .
git commit -m "Add feature description"

# Push to remote
git push origin feature/my-feature

# Create Pull Request on GitHub
```

## Resources

- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion)
- [Three.js](https://threejs.org/docs)

## Support

For issues or questions:
1. Check existing GitHub issues
2. Create new issue with details
3. Join Discord community (if available)
4. Email: dev@eventhub.com

---

Happy coding! 🚀
