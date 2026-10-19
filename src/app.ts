import express from "express";
import { routes } from "./routes/index.js";

export const app = express();

app.use(express.json());

app.get("/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use(routes);
