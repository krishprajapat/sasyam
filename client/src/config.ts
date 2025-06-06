export const config = {
  apiBaseUrl:
    import.meta.env.VITE_BACKEND_URL ||
    (process.env.NODE_ENV === "production"
      ? "https://sasyamrita-backend.onrender.com"
      : "http://localhost:5000"),
};
