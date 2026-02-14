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

### 12. Initial UI components

- **Decision**: First component set — Button, Input, Card, Typography, NavigationMenu
- **Source**: shadcn/ui registry for Button, Input, Card, NavigationMenu; custom for Typography
- **Reason**: These cover the core interaction patterns needed for the app's first screens (auth, navigation, content display)
