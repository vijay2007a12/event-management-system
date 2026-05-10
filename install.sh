#!/bin/bash

# EventHub Installation Script
# Run this script to set up EventHub automatically

set -e

echo "🚀 EventHub Installation Script"
echo "================================"
echo ""

# Check Node.js
echo "✓ Checking Node.js..."
if ! command -v node &> /dev/null; then
    echo "❌ Node.js not found. Please install Node.js 18+"
    exit 1
fi
NODE_VERSION=$(node -v)
echo "  Found: $NODE_VERSION"
echo ""

# Check npm
echo "✓ Checking npm..."
if ! command -v npm &> /dev/null; then
    echo "❌ npm not found. Please install npm"
    exit 1
fi
NPM_VERSION=$(npm -v)
echo "  Found: $NPM_VERSION"
echo ""

# Install dependencies
echo "✓ Installing dependencies..."
npm install
echo "  ✅ Dependencies installed"
echo ""

# Create .env.local
echo "✓ Setting up environment..."
if [ ! -f .env.local ]; then
    cp .env.example .env.local
    echo "  ✅ Created .env.local"
else
    echo "  ℹ️  .env.local already exists"
fi
echo ""

# Build check
echo "✓ Verifying build..."
npm run type-check
echo "  ✅ Type check passed"
echo ""

echo "================================"
echo "✅ Installation Complete!"
echo "================================"
echo ""
echo "Next steps:"
echo ""
echo "1. Start development server:"
echo "   npm run dev"
echo ""
echo "2. Open in browser:"
echo "   http://localhost:3000"
echo ""
echo "3. Explore documentation:"
echo "   - QUICKSTART.md (5 min)"
echo "   - README.md (full guide)"
echo "   - DEVELOPMENT.md (dev guide)"
echo ""
echo "Happy coding! 🎉"
