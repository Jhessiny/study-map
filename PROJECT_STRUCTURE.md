# Project Structure — React Clean Architecture Boilerplate

> React 19 + TypeScript 5.9 + Vite 7 with Clean Architecture, dependency injection via React Context, and conventional commits.

---

## Tech Stack

| Category      | Tool                             |
| ------------- | -------------------------------- |
| Framework     | React 19, TypeScript 5.9         |
| Build         | Vite 7                           |
| Routing       | React Router 7                   |
| Styling       | Tailwind CSS 4, shadcn/ui        |
| Data fetching | TanStack Query 5                 |
| Icons         | Lucide React                     |
| Backend       | Supabase                         |
| Testing       | Vitest                           |
| Linting       | ESLint 9 (flat config), Prettier |
| Git hooks     | Husky, lint-staged, commitlint   |

---

## Directory Layout

```
src/
├── main.tsx                          # Entry point — renders App inside AppProvider
├── App.tsx                           # RouterProvider wrapper
├── index.css                         # Global styles + Tailwind imports
│
├── domain/                           # Layer 1 — Business entities & interfaces
│   ├── entities/
│   │   ├── user.ts                   # User type
│   │   ├── subject.ts                # Subject type (tree structure)
│   │   └── role.ts                   # Role union type
│   └── repositories/
│       ├── auth-repository.ts        # AuthRepository interface
│       └── subject-repository.ts     # SubjectRepository interface
│
├── application/                      # Layer 2 — Use cases
│   └── use-cases/
│       ├── auth/
│       │   ├── get-session.ts
│       │   ├── sign-in.ts
│       │   ├── sign-up.ts
│       │   └── sign-out.ts
│       └── subject/
│           └── get-subject-tree.ts
│
├── infrastructure/                   # Layer 3 — External services & implementations
│   ├── api/
│   │   ├── supabase-client.ts        # Supabase client init
│   │   ├── map-auth-error.ts         # AuthError → DomainError
│   │   └── map-postgrest-error.ts    # PostgREST → DomainError
│   ├── factories/
│   │   ├── make-auth-repository.ts   # Returns SupabaseAuthRepository
│   │   └── make-subject-repository.ts
│   └── repositories/
│       ├── supabase-auth-repository.ts
│       └── mock-subject-repository.ts
│
├── main/                             # Layer 4 — Composition root (DI wiring)
│   ├── contexts/
│   │   ├── auth-context.ts           # React Context for auth use cases
│   │   └── subject-context.ts
│   └── providers/
│       ├── app-provider.tsx          # Wraps app with all providers
│       ├── auth-provider.tsx         # Instantiates auth use cases
│       └── subject-provider.tsx
│
├── presentation/                     # Layer 5 — React UI
│   ├── components/
│   │   ├── ui/                       # shadcn/ui primitives
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   ├── avatar.tsx
│   │   │   ├── badge.tsx
│   │   │   ├── tabs.tsx
│   │   │   ├── navigation-menu.tsx
│   │   │   └── typography.tsx
│   │   ├── layout/
│   │   │   ├── app-layout.tsx        # Navbar + Outlet + Footer
│   │   │   ├── navbar.tsx
│   │   │   └── footer.tsx
│   │   └── features/                 # Feature-specific components
│   │       ├── overview/
│   │       └── subject/
│   ├── hooks/
│   │   ├── query-keys.ts             # TanStack Query key factory
│   │   ├── use-auth.ts               # Auth hooks (useSession, useSignIn, etc.)
│   │   └── use-subjects.ts
│   ├── pages/
│   │   ├── login-page.tsx
│   │   ├── overview/
│   │   │   ├── overview-page.tsx
│   │   │   └── mock-data.ts
│   │   └── arc/                      # Zoom-based subject tree
│   │       ├── arc-page.tsx
│   │       ├── types.ts
│   │       ├── mock-arc-data.ts
│   │       ├── components/
│   │       ├── helpers/
│   │       └── hooks/
│   └── routes/
│       └── router.tsx
│
├── shared/                           # Cross-layer utilities
│   ├── errors/
│   │   ├── domain-error.ts           # Abstract base class
│   │   ├── invalid-credentials-error.ts
│   │   ├── access-denied-error.ts
│   │   ├── not-found-error.ts
│   │   ├── validation-error.ts
│   │   └── unexpected-error.ts
│   ├── types/
│   │   ├── response.ts              # Response<T> = Either<DomainError, T>
│   │   └── database.ts
│   └── utils/
│       ├── either.ts                 # Either monad (Left/Right)
│       └── query-adapter.ts          # Either → TanStack Query bridge
│
└── lib/
    └── utils.ts                      # cn() helper (clsx + tailwind-merge)
```

---

## Architecture — Dependency Flow

```
presentation → main → application → domain
                 ↓
           infrastructure → domain
```

- **domain/** — Pure types and interfaces. No imports from other layers.
- **application/** — Use case classes. Depend only on domain interfaces.
- **infrastructure/** — Implements domain interfaces (Supabase, mocks). Knows about external libraries.
- **main/** — Composition root. The only layer that crosses boundaries — imports from both infrastructure and application to wire dependencies via React Context.
- **presentation/** — React components and hooks. Consumes use cases from context, never imports infrastructure directly.
- **shared/** — Error types and utilities used across all layers.

---

## Dependency Injection

```
main.tsx
  └─ AppProvider
       ├─ QueryClientProvider          (TanStack Query)
       ├─ AuthProvider                 (wires auth use cases)
       │   factory → repository → use cases → context
       └─ SubjectProvider              (wires subject use cases)
```

**Provider pattern:**

```tsx
// main/providers/auth-provider.tsx
const repository = makeAuthRepository() // infrastructure factory
const useCases = {
  getSession: new GetSession(repository), // application use case
  signIn: new SignIn(repository)
}
return <AuthContext value={useCases}>{children}</AuthContext>
```

**Consuming in presentation:**

```tsx
// presentation/hooks/use-auth.ts
const { signIn } = useContext(AuthContext)
return useMutation({
  mutationFn: (params) => queryAdapter(signIn.execute(params))
})
```

---

## Error Handling — Either Monad

Repositories return `Response<T>` instead of throwing:

```tsx
type Response<T> = Either<DomainError, T>

// In repository:
if (error) return left(new InvalidCredentialsError())
return right(user)

// In query adapter (bridges to TanStack Query):
const response = await promise
if (response.isLeft()) throw response.value // TanStack Query catches this
return response.value
```

---

## Code Style

### Prettier

```json
{
  "semi": false,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "trailingComma": "none",
  "printWidth": 80,
  "tabWidth": 2
}
```

### ESLint Import Order

Enforced groups with blank lines between them:

1. `react`
2. External packages
3. `@/domain/`
4. `@/application/`
5. `@/infrastructure/`
6. `@/main/`
7. `@/shared/`
8. `@/presentation/`
9. Relative imports

### Conventional Commits

Enforced by commitlint + husky:

```
feat: add login page
fix: resolve session expiry bug
docs: update architecture docs
refactor: extract validation logic
chore: update dependencies
test: add sign-in use case tests
```

---

## Git Hooks (Husky + lint-staged)

**pre-commit:**

- `*.{ts,tsx}` → `eslint --fix` → `prettier --write` → `vitest related --run`
- `*.{css,json,md}` → `prettier --write`

**commit-msg:**

- `commitlint --edit` (validates conventional commit format)

---

## Key Patterns

### Use Case Class

```tsx
class SignIn {
  constructor(private readonly repository: AuthRepository) {}

  async execute(params: SignInParams): Promise<Response<User>> {
    return this.repository.signInWithEmail(params)
  }
}
```

### Query Key Factory

```tsx
export const authKeys = {
  session: ['auth', 'session'] as const
}
export const subjectKeys = {
  tree: ['subjects', 'tree'] as const
}
```

### shadcn/ui Components

Components live in `presentation/components/ui/` (not a package). They use:

- **Radix UI** for accessible headless primitives
- **CVA** (class-variance-authority) for variant management
- **cn()** utility (`clsx` + `tailwind-merge`) for conditional classes

---

## Scripts

```bash
pnpm dev              # Start dev server
pnpm build            # Type check + production build
pnpm lint             # ESLint check
pnpm lint:fix         # ESLint auto-fix
pnpm format           # Prettier format all
pnpm test             # Run tests once
pnpm test:watch       # Run tests in watch mode
pnpm preview          # Preview production build
```

---

## Environment Variables

```env
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## Path Alias

`@/*` → `src/*` — configured in both `tsconfig.app.json` and `vite.config.ts`.

```tsx
import { User } from '@/domain/entities/user'
import { useAuth } from '@/presentation/hooks/use-auth'
```
