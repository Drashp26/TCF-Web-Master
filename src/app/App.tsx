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
} 
from "lucide-react";
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
  { value: "12,000+", label: "Students Enrolled"},
  { value: "94%", label: "Pass Rate"},
  { value: "8.2", label: "Avg. Score Achieved"},
  { value: "50+", label: "Expert Instructors" },
];

/*const FAQS = [
  {
    q: "How long do I have access to the course materials?",
    a: "Access duration depends on your plan. Bronze includes 5 days, Silver includes 1 month, and Gold includes 2 months. You can renew your plan anytime.",
  },
  {
    q: "Is there a money-back guarantee?",
    a: "Yes! All plans include a 14-day money-back guarantee with no questions asked.",
  },
  {
    q: "Can I upgrade my plan?",
    a: "Absolutely! You can upgrade anytime and we'll prorate the difference to your account.",
  },
  {
    q: "Do you offer group discounts?",
    a: "Yes, we offer special pricing for groups and organizations. Contact us for details.",
  },
  {
    q: "What payment methods do you accept?",
    a: "We accept all major credit cards, PayPal, and bank transfers for enterprise customers.",
  },
];*/

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

/*function FaqSection() {
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
            style={{ fontFamily: "'montserrat', serif" }}
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
}*/

/* ─── Footer ─────────────────────────────────────────────── */
/*function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-400">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-10 mb-12">
          {/* Brand */
          /*<div className="lg:col-span-2">
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
}*/


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
        <ExamSection />
        <ReadingComprehensionSection />
        <ReadingComprehensionSection />
        <OurOfferSection />
        {/*<ResourcesSection />*/}

      </main>
      {/*<Footer />*/}
      <FloatingCTA show={showFloat} />
      <ScrollToTop show={showFloat} />
    </div>
  );
}