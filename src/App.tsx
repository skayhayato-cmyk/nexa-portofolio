import React, { useState, useEffect, useRef } from 'react';
import { 
  Server, 
  Bot, 
  UploadCloud, 
  Wrench, 
  Sun, 
  Moon, 
  Menu, 
  X, 
  ArrowRight, 
  Check, 
  Send, 
  Code2, 
  Database, 
  Radio, 
  Cpu, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  Copy,
  Terminal,
  Globe,
  Activity,
  MessageSquare,
  ArrowUp,
  CheckCircle2,
  Sparkles,
  Layers,
  Play,
  Pause
} from 'lucide-react';

interface ProjectItem {
  id: string;
  title: string;
  category: 'bot' | 'api' | 'web';
  categoryLabel: string;
  tabPill: string;
  tabSub: string;
  description: string;
  url: string;
  domain: string;
  techStack: string[];
  version: string;
  footerLeft: string;
  footerRight: string;
  pillColor: {
    bg: string;
    text: string;
    border: string;
    dot: string;
  };
  features: string[];
  specs: {
    language: string;
    runtime: string;
    fungsi: string;
    catatan: string;
    sampleEndpoint?: string;
  };
}

const PROJECTS_DATA: ProjectItem[] = [
  {
    id: 'reaction-channel',
    title: 'Reaction Channel System',
    category: 'bot',
    categoryLabel: 'Bot & Otomasi',
    tabPill: '• BOT & OTOMASI',
    tabSub: 'Node.js & WhatsApp API',
    description: 'Sistem bot reaksi channel dan broadcast otomatis untuk WhatsApp. Dibuat dengan Node.js dan backend PHP untuk merespon pesan channel secara cepat, stabil, dan otomatis.',
    url: 'https://react.nexapanel.my.id',
    domain: 'react.nexapanel.my.id',
    techStack: ['Node.js', 'PHP', 'WhatsApp Web API', 'Webhooks'],
    version: 'v1.4',
    footerLeft: 'Respon Otomatis Realtime',
    footerRight: 'Aktif di react.nexapanel.my.id',
    pillColor: {
      bg: 'bg-sky-500/10',
      text: 'text-sky-400',
      border: 'border-sky-500/30',
      dot: 'bg-sky-400'
    },
    features: [
      'Respon reaksi pesan otomatis tanpa lag',
      'Pengaturan broadcast multi-channel',
      'Monitoring koneksi bot secara realtime',
      'Panel kontrol berbasis web responsif'
    ],
    specs: {
      language: 'Node.js & Script PHP',
      runtime: 'Node.js v20 + PM2 Process Manager',
      fungsi: 'Otomasi reaksi dan pengelolaan event di saluran WhatsApp',
      catatan: 'Proyek ini dibuat untuk belajar menangani event streaming dan websocket secara live.',
      sampleEndpoint: 'https://react.nexapanel.my.id/api/status'
    }
  },
  {
    id: 'nexadev-api',
    title: 'NexaDev API Gateway',
    category: 'api',
    categoryLabel: 'Backend API',
    tabPill: '• CENTRAL API GATEWAY',
    tabSub: 'PHP 8.2 & MySQL',
    description: 'Kumpulan endpoint API terpusat buatan sendiri yang menyajikan format data JSON rapi untuk kebutuhan website, form, dan utilitas data.',
    url: 'https://api.nexadev.my.id',
    domain: 'api.nexadev.my.id',
    techStack: ['PHP 8.2', 'MySQL', 'REST API', 'JSON'],
    version: 'v2.1',
    footerLeft: 'Format JSON Cepat',
    footerRight: 'Aktif di api.nexadev.my.id',
    pillColor: {
      bg: 'bg-emerald-500/10',
      text: 'text-emerald-400',
      border: 'border-emerald-500/30',
      dot: 'bg-emerald-400'
    },
    features: [
      'Format output standar JSON yang bersih',
      'Validasi request dan penanganan error rapi',
      'Respon server cepat dan hemat memori',
      'Mudah diintegrasikan ke website lain'
    ],
    specs: {
      language: 'PHP 8.2 Native Backend',
      runtime: 'Nginx + PHP-FPM High Performance',
      fungsi: 'Menyediakan data JSON terstruktur untuk berbagai aplikasi web',
      catatan: 'Dibuat untuk melatih logika pembuatan RESTful API tanpa framework berat.',
      sampleEndpoint: 'https://api.nexadev.my.id/v1/ping'
    }
  },
  {
    id: 'cloud-uploader',
    title: 'Cloud Uploader Storage',
    category: 'web',
    categoryLabel: 'Penyimpanan File',
    tabPill: '• CLOUD UPLOADER CDN',
    tabSub: 'PHP File Engine & Direct Link',
    description: 'Website praktis untuk mengunggah gambar dan file ke server secara instan, langsung menghasilkan link permanen yang siap dibagikan ke mana saja.',
    url: 'https://uploder.nexadev.my.id',
    domain: 'uploder.nexadev.my.id',
    techStack: ['PHP', 'Node.js', 'File Engine', 'Tailwind CSS'],
    version: 'v1.8',
    footerLeft: 'Direct Link Instan',
    footerRight: 'Aktif di uploder.nexadev.my.id',
    pillColor: {
      bg: 'bg-amber-500/10',
      text: 'text-amber-400',
      border: 'border-amber-500/30',
      dot: 'bg-amber-400'
    },
    features: [
      'Upload file sekali klik dengan direct link publik',
      'Otomatis menyaring ekstensi file yang aman',
      'Tampilan antarmuka bersih dan ramah di ponsel',
      'Bebas digunakan untuk kebutuhan sharing file cepat'
    ],
    specs: {
      language: 'PHP File Ingestion',
      runtime: 'Linux File Server',
      fungsi: 'Menyimpan berkas media dan menghasilkan URL direct-link publik',
      catatan: 'Belajar menangani multipart form-data, sanitasi nama file, dan batasan ukuran berkas.',
      sampleEndpoint: 'https://uploder.nexadev.my.id/upload'
    }
  },
  {
    id: 'fixioo-tools',
    title: 'Fixioo All Tools',
    category: 'web',
    categoryLabel: 'Kumpulan Tools Web',
    tabPill: '• ALL TOOLS UTILITY',
    tabSub: 'PHP, JS & Tailwind',
    description: 'Website all-in-one yang berisi kumpulan perkakas dan utilitas online praktis sehari-hari yang dapat langsung digunakan gratis di browser tanpa instalasi tambahan.',
    url: 'https://fixioo.my.id',
    domain: 'fixioo.my.id',
    techStack: ['PHP', 'Node.js', 'JavaScript', 'Tailwind CSS'],
    version: 'v2.5',
    footerLeft: '100% Akses di Browser',
    footerRight: 'Aktif di fixioo.my.id',
    pillColor: {
      bg: 'bg-purple-500/10',
      text: 'text-purple-400',
      border: 'border-purple-500/30',
      dot: 'bg-purple-400'
    },
    features: [
      'Koleksi ragam alat bantu kerja online praktis',
      'Tanpa perlu install aplikasi tambahan, 100% di browser',
      'Proses kalkulasi dan konversi instan di sisi klien/server',
      'Desain ringan yang cepat diakses dari koneksi lambat'
    ],
    specs: {
      language: 'PHP & Modern JavaScript',
      runtime: 'Web Hosting + Node.js Scripts',
      fungsi: 'Menyediakan perkakas web serbaguna untuk kebutuhan produktivitas',
      catatan: 'Tempat bereksperimen mengumpulkan berbagai fungsi utilitas web dalam satu wadah rapi.'
    }
  }
];

const TYPING_ROLES = [
  'Belajar PHP & Web Dev',
  'Node.js & Bot Developer',
  'Pembuat Website & Tools',
  'PHP & Node.js Enthusiast'
];

export default function App() {
  // Theme state: dark (default) or light
  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('nexadev-theme');
      if (saved === 'dark' || saved === 'light') return saved;
      return window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark';
    }
    return 'dark';
  });

  const [activeSection, setActiveSection] = useState('hero');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeStackIndex, setActiveStackIndex] = useState(0);
  const [isAutoCycle, setIsAutoCycle] = useState(true);
  const [isStackHovered, setIsStackHovered] = useState(false);
  const [selectedProject, setSelectedProject] = useState<ProjectItem | null>(null);
  const [copiedText, setCopiedText] = useState<string | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Touch swipe support for stacked cards
  const touchStartY = useRef<number | null>(null);

  // Typing animation state
  const [roleIndex, setRoleIndex] = useState(0);
  const [typedRole, setTypedRole] = useState('');
  const [isDeletingRole, setIsDeletingRole] = useState(false);

  // Contact form state
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const isDark = theme === 'dark';

  // Apply theme class to document root
  useEffect(() => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.remove('dark');
      root.classList.add('light');
    }
    localStorage.setItem('nexadev-theme', theme);
  }, [theme, isDark]);

  // Auto cycle stacked deck
  useEffect(() => {
    if (!isAutoCycle || isStackHovered) return;
    const interval = setInterval(() => {
      setActiveStackIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isAutoCycle, isStackHovered]);

  // Scroll Progress and Back-to-Top listener
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const currentProgress = (window.scrollY / totalHeight) * 100;
        setScrollProgress(currentProgress);
      }
      setShowBackToTop(window.scrollY > 400);

      // Active section detection
      const sections = ['hero', 'about', 'projects', 'channels', 'contact'];
      for (const sectionId of sections) {
        const el = document.getElementById(sectionId);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= 200 && rect.bottom >= 200) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Smooth Scroll Reveal via IntersectionObserver
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('scroll-reveal-visible');
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    const revealElements = document.querySelectorAll('.scroll-reveal');
    revealElements.forEach((el) => observer.observe(el));

    return () => {
      revealElements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  // Typing animation effect with natural timing
  useEffect(() => {
    const currentFullText = TYPING_ROLES[roleIndex];
    let timer: NodeJS.Timeout;

    if (!isDeletingRole) {
      if (typedRole.length < currentFullText.length) {
        timer = setTimeout(() => {
          setTypedRole(currentFullText.slice(0, typedRole.length + 1));
        }, 85);
      } else {
        timer = setTimeout(() => {
          setIsDeletingRole(true);
        }, 2200);
      }
    } else {
      if (typedRole.length > 0) {
        timer = setTimeout(() => {
          setTypedRole(currentFullText.slice(0, typedRole.length - 1));
        }, 40);
      } else {
        setIsDeletingRole(false);
        setRoleIndex((prev) => (prev + 1) % TYPING_ROLES.length);
      }
    }

    return () => clearTimeout(timer);
  }, [typedRole, isDeletingRole, roleIndex]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  const handleCopy = (text: string, label: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(label);
    setTimeout(() => setCopiedText(null), 2500);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const errors: { [key: string]: string } = {};

    if (!formData.name.trim()) {
      errors.name = 'Mohon isi nama kamu.';
    }
    if (!formData.email.trim()) {
      errors.email = 'Mohon masukkan alamat email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errors.email = 'Format email tidak valid.';
    }
    if (!formData.message.trim()) {
      errors.message = 'Pesan tidak boleh kosong.';
    } else if (formData.message.trim().length < 6) {
      errors.message = 'Pesan terlalu singkat (minimal 6 karakter).';
    }

    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      setFormData({ name: '', email: '', message: '' });
      setTimeout(() => setSubmitSuccess(false), 5000);
    }, 1000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className={`min-h-screen font-sans transition-colors duration-300 ${
      isDark ? 'bg-[#000000] text-[#FFFFFF]' : 'bg-[#FAFAFA] text-[#111111]'
    }`}>
      {/* Top Scroll Progress Bar with White Glassmorphism Light */}
      <div className="fixed top-0 left-0 right-0 z-50 h-[3px] bg-transparent pointer-events-none">
        <div 
          className="h-full bg-gradient-to-r from-white/40 via-white to-white/60 shadow-[0_0_12px_rgba(255,255,255,0.9)] transition-all duration-150 ease-out"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Background Subtle Grid Pattern */}
      <div 
        className={`fixed inset-0 pointer-events-none z-0 ${
          isDark ? 'grid-pattern-dark opacity-70' : 'grid-pattern-light opacity-50'
        }`}
      />

      {/* 1. FIXED NAVIGATION BAR (Glassmorphism + White Light Border) */}
      <header className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 backdrop-blur-2xl border-b ${
        isDark 
          ? 'bg-[#000000]/75 border-white/10 shadow-[0_4px_30px_rgba(0,0,0,0.8)]' 
          : 'bg-white/80 border-black/5 shadow-[0_4px_30px_rgba(0,0,0,0.05)]'
      }`}>
        <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between relative">
          <div className="glass-sheen-top" />
          
          {/* Brand Logo & Avatar */}
          <a href="#hero" className="flex items-center gap-3 group">
            <div className="relative">
              <img 
                src="https://clooud.my.id/uploder/uploads/imaljc.jpg" 
                alt="Avatar NexaDev" 
                className="w-8 h-8 rounded-full object-cover border border-white/20 transition-transform duration-300 group-hover:scale-105"
              />
              <span className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-white ring-2 ring-black" />
            </div>
            <div className="flex flex-col">
              <span className="font-extrabold text-base tracking-tight group-hover:text-white transition-colors">
                NexaDev
              </span>
              <span className="text-[10px] font-mono -mt-1 text-neutral-400">
                Web &amp; Bot Developer
              </span>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1">
            {[
              { id: 'hero', label: 'Beranda' },
              { id: 'about', label: 'Tentang Saya' },
              { id: 'projects', label: 'Proyek Stack' },
              { id: 'channels', label: 'Saluran WA' },
              { id: 'contact', label: 'Kontak' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-all ${
                  activeSection === link.id
                    ? isDark 
                      ? 'text-white bg-white/10 border border-white/20 shadow-[0_0_15px_rgba(255,255,255,0.1)]' 
                      : 'text-black bg-black/5 border border-black/10 shadow-sm'
                    : isDark 
                      ? 'text-neutral-400 hover:text-white hover:bg-white/5' 
                      : 'text-neutral-600 hover:text-black hover:bg-black/5'
                }`}
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Controls: Theme Toggle & Mobile Menu */}
          <div className="flex items-center gap-2">
            <button
              onClick={toggleTheme}
              aria-label="Ganti Tema"
              className={`p-2.5 rounded-xl border transition-all duration-200 active:scale-95 ${
                isDark 
                  ? 'border-white/10 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30 shadow-[0_0_15px_rgba(255,255,255,0.05)]' 
                  : 'border-black/10 bg-white text-neutral-700 hover:text-black hover:border-black/20 shadow-sm'
              }`}
            >
              {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-neutral-800" />}
            </button>

            {/* Mobile Hamburger Trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Menu Navigasi"
              className={`md:hidden p-2.5 rounded-xl border transition-all ${
                isDark 
                  ? 'border-white/10 bg-white/5 text-neutral-300' 
                  : 'border-black/10 bg-white text-neutral-700'
              }`}
            >
              {mobileMenuOpen ? <X className="w-4 h-4" /> : <Menu className="w-4 h-4" />}
            </button>
          </div>

        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className={`md:hidden px-4 pt-3 pb-5 border-b space-y-2 backdrop-blur-2xl ${
            isDark ? 'bg-black/95 border-white/10' : 'bg-white/95 border-black/10'
          }`}>
            {[
              { id: 'hero', label: 'Beranda' },
              { id: 'about', label: 'Tentang Saya' },
              { id: 'projects', label: 'Proyek Stack' },
              { id: 'channels', label: 'Saluran WA' },
              { id: 'contact', label: 'Kontak' },
            ].map((link) => (
              <a
                key={link.id}
                href={`#${link.id}`}
                onClick={() => setMobileMenuOpen(false)}
                className={`block px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                  activeSection === link.id
                    ? isDark ? 'bg-white/15 text-white' : 'bg-black/5 text-black'
                    : isDark ? 'text-neutral-400 hover:text-white' : 'text-neutral-600 hover:text-black'
                }`}
              >
                {link.label}
              </a>
            ))}
          </div>
        )}
      </header>

      {/* MAIN CONTAINER */}
      <main className="relative z-10 pt-16">
        
        {/* 2. HERO SECTION */}
        <section id="hero" className="min-h-[85vh] flex flex-col justify-center items-center px-4 sm:px-6 py-16 sm:py-24 text-center">
          <div className="max-w-4xl mx-auto flex flex-col items-center">
            
            {/* Status Pill Badge with Glassmorphism & White Light */}
            <div className={`inline-flex items-center gap-2 px-4 py-1.5 rounded-full border text-xs font-mono mb-8 scroll-reveal backdrop-blur-xl ${
              isDark 
                ? 'border-white/15 bg-white/5 text-neutral-200 shadow-[0_0_20px_rgba(255,255,255,0.08)]' 
                : 'border-black/10 bg-white text-neutral-800 shadow-sm'
            }`}>
              <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_8px_rgba(255,255,255,1)] animate-pulse" />
              <span>Halo, Selamat Datang di Web Portofolio NexaDev</span>
            </div>

            {/* Developer Avatar with White Light Glow */}
            <div className="relative mb-8 group scroll-reveal">
              <div className={`w-32 h-32 sm:w-36 sm:h-36 rounded-full p-1.5 transition-all duration-300 ${
                isDark ? 'glow-avatar-dark bg-white/10 border border-white/20' : 'glow-avatar-light bg-neutral-100 border border-black/10'
              }`}>
                <img 
                  src="https://clooud.my.id/uploder/uploads/imaljc.jpg" 
                  alt="NexaDev" 
                  className="w-full h-full rounded-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
              </div>
              <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full border text-[10px] font-mono tracking-wider font-semibold uppercase backdrop-blur-xl whitespace-nowrap ${
                isDark 
                  ? 'border-white/20 bg-black/80 text-white shadow-[0_0_15px_rgba(255,255,255,0.15)]' 
                  : 'border-black/10 bg-white text-black shadow-sm'
              }`}>
                Web &amp; Bot Maker
              </div>
            </div>

            {/* Hero Main Name & White Light Shimmer Effect */}
            <h1 className={`text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight mb-4 scroll-reveal ${
              isDark ? 'text-white' : 'text-[#111111]'
            }`}>
              <span className="animate-white-shimmer">Nexa Dev</span>
            </h1>

            {/* Dynamic Typing Title with Glassmorphism + White Light Accent */}
            <div className="flex items-center justify-center min-h-[42px] mb-6 scroll-reveal">
              <div className={`text-lg sm:text-2xl font-mono font-semibold tracking-tight px-5 py-2 rounded-2xl border flex items-center gap-2.5 backdrop-blur-xl ${
                isDark 
                  ? 'border-white/15 bg-white/5 text-white shadow-[0_0_25px_rgba(255,255,255,0.06)]' 
                  : 'border-black/10 bg-white text-black shadow-sm'
              }`}>
                <Terminal className="w-4 h-4 text-white" />
                <span className="animate-glass-light">{typedRole}</span>
                <span className="w-2 h-5 bg-white animate-pulse ml-0.5 shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
              </div>
            </div>

            {/* Authentic Indonesian Introduction (Natural, Non-AI) */}
            <p className={`text-base sm:text-lg max-w-2xl leading-relaxed mb-10 scroll-reveal ${
              isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'
            }`}>
              Halo kenalkan, saya <span className="font-semibold text-white underline decoration-white/40 underline-offset-4">NexaDev</span>. Developer pemula yang sedang giat belajar membuat website dan sistem web. Saat ini saya masih fokus mendalami bahasa pemrograman <span className="font-medium text-white">PHP</span> dan <span className="font-medium text-white">Node.js</span>.
            </p>

            {/* Call to Actions (Glassmorphism + White Light) */}
            <div className="flex flex-wrap items-center justify-center gap-4 scroll-reveal">
              <a
                href="#projects"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm transition-all duration-200 hover:scale-105 active:scale-95 shadow-xl ${
                  isDark 
                    ? 'bg-white text-black hover:bg-neutral-200 shadow-[0_0_25px_rgba(255,255,255,0.25)]' 
                    : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                <span>Lihat Proyek Animasi</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#channels"
                className={`inline-flex items-center gap-2 px-6 py-3.5 rounded-2xl font-semibold text-sm border backdrop-blur-xl transition-all duration-200 hover:scale-105 active:scale-95 ${
                  isDark 
                    ? 'border-white/20 bg-white/5 text-white hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)]' 
                    : 'border-black/10 bg-white text-black hover:bg-neutral-100'
                }`}
              >
                <Radio className="w-4 h-4" />
                <span>Join Saluran WhatsApp</span>
              </a>
            </div>

            {/* Quick Skills Badges Bar (Glassmorphic Panels) */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-14 w-full max-w-3xl scroll-reveal">
              <div className={`p-4 rounded-2xl border text-left transition-all ${
                isDark ? 'glass-panel-dark' : 'glass-panel-light'
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-mono mb-1">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>BAHASA 1</span>
                </div>
                <div className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>PHP 8</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Backend &amp; Skrip Web</div>
              </div>

              <div className={`p-4 rounded-2xl border text-left transition-all ${
                isDark ? 'glass-panel-dark' : 'glass-panel-light'
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-mono mb-1">
                  <Cpu className="w-3.5 h-3.5" />
                  <span>BAHASA 2</span>
                </div>
                <div className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>Node.js</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Bot Otomasi &amp; Event</div>
              </div>

              <div className={`p-4 rounded-2xl border text-left transition-all ${
                isDark ? 'glass-panel-dark' : 'glass-panel-light'
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-mono mb-1">
                  <Globe className="w-3.5 h-3.5" />
                  <span>PROYEK LIVE</span>
                </div>
                <div className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>4 Proyek</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Aktif Bisa Diakses</div>
              </div>

              <div className={`p-4 rounded-2xl border text-left transition-all ${
                isDark ? 'glass-panel-dark' : 'glass-panel-light'
              }`}>
                <div className="flex items-center gap-1.5 text-xs text-white/80 font-mono mb-1">
                  <Activity className="w-3.5 h-3.5" />
                  <span>STATUS</span>
                </div>
                <div className={`text-xl font-bold font-mono ${isDark ? 'text-white' : 'text-neutral-900'}`}>Belajar Terus</div>
                <div className="text-[11px] text-neutral-400 mt-0.5">Eksplorasi Fitur Baru</div>
              </div>
            </div>

          </div>
        </section>

        {/* 3. ABOUT SECTION - Authentic & Human (No AI Jargon) */}
        <section id="about" className={`py-20 px-4 sm:px-6 border-t ${
          isDark ? 'border-white/10 bg-[#050505]' : 'border-black/5 bg-[#F5F5F5]'
        }`}>
          <div className="max-w-6xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 scroll-reveal">
              <div>
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-white" />
                  <span>Tentang Perjalanan Saya</span>
                </div>
                <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight animate-white-shimmer">
                  Belajar Coding dari Projek Nyata
                </h2>
              </div>
              <p className={`max-w-lg text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'
              }`}>
                Saya lebih suka belajar dengan cara langsung mempraktekkannya ke dalam website yang bisa dipakai orang lain. Walaupun masih pemula, saya terus mencoba hal baru di PHP dan Node.js setiap hari.
              </p>
            </div>

            {/* 3 Learning Pillars with Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              
              <div className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 scroll-reveal ${
                isDark ? 'glass-panel-dark hover:border-white/30' : 'glass-panel-light hover:border-black/20'
              }`}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${
                  isDark ? 'border-white/15 bg-white/10 text-white' : 'border-black/10 bg-black/5 text-black'
                }`}>
                  <Code2 className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold mb-2.5 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Pemrograman PHP
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'}`}>
                  Mempelajari pembuatan script backend untuk website, memproses input form, mengelola file unggahan, dan menyusun REST API sederhana berformat JSON.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">PHP 8</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">File Ingestion</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">REST API</span>
                </div>
              </div>

              <div className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 scroll-reveal ${
                isDark ? 'glass-panel-dark hover:border-white/30' : 'glass-panel-light hover:border-black/20'
              }`}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${
                  isDark ? 'border-white/15 bg-white/10 text-white' : 'border-black/10 bg-black/5 text-black'
                }`}>
                  <Bot className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold mb-2.5 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Node.js &amp; Otomasi Bot
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'}`}>
                  Memanfaatkan Node.js untuk menangani event realtime dan otomatisasi, seperti bot reaction channel WhatsApp, listener webhook, serta background task.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">Node.js</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">WhatsApp Web</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Event Stream</span>
                </div>
              </div>

              <div className={`p-6 sm:p-7 rounded-2xl border transition-all duration-300 hover:-translate-y-1.5 scroll-reveal ${
                isDark ? 'glass-panel-dark hover:border-white/30' : 'glass-panel-light hover:border-black/20'
              }`}>
                <div className={`w-12 h-12 rounded-xl border flex items-center justify-center mb-5 ${
                  isDark ? 'border-white/15 bg-white/10 text-white' : 'border-black/10 bg-black/5 text-black'
                }`}>
                  <Wrench className="w-6 h-6" />
                </div>
                <h3 className={`text-lg font-bold mb-2.5 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  Tools &amp; Tampilan Bersih
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-4 ${isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'}`}>
                  Menggabungkan backend dengan antarmuka yang bersih, mudah digunakan di layar handphone maupun laptop, menggunakan Tailwind CSS dan vanilla JS.
                </p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-white border border-white/20">Tailwind CSS</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Responsive UI</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-neutral-800 text-neutral-300">Clean Code</span>
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* 4. PROJECTS SECTION - ANIMASI STACK KARTU BERTAB (SESUAI GAMBAR CONTOH USER) */}
        <section id="projects" className={`py-20 px-4 sm:px-6 border-t relative overflow-hidden ${
          isDark ? 'border-white/10 bg-[#000000]' : 'border-black/5 bg-[#FAFAFA]'
        }`}>
          <div className="max-w-6xl mx-auto">
            
            {/* Header Proyek dengan Efek White Shimmer Light */}
            <div className="text-center max-w-2xl mx-auto mb-10 scroll-reveal">
              <div className={`text-xs font-mono uppercase tracking-widest mb-3 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border backdrop-blur-xl ${
                isDark 
                  ? 'border-white/15 bg-white/5 text-white shadow-[0_0_15px_rgba(255,255,255,0.06)]' 
                  : 'border-black/10 bg-white text-neutral-800 shadow-sm'
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                <span>Portofolio Proyek Interaktif</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-4 animate-white-shimmer">
                Koleksi Proyek Saya
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'
              }`}>
                Tampilan kartu bertumpuk (stacked cards) dengan tab timbul seperti pada contoh. Klik tab di atas atau tombol navigasi untuk mengganti kartu.
              </p>
            </div>

            {/* Stack Deck Controls Bar */}
            <div className="flex items-center justify-between gap-4 mb-6 max-w-xl mx-auto scroll-reveal">
              <div className="text-xs font-mono text-neutral-400 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-white shadow-[0_0_6px_rgba(255,255,255,0.8)]" />
                <span>Kartu {activeStackIndex + 1} dari {PROJECTS_DATA.length}</span>
              </div>

              {/* Stack Controls: Prev, Dots, Next, Auto-Play */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setActiveStackIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length)}
                  aria-label="Kartu Sebelumnya"
                  className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    isDark 
                      ? 'border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30' 
                      : 'border-black/10 bg-white text-neutral-700 hover:text-black hover:border-black/20'
                  }`}
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>

                {/* Dot Indicators */}
                <div className="flex items-center gap-1.5 px-2">
                  {PROJECTS_DATA.map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setActiveStackIndex(i)}
                      className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        activeStackIndex === i 
                          ? 'w-6 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]' 
                          : 'w-2 bg-neutral-600 hover:bg-neutral-400'
                      }`}
                      aria-label={`Pilih Kartu ${i + 1}`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setActiveStackIndex((prev) => (prev + 1) % PROJECTS_DATA.length)}
                  aria-label="Kartu Berikutnya"
                  className={`p-2 rounded-xl border transition-all active:scale-95 cursor-pointer ${
                    isDark 
                      ? 'border-white/15 bg-white/5 text-neutral-300 hover:text-white hover:border-white/30' 
                      : 'border-black/10 bg-white text-neutral-700 hover:text-black hover:border-black/20'
                  }`}
                >
                  <ChevronRight className="w-4 h-4" />
                </button>

                {/* Auto-Cycle Toggle */}
                <button
                  onClick={() => setIsAutoCycle((prev) => !prev)}
                  title="Toggle Otomatis Geser Kartu"
                  className={`px-3 py-1.5 rounded-xl border text-xs font-mono flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAutoCycle
                      ? 'border-white/30 bg-white/10 text-white shadow-[0_0_10px_rgba(255,255,255,0.1)]'
                      : isDark
                        ? 'border-white/10 bg-white/5 text-neutral-400'
                        : 'border-black/10 bg-white text-neutral-600'
                  }`}
                >
                  {isAutoCycle ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
                  <span>{isAutoCycle ? 'Auto: ON' : 'Auto: OFF'}</span>
                </button>
              </div>
            </div>

            {/* === STACKED CARD DECK (PERSIS SEPERTI GAMBAR CONTOH) === */}
            <div 
              onMouseEnter={() => setIsStackHovered(true)}
              onMouseLeave={() => setIsStackHovered(false)}
              onTouchStart={(e) => {
                touchStartY.current = e.touches[0].clientY;
              }}
              onTouchEnd={(e) => {
                if (touchStartY.current !== null) {
                  const deltaY = e.changedTouches[0].clientY - touchStartY.current;
                  if (deltaY < -40) {
                    setActiveStackIndex((prev) => (prev + 1) % PROJECTS_DATA.length);
                  } else if (deltaY > 40) {
                    setActiveStackIndex((prev) => (prev - 1 + PROJECTS_DATA.length) % PROJECTS_DATA.length);
                  }
                }
                touchStartY.current = null;
              }}
              className="relative w-full max-w-xl mx-auto h-[480px] sm:h-[460px] pt-28 pb-6 select-none"
            >
              {/* Network topology connected lines in background (matching screenshot) */}
              <svg className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-full max-w-2xl h-48 pointer-events-none opacity-40" viewBox="0 0 600 140" fill="none">
                <path d="M40 20 L180 80 L300 45 L420 90 L560 30" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="text-neutral-500" />
                <path d="M120 120 L300 45 L480 120" stroke="currentColor" strokeWidth="1" className="text-neutral-600" />
                <circle cx="180" cy="80" r="4" className="fill-neutral-400" />
                <circle cx="300" cy="45" r="5" className="fill-white" />
                <circle cx="420" cy="90" r="4" className="fill-neutral-400" />
                <circle cx="120" cy="120" r="4" className="fill-neutral-500" />
                <circle cx="480" cy="120" r="4" className="fill-neutral-500" />
              </svg>

              {/* Stacked Cards */}
              {PROJECTS_DATA.map((project, idx) => {
                const offset = (idx - activeStackIndex + PROJECTS_DATA.length) % PROJECTS_DATA.length;
                const translateY = -offset * 36;
                const scale = 1 - offset * 0.045;
                const zIndex = 30 - offset * 8;
                const opacity = offset === 0 ? 1 : Math.max(0.45, 1 - offset * 0.16);
                const isFront = offset === 0;

                return (
                  <div
                    key={project.id}
                    onClick={() => {
                      if (!isFront) {
                        setActiveStackIndex(idx);
                      }
                    }}
                    style={{
                      transform: `translateY(${translateY}px) scale(${scale})`,
                      zIndex,
                      opacity,
                      transition: 'all 0.6s cubic-bezier(0.16, 1, 0.3, 1)'
                    }}
                    className={`absolute inset-x-0 mx-auto rounded-3xl p-6 sm:p-7 cursor-pointer transition-shadow ${
                      isDark 
                        ? 'glass-panel-dark hover:border-white/30' 
                        : 'glass-panel-light hover:border-black/20'
                    } ${isFront ? 'shadow-[0_25px_60px_-15px_rgba(0,0,0,0.8),0_0_35px_rgba(255,255,255,0.08)]' : ''}`}
                  >
                    <div className="glass-sheen-top" />

                    {/* TOP TAB ROW (PERSIS SEPERTI GAMBAR CONTOH) */}
                    <div className="flex items-center justify-between gap-3 mb-4">
                      
                      {/* Pill Badge on Left (e.g. • BOT & OTOMASI) */}
                      <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-mono tracking-wider font-semibold border ${project.pillColor.bg} ${project.pillColor.text} ${project.pillColor.border}`}>
                        <span className={`w-1.5 h-1.5 rounded-full ${project.pillColor.dot}`} />
                        <span>{project.tabPill}</span>
                      </span>

                      {/* Right Subtitle Text (e.g. Node.js & WhatsApp) */}
                      <span className={`text-[11px] font-mono tracking-tight ${
                        isDark ? 'text-neutral-400' : 'text-neutral-500'
                      }`}>
                        {project.tabSub}
                      </span>
                    </div>

                    {/* Project Title (Bold Headline like in screenshot) */}
                    <h3 className={`text-xl sm:text-2xl font-bold tracking-tight mb-2.5 transition-colors ${
                      isDark ? 'text-white' : 'text-neutral-900'
                    }`}>
                      {project.title}
                    </h3>

                    {/* Description Text */}
                    <p className={`text-xs sm:text-sm leading-relaxed mb-5 line-clamp-3 ${
                      isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'
                    }`}>
                      {project.description}
                    </p>

                    {/* Tech Stack Pills */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.techStack.map((tech, tIdx) => (
                        <span 
                          key={tIdx}
                          className={`text-[10px] font-mono px-2.5 py-0.5 rounded-md border ${
                            isDark ? 'border-white/10 bg-white/5 text-neutral-300' : 'border-black/10 bg-neutral-100 text-neutral-700'
                          }`}
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    {/* Bottom dividing line & footer row (matching screenshot) */}
                    <div className={`pt-4 border-t flex items-center justify-between gap-3 ${
                      isDark ? 'border-white/10' : 'border-black/5'
                    }`}>
                      {/* Left status / label */}
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-white">
                          {project.footerLeft}
                        </span>
                      </div>

                      {/* Right Actions */}
                      <div className="flex items-center gap-2">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedProject(project);
                          }}
                          className={`px-3 py-1.5 rounded-xl border text-[11px] font-mono transition-colors ${
                            isDark 
                              ? 'border-white/15 bg-white/5 text-neutral-300 hover:text-white' 
                              : 'border-black/10 bg-neutral-100 text-neutral-700 hover:text-black'
                          }`}
                        >
                          Rincian
                        </button>

                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className={`inline-flex items-center gap-1.5 px-4 py-1.5 rounded-xl font-semibold text-xs tracking-wider uppercase transition-all duration-200 hover:scale-105 active:scale-95 shadow-md ${
                            isDark 
                              ? 'bg-white text-black hover:bg-neutral-200' 
                              : 'bg-black text-white hover:bg-neutral-800'
                          }`}
                        >
                          <span>Buka Web</span>
                          <ExternalLink className="w-3 h-3" />
                        </a>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>

            {/* Direct Quick Link Cards Row for all 4 projects */}
            <div className="mt-16 grid grid-cols-2 sm:grid-cols-4 gap-3 scroll-reveal">
              {PROJECTS_DATA.map((p, idx) => (
                <div
                  key={p.id}
                  onClick={() => setActiveStackIndex(idx)}
                  className={`p-3.5 rounded-2xl border text-left cursor-pointer transition-all duration-200 hover:-translate-y-1 ${
                    activeStackIndex === idx
                      ? isDark 
                        ? 'border-white/40 bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.1)]' 
                        : 'border-black/30 bg-black/5 shadow-sm'
                      : isDark
                        ? 'border-white/10 bg-white/5 hover:border-white/20'
                        : 'border-black/5 bg-white hover:border-black/15 shadow-xs'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className={`text-[10px] font-mono ${p.pillColor.text}`}>
                      {p.categoryLabel}
                    </span>
                    <a
                      href={p.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={(e) => e.stopPropagation()}
                      className="text-neutral-400 hover:text-white"
                      title="Buka langsung"
                    >
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                  <div className={`text-xs font-bold truncate ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                    {p.title}
                  </div>
                  <div className="text-[10px] font-mono text-neutral-400 truncate mt-0.5">
                    {p.domain}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 5. WHATSAPP COMMUNITY CHANNELS SECTION */}
        <section id="channels" className={`py-20 px-4 sm:px-6 border-t ${
          isDark ? 'border-white/10 bg-[#050505]' : 'border-black/5 bg-[#F5F5F5]'
        }`}>
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center max-w-2xl mx-auto mb-14 scroll-reveal">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center justify-center gap-1.5">
                <Radio className="w-3.5 h-3.5 text-white" />
                <span>Saluran WhatsApp NexaDev</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 animate-white-shimmer">
                Gabung ke Saluran WhatsApp Saya
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'
              }`}>
                Saya sering share update script PHP, script bot Node.js, source code belajar, dan info seputar web di dua channel ini.
              </p>
            </div>

            {/* Dual Channel Cards with Glassmorphism */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
              
              {/* Channel 1 */}
              <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl scroll-reveal ${
                isDark ? 'glass-panel-dark hover:border-white/30' : 'glass-panel-light hover:border-black/20'
              }`}>
                <div className="glass-sheen-top" />
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                    isDark ? 'border-white/15 bg-white/10 text-white' : 'border-black/10 bg-black/5 text-black'
                  }`}>
                    <Radio className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-white/20 bg-white/5 text-white">
                    Saluran 1
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  NexaDev Source &amp; Update
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'}`}>
                  Saluran pertama untuk berbagi script PHP &amp; Node.js yang sudah selesai diuji, update fitur baru, dan file latihan harian.
                </p>

                <ul className={`space-y-2 mb-8 text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Update script gratis dan source code proyek</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Catatan dan tips sederhana seputar pembuatan website</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Info rilis berkala saat ada fitur baru</span>
                  </li>
                </ul>

                <a 
                  href="https://whatsapp.com/channel/0029Vb7TkCcD38CStrAMMb3N" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-bold text-xs tracking-wider uppercase transition-all duration-200 hover:bg-neutral-200 hover:scale-102 active:scale-98 shadow-lg"
                >
                  <span>Gabung Saluran 1</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

              {/* Channel 2 */}
              <div className={`p-8 rounded-3xl border transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl scroll-reveal ${
                isDark ? 'glass-panel-dark hover:border-white/30' : 'glass-panel-light hover:border-black/20'
              }`}>
                <div className="glass-sheen-top" />
                <div className="flex items-start justify-between mb-6">
                  <div className={`w-12 h-12 rounded-2xl border flex items-center justify-center ${
                    isDark ? 'border-white/15 bg-white/10 text-white' : 'border-black/10 bg-black/5 text-black'
                  }`}>
                    <Bot className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-mono tracking-wider uppercase border border-white/20 bg-white/5 text-white">
                    Saluran 2
                  </span>
                </div>

                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-neutral-900'}`}>
                  NexaDev Bot Network &amp; Script
                </h3>
                <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'}`}>
                  Saluran khusus untuk otomasi bot WhatsApp, script reaction channel, konfigurasi server webhook, dan pengujian bot.
                </p>

                <ul className={`space-y-2 mb-8 text-xs ${isDark ? 'text-neutral-300' : 'text-neutral-700'}`}>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Tutorial dan konfigurasi bot WhatsApp Node.js</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Script reaction channel otomatis siap pakai</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <Check className="w-4 h-4 text-white flex-shrink-0" />
                    <span>Update server dan status uptime proyek</span>
                  </li>
                </ul>

                <a 
                  href="https://whatsapp.com/channel/0029Vb7QoGaGE56qLZXp1H1j" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="w-full inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl bg-white text-black font-bold text-xs tracking-wider uppercase transition-all duration-200 hover:bg-neutral-200 hover:scale-102 active:scale-98 shadow-lg"
                >
                  <span>Gabung Saluran 2</span>
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>

            </div>

          </div>
        </section>

        {/* 6. CONTACT SECTION - Friendly & Honest */}
        <section id="contact" className={`py-20 px-4 sm:px-6 border-t ${
          isDark ? 'border-white/10 bg-[#000000]' : 'border-black/5 bg-[#FAFAFA]'
        }`}>
          <div className="max-w-4xl mx-auto">
            
            <div className="text-center max-w-xl mx-auto mb-12 scroll-reveal">
              <div className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2 flex items-center justify-center gap-1.5">
                <Send className="w-3.5 h-3.5 text-white" />
                <span>Kirim Pesan</span>
              </div>
              <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight mb-3 animate-white-shimmer">
                Hubungi NexaDev
              </h2>
              <p className={`text-sm sm:text-base leading-relaxed ${
                isDark ? 'text-[#A3A3A3]' : 'text-neutral-600'
              }`}>
                Punya saran, pertanyaan seputar script, atau ingin ngobrol seputar PHP dan Node.js? Tulis pesan kamu di bawah.
              </p>
            </div>

            {/* Form Box with Glassmorphism */}
            <div className={`p-6 sm:p-10 rounded-3xl border transition-all scroll-reveal ${
              isDark ? 'glass-panel-dark' : 'glass-panel-light'
            }`}>
              <div className="glass-sheen-top" />
              
              {submitSuccess && (
                <div className="mb-6 p-4 rounded-2xl border border-white/30 bg-white/10 text-white text-xs sm:text-sm flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 flex-shrink-0 text-white" />
                  <span>Terima kasih! Pesan kamu sudah terkirim dengan baik. Saya akan segera membalasnya.</span>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  
                  {/* Name field */}
                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                      isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Nama Kamu
                    </label>
                    <input
                      type="text"
                      placeholder="Misal: Andi"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none ${
                        formErrors.name 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : isDark 
                            ? 'border-white/15 bg-white/5 text-white focus:border-white/40 shadow-inner' 
                            : 'border-black/15 bg-black/5 text-black focus:border-black/30'
                      }`}
                    />
                    {formErrors.name && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.name}</span>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                      isDark ? 'text-neutral-300' : 'text-neutral-700'
                    }`}>
                      Email Kamu
                    </label>
                    <input
                      type="email"
                      placeholder="nama@email.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none ${
                        formErrors.email 
                          ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                          : isDark 
                            ? 'border-white/15 bg-white/5 text-white focus:border-white/40 shadow-inner' 
                            : 'border-black/15 bg-black/5 text-black focus:border-black/30'
                      }`}
                    />
                    {formErrors.email && (
                      <span className="text-[11px] text-red-400 mt-1 block">{formErrors.email}</span>
                    )}
                  </div>

                </div>

                {/* Message field */}
                <div>
                  <label className={`block text-xs font-mono uppercase tracking-wider mb-2 ${
                    isDark ? 'text-neutral-300' : 'text-neutral-700'
                  }`}>
                    Isi Pesan
                  </label>
                  <textarea
                    rows={4}
                    placeholder="Tulis pesan, saran, atau pertanyaan kamu di sini..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border text-sm transition-all focus:outline-none resize-none ${
                      formErrors.message 
                        ? 'border-red-500 focus:ring-1 focus:ring-red-500' 
                        : isDark 
                          ? 'border-white/15 bg-white/5 text-white focus:border-white/40 shadow-inner' 
                          : 'border-black/15 bg-black/5 text-black focus:border-black/30'
                    }`}
                  />
                  {formErrors.message && (
                    <span className="text-[11px] text-red-400 mt-1 block">{formErrors.message}</span>
                  )}
                </div>

                {/* Submit button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-2xl font-bold text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                    isSubmitting
                      ? 'bg-neutral-600 text-white cursor-not-allowed'
                      : isDark
                        ? 'bg-white text-black hover:bg-neutral-200 hover:scale-102 active:scale-98 shadow-lg'
                        : 'bg-black text-white hover:bg-neutral-800 hover:scale-102 active:scale-98 shadow-md'
                  }`}
                >
                  <Send className="w-4 h-4" />
                  <span>{isSubmitting ? 'Mengirim...' : 'Kirim Pesan'}</span>
                </button>
              </form>

            </div>

          </div>
        </section>

      </main>

      {/* 7. FOOTER */}
      <footer className={`py-12 px-4 sm:px-6 border-t ${
        isDark ? 'border-white/10 bg-[#000000]' : 'border-black/5 bg-[#FAFAFA]'
      }`}>
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6">
          
          <div className="flex items-center gap-3">
            <img 
              src="https://clooud.my.id/uploder/uploads/imaljc.jpg" 
              alt="NexaDev" 
              className="w-7 h-7 rounded-full object-cover border border-white/20"
            />
            <div className="text-xs">
              <span className="font-bold text-white">NexaDev</span>
              <span className="text-neutral-500 ml-2">© {new Date().getFullYear()} • Terus belajar &amp; berkarya</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs text-neutral-400">
            <a 
              href="https://whatsapp.com/channel/0029Vb7TkCcD38CStrAMMb3N" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              WA Saluran 1
            </a>
            <a 
              href="https://whatsapp.com/channel/0029Vb7QoGaGE56qLZXp1H1j" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              WA Saluran 2
            </a>
            <a 
              href="https://react.nexapanel.my.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Reaction
            </a>
            <a 
              href="https://api.nexadev.my.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              API
            </a>
            <a 
              href="https://uploder.nexadev.my.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Uploader
            </a>
            <a 
              href="https://fixioo.my.id" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="hover:text-white transition-colors"
            >
              Fixioo
            </a>
          </div>

        </div>
      </footer>

      {/* 8. FLOATING WHATSAPP BAR (Glassmorphism + White Light) */}
      <aside aria-label="Akses Cepat Saluran WhatsApp" className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 px-4 w-full max-w-xl pointer-events-none">
        <div 
          className={`pointer-events-auto animate-floating-bar rounded-3xl border p-3 sm:p-3.5 shadow-2xl backdrop-blur-2xl transition-all duration-300 relative ${
            isDark ? 'glass-panel-dark' : 'glass-panel-light'
          }`}
        >
          <div className="glass-sheen-top" />
          <div className="flex items-center justify-between gap-3">
            
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-2xl border text-white ${
                isDark ? 'border-white/20 bg-white/10' : 'border-black/10 bg-black/5'
              }`}>
                <MessageSquare className="w-4 h-4 animate-pulse" />
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-xs font-bold tracking-tight">
                  <span className="animate-glass-light font-bold">Saluran WhatsApp NexaDev</span>
                  <span className="hidden sm:inline-block text-[9px] font-mono px-1.5 py-0.2 rounded bg-white/10 text-white border border-white/20">AKTIF</span>
                </div>
                <div className="text-[10px] text-neutral-400 hidden sm:block">
                  Update script PHP, bot Node.js &amp; sharing koding
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <a
                href="https://whatsapp.com/channel/0029Vb7TkCcD38CStrAMMb3N"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                <span>Channel 1</span>
                <ChevronRight className="w-3 h-3 text-neutral-500" />
              </a>

              <a
                href="https://whatsapp.com/channel/0029Vb7QoGaGE56qLZXp1H1j"
                target="_blank"
                rel="noopener noreferrer"
                className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-xl text-xs font-semibold border transition-all duration-200 hover:scale-105 active:scale-95 shadow-sm ${
                  isDark ? 'border-white/20 bg-white/10 text-white hover:bg-white/20' : 'border-black/20 bg-white text-black hover:bg-neutral-100'
                }`}
              >
                <span>Channel 2</span>
                <ChevronRight className="w-3 h-3" />
              </a>
            </div>

          </div>
        </div>
      </aside>

      {/* 9. BACK TO TOP BUTTON */}
      {showBackToTop && (
        <button
          onClick={scrollToTop}
          aria-label="Kembali ke atas"
          className={`fixed bottom-24 right-5 sm:right-8 z-40 p-3 rounded-full border shadow-xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer backdrop-blur-2xl ${
            isDark 
              ? 'border-white/20 bg-white/10 text-white hover:bg-white/20 shadow-[0_0_20px_rgba(255,255,255,0.15)]' 
              : 'border-black/10 bg-white text-black hover:bg-neutral-100 shadow-md'
          }`}
        >
          <ArrowUp className="w-4 h-4 text-white" />
        </button>
      )}

      {/* 10. PROJECT DETAIL MODAL (Glassmorphic Window) */}
      {selectedProject && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-xl animate-fade-in"
          onClick={() => setSelectedProject(null)}
        >
          <div 
            className={`w-full max-w-xl rounded-3xl border p-6 sm:p-8 max-h-[90vh] overflow-y-auto shadow-2xl relative ${
              isDark ? 'glass-panel-dark text-white' : 'glass-panel-light text-black'
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="glass-sheen-top" />

            {/* Close button */}
            <button
              onClick={() => setSelectedProject(null)}
              className="absolute top-5 right-5 p-2 rounded-2xl text-neutral-400 hover:text-white hover:bg-white/10 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 text-xs font-mono text-neutral-300 mb-2">
              <Globe className="w-3.5 h-3.5 text-white" />
              <span>{selectedProject.domain}</span>
            </div>

            <h3 className="text-2xl font-bold mb-2">{selectedProject.title}</h3>
            <p className={`text-xs sm:text-sm leading-relaxed mb-6 ${isDark ? 'text-neutral-300' : 'text-neutral-600'}`}>
              {selectedProject.description}
            </p>

            {/* Specs detail table */}
            <div className={`rounded-2xl border p-4 sm:p-5 mb-6 space-y-3 text-xs font-mono ${
              isDark ? 'border-white/10 bg-black/40' : 'border-black/10 bg-white/60'
            }`}>
              <div>
                <span className="text-neutral-500 block text-[10px]">BAHASA / TEKNOLOGI</span>
                <span className="font-semibold text-white">{selectedProject.specs.language}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">RUNTIME / SERVER</span>
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-800'}>{selectedProject.specs.runtime}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">FUNGSI UTAMA</span>
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-800'}>{selectedProject.specs.fungsi}</span>
              </div>
              <div>
                <span className="text-neutral-500 block text-[10px]">CATATAN BELAJAR</span>
                <span className={isDark ? 'text-neutral-300' : 'text-neutral-800'}>{selectedProject.specs.catatan}</span>
              </div>
            </div>

            {/* Action buttons */}
            <div className="flex items-center gap-3">
              <a
                href={selectedProject.url}
                target="_blank"
                rel="noopener noreferrer"
                className={`flex-1 inline-flex items-center justify-center gap-2 px-5 py-3 rounded-2xl font-semibold text-xs transition-all duration-200 hover:scale-102 active:scale-98 shadow-md ${
                  isDark ? 'bg-white text-black hover:bg-neutral-200' : 'bg-black text-white hover:bg-neutral-800'
                }`}
              >
                <span>Buka Website Langsung</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>

              <button
                onClick={() => setSelectedProject(null)}
                className={`px-5 py-3 rounded-2xl border text-xs font-semibold transition-colors ${
                  isDark ? 'border-white/15 text-neutral-300 hover:text-white' : 'border-black/10 text-neutral-700 hover:text-black'
                }`}
              >
                Tutup
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
}
