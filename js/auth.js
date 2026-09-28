
// Simple "username only" session system - no password.
// Admin is recognized by one reserved secret username.
const ADMIN_USERNAME = "adminpartygamesweek"; // change this if you want a different secret

function loginWithUsername(username) {
  const clean = username.trim();
  if (!clean) {
    alert("Please type a username.");
    return false;
  }
  const isAdmin = clean.toLowerCase() === ADMIN_USERNAME.toLowerCase();
  localStorage.setItem("pgw_username", clean);
  localStorage.setItem("pgw_isAdmin", isAdmin ? "true" : "false");
  window.location.href = isAdmin ? "admin.html" : "index.html";
  return true;
}

function getCurrentUser() {
  return {
    username: localStorage.getItem("pgw_username") || null,
    isAdmin: localStorage.getItem("pgw_isAdmin") === "true"
  };
}

function logout() {
  localStorage.removeItem("pgw_username");
  localStorage.removeItem("pgw_isAdmin");
  window.location.href = "index.html";
}

function requireAdmin() {
  const user = getCurrentUser();
  if (!user.username || !user.isAdmin) {
    window.location.href = "login.html";
  }
  return user;
}
