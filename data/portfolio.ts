export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "center" | "top";
  imageLoading?: "eager" | "lazy";
  imageUnoptimized?: boolean;
  href?: string;
  github?: string;
  caseStudy?: string;
};

export const services = [
  { number: "01", title: "Web Development", description: "Websites, landing pages, dashboards, and custom web applications made for a clear purpose.", tags: ["Websites", "Dashboards", "Web apps"] },
  { number: "02", title: "Application & System Development", description: "Custom management systems, internal tools, CRUD applications, and practical business systems.", tags: ["Internal tools", "Systems", "Workflows"] },
  { number: "03", title: "Automation & AI", description: "OCR, document processing, automation workflows, and AI-assisted solutions for repetitive work.", tags: ["OCR", "Automation", "AI workflows"] },
  { number: "04", title: "Technical Projects", description: "Research systems, academic technical projects, prototypes, and custom digital tools.", tags: ["Research", "Prototypes", "Custom tools"] },
];

export const projects: Project[] = [
  { title: "Tuman Coffee", category: "Full-stack Web Application", description: "A responsive coffee-ordering website with product discovery, secure accounts, cart management, checkout preparation, and an admin-ready order flow.", technologies: ["PHP", "MySQL", "JavaScript", "Midtrans"], status: "Completed", image: "/projects/tuman-coffee.webp", imageAlt: "Tuman Coffee storefront hero with a red brick coffee shop facade" },
  { title: "Warkop Djoeragan POS", category: "Application & System Development", description: "A role-based point-of-sale and operations system for cashier shifts, transactions, products, ingredients, stock control, branches, and business reports.", technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"], status: "Completed", image: "/projects/warkop-djoeragan-pos.png", imageAlt: "Warkop Djoeragan point-of-sale demo login", href: process.env.NEXT_PUBLIC_CASHIER_DEMO_URL },
  { title: "Kasatset", category: "Mobile Application & Community System", description: "An Android community administration app for resident records, neighborhood cash flow, announcements, citizen reports, photo uploads, and authenticated management access.", technologies: ["Kotlin", "Android", "Firebase", "XML"], status: "Completed", image: "/projects/kasatset.png", imageAlt: "Kasatset Android application main menu for community information and services", imagePosition: "top" },
  { title: "Legalkes Landing Page", category: "Landing Page & Web Design", description: "A responsive landing page for a medical-device licensing consultancy, with service discovery, credibility content, a client logo carousel, an interactive portfolio gallery, and direct consultation calls to action.", technologies: ["HTML", "CSS", "JavaScript"], status: "Completed", image: "/projects/legalkes-landing.png", imageAlt: "Legalkes landing page hero for medical-device licensing consultation", imageLoading: "eager", imageUnoptimized: true, href: "https://legalkes-landing-page.vercel.app/" },
];

export const technologyGroups = [
  { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { label: "Mobile", items: ["Kotlin", "Android", "XML"] },
  { label: "Backend / Database", items: ["PHP", "Node.js", "Python", "MySQL", "PostgreSQL", "Firebase", "Prisma"] },
  { label: "AI / Automation", items: ["OCR", "NLP", "Tesseract", "AI-assisted development tools"] },
  { label: "Tools", items: ["Git", "GitHub", "VS Code", "Codex", "Claude", "ChatGPT", "Antigravity"] },
];
