/**
 * AllRent Landing Page — "Velvet Evening" Design
 * 
 * Design: Art Deco Revival + Contemporary Luxury
 * Colors: Deep navy (#0D1B2A), champagne gold (#D4AF37), dusty rose, ivory
 * Fonts: Playfair Display (headings), Raleway (body), Montserrat (CTAs)
 */

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { Phone, Mail, Truck, Calendar, Wrench, Handshake } from "lucide-react";

/* ─── Image URLs ─── */
const HERO_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/hero-banquet-hall-RRjmKx6LEmLbG9Kc5Qq4PX.webp";
const TABLE_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/table-setting-closeup-XV7d54fuBnryNyv3XceC5Y.webp";
const OUTDOOR_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/outdoor-event-setup-mggBQwsTRvXEXu76m5S32G.webp";
const EQUIPMENT_IMG = "https://d2xsxph8kpxj0f.cloudfront.net/98778889/QMnsTj9WZsLEejfW68SYyB/catering-equipment-PmL4mydYUZYHmycZyzbkFy.webp";

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

/* ─── Art Deco Decorative Divider ─── */
function DecoDivider() {
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      <div className="h-px w-16 sm:w-24 bg-gradient-to-r from-transparent to-gold/60" />
      <svg width="20" height="20" viewBox="0 0 20 20" className="text-gold/80">
        <path d="M10 0 L20 10 L10 20 L0 10 Z" fill="none" stroke="currentColor" strokeWidth="1" />
        <path d="M10 4 L16 10 L10 16 L4 10 Z" fill="currentColor" opacity="0.3" />
      </svg>
      <div className="h-px w-16 sm:w-24 bg-gradient-to-l from-transparent to-gold/60" />
    </div>
  );
}

/* ═══════════════════════════════════════════
   SECTION 1 — HERO
   ═══════════════════════════════════════════ */
function HeroSection() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-screen min-h-[600px] max-h-[1100px] overflow-hidden">
      {/* Parallax Background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        <img
          src={HERO_IMG}
          alt="Роскошный банкетный зал с сервировкой"
          className="w-full h-[130%] object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-navy-dark/70 via-navy/60 to-navy-dark/90" />
      </motion.div>

      {/* Art Deco corner accents */}
      <div className="absolute top-6 left-6 w-16 h-16 sm:w-24 sm:h-24 border-t border-l border-gold/30" />
      <div className="absolute top-6 right-6 w-16 h-16 sm:w-24 sm:h-24 border-t border-r border-gold/30" />
      <div className="absolute bottom-6 left-6 w-16 h-16 sm:w-24 sm:h-24 border-b border-l border-gold/30" />
      <div className="absolute bottom-6 right-6 w-16 h-16 sm:w-24 sm:h-24 border-b border-r border-gold/30" />

      {/* Top Nav Bar */}
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute top-0 left-0 right-0 z-20 px-6 sm:px-10 py-5 flex items-center justify-between"
      >
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 sm:w-12 sm:h-12 border border-gold/50 flex items-center justify-center">
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

      {/* Hero Content */}
      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col items-center justify-center px-6 text-center">
        {/* Subtitle above */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="font-[var(--font-accent)] text-gold/80 text-xs sm:text-sm tracking-[0.35em] uppercase mb-6"
        >
          Премиальная аренда для мероприятий
        </motion.p>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.7 }}
          className="font-[var(--font-display)] text-ivory text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.1] max-w-4xl"
        >
          Мероприятие{" "}
          <span className="italic font-normal text-gold">в любых</span>
          <br />
          условиях
        </motion.h1>

        {/* Deco divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 1, delay: 1.1 }}
          className="my-6 sm:my-8"
        >
          <DecoDivider />
        </motion.div>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
          className="font-[var(--font-body)] text-ivory/70 text-base sm:text-lg md:text-xl font-light max-w-2xl leading-relaxed"
        >
          Посуда, мебель, оборудование и полное сопровождение
          <br className="hidden sm:block" />
          для событий любого масштаба
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
          className="mt-8 sm:mt-10"
        >
          <a
            href="#contact"
            className="group relative inline-flex items-center gap-3 px-8 sm:px-10 py-4 sm:py-5 border border-gold/60 bg-gold/10 hover:bg-gold/20 transition-all duration-500 overflow-hidden"
          >
            <span className="absolute inset-0 bg-gradient-to-r from-gold/0 via-gold/10 to-gold/0 translate-x-[-200%] group-hover:translate-x-[200%] transition-transform duration-1000" />
            <span className="relative font-[var(--font-accent)] text-gold text-sm sm:text-base tracking-[0.2em] uppercase">
              Оставить заявку
            </span>
          </a>
        </motion.div>

        {/* Trust badge */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-6 font-[var(--font-body)] text-ivory/40 text-xs sm:text-sm tracking-wide"
        >
          Опыт работы с событиями до 30 000 гостей
        </motion.p>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="font-[var(--font-body)] text-ivory/30 text-[10px] tracking-[0.3em] uppercase">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-px h-8 bg-gradient-to-b from-gold/50 to-transparent"
        />
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
      {/* Subtle background texture */}
      <div className="absolute inset-0 bg-navy-dark" />
      <div className="absolute inset-0 opacity-[0.03]" style={{
        backgroundImage: `repeating-linear-gradient(45deg, transparent, transparent 35px, rgba(212,175,55,0.1) 35px, rgba(212,175,55,0.1) 36px)`
      }} />

      <div className="relative z-10 container max-w-6xl mx-auto px-4">
        {/* Section header */}
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

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 + i * 0.15 }}
              className="group relative text-center p-6 sm:p-8"
            >
              {/* Deco border that appears on hover */}
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

        {/* Bottom decorative line */}
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
    image: HERO_IMG,
  },
];

function ServicesSection() {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section ref={ref} className="relative py-20 sm:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-navy" />

      <div className="relative z-10 container max-w-6xl mx-auto px-4">
        {/* Section header */}
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

        {/* Services grid — 2x2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 sm:gap-6">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.15 + i * 0.15 }}
              className="group relative overflow-hidden border border-gold/10 hover:border-gold/30 transition-all duration-700 bg-navy-dark/50"
            >
              {/* Background image that reveals on hover */}
              <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-700">
                <img src={service.image} alt="" className="w-full h-full object-cover" />
              </div>

              {/* Content */}
              <div className="relative z-10 p-8 sm:p-10 flex flex-col gap-4">
                {/* Number + Icon row */}
                <div className="flex items-center justify-between">
                  <span className="font-[var(--font-display)] text-gold/20 text-5xl sm:text-6xl font-bold leading-none">
                    0{i + 1}
                  </span>
                  <service.icon size={28} className="text-gold/60 group-hover:text-gold transition-colors duration-500" strokeWidth={1.5} />
                </div>

                {/* Title */}
                <h3 className="font-[var(--font-display)] text-ivory text-xl sm:text-2xl font-semibold mt-2">
                  {service.title}
                </h3>

                {/* Description */}
                <p className="font-[var(--font-body)] text-ivory/50 text-sm sm:text-base font-light leading-relaxed">
                  {service.description}
                </p>

                {/* Bottom deco line */}
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
