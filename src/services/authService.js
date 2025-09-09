const TOKEN_KEY = "admin_auth";

export const authService = {
  saveToken(token, expiresIn = 3600) {
    const expiresAt = Date.now() + expiresIn * 1000;
    localStorage.setItem(TOKEN_KEY, JSON.stringify({ token, expiresAt }));
  },
  getAccessToken() {
    const raw = localStorage.getItem(TOKEN_KEY);
    if (!raw) return null;
    const data = JSON.parse(raw);
    if (Date.now() > data.expiresAt) {
      this.clear();
      return null;
    }
    return data.token;
  },
  clear() {
    localStorage.removeItem(TOKEN_KEY);
  },
};