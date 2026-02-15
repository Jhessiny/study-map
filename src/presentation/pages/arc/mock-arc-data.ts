import type { SubjectTree, Topic } from './types'

type Branch = {
  title: string
  subTitle: string
  icon: string
  children: {
    title: string
    subTitle: string
    icon: string
    children: string[]
  }[]
}

const CS_CHILDREN: Branch[] = [
  {
    title: 'Foundations & Theory',
    subTitle: 'Mathematical and theoretical underpinnings of computation',
    icon: 'library',
    children: [
      {
        title: 'Algorithms',
        subTitle: 'Step-by-step procedures for computation',
        icon: 'git-branch',
        children: [
          'Sorting & Searching',
          'Graph Algorithms',
          'Dynamic Programming',
          'Greedy Algorithms',
          'Divide & Conquer',
          'Randomized Algorithms',
          'Approximation Algorithms',
          'String Algorithms'
        ]
      },
      {
        title: 'Data Structures',
        subTitle: 'Organizing and storing data efficiently',
        icon: 'layers',
        children: [
          'Trees & Tries',
          'Hash Tables',
          'Heaps',
          'Graphs',
          'Linked Lists',
          'Probabilistic Structures',
          'Spatial Structures',
          'Concurrent Structures'
        ]
      },
      {
        title: 'Automata & Formal Languages',
        subTitle: 'Abstract machines and their computational power',
        icon: 'bot',
        children: [
          'Finite Automata',
          'Pushdown Automata',
          'Turing Machines',
          'Regular Languages',
          'Context-Free Grammars',
          'Pumping Lemma',
          'Cellular Automata',
          'Tree Automata'
        ]
      },
      {
        title: 'Complexity Theory',
        subTitle: 'Classifying computational difficulty',
        icon: 'timer',
        children: [
          'P vs NP',
          'NP-Completeness',
          'Space Complexity',
          'Time Complexity',
          'Polynomial Hierarchy',
          'Randomized Complexity',
          'Circuit Complexity',
          'Communication Complexity'
        ]
      },
      {
        title: 'Computability',
        subTitle: 'What can and cannot be computed',
        icon: 'ban',
        children: [
          'Halting Problem',
          'Decidability',
          'Reducibility',
          "Rice's Theorem",
          'Recursion Theorem',
          'Oracle Machines',
          'Gödel Incompleteness',
          'Church-Turing Thesis'
        ]
      },
      {
        title: 'Information Theory',
        subTitle: 'Quantifying information and communication',
        icon: 'binary',
        children: [
          'Entropy',
          'Channel Capacity',
          'Data Compression',
          'Error Correction',
          'Kolmogorov Complexity',
          'Mutual Information',
          'Rate-Distortion Theory',
          'Source Coding'
        ]
      },
      {
        title: 'Type Theory & Logic',
        subTitle: 'Formal reasoning and type systems',
        icon: 'brackets',
        children: [
          'Propositional Logic',
          'Predicate Logic',
          'Lambda Calculus',
          'Dependent Types',
          'Type Inference',
          'Proof Assistants',
          'Curry-Howard Correspondence',
          'Homotopy Type Theory'
        ]
      },
      {
        title: 'Discrete Mathematics',
        subTitle: 'Study of countable structures',
        icon: 'hash',
        children: [
          'Graph Theory',
          'Combinatorics',
          'Set Theory',
          'Number Theory',
          'Boolean Algebra',
          'Recurrence Relations',
          'Generating Functions',
          'Matroid Theory'
        ]
      }
    ]
  },
  {
    title: 'Systems & Infrastructure',
    subTitle: 'Building and managing computing platforms',
    icon: 'server',
    children: [
      {
        title: 'Operating Systems',
        subTitle: 'Managing hardware and software resources',
        icon: 'monitor',
        children: [
          'Process Management',
          'Memory Management',
          'File Systems',
          'I/O Systems',
          'Scheduling',
          'Concurrency',
          'Virtualization',
          'Security Kernels'
        ]
      },
      {
        title: 'Distributed Systems',
        subTitle: 'Coordinating multiple networked machines',
        icon: 'globe',
        children: [
          'Consensus Protocols',
          'Replication',
          'Sharding',
          'Consistency Models',
          'Leader Election',
          'Distributed Hash Tables',
          'MapReduce',
          'Stream Processing'
        ]
      },
      {
        title: 'Databases',
        subTitle: 'Persistent data storage and retrieval',
        icon: 'database',
        children: [
          'Relational Databases',
          'NoSQL',
          'Query Optimization',
          'Indexing',
          'Transactions',
          'MVCC',
          'Replication',
          'Time-Series Databases'
        ]
      },
      {
        title: 'Networking',
        subTitle: 'Communication between computing systems',
        icon: 'wifi',
        children: [
          'TCP/IP',
          'HTTP & HTTP/2',
          'DNS',
          'Load Balancing',
          'CDNs',
          'WebSockets',
          'gRPC',
          'Network Protocols'
        ]
      },
      {
        title: 'Compilers & Languages',
        subTitle: 'Translating and executing code',
        icon: 'file-code',
        children: [
          'Lexical Analysis',
          'Parsing',
          'Type Checking',
          'Intermediate Representation',
          'Optimization Passes',
          'Code Generation',
          'JIT Compilation',
          'Garbage Collection'
        ]
      },
      {
        title: 'Cloud & DevOps',
        subTitle: 'On-demand infrastructure and deployment',
        icon: 'cloud',
        children: [
          'Containers & Kubernetes',
          'Serverless',
          'Infrastructure as Code',
          'CI/CD Pipelines',
          'Service Mesh',
          'Auto-Scaling',
          'Monitoring & Observability',
          'Chaos Engineering'
        ]
      },
      {
        title: 'Computer Architecture',
        subTitle: 'Design of processors and memory systems',
        icon: 'circuit-board',
        children: [
          'Pipelining',
          'Cache Hierarchies',
          'Branch Prediction',
          'SIMD & Vectorization',
          'GPUs',
          'FPGA',
          'Memory Models',
          'RISC vs CISC'
        ]
      },
      {
        title: 'Embedded & IoT',
        subTitle: 'Special-purpose computing in devices',
        icon: 'cpu',
        children: [
          'Microcontrollers',
          'Real-Time Systems',
          'Sensor Integration',
          'Power Management',
          'RTOS',
          'IoT Protocols',
          'Firmware',
          'Edge Computing'
        ]
      }
    ]
  },
  {
    title: 'Artificial Intelligence',
    subTitle: 'Building intelligent systems that learn and reason',
    icon: 'brain',
    children: [
      {
        title: 'Supervised Learning',
        subTitle: 'Learning from labeled examples',
        icon: 'graduation-cap',
        children: [
          'Linear Regression',
          'Logistic Regression',
          'Decision Trees',
          'Random Forests',
          'SVMs',
          'k-NN',
          'Naive Bayes',
          'Gradient Boosting'
        ]
      },
      {
        title: 'Unsupervised Learning',
        subTitle: 'Finding structure in unlabeled data',
        icon: 'group',
        children: [
          'K-Means Clustering',
          'DBSCAN',
          'PCA',
          'Autoencoders',
          'Gaussian Mixtures',
          't-SNE',
          'UMAP',
          'Hierarchical Clustering'
        ]
      },
      {
        title: 'Deep Learning',
        subTitle: 'Multi-layer neural network architectures',
        icon: 'network',
        children: [
          'CNNs',
          'RNNs & LSTMs',
          'Transformers',
          'GANs',
          'Diffusion Models',
          'Graph Neural Networks',
          'ResNets',
          'Attention Mechanisms'
        ]
      },
      {
        title: 'Natural Language Processing',
        subTitle: 'Understanding and generating human language',
        icon: 'message-square',
        children: [
          'Tokenization',
          'Word Embeddings',
          'Language Models',
          'Named Entity Recognition',
          'Sentiment Analysis',
          'Machine Translation',
          'Question Answering',
          'Text Summarization'
        ]
      },
      {
        title: 'Computer Vision',
        subTitle: 'Teaching machines to interpret images',
        icon: 'eye',
        children: [
          'Image Classification',
          'Object Detection',
          'Semantic Segmentation',
          'Image Generation',
          'Pose Estimation',
          'Optical Flow',
          'Depth Estimation',
          'Video Understanding'
        ]
      },
      {
        title: 'Reinforcement Learning',
        subTitle: 'Learning through interaction and reward',
        icon: 'gamepad-2',
        children: [
          'Q-Learning',
          'Policy Gradient',
          'Actor-Critic',
          'Monte Carlo Tree Search',
          'Multi-Armed Bandits',
          'Model-Based RL',
          'Inverse RL',
          'Hierarchical RL'
        ]
      },
      {
        title: 'Knowledge & Reasoning',
        subTitle: 'Representing and manipulating knowledge',
        icon: 'lightbulb',
        children: [
          'Knowledge Graphs',
          'Ontologies',
          'Expert Systems',
          'Bayesian Networks',
          'Constraint Satisfaction',
          'Semantic Web',
          'Causal Inference',
          'Neuro-Symbolic AI'
        ]
      },
      {
        title: 'AI Engineering',
        subTitle: 'Deploying and managing AI systems',
        icon: 'rocket',
        children: [
          'Model Serving',
          'Feature Stores',
          'Experiment Tracking',
          'Data Versioning',
          'Model Monitoring',
          'A/B Testing',
          'Pipeline Orchestration',
          'Edge Deployment'
        ]
      }
    ]
  },
  {
    title: 'Software Engineering',
    subTitle: 'Designing, building, and maintaining software systems',
    icon: 'wrench',
    children: [
      {
        title: 'Design & Architecture',
        subTitle: 'High-level structure and patterns',
        icon: 'building',
        children: [
          'Microservices',
          'Event-Driven Architecture',
          'Domain-Driven Design',
          'Clean Architecture',
          'Design Patterns',
          'CQRS',
          'Hexagonal Architecture',
          'Service-Oriented'
        ]
      },
      {
        title: 'Testing & Quality',
        subTitle: 'Verifying software correctness',
        icon: 'test-tube',
        children: [
          'Unit Testing',
          'Integration Testing',
          'End-to-End Testing',
          'Property-Based Testing',
          'Mutation Testing',
          'Load Testing',
          'Contract Testing',
          'Test-Driven Development'
        ]
      },
      {
        title: 'API Design',
        subTitle: 'Designing interfaces between systems',
        icon: 'plug',
        children: [
          'REST',
          'GraphQL',
          'gRPC',
          'API Versioning',
          'Rate Limiting',
          'Documentation',
          'Error Handling',
          'Pagination'
        ]
      },
      {
        title: 'Version Control',
        subTitle: 'Tracking and managing code changes',
        icon: 'git-commit',
        children: [
          'Git Internals',
          'Branching Strategies',
          'Code Review',
          'Merge vs Rebase',
          'Monorepos',
          'Conventional Commits',
          'Git Hooks',
          'Bisecting'
        ]
      },
      {
        title: 'Human-Computer Interaction',
        subTitle: 'Designing effective user experiences',
        icon: 'mouse-pointer',
        children: [
          'Usability',
          'Accessibility',
          'Interaction Design',
          'User Research',
          'Visual Design',
          'Prototyping',
          'Information Architecture',
          'Design Systems'
        ]
      },
      {
        title: 'Programming Languages',
        subTitle: 'Language paradigms and features',
        icon: 'code',
        children: [
          'Functional Programming',
          'Object-Oriented Programming',
          'Concurrency Models',
          'Memory Safety',
          'Metaprogramming',
          'DSLs',
          'Generics & Polymorphism',
          'Pattern Matching'
        ]
      },
      {
        title: 'Data Engineering',
        subTitle: 'Building data pipelines and platforms',
        icon: 'database',
        children: [
          'ETL Pipelines',
          'Data Warehousing',
          'Data Lakes',
          'Batch Processing',
          'Stream Processing',
          'Schema Evolution',
          'Data Quality',
          'Orchestration'
        ]
      },
      {
        title: 'Reliability & Operations',
        subTitle: 'Keeping systems running smoothly',
        icon: 'activity',
        children: [
          'SRE Practices',
          'Incident Management',
          'Capacity Planning',
          'Monitoring',
          'Observability',
          'Logging',
          'Alerting',
          'Chaos Engineering'
        ]
      }
    ]
  },
  {
    title: 'Security & Privacy',
    subTitle: 'Protecting systems, data, and users',
    icon: 'shield',
    children: [
      {
        title: 'Cryptography',
        subTitle: 'Mathematical foundations of secure communication',
        icon: 'key-round',
        children: [
          'Symmetric Encryption',
          'Asymmetric Encryption',
          'Hash Functions',
          'Digital Signatures',
          'Key Exchange',
          'Zero-Knowledge Proofs',
          'Homomorphic Encryption',
          'Post-Quantum Crypto'
        ]
      },
      {
        title: 'Network Security',
        subTitle: 'Securing communication channels',
        icon: 'shield-check',
        children: [
          'TLS/SSL',
          'Firewalls',
          'VPNs',
          'Intrusion Detection',
          'DDoS Mitigation',
          'Network Monitoring',
          'Packet Analysis',
          'DNS Security'
        ]
      },
      {
        title: 'Web & Application Security',
        subTitle: 'Protecting software from attacks',
        icon: 'globe-lock',
        children: [
          'XSS Prevention',
          'CSRF Protection',
          'SQL Injection',
          'Content Security Policy',
          'CORS',
          'Session Management',
          'Input Validation',
          'Secure Coding'
        ]
      },
      {
        title: 'Authentication & Identity',
        subTitle: 'Verifying identity of users and systems',
        icon: 'fingerprint',
        children: [
          'Password Hashing',
          'Multi-Factor Auth',
          'Biometrics',
          'SSO',
          'OAuth & OIDC',
          'FIDO/WebAuthn',
          'Kerberos',
          'Certificate-Based Auth'
        ]
      },
      {
        title: 'Access Control',
        subTitle: 'Managing permissions and authorization',
        icon: 'lock',
        children: [
          'RBAC',
          'ABAC',
          'ACLs',
          'Capability-Based',
          'Least Privilege',
          'Mandatory Access Control',
          'Policy Engines',
          'Identity Management'
        ]
      },
      {
        title: 'Security Engineering',
        subTitle: 'Building and testing secure systems',
        icon: 'bug',
        children: [
          'SAST',
          'DAST',
          'Dependency Scanning',
          'Threat Modeling',
          'Secure SDLC',
          'Fuzzing',
          'Penetration Testing',
          'Red Teaming'
        ]
      },
      {
        title: 'Forensics & Incident Response',
        subTitle: 'Investigating and responding to breaches',
        icon: 'search',
        children: [
          'Log Analysis',
          'Memory Forensics',
          'Disk Forensics',
          'Network Forensics',
          'Malware Analysis',
          'Incident Response',
          'Chain of Custody',
          'Timeline Analysis'
        ]
      },
      {
        title: 'Privacy & Compliance',
        subTitle: 'Protecting personal data and meeting regulations',
        icon: 'eye-off',
        children: [
          'Data Anonymization',
          'Differential Privacy',
          'GDPR Compliance',
          'Data Minimization',
          'Consent Management',
          'Privacy by Design',
          'Data Retention',
          'Right to Erasure'
        ]
      }
    ]
  }
]

let nextId = 1

function makeTopics(title: string): Topic[] {
  return [
    { id: `topic-${nextId++}`, title: `Introduction to ${title}` },
    { id: `topic-${nextId++}`, title: 'Core Concepts' },
    { id: `topic-${nextId++}`, title: 'Advanced Topics' }
  ]
}

function generateLevel3Children(parentTitle: string): SubjectTree[] {
  const prefixes = [
    'Intro to',
    'Advanced',
    'Applied',
    'Theoretical',
    'Modern',
    'Practical',
    'Foundations of',
    'Topics in'
  ]
  return prefixes.map((prefix) => ({
    id: `subj-${nextId++}`,
    title: `${prefix} ${parentTitle}`,
    subTitle: `${prefix} ${parentTitle.toLowerCase()} concepts and techniques`,
    image: null,
    icon: 'book-open',
    topics: makeTopics(`${prefix} ${parentTitle}`),
    subjects: []
  }))
}

function buildLevel1and2(children: Branch['children']): SubjectTree[] {
  return children.map((child) => ({
    id: `subj-${nextId++}`,
    title: child.title,
    subTitle: child.subTitle,
    image: null,
    icon: child.icon,
    topics: makeTopics(child.title),
    subjects: child.children.map((name) => ({
      id: `subj-${nextId++}`,
      title: name,
      subTitle: `Exploring ${name.toLowerCase()} in depth`,
      image: null,
      icon: 'book-open',
      topics: makeTopics(name),
      subjects: generateLevel3Children(name)
    }))
  }))
}

export const mockArcTree: SubjectTree = {
  id: `subj-${nextId++}`,
  title: 'Computer Science',
  subTitle: 'Theory and practice of computation',
  image: null,
  icon: 'laptop',
  topics: makeTopics('Computer Science'),
  subjects: CS_CHILDREN.map((branch) => ({
    id: `subj-${nextId++}`,
    title: branch.title,
    subTitle: branch.subTitle,
    image: null,
    icon: branch.icon,
    topics: makeTopics(branch.title),
    subjects: buildLevel1and2(branch.children)
  }))
}
