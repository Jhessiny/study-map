# Study Map - Decision Log

## 2026-02-14

### 1. Project scaffolding

- **Decision**: React 19 + TypeScript 5.9 + Vite 7.3 with pnpm as package manager
- **Reason**: Modern, fast toolchain with first-class TypeScript support

### 2. Styling: Tailwind CSS v4

- **Decision**: Tailwind CSS v4 via `@tailwindcss/vite` plugin
- **Reason**: Utility-first CSS with native Vite integration, no PostCSS config needed in v4

### 3. Code style

- **Decision**: Prettier + ESLint 9 (flat config)
- **Prettier rules**: no semicolons, single quotes, JSX single quotes, no trailing commas, 2-space indentation
- **ESLint plugins**: `typescript-eslint`, `react-hooks`, `react-refresh`, `import`, `prettier`
- **Reason**: Consistent formatting enforced automatically, Prettier handles style while ESLint handles logic

### 4. Import ordering (ESLint enforced)

- **Decision**: Strict import groups with newlines between them:
  1. `react`
  2. Node modules
  3. `@/store/`
  4. `@/domain/`
  5. `@/application/`
  6. `@/infra/`
  7. `@/main/`
  8. `@/validation/`
  9. `@/presentation/`
  10. Relative (parent, sibling, index)
- **Reason**: Makes dependency direction visible at a glance, reinforces clean architecture boundaries

### 5. Path alias

- **Decision**: `@/*` maps to `src/*` (configured in `tsconfig.app.json` + `vite.config.ts`)
- **Reason**: Avoids deep relative imports (`../../../`), cleaner and easier to refactor

### 6. Project structure (Clean Architecture)

- **Decision**: Layered folder structure under `src/`:
  - `domain/` — entities, repository interfaces
  - `application/` — use cases (concept, resource, question, auth)
  - `infrastructure/` — API clients, repository implementations, storage
  - `presentation/` — components (ui, features, layout), pages, hooks, routes
  - `shared/` — types, utils, constants, errors
- **Reason**: Separation of concerns, inner layers have no dependency on outer layers

### 7. Pre-commit hooks

- **Decision**: Husky + lint-staged
  - `*.{ts,tsx}`: `eslint --fix` → `prettier --write` → `vitest related --run`
  - `*.{css,json,md}`: `prettier --write`
- **Reason**: Catch issues before they reach the repo, run only related tests for speed

### 8. Commit message validation

- **Decision**: Commitlint with `@commitlint/config-conventional`
- **Rejected**: `git-commit-msg-linter` (compatibility bug with newer Git versions)
- **Reason**: Enforces conventional commits (`feat:`, `fix:`, `chore:`, etc.) for readable history and potential automated changelogs

### 9. Component library: shadcn/ui

- **Decision**: Use shadcn/ui (new-york style, Lucide icons) as the base component library
- **Component path**: `src/presentation/components/ui/` (aligned with clean architecture)
- **Utilities**: `src/lib/utils.ts` (`cn` helper via clsx + tailwind-merge)
- **Reason**: Shadcn provides unstyled, composable primitives built on Radix UI — components live in the codebase (not a package), allowing full customization to match the design system

### 10. Design system theme integration

- **Decision**: Override shadcn's default CSS variables with the design system palette
  - **Primary**: Deep Teal (`#14B8A6` / `#2DD4BF` dark)
  - **Secondary**: Powder Blush (`#FFA69E` / `#FF8A80` dark)
  - **Accent**: Eggshell (`#FAF3DD`) / Blue Slate dark (`#383E49`)
  - **Destructive**: Error red (`#EF4444`)
  - **Ring/focus**: Primary teal for focus indicators
- **Reason**: Keeps shadcn's architecture while matching the brand personality (light, playful, energetic)

### 11. Typography system

- **Decision**: Custom `Typography` component with variant-based rendering
  - **Heading font**: Plus Jakarta Sans (loaded via Google Fonts)
  - **Body font**: Inter
  - **Code font**: JetBrains Mono
  - **Variants**: h1, h2, h3, h4, p, lead, large, small, muted, caption, label
  - **Auto tag mapping**: variant determines the semantic HTML element (h1→`<h1>`, p→`<p>`, etc.)
- **Reason**: Enforces typographic consistency, maps to the design system's Major Third (1.250) type scale

### 12. Auth use cases in application layer

- **Decision**: Add `GetSession`, `SignIn`, `SignUp`, `SignOut` use case classes in `application/use-cases/auth/`, each accepting `AuthRepository` via constructor injection; wire them through `infrastructure/factories/make-auth-use-cases.ts`; update `presentation/hooks/use-auth.ts` to consume use cases instead of the repository directly
- **Reason**: Presentation hooks were importing `makeAuthRepository` directly from infrastructure, bypassing the application layer. This violates the clean architecture dependency flow (`presentation → application → domain`). Use cases provide a single-method boundary that keeps the hook layer decoupled from repository details

### 13. Composition root in `main/` layer with React Context DI

- **Decision**: Introduce a `main/` layer as the composition root. `main/providers/` wires infrastructure factories with application use cases and provides them to the component tree via React Context. `main/contexts/` defines typed contexts for each service domain. Presentation hooks consume use cases from context via `useContext`, depending only on application-layer types. Deleted `infrastructure/factories/make-auth-use-cases.ts` — wiring moved to `AuthProvider`.
- **Reason**: `presentation/hooks/use-auth.ts` was importing `makeAuthUseCases` directly from `infrastructure/factories/`, creating a dependency from presentation to infrastructure. The `main/` composition root pattern keeps the dependency graph clean: `main/` is the only layer that crosses boundaries (importing from both infrastructure and application), while presentation depends only on context and application-layer types.

### 14. Initial UI components

- **Decision**: First component set — Button, Input, Card, Typography, NavigationMenu
- **Source**: shadcn/ui registry for Button, Input, Card, NavigationMenu; custom for Typography
- **Reason**: These cover the core interaction patterns needed for the app's first screens (auth, navigation, content display)

### 15. Rename "concept" to "subject"

- **Decision**: Rename the primary content entity from `Concept` to `Subject` across all layers (domain, application, infrastructure, main, presentation)
- **Affected**: entity types, repository interfaces, use cases, factories, mock repositories, contexts, providers, hooks, query keys, components, pages
- **Reason**: "Subject" better reflects the domain language — users study _subjects_ (Mathematics, Computer Science), not abstract "concepts"

### 16. Environment configuration

- **Decision**: Add `.env.example` with `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY`; update `.gitignore` with `.env`, `.env.local`, `.env.*.local`
- **Reason**: Prevent accidental commit of secrets while documenting required env vars

### 17. Subject domain and infrastructure layers

- **Decision**: Implement `Subject` entity with tree structure (parentId, level, order, metadata), `SubjectRepository` interface with `getTree()`, `GetSubjectTree` use case, factory function, and `MockSubjectRepository` with hierarchical sample data
- **Reason**: Establishes the full vertical slice for subjects following clean architecture — from domain entity through infrastructure, ready for Supabase swap later

### 18. Additional shadcn UI components

- **Decision**: Add Avatar, Badge, and Tabs components from shadcn/ui registry
- **Reason**: Required by the overview page (member avatars, role badges, tabbed content views)

### 19. App layout and navigation

- **Decision**: Create `AppLayout` (Outlet-based layout), `Navbar` (brand + navigation links), and `Footer` components
- **Reason**: Provides consistent app shell for all routes

### 20. Client-side routing with react-router-dom

- **Decision**: Use `createBrowserRouter` with routes: `/login`, `/content-tree`, `/overview`, default redirect to `/login`
- **Layout**: All routes wrapped in `AppLayout` via nested route with `<Outlet />`
- **Entry point**: `App.tsx` renders `<RouterProvider>`, `main.tsx` wraps with `<AppProvider>`
- **Reason**: Enables SPA navigation; layout route pattern keeps header/footer consistent

### 21. Login page

- **Decision**: Static login form with email/password inputs, password visibility toggle, and sign-up link
- **UI**: Uses Card, Input, Button, Typography components; Lucide icons for input decorators
- **Reason**: First screen users see; form wiring to auth hooks will come when backend is connected

### 22. Content tree page with @xyflow/react

- **Decision**: Interactive tree visualization using ReactFlow with custom `SubjectNode` component, hierarchical layout algorithm, and zoom/pan controls
- **Layout algorithm**: Recursive `layoutSubtree` divides available space by `SCALE_FACTOR` for each level
- **Reason**: Core feature — visual subject map showing hierarchical relationships

### 23. Overview page with members and subjects tabs

- **Decision**: Tabbed page showing study group members and subjects with search, stat cards, and mock data
- **Components**: `StatCard`, `SubjectCard`, `MemberCard` in `features/overview/`
- **Mock data**: Inline in `pages/overview/mock-data.ts` with typed `Member` and `Subject` definitions
- **Reason**: Dashboard-style view for group collaboration; mock data enables UI development before backend

### 24. Arc zoom navigation (replaces content tree)

- **Decision**: Replace the static content tree with an interactive zoom-based subject tree ("Arc view") using React Flow. The tree renders a 5-8-8-8 hierarchy (~2,925 subjects) with viewport virtualization — only nodes within the visible zoom range are materialized (~200-400 in DOM at any time)
- **Structure**: `pages/arc/` with types, mock data, helpers (layout, build-node), hooks (use-zoom-level, use-visible-nodes), and node components (subject-card, subject-article, topic-label, arc-header)
- **Layout**: Precomputed `LAYOUTS[]` array with `BASE_SIZE = 35520`, each child level ~1/10th of parent. Threshold-based level detection maps zoom to `[minLevel, maxLevel]` range
- **Node types**: `subjectCard` (image/icon + gradient + title), `subjectArticle` (detail card with topics), `topicLabel` (large uppercase category), `arcHeader` (centered title + subtitle)
- **Icons**: Lucide icon names stored as kebab-case strings, converted to PascalCase at build-node time for type-safe lookup
- **Mock data**: Computer Science root with 5 broad categories (Foundations & Theory, Systems & Infrastructure, AI, Software Engineering, Security & Privacy), 8 children per node, auto-generated level 3
- **Reason**: Zoom-based navigation lets users explore a deep subject hierarchy without pagination or drilling — zoom in to see children, zoom out to see the big picture. Virtualization keeps DOM size manageable regardless of tree depth
