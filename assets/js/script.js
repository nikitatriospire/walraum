//------------ Skip Link Button -----------------
document.addEventListener("DOMContentLoaded", function () {

  const skipLink = document.getElementById("skiplink");
  if (!skipLink) return;

  // 👉 Initial hidden state
  skipLink.style.transform = "translateY(-110%)";

  let shownOnce = false;

  // 👉 Show on FIRST TAB only
  document.addEventListener("keydown", function (e) {
    if (e.key === "Tab" && !shownOnce) {
      skipLink.style.transform = "translateY(0)";
      shownOnce = true;
    }
  });

  // 👉 Hide again after interaction
  function hideSkipLink() {
    skipLink.style.transform = "translateY(-110%)";
  }

  // Hide on click anywhere
  document.addEventListener("click", hideSkipLink);

  // Hide on scroll
  window.addEventListener("scroll", hideSkipLink);

  // Hide when it loses focus
  skipLink.addEventListener("blur", hideSkipLink);

});
//----------- Sticky Header -----------------
document.addEventListener("DOMContentLoaded", () => {

  const header = document.querySelector("header");
  const whiteLogo = document.querySelector(".white-logo");
  const colorLogo = document.querySelector(".color-logo");
  const navLinks = document.querySelectorAll("header ul li a");

  const SCROLL_THRESHOLD = 50;

  // 👉 Adjust this if needed
  const isHomePage = document.body.classList.contains("home");

  if (!header) return;
// ===============================
// 👉 NON-HOMEPAGE (STATIC STATE)
// ===============================
if (!isHomePage) {

  // ✅ Force white background
  header.classList.add("bg-white");
  header.classList.remove("bg-transparent");

  // Show colored logo only
  if (whiteLogo) {
    whiteLogo.classList.add("opacity-0", "invisible");
  }
  if (colorLogo) {
    colorLogo.classList.remove("opacity-0", "invisible");
  }

  // Dark nav links
  navLinks.forEach(link => {
    link.classList.remove("text-white");
    link.classList.add("text-[#111111]");
  });

  return; // 🚀 stop scroll logic
}

  // ===============================
  // 👉 HOMEPAGE SCROLL BEHAVIOR
  // ===============================
  function handleScroll() {

    const isScrolled = window.scrollY > SCROLL_THRESHOLD;

    // Header background (safe toggle)
    header.classList.toggle("bg-white", isScrolled);
    header.classList.toggle("bg-transparent", !isScrolled);

    // Logo switching
    if (whiteLogo && colorLogo) {
      whiteLogo.classList.toggle("opacity-0", isScrolled);
      whiteLogo.classList.toggle("invisible", isScrolled);

      colorLogo.classList.toggle("opacity-0", !isScrolled);
      colorLogo.classList.toggle("invisible", !isScrolled);
    }

    // Nav link colors
    navLinks.forEach(link => {
      link.classList.toggle("text-white", !isScrolled);
      link.classList.toggle("text-[#111111]", isScrolled);
    });
  }

  // Initial state
  handleScroll();

  // Scroll event
  window.addEventListener("scroll", handleScroll);

});

// MObile Menu
document.addEventListener("DOMContentLoaded", () => {
  const menuBtn = document.getElementById("menuBtn");
  const nav = document.querySelector("nav");
  const lines = document.querySelectorAll("#menuBtn .line");

  let isOpen = false;

  menuBtn.addEventListener("click", () => {
    if (isOpen) {
      nav.classList.remove("active");
      animateLines(false);
    } else {
      nav.classList.add("active");
      animateLines(true);
    }
    isOpen = !isOpen;
  });

  function animateLines(open) {
    if (open) {
      lines[0].style.transform = "translateY(6px) rotate(45deg)";
      lines[1].style.opacity = "0";
      lines[2].style.transform = "translateY(-6px) rotate(-45deg)";
    } else {
      lines[0].style.transform = "";
      lines[1].style.opacity = "1";
      lines[2].style.transform = "";
    }
  }
});
// content same height
function equalizeContent() {

  // ✅ Loop through EACH section separately
  const parents = document.querySelectorAll(".parent-equal");
  if (!parents.length) return;

  parents.forEach(parent => {

    const titles = parent.querySelectorAll(".equal-title");
    const contents = parent.querySelectorAll(".equal-content");

    // ❌ Disable below 540px
    if (window.innerWidth <= 540) {
      titles.forEach(el => el.style.height = "auto");
      contents.forEach(el => el.style.height = "auto");
      return;
    }

    let maxTitleHeight = 0;
    let maxContentHeight = 0;

    // Reset first
    titles.forEach(el => el.style.height = "auto");
    contents.forEach(el => el.style.height = "auto");

    // Calculate max heights ONLY inside this parent
    titles.forEach(el => {
      maxTitleHeight = Math.max(maxTitleHeight, el.offsetHeight);
    });

    contents.forEach(el => {
      maxContentHeight = Math.max(maxContentHeight, el.offsetHeight);
    });

    // Apply heights ONLY inside this parent
    titles.forEach(el => {
      el.style.height = maxTitleHeight + "px";
    });

    contents.forEach(el => {
      el.style.height = maxContentHeight + "px";
    });

  });
}

// Run on load
window.addEventListener("load", equalizeContent);

// Run on resize (debounced for performance)
let resizeTimer;
window.addEventListener("resize", () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(equalizeContent, 200);
});


//  page reload scroll to top
window.history.scrollRestoration = "manual";

window.onload = function () {
  window.scrollTo(0, 0);
};

window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// cardsswiper
document.addEventListener("DOMContentLoaded", function () {

  // ✅ Check if Swiper exists AND element exists
  if (typeof Swiper !== "undefined" && document.querySelector(".swiper-cards")) {

    const swiper = new Swiper(".swiper-cards", {

      loop: true,
      speed: 1000,

      autoplay: {
        delay: 2500,
        disableOnInteraction: false,
      },

      slidesPerView: 3,
      spaceBetween: 28,

      breakpoints: {
        0: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        768: {
          slidesPerView: 2,
          spaceBetween: 5
        },
        1200: {
          slidesPerView: 3,
          spaceBetween: 10
        }
      },

      navigation: {
        nextEl: document.querySelector(".swiper-button-next"),
        prevEl: document.querySelector(".swiper-button-prev"),
      },

      pagination: {
        el: document.querySelector(".swiper-pagination"),
        clickable: true,
      },

    });

  }

});

// Accordion
document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll(".accordion-item");
  if (!items.length) return;

  // 🔹 Close item
  function closeItem(item) {
    const content = item.querySelector(".accordion-content");
    const icon = item.querySelector(".icon");

    if (content) {
      content.style.maxHeight = content.scrollHeight + "px"; // set current height first
      requestAnimationFrame(() => {
        content.style.maxHeight = "0px"; // then collapse smoothly
      });
    }

    item.classList.remove("active");
    if (icon) icon.textContent = "+";
  }

  // 🔹 Open item
  function openItem(item) {
    const content = item.querySelector(".accordion-content");
    const icon = item.querySelector(".icon");

    item.classList.add("active");

    if (content) {
      content.style.maxHeight = "0px"; // reset first

      requestAnimationFrame(() => {
        content.style.maxHeight = content.scrollHeight + "px";
      });
    }

    if (icon) icon.textContent = "−";
  }

  // 🔹 Close all
  function closeAll() {
    items.forEach(item => closeItem(item));
  }

  // 🔹 Init
  items.forEach((item, index) => {
    const header = item.querySelector(".accordion-header");

    // ✅ Default open (2nd item)
    if (index === 1) {
      openItem(item);
    } else {
      const content = item.querySelector(".accordion-content");
      if (content) content.style.maxHeight = "0px";
    }

    header.addEventListener("click", () => {
      const isOpen = item.classList.contains("active");

      if (isOpen) {
        // ✅ Proper close
        closeItem(item);
      } else {
        // ✅ Close others + open this
        closeAll();
        openItem(item);
      }
    });
  });

  // 🔹 Fix on resize
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
      document.querySelectorAll(".accordion-item.active").forEach(item => {
        const content = item.querySelector(".accordion-content");
        if (content) {
          content.style.maxHeight = content.scrollHeight + "px";
        }
      });
    }, 200);
  });

});

// Active Page link
document.addEventListener("DOMContentLoaded", () => {
  const links = document.querySelectorAll("nav ul li a");
  const currentPath = window.location.pathname.replace(/\/$/, ""); // remove trailing slash

  links.forEach(link => {
    const linkUrl = new URL(link.href, window.location.origin);
    const linkPath = linkUrl.pathname.replace(/\/$/, "");

    // Exact match OR homepage case
    if (
      linkPath === currentPath ||
      (linkPath === "" && currentPath === "")
    ) {
      link.classList.add("text-green-600"); 
    } else {
      link.classList.remove("text-green-600");
    }
  });
});

// isotope gallery
   const menuBtns = document.querySelectorAll('.menu-btn');
const innerBox = document.querySelectorAll('.box-filter-flex');

let activeBtn = "Alle";

showData(activeBtn);

menuBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
        resetActiveBtn();
        showData(btn.id);
        btn.classList.add('active-btn');
    });
});

function resetActiveBtn(){
    menuBtns.forEach((btn) => {
        btn.classList.remove('active-btn');
    });
}

function showData(newMenuBtn){
    activeBtn = newMenuBtn;
    innerBox.forEach((item) => {
        if(item.classList.contains(activeBtn)){
            item.style.display = "block";
        } else {
            item.style.display = "none";
        }
    });
}


// image gallery
document.addEventListener("DOMContentLoaded", () => {

  const items = document.querySelectorAll("#gridLayout .grid-item");

  const patterns = [
    { col: 5, row: 2 },
    { col: 4, row: 2 },
    { col: 3, row: 3 },
    { col: 3, row: 2 },
    { col: 6, row: 2 },
    { col: 3, row: 1 },
    { col: 4, row: 2 },
    { col: 8, row: 2 },
    { col: 4, row: 2 },
  ];

  function applyLayout() {
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth < 1024;

    items.forEach((item, index) => {
      const pattern = patterns[index % patterns.length];

      if (isMobile) {
        // Mobile → full width
        item.style.gridColumn = "span 1";
        item.style.gridRow = "span 2";
      } 
      else if (isTablet) {
        // Tablet → simplified layout
        item.style.gridColumn = `span ${Math.min(pattern.col, 6)}`;
        item.style.gridRow = "span 2";
      } 
      else {
        // Desktop → full design
        item.style.gridColumn = `span ${pattern.col}`;
        item.style.gridRow = `span ${pattern.row}`;
      }
    });
  }

  applyLayout();
  window.addEventListener("resize", applyLayout);

});


// lightbox image slider

document.addEventListener("DOMContentLoaded", () => {

  const images = document.querySelectorAll(".gallery-img");
  const lightbox = document.getElementById("lightbox");
  const lightboxImg = document.getElementById("lightboxImg");

  const closeBtn = document.getElementById("closeLightbox");
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");

  // ✅ STOP if required elements not found
  if (!images.length || !lightbox || !lightboxImg) return;

  let currentIndex = 0;

  // =========================
  // 👉 OPEN LIGHTBOX
  // =========================
  images.forEach((img, index) => {
    img.addEventListener("click", () => {
      currentIndex = index;
      showImage();
      lightbox.classList.remove("hidden");
      lightbox.classList.add("flex");
    });
  });

  function showImage() {
    lightboxImg.src = images[currentIndex].src;
  }

  // =========================
  // 👉 NEXT
  // =========================
  if (nextBtn) {
    nextBtn.addEventListener("click", () => {
      currentIndex = (currentIndex + 1) % images.length;
      showImage();
    });
  }

  // =========================
  // 👉 PREV
  // =========================
  if (prevBtn) {
    prevBtn.addEventListener("click", () => {
      currentIndex = (currentIndex - 1 + images.length) % images.length;
      showImage();
    });
  }

  // =========================
  // 👉 CLOSE
  // =========================
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
    });
  }

  // Close on background click
  if (lightbox) {
    lightbox.addEventListener("click", (e) => {
      if (e.target === lightbox) {
        lightbox.classList.add("hidden");
        lightbox.classList.remove("flex");
      }
    });
  }

  // =========================
  // 👉 KEYBOARD SUPPORT
  // =========================
  document.addEventListener("keydown", (e) => {
    if (!lightbox || lightbox.classList.contains("hidden")) return;

    if (e.key === "Escape") {
      lightbox.classList.add("hidden");
      lightbox.classList.remove("flex");
    }

    if (e.key === "ArrowRight" && nextBtn) {
      nextBtn.click();
    }

    if (e.key === "ArrowLeft" && prevBtn) {
      prevBtn.click();
    }
  });

});



// Scroll to top btn

document.addEventListener("DOMContentLoaded", () => {

  const btn = document.getElementById("scrollTopBtn");
  if (!btn) return;

  const SCROLL_SHOW = 300;

  // =========================
  // 👉 SHOW / HIDE BUTTON
  // =========================
  window.addEventListener("scroll", () => {
    if (window.scrollY > SCROLL_SHOW) {
      btn.classList.remove("opacity-0", "invisible");
      btn.classList.add("opacity-100", "visible");
    } else {
      btn.classList.add("opacity-0", "invisible");
      btn.classList.remove("opacity-100", "visible");
    }
  });

  // =========================
  // 👉 SAFARI SAFE SCROLL
  // =========================
  function smoothScrollToTop() {

    // If browser supports smooth behavior
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Fallback for older Safari
      let scrollStep = -window.scrollY / 15;
      let scrollInterval = setInterval(() => {
        if (window.scrollY !== 0) {
          window.scrollBy(0, scrollStep);
        } else {
          clearInterval(scrollInterval);
        }
      }, 16);
    }
  }

  btn.addEventListener("click", smoothScrollToTop);

});
