import { useState, useEffect, useRef } from "react";
import {
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Star,
  CheckCircle,
  ArrowRight,
  Play,
  BookOpen,
  Users,
  Award,
  Clock,
  Globe,
  TrendingUp,
  Shield,
  MapPin,
  Phone,
  Mail,
  MessageCircle,
  Download,
  FileText,
  Mic,
  BarChart2,
  Headphones,
  PenTool,
  Eye,
  Zap,
  Target,
  Heart,
  GraduationCap,
  CalendarDays,
  Layers,
  ChevronUp,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

/* ─── helpers ─────────────────────────────────────────────── */
const cn = (...cls: (string | undefined | false)[]) =>
  cls.filter(Boolean).join(" ");

/* ─── data ─────────────────────────────────────────────────── */
const NAV_LINKS = [
  { label: "Home", href: "#hero" },
  { label: "Written Expression", href: "#written-expression" },
  { label: "Oral Expression", href: "#oral-expression" },
  {
    label: "Reading Comprehension",
    href: "#reading-comprehension",
  },
  { label: "Oral Comprehension", href: "#oral-comprehension" },
];

const STATS = [
  { value: "12,000+", label: "Students Enrolled", icon: Users },
  { value: "94%", label: "Pass Rate", icon: Award },
  {
    value: "8.2",
    label: "Avg. Score Achieved",
    icon: TrendingUp,
  },
  {
    value: "50+",
    label: "Expert Instructors",
    icon: GraduationCap,
  },
];

const COURSES = [
  {
    badge: "Most Popular",
    badgeColor: "bg-blue-600 text-white",
    level: "B1 → B2",
    title: "TCF Canada Intensive Prep",
    desc: "A structured 8-week program covering all five TCF Canada modules: Listening, Reading, Writing, Speaking, and Oral Production.",
    duration: "8 Weeks",
    lessons: "64 Lessons",
    students: "3,840",
    rating: "4.9",
    price: "$299",
    originalPrice: "$499",
    img: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop&auto=format",
    highlights: [
      "Live instructor sessions",
      "Mock exam included",
      "Score guarantee",
    ],
  },
  {
    badge: "Beginner Friendly",
    badgeColor: "bg-emerald-600 text-white",
    level: "A1 → B1",
    title: "Foundation French + TCF",
    desc: "Start from scratch and build the vocabulary, grammar, and exam strategies needed to reach immigration-level French proficiency.",
    duration: "12 Weeks",
    lessons: "96 Lessons",
    students: "2,210",
    rating: "4.8",
    price: "$349",
    originalPrice: "$599",
    img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600&h=400&fit=crop&auto=format",
    highlights: [
      "Grammar from zero",
      "Vocabulary builder",
      "Pronunciation coaching",
    ],
  },
  {
    badge: "Fast Track",
    badgeColor: "bg-red-500 text-white",
    level: "B2 → C1",
    title: "Advanced TCF Score Booster",
    desc: "Designed for near-fluent speakers who need to maximize their TCF Canada score for Express Entry or provincial nomination programs.",
    duration: "4 Weeks",
    lessons: "32 Lessons",
    students: "1,450",
    rating: "5.0",
    price: "$199",
    originalPrice: "$349",
    img: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&h=400&fit=crop&auto=format",
    highlights: [
      "Score optimization",
      "Exam simulation",
      "1-on-1 coaching",
    ],
  },
];

const EXAM_SKILLS = [
  {
    icon: Headphones,
    label: "Listening Comprehension",
    color: "bg-blue-50 text-blue-600",
    desc: "35 questions · 25 min",
  },
  {
    icon: BookOpen,
    label: "Reading Comprehension",
    color: "bg-indigo-50 text-indigo-600",
    desc: "29 questions · 45 min",
  },
  {
    icon: PenTool,
    label: "Written Expression",
    color: "bg-purple-50 text-purple-600",
    desc: "2 tasks · 60 min",
  },
  {
    icon: Mic,
    label: "Oral Expression",
    color: "bg-rose-50 text-rose-600",
    desc: "4 tasks · 12 min",
  },
  {
    icon: Eye,
    label: "Oral Comprehension",
    color: "bg-orange-50 text-orange-600",
    desc: "15 questions · 20 min",
  },
];

const FEATURES = [
  {
    icon: Target,
    title: "TCF-Focused Curriculum",
    desc: "Every lesson maps directly to official TCF Canada question types and scoring rubrics.",
  },
  {
    icon: Zap,
    title: "Adaptive Practice Engine",
    desc: "Our AI identifies your weak areas and dynamically serves questions to close gaps faster.",
  },
  {
    icon: Users,
    title: "Live Instructor Support",
    desc: "Weekly live sessions with certified Alliance Française instructors available in your time zone.",
  },
  {
    icon: Shield,
    title: "Score Guarantee",
    desc: "If you complete our program and don't hit your target band, we'll extend your access free of charge.",
  },
  {
    icon: Globe,
    title: "Learn From Anywhere",
    desc: "Mobile-optimized platform, offline downloads, and flexible scheduling built for busy professionals.",
  },
  {
    icon: FileText,
    title: "Official Mock Exams",
    desc: "10 full-length practice tests modelled after the real TCF Canada with instant band-score feedback.",
  },
];

const TESTIMONIALS = [
  {
    name: "Priya Nair",
    origin: "India → Montreal, QC",
    score: "B2 · 523 points",
    quote:
      "I had only 6 weeks before my Express Entry deadline. The intensive prep course got me from B1 to a solid B2. I submitted my profile and received an ITA within two months!",
    img: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=120&h=120&fit=crop&auto=format",
    program: "TCF Canada Intensive",
  },
  {
    name: "Carlos Mendes",
    origin: "Brazil → Ottawa, ON",
    score: "C1 · 699 points",
    quote:
      "The speaking module coaching was exceptional. My instructor recorded and analyzed every practice session. I went from dreading oral production to scoring in the top 10% nationally.",
    img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&h=120&fit=crop&auto=format",
    program: "Advanced Score Booster",
  },
  {
    name: "Amira Khalil",
    origin: "Morocco → Calgary, AB",
    score: "B2 · 541 points",
    quote:
      "As a working mother, the flexible online schedule was essential. The app let me practice during lunch breaks. Three months later I had my permanent residency file complete.",
    img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=120&h=120&fit=crop&auto=format",
    program: "Foundation French + TCF",
  },
  {
    name: "Jin-Ho Park",
    origin: "South Korea → Vancouver, BC",
    score: "B2 · 518 points",
    quote:
      "The mock exams were nearly identical to the real test — same interface, same timing pressure, same question formats. Nothing surprised me on exam day.",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&h=120&fit=crop&auto=format",
    program: "TCF Canada Intensive",
  },
];

const PLANS = [
  {
    name: "Self-Paced",
    price: "$99",
    period: "/one-time",
    desc: "All course videos, quizzes, and reading materials. Learn at your own pace with lifetime access.",
    features: [
      "Full video library (60+ hours)",
      "5 mock exams with feedback",
      "Vocabulary & grammar workbooks",
      "Community forum access",
      "Certificate of completion",
    ],
    cta: "Get Started",
    highlight: false,
  },
  {
    name: "Intensive",
    price: "$299",
    period: "/8 weeks",
    desc: "Everything in Self-Paced plus live weekly classes, personal score tracking, and instructor support.",
    features: [
      "Everything in Self-Paced",
      "8 live weekly group sessions",
      "10 full mock exams",
      "Personal progress dashboard",
      "WhatsApp instructor support",
      "Score guarantee included",
    ],
    cta: "Enroll Now",
    highlight: true,
  },
  {
    name: "Private Coaching",
    price: "$599",
    period: "/month",
    desc: "One-on-one sessions with a senior instructor. Fastest path to your target band, fully customized.",
    features: [
      "Everything in Intensive",
      "8 private 60-min sessions",
      "Custom study plan",
      "Exam booking assistance",
      "Priority email & call support",
      "Lifetime access to materials",
    ],
    cta: "Book a Call",
    highlight: false,
  },
];


const WRITTEN_TASKS = [
  {
    task: "Task 1",
    title: "Personal message",
    time: "18 min",
    words: "80–120 words",
    brief:
      "Write a clear everyday message: request information, explain a situation, invite someone, or respond politely to a practical scenario.",
  },
  {
    task: "Task 2",
    title: "Argumentative writing",
    time: "42 min",
    words: "180–220 words",
    brief:
      "Develop a structured point of view with examples, transitions, and a strong conclusion that fits TCF Canada scoring expectations.",
  },
];

const WRITING_METHOD = [
  "Diagnose your current grammar, vocabulary range, and coherence gaps.",
  "Learn reusable French structures for opinions, concessions, causes, and consequences.",
  "Write timed responses, then receive rubric-based correction and model rewrites.",
  "Build a personal error bank so every draft directly improves your exam score.",
];

const WRITING_RUBRIC = [
  { label: "Task response", value: "Clear fulfilment of prompt", pct: "92%" },
  { label: "Coherence", value: "Logical paragraphs and connectors", pct: "88%" },
  { label: "Grammar control", value: "Accurate tenses and agreement", pct: "84%" },
  { label: "Lexical range", value: "Precise immigration-ready vocabulary", pct: "90%" },
];

const FAQS = [
  {
    q: "What is the TCF Canada exam and who needs it?",
    a: "The TCF Canada (Test de connaissance du français pour le Canada) is an official French language proficiency test recognized by Immigration, Refugees and Citizenship Canada (IRCC). It is required for Express Entry, Provincial Nominee Programs, and Quebec immigration pathways. Scores are expressed on the NCLC (Niveaux de compétence linguistique canadiens) scale.",
  },
  {
    q: "How long does it take to prepare for TCF Canada?",
    a: "Preparation time depends on your starting level. Most students at A2–B1 need 8–12 weeks of structured study to reach the B2 level required for maximum Express Entry CRS points. Our placement test will give you a personalized timeline after signup.",
  },
  {
    q: "Is the course available online or only in person?",
    a: "We offer fully online live sessions via Zoom, self-paced video courses, and in-person weekend workshops in Toronto, Montreal, Vancouver, and Calgary. You can mix and match modalities within any plan.",
  },
  {
    q: "What score do I need for Express Entry?",
    a: "For maximum CRS points under Express Entry, IRCC requires a CLB 9 (approximately 549 TCF Canada points) for first language and CLB 7 (approximately 453 points) for second language. Our Intensive program is designed specifically around these benchmark targets.",
  },
  {
    q: "Do you offer a free trial before I enroll?",
    a: "Yes — all new students receive free access to Module 1 (5 lessons), one mock test, and a 30-minute consultation with an advisor. No credit card required.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "We offer a 14-day, no-questions-asked refund on all plans. Our Score Guarantee on Intensive and Private plans means we extend your access at no charge if you complete the program and don't reach your target band.",
  },
];

const RESOURCES = [
  {
    icon: FileText,
    title: "Free TCF Vocabulary PDF",
    desc: "1,200 high-frequency words tested on TCF Canada with context sentences.",
    cta: "Download Free",
    color: "bg-blue-50 border-blue-100",
  },
  {
    icon: BarChart2,
    title: "Level Assessment Quiz",
    desc: "20-question diagnostic that places you on the NCLC scale in under 10 minutes.",
    cta: "Take the Quiz",
    color: "bg-emerald-50 border-emerald-100",
  },
  {
    icon: Play,
    title: "Free Mock Test",
    desc: "Full Listening + Reading section replica with real-time scoring and explanations.",
    cta: "Start Free Test",
    color: "bg-purple-50 border-purple-100",
  },
  {
    icon: CalendarDays,
    title: "Free Consultation",
    desc: "30-minute strategy session with a certified TCF advisor to map your immigration timeline.",
    cta: "Book Your Slot",
    color: "bg-orange-50 border-orange-100",
  },
];

/* ─── sub-components ─────────────────────────────────────── */

function StarRow({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star
          key={i}
          size={14}
          className="fill-amber-400 text-amber-400"
        />
      ))}
    </div>
  );
}

function SectionLabel({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs font-semibold tracking-widest uppercase mb-4">
      {children}
    </div>
  );
}

function PrimaryBtn({
  children,
  className = "",
  onClick,
}: {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-blue-600 text-white text-sm font-semibold",
        "hover:bg-blue-700 active:scale-[.98] transition-all duration-150 shadow-lg shadow-blue-600/20",
        className,
      )}
    >
      {children}
    </button>
  );
}

function OutlineBtn({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <button
      className={cn(
        "inline-flex items-center gap-2 px-6 py-3 rounded-xl border border-slate-200 bg-white text-slate-800 text-sm font-semibold",
        "hover:border-blue-300 hover:text-blue-700 active:scale-[.98] transition-all duration-150",
        className,
      )}
    >
      {children}
    </button>
  );
}

/* ─── sections ──────────────────────────────────────────── */

function Navbar({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);
  return (
    <header
      className={cn(
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-slate-100 shadow-sm"
          : "bg-transparent",
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-18">
          {/* Logo */}
          <a
            href="#hero"
            className="flex items-center gap-2.5 group"
          >
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/30">
              <span className="text-white font-bold text-sm">
                T
              </span>
            </div>
            <div className="leading-tight">
              <span className="font-bold text-slate-900 text-sm tracking-tight">
                TCF Canada
              </span>
              <span className="block text-[10px] text-slate-500 font-medium tracking-wide uppercase">
                French Institute
              </span>
            </div>
          </a>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                className="px-3.5 py-2 rounded-lg text-sm font-medium text-slate-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
              >
                {l.label}
              </a>
            ))}
          </nav>

          {/* CTA cluster */}
          <div className="hidden lg:flex items-center gap-3">
            <PrimaryBtn>
              My Account <ArrowRight size={14} />
            </PrimaryBtn>
          </div>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="lg:hidden p-2 rounded-lg text-slate-600 hover:bg-slate-100"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="lg:hidden bg-white border-b border-slate-100 px-4 pb-4"
          >
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="block py-3 text-sm font-medium text-slate-700 border-b border-slate-50 last:border-0"
              >
                {l.label}
              </a>
            ))}
            <PrimaryBtn className="w-full justify-center mt-4">
              My Account <ArrowRight size={14} />
            </PrimaryBtn>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

function Hero() {
  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      style={{
        background:
          "linear-gradient(135deg, #f0f4ff 0%, #ffffff 50%, #fff5f5 100%)",
      }}
    >
      {/* Background geometry */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 right-0 w-[600px] h-[600px] rounded-full bg-blue-600/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full bg-red-500/5 blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] rounded-full border border-blue-100/50" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-16 items-center py-24">
        {/* Left copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white border border-slate-200 shadow-sm text-xs font-semibold text-slate-600 mb-6">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            Trusted by 12,000+ Immigration Applicants
          </div>

          <h1
            className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "'Playfair Display', Georgia, serif",
            }}
          >
            Ace TCF Canada.{" "}
            <span className="text-blue-600">Move to</span>{" "}
            <span className="relative">
              Canada.
              <span
                className="absolute -bottom-2 left-0 w-full h-1 rounded-full bg-red-500"
                style={{ transform: "rotate(-1deg)" }}
              />
            </span>
          </h1>

          <p className="text-lg text-slate-600 leading-relaxed mb-8 max-w-xl">
            Canada's most results-focused TCF preparation
            program. Structured courses, live instructors, and
            official-format mock exams — everything you need to
            hit your immigration language band.
          </p>

          <div className="flex flex-wrap gap-2 mt-2">
            {[
              "Written Expression",
              "Oral Expression",
              "Reading Comprehension",
              "Oral Comprehension",
            ].map((topic) => (
              <a
                key={topic}
                href={`#${topic.toLowerCase().replace(/ /g, "-")}`}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-white border border-slate-200 text-sm font-medium text-slate-700 hover:border-blue-400 hover:text-blue-700 hover:bg-blue-50 transition-all shadow-sm"
              >
                <ChevronRight
                  size={13}
                  className="text-blue-500"
                />
                {topic}
              </a>
            ))}
          </div>
        </motion.div>

        {/* Right visual */}
        <motion.div
          initial={{ opacity: 0, x: 24 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="relative"
        >
          {/* Main image card */}
          <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-slate-900/15">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&h=600&fit=crop&auto=format"
              alt="Students studying French for TCF Canada immigration exam"
              className="w-full object-cover h-[460px]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/40 via-transparent to-transparent" />
          </div>

          {/* Floating score badge */}
          <div className="absolute -bottom-6 -left-6 bg-white rounded-2xl shadow-xl shadow-slate-900/10 p-4 flex items-center gap-3 border border-slate-100">
            <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center flex-shrink-0">
              <Award size={18} className="text-white" />
            </div>
            <div>
              <div className="text-xs text-slate-500 font-medium">
                Latest Student
              </div>
              <div className="text-sm font-bold text-slate-900">
                B2 · 541 pts
              </div>
              <div className="text-xs text-emerald-600 font-medium">
                +88 pts improvement
              </div>
            </div>
          </div>

          {/* Floating live class badge */}
          <div className="absolute -top-4 -right-4 bg-white rounded-2xl shadow-xl shadow-slate-900/10 p-3.5 border border-slate-100">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse flex-shrink-0" />
              <span className="text-xs font-semibold text-slate-800">
                Live Class Now
              </span>
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              Oral Production · 24 students
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function StatsBar() {
  return (
    <section className="bg-blue-600 py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-0 lg:divide-x lg:divide-blue-500">
          {STATS.map(({ value, label, icon: Icon }) => (
            <div
              key={label}
              className="flex flex-col items-center text-center px-6"
            >
              <div className="w-10 h-10 rounded-xl bg-white/15 flex items-center justify-center mb-3">
                <Icon size={18} className="text-white" />
              </div>
              <div
                className="text-3xl lg:text-4xl font-bold text-white"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {value}
              </div>
              <div className="text-blue-200 text-sm font-medium mt-1">
                {label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

const EXAM_DETAILS = [
  {
    icon: PenTool,
    label: "Written Expression",
    tag: "Expression écrite",
    time: "60 min",
    tasks: "2 tasks",
    maxScore: 699,
    scoreRange: "100–699",
    accent: "#2563eb",
    accentLight: "#eff6ff",
    accentMid: "#bfdbfe",
    description:
      "Demonstrate your ability to write clearly in French through two structured tasks: a personal message (short form) and an argumentative essay or formal letter. Evaluated on vocabulary range, grammatical accuracy, coherence, and discourse organisation.",
    tips: [
      "Plan your essay structure before writing",
      "Use connectors like 'cependant', 'en revanche'",
      "Aim for 160–180 words per task",
    ],
    img: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=700&h=440&fit=crop&auto=format",
  },
  {
    icon: Mic,
    label: "Oral Expression",
    tag: "Expression orale",
    time: "12 min",
    tasks: "4 tasks",
    maxScore: 699,
    scoreRange: "100–699",
    accent: "#ef4444",
    accentLight: "#fff1f2",
    accentMid: "#fecdd3",
    description:
      "Speak naturally and fluently across four interactive scenarios: reacting to a situation, presenting a point of view, describing a photo, and debating a topic. Your pronunciation, fluency, lexical range, and grammatical control are each scored independently.",
    tips: [
      "Practice speaking aloud daily — even 10 minutes",
      "Use fillers like 'en fait' to buy thinking time",
      "Record yourself and listen back critically",
    ],
    img: "https://images.unsplash.com/photo-1590650153855-d9e808231d41?w=700&h=440&fit=crop&auto=format",
  },
  {
    icon: BookOpen,
    label: "Reading Comprehension",
    tag: "Compréhension de l'écrit",
    time: "45 min",
    tasks: "29 questions",
    maxScore: 699,
    scoreRange: "100–699",
    accent: "#7c3aed",
    accentLight: "#f5f3ff",
    accentMid: "#ddd6fe",
    description:
      "Read and analyse authentic French texts — news articles, advertisements, emails, and literary excerpts — then answer multiple-choice questions testing global comprehension, detail identification, and inferencing. Texts increase in complexity across the test.",
    tips: [
      "Skim for gist before reading closely",
      "Watch for negation and quantifiers in questions",
      "Eliminate obviously wrong answers first",
    ],
    img: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=700&h=440&fit=crop&auto=format",
  },
  {
    icon: Headphones,
    label: "Oral Comprehension",
    tag: "Compréhension de l'oral",
    time: "25 min",
    tasks: "29 questions",
    maxScore: 699,
    scoreRange: "100–699",
    accent: "#0891b2",
    accentLight: "#ecfeff",
    accentMid: "#a5f3fc",
    description:
      "Listen to a variety of authentic audio recordings — announcements, conversations, interviews, and radio broadcasts — and answer multiple-choice questions. Recordings are played only once, so focused listening and note-taking strategy are critical skills.",
    tips: [
      "Focus on the first and last sentence of each recording",
      "Note numbers, names, and dates immediately",
      "Anticipate content from the question stem",
    ],
    img: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=700&h=440&fit=crop&auto=format",
  },
];

const NCLC_BANDS = [
  { band: "A1", label: "Beginner", pts: "100", pct: 0 },
  { band: "A2", label: "Elementary", pts: "199", pct: 14 },
  {
    band: "B1",
    label: "Intermediate",
    pts: "299–342",
    pct: 35,
  },
  {
    band: "B2",
    label: "Upper-Intermediate",
    pts: "453–548",
    pct: 60,
  },
  { band: "C1", label: "Advanced", pts: "549–698", pct: 80 },
  { band: "C2", label: "Mastery", pts: "699", pct: 100 },
];

function ExamSection() {
  const [activeTab, setActiveTab] = useState(0);
  const skill = EXAM_DETAILS[activeTab];

  return (
    <section
      id="exam"
      className="py-24 bg-slate-50 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <SectionLabel>
            <BookOpen size={12} /> TCF Canada Explained
          </SectionLabel>
          <h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Five skills. One exam. Your Canadian future.
          </h2>
          <p className="text-slate-500 leading-relaxed">
            TCF Canada evaluates your French across four graded
            skills and one ungraded skill, each mapped to the
            NCLC scale accepted by IRCC for Express Entry and
            all Provincial Nominee Programs.
          </p>
        </div>

        {/* Tab strip */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {EXAM_DETAILS.map((s, i) => {
            const Icon = s.icon;
            const active = i === activeTab;
            return (
              <button
                key={s.label}
                onClick={() => setActiveTab(i)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-semibold border transition-all duration-200",
                  active
                    ? "text-white border-transparent shadow-lg"
                    : "bg-white text-slate-600 border-slate-200 hover:border-slate-300 hover:text-slate-800",
                )}
                style={
                  active
                    ? {
                        background: s.accent,
                        boxShadow: `0 8px 24px ${s.accent}33`,
                      }
                    : {}
                }
              >
                <Icon size={14} />
                {s.label}
              </button>
            );
          })}
        </div>

        {/* Main content card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28 }}
            className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-xl shadow-slate-900/6"
          >
            <div className="grid lg:grid-cols-5">
              {/* Left pane — info */}
              <div className="lg:col-span-3 p-8 lg:p-12 flex flex-col justify-between">
                {/* Top */}
                <div>
                  {/* Skill badge + meta row */}
                  <div className="flex flex-wrap items-center gap-3 mb-6">
                    <span
                      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold"
                      style={{
                        background: skill.accentLight,
                        color: skill.accent,
                      }}
                    >
                      <skill.icon size={12} />
                      {skill.tag}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                      <Clock size={11} /> {skill.time}
                    </span>
                    <span className="flex items-center gap-1.5 text-xs text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1.5 rounded-full">
                      <FileText size={11} /> {skill.tasks}
                    </span>
                    <span
                      className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
                      style={{
                        background: skill.accentMid,
                        color: skill.accent,
                      }}
                    >
                      Score: {skill.scoreRange}
                    </span>
                  </div>

                  <h3
                    className="text-3xl font-bold text-slate-900 mb-4 leading-snug"
                    style={{
                      fontFamily: "'Playfair Display', serif",
                    }}
                  >
                    {skill.label}
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-base mb-8">
                    {skill.description}
                  </p>

                  {/* Tips */}
                  <div
                    className="rounded-2xl p-5 mb-8"
                    style={{
                      background: skill.accentLight,
                      border: `1px solid ${skill.accentMid}`,
                    }}
                  >
                    <div
                      className="text-xs font-bold uppercase tracking-widest mb-3"
                      style={{ color: skill.accent }}
                    >
                      Exam Tips
                    </div>
                    <div className="space-y-2.5">
                      {skill.tips.map((tip) => (
                        <div
                          key={tip}
                          className="flex items-start gap-2.5 text-sm text-slate-700"
                        >
                          <div
                            className="w-4 h-4 rounded-full flex-shrink-0 flex items-center justify-center mt-0.5 text-[9px] font-bold text-white"
                            style={{ background: skill.accent }}
                          >
                            ✓
                          </div>
                          {tip}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Bottom CTA row */}
                <div className="flex flex-wrap gap-3 pt-2 border-t border-slate-100">
                  <button
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold text-white transition-all hover:opacity-90 active:scale-[.98] shadow-md"
                    style={{
                      background: skill.accent,
                      boxShadow: `0 4px 16px ${skill.accent}33`,
                    }}
                  >
                    Practice This Skill <ArrowRight size={14} />
                  </button>
                  <OutlineBtn className="text-sm py-2.5">
                    <Play
                      size={14}
                      className="text-slate-500"
                    />{" "}
                    Watch Free Lesson
                  </OutlineBtn>
                </div>
              </div>

              {/* Right pane — image + score */}
              <div className="lg:col-span-2 relative">
                <div className="h-64 lg:h-full min-h-[320px] relative overflow-hidden">
                  <img
                    src={skill.img}
                    alt={skill.label}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-900/70 via-slate-900/20 to-transparent" />

                  {/* Floating score pill */}
                  <div className="absolute top-5 right-5 bg-white/15 backdrop-blur-md border border-white/25 rounded-2xl px-4 py-3">
                    <div className="text-[10px] text-white/70 font-medium uppercase tracking-widest">
                      Max Score
                    </div>
                    <div
                      className="text-2xl font-bold text-white"
                      style={{
                        fontFamily: "'Playfair Display', serif",
                      }}
                    >
                      699
                    </div>
                    <div className="text-[10px] text-white/60">
                      NCLC points
                    </div>
                  </div>

                  {/* Bottom label */}
                  <div className="absolute bottom-5 left-5 right-5">
                    <div className="text-xs text-white/60 mb-1.5 uppercase tracking-widest font-semibold">
                      NCLC Proficiency Scale
                    </div>
                    <div className="flex items-end gap-1 h-10">
                      {NCLC_BANDS.map((b, i) => (
                        <div
                          key={b.band}
                          className="flex-1 flex flex-col items-center gap-1"
                        >
                          <div
                            className="w-full rounded-sm transition-all"
                            style={{
                              height: `${16 + i * 6}px`,
                              background:
                                i >= 3
                                  ? skill.accent
                                  : "rgba(255,255,255,0.25)",
                            }}
                          />
                          <span className="text-[9px] text-white/60 font-bold">
                            {b.band}
                          </span>
                        </div>
                      ))}
                    </div>
                    <div className="text-[10px] text-white/50 mt-2">
                      B2+ recommended for Express Entry CRS
                      points
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Bottom score guide strip */}
        <div className="mt-10 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
          {NCLC_BANDS.map((b, i) => (
            <div
              key={b.band}
              className={cn(
                "rounded-2xl p-4 border text-center",
                i >= 3
                  ? "bg-blue-600 border-blue-600 text-white"
                  : "bg-white border-slate-200 text-slate-700",
              )}
            >
              <div
                className={cn(
                  "text-lg font-bold",
                  i >= 3 ? "text-white" : "text-slate-900",
                )}
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {b.band}
              </div>
              <div
                className={cn(
                  "text-xs font-medium mt-0.5",
                  i >= 3 ? "text-blue-100" : "text-slate-500",
                )}
              >
                {b.label}
              </div>
              <div
                className={cn(
                  "text-[10px] mt-1 font-mono",
                  i >= 3 ? "text-blue-200" : "text-slate-400",
                )}
              >
                {b.pts} pts
              </div>
              {i === 3 && (
                <div className="mt-2 px-2 py-0.5 rounded-full bg-white/20 text-white text-[9px] font-bold uppercase tracking-wide">
                  Target
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}


function WrittenExpressionPage() {
  return (
    <section
      id="written-expression"
      className="relative overflow-hidden bg-white py-24 lg:py-28"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 right-0 h-80 w-80 rounded-full bg-blue-100/70 blur-3xl" />
        <div className="absolute bottom-12 left-0 h-72 w-72 rounded-full bg-red-100/60 blur-3xl" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-[1.04fr_.96fr] gap-12 lg:gap-16 items-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45 }}
          >
            <SectionLabel>
              <PenTool size={12} /> Written Expression
            </SectionLabel>
            <h2
              className="text-4xl lg:text-6xl font-bold text-slate-900 leading-[1.08] mb-6"
              style={{ fontFamily: "'Playfair Display', serif" }}
            >
              Write French that scores — not French that only sounds correct.
            </h2>
            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl mb-8">
              Our Written Expression page trains you for the exact TCF Canada writing format: timed planning, high-value connectors, paragraph discipline, grammar accuracy, and examiner-friendly argumentation.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <PrimaryBtn>
                Start Writing Assessment <ArrowRight size={14} />
              </PrimaryBtn>
              <OutlineBtn>
                <Download size={14} className="text-blue-600" /> Download writing checklist
              </OutlineBtn>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="relative"
          >
            <div className="rounded-[2rem] border border-slate-200 bg-slate-50 p-3 shadow-2xl shadow-slate-900/10">
              <div className="rounded-[1.5rem] bg-white border border-slate-100 overflow-hidden">
                <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
                  <div>
                    <div className="text-xs font-bold uppercase tracking-widest text-blue-600">Live correction desk</div>
                    <div className="text-sm font-semibold text-slate-900">Expression écrite · Task 2</div>
                  </div>
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-bold text-emerald-700 border border-emerald-100">B2 target</span>
                </div>
                <div className="p-5 space-y-4">
                  <div className="rounded-2xl bg-slate-50 border border-slate-100 p-4">
                    <p className="text-sm leading-relaxed text-slate-700">
                      <span className="font-semibold text-slate-900">Prompt:</span> Faut-il rendre les transports publics gratuits dans les grandes villes canadiennes ? Présentez votre opinion avec des exemples.
                    </p>
                  </div>
                  <div className="space-y-2">
                    {WRITING_RUBRIC.map((item) => (
                      <div key={item.label} className="rounded-2xl border border-slate-100 bg-white p-3">
                        <div className="flex items-center justify-between gap-3 mb-2">
                          <div>
                            <div className="text-sm font-bold text-slate-900">{item.label}</div>
                            <div className="text-xs text-slate-500">{item.value}</div>
                          </div>
                          <div className="text-sm font-bold text-blue-600">{item.pct}</div>
                        </div>
                        <div className="h-2 rounded-full bg-slate-100 overflow-hidden">
                          <div className="h-full rounded-full bg-blue-600" style={{ width: item.pct }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-5 -left-4 rounded-2xl bg-red-500 px-4 py-3 text-white shadow-xl shadow-red-500/25">
              <div className="text-[10px] uppercase tracking-widest font-bold text-red-100">Instructor note</div>
              <div className="text-sm font-bold">Add one concession paragraph</div>
            </div>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6 mb-16">
          {WRITTEN_TASKS.map((task) => (
            <div key={task.task} className="rounded-3xl border border-slate-200 bg-white p-7 shadow-lg shadow-slate-900/5 hover:-translate-y-1 hover:shadow-xl hover:shadow-slate-900/10 transition-all">
              <div className="flex items-center justify-between mb-5">
                <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700 border border-blue-100">{task.task}</span>
                <span className="text-xs font-semibold text-slate-500 flex items-center gap-1.5"><Clock size={12} /> {task.time}</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">{task.title}</h3>
              <div className="text-sm font-semibold text-red-600 mb-3">{task.words}</div>
              <p className="text-sm text-slate-600 leading-relaxed">{task.brief}</p>
            </div>
          ))}
          <div className="rounded-3xl border border-blue-200 bg-blue-600 p-7 text-white shadow-xl shadow-blue-600/20">
            <div className="w-11 h-11 rounded-2xl bg-white/15 flex items-center justify-center mb-5"><Award size={20} /></div>
            <h3 className="text-xl font-bold mb-2">What you receive</h3>
            <p className="text-sm text-blue-100 leading-relaxed mb-5">Every submitted response gets a score estimate, line-by-line corrections, stronger sentence alternatives, and a revision plan.</p>
            <button className="inline-flex items-center gap-2 text-sm font-bold text-white hover:text-blue-100 transition-colors">See correction sample <ArrowRight size={14} /></button>
          </div>
        </div>

        <div className="rounded-[2rem] bg-slate-900 p-8 lg:p-10 text-white overflow-hidden relative">
          <div className="absolute right-0 top-0 h-64 w-64 rounded-full bg-blue-600/20 blur-3xl" />
          <div className="relative grid lg:grid-cols-[.75fr_1.25fr] gap-10 items-start">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-blue-300 mb-3">Our 4-step method</div>
              <h3 className="text-3xl font-bold leading-tight" style={{ fontFamily: "'Playfair Display', serif" }}>A repeatable system for exam-day writing.</h3>
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              {WRITING_METHOD.map((step, index) => (
                <div key={step} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <div className="text-sm font-bold text-blue-300 mb-2">0{index + 1}</div>
                  <p className="text-sm leading-relaxed text-slate-300">{step}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CoursesSection() {
  return (
    <section id="courses" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>
            <Layers size={12} /> Our Programs
          </SectionLabel>
          <h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Choose the right course for your level
          </h2>
          <p className="text-slate-600">
            All programs are taught by Alliance
            Française–certified instructors and include
            official-format practice materials.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {COURSES.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="bg-white rounded-3xl overflow-hidden shadow-md shadow-slate-900/5 border border-slate-100 hover:shadow-xl hover:shadow-slate-900/10 hover:-translate-y-1 transition-all duration-300 group flex flex-col"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={c.img}
                  alt={c.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent" />
                <span
                  className={cn(
                    "absolute top-4 left-4 px-2.5 py-1 rounded-full text-xs font-bold",
                    c.badgeColor,
                  )}
                >
                  {c.badge}
                </span>
                <span className="absolute bottom-4 left-4 px-2.5 py-1 rounded-full bg-white/20 backdrop-blur-sm text-white text-xs font-bold border border-white/30">
                  Level: {c.level}
                </span>
              </div>

              <div className="p-6 flex flex-col flex-1">
                <h3 className="text-lg font-bold text-slate-900 mb-2">
                  {c.title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-4">
                  {c.desc}
                </p>

                <div className="flex items-center gap-4 text-xs text-slate-500 mb-4">
                  <span className="flex items-center gap-1">
                    <Clock size={11} /> {c.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <BookOpen size={11} /> {c.lessons}
                  </span>
                  <span className="flex items-center gap-1">
                    <Users size={11} /> {c.students}
                  </span>
                </div>

                <div className="space-y-1.5 mb-6">
                  {c.highlights.map((h) => (
                    <div
                      key={h}
                      className="flex items-center gap-2 text-xs text-slate-600"
                    >
                      <CheckCircle
                        size={12}
                        className="text-emerald-500 flex-shrink-0"
                      />{" "}
                      {h}
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-slate-100 flex items-center justify-between">
                  <div>
                    <span className="text-2xl font-bold text-slate-900">
                      {c.price}
                    </span>
                    <span className="text-sm text-slate-400 line-through ml-2">
                      {c.originalPrice}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <StarRow />
                    <span className="text-xs font-semibold text-slate-700 ml-1">
                      {c.rating}
                    </span>
                  </div>
                </div>

                <PrimaryBtn className="w-full justify-center mt-4">
                  Enroll Now <ArrowRight size={14} />
                </PrimaryBtn>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-12">
          <OutlineBtn className="text-base px-8 py-3.5">
            View All Courses <ChevronRight size={16} />
          </OutlineBtn>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left image */}
          <div className="relative order-2 lg:order-1">
            <div className="rounded-3xl overflow-hidden shadow-xl shadow-slate-900/10">
              <img
                src="https://images.unsplash.com/photo-1531482615713-2afd69097998?w=700&h=560&fit=crop&auto=format"
                alt="Online French class live session"
                className="w-full object-cover h-[480px]"
              />
            </div>
            {/* Stat overlay */}
            <div className="absolute top-6 -right-6 bg-white rounded-2xl shadow-xl shadow-slate-900/10 border border-slate-100 p-4">
              <div
                className="text-2xl font-bold text-slate-900"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                94%
              </div>
              <div className="text-xs text-slate-500 font-medium">
                students pass on first attempt
              </div>
              <div className="flex gap-0.5 mt-1.5">
                {[...Array(5)].map((_, i) => (
                  <div
                    key={i}
                    className={cn(
                      "h-1.5 flex-1 rounded-full",
                      i < 4 ? "bg-blue-600" : "bg-slate-200",
                    )}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right features */}
          <div className="order-1 lg:order-2">
            <SectionLabel>
              <Zap size={12} /> Why TCF Canada Institute
            </SectionLabel>
            <h2
              className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-6"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Built specifically for Canadian immigration
              success
            </h2>
            <p className="text-slate-600 leading-relaxed mb-10">
              Generic French courses won't prepare you for TCF
              Canada's exam formats or immigration-specific
              requirements. Our program is engineered around
              IRCC benchmarks.
            </p>

            <div className="grid sm:grid-cols-2 gap-5">
              {FEATURES.map(({ icon: Icon, title, desc }) => (
                <div
                  key={title}
                  className="group p-5 rounded-2xl bg-slate-50 hover:bg-blue-50 border border-transparent hover:border-blue-100 transition-all cursor-default"
                >
                  <div className="w-9 h-9 rounded-xl bg-blue-600 flex items-center justify-center mb-3 group-hover:scale-110 transition-transform">
                    <Icon size={16} className="text-white" />
                  </div>
                  <h4 className="text-sm font-bold text-slate-800 mb-1">
                    {title}
                  </h4>
                  <p className="text-xs text-slate-500 leading-relaxed">
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      n: "01",
      icon: Target,
      title: "Take the Free Assessment",
      desc: "Our 10-minute diagnostic places you on the NCLC scale and builds your personalized study roadmap.",
    },
    {
      n: "02",
      icon: BookOpen,
      title: "Follow Your Custom Plan",
      desc: "Structured modules, live sessions, and AI-adaptive drills guide you efficiently to your target band.",
    },
    {
      n: "03",
      icon: FileText,
      title: "Practice with Mock Exams",
      desc: "10 official-format full tests with instant scoring and detailed explanations for every question.",
    },
    {
      n: "04",
      icon: Award,
      title: "Take the Exam & Succeed",
      desc: "Walk in confident. Our students average a 74-point score improvement before their exam date.",
    },
  ];

  return (
    <section className="py-24 bg-slate-900 relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] rounded-full bg-blue-600/10 blur-3xl" />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-blue-300 text-xs font-semibold tracking-widest uppercase mb-4">
            <Zap size={12} /> The Process
          </div>
          <h2
            className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            From enrollment to immigration — in four steps
          </h2>
          <p className="text-slate-400">
            A proven system used by 12,000 students who now live
            in Canada.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map(({ n, icon: Icon, title, desc }, i) => (
            <motion.div
              key={n}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="relative p-6 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/10 hover:border-blue-500/40 transition-all group"
            >
              <span
                className="absolute top-5 right-5 text-5xl font-bold opacity-5 text-white select-none"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                {n}
              </span>
              <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Icon size={18} className="text-white" />
              </div>
              <h3 className="text-base font-bold text-white mb-2">
                {title}
              </h3>
              <p className="text-sm text-slate-400 leading-relaxed">
                {desc}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="testimonials"
      className="py-24 bg-white overflow-hidden"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>
            <Heart size={12} /> Success Stories
          </SectionLabel>
          <h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Real students. Real scores. Real Canadian visas.
          </h2>
          <p className="text-slate-600">
            Over 12,000 students have used our program to meet
            their immigration language requirements.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className="relative bg-gradient-to-br from-blue-600 to-blue-800 rounded-3xl overflow-hidden mb-8 p-8 lg:p-12">
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage:
                "radial-gradient(circle at 80% 20%, white 1px, transparent 1px)",
              backgroundSize: "32px 32px",
            }}
          />
          <div className="relative grid lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <StarRow count={5} />
              <blockquote
                className="text-2xl lg:text-3xl font-semibold text-white leading-relaxed mt-4 mb-6"
                style={{
                  fontFamily: "'Playfair Display', serif",
                }}
              >
                "{TESTIMONIALS[active].quote}"
              </blockquote>
              <div className="flex items-center gap-4">
                <img
                  src={TESTIMONIALS[active].img}
                  alt={TESTIMONIALS[active].name}
                  className="w-12 h-12 rounded-full object-cover border-2 border-white/30"
                />
                <div>
                  <div className="font-bold text-white">
                    {TESTIMONIALS[active].name}
                  </div>
                  <div className="text-blue-200 text-sm">
                    {TESTIMONIALS[active].origin}
                  </div>
                </div>
                <div className="ml-auto bg-white/20 backdrop-blur-sm border border-white/25 rounded-xl px-4 py-2">
                  <div className="text-white font-bold text-sm">
                    {TESTIMONIALS[active].score}
                  </div>
                  <div className="text-blue-200 text-xs">
                    {TESTIMONIALS[active].program}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-3">
              {TESTIMONIALS.map((t, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className={cn(
                    "flex items-center gap-3 p-3 rounded-2xl border transition-all text-left",
                    i === active
                      ? "bg-white border-white/40 shadow-lg"
                      : "bg-white/10 border-white/15 hover:bg-white/20",
                  )}
                >
                  <img
                    src={t.img}
                    alt={t.name}
                    className="w-9 h-9 rounded-full object-cover flex-shrink-0"
                  />
                  <div>
                    <div
                      className={cn(
                        "text-xs font-bold",
                        i === active
                          ? "text-slate-900"
                          : "text-white",
                      )}
                    >
                      {t.name}
                    </div>
                    <div
                      className={cn(
                        "text-xs",
                        i === active
                          ? "text-slate-500"
                          : "text-blue-200",
                      )}
                    >
                      {t.score}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Trust badges */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            {
              label: "Google Reviews",
              value: "4.9 / 5",
              sub: "Based on 2,400 reviews",
              icon: Star,
            },
            {
              label: "Alliance Française",
              value: "Certified",
              sub: "Accredited instructors",
              icon: Award,
            },
            {
              label: "IRCC Recognized",
              value: "Official",
              sub: "Government-accepted test prep",
              icon: Shield,
            },
            {
              label: "Students from",
              value: "80+ Countries",
              sub: "Global student community",
              icon: Globe,
            },
          ].map(({ label, value, sub, icon: Icon }) => (
            <div
              key={label}
              className="bg-slate-50 border border-slate-100 rounded-2xl p-5 flex items-start gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                <Icon size={14} className="text-blue-600" />
              </div>
              <div>
                <div className="text-xs text-slate-500 font-medium">
                  {label}
                </div>
                <div className="text-sm font-bold text-slate-900">
                  {value}
                </div>
                <div className="text-xs text-slate-400">
                  {sub}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── Reading Comprehension data ───────────────────────────── */
const RC_SERIES = [
  { n: "01", title: "Politique d'immigration", free: true },
  { n: "02", title: "L'environnement canadien", free: false },
  { n: "03", title: "Santé et bien-être", free: false },
  { n: "04", title: "Le marché du travail", free: false },
  { n: "05", title: "Éducation et formation", free: false },
  { n: "06", title: "Vie quotidienne urbaine", free: false },
  { n: "07", title: "Logement et loyer", free: false },
  { n: "08", title: "Transports en commun", free: false },
  { n: "09", title: "Culture et arts", free: false },
  { n: "10", title: "Sciences et technologie", free: false },
  { n: "11", title: "Médias et presse", free: false },
  { n: "12", title: "Commerce et économie", free: false },
  { n: "13", title: "Famille et société", free: false },
  { n: "14", title: "Alimentation et gastronomie", free: false },
  { n: "15", title: "Voyages et tourisme", free: false },
  { n: "16", title: "Droits et citoyenneté", free: false },
  { n: "17", title: "Sport et loisirs", free: false },
  { n: "18", title: "Nature et écologie", free: false },
  { n: "19", title: "Emploi et carrière", free: false },
  { n: "20", title: "Services publics", free: false },
  { n: "21", title: "Histoire du Canada", free: false },
  { n: "22", title: "Politique sociale", free: false },
  { n: "23", title: "Finance personnelle", free: false },
  { n: "24", title: "Langues et bilinguisme", free: false },
  { n: "25", title: "Médecine et pharmacie", free: false },
  { n: "26", title: "Mode et tendances", free: false },
  { n: "27", title: "Urbanisme et architecture", free: false },
  { n: "28", title: "Bénévolat et ONG", free: false },
  { n: "29", title: "Recherche scientifique", free: false },
  { n: "30", title: "Traditions culturelles", free: false },
  { n: "31", title: "Numérique et réseaux", free: false },
  { n: "32", title: "Retraite et pensions", free: false },
  { n: "33", title: "Droit du travail", free: false },
  { n: "34", title: "Géographie canadienne", free: false },
  { n: "35", title: "Témoignages personnels", free: false },
  { n: "36", title: "Alimentation durable", free: false },
  { n: "37", title: "Économie circulaire", free: false },
  { n: "38", title: "Actualités mondiales", free: false },
  { n: "39", title: "Pédagogie innovante", free: false },
  { n: "40", title: "Simulation TCF Officielle", free: false },
];

const RC_FORMAT = [
  ["Number of Texts", "4–6 authentic documents"],
  ["Total Questions", "29 multiple-choice (A–D)"],
  ["Time Allowed", "45 minutes"],
  ["Scoring Scale", "100–699 NCLC points"],
  ["B2 Threshold", "453 points minimum"],
  ["Express Entry Target", "CLB 9 = 549+ points"],
  ["Text Types", "News, ads, emails, formal docs"],
  ["Difficulty Progression", "A1 → C1 within the test"],
  ["Answer Method", "Computer-based, click to select"],
  ["Result Turnaround", "Instant digital score report"],
];

const RC_TERMS = [
  { icon: CheckCircle, color: "text-emerald-500", text: <><strong>Free access</strong> — Series 1 is fully accessible without registration.</> },
  { icon: CheckCircle, color: "text-emerald-500", text: <><strong>One attempt per session</strong> — Answers are locked after submission to simulate real exam conditions.</> },
  { icon: Shield, color: "text-red-500", text: <><strong>Series 2–40 require a premium plan.</strong> Unlock all exercises with a single one-time purchase.</> },
  { icon: CheckCircle, color: "text-emerald-500", text: <><strong>No time extensions</strong> — Each 45-minute series runs under real exam timing to build discipline.</> },
  { icon: CheckCircle, color: "text-emerald-500", text: <><strong>Explanations included</strong> — Every question includes a detailed rationale and the correct passage reference.</> },
  { icon: CheckCircle, color: "text-emerald-500", text: <><strong>Progress tracking</strong> — Your scores and improvement trend are saved to your student dashboard.</> },
  { icon: Shield, color: "text-blue-600", text: <><strong>Content ownership</strong> — All passages and questions are © TCF Canada Institute. Reproduction is prohibited.</> },
  { icon: CheckCircle, color: "text-emerald-500", text: <><strong>Retakes</strong> — Premium members may retake each series up to 3 times per 30-day period.</> },
];

const RC_QUESTION = {
  passage: "Le gouvernement canadien a annoncé une nouvelle politique d'immigration visant à attirer davantage de travailleurs qualifiés dans les secteurs en pénurie. Selon le ministre, « les candidats francophones bénéficieront d'un avantage supplémentaire dans le système de points ». Cette mesure entrera en vigueur dès le premier janvier prochain.",
  question: "D'après le texte, quel groupe est favorisé par la nouvelle politique ?",
  options: [
    { key: "A", text: "Les travailleurs non qualifiés" },
    { key: "B", text: "Les candidats francophones" },
    { key: "C", text: "Les étudiants internationaux" },
    { key: "D", text: "Les résidents permanents" },
  ],
  correct: "B",
};

function ReadingComprehensionSection() {
  const [selected, setSelected] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const [seconds, setSeconds] = useState(45 * 60);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setSeconds((s) => (s > 0 ? s - 1 : 0)), 1000);
    return () => clearInterval(t);
  }, []);

  const mm = String(Math.floor(seconds / 60)).padStart(2, "0");
  const ss = String(seconds % 60).padStart(2, "0");
  const isCorrect = selected === RC_QUESTION.correct;

  return (
    <section id="reading-comprehension" className="py-24 bg-slate-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Section 1: Intro + sample question ── */}
        <div className="grid lg:grid-cols-2 gap-14 items-center mb-24">

          {/* Left */}
          <div>
            <SectionLabel><BookOpen size={12} /> Reading Comprehension</SectionLabel>
            <h2 className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mt-4 mb-5"
              style={{ fontFamily: "'Playfair Display', serif" }}>
              40 Reading Comprehension Exercises
            </h2>
            <p className="text-slate-600 leading-relaxed mb-10">
              Master the techniques that separate top scorers — skim strategies, distractor spotting, inference logic,
              and time discipline — all built around authentic TCF Canada reading texts.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {[
                { val: "40", lab: "Complete Series", icon: Layers },
                { val: "1,160", lab: "Total Questions", icon: FileText },
                { val: "45 min", lab: "Series Time", icon: Clock },
                { val: "B2", lab: "Target Level", icon: Award },
              ].map(({ val, lab, icon: Icon }) => (
                <div key={lab} className="bg-white rounded-2xl border border-slate-100 shadow-sm p-5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center flex-shrink-0">
                    <Icon size={16} className="text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-bold text-slate-900"
                      style={{ fontFamily: "'Playfair Display', serif" }}>{val}</div>
                    <div className="text-xs text-slate-500 font-medium">{lab}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — sample question widget */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-xl shadow-slate-900/8 overflow-hidden">
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-slate-100 bg-slate-50">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                <CheckCircle size={11} /> Series 1 — Free Preview
              </span>
              <span className={cn(
                "font-mono text-sm font-bold px-3 py-1 rounded-xl",
                seconds < 300 ? "bg-red-100 text-red-600" : "bg-blue-50 text-blue-700"
              )}>
                {mm}:{ss}
              </span>
            </div>

            {/* Progress */}
            <div className="px-6 pt-4 pb-2">
              <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                <span>Question 3 of 29</span>
                <span className="text-blue-600">10%</span>
              </div>
              <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                <div className="h-full bg-blue-600 rounded-full" style={{ width: "10%" }} />
              </div>
            </div>

            {/* Passage */}
            <div className="mx-6 mt-4 p-4 rounded-2xl bg-slate-50 border border-slate-100">
              <div className="text-[10px] font-bold text-blue-600 uppercase tracking-widest mb-2">Passage — Document officiel</div>
              <p className="text-sm text-slate-700 leading-relaxed">{RC_QUESTION.passage}</p>
            </div>

            {/* Question */}
            <div className="px-6 pt-4">
              <p className="text-sm font-bold text-slate-800 mb-3">{RC_QUESTION.question}</p>
              <div className="space-y-2">
                {RC_QUESTION.options.map(({ key, text }) => {
                  const isSelected = selected === key;
                  const showResult = checked;
                  const isRight = key === RC_QUESTION.correct;
                  return (
                    <label key={key}
                      className={cn(
                        "flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm",
                        !showResult && !isSelected && "border-slate-200 hover:border-blue-300 hover:bg-blue-50",
                        !showResult && isSelected && "border-blue-500 bg-blue-50",
                        showResult && isRight && "border-emerald-400 bg-emerald-50",
                        showResult && isSelected && !isRight && "border-red-400 bg-red-50",
                        showResult && !isSelected && !isRight && "border-slate-100 opacity-50",
                      )}>
                      <input type="radio" name="rc_q" className="sr-only" value={key}
                        onChange={() => !checked && setSelected(key)} />
                      <span className={cn(
                        "w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-bold flex-shrink-0",
                        isSelected && !showResult ? "border-blue-500 bg-blue-500 text-white" :
                        showResult && isRight ? "border-emerald-500 bg-emerald-500 text-white" :
                        showResult && isSelected ? "border-red-500 bg-red-500 text-white" :
                        "border-slate-300 text-slate-500"
                      )}>{key}</span>
                      <span className={cn(showResult && isRight ? "text-emerald-700 font-semibold" : "text-slate-700")}>{text}</span>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Actions + feedback */}
            <div className="px-6 pt-4 pb-6">
              {!checked ? (
                <button
                  onClick={() => selected && setChecked(true)}
                  className={cn(
                    "inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all",
                    selected
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md shadow-blue-600/20"
                      : "bg-slate-100 text-slate-400 cursor-not-allowed"
                  )}
                >
                  Check Answer
                </button>
              ) : (
                <div className={cn(
                  "p-3 rounded-xl text-sm font-semibold",
                  isCorrect ? "bg-emerald-50 text-emerald-700 border border-emerald-200" : "bg-red-50 text-red-700 border border-red-200"
                )}>
                  {isCorrect
                    ? "✓ Correct! The text explicitly states francophones benefit from an additional advantage."
                    : `✗ Incorrect. The correct answer is B — the text states « les candidats francophones bénéficieront d'un avantage supplémentaire ».`}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── Section 2: Test format + Terms ── */}
        <div className="grid lg:grid-cols-2 gap-8 mb-24">

          {/* Test format */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-slate-50">
              <div className="w-8 h-8 rounded-xl bg-blue-600 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span className="font-bold text-slate-800">Test Format</span>
            </div>
            <div className="p-4">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-xs text-slate-400 font-bold uppercase tracking-widest">
                    <th className="text-left pb-3 pl-3">Component</th>
                    <th className="text-left pb-3 pl-3">Detail</th>
                  </tr>
                </thead>
                <tbody>
                  {RC_FORMAT.map(([comp, detail], i) => (
                    <tr key={comp} className={cn("border-t border-slate-50", i % 2 === 0 ? "bg-slate-50/50" : "bg-white")}>
                      <td className="py-3 pl-3 font-semibold text-slate-700">{comp}</td>
                      <td className="py-3 pl-3 text-slate-500">{detail}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Terms */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-md overflow-hidden">
            <div className="flex items-center gap-3 px-7 py-5 border-b border-slate-100 bg-slate-50">
              <div className="w-8 h-8 rounded-xl bg-slate-800 flex items-center justify-center">
                <FileText size={14} className="text-white" />
              </div>
              <span className="font-bold text-slate-800">Terms &amp; Conditions</span>
            </div>
            <ul className="p-6 space-y-4">
              {RC_TERMS.map(({ icon: Icon, color, text }, i) => (
                <li key={i} className="flex items-start gap-3 text-sm text-slate-600">
                  <Icon size={15} className={cn("flex-shrink-0 mt-0.5", color)} />
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* ── Section 3: 40 series grid ── */}
        <div className="mb-24">
          <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
            <div>
              <SectionLabel><Layers size={12} /> All 40 Series</SectionLabel>
              <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 mt-3"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Choose your practice series
              </h2>
            </div>
            <div className="flex items-center gap-5 text-sm font-semibold text-slate-500">
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-blue-600" /> Free
              </span>
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-slate-300" /> Premium
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {RC_SERIES.map((s) => (
              <div
                key={s.n}
                onClick={() => s.free && setShowModal(true)}
                className={cn(
                  "relative rounded-2xl border p-4 transition-all group",
                  s.free
                    ? "bg-blue-600 border-blue-600 text-white cursor-pointer hover:bg-blue-700 shadow-lg shadow-blue-600/20"
                    : "bg-white border-slate-200 cursor-default"
                )}
              >
                {/* lock overlay for premium */}
                {!s.free && (
                  <div className="absolute inset-0 rounded-2xl bg-white/80 backdrop-blur-[2px] flex flex-col items-center justify-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                    <div className="w-8 h-8 rounded-full bg-slate-900 flex items-center justify-center">
                      <svg width="12" height="14" viewBox="0 0 12 14" fill="none"><rect x="1" y="6" width="10" height="8" rx="2" fill="white"/><path d="M3 6V4a3 3 0 016 0v2" stroke="white" strokeWidth="1.8" fill="none"/></svg>
                    </div>
                    <span className="text-[10px] font-bold text-slate-700">Premium</span>
                  </div>
                )}

                <div className={cn(
                  "text-xs font-bold mb-1",
                  s.free ? "text-blue-200" : "text-slate-400"
                )}>Series</div>
                <div className={cn(
                  "text-2xl font-bold mb-2",
                  s.free ? "text-white" : "text-slate-800"
                )} style={{ fontFamily: "'Playfair Display', serif" }}>{s.n}</div>
                <div className={cn(
                  "text-xs leading-snug mb-3",
                  s.free ? "text-blue-100" : "text-slate-500"
                )}>{s.title}</div>
                <div className={cn(
                  "flex items-center gap-1 text-[10px] font-semibold",
                  s.free ? "text-blue-200" : "text-slate-400"
                )}>
                  {s.free ? (
                    <><CheckCircle size={10} /> Free · 29 Q</>
                  ) : (
                    <><svg width="10" height="11" viewBox="0 0 10 11" fill="currentColor"><rect x="0.5" y="5" width="9" height="6" rx="1.5"/><path d="M2.5 5V3.5a2.5 2.5 0 015 0V5" stroke="currentColor" strokeWidth="1.2" fill="none"/></svg> 29 Q</>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* ── Section 4: Unlock CTA ── */}
        <div className="relative bg-slate-900 rounded-3xl overflow-hidden p-8 lg:p-14">
          {/* glows */}
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-red-500/10 blur-3xl pointer-events-none" />

          <div className="relative grid lg:grid-cols-2 gap-12 items-center">
            {/* Left */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-300 text-xs font-bold tracking-widest uppercase mb-5">
                <Zap size={11} /> Unlock All 39 Remaining Series
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-white leading-tight mb-4"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                1,131 more questions. Full explanations. Real exam conditions.
              </h2>
              <p className="text-slate-400 leading-relaxed mb-7">
                Series 2–40 unlock instantly with any premium plan — no waiting, no scheduling.
                Practice on your schedule and track your score trend across every series.
              </p>
              <div className="grid grid-cols-2 gap-3">
                {[
                  "40 full series · 1,160 questions",
                  "Detailed answer explanations",
                  "Progress & score dashboard",
                  "3 retakes per series / month",
                ].map((perk) => (
                  <div key={perk} className="flex items-start gap-2 text-sm text-slate-300">
                    <CheckCircle size={13} className="text-emerald-400 flex-shrink-0 mt-0.5" />
                    {perk}
                  </div>
                ))}
              </div>
            </div>

            {/* Right — price box */}
            <div className="bg-white/8 border border-white/15 rounded-2xl p-7">
              <div className="flex items-end gap-3 mb-6">
                <span className="text-5xl font-bold text-white"
                  style={{ fontFamily: "'Playfair Display', serif" }}>$79</span>
                <div className="pb-1">
                  <div className="text-slate-400 line-through text-sm">$149</div>
                  <div className="text-xs text-emerald-400 font-bold">One-time · Lifetime access</div>
                </div>
              </div>
              <a href="#pricing"
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-500 transition-all shadow-lg shadow-blue-600/30 mb-3">
                <svg width="15" height="15" viewBox="0 0 15 15" fill="none"><path d="M2 7.5h11M9 3.5l4 4-4 4" stroke="white" strokeWidth="1.8" strokeLinecap="round"/></svg>
                View Pricing Plans
              </a>
              <button
                onClick={() => setShowModal(true)}
                className="flex items-center justify-center gap-2 w-full py-3.5 rounded-xl border border-white/20 text-white font-semibold text-sm hover:bg-white/10 transition-all mb-5">
                Try Series 1 Free First <ArrowRight size={14} />
              </button>
              <div className="flex items-center justify-center gap-2 text-slate-400 text-xs">
                <Shield size={12} className="text-slate-500" />
                14-day money-back guarantee · No questions asked
              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Series 1 modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm"
          onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-3xl shadow-2xl max-w-lg w-full overflow-hidden"
            onClick={(e) => e.stopPropagation()}>
            <div className="p-7 border-b border-slate-100">
              <div className="flex items-center justify-between mb-4">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-700 text-xs font-bold">
                  <CheckCircle size={11} /> Free Series
                </span>
                <button onClick={() => setShowModal(false)}
                  className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center hover:bg-slate-200 transition-colors">
                  <X size={16} className="text-slate-600" />
                </button>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-1"
                style={{ fontFamily: "'Playfair Display', serif" }}>
                Series 01 — Politique d'immigration
              </h3>
              <p className="text-slate-500 text-sm">
                You have <strong>45 minutes</strong> to answer 29 questions. Answers and explanations are shown after submission.
              </p>
            </div>
            <div className="p-7">
              <div className="flex flex-wrap gap-3 mb-6">
                {[
                  { icon: FileText, label: "29 Questions" },
                  { icon: Clock, label: "45 Minutes" },
                  { icon: BarChart2, label: "B1 → B2" },
                ].map(({ icon: Icon, label }) => (
                  <span key={label} className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-50 border border-slate-200 text-sm font-semibold text-slate-700">
                    <Icon size={13} className="text-blue-600" /> {label}
                  </span>
                ))}
              </div>
              <button className="w-full py-3.5 rounded-xl bg-blue-600 text-white font-bold text-sm hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/20">
                Start Series 1 Now <ArrowRight size={14} className="inline ml-1" />
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

function ResourcesSection() {
  return (
    <section id="resources" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>
            <Download size={12} /> Free Resources
          </SectionLabel>
          <h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Start preparing today — completely free
          </h2>
          <p className="text-slate-600">
            No signup required for four high-value resources
            used by thousands of TCF Canada candidates.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {RESOURCES.map(
            ({ icon: Icon, title, desc, cta, color }) => (
              <div
                key={title}
                className={cn(
                  "group rounded-3xl p-6 border hover:shadow-lg hover:-translate-y-1 transition-all duration-300",
                  color,
                )}
              >
                <div className="w-11 h-11 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <Icon size={20} className="text-slate-700" />
                </div>
                <h3 className="text-base font-bold text-slate-900 mb-2">
                  {title}
                </h3>
                <p className="text-sm text-slate-600 leading-relaxed mb-5">
                  {desc}
                </p>
                <button className="inline-flex items-center gap-2 text-sm font-semibold text-blue-700 hover:text-blue-900 transition-colors group/btn">
                  {cta}{" "}
                  <ArrowRight
                    size={14}
                    className="group-hover/btn:translate-x-1 transition-transform"
                  />
                </button>
              </div>
            ),
          )}
        </div>
      </div>
    </section>
  );
}

function PricingSection() {
  const [annual, setAnnual] = useState(false);

  return (
    <section id="pricing" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <SectionLabel>
            <TrendingUp size={12} /> Simple Pricing
          </SectionLabel>
          <h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight mb-4"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Invest in your Canadian future
          </h2>
          <p className="text-slate-600 mb-6">
            All plans include a 14-day money-back guarantee. No
            hidden fees.
          </p>

          <div className="inline-flex items-center gap-2 bg-slate-100 rounded-xl p-1">
            <button
              onClick={() => setAnnual(false)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all",
                !annual
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              One-time
            </button>
            <button
              onClick={() => setAnnual(true)}
              className={cn(
                "px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2",
                annual
                  ? "bg-white text-slate-900 shadow-sm"
                  : "text-slate-500 hover:text-slate-700",
              )}
            >
              Bundle
              <span className="px-1.5 py-0.5 rounded-full bg-emerald-100 text-emerald-700 text-[10px] font-bold">
                Save 20%
              </span>
            </button>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 items-stretch">
          {PLANS.map((p, i) => (
            <motion.div
              key={p.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              className={cn(
                "relative flex flex-col rounded-3xl p-8 border transition-all",
                p.highlight
                  ? "bg-blue-600 border-blue-600 shadow-2xl shadow-blue-600/25 scale-[1.03]"
                  : "bg-white border-slate-200 hover:border-blue-200 hover:shadow-lg",
              )}
            >
              {p.highlight && (
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-amber-400 text-amber-900 text-xs font-bold px-4 py-1.5 rounded-full shadow-lg">
                  Most Popular
                </div>
              )}

              <div
                className={cn(
                  "text-xs font-bold tracking-widest uppercase mb-2",
                  p.highlight
                    ? "text-blue-200"
                    : "text-slate-400",
                )}
              >
                {p.name}
              </div>
              <div className="flex items-end gap-1 mb-2">
                <span
                  className={cn(
                    "text-4xl font-bold",
                    p.highlight
                      ? "text-white"
                      : "text-slate-900",
                  )}
                  style={{
                    fontFamily: "'Playfair Display', serif",
                  }}
                >
                  {p.price}
                </span>
                <span
                  className={cn(
                    "text-sm mb-1",
                    p.highlight
                      ? "text-blue-200"
                      : "text-slate-400",
                  )}
                >
                  {p.period}
                </span>
              </div>
              <p
                className={cn(
                  "text-sm leading-relaxed mb-6",
                  p.highlight
                    ? "text-blue-100"
                    : "text-slate-500",
                )}
              >
                {p.desc}
              </p>

              <div className="space-y-3 mb-8 flex-1">
                {p.features.map((f) => (
                  <div
                    key={f}
                    className="flex items-start gap-2.5 text-sm"
                  >
                    <CheckCircle
                      size={15}
                      className={cn(
                        "flex-shrink-0 mt-0.5",
                        p.highlight
                          ? "text-blue-200"
                          : "text-emerald-500",
                      )}
                    />
                    <span
                      className={
                        p.highlight
                          ? "text-blue-100"
                          : "text-slate-700"
                      }
                    >
                      {f}
                    </span>
                  </div>
                ))}
              </div>

              <button
                className={cn(
                  "w-full py-3.5 rounded-xl font-semibold text-sm transition-all active:scale-[.98]",
                  p.highlight
                    ? "bg-white text-blue-700 hover:bg-blue-50 shadow-lg"
                    : "bg-blue-600 text-white hover:bg-blue-700 shadow-lg shadow-blue-600/20",
                )}
              >
                {p.cta}
              </button>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm text-slate-400 mt-8">
          Need a group discount for your organization?{" "}
          <a
            href="#contact"
            className="text-blue-600 font-semibold hover:underline"
          >
            Contact us →
          </a>
        </p>
      </div>
    </section>
  );
}

function FaqSection() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="py-24 bg-slate-50">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <SectionLabel>
            <MessageCircle size={12} /> FAQ
          </SectionLabel>
          <h2
            className="text-4xl lg:text-5xl font-bold text-slate-900 leading-tight"
            style={{ fontFamily: "'Playfair Display', serif" }}
          >
            Common questions answered
          </h2>
        </div>

        <div className="space-y-3">
          {FAQS.map(({ q, a }, i) => (
            <div
              key={i}
              className={cn(
                "rounded-2xl border bg-white overflow-hidden transition-all",
                open === i
                  ? "border-blue-200 shadow-md"
                  : "border-slate-100 hover:border-slate-200",
              )}
            >
              <button
                onClick={() => setOpen(open === i ? null : i)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left group"
              >
                <span
                  className={cn(
                    "text-sm font-semibold",
                    open === i
                      ? "text-blue-700"
                      : "text-slate-800 group-hover:text-blue-600 transition-colors",
                  )}
                >
                  {q}
                </span>
                <span
                  className={cn(
                    "w-7 h-7 rounded-full flex-shrink-0 flex items-center justify-center transition-all",
                    open === i
                      ? "bg-blue-600 text-white rotate-180"
                      : "bg-slate-100 text-slate-500 group-hover:bg-blue-100 group-hover:text-blue-600",
                  )}
                >
                  <ChevronDown size={14} />
                </span>
              </button>
              <AnimatePresence>
                {open === i && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.25 }}
                    className="overflow-hidden"
                  >
                    <div className="px-5 pb-5 text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-4">
                      {a}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative bg-gradient-to-br from-slate-900 to-blue-950 rounded-3xl overflow-hidden p-10 lg:p-16 text-center">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-blue-600/15 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-60 h-60 rounded-full bg-red-500/10 blur-3xl" />
          </div>
          <div className="relative">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/10 border border-white/15 text-blue-300 text-xs font-semibold mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Enrollment open — next cohort starts July 14
            </div>
            <h2
              className="text-4xl lg:text-5xl font-bold text-white leading-tight mb-5"
              style={{
                fontFamily: "'Playfair Display', serif",
              }}
            >
              Your Canadian dream starts with one test. <br />
              <span className="text-blue-400">
                Let's make sure you pass it.
              </span>
            </h2>
            <p className="text-slate-400 text-lg mb-10 max-w-xl mx-auto">
              Join 12,000+ students who used TCF Canada
              Institute to earn the language scores that got
              them their permanent residency.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-4">
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-blue-600 text-white text-base font-semibold hover:bg-blue-500 active:scale-[.98] transition-all shadow-lg shadow-blue-600/30">
                Start Your Free Trial <ArrowRight size={16} />
              </button>
              <button className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-white/10 border border-white/20 text-white text-base font-semibold hover:bg-white/20 transition-all">
                <Phone size={16} /> Book Free Consultation
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2.5 mb-4">
              <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center">
                <span className="text-white font-bold text-sm">
                  T
                </span>
              </div>
              <div>
                <div className="font-bold text-white text-sm">
                  TCF Canada Institute
                </div>
                <div className="text-[10px] text-slate-500 uppercase tracking-wide">
                  French Language Prep
                </div>
              </div>
            </div>
            <p className="text-sm leading-relaxed mb-5 max-w-xs">
              Canada's most results-focused TCF Canada
              preparation platform. Alliance Française–certified
              instructors. IRCC-recognized exam prep.
            </p>
            <div className="flex gap-3">
              {[
                "Toronto",
                "Montréal",
                "Vancouver",
                "Calgary",
              ].map((city) => (
                <span
                  key={city}
                  className="flex items-center gap-1 text-xs"
                >
                  <MapPin size={10} className="text-blue-500" />{" "}
                  {city}
                </span>
              ))}
            </div>
          </div>

          {/* Links */}
          {[
            {
              title: "Programs",
              links: [
                "TCF Canada Intensive",
                "Foundation French",
                "Score Booster",
                "Private Coaching",
                "Corporate Training",
              ],
            },
            {
              title: "Resources",
              links: [
                "Free Mock Test",
                "Vocabulary PDF",
                "Level Assessment",
                "Blog",
                "Study Guides",
              ],
            },
            {
              title: "Company",
              links: [
                "About Us",
                "Instructors",
                "Success Stories",
                "Careers",
                "Contact",
              ],
            },
          ].map(({ title, links }) => (
            <div key={title}>
              <div className="text-xs font-bold text-white uppercase tracking-widest mb-4">
                {title}
              </div>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      className="text-sm hover:text-white transition-colors"
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-xs text-slate-500">
            © 2024 TCF Canada Institute. All rights reserved.
            Exam prep only — not affiliated with France
            Éducation International.
          </div>
          <div className="flex items-center gap-5 text-xs">
            {[
              "Privacy Policy",
              "Terms of Use",
              "Cookie Policy",
            ].map((l) => (
              <a
                key={l}
                href="#"
                className="hover:text-white transition-colors"
              >
                {l}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ─── floating CTA ─────────────────────────────────────── */
function FloatingCTA({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0, y: 16, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 16, scale: 0.95 }}
          transition={{ duration: 0.25 }}
          className="fixed bottom-6 right-6 z-40"
        >
          <button className="inline-flex items-center gap-2.5 px-5 py-3.5 rounded-2xl bg-blue-600 text-white text-sm font-semibold shadow-2xl shadow-blue-600/40 hover:bg-blue-700 active:scale-[.97] transition-all border border-blue-500">
            <Zap size={15} />
            Free Mock Test
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ─── scroll-to-top ─────────────────────────────────────── */
function ScrollToTop({ show }: { show: boolean }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          onClick={() =>
            window.scrollTo({ top: 0, behavior: "smooth" })
          }
          className="fixed bottom-6 left-6 z-40 w-10 h-10 rounded-full bg-slate-800 text-white flex items-center justify-center shadow-lg hover:bg-slate-700 transition-colors"
        >
          <ChevronUp size={18} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

/* ─── root ──────────────────────────────────────────────── */
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [showFloat, setShowFloat] = useState(false);

  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 20);
      setShowFloat(window.scrollY > 400);
    };
    window.addEventListener("scroll", handler, {
      passive: true,
    });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <div
      className="min-h-screen bg-white"
      style={{ fontFamily: "'Inter', system-ui, sans-serif" }}
    >
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <WrittenExpressionPage />
        <StatsBar />
        <ExamSection />
        <ReadingComprehensionSection />
        <CoursesSection />
        <FeaturesSection />
        <HowItWorksSection />
        <TestimonialsSection />
        <ResourcesSection />
        <PricingSection />
        <FaqSection />
        <CtaBanner />
      </main>
      <Footer />
      <FloatingCTA show={showFloat} />
      <ScrollToTop show={showFloat} />
    </div>
  );
}