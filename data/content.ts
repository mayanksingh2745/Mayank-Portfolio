export interface HeroContent {
  pillRibbon: string[];
  name: string;
  location: string;
  tagline: string;
  badge: string;
  titles: string[];
  rotatingRoles: string[];
  summary: string;
  ctaText: string;
  socials: {
    label: string;
    href: string;
    handle: string;
  }[];
}

export interface ImpactContent {
  sectionTag: string;
  headline: string;
  subheadline: string;
  illustrativeChartLabel: string;
  stats: {
    value: string;
    number: number;
    suffix: string;
    prefix?: string;
    label: string;
    detail: string;
  }[];
}

export interface ExperienceRole {
  company: string;
  role: string;
  period: string;
  location: string;
  bullets: string[];
  isPromotion?: boolean;
  promotionPreviousRole?: string;
  techStack: string[];
}

export interface ExperienceContent {
  sectionTag: string;
  title: string;
  subtitle: string;
  terminalSnippet: {
    command: string;
    lines: string[];
  };
  roles: ExperienceRole[];
}

export interface ProjectItem {
  id: string;
  title: string;
  tagline: string;
  category: string;
  problem: string;
  approach: string;
  stack: string[];
  result: string;
  githubUrl?: string;
  isTodo?: boolean;
}

export interface ProjectsContent {
  sectionTag: string;
  title: string;
  subtitle: string;
  items: ProjectItem[];
}

export interface SkillCategory {
  category: string;
  color: string;
  skills: {
    name: string;
    highlight?: boolean;
  }[];
}

export interface SkillsContent {
  sectionTag: string;
  title: string;
  subtitle: string;
  bookNotes: string[];
  categories: SkillCategory[];
}

export interface AboutContent {
  sectionTag: string;
  title: string;
  paragraphs: string[];
  linkedinNote: {
    text: string;
    cta: string;
    url: string;
  };
}

export interface CredentialItem {
  title: string;
  issuer: string;
  type: "Job Simulation" | "Specialization" | "Course";
  skillsLearned: string[];
}

export interface CredentialsContent {
  sectionTag: string;
  title: string;
  subtitle: string;
  education: {
    degree: string;
    institution: string;
    period: string;
    note: string;
  };
  items: CredentialItem[];
}

export interface ContactContent {
  sectionTag: string;
  headline: string;
  subheadline: string;
  email: string;
  linkedin: string;
  github: string;
  location: string;
}

export interface PoseOffset {
  offsetX: number; // percentage offset
  offsetY: number; // percentage offset
  scale: number;
  tiltDeg: number;
}

export interface SiteContent {
  hero: HeroContent;
  impact: ImpactContent;
  experience: ExperienceContent;
  projects: ProjectsContent;
  skills: SkillsContent;
  about: AboutContent;
  credentials: CredentialsContent;
  contact: ContactContent;
  poseOffsets: Record<string, PoseOffset>;
  sectionConfig: {
    id: string;
    number: string;
    label: string;
    poseKey: string;
    haloColor: string;
    giantWord: string | string[];
    wordDirection?: "ltr" | "rtl";
  }[];
}

export const siteContent: SiteContent = {
  hero: {
    pillRibbon: [
      "PREDICTIVE MODELING",
      "ML PIPELINES",
      "SQL & ANALYTICS",
      "DASHBOARDS",
      "DATA PRODUCTS",
    ],
    name: "Mayank Singh",
    location: "Noida, India",
    tagline: "I build AI systems that solve real problems.",
    badge: "Open to AI-first companies",
    titles: ["AI ENGINEER", "DATA SCIENTIST"],
    rotatingRoles: [
      "AI Engineer",
      "Data Scientist",
      "Applied ML Engineer",
      "Forward Deployed Engineer",
    ],
    summary:
      "I turn messy data into decisions people can act on: ML pipelines, predictive models, and dashboards that non-technical teams actually use.",
    ctaText: "View Projects",
    socials: [
      {
        label: "GitHub",
        href: "https://github.com/mayanksingh2745",
        handle: "mayanksingh2745",
      },
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/in/mayanksingh2745",
        handle: "in/mayanksingh2745",
      },
      {
        label: "Email",
        href: "mailto:mayanksingh2745@gmail.com",
        handle: "mayanksingh2745@gmail.com",
      },
    ],
  },

  impact: {
    sectionTag: "QUANTITATIVE METRICS",
    headline: "Engineered for speed, scale, and clear business outcomes.",
    subheadline:
      "Production-focused performance metrics measured across client reporting pipelines and database workloads.",
    illustrativeChartLabel: "illustrative",
    stats: [
      {
        value: "20+",
        number: 20,
        suffix: "+",
        label: "Production SQL Queries",
        detail:
          "Engineered high-throughput queries across complex relational schemas.",
      },
      {
        value: "~30%",
        number: 30,
        prefix: "~",
        suffix: "%",
        label: "Less Ad-Hoc Reporting Time",
        detail:
          "Eliminated recurring bottlenecks for edtech stakeholder workflows.",
      },
      {
        value: "40%",
        number: 40,
        suffix: "%",
        label: "Lower Query Latency",
        detail:
          "Achieved via PostgreSQL index tuning and execution plan optimization.",
      },
      {
        value: "5+",
        number: 5,
        suffix: "+",
        label: "KPI Dashboards Deployed",
        detail:
          "Adopted weekly by non-technical leadership for real-time tracking.",
      },
    ],
  },

  experience: {
    sectionTag: "TRACK RECORD",
    title: "Where code meets production environments.",
    subtitle: "From data wrangling and query optimization to user-facing AI products.",
    terminalSnippet: {
      command: "tail -f /var/log/pipeline/ml-metrics.log",
      lines: [
        "[INFO] PostgreSQL index cache hit ratio: 98.4%",
        "[OPTIMIZE] Query latency reduced from 340ms to 204ms (-40%)",
        "[PIPELINE] EDA batch completed: 1.2M rows processed",
        "[SERVING] Leadership KPI dashboards status: 200 OK",
      ],
    },
    roles: [
      {
        company: "Flip Robo Technologies",
        role: "Junior Data Analyst",
        period: "Mar 2024 – Oct 2024",
        location: "Noida, India",
        isPromotion: true,
        promotionPreviousRole: "Data Science Intern (Aug 2023)",
        techStack: [
          "SQL",
          "PostgreSQL",
          "Python",
          "Pandas",
          "NumPy",
          "Scikit-learn",
          "XGBoost",
          "Seaborn",
          "Tableau",
          "Git/GitHub",
        ],
        bullets: [
          "Authored 20+ optimized SQL queries on large structured datasets, cutting ad-hoc reporting time ~30% for edtech clients.",
          "Constructed Python EDA pipelines (Pandas, NumPy, Seaborn) that surfaced student engagement drop-off patterns and informed a client's curriculum redesign.",
          "Built interactive Tableau dashboards tracking 5+ core KPIs used weekly by non-technical leadership.",
          "Standardized data cleaning and preprocessing pipelines across disparate sources to ensure data consistency.",
          "Developed predictive models with Scikit-learn and XGBoost covering thorough EDA, feature engineering, and hyperparameter tuning.",
          "Applied PostgreSQL indexing strategies that slashed query execution latency by 40%.",
          "Version-controlled all analytical pipelines, schemas, and modeling code using Git/GitHub.",
        ],
      },
      {
        company: "HireQuotient",
        role: "SDE Intern",
        period: "June 2026 – Present",
        location: "Bengaluru, India",
        techStack: ["Next.js", "TypeScript", "Node.js", "REST APIs", "AI Services"],
        bullets: [
          "Contributing to AI-powered recruitment products, designing and building scalable features with cross-functional engineering teams.",
          "Optimizing user flows and responsive interfaces to improve hiring pipeline conversion and product UX.",
          "Integrating backend endpoints and services to support dynamic screening workflows.",
        ],
      },
    ],
  },

  projects: {
    sectionTag: "SELECTED SYSTEMS",
    title: "Applied machine learning and hardware-software systems.",
    subtitle:
      "Engineered end-to-end: from sensor data and raw tables to trained weights and accessible interfaces.",
    items: [
      {
        id: "valuetrack",
        title: "ValueTrack",
        tagline: "Collaborative Customer Lifetime Value Predictor",
        category: "Machine Learning / Analytics",
        problem:
          "Businesses struggle to forecast customer lifetime value accurately from fragmented transactional touchpoints, leading to misallocated marketing expenditure.",
        approach:
          "Engineered a multi-stage ML pipeline using feature stores, cohort segmentation, and tree-based regression (XGBoost/LightGBM) trained on historical purchase behaviors and retention curves.",
        stack: [
          "Python",
          "Scikit-learn",
          "XGBoost",
          "Pandas",
          "PostgreSQL",
          "Streamlit",
        ],
        result:
          "Accurately forecasted customer segment valuations with high R² scores, delivering actionable cohort prioritization for revenue teams.",
        githubUrl: "https://github.com/mayanksingh2745",
      },
      {
        id: "predictive-maintenance",
        title: "Edge AI / IoT Predictive Maintenance",
        tagline: "Vibration & Telemetry Anomaly Detection",
        category: "Hardware + Edge ML",
        problem:
          "Unscheduled machinery downtime in industrial settings causes expensive halts; cloud-only monitoring suffers from high latency and bandwidth overheads.",
        approach:
          "Engineered an end-to-end hardware-plus-ML system: interfaced MEMS vibration and thermal sensors with microcontrollers, processed edge telemetry signals, and ran quantized anomaly detection models locally.",
        stack: [
          "Embedded C/C++",
          "Python",
          "Edge Impulse",
          "Scikit-learn",
          "MQTT",
          "IoT Telemetry",
        ],
        result:
          "Demonstrated real-time fault detection and early degradation alerts prior to mechanical failure threshold without cloud dependency.",
        githubUrl: "https://github.com/mayanksingh2745",
      },
      {
        id: "genai-llm-finetuning",
        title: "GenAI & LLM Fine-Tuning Pipeline",
        tagline: "Domain-Adapted LLMs with LoRA / QLoRA",
        category: "Generative AI",
        problem:
          "Off-the-shelf foundation models produce generic responses and hallucinate when applied to nuanced technical domain vocabularies.",
        approach:
          "Projects in Generative AI, LLM fine-tuning, and domain adaptation using parameter-efficient fine-tuning (PEFT/LoRA) on curated domain instruction datasets.",
        stack: ["PyTorch", "Hugging Face", "PEFT / LoRA", "vLLM", "Python"],
        result:
          "TODO: Project under active implementation. Evaluating domain perplexity and task accuracy benchmarks.",
        githubUrl: "https://github.com/mayanksingh2745",
        isTodo: true,
      },
      {
        id: "rag-architecture",
        title: "Enterprise RAG Architecture",
        tagline: "Hybrid Dense-Sparse Retrieval & Re-ranking",
        category: "Retrieval-Augmented Generation",
        problem:
          "Standard vector search fails on keyword-sensitive enterprise documentation, resulting in low precision retrieval contexts.",
        approach:
          "Architecting hybrid dense vector + sparse BM25 retrieval pipelines with cross-encoder re-ranking and citation attribution for grounded responses.",
        stack: ["LangChain", "Vector DB", "Hybrid Search", "FastAPI", "Python"],
        result:
          "TODO: Project under active implementation. Benchmarking retrieval recall and context precision.",
        githubUrl: "https://github.com/mayanksingh2745",
        isTodo: true,
      },
    ],
  },

  skills: {
    sectionTag: "TECHNICAL TOOLKIT",
    title: "Capabilities rooted in mathematics, data pipelines, and clean code.",
    subtitle:
      "Carefully chosen technologies used in production systems and analytical workflows.",
    bookNotes: [
      "// Data structures & algorithms in Python",
      "// Loss functions, backpropagation, and regularization",
      "// Query execution planning, B-Tree indexing & window functions",
      "// Containerized microservices and reproducible data environments",
    ],
    categories: [
      {
        category: "ML / Modeling",
        color: "#D9B36A",
        skills: [
          { name: "Python", highlight: true },
          { name: "Scikit-learn", highlight: true },
          { name: "XGBoost", highlight: true },
          { name: "PyTorch", highlight: true },
        ],
      },
      {
        category: "Data / SQL / Analytics",
        color: "#3D5AFE",
        skills: [
          { name: "SQL (PostgreSQL)", highlight: true },
          { name: "Pandas", highlight: true },
          { name: "NumPy" },
          { name: "Matplotlib" },
          { name: "Seaborn" },
          { name: "Tableau", highlight: true },
          { name: "Excel" },
        ],
      },
      {
        category: "Engineering & Cloud",
        color: "#7CE3B5",
        skills: [
          { name: "Docker", highlight: true },
          { name: "AWS", highlight: true },
          { name: "Streamlit" },
        ],
      },
      {
        category: "Tools & Ecosystem",
        color: "#FF5B2E",
        skills: [
          { name: "Git / GitHub", highlight: true },
          { name: "Jupyter Notebooks", highlight: true },
        ],
      },
    ],
  },

  about: {
    sectionTag: "FOUNDATION",
    title: "Where hardware discipline meets modern machine learning.",
    paragraphs: [
      "My background blends electrical and systems-level thinking with applied machine learning. Understanding how electrons, sensors, and low-level hardware communicate gives me a grounded, first-principles intuition for data integrity and system latency.",
      "In industrial IoT and predictive maintenance, I saw firsthand that messy real-world sensor telemetry breaks naive assumptions. That insight translated directly to production software: whether writing optimized SQL queries or engineering feature pipelines, I prioritize reliability, explainability, and speed.",
      "Today, I focus on building end-to-end AI systems—from structured data stores and predictive models to scalable web interfaces that empower business and engineering teams.",
    ],
    linkedinNote: {
      text: "I write about real-world AI, data engineering challenges, and practical ML on LinkedIn.",
      cta: "Connect on LinkedIn",
      url: "https://www.linkedin.com/in/mayanksingh2745",
    },
  },

  credentials: {
    sectionTag: "VERIFIED KNOWLEDGE",
    title: "Certifications, simulations, and formal education.",
    subtitle:
      "Hands-on industry simulations and rigorous specialization coursework.",
    education: {
      degree:
        "B.Tech in Electrical, Electronics and Communication Engineering",
      institution: "Ajay Kumar Garg Engineering College",
      period: "2023 – 2027",
      note: "Systems-level architecture, digital signal processing, and embedded systems.",
    },
    items: [
      {
        title: "IBM Data Science Specialization",
        issuer: "IBM",
        type: "Specialization",
        skillsLearned: [
          "Data Analysis",
          "Machine Learning Algorithms",
          "Python & SQL",
          "Data Visualization",
        ],
      },
      {
        title: "BCG Data Science Job Simulation",
        issuer: "Boston Consulting Group (Forage)",
        type: "Job Simulation",
        skillsLearned: [
          "Customer Churn Analysis",
          "Hypothesis Testing",
          "Feature Engineering",
          "Business Strategy",
        ],
      },
      {
        title: "Deloitte Australia Data Analytics Job Simulation",
        issuer: "Deloitte (Forage)",
        type: "Job Simulation",
        skillsLearned: [
          "Data Quality Assessment",
          "Forecasting & Dashboarding",
          "Client Presentation",
        ],
      },
      {
        title: "British Airways Data Science Job Simulation",
        issuer: "British Airways (Forage)",
        type: "Job Simulation",
        skillsLearned: [
          "Web Scraping & NLP",
          "Customer Sentiment Modeling",
          "Predictive Booking Models",
        ],
      },
      {
        title: "Object-Oriented Programming in Python",
        issuer: "Coursera / DeepLearning.AI",
        type: "Course",
        skillsLearned: [
          "Clean Architecture",
          "OOP Design Patterns",
          "Modular Codebases",
        ],
      },
    ],
  },

  contact: {
    sectionTag: "COLLABORATION",
    headline: "Let's build something.",
    subheadline:
      "Open to AI Engineer, Data Scientist, Applied ML, and Forward Deployed Engineer roles at AI-first companies. Let's talk about what you are deploying.",
    email: "mayanksingh2745@gmail.com",
    linkedin: "https://www.linkedin.com/in/mayanksingh2745",
    github: "https://github.com/mayanksingh2745",
    location: "Noida / Bengaluru / Remote",
  },

  poseOffsets: {
    "pose-portrait": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-laptop": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-experience": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-projects": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-reading": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-present": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-about": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
    "pose-wave": { offsetX: 0, offsetY: 0, scale: 1, tiltDeg: 0 },
  },

  sectionConfig: [
    {
      id: "hero",
      number: "01",
      label: "Overview",
      poseKey: "pose-portrait",
      haloColor: "#D9B36A", // Gold
      giantWord: ["AI", "DATA", "ML"],
    },
    {
      id: "impact",
      number: "02",
      label: "Impact",
      poseKey: "pose-laptop",
      haloColor: "#3D5AFE", // Cobalt
      giantWord: "NUMBERS",
    },
    {
      id: "experience",
      number: "03",
      label: "Experience",
      poseKey: "pose-experience",
      haloColor: "#FF5B2E", // Tomato
      giantWord: "SHIPPED",
    },
    {
      id: "projects",
      number: "04",
      label: "Projects",
      poseKey: "pose-projects",
      haloColor: "#7CE3B5", // Mint
      giantWord: "PROJECTS",
    },
    {
      id: "skills",
      number: "05",
      label: "Skills",
      poseKey: "pose-reading",
      haloColor: "#FFD84A", // Butter
      giantWord: "STACK",
    },
    {
      id: "about",
      number: "06",
      label: "About",
      poseKey: "pose-about",
      haloColor: "#8B5CFF", // Violet
      giantWord: "STORY",
    },
    {
      id: "credentials",
      number: "07",
      label: "Credentials",
      poseKey: "pose-present",
      haloColor: "#D9B36A", // Gold
      giantWord: "CERTIFIED",
    },
    {
      id: "contact",
      number: "08",
      label: "Contact",
      poseKey: "pose-wave",
      haloColor: "#FF5B2E", // Tomato
      giantWord: "HELLO",
    },
  ],
};
