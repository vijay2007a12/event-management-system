# Project Structure Overview

## 📁 Complete Directory Structure

```
eventhub/
├── src/
│   ├── app/                              # Next.js App Directory
│   │   ├── layout.tsx                   # Root layout with metadata
│   │   ├── page.tsx                     # Home page (main landing)
│   │   ├── loading.tsx                  # Loading skeleton
│   │   ├── not-found.tsx                # 404 page
│   │   ├── events/
│   │   │   ├── page.tsx                # Events listing page
│   │   │   ├── create/
│   │   │   │   └── page.tsx            # Create event wizard
│   │   │   └── [id]/
│   │   │       └── page.tsx            # Event detail page
│   │   ├── planning/
│   │   │   └── page.tsx                # Event planning dashboard
│   │   ├── register/
│   │   │   └── page.tsx                # Registration page
│   │   └── dashboard/
│   │       └── page.tsx                # Admin dashboard
│   │
│   ├── components/                      # React Components
│   │   ├── Layout.tsx                  # Main layout wrapper
│   │   ├── Navbar.tsx                  # Navigation bar
│   │   ├── Footer.tsx                  # Footer component
│   │   ├── Notifications.tsx           # Toast notifications
│   │   │
│   │   ├── background/
│   │   │   └── ParticleBackground.tsx  # Canvas particle animation
│   │   │
│   │   ├── 3d/
│   │   │   └── Scene3D.tsx            # Three.js 3D scene
│   │   │
│   │   ├── hero/
│   │   │   ├── HeroSection.tsx        # Main hero section
│   │   │   └── FeaturesSection.tsx    # Feature grid showcase
│   │   │
│   │   ├── planning/
│   │   │   └── EventPlanningDashboard.tsx   # Event planning UI
│   │   │
│   │   ├── registration/
│   │   │   └── RegistrationForm.tsx   # Multi-step registration
│   │   │
│   │   ├── billing/
│   │   │   └── BillingDashboard.tsx   # Analytics & payments
│   │   │
│   │   └── dashboard/
│   │       └── (future dashboard components)
│   │
│   ├── store/                           # State Management
│   │   └── index.ts                    # Zustand store
│   │
│   ├── hooks/                           # Custom React Hooks
│   │   └── index.ts                    # Custom hooks
│   │
│   ├── types/                           # TypeScript Definitions
│   │   └── index.ts                    # Type interfaces
│   │
│   ├── lib/                             # Utilities
│   │   ├── utils.ts                    # Helper functions
│   │   └── api.ts                      # API client
│   │
│   └── styles/                          # Global Styles
│       └── globals.css                 # Tailwind + custom CSS
│
├── public/                              # Static assets
│   └── (images, fonts, etc.)
│
├── Configuration Files
│   ├── package.json                    # Dependencies & scripts
│   ├── next.config.js                  # Next.js config
│   ├── tailwind.config.js              # Tailwind customization
│   ├── tsconfig.json                   # TypeScript config
│   ├── tsconfig.node.json              # Node TypeScript config
│   ├── postcss.config.js               # PostCSS config
│   ├── .eslintrc.json                  # ESLint rules
│   ├── Dockerfile                      # Docker image
│   ├── docker-compose.yml              # Docker services
│   └── .gitignore                      # Git ignore rules
│
├── Documentation
│   ├── README.md                       # Main documentation
│   ├── SETUP.md                        # Setup guide
│   ├── DEVELOPMENT.md                  # Development guide
│   ├── PROJECT_STRUCTURE.md            # This file
│   └── .env.example                    # Environment template
│
└── node_modules/                        # Dependencies (git ignored)
```

## 🗂️ Key Files Explained

### Application Structure

**src/app/** - Next.js App Router
- Each folder represents a route
- `page.tsx` is the main component for that route
- `layout.tsx` wraps the entire app
- Dynamic routes use `[id]` syntax

**src/components/** - Reusable UI Components
- Organized by feature/section
- Accepts props for flexibility
- Include Framer Motion animations
- Use Tailwind CSS for styling

**src/store/** - Global State (Zustand)
- Centralized data management
- Event store holds all app state
- No prop drilling needed
- Async action support

**src/types/** - Type Definitions
- TypeScript interfaces
- Ensures type safety
- Shared across components
- Reduces runtime errors

**src/lib/** - Utilities
- Helper functions
- API client setup
- Reusable logic
- No UI elements

**src/styles/** - Global Styles
- Tailwind directives (@tailwind)
- Custom animations (keyframes)
- Glassmorphism utilities
- Responsive breakpoints

## 🔄 Data Flow

```
User Action
    ↓
Component (React)
    ↓
Store (Zustand)
    ↓
API (axios)
    ↓
Backend
    ↓
Database
```

## 📦 Component Hierarchy

```
Layout (wrapper)
├── Navbar
├── Main Content
│   ├── HeroSection
│   ├── FeaturesSection
│   ├── EventPlanningDashboard
│   ├── RegistrationForm
│   └── BillingDashboard
├── ParticleBackground
└── Footer
```

## 🎨 Styling Architecture

```
Global CSS (globals.css)
    ↓
Tailwind CSS Classes
    ↓
Custom Component Classes
    ↓
Framer Motion Animations
    ↓
Component Inline Styles (if needed)
```

## 📊 Data Flow Example: Creating Event

```
User fills form
    ↓
onClick → handleCreateEvent()
    ↓
Validate form data
    ↓
useEventStore.addEvent()
    ↓
Update local store
    ↓
Optional: apiClient.createEvent()
    ↓
Send to backend
    ↓
Update in database
    ↓
Show success notification
    ↓
Redirect to events list
```

## 🔧 Configuration Layers

```
Environment (.env.local)
    ↓
Next.js Config (next.config.js)
    ↓
Tailwind Config (tailwind.config.js)
    ↓
TypeScript Config (tsconfig.json)
    ↓
ESLint Config (.eslintrc.json)
    ↓
PostCSS Config (postcss.config.js)
```

## 📱 Responsive Design Strategy

```
Mobile First Approach:
    Mobile (< 640px) → Single column
        ↓
    Tablet (640px - 1024px) → 2 columns
        ↓
    Desktop (> 1024px) → 3+ columns
    ↓
    Using Tailwind breakpoints: sm, md, lg, xl
```

## 🎯 Component Creation Checklist

When creating a new component:

```
☐ Create file in appropriate folder
☐ Import necessary dependencies
☐ Define TypeScript interfaces
☐ Create component function
☐ Add Framer Motion animations
☐ Apply Tailwind CSS classes
☐ Add responsive design
☐ Export as default export
☐ Use in parent component
☐ Test in browser
☐ Check console for errors
☐ Verify on mobile
```

## 🚀 Feature Implementation Process

1. **Planning** - Define feature requirements
2. **Types** - Create TypeScript interfaces in `src/types/`
3. **Store** - Add store actions in `src/store/`
4. **API** - Create API functions in `src/lib/api.ts`
5. **Component** - Build component in `src/components/`
6. **Page** - Create page route in `src/app/`
7. **Testing** - Test locally with `npm run dev`
8. **Optimization** - Performance & accessibility check

## 📈 Scaling Guidelines

### For Small Projects
- Use current structure as-is
- Keep components simple
- Local state with useState

### For Medium Projects
- Create more specific component folders
- Use Zustand for complex state
- Split large components

### For Large Projects
- Create feature-based folders
- Use custom hooks for logic
- Implement state machines
- Add API client with interceptors
- Create shared UI component library

## 🔐 File Permissions

```
src/                    - Read/Write (development)
public/                 - Read/Write (static assets)
node_modules/           - Read only
dist/ / .next/          - Auto-generated (ignore)
```

## 📋 Naming Conventions

```
Files:
  - Components: PascalCase (Button.tsx)
  - Pages: lowercase (page.tsx, layout.tsx)
  - Utils: camelCase (helper.ts, utils.ts)
  - Styles: kebab-case (globals.css)

Variables:
  - Constants: UPPER_SNAKE_CASE
  - Variables: camelCase
  - CSS Classes: kebab-case (glass-card)
  - Components: PascalCase
```

## 🔄 Git Workflow Structure

```
Master Branch (production)
    ↓
Develop Branch (staging)
    ↓
Feature Branches (feature/my-feature)
    ↓
Bug Fix Branches (fix/my-bug)
```

## 📚 File Dependencies Map

```
page.tsx (home)
├── Layout.tsx
├── HeroSection.tsx
│   └── Scene3D.tsx
├── FeaturesSection.tsx
├── EventPlanningDashboard.tsx
├── RegistrationForm.tsx
└── BillingDashboard.tsx

All components depend on:
├── store/index.ts (Zustand)
├── types/index.ts (TypeScript)
├── styles/globals.css (Styling)
└── lib/utils.ts (Utilities)
```

## 🔌 Plugin Architecture

```
Plugins / Middleware:
├── Tailwind CSS
├── PostCSS
├── TypeScript
├── ESLint
├── Framer Motion
├── Three.js
├── Zustand
└── Axios
```

## 📦 Distribution

```
Build Process:
  npm run build
    ↓
  Creates: .next/ folder
    ↓
  Optimized production build
    ↓
  npm run start
    ↓
  Serve production build
```

## 🎓 Learning Path

1. **Basics** - Read README.md, understand features
2. **Setup** - Follow SETUP.md to install
3. **Development** - Read DEVELOPMENT.md for workflow
4. **Components** - Study HeroSection.tsx, Navbar.tsx
5. **State** - Understand Zustand in src/store/
6. **Styling** - Learn Tailwind in src/styles/
7. **Advanced** - Implement custom features

---

For more details, see:
- [README.md](./README.md) - Features & overview
- [SETUP.md](./SETUP.md) - Installation guide
- [DEVELOPMENT.md](./DEVELOPMENT.md) - Development guide
