/* ============================================================
   SELAMOD GUEST HOUSE
   ============================================================ */

"use strict";

// ---- Data ----
const STORAGE_KEYS = {
  USERS: "selamod_users",
  BOOKINGS: "selamod_bookings",
  ADMIN: "selamod_admin",
  ADMIN_SESSION: "selamod_admin_logged_in",
  CURRENT_USER: "selamod_user",
  MESSAGES: "selamod_messages",
  ROOMS: "selamod_rooms",
};

// Default rooms data (used if localStorage is empty)
const DEFAULT_ROOMS = [
  {
    id: "sunflower",
    title: "The Sunflower Suite",
    category: "Signature",
    price: "R450",
    priceNum: 450,
    image: "https://i.ibb.co/mFyZQRDQ/165601429.jpg",
    images: [
      "https://i.ibb.co/mFyZQRDQ/165601429.jpg",
      "https://i.ibb.co/v6HMrb60/622888285.jpg",
      "https://i.ibb.co/VczRSyQX/207090929.jpg",
      "https://i.ibb.co/gLWFrD3Q/196224013.jpg",
    ],
    description:
      "Our flagship suite offering a perfect blend of luxury and comfort. Features a private balcony with stunning valley views, a spacious living area, and premium finishes throughout.",
    bathroom: [
      "Luxury Bathtub",
      "Fresh Cotton Towels",
      "Soft Tissues",
      "Premium Toiletries (Soap, Shampoo, Lotion)",
    ],
    facilities: [
      "Smart TV",
      "Air Conditioning",
      "Electric Kettle",
      "Work Desk",
      "Microwave",
      "Spacious Closet/Wardrobe",
    ],
  },
  {
    id: "olive",
    title: "Olive Garden Villa",
    category: "Luxury",
    price: "R620",
    priceNum: 620,
    image: "https://i.ibb.co/rRnj1g24/232551023.jpg",
    images: [
      "https://i.ibb.co/rRnj1g24/232551023.jpg",
      "https://i.ibb.co/S4JF6MKZ/626363408.jpg",
      "https://i.ibb.co/7NdKb09K/622888879.jpg",
      "https://i.ibb.co/B5P5MMHw/626392395.jpg",
      "https://i.ibb.co/DP7gbyNN/626364748.jpg",
    ],
    description:
      "A secluded villa surrounded by lush greenery. Perfect for those seeking privacy and a deep connection with nature without compromising on modern amenities.",
    bathroom: [
      "Walk-in Rain Shower",
      "Plush Towels",
      "Facial Tissues",
      "Organic Toiletry Set",
    ],
    facilities: [
      "4K Smart TV",
      "Climate Control",
      "Nespresso Machine",
      "Executive Desk",
      "Microwave",
      "Built-in Wardrobe",
    ],
  },
  {
    id: "sand-dune",
    title: "Sand Dune Studio",
    category: "Minimalist",
    price: "R380",
    priceNum: 380,
    image: "https://i.ibb.co/vxMTmwWT/622887367.jpg",
    images: [
      "https://i.ibb.co/vxMTmwWT/622887367.jpg",
      "https://i.ibb.co/kst9qBXN/622889766-1.jpg",
      "https://i.ibb.co/NdRnvVBV/622890055.jpg",
      "https://i.ibb.co/5xh4dhWP/622903064.jpg",
      "https://i.ibb.co/mV6J5DPv/232551653.jpg",
    ],
    description:
      "A sleek, modern studio designed for the contemporary traveler. Minimalist aesthetics combined with maximum functionality for a seamless stay.",
    bathroom: [
      "Modern Shower",
      "Standard Towels",
      "Tissues",
      "Basic Toiletry Kit",
    ],
    facilities: [
      "LED TV",
      "Air Conditioning",
      "Standard Kettle",
      "Compact Desk",
      "Microwave",
      "Open Wardrobe System",
    ],
  },
];

// Get rooms from localStorage (or initialize)
function getRooms() {
  const stored = localStorage.getItem(STORAGE_KEYS.ROOMS);
  if (stored) return JSON.parse(stored);
  // Initialize with defaults
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
  return [...DEFAULT_ROOMS];
}

// Helper to save rooms (if needed, but mainly admin will handle)
function saveRooms(rooms) {
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
}

let roomsData = getRooms();

const activitiesData = [
  {
    title: "Sun City Resort",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M4.93 4.93l4.24 4.24M14.83 9.17l4.24-4.24M14.83 14.83l4.24 4.24M9.17 14.83l-4.24 4.24M12 2v2M12 20v2M2 12h2M20 12h2"/><circle cx="12" cy="12" r="4"/></svg>`,
    distance: "~5–8 km",
    time: "±10–15 min drive",
    note: "Super close • Easy daily trips",
    images: [
      "https://i.ibb.co/KpsDpMFk/d003e20efe0635cd4ea03cd78ad572d6.jpg",
      "https://i.ibb.co/m5sKrRL4/Sun-Central.webp",
      "https://i.ibb.co/KjNFtJrt/fefdc663959f2d1bfd0da05fd1d3e3d2.jpg",
      "https://i.ibb.co/zVPkpHsH/8c9fa7dbc6e87d9a2d83c5bf0acf7874.jpg",
      "https://i.ibb.co/6RP5HJZm/140bd336911d8ba789ed0373b77dcb4e.jpg",
      "https://i.ibb.co/zh9bbn2M/2d5b15f202ca1c6047c5729ae041a343.jpg",
    ],
    list: [
      "Valley of Waves (water park)",
      "Water sports (jet ski, parasailing)",
      "Zip 2000 (extreme zipline)",
      "Casino & nightlife",
      "Arcade games + bowling",
      "Mini golf & maze activities",
      "Movies & entertainment",
      "Crocodile park",
      "Shopping & restaurants",
    ],
  },
  {
    title: "Kgaswane Mountain Reserve",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>`,
    distance: "~35–40 km",
    time: "±40–50 min drive",
    note: "Good for a half-day trip",
    images: [
      "https://i.ibb.co/DcRgdTx/the-majesty-of-the-sterkfontei.jpg",
      "https://i.ibb.co/5xFBhGsH/download-3.webp",
      "https://i.ibb.co/TxyttX42/download-4.webp",
      "https://i.ibb.co/pvPSt3BH/OIP-8.webp",
    ],
    list: [
      "Hiking trails (all levels)",
      "Picnics & braai spots",
      "Waterfalls & viewpoints",
      "Game viewing (zebra, etc.)",
      "Camping",
      "Bird watching",
    ],
  },
  {
    title: "Magaliesberg Mountains",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M8 3l4 8 5-5 5 15H2L8 3z"/></svg>`,
    distance: "~60–65 km",
    time: "±1 hour drive",
    note: "Best for a full-day outing",
    images: [
      "https://i.ibb.co/fVmMjfTD/MHmfb-SJv5Fh-BKe-SWm-X3bzscu-Eh9-Gu-Hg6-B9-JWt2nwbyj-W3kobo-Ap-AIg4-SBhc-K4d-YRc1-Nq-P6-O5q-XDB8-Us-DBJAL4-L.jpg",
      "https://i.ibb.co/k2NG3Jbg/OIP-7.webp",
      "https://i.ibb.co/NnK3CWFF/OIP-6.webp",
      "https://i.ibb.co/rN7Qfq0/download-2.webp",
    ],
    list: [
      "Scenic cable car rides",
      "Hiking & rock climbing",
      "Hot air ballooning",
      "Canopy tours (ziplining)",
      "Picnics with panoramic views",
      "Bird watching",
      "Nature photography",
      "Abseiling",
      "Horseback riding",
    ],
  },
  {
    title: "The Kingdom Resort",
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg>`,
    distance: "~5 km",
    time: "±5–10 min drive",
    note: "Next to Sun City area",
    images: [
      "https://i.ibb.co/1GtCPJYr/74220499.jpg",
      "https://i.ibb.co/vvMVVbj6/363155495.jpg",
      "https://i.ibb.co/MyYRrf8x/363157648.jpg",
      "https://i.ibb.co/6cwNHkxk/536114089.jpg",
      "https://i.ibb.co/d0FwDNHX/380299002.jpg",
    ],
    list: [
      "Rare Game Experience",
      "Quad biking & archery",
      "Bungee catapult rides",
      "Spa treatments",
      "Swimming pools",
      "Shuttle trips to Sun City",
      "Predator World (big cats)",
    ],
  },
];

// ---- localStorage keys ----
// (same as above, but already defined)

// ---- Helper Functions ----
function getUsers() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

function saveUser(user) {
  const users = getUsers();
  users.push(user);
  localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
}

function updateUserPassword(email, newPassword) {
  const users = getUsers();
  const userIndex = users.findIndex((u) => u.email === email);
  if (userIndex !== -1) {
    users[userIndex].password = newPassword;
    localStorage.setItem(STORAGE_KEYS.USERS, JSON.stringify(users));
    return true;
  }
  return false;
}

function getUserByEmail(email) {
  const users = getUsers();
  return users.find((u) => u.email === email);
}

function getBookings() {
  const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookings ? JSON.parse(bookings) : [];
}

function saveBooking(booking) {
  const bookings = getBookings();
  bookings.push(booking);
  localStorage.setItem(STORAGE_KEYS.BOOKINGS, JSON.stringify(bookings));
}

function getMessages() {
  const messages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return messages ? JSON.parse(messages) : [];
}

function saveMessage(message) {
  const messages = getMessages();
  messages.push(message);
  localStorage.setItem(STORAGE_KEYS.MESSAGES, JSON.stringify(messages));
}

function getAdmin() {
  const admin = localStorage.getItem(STORAGE_KEYS.ADMIN);
  if (admin) return JSON.parse(admin);
  const defaultAdmin = { email: "admin@admin.com", password: "admin123" };
  localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(defaultAdmin));
  return defaultAdmin;
}

function saveAdmin(adminData) {
  localStorage.setItem(STORAGE_KEYS.ADMIN, JSON.stringify(adminData));
}

function isAdminLoggedIn() {
  return localStorage.getItem(STORAGE_KEYS.ADMIN_SESSION) === "true";
}

function saveUserToLocal(user) {
  if (user) {
    localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
  } else {
    localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
  }
}

function loadUserFromLocal() {
  const stored = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch (e) {
      return null;
    }
  }
  return null;
}

let currentUser = loadUserFromLocal();
let bookingData = null;
let currentView = "home";
let openRoom = null;
let roomModalCurrentImg = 0;
let forgotEmail = null; // store email during forgot password flow

function $(id) {
  return document.getElementById(id);
}
function smoothScroll(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  const options = { day: "numeric", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", options);
}
function calcNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 0;
  const diff = new Date(checkOut) - new Date(checkIn);
  const n = Math.ceil(diff / (1000 * 60 * 60 * 24));
  return n > 0 ? n : 0;
}
function showView(name) {
  document
    .querySelectorAll(".view")
    .forEach((v) => v.classList.remove("active"));
  $(`view-${name}`).classList.add("active");
  currentView = name;
  updateNavbar();
  window.scrollTo(0, 0);
  setTimeout(initScrollAnimations, 100);
}

// ---- Navbar ----
function updateNavbar() {
  const nav = $("navbar");
  const isHome = currentView === "home";
  const scrolled = window.scrollY > 50;
  nav.classList.toggle("scrolled", !isHome || scrolled);
  const logo = document.querySelector(".nav-logo");
  const links = document.querySelectorAll(".nav-link");
  const hbg = $("hamburger");
  const signInBtn = $("navSignInBtn");
  if (isHome && !scrolled) {
    logo.classList.add("light");
    links.forEach((l) => l.classList.add("light"));
    hbg.classList.add("light");
    signInBtn.classList.add("light");
  } else {
    logo.classList.remove("light");
    links.forEach((l) => l.classList.remove("light"));
    hbg.classList.remove("light");
    signInBtn.classList.remove("light");
  }
  updateAuthNav();
}
window.addEventListener("scroll", updateNavbar);

$("hamburger").addEventListener("click", () => {
  $("hamburger").classList.toggle("open");
  $("mobileMenu").classList.toggle("open");
});

document.querySelectorAll(".nav-link, .mobile-link").forEach((btn) => {
  btn.addEventListener("click", () => {
    const view = btn.dataset.view;
    const href = btn.dataset.href;
    if (view === "rooms") {
      showView("rooms");
    } else {
      if (currentView !== "home") {
        showView("home");
        if (href && href !== "#") {
          setTimeout(() => smoothScroll(href), 100);
        }
      } else if (href && href !== "#") {
        smoothScroll(href);
      }
    }
    $("hamburger").classList.remove("open");
    $("mobileMenu").classList.remove("open");
  });
});

$("logoBtn").addEventListener("click", () => showView("home"));
$("viewAllRoomsBtn").addEventListener("click", () => showView("rooms"));

// ---- Auth UI ----
function updateAuthNav() {
  const signInBtn = $("navSignInBtn");
  const mobileSignInBtn = $("mobileSignInBtn");
  if (currentUser) {
    const firstName = currentUser.name.split(" ")[0];
    signInBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> ${firstName}`;
    signInBtn.onclick = showUserDropdown;
    mobileSignInBtn.textContent = "Sign Out";
    mobileSignInBtn.onclick = signOut;
  } else {
    signInBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> Sign In`;
    signInBtn.onclick = openAuthModal;
    mobileSignInBtn.innerHTML = `<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg> Sign In`;
    mobileSignInBtn.onclick = openAuthModal;
  }
}
function showUserDropdown() {
  if (confirm(`Sign out as ${currentUser.name}?`)) signOut();
}
function signOut() {
  currentUser = null;
  saveUserToLocal(null);
  updateAuthNav();
  if ($("roomBackdrop") && !$("roomBackdrop").classList.contains("hidden")) {
    closeRoomModal();
  }
  if (currentView === "checkout" && !currentUser) {
    showView("home");
  }
}
$("heroBookBtn").addEventListener("click", () => {
  if (!currentUser) openAuthModal();
  else smoothScroll("#contact");
});

// ---- Auth Modal ----
let authMode = "signin";
let forgotStep = 1; // 1: email input, 2: new password

function openAuthModal() {
  authMode = "signin";
  forgotStep = 1;
  renderAuthModal();
  $("authBackdrop").classList.remove("hidden");
}
function closeAuthModal() {
  $("authBackdrop").classList.add("hidden");
}
$("authClose").addEventListener("click", closeAuthModal);
$("authBackdrop").addEventListener("click", (e) => {
  if (e.target === $("authBackdrop")) closeAuthModal();
});

function renderAuthModal() {
  const content = $("authContent");
  if (authMode === "signin") {
    content.innerHTML = `<h2>Sign In</h2><p class="auth-sub">Welcome back to your sanctuary</p>
               <form class="auth-form" id="authForm"><div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="afEmail" required placeholder="your@email.com" /></div>
               <div class="form-group"><label class="form-label">Password</label><input type="password" class="form-input" id="afPassword" required placeholder="••••••••" /></div>
               <div style="text-align:right;margin-bottom:1rem;"><button type="button" class="forgot-btn" onclick="switchAuthMode('forgot')">Forgot Password?</button></div>
               <div class="auth-error hidden" id="authError"></div><button type="submit" class="btn-sunflower btn-full" id="authSubmitBtn">Sign In</button>
               <div class="auth-toggle"><button type="button" onclick="switchAuthMode('signup')">Don't have an account? Sign Up</button></div></form>`;
  } else if (authMode === "signup") {
    content.innerHTML = `<h2>Create Account</h2><p class="auth-sub">Join the Selamod family</p>
               <form class="auth-form" id="authForm"><div style="display:grid;grid-template-columns:1fr 1fr;gap:1rem;"><div class="form-group"><label class="form-label">First Name</label><input type="text" class="form-input" id="afFirst" required /></div>
               <div class="form-group"><label class="form-label">Surname</label><input type="text" class="form-input" id="afSurname" required /></div></div>
               <div class="form-group"><label class="form-label">Phone Number</label><input type="tel" class="form-input" id="afPhone" required /></div>
               <div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="afEmail" required placeholder="your@email.com" /></div>
               <div class="form-group"><label class="form-label">Password</label><input type="password" class="form-input" id="afPassword" required placeholder="Min. 6 characters" minlength="6" /></div>
               <div class="auth-error hidden" id="authError"></div><button type="submit" class="btn-sunflower btn-full" id="authSubmitBtn">Create Account</button>
               <div class="auth-toggle"><button type="button" onclick="switchAuthMode('signin')">Already have an account? Sign In</button></div></form>`;
  } else if (authMode === "forgot") {
    if (forgotStep === 1) {
      content.innerHTML = `<h2>Reset Password</h2><p class="auth-sub">Enter your registered email</p>
               <form class="auth-form" id="authForm"><div class="form-group"><label class="form-label">Email</label><input type="email" class="form-input" id="afEmail" required placeholder="your@email.com" /></div>
               <div class="auth-error hidden" id="authError"></div><button type="submit" class="btn-sunflower btn-full" id="authSubmitBtn">Verify Email</button>
               <div class="auth-toggle"><button type="button" onclick="switchAuthMode('signin')">Back to Sign In</button></div></form>`;
    } else if (forgotStep === 2) {
      content.innerHTML = `<h2>Reset Password</h2><p class="auth-sub">Set a new password for ${forgotEmail}</p>
               <form class="auth-form" id="authForm"><div class="form-group"><label class="form-label">New Password</label><input type="password" class="form-input" id="afPassword" required placeholder="Min. 6 characters" minlength="6" /></div>
               <div class="form-group"><label class="form-label">Confirm Password</label><input type="password" class="form-input" id="afConfirm" required placeholder="Confirm new password" /></div>
               <div class="auth-error hidden" id="authError"></div><button type="submit" class="btn-sunflower btn-full" id="authSubmitBtn">Update Password</button>
               <div class="auth-toggle"><button type="button" onclick="switchAuthMode('signin')">Cancel</button></div></form>`;
    }
  }
  setTimeout(() => {
    const form = $("authForm");
    if (form) form.addEventListener("submit", handleAuthSubmit);
  }, 0);
}
window.switchAuthMode = switchAuthMode;
function switchAuthMode(mode) {
  authMode = mode;
  forgotStep = 1;
  forgotEmail = null;
  renderAuthModal();
}

function handleAuthSubmit(e) {
  e.preventDefault();
  const btn = $("authSubmitBtn");
  const errorEl = $("authError");
  btn.textContent = "Processing...";
  btn.disabled = true;
  errorEl.classList.add("hidden");

  if (authMode === "forgot") {
    if (forgotStep === 1) {
      // Step 1: verify email exists
      const email = $("afEmail").value.trim();
      if (!email) {
        errorEl.textContent = "Please enter your email.";
        errorEl.classList.remove("hidden");
        btn.textContent = "Verify Email";
        btn.disabled = false;
        return;
      }
      // Check if email exists in users (regular users only, not admin)
      const admin = getAdmin();
      if (email === admin.email) {
        errorEl.textContent =
          "Admin password cannot be reset here. Please contact support.";
        errorEl.classList.remove("hidden");
        btn.textContent = "Verify Email";
        btn.disabled = false;
        return;
      }
      const user = getUserByEmail(email);
      if (!user) {
        errorEl.textContent = "No account found with that email.";
        errorEl.classList.remove("hidden");
        btn.textContent = "Verify Email";
        btn.disabled = false;
        return;
      }
      // Email exists, proceed to step 2
      forgotEmail = email;
      forgotStep = 2;
      renderAuthModal();
      btn.textContent = "Update Password";
      btn.disabled = false;
    } else if (forgotStep === 2) {
      // Step 2: update password
      const newPwd = $("afPassword").value;
      const confirmPwd = $("afConfirm").value;
      if (!newPwd || newPwd.length < 6) {
        errorEl.textContent = "Password must be at least 6 characters.";
        errorEl.classList.remove("hidden");
        btn.textContent = "Update Password";
        btn.disabled = false;
        return;
      }
      if (newPwd !== confirmPwd) {
        errorEl.textContent = "Passwords do not match.";
        errorEl.classList.remove("hidden");
        btn.textContent = "Update Password";
        btn.disabled = false;
        return;
      }
      // Update user password
      const success = updateUserPassword(forgotEmail, newPwd);
      if (success) {
        // Show success and redirect to signin
        $(
          "authContent"
        ).innerHTML = `<div class="auth-verified"><div class="success-icon"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg></div><h3>Password Updated</h3><p>Your password has been successfully reset. You can now sign in with your new password.</p><button class="btn-charcoal btn-full" onclick="switchAuthMode('signin')">Go to Sign In</button></div>`;
      } else {
        errorEl.textContent = "Something went wrong. Please try again.";
        errorEl.classList.remove("hidden");
        btn.textContent = "Update Password";
        btn.disabled = false;
      }
    }
    return;
  }

  if (authMode === "signup") {
    const first = $("afFirst") ? $("afFirst").value.trim() : "";
    const surname = $("afSurname") ? $("afSurname").value.trim() : "";
    const phone = $("afPhone") ? $("afPhone").value.trim() : "";
    const email = $("afEmail").value.trim();
    const pwd = $("afPassword").value;
    if (!first || !surname || !phone || !email || !pwd) {
      errorEl.textContent = "All fields are required.";
      errorEl.classList.remove("hidden");
      btn.textContent = "Create Account";
      btn.disabled = false;
      return;
    }
    if (pwd.length < 6) {
      errorEl.textContent = "Password must be at least 6 characters.";
      errorEl.classList.remove("hidden");
      btn.textContent = "Create Account";
      btn.disabled = false;
      return;
    }

    // Prevent registration with admin email
    const admin = getAdmin();
    if (email === admin.email) {
      errorEl.textContent = "Cannot register with admin email.";
      errorEl.classList.remove("hidden");
      btn.textContent = "Create Account";
      btn.disabled = false;
      return;
    }

    if (getUserByEmail(email)) {
      errorEl.textContent = "Email already registered. Please sign in.";
      errorEl.classList.remove("hidden");
      btn.textContent = "Create Account";
      btn.disabled = false;
      return;
    }
    // Create user
    const newUser = {
      id: Date.now(),
      name: `${first} ${surname}`,
      email: email,
      phone: phone,
      password: pwd,
      createdAt: new Date().toISOString(),
    };
    saveUser(newUser);
    // Auto sign in
    currentUser = { name: newUser.name, email: newUser.email };
    saveUserToLocal(currentUser);
    updateAuthNav();
    closeAuthModal();
    if (
      openRoom &&
      $("roomBackdrop") &&
      !$("roomBackdrop").classList.contains("hidden")
    ) {
      renderRoomModal(openRoom);
    }
    btn.textContent = "Create Account";
    btn.disabled = false;
    return;
  }

  // Sign in
  const email = $("afEmail").value.trim();
  const pwd = $("afPassword").value;
  if (!email || !pwd) {
    errorEl.textContent = "Please enter your email and password.";
    errorEl.classList.remove("hidden");
    btn.textContent = "Sign In";
    btn.disabled = false;
    return;
  }

  // Check for admin login
  const admin = getAdmin();
  if (email === admin.email && pwd === admin.password) {
    // Admin login: set session and redirect
    localStorage.setItem(STORAGE_KEYS.ADMIN_SESSION, "true");
    window.location.href = "admin.html";
    return;
  }

  // Regular user login
  const user = getUserByEmail(email);
  if (!user || user.password !== pwd) {
    errorEl.textContent = "Invalid email or password.";
    errorEl.classList.remove("hidden");
    btn.textContent = "Sign In";
    btn.disabled = false;
    return;
  }
  currentUser = { name: user.name, email: user.email };
  saveUserToLocal(currentUser);
  updateAuthNav();
  closeAuthModal();
  if (
    openRoom &&
    $("roomBackdrop") &&
    !$("roomBackdrop").classList.contains("hidden")
  ) {
    renderRoomModal(openRoom);
  }
  btn.textContent = "Sign In";
  btn.disabled = false;
}
window.handleGoogleSignIn = function () {
  const user = { name: "Google User", email: "user@gmail.com" };
  currentUser = user;
  saveUserToLocal(user);
  updateAuthNav();
  closeAuthModal();
  if (
    openRoom &&
    $("roomBackdrop") &&
    !$("roomBackdrop").classList.contains("hidden")
  ) {
    renderRoomModal(openRoom);
  }
};

// ---- Rooms ----
function createRoomCard(room, onClick) {
  const div = document.createElement("div");
  div.className = "room-card fade-in-scroll";
  div.innerHTML = `<div class="room-card-img"><img src="${room.image}" alt="${room.title}" loading="lazy" referrerpolicy="no-referrer" /><div class="room-badge">${room.category}</div></div>
             <div class="room-card-info"><div><h3>${room.title}</h3><p>From ${room.price} / Night</p></div><div class="room-card-arrow"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></div></div>`;
  div.addEventListener("click", () => onClick(room));
  return div;
}
function renderRooms() {
  // Refresh roomsData in case it changed in another tab
  roomsData = getRooms();
  const homeGrid = $("homeRoomsGrid");
  const allGrid = $("allRoomsGrid");
  homeGrid.innerHTML = "";
  allGrid.innerHTML = "";
  roomsData.forEach((room) => {
    homeGrid.appendChild(createRoomCard(room, openRoomModal));
    allGrid.appendChild(createRoomCard(room, openRoomModal));
  });
}

// ---- Room Modal ----
function openRoomModal(room) {
  openRoom = room;
  roomModalCurrentImg = 0;
  renderRoomModal(room);
  $("roomBackdrop").classList.remove("hidden");
}
function closeRoomModal() {
  $("roomBackdrop").classList.add("hidden");
  openRoom = null;
}
$("roomClose").addEventListener("click", closeRoomModal);
$("roomBackdrop").addEventListener("click", (e) => {
  if (e.target === $("roomBackdrop")) closeRoomModal();
});

function renderRoomModal(room) {
  const slides = room.images
    .map(
      (src, i) =>
        `<div class="room-modal-slide ${
          i === 0 ? "active" : ""
        }"><img src="${src}" alt="${room.title} ${
          i + 1
        }" loading="lazy" referrerpolicy="no-referrer" /></div>`
    )
    .join("");
  const dots = room.images
    .map(
      (_, i) =>
        `<button class="gallery-dot ${
          i === 0 ? "active" : ""
        }" onclick="goToRoomImg(${i})"></button>`
    )
    .join("");
  const bathItems = room.bathroom
    .map(
      (b) =>
        `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${b}</li>`
    )
    .join("");
  const facItems = room.facilities
    .map(
      (f) =>
        `<li><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg>${f}</li>`
    )
    .join("");
  $(
    "roomModalContent"
  ).innerHTML = `<div class="room-modal-gallery" id="roomGallery">${slides}${
    room.images.length > 1
      ? `<button class="gallery-btn gallery-prev" onclick="roomImgPrev()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button><button class="gallery-btn gallery-next" onclick="roomImgNext()"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button><div class="gallery-dots">${dots}</div>`
      : ""
  }<div class="room-category-badge">${room.category}</div></div>
             <div class="room-modal-info"><h2>${
               room.title
             }</h2><p class="room-price">From ${
    room.price
  } / Night</p><div style="margin-bottom:2rem;"><p style="font-size:.875rem;color:rgba(26,26,26,.65);line-height:1.7;">${
    room.description
  }</p></div>
             <div class="amenities-cols"><div><p class="amenities-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 22H4a2 2 0 0 1-2-2v-1a3 3 0 0 1 3-3h1"/><path d="M7 22h10"/><path d="M17 22h3a2 2 0 0 0 2-2v-1a3 3 0 0 0-3-3h-1"/><rect x="9" y="10" width="6" height="10"/><circle cx="12" cy="7" r="3"/></svg> Bathroom Amenities</p><ul class="amenities-list">${bathItems}</ul></div>
             <div><p class="amenities-label"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="2" y="7" width="20" height="15" rx="2"/><polyline points="17 2 12 7 7 2"/></svg> Room Facilities</p><ul class="amenities-list">${facItems}</ul></div></div>
             <div class="booking-panel" id="roomBookPanel"><p class="amenities-label" style="margin-bottom:1rem;"><svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg> Check Availability & Cost</p>
             <div class="booking-dates"><div class="form-group"><label class="form-label">Check-In</label><input type="date" class="form-input" id="rmCheckIn" onchange="updateRoomPrice()" /></div><div class="form-group"><label class="form-label">Check-Out</label><input type="date" class="form-input" id="rmCheckOut" onchange="updateRoomPrice()" /></div></div>
             <div class="price-summary hidden" id="priceSummary"><div class="price-row"><span class="label" id="pricePerNight"></span><span class="value" id="priceSubtotal"></span></div><div class="price-total"><span class="label">Total Stay Cost</span><span class="value" id="priceTotal"></span></div></div>
             <button class="btn-charcoal btn-full" id="bookRoomBtn" onclick="handleBookRoom()">${
               currentUser ? "Book This Room" : "Sign In to Book"
             }</button></div></div>`;
  const today = new Date().toISOString().split("T")[0];
  const ciInput = $("rmCheckIn");
  const coInput = $("rmCheckOut");
  if (ciInput) ciInput.min = today;
  if (coInput) coInput.min = today;
}
function goToRoomImg(idx) {
  const slides = document.querySelectorAll("#roomGallery .room-modal-slide");
  const dots = document.querySelectorAll("#roomGallery .gallery-dot");
  slides.forEach((s, i) => s.classList.toggle("active", i === idx));
  dots.forEach((d, i) => d.classList.toggle("active", i === idx));
  roomModalCurrentImg = idx;
}
window.goToRoomImg = goToRoomImg;
function roomImgNext() {
  if (openRoom) goToRoomImg((roomModalCurrentImg + 1) % openRoom.images.length);
}
window.roomImgNext = roomImgNext;
function roomImgPrev() {
  if (openRoom)
    goToRoomImg(
      (roomModalCurrentImg - 1 + openRoom.images.length) %
        openRoom.images.length
    );
}
window.roomImgPrev = roomImgPrev;
function updateRoomPrice() {
  if (!openRoom) return;
  const ci = $("rmCheckIn") ? $("rmCheckIn").value : "";
  const co = $("rmCheckOut") ? $("rmCheckOut").value : "";
  const nights = calcNights(ci, co);
  const summary = $("priceSummary");
  if (nights > 0) {
    const total = nights * openRoom.priceNum;
    $("pricePerNight").textContent = `${openRoom.price} × ${nights} night${
      nights > 1 ? "s" : ""
    }`;
    $("priceSubtotal").textContent = `R${total}`;
    $("priceTotal").textContent = `R${total}`;
    summary.classList.remove("hidden");
  } else {
    summary.classList.add("hidden");
  }
}
window.updateRoomPrice = updateRoomPrice;
function handleBookRoom() {
  if (!currentUser) {
    closeRoomModal();
    openAuthModal();
    return;
  }
  const ci = $("rmCheckIn") ? $("rmCheckIn").value : "";
  const co = $("rmCheckOut") ? $("rmCheckOut").value : "";
  const nights = calcNights(ci, co);
  if (!ci || !co || nights <= 0) {
    alert("Please select valid check-in and check-out dates.");
    return;
  }
  bookingData = {
    roomType: openRoom.title,
    checkIn: ci,
    checkOut: co,
    nights,
    totalPrice: nights * openRoom.priceNum,
    userName: currentUser.name,
    userEmail: currentUser.email,
  };
  closeRoomModal();
  renderCheckout();
  showView("checkout");
}
window.handleBookRoom = handleBookRoom;

// ---- Checkout ----
function renderCheckout() {
  if (!bookingData) {
    showView("home");
    alert("No booking found. Please book a room first.");
    return;
  }
  $(
    "checkoutWrap"
  ).innerHTML = `<div class="checkout-inner"><div class="checkout-grid"><div><h2 class="checkout-title">Checkout</h2><p class="checkout-eyebrow">Complete your reservation</p><div class="summary-card"><h3>Stay Summary</h3><div class="summary-row"><span class="label">Room</span><span class="value">${
    bookingData.roomType
  }</span></div><div class="summary-row"><span class="label">Dates</span><span class="value">${formatDate(
    bookingData.checkIn
  )} — ${formatDate(
    bookingData.checkOut
  )}</span></div><div class="summary-row"><span class="label">Nights</span><span class="value">${
    bookingData.nights
  }</span></div><div class="summary-total"><span class="label">Total Amount</span><span class="value">R${
    bookingData.totalPrice
  }</span></div></div></div><div class="payment-card"><h3>Payment Details</h3><form id="paymentForm" onsubmit="handlePayment(event)"><div class="card-field"><div class="card-field-full form-group"><label>Card Number</label><input type="text" placeholder="1234 5678 9012 3456" maxlength="19" oninput="formatCardNum(this)" /></div><div class="form-group"><label>Name on Card</label><input type="text" placeholder="Full Name" value="${
    bookingData.userName
  }" /></div><div class="form-group"><label>Expiry</label><input type="text" placeholder="MM/YY" maxlength="5" oninput="formatExpiry(this)" /></div><div class="form-group"><label>CVC</label><input type="text" placeholder="123" maxlength="4" /></div></div><div class="checkout-actions"><button type="button" class="checkout-cancel" onclick="showView('rooms')">Cancel</button><button type="submit" class="checkout-pay" id="payBtn">Pay R${
    bookingData.totalPrice
  }</button></div></form><div class="checkout-brands"><img src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg" alt="Visa" /><img src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg" alt="Mastercard" /><img src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" alt="PayPal" /></div></div></div></div>`;
}
function handlePayment(e) {
  e.preventDefault();
  const btn = $("payBtn");
  btn.textContent = "Processing...";
  btn.disabled = true;
  // Save booking to localStorage
  const newBooking = {
    id: Date.now(),
    roomType: bookingData.roomType,
    checkIn: bookingData.checkIn,
    checkOut: bookingData.checkOut,
    nights: bookingData.nights,
    totalPrice: bookingData.totalPrice,
    userName: bookingData.userName,
    userEmail: bookingData.userEmail,
    bookingDate: new Date().toISOString(),
  };
  saveBooking(newBooking);
  setTimeout(() => {
    $(
      "checkoutWrap"
    ).innerHTML = `<div class="checkout-success"><div class="checkout-success-card"><div class="checkout-success-icon"><svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polyline points="20 6 9 17 4 12"/></svg></div><h2>Payment Successful</h2><p>Your stay at <strong>${bookingData.roomType}</strong> has been confirmed. A confirmation email has been sent to your inbox.</p><button class="btn-charcoal btn-full" onclick="showView('home')">Return to Home</button></div></div>`;
    bookingData = null;
  }, 1500);
}
window.handlePayment = handlePayment;
function formatCardNum(el) {
  el.value = el.value
    .replace(/\D/g, "")
    .replace(/(.{4})/g, "$1 ")
    .trim()
    .slice(0, 19);
}
window.formatCardNum = formatCardNum;
function formatExpiry(el) {
  let v = el.value.replace(/\D/g, "");
  if (v.length >= 2) v = v.slice(0, 2) + "/" + v.slice(2);
  el.value = v.slice(0, 5);
}
window.formatExpiry = formatExpiry;

// ---- Activities ----
function renderActivities() {
  const grid = $("activitiesGrid");
  grid.innerHTML = "";
  activitiesData.forEach((act) => {
    const block = document.createElement("div");
    block.className = "activity-block fade-in-scroll";
    const slides = act.images
      .map(
        (src, i) =>
          `<div class="activity-slide ${
            i === 0 ? "active" : ""
          }"><img src="${src}" alt="${
            act.title
          }" loading="lazy" referrerpolicy="no-referrer" /></div>`
      )
      .join("");
    const dots = act.images
      .map(
        (_, i) => `<div class="slider-dot ${i === 0 ? "active" : ""}"></div>`
      )
      .join("");
    const listItems = act.list
      .map(
        (item) =>
          `<div class="activity-item"><div class="activity-dot"></div>${item}</div>`
      )
      .join("");
    const id = "act-" + act.title.replace(/\s+/g, "-").toLowerCase();
    block.innerHTML = `<div class="activity-slider" id="${id}">${slides}<div class="activity-gradient"></div><div class="activity-info"><div class="activity-title-row">${
      act.icon
    }<h3 class="activity-name">${
      act.title
    }</h3></div><div class="activity-meta"><div class="activity-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>${
      act.distance
    }</div><div class="activity-badge"><svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>${
      act.time
    }</div></div>${
      act.note ? `<div class="activity-note">${act.note}</div>` : ""
    }</div><button class="slider-arrow slider-prev" data-slider="${id}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg></button><button class="slider-arrow slider-next" data-slider="${id}"><svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg></button><div class="slider-dots">${dots}</div></div><div class="activity-list">${listItems}</div>`;
    grid.appendChild(block);
    let current = 0;
    const totalSlides = act.images.length;
    function goTo(idx) {
      current = (idx + totalSlides) % totalSlides;
      block
        .querySelectorAll(".activity-slide")
        .forEach((s, i) => s.classList.toggle("active", i === current));
      block
        .querySelectorAll(".slider-dot")
        .forEach((d, i) => d.classList.toggle("active", i === current));
    }
    block.querySelector(".slider-prev").addEventListener("click", (e) => {
      e.stopPropagation();
      goTo(current - 1);
    });
    block.querySelector(".slider-next").addEventListener("click", (e) => {
      e.stopPropagation();
      goTo(current + 1);
    });
    setInterval(() => goTo(current + 1), 5000);
  });
}

// ---- Contact Form ----
window.resetContactForm = function () {
  $("contactSuccess").classList.add("hidden");
  $("contactForm").classList.remove("hidden");
};
$("contactForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const btn = e.target.querySelector("button[type=submit]");
  const name = $("cfName").value.trim();
  const email = $("cfEmail").value.trim();
  const message = $("cfMessage").value.trim();
  if (!name || !email || !message) {
    alert("Please fill in all fields.");
    return;
  }
  btn.textContent = "Sending...";
  btn.disabled = true;
  // Save message to localStorage
  const msgObj = {
    id: Date.now(),
    name: name,
    email: email,
    message: message,
    date: new Date().toISOString(),
  };
  saveMessage(msgObj);
  setTimeout(() => {
    $("contactForm").classList.add("hidden");
    $("contactSuccess").classList.remove("hidden");
    btn.textContent = "Send Inquiry";
    btn.disabled = false;
  }, 800);
});

// ---- Scroll Animations ----
function initScrollAnimations() {
  const els = document.querySelectorAll(".fade-in-scroll");
  if (!("IntersectionObserver" in window)) {
    els.forEach((el) => el.classList.add("visible"));
    return;
  }
  const obs = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          obs.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "-80px" }
  );
  els.forEach((el) => {
    if (!el.classList.contains("visible")) obs.observe(el);
  });
}

// ---- Init ----
function init() {
  const storedUser = loadUserFromLocal();
  if (storedUser) currentUser = storedUser;
  renderRooms();
  renderActivities();
  updateNavbar();
  updateAuthNav();
  initScrollAnimations();
}
document.addEventListener("DOMContentLoaded", init);
