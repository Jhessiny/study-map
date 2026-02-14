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
  4. `@/app/domain/`
  5. `@/app/application/`
  6. `@/app/infra/`
  7. `@/app/main/`
  8. `@/app/validation/`
  9. `@/app/presentation/`
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
