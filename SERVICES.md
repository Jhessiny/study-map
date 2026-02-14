# Services Architecture

## Overview

Services follow **Clean Architecture** with strict layer separation. Each service is defined as a domain repository interface, implemented in the infrastructure layer using Supabase, wired via factory functions, and consumed through React Query hooks.

```
domain/repositories/         Interface (contract)
        |
infrastructure/repositories/ Supabase implementation
        |
infrastructure/factories/    Factory function (manual wiring)
        |
presentation/hooks/          React Query hook (consumption)
```

Data flows inward: presentation depends on infrastructure depends on domain. The domain layer has **zero** external dependencies.

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
// src/domain/repositories/concept-repository.ts
import type { Response } from '@/shared/types/response'
import type { Concept } from '@/domain/entities/concept'

export interface ConceptRepository {
  findAll(): Promise<Response<Concept[]>>
  findById(id: string): Promise<Response<Concept>>
  create(params: CreateConceptParams): Promise<Response<Concept>>
  update(id: string, params: UpdateConceptParams): Promise<Response<Concept>>
  remove(id: string): Promise<Response<void>>
}

export type CreateConceptParams = {
  title: string
  description?: string
}

export type UpdateConceptParams = Partial<CreateConceptParams>
```

Naming convention: `<Entity>Repository` with standard CRUD method names (`findAll`, `findById`, `create`, `update`, `remove`).

## Infrastructure Layer — Supabase Implementations

Each repository interface gets a concrete implementation that uses the Supabase client.

```
src/infrastructure/repositories/
```

```ts
// src/infrastructure/repositories/supabase-concept-repository.ts
import { supabase } from '@/infrastructure/api/supabase-client'
import { mapPostgrestError } from '@/infrastructure/api/map-postgrest-error'
import { error, success } from '@/shared/utils/either'
import type {
  ConceptRepository,
  CreateConceptParams
} from '@/domain/repositories/concept-repository'
import type { Concept } from '@/domain/entities/concept'

export class SupabaseConceptRepository implements ConceptRepository {
  async findAll(): Promise<Response<Concept[]>> {
    const { data, error: err } = await supabase.from('concepts').select('*')

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async findById(id: string): Promise<Response<Concept>> {
    const { data, error: err } = await supabase
      .from('concepts')
      .select('*')
      .eq('id', id)
      .single()

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async create(params: CreateConceptParams): Promise<Response<Concept>> {
    const { data, error: err } = await supabase
      .from('concepts')
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

Factory functions wire implementations to their interfaces. They live in `infrastructure/factories/` and are the **only place** that knows about concrete classes.

```
src/infrastructure/factories/
```

```ts
// src/infrastructure/factories/make-concept-repository.ts
import type { ConceptRepository } from '@/domain/repositories/concept-repository'
import { SupabaseConceptRepository } from '@/infrastructure/repositories/supabase-concept-repository'

export const makeConceptRepository = (): ConceptRepository => {
  return new SupabaseConceptRepository()
}
```

Factories are intentionally simple — no IoC container, no decorators. If a repository gains dependencies later (e.g. a cache layer), the factory is the single place to wire them.

## React Query Integration

### Query Keys

Organize query keys by entity for easy invalidation.

```
src/presentation/hooks/query-keys.ts
```

```ts
export const conceptKeys = {
  all: ['concepts'] as const,
  detail: (id: string) => ['concepts', id] as const
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

Each entity gets custom hooks that combine the factory + query adapter + React Query.

```
src/presentation/hooks/
```

```ts
// src/presentation/hooks/use-concepts.ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { queryAdapter } from '@/shared/utils/query-adapter'
import { makeConceptRepository } from '@/infrastructure/factories/make-concept-repository'
import { conceptKeys } from '@/presentation/hooks/query-keys'

const repository = makeConceptRepository()

export const useConcepts = () => {
  return useQuery({
    queryKey: conceptKeys.all,
    queryFn: () => queryAdapter(repository.findAll())
  })
}

export const useConcept = (id: string) => {
  return useQuery({
    queryKey: conceptKeys.detail(id),
    queryFn: () => queryAdapter(repository.findById(id))
  })
}

export const useCreateConcept = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateConceptParams) =>
      queryAdapter(repository.create(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: conceptKeys.all })
    }
  })
}
```

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
  conceptId: string
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
  findByConceptId(conceptId: string): Promise<Response<Resource[]>>
  create(params: CreateResourceParams): Promise<Response<Resource>>
  remove(id: string): Promise<Response<void>>
}

export type CreateResourceParams = {
  conceptId: string
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
  async findByConceptId(conceptId: string): Promise<Response<Resource[]>> {
    const { data, error: err } = await supabase
      .from('resources')
      .select('*')
      .eq('concept_id', conceptId)

    if (err) return error(mapPostgrestError(err))
    return success(data)
  }

  async create(params: CreateResourceParams): Promise<Response<Resource>> {
    const { data, error: err } = await supabase
      .from('resources')
      .insert({
        concept_id: params.conceptId,
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

### 5. Create query keys and hooks

```
src/presentation/hooks/use-<entity>.ts
```

```ts
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'

import { queryAdapter } from '@/shared/utils/query-adapter'
import { makeResourceRepository } from '@/infrastructure/factories/make-resource-repository'

const repository = makeResourceRepository()

export const resourceKeys = {
  byConcept: (conceptId: string) => ['resources', conceptId] as const
}

export const useResources = (conceptId: string) => {
  return useQuery({
    queryKey: resourceKeys.byConcept(conceptId),
    queryFn: () => queryAdapter(repository.findByConceptId(conceptId))
  })
}

export const useCreateResource = (conceptId: string) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (params: CreateResourceParams) =>
      queryAdapter(repository.create(params)),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: resourceKeys.byConcept(conceptId)
      })
    }
  })
}
```

### 6. Consume in a component

```tsx
import { useConcepts } from '@/presentation/hooks/use-concepts'

export const ConceptList = () => {
  const { data: concepts, isLoading, error } = useConcepts()

  if (isLoading) return <p>Loading...</p>
  if (error) return <p>Error: {error.message}</p>

  return (
    <ul>
      {concepts.map((c) => (
        <li key={c.id}>{c.title}</li>
      ))}
    </ul>
  )
}
```

## Folder Structure

```
src/
├── domain/
│   ├── entities/                    # Type definitions (Concept, Resource, Question, User)
│   └── repositories/                # Repository interfaces (contracts)
│
├── application/
│   └── use-cases/                   # Business logic orchestrating repositories
│       ├── auth/
│       ├── concept/
│       ├── resource/
│       └── question/
│
├── infrastructure/
│   ├── api/                         # supabase-client, mapPostgrestError, mapAuthError
│   ├── repositories/                # Supabase implementations of domain repositories
│   ├── factories/                   # Factory functions (makeXRepository)
│   └── storage/                     # Local storage adapters (if needed)
│
├── presentation/
│   ├── components/
│   │   ├── ui/                      # Generic UI components
│   │   ├── features/                # Feature-specific components
│   │   │   ├── concept/
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
presentation  →  infrastructure  →  domain  ←  shared
     |                |                         ↑
     |                +-------------------------+
     +------------------------------------------+
```

- **`domain/`** depends on **nothing** (only standard TypeScript types)
- **`shared/`** depends on **nothing** (utilities and types used by all layers)
- **`infrastructure/`** depends on `domain/` (implements its interfaces) and `shared/` (uses Either, errors)
- **`application/`** depends on `domain/` (uses repository interfaces) and `shared/`
- **`presentation/`** depends on `infrastructure/` (via factories), `domain/` (entity types), and `shared/`

Factory functions in `infrastructure/factories/` are the **composition root** — the only place where concrete implementations are coupled to interfaces. Presentation hooks import factories, never concrete repository classes directly.
