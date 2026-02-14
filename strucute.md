src/
├── core/ # 🎯 INNER LAYER: Business Logic
│ ├── entities/ # Domain models (pure TypeScript)
│ │ ├── Concept.ts
│ │ ├── LearningObjective.ts
│ │ ├── Resource.ts
│ │ ├── Question.ts
│ │ └── User.ts
│ │
│ ├── use-cases/ # Application business rules
│ │ ├── concept/
│ │ │ ├── CreateConcept.ts
│ │ │ ├── GetConceptHierarchy.ts
│ │ │ ├── UpdateConcept.ts
│ │ │ └── DeleteConcept.ts
│ │ ├── resource/
│ │ │ ├── UploadResource.ts
│ │ │ └── GetResourcesByConcept.ts
│ │ ├── question/
│ │ │ ├── CreateQuestion.ts
│ │ │ ├── VoteQuestion.ts
│ │ │ └── GetQuestionsByConcept.ts
│ │ └── auth/
│ │ ├── Login.ts
│ │ └── Register.ts
│ │
│ └── repositories/ # Repository interfaces (contracts)
│ ├── IConceptRepository.ts
│ ├── IResourceRepository.ts
│ ├── IQuestionRepository.ts
│ └── IAuthRepository.ts
│
├── infrastructure/ # 🔌 OUTER LAYER: External Services
│ ├── repositories/ # Repository implementations
│ │ ├── SupabaseConceptRepository.ts
│ │ ├── SupabaseResourceRepository.ts
│ │ ├── SupabaseQuestionRepository.ts
│ │ └── SupabaseAuthRepository.ts
│ │
│ ├── api/ # API clients
│ │ └── supabase.ts # Supabase client config
│ │
│ └── storage/ # File storage
│ └── SupabaseStorageService.ts
│
├── presentation/ # 🎨 OUTER LAYER: UI
│ ├── components/
│ │ ├── ui/ # shadcn components (atoms)
│ │ │ ├── Button.tsx
│ │ │ ├── Input.tsx
│ │ │ └── Card.tsx
│ │ │
│ │ ├── features/ # Feature-specific components
│ │ │ ├── concept/
│ │ │ │ ├── ConceptCard.tsx
│ │ │ │ ├── ConceptForm.tsx
│ │ │ │ └── ConceptTree.tsx
│ │ │ ├── resource/
│ │ │ │ ├── ResourceList.tsx
│ │ │ │ ├── ResourceUpload.tsx
│ │ │ │ └── ResourcePreview.tsx
│ │ │ └── question/
│ │ │ ├── QuestionCard.tsx
│ │ │ ├── QuestionForm.tsx
│ │ │ └── VoteButton.tsx
│ │ │
│ │ └── layout/ # Layout components
│ │ ├── AppLayout.tsx
│ │ ├── Navbar.tsx
│ │ └── Sidebar.tsx
│ │
│ ├── pages/ # Page components (routes)
│ │ ├── Login.tsx
│ │ ├── Dashboard.tsx
│ │ ├── KnowledgeMap.tsx
│ │ ├── ConceptDetail.tsx
│ │ └── QuestionBoard.tsx
│ │
│ ├── hooks/ # Custom React hooks (adapters)
│ │ ├── useConcepts.ts # Wraps use-cases for React
│ │ ├── useResources.ts
│ │ ├── useQuestions.ts
│ │ └── useAuth.ts
│ │
│ ├── view-models/ # Presentation logic
│ │ ├── ConceptViewModel.ts
│ │ └── QuestionViewModel.ts
│ │
│ └── routes/ # Router configuration
│ └── AppRoutes.tsx
│
├── shared/ # 🔧 Cross-cutting concerns
│ ├── types/ # Shared TypeScript types
│ │ └── common.ts
│ ├── utils/ # Pure utility functions
│ │ ├── date.ts
│ │ └── validation.ts
│ ├── constants/
│ │ └── config.ts
│ └── errors/ # Custom error classes
│ └── AppError.ts
│
├── di/ # 🎯 Dependency Injection
│ └── container.ts # DI container setup
│
├── App.tsx # App entry point
├── main.tsx # Vite entry point
└── vite.config.ts
