(function () {
  "use strict";

  var data = window.__BRAND__ || {};
  var reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  var fineHover = matchMedia("(hover: hover) and (pointer: fine)").matches;

  var $ = function (sel, scope) { return (scope || document).querySelector(sel); };
  var $$ = function (sel, scope) { return Array.prototype.slice.call((scope || document).querySelectorAll(sel)); };
  var escHTML = function (s) {
    return String(s == null ? "" : s).replace(/[&<>"']/g, function (c) {
      return { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c];
    });
  };
  function safe(fn, name) {
    try { fn(); } catch (e) { console.warn("[" + name + "]", e); }
  }

  /* ---------------------------------------------------------
     Splash
  --------------------------------------------------------- */
  function initSplash() {
    var splash = $(".splash");
    if (!splash) return;
    window.setTimeout(function () {
      splash.style.display = "none";
    }, 2900);
  }

  /* ---------------------------------------------------------
     Nav — scroll state, mobile menu, active link
  --------------------------------------------------------- */
  function initNav() {
    var nav = $(".nav");
    if (!nav) return;
    var onScroll = function () {
      if (window.scrollY > 40) nav.classList.add("is-scrolled");
      else nav.classList.remove("is-scrolled");
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    var toggle = $(".nav-toggle");
    var menu = $(".mobile-menu");
    if (toggle && menu) {
      toggle.addEventListener("click", function () {
        var open = toggle.classList.toggle("is-open");
        menu.classList.toggle("is-open", open);
        document.body.style.overflow = open ? "hidden" : "";
      });
      $$("a", menu).forEach(function (a) {
        a.addEventListener("click", function () {
          toggle.classList.remove("is-open");
          menu.classList.remove("is-open");
          document.body.style.overflow = "";
        });
      });
    }

    var here = document.body.getAttribute("data-page");
    $$(".nav-links a, .mobile-menu a").forEach(function (a) {
      if (a.getAttribute("data-nav") === here) a.classList.add("is-active");
    });
  }

  /* ---------------------------------------------------------
     Custom cursor
  --------------------------------------------------------- */
  function initCursor() {
    var root = $("[data-cursor-root]");
    if (!root || !fineHover) return;
    document.documentElement.classList.add("has-cursor");
    var dot = $(".cursor-dot", root);
    // Inner <i> carries the scale so it doesn't fight with positioning
    if (dot && !dot.firstElementChild) dot.appendChild(document.createElement("i"));

    var mx = -100, my = -100;       // real pointer
    var dx = mx, dy = my;           // dot (soft, silky follow)
    var DOT_EASE = reduced ? 1 : 0.2;
    var running = false, firstMove = false;

    function frame() {
      dx += (mx - dx) * DOT_EASE;
      dy += (my - dy) * DOT_EASE;
      if (dot) dot.style.transform = "translate3d(" + dx.toFixed(2) + "px," + dy.toFixed(2) + "px,0)";
      var settled = Math.abs(mx - dx) < 0.05 && Math.abs(my - dy) < 0.05;
      if (settled) { running = false; return; }
      requestAnimationFrame(frame);
    }
    function kick() { if (!running) { running = true; requestAnimationFrame(frame); } }

    window.addEventListener("mousemove", function (e) {
      mx = e.clientX; my = e.clientY;
      if (!firstMove) {
        firstMove = true;
        dx = mx; dy = my;   // no fly-in from the corner on first move
        root.classList.add("is-ready");
      }
      root.classList.remove("is-hidden");
      kick();
    }, { passive: true });

    document.documentElement.addEventListener("mouseleave", function () { root.classList.add("is-hidden"); });
    document.documentElement.addEventListener("mouseenter", function () { root.classList.remove("is-hidden"); });
    window.addEventListener("mousedown", function () { root.classList.add("is-down"); });
    window.addEventListener("mouseup", function () { root.classList.remove("is-down"); });

    var hoverables = "a, button, .tilt, label, [role='button'], [data-cursor-interactive]";
    document.addEventListener("mouseover", function (e) {
      var t = e.target.closest ? e.target.closest(hoverables) : null;
      if (t && !t.contains(e.relatedTarget)) root.classList.add("is-interactive");
    });
    document.addEventListener("mouseout", function (e) {
      var t = e.target.closest ? e.target.closest(hoverables) : null;
      if (t && !t.contains(e.relatedTarget)) root.classList.remove("is-interactive");
    });
  }

  /* ---------------------------------------------------------
     Reveal on scroll (IntersectionObserver + 6s safety net)
  --------------------------------------------------------- */
  function initReveals() {
    var els = $$(".reveal, .split-line");
    if (!els.length) return;
    if (!("IntersectionObserver" in window)) {
      els.forEach(function (el) { el.classList.add("is-visible"); });
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.05, rootMargin: "0px 0px -6% 0px" });
    els.forEach(function (el) { io.observe(el); });

    window.setTimeout(function () {
      els.forEach(function (el) { el.classList.add("is-visible"); });
    }, 6000);
  }

  /* ---------------------------------------------------------
     Tilt 3D — cards with gold halo following cursor
  --------------------------------------------------------- */
  function initTilt() {
    if (!fineHover) return;
    $$(".tilt").forEach(function (card) {
      card.addEventListener("mousemove", function (e) {
        var r = card.getBoundingClientRect();
        var px = (e.clientX - r.left) / r.width;
        var py = (e.clientY - r.top) / r.height;
        card.style.setProperty("--mx", (px * 100) + "%");
        card.style.setProperty("--my", (py * 100) + "%");
        var rx = (py - 0.5) * -6;
        var ry = (px - 0.5) * 6;
        card.style.transform = "perspective(900px) rotateX(" + rx + "deg) rotateY(" + ry + "deg) translateY(-4px)";
      });
      card.addEventListener("mouseleave", function () {
        card.style.transform = "";
      });
    });
  }

  /* ---------------------------------------------------------
     Counters
  --------------------------------------------------------- */
  function initCounters() {
    var els = $$("[data-count-to]");
    if (!els.length) return;
    var animate = function (el) {
      var target = parseFloat(el.getAttribute("data-count-to"));
      var dur = 1600;
      var start = null;
      var from = 0;
      function step(ts) {
        if (!start) start = ts;
        var p = Math.min((ts - start) / dur, 1);
        var eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(from + (target - from) * eased);
        if (p < 1) window.requestAnimationFrame(step);
        else el.textContent = target;
      }
      window.requestAnimationFrame(step);
    };
    if (!("IntersectionObserver" in window)) { els.forEach(animate); return; }
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { animate(entry.target); io.unobserve(entry.target); }
      });
    }, { threshold: 0.05 });
    els.forEach(function (el) { io.observe(el); });
  }

  /* ---------------------------------------------------------
     Before / After slider
  --------------------------------------------------------- */
  function initBeforeAfter() {
    $$(".ba-wrap").forEach(function (wrap) {
      var after = $(".ba-after", wrap);
      var handle = $(".ba-handle", wrap);
      if (!after || !handle) return;
      var dragging = false;

      function setPos(clientX) {
        var r = wrap.getBoundingClientRect();
        var pct = Math.min(1, Math.max(0, (clientX - r.left) / r.width));
        after.style.clipPath = "inset(0 0 0 " + (pct * 100) + "%)";
        handle.style.left = (pct * 100) + "%";
      }

      wrap.addEventListener("pointerdown", function (e) { dragging = true; setPos(e.clientX); });
      window.addEventListener("pointermove", function (e) { if (dragging) setPos(e.clientX); });
      window.addEventListener("pointerup", function () { dragging = false; });
      wrap.addEventListener("touchstart", function (e) { if (e.touches[0]) setPos(e.touches[0].clientX); }, { passive: true });
      wrap.addEventListener("touchmove", function (e) { if (e.touches[0]) setPos(e.touches[0].clientX); }, { passive: true });
    });
  }

  /* ---------------------------------------------------------
     Portfolio: mount grid + filters + dialog
  --------------------------------------------------------- */
  function projectCardHTML(p, idx) {
    var img = p.images && p.images[0] ? "assets/img/" + p.images[0] : "";
    return (
      '<article class="pcard tilt reveal" data-cat="' + escHTML(p.category) + '" data-project="' + escHTML(p.id) + '" tabindex="0" role="button" aria-haspopup="dialog">' +
        '<div class="pcard-img"><img src="' + escHTML(img) + '" alt="' + escHTML(p.name) + '" loading="lazy" decoding="async" /></div>' +
        '<div class="pcard-tag">' + escHTML(p.year || "") + '</div>' +
        '<div class="pcard-body">' +
          '<h3 class="pcard-name">' + escHTML(p.name) + '</h3>' +
          '<p class="pcard-loc">' + escHTML(p.location) + '</p>' +
          '<span class="pcard-view">Ver proyecto <span aria-hidden="true">&rarr;</span></span>' +
        '</div>' +
      '</article>'
    );
  }

  function mountPortfolioGrid() {
    var target = $("[data-portfolio-grid]");
    if (!target || target.children.length > 0 || !data.projects) return;
    target.innerHTML = data.projects.map(projectCardHTML).join("");
  }

  function mountFeaturedGrid() {
    var target = $("[data-featured-grid]");
    if (!target || target.children.length > 0 || !data.projects) return;
    var featured = data.projects.filter(function (p) { return p.featured; }).slice(0, 5);
    if (featured.length < 5) {
      data.projects.forEach(function (p) {
        if (featured.length < 5 && featured.indexOf(p) === -1) featured.push(p);
      });
    }
    target.innerHTML = featured.map(projectCardHTML).join("");
  }

  function mountFilters() {
    var target = $("[data-portfolio-filters]");
    if (!target || target.children.length > 0 || !data.categories) return;
    var html = '<button class="filter-btn is-active" data-filter="all">Todos</button>';
    html += data.categories.map(function (c) {
      return '<button class="filter-btn" data-filter="' + escHTML(c.id) + '">' + escHTML(c.label) + '</button>';
    }).join("");
    target.innerHTML = html;
    target.addEventListener("click", function (e) {
      var btn = e.target.closest(".filter-btn");
      if (!btn) return;
      $$(".filter-btn", target).forEach(function (b) { b.classList.remove("is-active"); });
      btn.classList.add("is-active");
      var f = btn.getAttribute("data-filter");
      $$(".pcard[data-project]").forEach(function (card) {
        var show = f === "all" || card.getAttribute("data-cat") === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  }

  function openProjectDialog(id) {
    var dlg = $("#project-dialog");
    if (!dlg || !data.projects) return;
    var p = data.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;

    var gallery = (p.images || []).map(function (img) {
      return '<img src="assets/img/' + escHTML(img) + '" alt="' + escHTML(p.name) + '" loading="lazy" decoding="async" />';
    }).join("");

    $(".pdialog-gallery", dlg).innerHTML = gallery;
    $(".pdialog-name", dlg).textContent = p.name;
    $(".pdialog-desc", dlg).textContent = p.desc;
    $(".pdialog-loc", dlg).textContent = p.location;
    $(".pdialog-design", dlg).textContent = p.design;
    $(".pdialog-year", dlg).textContent = p.year;
    $(".pdialog-tags", dlg).innerHTML = (p.tags || []).map(function (t) {
      return "<span>" + escHTML(t) + "</span>";
    }).join("");

    if (typeof dlg.showModal === "function") dlg.showModal();
  }

  function initPortfolioInteractions() {
    document.addEventListener("click", function (e) {
      var card = e.target.closest("[data-project]");
      if (card) openProjectDialog(card.getAttribute("data-project"));
    });
    document.addEventListener("keydown", function (e) {
      if (e.key !== "Enter" && e.key !== " ") return;
      var card = e.target.closest && e.target.closest("[data-project]");
      if (card) { e.preventDefault(); openProjectDialog(card.getAttribute("data-project")); }
    });
    var dlg = $("#project-dialog");
    if (dlg) {
      var closeBtn = $(".pdialog-close", dlg);
      if (closeBtn) closeBtn.addEventListener("click", function () { dlg.close(); });
      dlg.addEventListener("click", function (e) {
        var r = dlg.getBoundingClientRect();
        var inside = e.clientX >= r.left && e.clientX <= r.right && e.clientY >= r.top && e.clientY <= r.bottom;
        if (!inside) dlg.close();
      });
    }
  }

  /* ---------------------------------------------------------
     Mount: marquee, collaborators, services, stats, footer year
  --------------------------------------------------------- */
  function mountMarquee() {
    var target = $("[data-marquee]");
    if (!target || target.dataset.mounted || !data.clientMarquee) return;
    target.dataset.mounted = "1";
    var items = data.clientMarquee.map(function (name) { return "<span>" + escHTML(name) + "</span>"; }).join("");
    target.innerHTML = items + items; // duplicate for seamless loop
  }

  function mountCollaborators() {
    var target = $("[data-collaborators]");
    if (!target || target.children.length > 0 || !data.collaborators) return;
    target.innerHTML = data.collaborators.map(function (c) { return "<li>" + escHTML(c) + "</li>"; }).join("");
  }

  function mountStats() {
    var target = $("[data-stats]");
    if (!target || target.children.length > 0 || !data.stats) return;
    target.innerHTML = data.stats.map(function (s) {
      return (
        '<div class="stat reveal">' +
          '<div class="stat-num"><span data-count-to="' + s.n + '">0</span><span class="suffix">' + escHTML(s.suffix) + '</span></div>' +
          '<div class="stat-label">' + escHTML(s.label) + '</div>' +
        '</div>'
      );
    }).join("");
  }

  function mountServices(full) {
    var target = $("[data-services]");
    if (!target || target.children.length > 0 || !data.services) return;
    var list = full ? data.services : data.services.slice(0, 3);
    target.innerHTML = list.map(function (s, i) {
      var items = full ? s.items.map(function (it) { return "<li>" + escHTML(it) + "</li>"; }).join("") : "";
      return (
        '<div class="service-card reveal">' +
          '<div class="service-num">0' + (i + 1) + '</div>' +
          '<h3 class="service-title">' + escHTML(s.title) + '</h3>' +
          '<p class="service-blurb">' + escHTML(s.blurb) + '</p>' +
          (full ? '<ul class="service-items">' + items + '</ul>' : '') +
        '</div>'
      );
    }).join("");
  }

  function mountFooterMeta() {
    $$("[data-year]").forEach(function (el) { el.textContent = new Date().getFullYear(); });
    $$("[data-brand-email]").forEach(function (el) {
      el.textContent = data.contact ? data.contact.email : "";
      if (el.tagName === "A") el.href = "mailto:" + (data.contact ? data.contact.email : "");
    });
    $$("[data-brand-phone]").forEach(function (el) {
      el.textContent = data.contact ? data.contact.phoneDisplay : "";
      if (el.tagName === "A") el.href = "tel:" + (data.contact ? data.contact.phone.replace(/\s+/g, "") : "");
    });
    $$("[data-brand-fb]").forEach(function (el) { if (data.contact) el.href = data.contact.facebook; });
    $$("[data-brand-ig]").forEach(function (el) { if (data.contact) el.href = data.contact.instagram; });
  }

  /* ---------------------------------------------------------
     Contact form
  --------------------------------------------------------- */
  function initContactForm() {
    var form = $("#contact-form");
    if (!form) return;
    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!form.reportValidity()) return;
      var status = $(".form-status", form);
      var btn = $('button[type="submit"]', form);
      var endpoint = form.getAttribute("action");
      var placeholder = !endpoint || endpoint.indexOf("YOUR_FORM_ID") > -1;

      if (placeholder) {
        var fd = new FormData(form);
        var subject = encodeURIComponent("Contacto desde atmosferamakers.com — " + (fd.get("name") || ""));
        var body = encodeURIComponent(
          "Nombre: " + fd.get("name") + "\n" +
          "Email: " + fd.get("email") + "\n" +
          "Teléfono: " + fd.get("phone") + "\n" +
          "Tipo de proyecto: " + fd.get("project_type") + "\n\n" +
          fd.get("message")
        );
        window.location.href = "mailto:" + (data.contact ? data.contact.email : "") + "?subject=" + subject + "&body=" + body;
        if (status) { status.textContent = "Abriendo tu cliente de correo…"; status.className = "form-status is-success"; }
        return;
      }

      if (btn) btn.disabled = true;
      if (status) { status.textContent = "Enviando…"; status.className = "form-status"; }

      fetch(endpoint, {
        method: "POST",
        body: new FormData(form),
        headers: { Accept: "application/json" }
      }).then(function (res) {
        if (res.ok) {
          form.reset();
          if (status) { status.textContent = "Gracias — recibimos tu mensaje. Te contactaremos pronto."; status.className = "form-status is-success"; }
        } else {
          if (status) { status.textContent = "Hubo un problema al enviar. Intenta de nuevo o escríbenos directo."; status.className = "form-status is-error"; }
        }
      }).catch(function () {
        if (status) { status.textContent = "Hubo un problema al enviar. Intenta de nuevo o escríbenos directo."; status.className = "form-status is-error"; }
      }).finally(function () {
        if (btn) btn.disabled = false;
      });
    });
  }

  /* ---------------------------------------------------------
     GSAP-dependent: hero parallax, split headline
  --------------------------------------------------------- */
  function initSplitHeadline() {
    $$("[data-split-lines]").forEach(function (el) {
      if (el.dataset.split) return;
      el.dataset.split = "1";
      var text = el.textContent;
      var html = Array.prototype.map.call(el.childNodes, function (node) {
        if (node.nodeType === 3) return node.textContent;
        if (node.nodeName === "BR") return "\n";
        if (node.nodeType === 1) return node.outerHTML;
        return "";
      }).join("");
      var lines = el.innerHTML.split(/<br\s*\/?>/i);
      el.innerHTML = lines.map(function (line) {
        return '<span class="split-line"><span>' + line + "</span></span>";
      }).join("");
    });
  }

  function initHeroParallax() {
    var img = $(".hero-bg img");
    if (!img || reduced) return;
    window.addEventListener("scroll", function () {
      var y = window.scrollY;
      if (y < window.innerHeight * 1.2) {
        img.style.transform = "translate3d(0," + (y * 0.18) + "px,0) scale(1.08)";
      }
    }, { passive: true });
  }

  /* ---------------------------------------------------------
     Boot
  --------------------------------------------------------- */
  function boot() {
    safe(mountMarquee, "mountMarquee");
    safe(mountCollaborators, "mountCollaborators");
    safe(mountStats, "mountStats");
    safe(function () { mountServices(document.body.getAttribute("data-page") === "servicios"); }, "mountServices");
    safe(mountFeaturedGrid, "mountFeaturedGrid");
    safe(mountPortfolioGrid, "mountPortfolioGrid");
    safe(mountFilters, "mountFilters");
    safe(mountFooterMeta, "mountFooterMeta");

    safe(initSplash, "initSplash");
    safe(initNav, "initNav");
    safe(initCursor, "initCursor");
    safe(initSplitHeadline, "initSplitHeadline");
    safe(initReveals, "initReveals");
    safe(initTilt, "initTilt");
    safe(initCounters, "initCounters");
    safe(initBeforeAfter, "initBeforeAfter");
    safe(initPortfolioInteractions, "initPortfolioInteractions");
    safe(initContactForm, "initContactForm");
    safe(initHeroParallax, "initHeroParallax");

    document.documentElement.classList.add("is-ready");
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
