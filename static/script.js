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

// Tab switching functionality
const tabs = document.querySelectorAll("[data-tab]");
const contentAreas = document.querySelectorAll(".content-area");

if (tabs.length > 0) {
  // Set initial state - first tab active
  tabs[0].classList.add('tab-active');
  tabs[0].classList.remove('text-gray-400');
  document.getElementById('textArea').classList.remove('hidden');

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      // Remove active state from all tabs
      tabs.forEach((t) => {
        t.classList.remove("tab-active");
        t.classList.add("text-gray-400");
      });

      // Add active state to clicked tab
      tab.classList.add("tab-active");
      tab.classList.remove("text-gray-400");

      // Hide all content areas
      contentAreas.forEach((area) => {
        area.classList.add("hidden");
      });

      // Show selected content area
      const targetArea = document.getElementById(`${tab.dataset.tab}Area`);
      if (targetArea) {
        targetArea.classList.remove("hidden");
      }

      // Hide results when switching tabs
      const resultsArea = document.getElementById("resultsArea");
      if (resultsArea) {
        resultsArea.classList.add("hidden");
      }
    });
  });
}

// File upload handling
const fileInputs = document.querySelectorAll('input[type="file"]');
fileInputs.forEach(input => {
  const uploadArea = input.closest('.upload-area');
  if (uploadArea) {
    uploadArea.addEventListener('click', () => {
      input.click();
    });

    input.addEventListener('change', (e) => {
      if (e.target.files.length > 0) {
        const fileName = e.target.files[0].name;
        const fileInfo = uploadArea.querySelector('.text-sm');
        if (fileInfo) {
          fileInfo.textContent = `Selected: ${fileName}`;
        }
      }
    });
  }
});

// Analysis functionality (Only if analyzeBtn exists)
const analyzeBtn = document.getElementById('analyzeBtn');
if (analyzeBtn) {
    analyzeBtn.addEventListener('click', async () => {
        // Show loading state
        analyzeBtn.textContent = 'Analyzing...';
        analyzeBtn.disabled = true;

        try {
            const response = await fetch('/analyze', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    type: 'text', // or 'audio' or 'video' based on active tab
                    content: document.querySelector('textarea').value
                })
            });

            const data = await response.json();

            // Show results area
            const resultsArea = document.getElementById('resultsArea');
            if (resultsArea) {
                resultsArea.classList.remove('hidden');
                
                // Update results
                document.getElementById('resultTitle').textContent = 'Analysis Complete';
                document.getElementById('confidenceValue').textContent = data.confidence;
                
                // Update indicators
                const indicatorsList = document.getElementById('indicatorsList');
                indicatorsList.innerHTML = data.indicators
                    .map(indicator => `<li>${indicator}</li>`)
                    .join('');
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle error state
        } finally {
            // Reset button
            analyzeBtn.textContent = 'Analyze Content';
            analyzeBtn.disabled = false;
        }
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

// Get Started button scroll functionality
document.addEventListener('DOMContentLoaded', () => {
    const getStartedBtn = document.getElementById('getStartedBtn');
    
    if (getStartedBtn) {
        getStartedBtn.addEventListener('click', () => {
            const contentAnalysis = document.getElementById('contentAnalysis');
            if (contentAnalysis) {
                contentAnalysis.scrollIntoView({ 
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    }
});
