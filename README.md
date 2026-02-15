# StudyFlow

> A visual-first collaborative study platform that helps students organize knowledge through interactive concept mapping

**Status**: 🚧 In Development

---

## 🎯 The Problem

Students struggle to organize study materials scattered across Google Drive, PDFs, bookmarks, and notes. This fragmentation makes it hard to:

- See how concepts connect and build on each other
- Find the right resource when studying a specific topic
- Collaborate effectively with study groups
- Identify knowledge gaps that need more focus

## 💡 The Solution

StudyFlow provides a visual knowledge hierarchy where students can:

- **Map their courses** in an interactive, zoomable canvas
- **Attach resources** (PDFs, videos, links) directly to topics
- **Ask questions** and vote on what matters most
- **See the big picture** while diving into details

---

## ✨ Planned Features

### Phase 1: Core (Weeks 1-3)

- [x] Visual knowledge map with zoom-based navigation (Arc view)
- [ ] Concept CRUD operations
- [ ] User authentication & profiles
- [x] Basic navigation and routing

### Phase 2: Content (Weeks 4-5)

- [ ] Learning objectives per concept
- [ ] Resource attachments (files & links)
- [ ] PDF preview and video embeds
- [ ] Rich text editing

### Phase 3: Community (Weeks 6-7)

- [ ] Question board
- [ ] Community voting system
- [ ] Question filtering and sorting

### Phase 4: Discovery (Week 8)

- [ ] Global search
- [ ] Mobile responsive design
- [ ] Performance optimization

---

## 🏗️ Technical Architecture

### Tech Stack

**Frontend**

- React 19 + TypeScript
- Vite (build tool)
- React Router v6
- Tailwind CSS + shadcn/ui
- React Flow (visual canvas)
- TanStack Query (data fetching)

**Backend & Services**

- Supabase (auth, database, storage)

**Deployment**

- Vercel

### Architecture Pattern

This project follows **Clean Architecture** principles adapted for frontend:

```
domain/          → Business entities and rules
application/     → Use cases and business logic
infrastructure/  → External services (Supabase)
presentation/    → React components and UI
```

**Why Clean Architecture?**

- Separation of concerns: UI changes don't affect business logic
- Testability: Core logic can be tested without React
- Flexibility: Can swap Supabase for another backend without rewriting use cases
- Scalability: Clear patterns for adding new features

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/Jhessiny/studyflow.git
cd studyflow

# Install dependencies
pnpm install

# Set up environment variables
cp .env.example .env
# Add your Supabase credentials to .env

# Run development server
pnpm run dev
```

### Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## 📁 Project Structure

```
src/
├── domain/              # Business entities & repository interfaces
├── application/         # Use cases (business operations)
├── infrastructure/      # Supabase implementations & factories
├── presentation/        # React components, pages, hooks
└── shared/             # Common utilities & types
```

See [Architecture Documentation](./docs/architecture.md) for detailed structure.

---

## 🧪 Development Workflow

### Available Scripts

```bash
pnpm run dev          # Start development server
pnpm run build        # Build for production
pnpm run preview      # Preview production build
pnpm run test         # Run tests
pnpm run lint         # Lint code
pnpm run type-check   # TypeScript type checking
```

### Git Workflow

- `main` branch: Production-ready code
- `develop` branch: Integration branch
- Feature branches: `feature/concept-map`, `feature/auth`, etc.

### Commit Convention

We follow [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add concept creation modal
fix: resolve zoom bug on mobile
docs: update architecture documentation
refactor: extract concept validation logic
test: add use case tests for voting
```

---

## 🎨 Design System

- **Colors**: TBD (following Tailwind defaults for MVP)
- **Typography**: Inter font family
- **Components**: Built with shadcn/ui
- **Theme**: Light/dark mode support

---

## 📊 Technical Decisions

### Why Vite instead of Next.js?

Since StudyFlow is entirely behind authentication, there's no SEO benefit to server-side rendering. Vite's instant HMR and simpler architecture lets us iterate faster on the interactive knowledge map and UX, which are the core product differentiators.

### Why React Flow?

After evaluating custom D3.js implementation vs. React Flow, we chose React Flow for:

- Out-of-box zoom/pan interactions
- Performance with 1000+ nodes
- React-first API (easier integration)
- Active community and documentation

### Why Supabase?

Supabase provides authentication, PostgreSQL database, real-time subscriptions, and file storage in one platform. This eliminates weeks of backend development and lets us focus on the unique product experience.

---

## 🗺️ Roadmap

### MVP (Target: 6 weeks)

- Visual knowledge map
- Resource attachments
- Question board with voting
- Search functionality

### Post-MVP

- Progress tracking (checkmarks per topic)
- Study session timer
- Export study guides as PDF
- Mobile app (React Native)
- AI-generated flashcards from learning objectives
- Spaced repetition reminders

---

## 🤝 Contributing

This is currently a solo portfolio project, but feedback and suggestions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details

---

## 👤 Author

**Your Name**

- Portfolio: [yourportfolio.com](https://yourportfolio.com)
- LinkedIn: [linkedin.com/in//jhessiny-mattos](https://linkedin.com/in//jhessiny-mattos)
- GitHub: [@Jhessiny](https://github.com/Jhessiny)

---

## 🙏 Acknowledgments

- Inspired by tools like Notion, Obsidian, and Quizlet
- Built with the amazing [shadcn/ui](https://ui.shadcn.com/) component library
- Powered by [Supabase](https://supabase.com/)

---

**Note**: This project is under active development. Features and documentation will be updated as progress is made.
