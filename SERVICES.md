# Services Architecture

## Overview

Services follow **Clean Architecture** with strict layer separation. Each service is defined as a domain repository interface, implemented in the infrastructure layer using Supabase, wired in the `main/` composition root via React Context, and consumed through React Query hooks.

```
domain/repositories/         Interface (contract)
        |
infrastructure/repositories/ Supabase implementation
        |
infrastructure/factories/    Factory function (creates concrete repos)
        |
main/providers/              Composition root (wires repos → use cases → context)
        |
presentation/hooks/          React Query hook (consumes use cases from context)
```

The `main/` layer is the **composition root** — the only place that imports from both infrastructure and application to wire everything together. It provides use case instances to presentation via React Context.

Presentation hooks depend only on application-layer types (use case classes) and `main/contexts/` (to read context). They never import from `infrastructure/` directly.

## Base Types

### Either Pattern

All repository methods return `Either<DomainError, T>` instead of throwing exceptions.

```
src/shared/utils/either.ts
```

```ts
type Either<L, R> = Error<L, R> | Success<L, R>

class Error<L, R> {
  readonly value: L
  isError(): this is Error<L, R> {
    return true
  }
  isSuccess(): this is Success<L, R> {
    return false
  }
}

class Success<L, R> {
  readonly value: R
  isError(): this is Error<L, R> {
    return false
  }
  isSuccess(): this is Success<L, R> {
    return true
  }
}

const error = <L, R>(value: L): Either<L, R> => new Error(value)
const success = <L, R>(value: R): Either<L, R> => new Success(value)
```

### Response Type

```
src/shared/types/response.ts
```

```ts
type Response<T = unknown> = Either<DomainError, T>
```

### Domain Errors

```
src/shared/errors/
```

| Error                     | Meaning                               |
| ------------------------- | ------------------------------------- |
| `NotFoundError`           | Row not found (Supabase `PGRST116`)   |
| `AccessDeniedError`       | RLS policy denied access              |
| `InvalidCredentialsError` | Auth credentials rejected             |
| `ValidationError`         | Constraint violation or invalid input |
| `UnexpectedError`         | Catch-all for unhandled failures      |

Each error class extends a base `DomainError` with a `message` property.

## Supabase Client

A singleton `SupabaseClient` replaces the HttpClient + Axios stack. Supabase's SDK handles HTTP transport, authentication headers, and token refresh internally.

```
src/infrastructure/api/supabase-client.ts
```

```ts
import { createClient } from '@supabase/supabase-js'

import type { Database } from '@/shared/types/database'

export const supabase = createClient<Database>(
  import.meta.env.VITE_SUPABASE_URL,
  import.meta.env.VITE_SUPABASE_ANON_KEY
)
```

- **No manual JWT handling** — `GoTrueClient` manages access tokens, refresh tokens, and session persistence automatically.
- **No HTTP decorator chain** — Supabase injects the `Authorization` header on every request.
- **Type-safe queries** — The `Database` generic provides full autocompletion for tables, columns, and RPC functions.

## Error Mapping

Instead of matching HTTP status codes (the source app's `RequestResponse.handle()`), we map Supabase-specific error objects to domain errors.

### `mapPostgrestError`

```
src/infrastructure/api/map-postgrest-error.ts
```

```ts
import type { PostgrestError } from '@supabase/supabase-js'

import { error } from '@/shared/utils/either'
import {
  AccessDeniedError,
  NotFoundError,
  ValidationError,
  UnexpectedError
} from '@/shared/errors'

export const mapPostgrestError = (err: PostgrestError): DomainError => {
  switch (err.code) {
    case 'PGRST116': // "The result contains 0 rows"
      return new NotFoundError(err.message)
    case '42501': // insufficient_privilege
      return new AccessDeniedError(err.message)
    case '23505': // unique_violation
    case '23503': // foreign_key_violation
    case '23514': // check_violation
      return new ValidationError(err.message)
    default:
      return new UnexpectedError(err.message)
  }
}
```

### `mapAuthError`

```
src/infrastructure/api/map-auth-error.ts
```

```ts
import type { AuthError } from '@supabase/supabase-js'

import { InvalidCredentialsError, UnexpectedError } from '@/shared/errors'

export const mapAuthError = (err: AuthError): DomainError => {
  switch (err.status) {
    case 400: // invalid_credentials, user_not_found, etc.
    case 422: // validation failures
      return new InvalidCredentialsError(err.message)
    default:
      return new UnexpectedError(err.message)
  }
}
```

## Domain Layer — Repository Interfaces

Each entity gets **one repository interface** that groups all its operations. This replaces the source app's one-interface-per-operation pattern (`LoadX`, `AddX`, `DeleteX`).

```
src/domain/repositories/
```

```ts
// src/domain/repositories/subject-repository.ts
import type { Response } from '@/shared/types/response'
import type { Subject } from '@/domain/entities/subject'

export interface SubjectRepository {
  findAll(): Promise<Response<Subject[]>>
  findById(id: string): Promise<Response<Subject>>
  create(params: CreateSubjectParams): Promise<Response<Subject>>
  update(id: string, params: UpdateSubjectParams): Promise<Response<Subject>>
  remove(id: string): Promise<Response<void>>
}

export type CreateSubjectParams = {
  title: string
  description?: string
}

export type UpdateSubjectParams = Partial<CreateSubjectParams>
```

Naming convention: `<Entity>Repository` with standard CRUD method names (`findAll`, `findById`, `create`, `update`, `remove`). The primary content entity is `Subject` (previously called "concept").

## Infrastructure Layer — Supabase Implementations

Each repository interface gets a concrete implementation that uses the Supabase client.

```
src/infrastructure/repositories/
```

```ts
// src/infrastructure/repositories/supabase-subject-repository.ts
import { supabase } from '@/infrastructure/api/supabase-client'
import { mapPostgrestError } from '@/infrastructure/api/map-postgrest-error'
import { error, success } from '@/shared/utils/either'
import type {
  SubjectRepository,
  CreateSubjectParams
} from '@/domain/repositories/subject-repository'
import type { Subject } from '@/domain/entities/subject'

export class SupabaseSubjectRepository implements SubjectRepository {
  async findAll(): Promise<Response<Subject[]>> {
    const { data, error: err } = await supabase.from('subjects').select('*')

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async findById(id: string): Promise<Response<Subject>> {
    const { data, error: err } = await supabase
      .from('subjects')
      .select('*')
      .eq('id', id)
      .single()

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async create(params: CreateSubjectParams): Promise<Response<Subject>> {
    const { data, error: err } = await supabase
      .from('subjects')
      .insert(params)
      .select()
      .single()

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  // update and remove follow the same pattern
}
```

### Factory Functions

Factory functions create concrete repository instances. They live in `infrastructure/factories/` and are consumed by the `main/` composition root.

```
src/infrastructure/factories/
```

```ts
// src/infrastructure/factories/make-subject-repository.ts
import type { SubjectRepository } from '@/domain/repositories/subject-repository'
import { SupabaseSubjectRepository } from '@/infrastructure/repositories/supabase-subject-repository'

export const makeSubjectRepository = (): SubjectRepository => {
  return new SupabaseSubjectRepository()
}
```

Factories are intentionally simple — no IoC container, no decorators. If a repository gains dependencies later (e.g. a cache layer), the factory is the single place to wire them.

## Composition Root (`main/`)

The `main/` layer wires infrastructure (concrete repos) with application (use cases) and provides them to presentation via React Context. This is the **only layer** that imports from both infrastructure and application.

### Context

Each service domain defines a context holding its use case instances:

```
src/main/contexts/auth-context.ts
```

```ts
import { createContext } from 'react'

import type {
  GetSession,
  SignIn,
  SignUp,
  SignOut
} from '@/application/use-cases/auth'

export type AuthUseCases = {
  getSession: GetSession
  signIn: SignIn
  signUp: SignUp
  signOut: SignOut
}

export const AuthContext = createContext<AuthUseCases | null>(null)
```

### Provider

Providers create the repos and use cases, then provide them via context:

```
src/main/providers/auth-provider.tsx
```

```ts
import { GetSession, SignIn, SignUp, SignOut } from '@/application/use-cases/auth'
import { makeAuthRepository } from '@/infrastructure/factories/make-auth-repository'
import { AuthContext } from '@/main/contexts/auth-context'

const repository = makeAuthRepository()

const useCases = {
  getSession: new GetSession(repository),
  signIn: new SignIn(repository),
  signUp: new SignUp(repository),
  signOut: new SignOut(repository),
}

export const AuthProvider = ({ children }) => (
  <AuthContext value={useCases}>{children}</AuthContext>
)
```

### App Provider

`AppProvider` composes all domain providers. This is what `main.tsx` renders.

```
src/main/providers/app-provider.tsx
```

```ts
export const AppProvider = ({ children }) => (
  <AuthProvider>{children}</AuthProvider>
)
```

## React Query Integration

### Query Keys

Organize query keys by entity for easy invalidation.

```
src/presentation/hooks/query-keys.ts
```

```ts
export const subjectKeys = {
  all: ['subjects'] as const,
  detail: (id: string) => ['subjects', id] as const
}
```

### `queryAdapter`

Bridges the `Either`-based `Response<T>` to React Query's throw-on-error model. React Query expects promises to **throw** on failure, so the adapter unwraps `Either` accordingly.

```
src/shared/utils/query-adapter.ts
```

```ts
import type { Response } from '@/shared/types/response'

export const queryAdapter = async <T>(
  promise: Promise<Response<T>>
): Promise<T> => {
  const response = await promise
  if (response.isError()) throw response.value
  return response.value
}
```

> **Key difference from the source app**: RTK Query uses `{ data } | { error }` return objects. React Query uses thrown errors. The adapter is simpler here — it just throws on `Left`.

### Custom Hooks

Each entity gets custom hooks that consume use cases from context via a `useXUseCases()` helper, then combine with query adapter + React Query.

```
src/presentation/hooks/
```

```ts
// src/presentation/hooks/use-auth.ts
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { AuthContext } from '@/main/contexts/auth-context'
import { queryAdapter } from '@/shared/utils/query-adapter'
import { authKeys } from '@/presentation/hooks/query-keys'

const useAuthUseCases = () => {
  const context = useContext(AuthContext)

  if (!context) {
    throw new Error('useAuthUseCases must be used within an AuthProvider')
  }

  return context
}

export const useSession = () => {
  const { getSession } = useAuthUseCases()

  return useQuery({
    queryKey: authKeys.session,
    queryFn: () => queryAdapter(getSession.execute())
  })
}

export const useSignIn = () => {
  const { signIn } = useAuthUseCases()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: SignInParams) => queryAdapter(signIn.execute(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: authKeys.session })
    }
  })
}
```

Hooks import only from `@/main/contexts/` (to read context), `@/domain/` (param types), `@/shared/` (utilities), and `@/presentation/` (query keys). They **never** import from `@/infrastructure/`.

Error handling in components uses `error` from the query result, which will be a `DomainError` instance thrown by the adapter.

## Auth — Special Case

Auth operations use `supabase.auth.*` (GoTrueClient) instead of standard table CRUD. The `AuthRepository` interface still lives in the domain layer, but the implementation calls auth-specific methods.

```ts
// src/domain/repositories/auth-repository.ts
import type { Response } from '@/shared/types/response'
import type { User } from '@/domain/entities/user'

export interface AuthRepository {
  signInWithEmail(params: SignInParams): Promise<Response<User>>
  signUp(params: SignUpParams): Promise<Response<User>>
  signOut(): Promise<Response<void>>
  getSession(): Promise<Response<User | null>>
}

export type SignInParams = { email: string; password: string }
export type SignUpParams = { email: string; password: string }
```

```ts
// src/infrastructure/repositories/supabase-auth-repository.ts
import { supabase } from '@/infrastructure/api/supabase-client'
import { mapAuthError } from '@/infrastructure/api/map-auth-error'
import { error, success } from '@/shared/utils/either'
import type {
  AuthRepository,
  SignInParams
} from '@/domain/repositories/auth-repository'

export class SupabaseAuthRepository implements AuthRepository {
  async signInWithEmail(params: SignInParams): Promise<Response<User>> {
    const { data, error: err } = await supabase.auth.signInWithPassword({
      email: params.email,
      password: params.password
    })

    if (err) return error(mapAuthError(err))
    return success(mapSessionToUser(data.session))
  }

  // signUp, signOut, getSession follow the same pattern
}
```

**What Supabase handles automatically** (no manual code needed):

- JWT storage and refresh (replaces `AxiosRefreshTokenInterceptor`)
- Bearer token injection on requests (replaces `AuthorizeHttpClientDecorator`)
- Session persistence across tabs/reloads

## Creating a New Service (Step by Step)

### 1. Define the entity

```
src/domain/entities/<entity>.ts
```

```ts
export type Resource = {
  id: string
  subjectId: string
  title: string
  url: string
  type: 'article' | 'video' | 'book'
  createdAt: string
}
```

### 2. Define the repository interface

```
src/domain/repositories/<entity>-repository.ts
```

```ts
import type { Response } from '@/shared/types/response'
import type { Resource } from '@/domain/entities/resource'

export interface ResourceRepository {
  findBySubjectId(subjectId: string): Promise<Response<Resource[]>>
  create(params: CreateResourceParams): Promise<Response<Resource>>
  remove(id: string): Promise<Response<void>>
}

export type CreateResourceParams = {
  subjectId: string
  title: string
  url: string
  type: 'article' | 'video' | 'book'
}
```

### 3. Implement with Supabase

```
src/infrastructure/repositories/supabase-<entity>-repository.ts
```

```ts
import { supabase } from '@/infrastructure/api/supabase-client'
import { mapPostgrestError } from '@/infrastructure/api/map-postgrest-error'
import { error, success } from '@/shared/utils/either'
import type {
  ResourceRepository,
  CreateResourceParams
} from '@/domain/repositories/resource-repository'

export class SupabaseResourceRepository implements ResourceRepository {
  async findBySubjectId(subjectId: string): Promise<Response<Resource[]>> {
    const { data, error: err } = await supabase
      .from('resources')
      .select('*')
      .eq('subject_id', subjectId)

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async create(params: CreateResourceParams): Promise<Response<Resource>> {
    const { data, error: err } = await supabase
      .from('resources')
      .insert({
        subject_id: params.subjectId,
        title: params.title,
        url: params.url,
        type: params.type
      })
      .select()
      .single()

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async remove(id: string): Promise<Response<void>> {
    const { error: err } = await supabase
      .from('resources')
      .delete()
      .eq('id', id)

    if (err) return error(mapPostgrestError(err))
    return success(undefined)
  }
}
```

### 4. Create the factory

```
src/infrastructure/factories/make-<entity>-repository.ts
```

```ts
import type { ResourceRepository } from '@/domain/repositories/resource-repository'
import { SupabaseResourceRepository } from '@/infrastructure/repositories/supabase-resource-repository'

export const makeResourceRepository = (): ResourceRepository => {
  return new SupabaseResourceRepository()
}
```

### 5. Create context and provider in `main/`

```
src/main/contexts/<entity>-context.ts
src/main/providers/<entity>-provider.tsx
```

```ts
// src/main/contexts/resource-context.ts
import { createContext } from 'react'

import type {
  FindResources,
  CreateResource,
  RemoveResource
} from '@/application/use-cases/resource'

export type ResourceUseCases = {
  findResources: FindResources
  createResource: CreateResource
  removeResource: RemoveResource
}

export const ResourceContext = createContext<ResourceUseCases | null>(null)
```

```ts
// src/main/providers/resource-provider.tsx
import { FindResources, CreateResource, RemoveResource } from '@/application/use-cases/resource'
import { makeResourceRepository } from '@/infrastructure/factories/make-resource-repository'
import { ResourceContext } from '@/main/contexts/resource-context'

const repository = makeResourceRepository()

const useCases = {
  findResources: new FindResources(repository),
  createResource: new CreateResource(repository),
  removeResource: new RemoveResource(repository),
}

export const ResourceProvider = ({ children }) => (
  <ResourceContext value={useCases}>{children}</ResourceContext>
)
```

Then add the new provider to `AppProvider`:

```ts
// src/main/providers/app-provider.tsx
export const AppProvider = ({ children }) => (
  <AuthProvider>
    <ResourceProvider>{children}</ResourceProvider>
  </AuthProvider>
)
```

### 6. Create query keys and hooks

```
src/presentation/hooks/use-<entity>.ts
```

```ts
import { useContext } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { ResourceContext } from '@/main/contexts/resource-context'
import { queryAdapter } from '@/shared/utils/query-adapter'

const useResourceUseCases = () => {
  const context = useContext(ResourceContext)

  if (!context) {
    throw new Error(
      'useResourceUseCases must be used within a ResourceProvider'
    )
  }

  return context
}

export const resourceKeys = {
  bySubject: (subjectId: string) => ['resources', subjectId] as const
}

export const useResources = (subjectId: string) => {
  const { findResources } = useResourceUseCases()

  return useQuery({
    queryKey: resourceKeys.bySubject(subjectId),
    queryFn: () => queryAdapter(findResources.execute(subjectId))
  })
}

export const useCreateResource = (subjectId: string) => {
  const { createResource } = useResourceUseCases()
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateResourceParams) =>
      queryAdapter(createResource.execute(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.bySubject(subjectId)
      })
    }
  })
}
```

### 7. Consume in a component

```tsx
import { useSubjects } from '@/presentation/hooks/use-subjects'

export const SubjectList = () => {
  const { data: subjects, isLoading, error } = useSubjects()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {subjects.map((s) => (
        <li key={s.id}>{s.title}</li>
      ))}
    </ul>
  )
}
```

## Folder Structure

```
src/
├── domain/
│   ├── entities/                    # Type definitions (Subject, Resource, Question, User)
│   └── repositories/                # Repository interfaces (contracts)
│
├── application/
│   └── use-cases/                   # Business logic orchestrating repositories
│       ├── auth/
│       ├── subject/
│       ├── resource/
│       └── question/
│
├── infrastructure/
│   ├── api/                         # supabase-client, mapPostgrestError, mapAuthError
│   ├── repositories/                # Supabase implementations of domain repositories
│   ├── factories/                   # Factory functions (makeXRepository)
│   └── storage/                     # Local storage adapters (if needed)
│
├── main/                            # Composition root (wires everything)
│   ├── contexts/                    # React contexts holding use case instances
│   └── providers/                   # Providers that wire repos → use cases → context
│
├── presentation/
│   ├── components/
│   │   ├── ui/                      # Generic UI components
│   │   ├── features/                # Feature-specific components
│   │   │   ├── subject/
│   │   │   ├── overview/
│   │   │   ├── resource/
│   │   │   └── question/
│   │   └── layout/                  # Shell, nav, sidebar
│   ├── pages/                       # Route-level page components
│   ├── hooks/                       # React Query hooks, query keys
│   └── routes/                      # Route definitions
│
└── shared/
    ├── types/                       # Response, Database (generated), shared types
    ├── utils/                       # Either, queryAdapter, helpers
    ├── constants/                   # App-wide constants
    └── errors/                      # DomainError classes
```

## Dependency Direction

```
main/ (composition root)
  ├→ infrastructure/  →  domain/  ←  shared/
  ├→ application/     →  domain/
  └→ presentation/    →  main/contexts/  →  application/ (types only)
                      →  domain/ (param types)
                      →  shared/ (utilities)
```

- **`domain/`** depends on **nothing** (only standard TypeScript types)
- **`shared/`** depends on **nothing** (utilities and types used by all layers)
- **`infrastructure/`** depends on `domain/` (implements its interfaces) and `shared/` (uses Either, errors)
- **`application/`** depends on `domain/` (uses repository interfaces) and `shared/`
- **`main/`** depends on `infrastructure/` (factories), `application/` (use cases), and `shared/` — this is the **composition root**
- **`presentation/`** depends on `main/contexts/` (to read use cases from context), `domain/` (param types), and `shared/` — **never** imports from `infrastructure/` directly

The `main/` layer providers are the composition root — the only place where concrete implementations are coupled to use cases and provided to the component tree.
