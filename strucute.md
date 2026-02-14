src/
├── domain/ # Business entities and rules (innermost layer)
├── application/ # Use cases and business logic orchestration
├── infrastructure/ # External services, repositories, API clients
├── presentation/ # UI components, pages, React-specific code
├── shared/ # Cross-cutting concerns

src/
│
├── domain/
│ ├── entities/
│ └── repositories/
│
├── application/
│ └── use-cases/
│ ├── concept/
│ ├── resource/
│ ├── question/
│ └── auth/
│
├── infrastructure/
│ ├── repositories/
│ ├── api/
│ └── storage/
│
├── presentation/
│ ├── components/
│ │ ├── ui/
│ │ ├── features/
│ │ │ ├── concept/
│ │ │ ├── resource/
│ │ │ └── question/
│ │ └── layout/
│ ├── pages/
│ ├── hooks/
│ └── routes/
│
├── shared/
│ ├── types/
│ ├── utils/
│ ├── constants/
│ └── errors/
