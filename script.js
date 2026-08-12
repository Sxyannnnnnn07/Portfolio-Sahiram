'use strict';

/* ============================================================
   Sahiram Jehha — Portfolio
   Language toggle · Theme · Mobile menu · Animations
   ============================================================ */

const $ = (sel) => document.querySelector(sel);

/* ---------------- Data ---------------- */

const translations = {
  th: {
    "nav.home": "หน้าแรก",
    "nav.about": "เกี่ยวกับผม",
    "nav.skills": "ทักษะ",
    "nav.projects": "ผลงาน",
    "nav.blog": "บล็อก",
    "nav.contact": "ติดต่อ",

    "hero.available": "เปิดรับโอกาสและงานใหม่",
    "hero.greeting": "สวัสดีครับ ผมชื่อ",
    "hero.nameLine1": "ซาฮีรัม",
    "hero.nameLine2": "เจ๊ะหะ",
    "hero.roles": ["Frontend Developer", "Backend Developer", "นักศึกษา วิศวะคอม ปี 3"],
    "hero.desc":
      "นักศึกษาวิศวกรรมคอมพิวเตอร์ ชั้นปีที่ 3 มหาวิทยาลัยนราธิวาสราชนครินทร์ ผู้หลงใหลในการพัฒนาเว็บแอปพลิเคชัน รักการออกแบบที่เรียบง่ายแต่ทรงพลัง",
    "hero.ctaWork": "ดูผลงานของผม",
    "hero.ctaContact": "ติดต่อผม",
    "hero.ctaCv": "ดาวน์โหลด CV",
    "hero.chip1": "Frontend",
    "hero.chip2": "Backend",
    "hero.chip3": "Database",

    "about.tag": "เกี่ยวกับผม",
    "about.title": "เรื่องราวของผม",
    "about.bio":
      "สวัสดีครับ ผม ซาฮีรัม เจ๊ะหะ (ซียัง) อายุ 21 ปี นักศึกษาชั้นปีที่ 3 คณะวิศวกรรมศาสตร์ สาขาวิศวกรรมคอมพิวเตอร์ มหาวิทยาลัยนราธิวาสราชนครินทร์ ผมเริ่มต้นเส้นทางการเขียนโค้ดจากความสนใจในเว็บไซต์ และพัฒนาตัวเองอย่างต่อเนื่องผ่านทั้งงานในห้องเรียนและโปรเจกต์ส่วนตัว ผมให้ความสำคัญกับคุณภาพของโค้ดและประสบการณ์ที่ดีของผู้ใช้",
    "about.fNick": "ชื่อเล่น",
    "about.fAge": "อายุ",
    "about.fStatus": "สถานะ",
    "about.fStatusValue": "นักศึกษา ปี 3",
    "about.fUni": "มหาวิทยาลัย",
    "about.fUniValue": "มหาวิทยาลัยนราธิวาสราชนครินทร์",
    "about.fMajor": "สาขา",
    "about.fMajorValue": "วิศวกรรมคอมพิวเตอร์",

    "stats.age": "อายุ (ปี)",
    "stats.projects": "โปรเจกต์",
    "stats.skills": "ทักษะที่ใช้",
    "stats.year": "ชั้นปีการศึกษา",

    "skills.tag": "ทักษะของผม",
    "skills.title": "สิ่งที่ผมถนัด",
    "skills.sub": "สแตกเทคโนโลยีที่ผมใช้ในการพัฒนาเว็บแอปพลิเคชันแบบครบวงจร",
    "skills.frontend": "Frontend",
    "skills.frontendDesc": "สร้างอินเทอร์เฟซที่สวยงาม ตอบสนองทุกอุปกรณ์",
    "skills.backend": "Backend",
    "skills.backendDesc": "พัฒนา API และระบบหลังบ้านให้มีประสิทธิภาพ",
    "skills.database": "ฐานข้อมูล",
    "skills.databaseDesc": "ออกแบบและจัดการข้อมูลอย่างเป็นระบบ",

    "projects.tag": "ผลงานของผม",
    "projects.title": "โปรเจกต์ที่ผมภูมิใจ",
    "projects.sub": "ผลงานบางส่วนที่ผมเคยพัฒนา — คลิกเพื่อเยี่ยมชม",
    "projects.p1": "เว็บร้านขายรองเท้าออนไลน์ ดีไซน์ทันสมัย รองรับการใช้งานบนมือถือ",
    "projects.p2": "เว็บแอปจัดการรายการสิ่งที่ต้องทำ เรียบง่าย ช่วยวางแผนงานได้ทุกวัน",
    "projects.p3": "เว็บแอปพลิเคชันเครื่องมือช่วยเหลือผู้ใช้ระบบปฏิบัติการ Windows",
    "projects.view": "เยี่ยมชมโปรเจกต์",

    "blog.tag": "บล็อกของผม",
    "blog.title": "บทความล่าสุด",
    "blog.sub": "เรื่องราว บทเรียน และประสบการณ์ที่อยากแชร์ — อัปเดตผ่าน CMS โดยไม่ต้องแตะโค้ด",
    "blog.loading": "กำลังโหลดบทความ…",
    "blog.empty": "ยังไม่มีบทความ — เขียนบทความแรกได้ผ่านระบบจัดการเนื้อหา (/admin/)",
    "blog.error": "โหลดบทความไม่สำเร็จ ลองรีเฟรชอีกครั้ง",
    "blog.read": "อ่านบทความ",
    "blog.writtenBy": "เขียนโดย",

    "contact.tag": "ช่องทางการติดต่อ",
    "contact.title": "พูดคุยกับผมได้เลย",
    "contact.sub": "พร้อมรับทุกคำถาม ข้อเสนอ หรือโอกาสทางงาน — ติดต่อผมได้ทุกช่องทาง",
    "contact.phone": "เบอร์โทรศัพท์",
    "contact.email": "อีเมล"
  },

  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.skills": "Skills",
    "nav.projects": "Projects",
    "nav.blog": "Blog",
    "nav.contact": "Contact",

    "hero.available": "Open to opportunities",
    "hero.greeting": "Hi, I'm",
    "hero.nameLine1": "SAHIRAM",
    "hero.nameLine2": "JEHHA",
    "hero.roles": ["Frontend Developer", "Backend Developer", "Computer Engineering Student"],
    "hero.desc":
      "A third-year Computer Engineering student at Princess of Naradhiwas University who loves building web applications with clean, simple yet powerful design.",
    "hero.ctaWork": "View my work",
    "hero.ctaContact": "Get in touch",
    "hero.ctaCv": "Download CV",
    "hero.chip1": "Frontend",
    "hero.chip2": "Backend",
    "hero.chip3": "Database",

    "about.tag": "About me",
    "about.title": "My story",
    "about.bio":
      "Hi, I'm Sahiram Jehha (Siiyang), 21 years old. I'm a third-year Computer Engineering student at Princess of Naradhiwas University. My coding journey started from curiosity about websites, and I've been growing steadily through both coursework and personal projects. I care about clean code and great user experience.",
    "about.fNick": "Nickname",
    "about.fAge": "Age",
    "about.fStatus": "Status",
    "about.fStatusValue": "Student, Year 3",
    "about.fUni": "University",
    "about.fUniValue": "Princess of Naradhiwas University",
    "about.fMajor": "Major",
    "about.fMajorValue": "Computer Engineering",

    "stats.age": "Age (years)",
    "stats.projects": "Projects",
    "stats.skills": "Skills used",
    "stats.year": "Study year",

    "skills.tag": "My skills",
    "skills.title": "What I'm good at",
    "skills.sub": "The tech stack I use to build full-stack web applications",
    "skills.frontend": "Frontend",
    "skills.frontendDesc": "Building beautiful interfaces that adapt to every device",
    "skills.backend": "Backend",
    "skills.backendDesc": "Building efficient APIs and server-side systems",
    "skills.database": "Database",
    "skills.databaseDesc": "Designing and managing data systematically",

    "projects.tag": "My work",
    "projects.title": "Projects I'm proud of",
    "projects.sub": "Some of the projects I've built — click to visit",
    "projects.p1": "An online sneaker store with a modern, mobile-friendly design",
    "projects.p2": "A simple, clean to-do list app to help you plan your day",
    "projects.p3": "A web-based utility app built for Windows users",
    "projects.view": "Visit project",

    "blog.tag": "My blog",
    "blog.title": "Latest posts",
    "blog.sub": "Stories, lessons and experiences I want to share — updated via CMS without touching code",
    "blog.loading": "Loading posts…",
    "blog.empty": "No posts yet — write the first one in the content manager (/admin/)",
    "blog.error": "Couldn't load posts. Please refresh.",
    "blog.read": "Read post",
    "blog.writtenBy": "Written by",

    "contact.tag": "Contact",
    "contact.title": "Let's talk",
    "contact.sub": "Open to questions, offers or opportunities — reach me on any channel",
    "contact.phone": "Phone",
    "contact.email": "Email"
  }
};

/* ---------------- State ---------------- */

let lang = localStorage.getItem("lang") || "th";
let theme = localStorage.getItem("theme") || "dark";

const navbar = $("#navbar");
const navMenu = $("#navMenu");
const menuBtn = $("#menuBtn");
const langBtn = $("#langBtn");
const themeBtn = $("#themeBtn");
const typingEl = $("#typing");
const scrollProgress = $("#scrollProgress");
const backTop = $("#backTop");
const themeColorMeta = document.querySelector('meta[name="theme-color"]');
let typeTimer = null;

/* ---------------- Language toggle ---------------- */

function applyLang(nextLang) {
  lang = nextLang;
  localStorage.setItem("lang", lang);
  document.documentElement.lang = lang;

  const t = translations[lang];
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (t[key] !== undefined) el.textContent = t[key];
  });

  const next = lang === "th" ? "EN" : "ไทย";
  langBtn.textContent = next;
  langBtn.setAttribute("aria-label", lang === "th" ? "Switch to English" : "สลับเป็นภาษาไทย");

  startTyping();
}

langBtn.addEventListener("click", () => applyLang(lang === "th" ? "en" : "th"));

/* ---------------- Typing effect ---------------- */

function startTyping() {
  if (!typingEl) return;
  clearTimeout(typeTimer);

  const roles = translations[lang]["hero.roles"];
  let wordIdx = 0;
  let pos = 0;
  let deleting = false;

  function step() {
    const word = roles[wordIdx];
    typingEl.textContent = word.slice(0, pos);

    let delay = deleting ? 38 : 95;
    if (!deleting) {
      pos++;
      if (pos > word.length) {
        deleting = true;
        delay = 1800;
      }
    } else {
      pos--;
      if (pos === 0) {
        deleting = false;
        wordIdx = (wordIdx + 1) % roles.length;
        delay = 350;
      }
    }
    typeTimer = setTimeout(step, delay);
  }
  step();
}

/* ---------------- Theme toggle ---------------- */

function applyTheme(nextTheme) {
  theme = nextTheme;
  localStorage.setItem("theme", theme);
  document.documentElement.dataset.theme = theme;
  themeBtn.setAttribute("aria-label", theme === "light" ? "เปิดโหมดมืด" : "เปิดโหมดสว่าง");
  if (themeColorMeta) {
    themeColorMeta.setAttribute("content", theme === "dark" ? "#0a0a0d" : "#f4f5f7");
  }
}

themeBtn.addEventListener("click", () => applyTheme(theme === "light" ? "dark" : "light"));

/* ---------------- Mobile menu ---------------- */

function setMenu(open) {
  navMenu.classList.toggle("open", open);
  menuBtn.classList.toggle("open", open);
  menuBtn.setAttribute("aria-expanded", String(open));
  menuBtn.setAttribute("aria-label", open ? "ปิดเมนู" : "เปิดเมนู");
  document.body.style.overflow = open ? "hidden" : "";
}

menuBtn.addEventListener("click", () => setMenu(!navMenu.classList.contains("open")));
navMenu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") setMenu(false);
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 860) setMenu(false);
});

/* ---------------- Scroll handlers ---------------- */

function onScroll() {
  const doc = document.documentElement;
  const max = doc.scrollHeight - doc.clientHeight;
  const progress = max > 0 ? (doc.scrollTop / max) * 100 : 0;
  scrollProgress.style.width = progress + "%";

  navbar.classList.toggle("scrolled", doc.scrollTop > 10);
  backTop.classList.toggle("show", doc.scrollTop > 480);
}

window.addEventListener("scroll", onScroll, { passive: true });
backTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));

/* ---------------- Magnetic buttons & hero parallax ---------------- */

const finePointer = window.matchMedia("(pointer: fine)").matches;
const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero = $(".hero");
const avatarWrap = $(".avatar-wrap");

if (finePointer && !reduceMotion) {
  document.querySelectorAll(".magnetic").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const r = el.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      el.style.transform = `translate(${x * 12}px, ${y * 10}px)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "";
    });
  });

  let parallaxActive = window.innerWidth > 980;
  let raf = null;

  hero.addEventListener("mousemove", (e) => {
    if (!parallaxActive || raf) return;
    raf = requestAnimationFrame(() => {
      const r = hero.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      avatarWrap.style.transform = `translate(${x * 16}px, ${y * 13}px)`;
      raf = null;
    });
  });
  hero.addEventListener("mouseleave", () => {
    avatarWrap.style.transform = "";
  });

  window.addEventListener("resize", () => {
    parallaxActive = window.innerWidth > 980;
    if (!parallaxActive) avatarWrap.style.transform = "";
  });
}

/* ---------------- Reveal on scroll ---------------- */

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
);

document.querySelectorAll(".reveal").forEach((el) => revealObserver.observe(el));

/* ---------------- Animated counters ---------------- */

function animateCount(el) {
  const target = parseInt(el.dataset.count, 10) || 0;
  const duration = 1400;
  const start = performance.now();

  function tick(now) {
    const p = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - p, 3);
    el.textContent = Math.round(eased * target);
    if (p < 1) requestAnimationFrame(tick);
  }
  requestAnimationFrame(tick);
}

const counterObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        animateCount(entry.target);
        counterObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.6 }
);

document.querySelectorAll(".stat-num[data-count]").forEach((el) => counterObserver.observe(el));

/* ---------------- Active nav link ---------------- */

const sectionObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === "#" + entry.target.id);
      });
    });
  },
  { rootMargin: "-45% 0px -50% 0px" }
);

document.querySelectorAll("main section[id]").forEach((section) => sectionObserver.observe(section));

/* ---------------- Init ---------------- */

$("#year").textContent = new Date().getFullYear();
applyLang(lang);
applyTheme(theme);
onScroll();
