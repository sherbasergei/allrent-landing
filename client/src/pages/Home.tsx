/**
 * AllRent Landing Page — "Velvet Evening" Design
 * 
 * HERO: Non-standard split layout with masked image reveal,
 * provocative headline, floating stats, and magnetic CTA.
 * 
 * Colors: Deep navy, champagne gold, dusty rose, ivory
 * Fonts: Playfair Display (headings), Raleway (body), Montserrat (CTAs)
 */

import { useEffect, useRef, useState, useCallback } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Phone, Mail, Truck, Calendar, Wrench, Handshake, ArrowDown } from "lucide-react";

/* ─── Image URLs ─── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/hero-banquet-hall-NRx4UtMG9ogQh6csA6t5BP.png";
const TABLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/table-setting-closeup-XV7d54fuBnryNyv3XceC5Y.webp";
const OUTDOOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/outdoor-event-setup-mggBQwsTRvXEXu76m5S32G.webp";
const EQUIPMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/catering-equipment-PmL4mydYUZYHmycZyzbkFy.webp";
const WEDDING_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/wedding-reception-LKURGs2aHxn3mcdp6wJrfE.webp";

/* ─── Animated Counter ─── */
function AnimatedCounter({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration / 16);
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return (
    <span ref={ref}>
      {count.toLocaleString("ru-RU")}{suffix}
    </span>
  );
}

/* ─── Rotating words for hero headline ─── */
const rotatingWords = ["свадьбу", "форум", "банкет", "фестиваль", "гала-ужин"];

function RotatingWord() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % rotatingWords.length);
    }, 2800);
    return () => clearInterval(timer);
  }, []);

  return (
    <span className="inline-block relative h-[1.15em] overflow-hidden align-bottom">
      <AnimatePresence mode="wait">
        <motion.span
          key={rotatingWords[index]}
          initial={{ y: "100%", opacity: 0 }}
          animate={{ y: "0%", opacity: 1 }}
          exit={{ y: "-100%", opacity: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="inline-block text-gold italic font-normal"
        >
          {rotatingWords[index]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* ─── Mouse-tracking image tilt ─── */
function useMouse() {
  const [pos, setPos] = useState({ x: 0.5, y: 0.5 });
  const handleMove = useCallback((e: MouseEvent) => {
    setPos({ x: e.clientX / window.innerWidth, y: e.clientY / window.innerHeight });
  }, []);
  useEffect(() => {
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [handleMove]);
  return pos;
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO (REDESIGNED)
   Split layout, text mask reveal, rotating words
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imgScale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);
  const mouse = useMouse();

  return (
    <section ref={ref} className="relative h-screen min-h-[700px] max-h-[1200px] overflow-hidden bg-navy-dark">
      {/* ── Top Nav ── */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-30 px-5 sm:px-10 py-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gold/50 flex items-center justify-center backdrop-blur-sm bg-navy-dark/30">
            <span className="text-gold font-[var(--font-display)] text-lg sm:text-xl font-bold tracking-wider">AR</span>
          </div>
          <div className="hidden sm:block">
            <span className="text-ivory/90 font-[var(--font-accent)] text-xs tracking-[0.3em] uppercase">All Rent</span>
          </div>
        </div>
        <div className="flex items-center gap-4 sm:gap-6">
          <a href="tel:+74959993888" className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors duration-300">
            <Phone size={16} className="text-gold/70" />
            <span className="hidden sm:inline font-[var(--font-body)] text-sm tracking-wide">+7 495 999 3 888</span>
          </a>
          <a href="mailto:info@allrent.me" className="flex items-center gap-2 text-ivory/80 hover:text-gold transition-colors duration-300">
            <Mail size={16} className="text-gold/70" />
            <span className="hidden md:inline font-[var(--font-body)] text-sm tracking-wide">info@allrent.me</span>
          </a>
        </div>
      </motion.nav>

      {/* ── Main Split Layout ── */}
      <div className="relative h-full flex flex-col lg:flex-row">
        
        {/* LEFT SIDE — Text Content */}
        <motion.div
          style={{ y: contentY }}
          className="relative z-20 flex flex-col justify-center px-6 sm:px-10 lg:px-16 pt-24 pb-8 lg:pt-0 lg:pb-0 lg:w-[55%]"
        >
          {/* Vertical deco line on left edge (desktop) */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 1.2, delay: 0.5 }}
            className="hidden lg:block absolute left-6 top-[20%] bottom-[20%] w-px bg-gradient-to-b from-transparent via-gold/30 to-transparent origin-top"
          />

          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="flex items-center gap-3 mb-6 sm:mb-8"
          >
            <div className="h-px w-8 sm:w-12 bg-gold/50" />
            <span className="font-[var(--font-accent)] text-gold/70 text-[10px] sm:text-xs tracking-[0.4em] uppercase">
              Москва и вся Россия
            </span>
          </motion.div>

          {/* Main Headline — provocative, with rotating word */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.6 }}
            className="font-[var(--font-display)] text-ivory text-[2.2rem] sm:text-5xl md:text-6xl lg:text-[4.2rem] xl:text-7xl font-bold leading-[1.08] tracking-tight"
          >
            Накроем
            <br />
            <RotatingWord />
            <br />
            <span className="text-ivory/40 font-light text-[0.65em]">на 10 000 гостей</span>
          </motion.h1>

          {/* Sub-line */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="mt-6 sm:mt-8 font-[var(--font-body)] text-ivory/50 text-sm sm:text-base md:text-lg font-light leading-relaxed max-w-md"
          >
            Посуда, мебель, шатры, инженерия.
            <br />
            Вы говорите «когда» — мы делаем всё остальное.
          </motion.p>

          {/* CTA Row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="mt-8 sm:mt-10 flex flex-wrap items-center gap-4"
          >
            {/* Primary CTA */}
            <a
              href="#contact"
              className="group relative inline-flex items-center gap-3 px-7 sm:px-9 py-4 bg-gold text-navy-dark font-[var(--font-accent)] text-sm sm:text-base font-semibold tracking-[0.15em] uppercase overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(212,175,55,0.3)]"
            >
              <span className="absolute inset-0 bg-gold-light translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Получить расчёт</span>
              <ArrowDown size={16} className="relative z-10 -rotate-90 group-hover:translate-x-1 transition-transform duration-300" />
            </a>

            {/* Secondary — phone */}
            <a
              href="tel:+74959993888"
              className="inline-flex items-center gap-2 px-5 py-4 border border-gold/20 hover:border-gold/50 text-ivory/70 hover:text-gold font-[var(--font-body)] text-sm tracking-wide transition-all duration-400"
            >
              <Phone size={15} />
              <span className="hidden sm:inline">Позвонить</span>
            </a>
          </motion.div>

          {/* Floating mini-stats at bottom-left */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 2 }}
            className="mt-auto pt-8 lg:pt-12 flex items-center gap-6 sm:gap-10"
          >
            {[
              { val: "7 000+", label: "чайных пар" },
              { val: "5+", label: "лет опыта" },
              { val: "24/7", label: "поддержка" },
            ].map((s) => (
              <div key={s.label} className="text-left">
                <div className="font-[var(--font-display)] text-gold text-lg sm:text-xl font-bold">{s.val}</div>
                <div className="font-[var(--font-body)] text-ivory/30 text-[10px] sm:text-xs font-light tracking-wide">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        {/* RIGHT SIDE — Image with mask & parallax */}
        <div className="absolute inset-0 lg:relative lg:w-[45%] lg:inset-auto">
          {/* Image container with diagonal clip on desktop */}
          <motion.div
            className="h-full w-full overflow-hidden"
            style={{
              clipPath: window.innerWidth >= 1024
                ? "polygon(12% 0, 100% 0, 100% 100%, 0% 100%)"
                : "none",
            }}
          >
            <motion.div
              style={{ scale: imgScale }}
              className="h-full w-full"
            >
              <motion.img
                src={HERO_IMG}
                alt="Роскошный банкетный зал AllRent"
                className="w-full h-full object-cover"
                style={{
                  x: `${(mouse.x - 0.5) * -15}px`,
                  y: `${(mouse.y - 0.5) * -15}px`,
                }}
              />
            </motion.div>
            {/* Gradient overlays */}
            <div className="absolute inset-0 bg-gradient-to-r from-navy-dark via-navy-dark/80 to-transparent lg:from-navy-dark lg:via-navy-dark/40 lg:to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-dark via-transparent to-navy-dark/50 lg:from-navy-dark/60 lg:via-transparent lg:to-navy-dark/30" />
          </motion.div>

          {/* Floating gold frame accent on image (desktop only) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 1.8 }}
            className="hidden lg:block absolute top-[15%] right-[10%] w-48 h-64 border border-gold/15 pointer-events-none"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.5, delay: 2 }}
            className="hidden lg:block absolute top-[18%] right-[8%] w-48 h-64 border border-gold/10 pointer-events-none"
          />
        </div>
      </div>

      {/* ── Scroll hint ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-6 h-10 border border-gold/30 rounded-full flex items-start justify-center p-1.5"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.3, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="w-1 h-2 bg-gold/60 rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 2 — STATS / TRUST NUMBERS
   ═══════════════════════════════════════════ */
const stats = [
  { number: 7000, suffix: "+", label: "чайных пар", sublabel: "одновременно на столах" },
  { number: 10000, suffix: "+", label: "гостей", sublabel: "на одном мероприятии" },
  { number: 5, suffix: "+", label: "лет экспертизы", sublabel: "в event-индустрии" },
  { number: 15, suffix: "", label: "зон питания", sublabel: "на одном форуме" },
];

function StatsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,175,55,0.1) 35px, rgba(212,175,55,0.1) 36px)`
      }} />

      <div className="relative z-10 container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-[var(--font-accent)] text-gold/60 text-xs tracking-[0.4em] uppercase mb-4">
            Allrent all right
          </p>
          <h2 className="font-[var(--font-display)] text-ivory text-3xl sm:text-4xl md:text-5xl font-bold">
            Масштаб, которому{" "}
            <span className="italic font-normal text-gold">доверяют</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="group relative text-center p-6 sm:p-8"
            >
              <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-700" />
              <div className="absolute top-0 left-0 w-4 h-4 border-t border-l border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="font-[var(--font-display)] text-gold text-4xl sm:text-5xl md:text-6xl font-bold mb-3">
                <AnimatedCounter target={stat.number} suffix={stat.suffix} />
              </div>
              <div className="font-[var(--font-accent)] text-ivory/90 text-sm sm:text-base tracking-wide uppercase mb-1">
                {stat.label}
              </div>
              <div className="font-[var(--font-body)] text-ivory/40 text-xs sm:text-sm font-light">
                {stat.sublabel}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 1.2, delay: 1 }}
          className="mt-16 sm:mt-20"
        >
          <div className="deco-line" />
        </motion.div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   SECTION 3 — SERVICES
   ═══════════════════════════════════════════ */
const services = [
  {
    icon: Truck,
    title: "Логистика и прокат",
    description: "Контейнерная доставка оборудования в любую точку России. От Москвы до Владивостока.",
    image: EQUIPMENT_IMG,
  },
  {
    icon: Calendar,
    title: "Аренда 7 дней в неделю",
    description: "Работаем без выходных. Оперативная подготовка и выдача оборудования под ваше мероприятие.",
    image: TABLE_IMG,
  },
  {
    icon: Wrench,
    title: "Инженерное сопровождение",
    description: "Полное подключение инженерных коммуникаций: электричество, водоснабжение, вентиляция.",
    image: OUTDOOR_IMG,
  },
  {
    icon: Handshake,
    title: "Комплексные решения",
    description: "Свадьбы, банкеты, форумы, фестивали. Подбор площадки и организация под ключ.",
    image: WEDDING_IMG,
  },
];

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />

      <div className="relative z-10 container max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16 sm:mb-20"
        >
          <p className="font-[var(--font-accent)] text-gold/60 text-xs tracking-[0.4em] uppercase mb-4">
            Что мы делаем
          </p>
          <h2 className="font-[var(--font-display)] text-ivory text-3xl sm:text-4xl md:text-5xl font-bold">
            Полный спектр{" "}
            <span className="italic font-normal text-gold">услуг</span>
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
              className="group relative overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-700 bg-navy-dark/50"
            >
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                <img src={service.image} alt="" className="w-full h-full object-cover" />
              </div>

              <div className="relative z-10 p-8 sm:p-10 flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <span className="font-[var(--font-display)] text-gold/20 text-5xl sm:text-6xl font-bold leading-none">
                    0{i + 1}
                  </span>
                  <service.icon size={28} className="text-gold/60 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                </div>

                <h3 className="font-[var(--font-display)] text-ivory text-xl sm:text-2xl font-semibold mt-2">
                  {service.title}
                </h3>

                <p className="font-[var(--font-body)] text-ivory/50 text-sm sm:text-base font-light leading-relaxed">
                  {service.description}
                </p>

                <div className="mt-4 h-px w-0 group-hover:w-full bg-gradient-to-r from-gold/40 to-transparent transition-all duration-700" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ═══════════════════════════════════════════
   PAGE ASSEMBLY
   ═══════════════════════════════════════════ */
export default function Home() {
  return (
    <div className="min-h-screen bg-navy-dark">
      <HeroSection />
      <StatsSection />
      <ServicesSection />
    </div>
  );
}
