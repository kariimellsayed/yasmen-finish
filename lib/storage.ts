// lib/storage.ts

export const storage = {
  // Set the token in localStorage
  setToken(token: string) {
    localStorage.setItem("yasmeen-token", token);
  },

  // Get the token from localStorage
  getToken(): string | null {
    return localStorage.getItem("yasmeen-token");
  },

  // Remove the token from localStorage
  removeToken() {
    localStorage.removeItem("yasmeen-token");
  },

  // Set the role in localStorage
  setRole(role: string) {
    localStorage.setItem("yasmeen-role", role);
  },

  // Get the role from localStorage
  getRole(): string | null {
    return localStorage.getItem("yasmeen-role");
  },

  // Remove the role from localStorage
  removeRole() {
    localStorage.removeItem("yasmeen-role");
  },

  // Clear all storage
  clear() {
    localStorage.clear();
  },
};
