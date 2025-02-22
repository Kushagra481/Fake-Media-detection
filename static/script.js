// Mobile menu functionality
const menuButton = document.getElementById("menuButton");
const mobileMenu = document.getElementById("mobileMenu");

if (menuButton && mobileMenu) {
  menuButton.addEventListener("click", () => {
    mobileMenu.classList.toggle("hidden");
  });

  document.addEventListener("click", (e) => {
    if (!mobileMenu.contains(e.target) && !menuButton.contains(e.target)) {
      mobileMenu.classList.add("hidden");
    }
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) {
      mobileMenu.classList.add("hidden");
    }
  });
}

// Tab switching functionality (Only if tabs exist)
const tabs = document.querySelectorAll("[data-tab]");
const contentAreas = document.querySelectorAll(".content-area");

if (tabs.length > 0) {
  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("tab-active", "text-gray-400"));
      tab.classList.add("tab-active");

      contentAreas.forEach((area) => area.classList.add("hidden"));
      document.getElementById(`${tab.dataset.tab}Area`).classList.remove("hidden");

      document.getElementById("resultsArea").classList.add("hidden");
    });
  });
}

// File upload handling (Only if input elements exist)
document.querySelectorAll('input[type="file"]').forEach((input) => {
  input.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) {
      const uploadArea = e.target.closest(".upload-area");
      const preview = document.createElement(
        input.accept.includes("video") ? "video" : "audio"
      );
      preview.controls = true;
      preview.src = URL.createObjectURL(file);
      preview.className = "w-full h-full";
      uploadArea.innerHTML = "";
      uploadArea.appendChild(preview);
    }
  });
});

// Analysis functionality (Only if analyzeBtn exists)
const analyzeBtn = document.getElementById("analyzeBtn");
if (analyzeBtn) {
  analyzeBtn.addEventListener("click", () => {
    const resultsArea = document.getElementById("resultsArea");
    const resultTitle = document.getElementById("resultTitle");
    const confidenceValue = document.getElementById("confidenceValue");
    const indicatorsList = document.getElementById("indicatorsList");

    resultsArea.classList.add("hidden");
    analyzeBtn.textContent = "Analyzing...";
    analyzeBtn.disabled = true;

    setTimeout(() => {
      const isFake = Math.random() > 0.5;
      const confidence = (Math.random() * 40 + 60).toFixed(1);
      const indicators = [
        "Pattern inconsistency detected",
        "Unusual content structure",
        "Algorithmic anomalies found",
      ];

      resultTitle.textContent = isFake ? "Potentially Fake Content" : "Likely Genuine Content";
      confidenceValue.textContent = `${confidence}%`;
      indicatorsList.innerHTML = indicators.map((i) => `<li>${i}</li>`).join("");

      resultsArea.classList.remove("hidden");
      analyzeBtn.textContent = "Analyze Content";
      analyzeBtn.disabled = false;
    }, 2000);
  });
}

// 3D Title Animation (Only if title exists)
const heroTitleSpans = document.querySelectorAll(".hero-title-3d span");
if (heroTitleSpans.length > 0) {
  heroTitleSpans.forEach((letter) => {
    letter.addEventListener("mouseover", () => {
      letter.style.transform = "translateZ(50px) rotateX(20deg)";
    });
    letter.addEventListener("mouseout", () => {
      letter.style.transform = "translateZ(0) rotateX(0)";
    });
  });
}

// Parallax Effect for Floating Elements (Only if elements exist)
const floatingElements = document.querySelectorAll(".floating-element");
if (floatingElements.length > 0) {
  document.addEventListener("mousemove", (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    floatingElements.forEach((element, index) => {
      const depth = (index + 1) * 0.2;
      const moveX = (mouseX - 0.5) * 50 * depth;
      const moveY = (mouseY - 0.5) * 50 * depth;
      element.style.transform = `translate3d(${moveX}px, ${moveY}px, 0) rotate(${moveX * 0.5}deg)`;
    });
  });
}

// Hero Card Tilt Effect (Only if heroCard exists)
const heroCard = document.querySelector(".hero-card");
if (heroCard) {
  heroCard.addEventListener("mousemove", (e) => {
    const rect = heroCard.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const angleX = (y - centerY) / 20;
    const angleY = (centerX - x) / 20;

    heroCard.style.transform = `rotateX(${angleX}deg) rotateY(${angleY}deg) translateZ(50px)`;
  });

  heroCard.addEventListener("mouseleave", () => {
    heroCard.style.transform = "rotateX(0) rotateY(0) translateZ(20px)";
  });
}
