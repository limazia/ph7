import { CorsOptions } from "cors";

export const corsConfig: CorsOptions = {
  origin: "*", // Permite todas as origens
  methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: false,
};

// Para produção, origin: ["http://localhost:3000", "https://yourdomain.com"]