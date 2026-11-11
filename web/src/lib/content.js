// All copy is sourced from analytx4t.com (home, about, product pages).
// No invented stats, clients or testimonials — add real ones here when available.

export const company = {
  name: "Analytx4t Lab",
  legal: "Analytx4t Lab Pvt Ltd",
  tagline: "Analytics for Transformation",
  email: "info@analytx4t.com",
  emails: [
    { label: "General", value: "info@analytx4t.com" },
    { label: "Anoop Singh Rawat", value: "anoops@analytx4t.com" },
    { label: "Amit Kumar", value: "amit@analytx4t.com" },
  ],
  phones: ["+91 99583 74323", "+91 99902 96858"],
  offices: [
    { label: "Corporate office", lines: ["Sector 63, Noida", "Uttar Pradesh, India"] },
    { label: "Registered office", lines: ["BE-200, T/F, Hari Nagar", "New Delhi 110064, India"] },
  ],
  socials: [
    { label: "LinkedIn", href: "https://in.linkedin.com/company/analytx4tlabpvtltd" },
    { label: "X / Twitter", href: "https://twitter.com/analytx4tlab" },
    { label: "Instagram", href: "https://instagram.com/analytx4tlab" },
    { label: "YouTube", href: "https://youtube.com/@analytx4tlab" },
    { label: "Facebook", href: "https://www.facebook.com/profile.php?id=61566764070936" },
  ],
  mission:
    "To deliver customized analytics, AI, and application solutions that boost efficiency, drive growth and empower data-driven decisions.",
  vision:
    "To be a leading force in data analytics, AI, and digital solutions — helping businesses innovate and transform.",
  founders: [
    { name: "Anoop Singh Rawat", role: "CEO & Founder", initials: "AR", email: "anoops@analytx4t.com" },
    { name: "Amit Kumar", role: "Co-Founder", initials: "AK", email: "amit@analytx4t.com" },
  ],
};

export const services = [
  {
    id: "full-stack",
    no: "01",
    title: "Full-stack applications",
    kicker: "Web & mobile",
    summary:
      "Scalable, secure web and mobile applications — frontend, backend, databases and cloud infrastructure, built and owned end to end.",
    includes: ["Custom web platforms", "iOS & Android apps", "APIs & integrations", "Cloud deployment & DevOps"],
    stack: ["React", "Node.js", "Python", "PostgreSQL", "AWS"],
  },
  {
    id: "ai-integrated",
    no: "02",
    title: "AI-integrated applications",
    kicker: "Machine learning in your systems",
    summary:
      "We embed AI and machine learning into existing or new systems to automate workflows and support data-driven decisions.",
    includes: ["Document & data extraction", "Classification and scoring", "Forecasting models", "Workflow automation"],
    stack: ["Python", "scikit-learn", "LLM APIs", "FastAPI"],
  },
  {
    id: "ai-agents",
    no: "03",
    title: "AI agent solutions",
    kicker: "Generative agents that act",
    summary:
      "Generative AI agents for operations, decision-making and customer experience — lead generation, customer support, trip planning and more.",
    includes: ["Lead-generation agents", "Support & triage agents", "Planning & booking agents", "Tool use & system actions"],
    stack: ["LangChain", "LLM APIs", "Vector DBs", "n8n"],
  },
  {
    id: "chatbots",
    no: "04",
    title: "Knowledge-based chatbots",
    kicker: "Answers grounded in your data",
    summary:
      "Generative AI chatbots trained on your knowledge base for healthcare, HR, travel and customer service teams.",
    includes: ["Website & WhatsApp bots", "Internal HR / policy assistants", "Patient & customer helpdesks", "Human hand-off"],
    stack: ["RAG", "Embeddings", "LLM APIs"],
  },
  {
    id: "chat-documents",
    no: "05",
    title: "Chat with your documents",
    kicker: "RAG over PDFs, sheets & images",
    summary:
      "Ask questions across PDF, DOCX, Excel, CSV and image files — with optional CRM or Google Drive integration so answers come from where your data lives.",
    includes: ["PDF · DOCX · XLSX · CSV · images", "Citations to source pages", "CRM & Google Drive connectors", "Access control"],
    stack: ["RAG", "OCR", "Vector DBs", "Google Drive API"],
  },
  {
    id: "social-automation",
    no: "06",
    title: "Social media AI automation",
    kicker: "Topic-based content, posted for you",
    summary:
      "Generates and publishes topic-based content to LinkedIn, Facebook, Instagram and X — including real-time posts when industry news breaks.",
    includes: ["Content calendars", "News-triggered posts", "Multi-platform publishing", "Brand voice controls"],
    stack: ["LLM APIs", "Platform APIs", "Schedulers"],
  },
];

export const capabilities = [
  {
    id: "ai",
    title: "AI-powered solutions",
    items: ["AI agents & automation", "Smart chatbots", "RAG-powered applications", "Smart workflow automation", "Full-stack AI applications", "Cloud-integrated AI systems"],
  },
  {
    id: "analytics",
    title: "Data analytics",
    items: ["Sales forecasting", "Recommender systems", "Demand prediction", "Lead analytics", "Price optimization", "Risk & performance analytics"],
  },
  {
    id: "engagement",
    title: "Customer engagement & marketing",
    items: ["AI chatbots & smart assistants", "Fraud detection", "Personalized customer journeys", "Retention & churn reduction", "Behavioral analytics", "Marketing intelligence"],
  },
  {
    id: "emerging",
    title: "Emerging tech",
    items: ["Generative AI", "AI agents", "AI chatbots", "RAG applications", "Power BI & Tableau", "Software development"],
  },
];

export const benefits = [
  { title: "Understand your customers", body: "Behavioral and lead analytics that show who buys, who churns and why." },
  { title: "Actionable insights", body: "Models and dashboards that end in a decision, not just a chart." },
  { title: "Dashboards people use", body: "Power BI, Tableau and custom AI-powered dashboards built around real workflows." },
  { title: "Customized, not templated", body: "Every business is different, so every engagement starts from your process." },
  { title: "Operational efficiency", body: "Automation that removes the repetitive hours from finance, HR and support." },
  { title: "Powerful recommendations", body: "Recommender systems and pricing models that move revenue." },
];

export const process = [
  { no: "01", title: "Discover", body: "We sit with the team that does the work today, map the process and find the hours worth automating." },
  { no: "02", title: "Prototype", body: "A working prototype on your real data within weeks — so decisions are made on evidence, not slides." },
  { no: "03", title: "Build", body: "Production engineering: security, integrations, access control and the dull edge cases that matter." },
  { no: "04", title: "Run & improve", body: "We stay after go-live with ongoing support, monitoring and iteration as your data changes." },
];

export const industries = ["Finance & accounting", "Healthcare", "HR & recruiting", "Travel & hospitality", "Customer service", "Real estate", "Startups & founders"];

// Input → output pairs; the theme of the site is raw data becoming finished work.
export const transformations = [
  ["Trial balance", "Schedule III statements"],
  ["Bank statements", "Matched ledger"],
  ["Supplier invoices", "Posted entries"],
  ["Monthly books", "CFO-ready MIS"],
  ["PDF policies", "Cited answers"],
  ["Industry news", "Scheduled posts"],
  ["Sales history", "Demand forecast"],
  ["Candidate videos", "Scored interviews"],
];

export const labProducts = [
  {
    name: "InnovatePitch",
    line: "A virtual Shark Tank with five AI judges.",
    body: "Founders pitch live on camera; judges score innovation, feasibility, clarity, confidence and business potential, ask follow-ups and return detailed feedback.",
  },
  {
    name: "FinSight",
    line: "Financial health from uploaded documents.",
    body: "Reads bank statements, audit reports and financial records to find gaps and inefficiencies, evaluate profitability and recommend next steps.",
  },
  {
    name: "HireArena",
    line: "Interview practice with two AI interviewers.",
    body: "A live, camera-on technical and HR interview for freshers and job seekers, ending in a detailed evaluation of strengths and gaps.",
  },
];

export const insights = [
  {
    title: "The hidden cost of manual financial reporting — and how automation solves it",
    date: "31 Dec 2025",
    tag: "Finance automation",
    href: "https://analytx4t.com/the-hidden-cost-of-manual-financial-reporting-and-how-automation-solves-it/",
  },
  {
    title: "AI-based interviews: bringing objectivity and data-driven scoring to evaluations",
    date: "31 Dec 2025",
    tag: "AI in hiring",
    href: "https://analytx4t.com/ai-based-interviews-bringing-objectivity-and-data-driven-scoring-to-evaluations/",
  },
  {
    title: "Leverage digital experience in a one-click world with data analytics",
    date: "08 Feb 2021",
    tag: "Analytics",
    href: "https://analytx4t.com/leverage-digital-experience-data-analytics/",
  },
];
