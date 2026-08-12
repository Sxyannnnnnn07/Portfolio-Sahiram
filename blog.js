'use strict';

/* ============================================================
   Blog module — โหลดบทความจาก content/posts.json
   Render การ์ดบทความ + modal อ่านบทความ (Markdown)
   เนื้อหาแก้ไขได้จากหน้า /admin/ (Sveltia CMS)
   ============================================================ */

(() => {
  const grid = document.getElementById("blogGrid");
  const statusEl = document.getElementById("blogStatus");
  const reader = document.getElementById("blogReader");
  const readerContent = document.getElementById("readerContent");
  const readerMeta = document.getElementById("readerMeta");
  const readerCloseBtn = document.getElementById("readerClose");

  if (!grid || !reader) return;

  const langNow = () => localStorage.getItem("lang") || "th";
  const t = () => translations[langNow()] || translations.th;

  let posts = [];
  let openIndex = -1;
  let lastFocus = null;

  /* ---------------- Utils ---------------- */

  const fmtDate = (iso) => {
    const d = new Date(String(iso || "").slice(0, 10) + "T00:00:00");
    if (isNaN(d)) return iso || "";
    const loc = langNow() === "en" ? "en-US" : "th-TH";
    return d.toLocaleDateString(loc, { year: "numeric", month: "short", day: "numeric" });
  };

  const esc = (s) =>
    String(s ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));

  const loadScript = (src) =>
    new Promise((resolve, reject) => {
      if (document.querySelector(`script[data-blog-src="${src}"]`)) return resolve();
      const s = document.createElement("script");
      s.src = src;
      s.dataset.blogSrc = src;
      s.onload = resolve;
      s.onerror = () => reject(new Error("Failed to load " + src));
      document.head.appendChild(s);
    });

  /* Render Markdown (โหลด marked + DOMPurify จาก CDN เฉพาะตอนเปิดบทความ) */
  async function renderMarkdown(md) {
    try {
      if (!window.marked) await loadScript("https://cdn.jsdelivr.net/npm/marked@12.0.2/marked.min.js");
      if (!window.DOMPurify) await loadScript("https://cdn.jsdelivr.net/npm/dompurify@3.1.6/dist/purify.min.js");
      const html = window.marked.parse(md || "", { gfm: true, breaks: true });
      return window.DOMPurify.sanitize(html);
    } catch (err) {
      console.warn("[blog] fallback to plain text:", err);
      return `<pre class="reader-plain">${esc(md || "")}</pre>`;
    }
  }

  /* ---------------- Render list ---------------- */

  async function loadPosts() {
    try {
      const res = await fetch("content/posts.json", { cache: "no-cache" });
      if (!res.ok) throw new Error("HTTP " + res.status);
      const data = await res.json();
      posts = Array.isArray(data.posts) ? data.posts : [];
      posts.sort((a, b) => String(b.date || "").localeCompare(String(a.date || "")));
      renderGrid();
      handleHash();
    } catch (err) {
      console.error("[blog]", err);
      if (statusEl) {
        statusEl.textContent = t()["blog.error"];
        statusEl.classList.add("blog-status--error");
      }
    }
  }

  function renderGrid() {
    if (!posts.length) {
      grid.innerHTML = `<p class="blog-status">${esc(t()["blog.empty"])}</p>`;
      return;
    }
    grid.innerHTML = "";
    statusEl.remove();

    posts.forEach((post, i) => {
      const tags = Array.isArray(post.tags) ? post.tags : [];

      const card = document.createElement("article");
      card.className = "blog-card reveal";
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${post.title} — ${fmtDate(post.date)}`);
      card.style.setProperty("--d", `${(i % 3) * 0.08}s`);

      card.innerHTML = `
        <div class="blog-card-top">
          <span class="blog-num">${String(i + 1).padStart(2, "0")}</span>
          <span class="blog-date">${esc(fmtDate(post.date))}</span>
        </div>
        <h3 class="blog-title">${esc(post.title)}</h3>
        ${post.excerpt ? `<p class="blog-excerpt">${esc(post.excerpt)}</p>` : ""}
        ${tags.length ? `<div class="blog-tags">${tags.map((tag) => `<span>#${esc(tag)}</span>`).join("")}</div>` : ""}
        <span class="blog-more">${esc(t()["blog.read"])}
          <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </span>
      `;

      card.addEventListener("click", () => openPost(i));
      card.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          openPost(i);
        }
      });

      grid.appendChild(card);
    });

    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("visible");
            obs.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    grid.querySelectorAll(".blog-card").forEach((c) => obs.observe(c));
  }

  /* ---------------- Modal reader ---------------- */

  async function openPost(i) {
    const post = posts[i];
    if (!post) return;
    openIndex = i;

    readerContent.innerHTML = `<p class="reader-loading">${esc(t()["blog.loading"])}</p>`;
    readerMeta.textContent = `${fmtDate(post.date)} · ${t()["blog.writtenBy"]} SY_`;
    showReader();

    const html = await renderMarkdown(post.body);
    if (openIndex !== i) return; // ถูกปิดระหว่างโหลด

    const tags = Array.isArray(post.tags) ? post.tags : [];
    readerContent.innerHTML = `
      <h1 class="reader-title" id="readerTitle">${esc(post.title)}</h1>
      ${tags.length ? `<div class="reader-tags">${tags.map((tag) => `<span>#${esc(tag)}</span>`).join("")}</div>` : ""}
      <div class="reader-body">${html}</div>
    `;
    history.pushState(null, "", "#blog-" + i);
  }

  function showReader() {
    lastFocus = document.activeElement;
    reader.classList.add("open");
    reader.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    readerCloseBtn.focus({ preventScroll: true });
  }

  function closeReader() {
    if (!reader.classList.contains("open")) return;
    reader.classList.remove("open");
    reader.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    openIndex = -1;
    if (location.hash.startsWith("#blog-")) {
      history.replaceState(null, "", location.pathname + location.search);
    }
    if (lastFocus && typeof lastFocus.focus === "function") lastFocus.focus({ preventScroll: true });
  }

  /* ---------------- Events ---------------- */

  document.querySelectorAll("[data-reader-close]").forEach((el) => el.addEventListener("click", closeReader));

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && reader.classList.contains("open")) closeReader();
  });

  function handleHash() {
    const m = location.hash.match(/^#blog-(\d+)$/);
    if (m) {
      if (posts[parseInt(m[1], 10)]) openPost(parseInt(m[1], 10));
    } else if (reader.classList.contains("open")) {
      closeReader(); // กดปุ่ม Back/Forward ของเบราว์เซอร์
    }
  }
  window.addEventListener("hashchange", handleHash);

  /* ---------------- Init ---------------- */

  loadPosts();
})();
