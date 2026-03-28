// ==================== ADMIN SIDE CONFIG ====================
const STORAGE_KEYS = {
  USERS: "selamod_users",
  BOOKINGS: "selamod_bookings",
  ADMIN: "selamod_admin",
  ADMIN_SESSION: "selamod_admin_logged_in",
  MESSAGES: "selamod_messages",
};

// Helper functions
function getUsers() {
  const users = localStorage.getItem(STORAGE_KEYS.USERS);
  return users ? JSON.parse(users) : [];
}

function getBookings() {
  const bookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
  return bookings ? JSON.parse(bookings) : [];
}

function getMessages() {
  const messages = localStorage.getItem(STORAGE_KEYS.MESSAGES);
  return messages ? JSON.parse(messages) : [];
}

function getAdmin() {
  const admin = localStorage.getItem(STORAGE_KEYS.ADMIN);
  if (admin) return JSON.parse(admin);
  // Default admin credentials
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

// Redirect to index if not logged in
function checkAdminAuth() {
  if (!isAdminLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

// Format date as "DD MMM YYYY"
function formatMessageDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", options);
}

// Render Bookings Table
function renderBookings() {
  const bookings = getBookings();
  const tbody = document.getElementById("bookingsTableBody");
  const totalBookingsSpan = document.getElementById("totalBookings");
  const totalRevenueSpan = document.getElementById("totalRevenue");

  if (!bookings.length) {
    tbody.innerHTML =
      '<td colspan="5" class="empty-state">No bookings yet. </td> </tr>';
    totalBookingsSpan.innerText = "0";
    totalRevenueSpan.innerText = "0";
    return;
  }

  let totalRevenue = 0;
  const rows = bookings
    .map((booking) => {
      totalRevenue += booking.totalPrice || 0;
      return `<tr>
           <td>${escapeHtml(booking.userName || "Guest")}</td>
           <td>${escapeHtml(booking.roomType || "—")}</td>
           <td>${booking.checkIn || "—"}</td>
           <td>${booking.checkOut || "—"}</td>
           <td><strong>R${booking.totalPrice || 0}</strong></td>
         </tr>`;
    })
    .join("");

  tbody.innerHTML = rows;
  totalBookingsSpan.innerText = bookings.length;
  totalRevenueSpan.innerText = `R${totalRevenue.toLocaleString()}`;
}

// Render Users Table
function renderUsers() {
  const users = getUsers();
  const tbody = document.getElementById("usersTableBody");
  const totalUsersSpan = document.getElementById("totalUsers");

  if (!users.length) {
    tbody.innerHTML =
      '<td colspan="3" class="empty-state">No registered users yet.</td> </tr>';
    totalUsersSpan.innerText = "0";
    return;
  }

  const rows = users
    .map((user) => {
      return `<tr>
           <td>${escapeHtml(user.name || "—")}</td>
           <td>${escapeHtml(user.email || "—")}</td>
           <td>${escapeHtml(user.phone || "—")}</td>
         </tr>`;
    })
    .join("");

  tbody.innerHTML = rows;
  totalUsersSpan.innerText = users.length;
}

// Render Messages Table
function renderMessages() {
  const messages = getMessages();
  const tbody = document.getElementById("messagesTableBody");
  const totalMessagesSpan = document.getElementById("totalMessages");

  if (!messages.length) {
    tbody.innerHTML =
      '<td colspan="4" class="empty-state">No messages yet.</td> </tr>';
    totalMessagesSpan.innerText = "0";
    return;
  }

  const rows = messages
    .sort((a, b) => new Date(b.date) - new Date(a.date)) // newest first
    .map((msg) => {
      const formattedDate = formatMessageDate(msg.date);
      return `<tr>
           <td>${escapeHtml(msg.name)}</td>
           <td>${escapeHtml(msg.email)}</td>
           <td>${escapeHtml(msg.message)}</td>
           <td>${formattedDate}</td>
         </tr>`;
    })
    .join("");

  tbody.innerHTML = rows;
  totalMessagesSpan.innerText = messages.length;
}

// Load admin email into settings form
function loadAdminSettings() {
  const admin = getAdmin();
  document.getElementById("adminEmail").value = admin.email;
}

// Update admin credentials
function updateAdminCredentials(email, newPassword) {
  const admin = getAdmin();
  const updatedAdmin = {
    email: email,
    password: newPassword || admin.password,
  };
  saveAdmin(updatedAdmin);

  // Update session display
  document.getElementById("adminEmailDisplay").innerText = email;

  // Show success message
  const alertDiv = document.getElementById("settingsAlert");
  alertDiv.innerHTML =
    '<div class="alert alert-success">Admin credentials updated successfully!</div>';
  setTimeout(() => {
    alertDiv.innerHTML = "";
  }, 3000);
  return true;
}

// Logout
function adminLogout() {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  window.location.href = "index.html";
}

// Tab switching
function initTabs() {
  const tabs = document.querySelectorAll(".tab-btn");
  const panels = document.querySelectorAll(".tab-panel");

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const target = tab.getAttribute("data-tab");
      tabs.forEach((t) => t.classList.remove("active"));
      tab.classList.add("active");
      panels.forEach((panel) => panel.classList.remove("active"));
      document.getElementById(`tab-${target}`).classList.add("active");
      if (target === "bookings") renderBookings();
      if (target === "users") renderUsers();
      if (target === "messages") renderMessages();
    });
  });
}

// Helper to escape HTML
function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

// Initialize admin panel
function initAdminPanel() {
  if (!checkAdminAuth()) return;

  const admin = getAdmin();
  document.getElementById("adminEmailDisplay").innerText = admin.email;

  renderBookings();
  renderUsers();
  renderMessages();
  loadAdminSettings();
  initTabs();

  document
    .getElementById("adminLogoutBtn")
    .addEventListener("click", adminLogout);

  const settingsForm = document.getElementById("adminSettingsForm");
  settingsForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("adminEmail").value.trim();
    const password = document.getElementById("adminPassword").value;
    const confirm = document.getElementById("adminConfirmPassword").value;

    if (!email) {
      document.getElementById("settingsAlert").innerHTML =
        '<div class="alert alert-error">Email is required.</div>';
      setTimeout(
        () => (document.getElementById("settingsAlert").innerHTML = ""),
        2000
      );
      return;
    }
    if (password && password !== confirm) {
      document.getElementById("settingsAlert").innerHTML =
        '<div class="alert alert-error">Passwords do not match.</div>';
      setTimeout(
        () => (document.getElementById("settingsAlert").innerHTML = ""),
        2000
      );
      return;
    }
    updateAdminCredentials(email, password);
    document.getElementById("adminPassword").value = "";
    document.getElementById("adminConfirmPassword").value = "";
  });
}

initAdminPanel();
