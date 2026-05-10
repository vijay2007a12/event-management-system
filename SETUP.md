# EventHub Setup Guide

## 🚀 Installation & Setup

### Step 1: Prerequisites Check

Ensure you have the following installed:

```bash
# Check Node.js version (should be 18+)
node --version

# Check npm version (should be 9+)
npm --version

# Check git is installed
git --version
```

If not installed, download from:
- **Node.js**: https://nodejs.org (LTS version)
- **Git**: https://git-scm.com

### Step 2: Clone the Repository

```bash
git clone https://github.com/yourusername/eventhub.git
cd eventhub
```

### Step 3: Install Dependencies

```bash
# Using npm
npm install

# OR using yarn
yarn install

# OR using pnpm
pnpm install
```

This will install all required packages:
- React & Next.js
- Tailwind CSS
- Framer Motion
- Three.js
- TypeScript
- And more...

### Step 4: Environment Setup

```bash
# Copy the example environment file
cp .env.example .env.local

# Edit the environment file with your settings
# nano .env.local
```

Default `.env.local` values:
```env
NEXT_PUBLIC_API_URL=http://localhost:3001
NODE_ENV=development
```

### Step 5: Start Development Server

```bash
# Development mode (with hot reload)
npm run dev

# The app will be available at http://localhost:3000
```

### Step 6: Access the Application

Open your browser and navigate to:
```
http://localhost:3000
```

You should see the EventHub home page with:
- 3D animated hero section
- Feature showcase
- Event planning module
- Registration form
- Billing dashboard

## 📋 Project Initialization

### First-time Setup Checklist

- [ ] Node.js 18+ installed
- [ ] Repository cloned
- [ ] Dependencies installed (`npm install`)
- [ ] `.env.local` file created
- [ ] Dev server running (`npm run dev`)
- [ ] Browser shows home page
- [ ] No console errors

### Verify Installation

Check the following console output:
```
ready - started server on 0.0.0.0:3000, url: http://localhost:3000
```

### Test Features

1. **Hero Section**
   - 3D sphere should be visible
   - Animations should be smooth
   - Stats counters visible

2. **Navigation**
   - Click menu items to navigate
   - Mobile menu works
   - Responsive design

3. **Event Planning**
   - Create event button works
   - Form validates input
   - Events appear in list

4. **Registration**
   - Multi-step form loads
   - QR code generates
   - Confirmation shows

5. **Dashboard**
   - Charts render
   - Stats display
   - Analytics visible

## 🔧 Configuration Files

### Key Configuration Files

1. **next.config.js** - Next.js configuration
2. **tailwind.config.js** - Tailwind CSS customization
3. **tsconfig.json** - TypeScript configuration
4. **postcss.config.js** - PostCSS plugins

### Modifying Configuration

**To add new Tailwind colors:**
```js
// tailwind.config.js
theme: {
  extend: {
    colors: {
      'custom-color': '#FF0000',
    },
  },
},
```

**To add new environment variable:**
```env
# .env.local
NEXT_PUBLIC_NEW_VAR=value
```

## 📦 Build & Deployment

### Build for Production

```bash
# Create optimized production build
npm run build

# Start production server
npm run start
```

### Build Output

```
✓ Compiled successfully
  ✓ Linting and type checking passed
  ✓ Generating optimized production build
  ✓ Collecting build statistics
```

### Check Bundle Size

```bash
npm run build

# To analyze bundle
npm run build -- --analyze
```

## 🐳 Docker Setup

### Using Docker

```bash
# Build Docker image
docker build -t eventhub .

# Run container
docker run -p 3000:3000 eventhub
```

### Using Docker Compose

```bash
# Start all services (app + MongoDB)
docker-compose up

# Stop services
docker-compose down
```

## 🗄️ Database Setup (MongoDB)

### Local MongoDB

```bash
# Using Docker
docker run -d \
  -p 27017:27017 \
  -e MONGO_INITDB_ROOT_USERNAME=admin \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo:latest

# Connect string: mongodb://admin:password@localhost:27017/eventhub
```

### Update Connection

In `.env.local`:
```env
DATABASE_URL=mongodb://admin:password@localhost:27017/eventhub
```

## 🔌 API Integration

### Backend API Setup

The app expects API endpoints at `NEXT_PUBLIC_API_URL`:

```
Base URL: http://localhost:3001/api

Available endpoints:
- GET    /events
- POST   /events
- GET    /events/:id
- PUT    /events/:id
- DELETE /events/:id

- GET    /registrations
- POST   /registrations

- GET    /payments
- POST   /payments

- GET    /analytics/:eventId
```

### Sample Backend (Node.js/Express)

```javascript
// Simple backend stub
const express = require('express');
const app = express();

app.use(express.json());

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

// Endpoints
app.get('/api/events', (req, res) => {
  res.json([]);
});

app.listen(3001, () => {
  console.log('Backend running on http://localhost:3001');
});
```

## ⚙️ Advanced Configuration

### Enable Development Tools

```bash
# Debug logs
DEBUG=eventhub:* npm run dev

# Type checking during build
npm run type-check

# Lint checking
npm run lint
```

### Performance Optimization

```bash
# Analyze bundle
npm run build -- --analyze

# Check Performance metrics
npm run build

# Test on slow 3G
# DevTools → Network → Throttling → Slow 3G
```

### Browser Testing

1. **Chrome DevTools**
   - Open: F12 or Cmd+Option+I
   - Check Console, Network, Performance

2. **Mobile Testing**
   - Toggle device toolbar: Ctrl+Shift+M
   - Test on various screen sizes

3. **Performance**
   - Lighthouse audit
   - PageSpeed Insights

## 🆘 Troubleshooting

### Common Issues

**Port 3000 already in use:**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Or use different port
npm run dev -- -p 3001
```

**Module not found errors:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
```

**Build errors:**
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

**3D rendering issues:**
```bash
# Check Three.js version
npm list three

# Update if needed
npm update three @react-three/fiber
```

**Type errors:**
```bash
# Run type check
npm run type-check

# Generate types
npm install
```

## 📚 Additional Resources

### Documentation
- [Next.js Docs](https://nextjs.org/docs)
- [React Docs](https://react.dev)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/introduction)
- [Three.js](https://threejs.org/docs)

### Development
- [Development Guide](./DEVELOPMENT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### Support
- GitHub Issues: Report bugs
- Discussions: Ask questions
- Email: support@eventhub.com

## ✅ Verification Steps

After setup, verify everything works:

1. **Homepage loads**
   ```bash
   Open http://localhost:3000
   ```

2. **3D animation works**
   - Check 3D sphere renders
   - Particles animate
   - No WebGL errors

3. **Navigation works**
   - Click navbar links
   - Pages load correctly
   - Mobile menu works

4. **Forms work**
   - Create event
   - Register attendee
   - Form validation

5. **No console errors**
   - Open DevTools (F12)
   - Check Console tab
   - No red errors

## 🎉 Success!

If you see:
- ✅ Homepage with 3D animations
- ✅ All navigation working
- ✅ Forms functional
- ✅ No console errors
- ✅ Responsive on mobile

**Congratulations! EventHub is successfully set up!**

## 📞 Need Help?

- Check [DEVELOPMENT.md](./DEVELOPMENT.md) for development tips
- Review [README.md](./README.md) for features overview
- Create GitHub issue for bugs
- Email support@eventhub.com for questions

---

Happy event managing! 🚀
