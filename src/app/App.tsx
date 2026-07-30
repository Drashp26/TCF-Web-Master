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
  { label: "Reading Comprehension", href: "#reading-comprehension",},
  { label: "Oral Comprehension", href: "#oral-comprehension" },
];

const STATS = [
  { value: "12,000+", label: "Students Enrolled", icon: Users },
  { value: "94%", label: "Pass Rate", icon: Award },
  { value: "8.2", label: "Avg. Score Achieved", icon: TrendingUp,},
  { value: "50+", label: "Expert Instructors", icon: GraduationCap,},
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
              My Account 
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

          <h1
            className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-slate-900 leading-[1.05] tracking-tight mb-6"
            style={{
              fontFamily: "'montserrat', Georgia, serif",
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
                  fontFamily: "'montserrat', serif",
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


function ExamSection() {
  const tests = [
    { number: "01", 
      time: "35 min", 
      title: "Oral Comprehension", 
      type: "Multiple Choice questions",
      description: "39 audio questions, same format as the exam. HD audio, transcript, answer keys with explanations for each question ", 
      list: ["40 complete series", "Audio Transcription", "Correction and explanation of the correct answer"] },

    { number: "02", 
      time: "60 min", 
      title: "Reading Comprehension",
      type: "Multiple Choice questions",
      description: "39 questions, short and long texts. Announcements, articles, administrative documents — all the formats of the actual exam.",
      list: ["40 complete series", "Speed reading strategy", "Correction and explanation of the correct answer"] },

    { number: "03",
      time: "60 min",
      title: "Written expression",
      type: "AI",
      description: "3 official tasks. You write, the AI corrects you in 15 seconds according to the 6 criteria of the TCF marking scheme. Templates included.",
      list: ["40 complete series", "Audio Transcription", "Correction and explanation of the correct answer"] },

    { number: "04",
      time: "15 min",
      title: "Oral expression",
      type: "AI",
      description: "3 official tasks, recording from your microphone.", list: ["Feedback based on 3 official criteria", "Task templates 1, 2 & 3", "Current events topics corrected"] },
  ];

  return (
    <section id="exam" className="bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-3xl text-center">
          <SectionLabel><Layers size={12} /> The 4 Tests</SectionLabel>
          <h2 className="mb-4 text-4xl font-bold leading-tight text-slate-900 lg:text-5xl" style={{ fontFamily: "'montserrat', serif" }}>
            A dedicated method for each of the 4 skills of the TCF Canda
          </h2>
          <p className="leading-relaxed text-slate-500">TCF Canada evaluates your French across four graded skills and one ungraded skill, each mapped to the NCLC scale accepted by IRCC for Express Entry and all Provincial Nominee Programs.</p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          {tests.map((test) => (
            <article key={test.number} className="rounded-3xl border border-slate-200 bg-white p-8 shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl">
              <div className="mb-9 flex items-center justify-between gap-4">
                <span className="font-mono text-xs font-bold tracking-[0.16em] text-blue-600">{test.number}</span>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-700">
                <Clock size={12} /> {test.time}
                </span>
              </div>

              <h3 className="mb-1 text-2xl font-bold text-slate-900" style={{ fontFamily: "'montserrat', serif" }}>{test.title}</h3>
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-red-500">{test.type}</p>
              <p className="leading-relaxed text-slate-600">{test.description}</p>
              <ul className="mt-6 grid gap-3 border-t border-slate-100 pt-6">{test.list.map((item) => <li key={item} className="flex items-start gap-2.5 text-sm font-semibold text-slate-700">
                <CheckCircle size={17} className="mt-0.5 shrink-0 text-blue-600" />{item}</li>)}</ul>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const packs = [
    { name: "Bronze", 
      price: "$14.99", 
      access: "5 Days", 
      attempts: "3 attempts included", 
      card: "border-amber-300/20 bg-white/[0.035]", 
      badge: "border border-amber-200/20 bg-amber-300/10 text-amber-200", button: "border border-white/15 bg-white/10 hover:bg-white/15" 
    },

    { name: "Silver",
      price: "$29.99",
      access: "1 Month",
      attempts: "8 attempts included",
      card: "border-blue-400 bg-gradient-to-b from-blue-500 to-blue-700 shadow-2xl shadow-blue-950/50",
      badge: "bg-white text-blue-700", 
      button: "bg-white text-blue-700 hover:bg-blue-50",
      featured: true 
    },

    { name: "Gold", 
      price: "$49.99", 
      access: "2 Months", 
      attempts: "15 attempts included", 
      card: "border-yellow-300/25 bg-white/[0.035]", 
      badge: "border border-yellow-200/20 bg-yellow-300/10 text-yellow-100", 
      button: "border border-white/15 bg-white/10 hover:bg-white/15" 
    },
  ];

  const inclusions = [
    "Reading Comprehension: 40 practice tests (realistic simulation)",
    "Listening Comprehension: 40 practice tests (realistic simulation)",
    "Oral Expression: Current Events Topics and Corrections",
    "Written Expression: Current Events Topics and Corrections",
    "Version 2026: Content conforms to the latest exam updates.",
  ];

  return (
    <section className="relative overflow-hidden bg-slate-950 py-24 lg:py-28">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -left-28 top-1/3 h-96 w-96 rounded-full bg-blue-600/15 blur-3xl" />
        <div className="absolute -right-20 top-0 h-80 w-80 rounded-full bg-red-500/10 blur-3xl" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.07),transparent_37%)]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-blue-200"><Award size={12} /> Our offer</div>
          <h2 className="text-4xl font-bold leading-tight text-white lg:text-5xl" style={{ fontFamily: "'Playfair Display', serif" }}>Choose the pack that suits your need.
          </h2>
          <div className="mx-auto mt-6 h-px w-16 bg-red-400" />
        </div>

        <div className="grid gap-6 lg:grid-cols-3 lg:items-stretch">
          {packs.map((pack) => {
            const featured = Boolean(pack.featured);
            return (
              <article key={pack.name} className={`relative flex h-full flex-col rounded-[2rem] border p-7 text-white backdrop-blur-sm lg:p-8 ${pack.card} ${featured ? "lg:-translate-y-4" : ""}`}>
                {featured && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-red-500 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg shadow-red-950/50">Most popular</span>}
                <div className="mb-8 flex items-start justify-between gap-4">
                  <span className={`rounded-full px-3 py-1.5 text-xs font-bold uppercase tracking-widest ${pack.badge}`}>{pack.name}</span>
                  <span className={`text-sm font-semibold ${featured ? "text-blue-100" : "text-slate-400"}`}>Access: {pack.access}</span>
                </div>
                <div className="mb-8 flex items-end gap-1"><span className="text-5xl font-bold leading-none text-white" style={{ fontFamily: "'Playfair Display', serif" }}>{pack.price}</span></div>
                <ul className={`mb-8 grid gap-3.5 border-t pt-6 ${featured ? "border-white/20" : "border-white/10"}`}>
                  {inclusions.map((item) => <li key={item} className={`flex items-start gap-2.5 text-sm leading-relaxed ${featured ? "text-blue-50" : "text-slate-300"}`}><CheckCircle size={17} className={`mt-0.5 shrink-0 ${featured ? "text-white" : "text-blue-300"}`} />{item}</li>)}
                </ul>
                <div className={`mb-8 rounded-2xl border p-4 text-sm leading-relaxed ${featured ? "border-white/20 bg-white/10 text-white" : "border-white/10 bg-white/5 text-slate-200"}`}><span className={`mb-1 block text-[10px] font-bold uppercase tracking-widest ${featured ? "text-blue-100" : "text-blue-300"}`}>Bonus</span>Access to the written expression simulator: <strong>{pack.attempts}</strong></div>
                <button className={`mt-auto inline-flex w-full items-center justify-center rounded-xl px-5 py-3 text-sm font-bold transition-colors ${pack.button}`}>Subscribe</button>
              </article>
            );
          })}
        </div>
        <div className="mt-12 text-center"><button className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3 text-sm font-bold text-white transition-colors hover:border-blue-300 hover:bg-white/10">See all details <ArrowRight size={15} /></button></div>
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
  const cards = Array.from({ length: 4 });

  return (
    <section id="reading-comprehension" className="overflow-hidden bg-slate-50 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mx-auto mb-14 max-w-2xl text-center">
          <SectionLabel><Star size={12} /> Why it works</SectionLabel>
          <h2 className="text-4xl font-bold leading-tight text-slate-900 lg:text-5xl" style={{ fontFamily: "'montserrat', serif" }}>
            Preparation designed for the test you will actually take.
          </h2>
        </div>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {cards.map((_, index) => (
            <article key={index} className="rounded-3xl border border-slate-200 bg-white p-7 text-center shadow-lg shadow-slate-900/5 transition-all hover:-translate-y-1 hover:shadow-xl">
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=480&h=480&fit=crop&auto=format" alt="French exam preparation students collaborating" className="mx-auto mb-6 h-26 w-26 rounded-full border-[5px] border-blue-50 object-cover" />
              <h3 className="mb-3 text-xl font-bold leading-tight text-slate-900" style={{ fontFamily: "'Playfair Display', serif" }}>Proven Examination techniques</h3>
              <p className="text-sm leading-relaxed text-slate-500">Strategies designed for TCF Canada candidates, focused on practical skills, not generic French courses.</p>
            </article>
          ))}
        </div>
      </div>
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
      style={{ fontFamily: "'montserrat', system-ui, sans-serif" }}
    >
      <Navbar scrolled={scrolled} />
      <main>
        <Hero />
        <WrittenExpressionPage />
        <StatsBar />
        <ExamSection />
        <ReadingComprehensionSection />
        <ReadingComprehensionSection />
        <HowItWorksSection />
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