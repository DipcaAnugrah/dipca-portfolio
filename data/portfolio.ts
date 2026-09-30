export type Project = {
  title: string;
  category: string;
  description: string;
  technologies: string[];
  status: string;
  image?: string;
  imageAlt?: string;
  imagePosition?: "center" | "top";
  imageFit?: "cover" | "contain";
  imageLoading?: "eager" | "lazy";
  imageUnoptimized?: boolean;
  featured?: boolean;
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
  { title: "Tuman Coffee", category: "Full-stack Web Application", description: "A responsive coffee-ordering website with a product catalog, user accounts, cart management, checkout preparation, and an order flow ready to be managed.", technologies: ["PHP 8.1", "MySQL / MariaDB", "JavaScript", "Midtrans Snap"], status: "Completed", image: "/projects/tuman-coffee.webp", imageAlt: "Tuman Coffee storefront hero with a red brick coffee shop facade", github: "https://github.com/DipcaAnugrah/tuman-coffee", featured: true },
  { title: "Warkop Djoeragan POS", category: "Application & System Development", description: "A role-based point-of-sale and operations system for cashier shifts, transactions, products, ingredients, stock control, branches, and business reports.", technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"], status: "Completed", image: "/projects/warkop-djoeragan-pos.png", imageAlt: "Warkop Djoeragan point-of-sale demo login", href: process.env.NEXT_PUBLIC_CASHIER_DEMO_URL, github: "https://github.com/DipcaAnugrah/Warkop-Djoeragan-POS", featured: true },
  { title: "Kasatset", category: "Mobile Application & Community System", description: "An Android community administration app for resident records, neighborhood cash flow, announcements, citizen reports, photo uploads, and authenticated management access.", technologies: ["Kotlin", "Android", "Firebase", "XML"], status: "Completed", image: "/projects/kasatset.png", imageAlt: "Kasatset Android application main menu for community information and services", imagePosition: "top", github: "https://github.com/DipcaAnugrah/Aplikasi_KAS_SATSET" },
  { title: "Legalkes Landing Page", category: "Landing Page & Web Design", description: "A responsive landing page for a medical-device licensing consultancy, with service information, credibility content, a client logo carousel, an interactive portfolio gallery, and direct consultation calls to action.", technologies: ["HTML5", "CSS3", "Vanilla JavaScript", "Google Fonts"], status: "Completed", image: "/projects/legalkes-landing.png", imageAlt: "Legalkes landing page hero for medical-device licensing consultation", imageLoading: "eager", imageUnoptimized: true, href: "https://legalkes-landing-page.vercel.app/", github: "https://github.com/DipcaAnugrah/legalkes-landing-page" },
  { title: "SiODI", category: "Thesis Project · Desktop OCR System", description: "A desktop application for classifying KTP, KK, and SIM documents, extracting identity fields, and automating document naming and archiving through multi-strategy OCR and rule-based NLP.", technologies: ["Python", "CustomTkinter", "Tesseract OCR", "OpenCV", "NLP"], status: "Completed", image: "/projects/siodi-ocr-desktop.png", imageAlt: "SiODI interface for batch processing identity documents with OCR", github: "https://github.com/DipcaAnugrah/SIODI", featured: true },
  { title: "Legalkes.com", category: "WordPress Company Website · Blocksy", description: "A company website for BPOM licensing consultation services, covering food, cosmetics, halal certification, company profile, services, portfolio, strengths, and consultation access.", technologies: ["WordPress", "Blocksy", "Page & Content Management"], status: "Completed", image: "/projects/legalkes-com.png", imageAlt: "Legalkes.com homepage for BPOM licensing services with a green layout", imageFit: "contain", href: "https://legalkes.com/" },
  { title: "01.Legalkes.net", category: "WordPress Company Website · Elementor", description: "A licensing-consultancy website with layered service navigation, information pages, popular services, portfolio content, and a consultation flow for business and product permits.", technologies: ["WordPress", "Elementor", "Page & Content Management"], status: "Completed", image: "/projects/legalkes-net.png", imageAlt: "01.Legalkes.net homepage for medical-device licensing services with a blue layout", imageFit: "contain", href: "https://01.legalkes.net/" },
];

export const indonesianProjects: Project[] = [
  { title: "Tuman Coffee", category: "Aplikasi Web Full-stack", description: "Website pemesanan kopi responsif dengan katalog produk, akun pengguna, pengelolaan keranjang, persiapan checkout, dan alur pesanan yang siap dikelola.", technologies: ["PHP 8.1", "MySQL / MariaDB", "JavaScript", "Midtrans Snap"], status: "Selesai", image: "/projects/tuman-coffee.webp", imageAlt: "Tampilan depan Tuman Coffee dengan fasad kedai kopi berdinding bata merah", github: "https://github.com/DipcaAnugrah/tuman-coffee", featured: true },
  { title: "POS Warkop Djoeragan", category: "Pengembangan Aplikasi & Sistem", description: "Sistem kasir dan operasional berbasis role untuk shift kasir, transaksi, produk, bahan baku, kontrol stok, outlet, dan laporan bisnis.", technologies: ["Laravel", "PHP", "MySQL", "Bootstrap"], status: "Selesai", image: "/projects/warkop-djoeragan-pos.png", imageAlt: "Halaman login demo sistem kasir Warkop Djoeragan", href: process.env.NEXT_PUBLIC_CASHIER_DEMO_URL, github: "https://github.com/DipcaAnugrah/Warkop-Djoeragan-POS", featured: true },
  { title: "Kasatset", category: "Aplikasi Mobile & Sistem Warga", description: "Aplikasi administrasi warga berbasis Android untuk data warga, arus kas lingkungan, pengumuman, laporan warga, unggahan foto, dan akses manajemen dengan autentikasi.", technologies: ["Kotlin", "Android", "Firebase", "XML"], status: "Selesai", image: "/projects/kasatset.png", imageAlt: "Menu utama aplikasi Android Kasatset untuk informasi dan layanan warga", imagePosition: "top", github: "https://github.com/DipcaAnugrah/Aplikasi_KAS_SATSET" },
  { title: "Landing Page Legalkes", category: "Landing Page & Desain Web", description: "Landing page responsif untuk layanan konsultasi perizinan alat kesehatan, dengan informasi layanan, konten kredibilitas, carousel logo klien, galeri portofolio interaktif, dan CTA konsultasi langsung.", technologies: ["HTML5", "CSS3", "JavaScript Vanilla", "Google Fonts"], status: "Selesai", image: "/projects/legalkes-landing.png", imageAlt: "Hero landing page Legalkes untuk konsultasi perizinan alat kesehatan", imageLoading: "eager", imageUnoptimized: true, href: "https://legalkes-landing-page.vercel.app/", github: "https://github.com/DipcaAnugrah/legalkes-landing-page" },
  { title: "SiODI", category: "Proyek Skripsi · Sistem OCR Desktop", description: "Aplikasi desktop untuk klasifikasi KTP, KK, dan SIM, ekstraksi data identitas, serta otomatisasi penamaan dan pengarsipan dokumen menggunakan OCR multi-strategi dan NLP rule-based.", technologies: ["Python", "CustomTkinter", "Tesseract OCR", "OpenCV", "NLP"], status: "Selesai", image: "/projects/siodi-ocr-desktop.png", imageAlt: "Antarmuka SiODI untuk pemrosesan batch dokumen identitas dengan OCR", github: "https://github.com/DipcaAnugrah/SIODI", featured: true },
  { title: "Legalkes.com", category: "Website Perusahaan WordPress · Blocksy", description: "Website perusahaan untuk konsultasi dan pengurusan izin BPOM, meliputi pangan, kosmetik, sertifikasi halal, profil perusahaan, layanan, portofolio, keunggulan, dan akses konsultasi.", technologies: ["WordPress", "Blocksy", "Pengelolaan Halaman & Konten"], status: "Selesai", image: "/projects/legalkes-com.png", imageAlt: "Beranda Legalkes.com untuk layanan perizinan BPOM dengan tampilan hijau", imageFit: "contain", href: "https://legalkes.com/" },
  { title: "01.Legalkes.net", category: "Website Perusahaan WordPress · Elementor", description: "Website konsultan perizinan dengan navigasi layanan bertingkat, halaman informasi, layanan populer, portofolio, dan alur konsultasi untuk kebutuhan izin usaha maupun produk.", technologies: ["WordPress", "Elementor", "Pengelolaan Halaman & Konten"], status: "Selesai", image: "/projects/legalkes-net.png", imageAlt: "Beranda 01.Legalkes.net untuk layanan perizinan alat kesehatan dengan tampilan biru", imageFit: "contain", href: "https://01.legalkes.net/" },
];

export const technologyGroups = [
  { label: "Frontend", items: ["HTML", "CSS", "JavaScript", "TypeScript", "React", "Next.js", "Tailwind CSS"] },
  { label: "Mobile", items: ["Kotlin", "Android", "XML"] },
  { label: "Backend / Database", items: ["PHP", "Node.js", "Python", "MySQL", "PostgreSQL", "Firebase", "Prisma"] },
  { label: "AI / Automation", items: ["OCR", "NLP", "Tesseract", "AI-assisted development tools"] },
  { label: "Tools", items: ["Git", "GitHub", "VS Code", "Codex", "Claude", "ChatGPT", "Antigravity"] },
];
