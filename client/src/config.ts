export const config = {
  apiBaseUrl:
    import.meta.env.VITE_BACKEND_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://sasyam-p58h.vercel.app" // Vercel backend URL
      : "http://localhost:5000"), // Local development URL
};
