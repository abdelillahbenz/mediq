import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { like, or } from "drizzle-orm";

const app = express();

// Middleware
app.use(cors({
  origin: "http://localhost:3000", // React default port
}));
app.use(express.json());

// ---- DATABASE CONNECTION ----
const sqlite = new Database("./database/mediq.db");
const db = drizzle(sqlite);

// ---- TABLES ----
const users = sqliteTable("users", {
  id: integer("id").primaryKey(),
  username: text("username"),
  email: text("email"),
  password: text("password"),
});

const medicines = sqliteTable("medicines", {
  id: integer("id").primaryKey(),
  name: text("name"),
  keywords: text("keywords"),
  price: text("price"),
});

// ---- ROUTES ----

// Create user
app.post("/users", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const newUser = await db
      .insert(users)
      .values({ username, email, password })
      .returning();

    res.json(newUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all medicines
app.get("/medicines", async (req, res) => {
  try {
    const allMedicines = await db.select().from(medicines);
    res.json(allMedicines);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Search medicines
app.get("/medicines/search", async (req, res) => {
  try {
    const q = req.query.q || "";

    const results = await db
      .select()
      .from(medicines)
      .where(
        or(
          like(medicines.name, `%${q}%`),
          like(medicines.keywords, `%${q}%`)
        )
      );

    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
/*
app.get("/users", async (req, res) => {
  const allUsers = await db.select().from(users);
  res.json(allUsers);
});
*/
// ---- START SERVER ----
app.listen(5000, () => {
  console.log("Backend running on http://localhost:5000");
});
