// ==================== ADMIN SIDE CONFIG ====================
const STORAGE_KEYS = {
  USERS: "selamod_users",
  BOOKINGS: "selamod_bookings",
  ADMIN: "selamod_admin",
  ADMIN_SESSION: "selamod_admin_logged_in",
  MESSAGES: "selamod_messages",
  ROOMS: "selamod_rooms",
};

// Default rooms data
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

// Helper functions for rooms
function getRooms() {
  const rooms = localStorage.getItem(STORAGE_KEYS.ROOMS);
  if (rooms) return JSON.parse(rooms);
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(DEFAULT_ROOMS));
  return [...DEFAULT_ROOMS];
}

function saveRooms(rooms) {
  localStorage.setItem(STORAGE_KEYS.ROOMS, JSON.stringify(rooms));
}

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

function checkAdminAuth() {
  if (!isAdminLoggedIn()) {
    window.location.href = "index.html";
    return false;
  }
  return true;
}

function formatMessageDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr);
  const options = { day: "numeric", month: "short", year: "numeric" };
  return d.toLocaleDateString("en-GB", options);
}

function renderBookings() {
  const bookings = getBookings();
  const tbody = document.getElementById("bookingsTableBody");
  const totalBookingsSpan = document.getElementById("totalBookings");
  const totalRevenueSpan = document.getElementById("totalRevenue");

  if (!bookings.length) {
    tbody.innerHTML =
      '<tr><td colspan="5" class="empty-state">No bookings yet.</td></tr>';
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

function renderUsers() {
  const users = getUsers();
  const tbody = document.getElementById("usersTableBody");
  const totalUsersSpan = document.getElementById("totalUsers");

  if (!users.length) {
    tbody.innerHTML =
      '<tr><td colspan="3" class="empty-state">No registered users yet.</td></tr>';
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

function renderMessages() {
  const messages = getMessages();
  const tbody = document.getElementById("messagesTableBody");
  const totalMessagesSpan = document.getElementById("totalMessages");

  if (!messages.length) {
    tbody.innerHTML =
      '<tr><td colspan="4" class="empty-state">No messages yet.</td></tr>';
    totalMessagesSpan.innerText = "0";
    return;
  }

  const rows = messages
    .sort((a, b) => new Date(b.date) - new Date(a.date))
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

function loadAdminSettings() {
  const admin = getAdmin();
  document.getElementById("adminEmail").value = admin.email;
}

function updateAdminCredentials(email, newPassword) {
  const admin = getAdmin();
  const updatedAdmin = {
    email: email,
    password: newPassword || admin.password,
  };
  saveAdmin(updatedAdmin);
  document.getElementById("adminEmailDisplay").innerText = email;

  const alertDiv = document.getElementById("settingsAlert");
  alertDiv.innerHTML =
    '<div class="alert alert-success">Admin credentials updated successfully!</div>';
  setTimeout(() => {
    alertDiv.innerHTML = "";
  }, 3000);
  return true;
}

function adminLogout() {
  localStorage.removeItem(STORAGE_KEYS.ADMIN_SESSION);
  window.location.href = "index.html";
}

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
      if (target === "rooms") renderRoomsList();
    });
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return str.replace(/[&<>]/g, function (m) {
    if (m === "&") return "&amp;";
    if (m === "<") return "&lt;";
    if (m === ">") return "&gt;";
    return m;
  });
}

// ==================== IMAGE COMPRESSION ====================
function compressImage(
  file,
  maxSizeMB = 0.5,
  maxWidth = 1200,
  maxHeight = 1200
) {
  return new Promise((resolve, reject) => {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) {
      reject(new Error("Unsupported image type"));
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        let width = img.width;
        let height = img.height;
        let quality = 0.85;

        if (width > maxWidth || height > maxHeight) {
          const ratio = Math.min(maxWidth / width, maxHeight / height);
          width = Math.floor(width * ratio);
          height = Math.floor(height * ratio);
        }

        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        ctx.drawImage(img, 0, 0, width, height);

        // Start with high quality, reduce until file size is within limit
        const maxBytes = maxSizeMB * 1024 * 1024;
        let attempt = 0;
        const tryCompression = (q) => {
          canvas.toBlob(
            (blob) => {
              if (blob.size <= maxBytes || q <= 0.3) {
                // Final result
                const finalReader = new FileReader();
                finalReader.onload = () => resolve(finalReader.result);
                finalReader.onerror = reject;
                finalReader.readAsDataURL(blob);
              } else {
                // Try lower quality
                tryCompression(q - 0.05);
              }
            },
            file.type,
            q
          );
        };
        tryCompression(quality);
      };
      img.onerror = reject;
      img.src = e.target.result;
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ==================== ROOMS MANAGEMENT ====================
let currentEditingRoomId = null;
let tempImageFiles = [];

function renderRoomsList() {
  const rooms = getRooms();
  const container = document.getElementById("roomsListContainer");
  if (!container) return;

  if (!rooms.length) {
    container.innerHTML =
      '<div class="empty-state">No rooms yet. Click "Add New Room" to create one.</div>';
    return;
  }

  const html = rooms
    .map(
      (room) => `
    <div class="room-item" data-room-id="${room.id}">
      <div class="room-item-image">
        <img src="${room.image || room.images[0] || ""}" alt="${
        room.title
      }" loading="lazy">
      </div>
      <div class="room-item-info">
        <h4>${escapeHtml(room.title)}</h4>
        <div class="room-category">${escapeHtml(room.category)}</div>
        <div class="room-price">${room.price} / night</div>
      </div>
      <div class="room-item-actions">
        <button class="edit-room" data-id="${room.id}">Edit</button>
        <button class="delete-room" data-id="${room.id}">Delete</button>
      </div>
    </div>
  `
    )
    .join("");

  container.innerHTML = html;

  document.querySelectorAll(".edit-room").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      openRoomModalForEdit(id);
    });
  });

  document.querySelectorAll(".delete-room").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const id = btn.getAttribute("data-id");
      if (
        confirm(
          "Are you sure you want to delete this room? This action cannot be undone."
        )
      ) {
        deleteRoomById(id);
      }
    });
  });
}

function deleteRoomById(id) {
  const rooms = getRooms();
  const updatedRooms = rooms.filter((r) => r.id !== id);
  saveRooms(updatedRooms);
  renderRoomsList();
}

function openRoomModalForEdit(id) {
  const rooms = getRooms();
  const room = rooms.find((r) => r.id === id);
  if (room) {
    currentEditingRoomId = id;
    fillRoomForm(room);
  } else {
    currentEditingRoomId = null;
    fillRoomForm(null);
  }
  document.getElementById("roomModalOverlay").classList.remove("hidden");
  document.getElementById("roomModalTitle").innerText = currentEditingRoomId
    ? "Edit Room"
    : "Add New Room";
}

function fillRoomForm(room) {
  if (room) {
    document.getElementById("roomTitle").value = room.title || "";
    document.getElementById("roomCategory").value = room.category || "";
    document.getElementById("roomPriceNum").value = room.priceNum || "";
    document.getElementById("roomDescription").value = room.description || "";
    document.getElementById("roomBathroom").value = (room.bathroom || []).join(
      "\n"
    );
    document.getElementById("roomFacilities").value = (
      room.facilities || []
    ).join("\n");
    tempImageFiles = [...(room.images || [])];
    renderImagePreviews();
  } else {
    document.getElementById("roomTitle").value = "";
    document.getElementById("roomCategory").value = "";
    document.getElementById("roomPriceNum").value = "";
    document.getElementById("roomDescription").value = "";
    document.getElementById("roomBathroom").value = "";
    document.getElementById("roomFacilities").value = "";
    tempImageFiles = [];
    renderImagePreviews();
  }
}

function renderImagePreviews() {
  const container = document.getElementById("imagesPreviewContainer");
  if (!container) return;
  if (tempImageFiles.length === 0) {
    container.innerHTML =
      '<div class="empty-state" style="padding:1rem; font-size:0.8rem;">No images added yet.</div>';
    return;
  }
  const html = tempImageFiles
    .map(
      (img, idx) => `
    <div class="image-preview-item">
      <img src="${img}" alt="Preview ${idx + 1}" loading="lazy">
      <button type="button" class="remove-img" data-idx="${idx}">&times;</button>
    </div>
  `
    )
    .join("");
  container.innerHTML = html;
  container.querySelectorAll(".remove-img").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      const idx = parseInt(btn.getAttribute("data-idx"), 10);
      tempImageFiles.splice(idx, 1);
      renderImagePreviews();
    });
  });
}

async function handleImageFiles(files) {
  const compressionPromises = Array.from(files).map(async (file) => {
    if (!file.type.match(/image\/(jpeg|png|webp)/)) return null;
    try {
      return await compressImage(file);
    } catch (err) {
      console.warn("Image compression failed:", err);
      // Fallback: read as base64 without compression
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (e) => resolve(e.target.result);
        reader.readAsDataURL(file);
      });
    }
  });
  const compressed = await Promise.all(compressionPromises);
  compressed.forEach((base64) => {
    if (base64) tempImageFiles.push(base64);
  });
  renderImagePreviews();
}

function saveRoomFromForm() {
  const title = document.getElementById("roomTitle").value.trim();
  const category = document.getElementById("roomCategory").value.trim();
  const priceNum = parseFloat(document.getElementById("roomPriceNum").value);
  const description = document.getElementById("roomDescription").value.trim();
  const bathroomText = document.getElementById("roomBathroom").value;
  const facilitiesText = document.getElementById("roomFacilities").value;

  if (!title || !category || isNaN(priceNum) || priceNum <= 0 || !description) {
    alert(
      "Please fill in all required fields (Title, Category, Price, Description)."
    );
    return false;
  }

  const bathroom = bathroomText
    .split("\n")
    .filter((line) => line.trim() !== "");
  const facilities = facilitiesText
    .split("\n")
    .filter((line) => line.trim() !== "");
  const images = [...tempImageFiles];
  if (images.length === 0) {
    alert("Please add at least one image for the room.");
    return false;
  }

  const rooms = getRooms();
  const roomId =
    currentEditingRoomId ||
    title.toLowerCase().replace(/\s+/g, "-") + "-" + Date.now();

  const newRoom = {
    id: roomId,
    title: title,
    category: category,
    price: `R${priceNum}`,
    priceNum: priceNum,
    image: images[0],
    images: images,
    description: description,
    bathroom: bathroom,
    facilities: facilities,
  };

  if (currentEditingRoomId) {
    const index = rooms.findIndex((r) => r.id === currentEditingRoomId);
    if (index !== -1) {
      rooms[index] = newRoom;
    }
  } else {
    rooms.push(newRoom);
  }

  saveRooms(rooms);
  return true;
}

function initRoomManagement() {
  const addBtn = document.getElementById("addNewRoomBtn");
  if (addBtn) {
    addBtn.addEventListener("click", () => {
      currentEditingRoomId = null;
      fillRoomForm(null);
      document.getElementById("roomModalOverlay").classList.remove("hidden");
      document.getElementById("roomModalTitle").innerText = "Add New Room";
    });
  }

  const closeBtn = document.getElementById("closeRoomModalBtn");
  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      document.getElementById("roomModalOverlay").classList.add("hidden");
    });
  }

  const cancelBtn = document.getElementById("cancelRoomBtn");
  if (cancelBtn) {
    cancelBtn.addEventListener("click", () => {
      document.getElementById("roomModalOverlay").classList.add("hidden");
    });
  }

  const overlay = document.getElementById("roomModalOverlay");
  if (overlay) {
    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) {
        overlay.classList.add("hidden");
      }
    });
  }

  const fileInput = document.getElementById("roomImagesInput");
  if (fileInput) {
    fileInput.addEventListener("change", (e) => {
      if (e.target.files.length) {
        handleImageFiles(e.target.files);
      }
      fileInput.value = "";
    });
  }

  const roomForm = document.getElementById("roomForm");
  if (roomForm) {
    roomForm.addEventListener("submit", (e) => {
      e.preventDefault();
      if (saveRoomFromForm()) {
        document.getElementById("roomModalOverlay").classList.add("hidden");
        renderRoomsList();
      }
    });
  }
}

// ==================== INITIALIZE ====================
function initAdminPanel() {
  if (!checkAdminAuth()) return;

  const admin = getAdmin();
  document.getElementById("adminEmailDisplay").innerText = admin.email;

  renderBookings();
  renderUsers();
  renderMessages();
  renderRoomsList();
  loadAdminSettings();
  initTabs();
  initRoomManagement();

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
