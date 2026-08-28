/* =========================================================================
   ==============================
   CUSTOMIZE YOUR WEBSITE HERE
   ==============================
   Everything you'd want to change lives in this one block.
   Scroll down to CUSTOMIZE_MESSAGES_HERE for the memory-card messages.
   ========================================================================= */

const sisterName  = "Riya";
const brotherName = "Manab";

// Photo paths — swap these files inside /assets to use your own photos.
// Keep the same file names, or update the "src" values below.
const photos = [
  { src: "assets/photo1.jpg", caption: "A little memory worth keeping. 💗" },
  { src: "assets/photo2.jpg", caption: "Another moment from our story. 🌸" },
  { src: "assets/photo3.jpg", caption: "Some memories just stay with you. ✨" },
  { src: "assets/photo4.jpg", caption: "And somehow, this became a beautiful memory. 🫶" },
  { src: "assets/photo5.jpg", caption: "Still one of my favourite memories. 💗" }
];

// Background music — drop a file at assets/music.mp3. The site works fine
// without one; the music button will just do nothing until a file exists.
const musicEnabled = true;

// Optional short sound effects — assets/click.mp3, open.mp3, sparkle.mp3
const soundEffectsEnabled = true;

/* -------------------- CUSTOMIZE_MESSAGES_HERE -------------------- */

// Scene 3 — "From the archives" memory cards
const memoryCards = [
  {
    title: "Growing up together",
    hint: "from the beginning",
    message: `We've had our share of childhood fights, shared secrets, and everything in between. Somehow, through all of it, you became someone genuinely special to me.\n\nKeep this one safe. 💗`,
    emoji: "📸"
  },
  {
    title: "Same house, endless drama",
    hint: "from the archives",
    message: `Random arguments, annoying each other, sharing things we shouldn't, and being there when it actually mattered — that's basically us in one sentence.\n\nKeep this one safe. 🌸`,
    emoji: "😂"
  },
  {
    title: "Still my favourite troublemaker",
    hint: "today · from the archives",
    message: `Two years later, we're still here — different days, different problems, same stupid conversations. Same as always, and I wouldn't have it any other way.\n\nKeep this one safe. 🫶`,
    emoji: "🫶"
  }
];

// Scene 4 — the gift card message
const giftCardHeading = "For My Sister 💗";
const giftCardMessage =
`Life gets busy, we fight over silly things, annoy each other and sometimes don't say much...

but you'll always be my sister, and I'll always be there for you.

We've collected enough random conversations, jokes, arguments, memories and stupid moments to fill a whole website. 😂

And honestly... I wouldn't trade any of it.`;
const giftCardSignature = `With lots of love,\nYour brother ❤️`;

// Scene 5 — "pick one" reveals
const pickMessages = {
  secret:   "You are much more important to me than I probably say.",
  memory:   "Some of our dumbest moments are still some of my favourite memories.",
  surprise: "You're stuck with me as your brother forever. Sorry. 😂❤️"
};

// Hidden star easter egg (top-left corner, every scene)
const hiddenStarMessage = "psst... you found the tiny star. 🌟 that's a bonus rakhi. ✨";

// Final-screen surprise after lingering a few seconds
const finalLingerSecret = "still here? that means a lot. love you, Riya. 💗";

/* =========================================================================
   Nothing below this line needs editing for basic personalization.
   ========================================================================= */

(function () {
  "use strict";

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------------- scene state machine ---------------- */
  const scenes = Array.from(document.querySelectorAll(".scene"));
  let currentScene = 1;

  const threadPath = document.getElementById("thread-path");
  const threadLength = 460;

  function updateThread(sceneNum) {
    const pct = (sceneNum - 1) / (scenes.length - 1);
    const offset = threadLength - threadLength * pct;
    threadPath.style.strokeDashoffset = String(offset);
  }

  function goToScene(num) {
    const from = document.getElementById(`scene-${currentScene}`);
    const to = document.getElementById(`scene-${num}`);
    if (!to || from === to) return;

    from.classList.add("scene-leaving");
    from.classList.remove("scene-active");

    setTimeout(() => {
      from.classList.remove("scene-leaving");
    }, 700);

    // slight delay so the leave animation has room to breathe
    setTimeout(() => {
      to.classList.add("scene-active");
    }, prefersReducedMotion ? 0 : 120);

    currentScene = num;
    updateThread(num);
    triggerSceneEnter(num);
    window.scrollTo(0, 0);
  }

  /* ---------------- particle canvas (soft floating hearts/flowers/sparkles) ---------------- */
  const canvas = document.getElementById("particle-canvas");
  const ctx = canvas.getContext("2d");
  let particles = [];
  const glyphs = ["✦", "✧", "❀", "♡", "✿", "⋆"];

  function resizeCanvas() {
    canvas.width = window.innerWidth * devicePixelRatio;
    canvas.height = window.innerHeight * devicePixelRatio;
    canvas.style.width = window.innerWidth + "px";
    canvas.style.height = window.innerHeight + "px";
    ctx.setTransform(devicePixelRatio, 0, 0, devicePixelRatio, 0, 0);
  }

  function seedParticles(count) {
    particles = [];
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        r: 8 + Math.random() * 10,
        speed: 0.15 + Math.random() * 0.35,
        drift: (Math.random() - 0.5) * 0.3,
        glyph: glyphs[Math.floor(Math.random() * glyphs.length)],
        opacity: 0.12 + Math.random() * 0.22,
        rotation: Math.random() * 360,
        rotSpeed: (Math.random() - 0.5) * 0.3
      });
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
    for (const p of particles) {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.opacity;
      ctx.font = `${p.r}px serif`;
      ctx.fillStyle = "#E7B8C9";
      ctx.textAlign = "center";
      ctx.fillText(p.glyph, 0, 0);
      ctx.restore();

      p.y -= p.speed;
      p.x += p.drift;
      p.rotation += p.rotSpeed;
      if (p.y < -20) {
        p.y = window.innerHeight + 20;
        p.x = Math.random() * window.innerWidth;
      }
    }
    if (!prefersReducedMotion) requestAnimationFrame(animateParticles);
  }

  resizeCanvas();
  seedParticles(window.innerWidth < 500 ? 16 : 26);
  window.addEventListener("resize", () => { resizeCanvas(); });
  if (!prefersReducedMotion) requestAnimationFrame(animateParticles);
  else animateParticles(); // draw one static frame

  /* ---------------- audio ---------------- */
  const bgMusic = document.getElementById("bg-music");
  const musicToggle = document.getElementById("music-toggle");
  let musicStarted = false;

  function playSfx(id) {
    if (!soundEffectsEnabled) return;
    const el = document.getElementById(id);
    if (!el) return;
    try {
      el.currentTime = 0;
      const p = el.play();
      if (p && p.catch) p.catch(() => {});
    } catch (e) { /* no sound file present — silently ignore */ }
  }

  musicToggle.addEventListener("click", () => {
    if (!musicEnabled) return;
    if (bgMusic.paused) {
      const p = bgMusic.play();
      if (p && p.catch) {
        p.then(() => {
          musicStarted = true;
          musicToggle.classList.add("playing");
          musicToggle.querySelector(".music-icon").textContent = "🎶";
        }).catch(() => { /* file missing or blocked — that's fine */ });
      }
    } else {
      bgMusic.pause();
      musicToggle.classList.remove("playing");
      musicToggle.querySelector(".music-icon").textContent = "🎵";
    }
  });

  /* ---------------- hidden star ---------------- */
  const hiddenStar = document.getElementById("hidden-star");
  const hiddenStarMsg = document.getElementById("hidden-star-msg");
  hiddenStar.addEventListener("click", () => {
    hiddenStarMsg.textContent = hiddenStarMessage;
    hiddenStarMsg.classList.add("show");
    playSfx("sfx-sparkle");
    setTimeout(() => hiddenStarMsg.classList.remove("show"), 3200);
  });

  /* ---------------- SCENE 1 : intro ---------------- */
  function typeLine(el, text, speed) {
    return new Promise((resolve) => {
      el.style.opacity = 1;
      if (prefersReducedMotion) { el.textContent = text; resolve(); return; }
      let i = 0;
      const timer = setInterval(() => {
        el.textContent = text.slice(0, i + 1);
        i++;
        if (i >= text.length) { clearInterval(timer); resolve(); }
      }, speed);
    });
  }

  async function runIntro() {
    const l1 = document.querySelector(".intro-line-1");
    const l2 = document.querySelector(".intro-line-2");
    const btn = document.getElementById("btn-open-surprise");
    l1.textContent = "";
    l2.textContent = "";
    l2.style.opacity = 0;
    btn.style.opacity = 0;
    await new Promise((r) => setTimeout(r, 500));
    await typeLine(l1, l1.dataset.text, 55);
    await new Promise((r) => setTimeout(r, 350));
    await typeLine(l2, l2.dataset.text, 30);
    await new Promise((r) => setTimeout(r, 250));
    btn.style.transition = "opacity 0.6s ease";
    btn.style.opacity = 1;
  }

  document.getElementById("btn-open-surprise").addEventListener("click", (e) => {
    playSfx("sfx-click");
    e.currentTarget.classList.add("pressed");
    if (musicEnabled) { bgMusic.play().then(() => {
      musicStarted = true;
      musicToggle.classList.add("playing");
      musicToggle.querySelector(".music-icon").textContent = "🎶";
    }).catch(() => {}); }
    setTimeout(() => goToScene(2), 260);
  });

  /* ---------------- SCENE 2 : reveal ---------------- */
  document.getElementById("btn-more-1").addEventListener("click", () => {
    playSfx("sfx-click");
    goToScene(3);
  });

  /* ---------------- SCENE 3 : memory cards ---------------- */
  const memoryCardsWrap = document.getElementById("memory-cards");
  memoryCards.forEach((card, idx) => {
    const btn = document.createElement("button");
    btn.className = "memory-card";
    btn.style.animationDelay = `${0.15 + idx * 0.12}s`;
    btn.innerHTML = `
      <p class="memory-card-title">${card.emoji} ${card.title}</p>
      <p class="memory-card-hint">${card.hint} — tap to open</p>
    `;
    btn.addEventListener("click", () => openMemoryModal(card));
    memoryCardsWrap.appendChild(btn);
  });

  const modalBackdrop = document.createElement("div");
  modalBackdrop.className = "memory-modal-backdrop";
  modalBackdrop.innerHTML = `
    <div class="memory-modal">
      <span class="memory-modal-emoji"></span>
      <h3></h3>
      <p></p>
      <button class="memory-modal-close">Close</button>
    </div>
  `;
  document.body.appendChild(modalBackdrop);

  function openMemoryModal(card) {
    playSfx("sfx-click");
    modalBackdrop.querySelector(".memory-modal-emoji").textContent = card.emoji;
    modalBackdrop.querySelector("h3").textContent = card.title;
    modalBackdrop.querySelector("p").textContent = card.message;
    modalBackdrop.classList.add("show");
  }
  modalBackdrop.addEventListener("click", (e) => {
    if (e.target === modalBackdrop || e.target.classList.contains("memory-modal-close")) {
      modalBackdrop.classList.remove("show");
    }
  });

  document.getElementById("btn-more-2").addEventListener("click", () => {
    playSfx("sfx-click");
    goToScene(4);
  });

  /* ---------------- SCENE 4 : gift ---------------- */
  const giftBox = document.getElementById("gift-box");
  const giftCard = document.getElementById("gift-card");
  const giftBurst = document.getElementById("gift-burst");
  let giftOpened = false;

  const burstGlyphs = ["✨", "💗", "🌸", "🎀", "⭐"];
  function fireBurst() {
    giftBurst.innerHTML = "";
    const count = prefersReducedMotion ? 0 : 16;
    for (let i = 0; i < count; i++) {
      const span = document.createElement("span");
      span.textContent = burstGlyphs[i % burstGlyphs.length];
      const angle = (Math.PI * 2 * i) / count;
      const dist = 60 + Math.random() * 50;
      span.style.setProperty("--bx", `${Math.cos(angle) * dist}px`);
      span.style.setProperty("--by", `${Math.sin(angle) * dist}px`);
      span.style.animationDelay = `${Math.random() * 0.15}s`;
      giftBurst.appendChild(span);
    }
    giftBurst.classList.remove("burst");
    void giftBurst.offsetWidth;
    giftBurst.classList.add("burst");
  }

  giftBox.addEventListener("click", () => {
    if (giftOpened) return;
    giftOpened = true;
    playSfx("sfx-click");
    giftBox.classList.add("shaking");
    setTimeout(() => {
      giftBox.classList.remove("shaking");
      giftBox.classList.add("opened");
      playSfx("sfx-open");
      fireBurst();
      setTimeout(() => {
        giftCard.classList.add("show");
      }, 350);
    }, 500);
  });

  document.getElementById("gift-card-heading").textContent = giftCardHeading;
  document.getElementById("gift-card-message").textContent = giftCardMessage;
  document.getElementById("gift-card-signature").textContent = giftCardSignature;

  document.getElementById("btn-more-3").addEventListener("click", () => {
    playSfx("sfx-click");
    goToScene(5);
  });

  /* ---------------- SCENE 5 : pick one ---------------- */
  const pickCards = document.querySelectorAll(".pick-card");
  const pickReveal = document.getElementById("pick-reveal");
  const pickRevealText = document.getElementById("pick-reveal-text");
  const btnToFinal = document.getElementById("btn-to-final");
  let picked = false;

  pickCards.forEach((card) => {
    card.addEventListener("click", () => {
      if (picked) return;
      picked = true;
      playSfx("sfx-sparkle");
      const key = card.dataset.pick;
      pickCards.forEach((c) => {
        if (c === card) c.classList.add("picked");
        else c.classList.add("faded");
      });
      pickRevealText.textContent = pickMessages[key] || "";
      requestAnimationFrame(() => pickReveal.classList.add("show"));
      setTimeout(() => btnToFinal.classList.remove("hidden"), 600);
    });
  });

  btnToFinal.addEventListener("click", () => {
    playSfx("sfx-click");
    goToScene(6);
  });

  /* ---------------- SCENE 6 : final ---------------- */
  document.getElementById("final-sister-name").textContent = sisterName;
  document.getElementById("final-made-by").textContent = `Made specially for you by your brother, ${brotherName}.`;

  function fireConfetti() {
    if (prefersReducedMotion) return;
    const colors = ["#F4A6C1", "#D4A857", "#E7DDF7", "#FFE3C9", "#C24E71"];
    for (let i = 0; i < 40; i++) {
      const el = document.createElement("div");
      el.className = "confetti-piece";
      const size = 5 + Math.random() * 6;
      el.style.width = `${size}px`;
      el.style.height = `${size * 0.5}px`;
      el.style.left = `${Math.random() * 100}vw`;
      el.style.background = colors[Math.floor(Math.random() * colors.length)];
      el.style.animationDuration = `${3 + Math.random() * 2.5}s`;
      el.style.animationDelay = `${Math.random() * 0.6}s`;
      document.body.appendChild(el);
      setTimeout(() => el.remove(), 7000);
    }
  }

  let lingerTimer = null;
  const finalSecretEl = document.getElementById("final-secret");
  function armLingerSecret() {
    clearTimeout(lingerTimer);
    finalSecretEl.classList.remove("show");
    lingerTimer = setTimeout(() => {
      finalSecretEl.textContent = finalLingerSecret;
      finalSecretEl.classList.add("show");
    }, 6000);
  }

  document.getElementById("btn-replay").addEventListener("click", () => {
    playSfx("sfx-click");
    // reset gift + pick state for a clean replay
    giftOpened = false;
    giftBox.classList.remove("opened");
    giftCard.classList.remove("show");
    picked = false;
    pickCards.forEach((c) => c.classList.remove("picked", "faded"));
    pickReveal.classList.remove("show");
    btnToFinal.classList.add("hidden");
    clearTimeout(lingerTimer);
    finalSecretEl.classList.remove("show");
    goToScene(1);
    setTimeout(runIntro, 700);
  });

  /* ---------------- photo injection ---------------- */
  const photoEls = [1, 2, 3, 4, 5].map((n) => document.getElementById(`memory-photo-${n}`));
  const photoCapEls = {
    1: document.getElementById("memory-photo-1-cap"),
    2: document.getElementById("memory-photo-2-cap"),
    5: document.getElementById("memory-photo-5-cap")
  };
  photos.forEach((p, idx) => {
    const n = idx + 1;
    const img = document.getElementById(`memory-photo-${n}`);
    if (img) { img.src = p.src; img.alt = `${sisterName} — memory ${n}`; }
    if (photoCapEls[n]) photoCapEls[n].textContent = p.caption;
  });

  /* ---------------- per-scene enter hooks ---------------- */
  function triggerSceneEnter(num) {
    if (num === 6) {
      setTimeout(fireConfetti, prefersReducedMotion ? 0 : 300);
      armLingerSecret();
    }
  }

  /* ---------------- boot ---------------- */
  updateThread(1);
  runIntro();

})();
