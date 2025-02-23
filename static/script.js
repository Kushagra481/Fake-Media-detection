document.addEventListener("DOMContentLoaded", () => {
  // Mobile Menu Functionality
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

  // Tab Switching Functionality
  const tabs = document.querySelectorAll("[data-tab]");
  const contentAreas = document.querySelectorAll(".content-area");

  if (tabs.length > 0) {
    tabs[0].classList.add("tab-active");
    tabs[0].classList.remove("text-gray-400");
    document.getElementById("textArea").classList.remove("hidden");

    tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        tabs.forEach((t) => {
          t.classList.remove("tab-active");
          t.classList.add("text-gray-400");
        });

        tab.classList.add("tab-active");
        tab.classList.remove("text-gray-400");

        contentAreas.forEach((area) => area.classList.add("hidden"));

        const targetArea = document.getElementById(`${tab.dataset.tab}Area`);
        if (targetArea) {
          targetArea.classList.remove("hidden");
        }

        document.getElementById("resultsArea").classList.add("hidden");
      });
    });
  }

  // File Upload Handling
  const fileInputs = document.querySelectorAll('input[type="file"]');
  fileInputs.forEach((input) => {
    const uploadArea = input.closest(".upload-area");
    if (uploadArea) {
      uploadArea.addEventListener("click", () => input.click());

      input.addEventListener("change", (e) => {
        if (e.target.files.length > 0) {
          const fileName = e.target.files[0].name;
          const fileInfo = uploadArea.querySelector(".text-sm");
          if (fileInfo) {
            fileInfo.textContent = `Selected: ${fileName}`;
          }
        }
      });
    }
  });

  // Analysis Button Click Handling
  const analyzeBtn = document.getElementById("analyzeBtn");
  if (analyzeBtn) {
    analyzeBtn.addEventListener("click", async () => {
      analyzeBtn.textContent = "Analyzing...";
      analyzeBtn.disabled = true;

      const activeTab = document.querySelector(".tab-active").dataset.tab;
      let requestData;
      let requestHeaders = {};
      let endpoint = "/analyze";

      try {
        if (activeTab === "text") {
          // Text Analysis
          const textInput = document.querySelector("#textInput").value.trim();
          if (!textInput) {
            alert("Please enter text to analyze.");
            throw new Error("No text input.");
          }

          requestHeaders["Content-Type"] = "application/json";
          requestData = JSON.stringify({ type: "text", content: textInput });

        } else if (activeTab === "audio") {
          // Audio Analysis
          const audioFile = document.querySelector("#audioUpload").files[0];
          if (!audioFile) {
            alert("Please select an audio file.");
            throw new Error("No audio file selected.");
          }

          requestData = new FormData();
          requestData.append("file", audioFile);

        } else if (activeTab === "video") {
          // Video Analysis
          const videoFile = document.querySelector("#videoUpload").files[0];
          if (!videoFile) {
            alert("Please select a video file.");
            throw new Error("No video file selected.");
          }

          requestData = new FormData();
          requestData.append("file", videoFile);
        }

        // Send request
        const response = await fetch(endpoint, {
          method: "POST",
          headers: requestHeaders,
          body: requestData,
        });

        const data = await response.json();

        // Show results
        const resultsArea = document.getElementById("resultsArea");
        if (resultsArea) {
          resultsArea.classList.remove("hidden");

          document.getElementById("resultTitle").textContent = "Analysis Complete";
          document.getElementById("confidenceValue").textContent = `${data.confidence}%`;

          const indicatorsList = document.getElementById("indicatorsList");
          indicatorsList.innerHTML = data.indicators
            .map((indicator) => `<li>${indicator}</li>`)
            .join("");
        }
      } catch (error) {
        console.error("Error:", error);
        alert("An error occurred while analyzing. Please try again.");
      } finally {
        analyzeBtn.textContent = "Analyze Content";
        analyzeBtn.disabled = false;
      }
    });
  }

  // 3D Title Animation
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

  // Parallax Effect for Floating Elements
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

  // Smooth Scroll for "Get Started" Button
  const getStartedBtn = document.getElementById("getStartedBtn");
  if (getStartedBtn) {
    getStartedBtn.addEventListener("click", () => {
      const contentAnalysis = document.getElementById("contentAnalysis");
      if (contentAnalysis) {
        contentAnalysis.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  }
});
