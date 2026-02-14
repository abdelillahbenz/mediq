import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
import { drizzle } from "drizzle-orm/better-sqlite3";
import { sqliteTable, integer, text } from "drizzle-orm/sqlite-core";
import { like, or } from "drizzle-orm";

const app = express();
app.use(cors());
app.use(express.json());

// ---- CONNECT TO EXISTING DATABASE ----
const sqlite = new Database("database/mediq.db"); // <-- your DB path
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

// Save user (sign up)
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const result = await db
      .insert(users)
      .values({ username, email, password })
      .returning();
    res.json(result);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all medicines
app.get("/medicines", async (req, res) => {
  const allMedicines = await db.select().from(medicines);
  res.json(allMedicines);
});

// Search medicines
app.get("/medicines/search", async (req, res) => {
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
});

app.get("/users", async (req, res) => {
  const allUsers = await db.select().from(users);
  res.json(allUsers);
});

// ---- START SERVER ----
app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});
