const express = require("express");
const fs = require("fs");

const app = express();
app.use(express.json());

// ======================
// BLUE v3 STATE
// ======================
const BLUE = {
  version: "BLUE_v3",
  mode: "HYBRID_MEMORY_DB",
  identity_system: true,
  memory: "ACTIVE",
  database: "JSON_DB"
};

// ======================
// SIMPLE JSON DATABASE
// ======================
const DB_FILE = "./blue_db.json";

function loadDB() {
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify({ users: {}, logs: [] }, null, 2));
  }
  return JSON.parse(fs.readFileSync(DB_FILE));
}

function saveDB(db) {
  fs.writeFileSync(DB_FILE, JSON.stringify(db, null, 2));
}

// ======================
// IDENTITY SYSTEM
// ======================
function getUser(db, userId) {
  if (!db.users[userId]) {
    db.users[userId] = {
      user_id: userId,
      created_at: new Date().toISOString(),
      memory: [],
      preferences: {}
    };
  }
  return db.users[userId];
}

// ======================
// MEMORY ENGINE
// ======================
function saveMemory(user, input, output) {
  user.memory.push({
    input,
    output,
    time: new Date().toISOString()
  });

  // limit memory size
  if (user.memory.length > 50) user.memory.shift();
}

// ======================
// AI CORE (SIMPLIFIED)
// ======================
function brain(input, user) {
  const lastMemory = user.memory.slice(-3);

  return {
    response: `BLUE v3 response to "${input}"`,
    context: {
      user_id: user.user_id,
      memory_hint: lastMemory
    }
  };
}

// ======================
// MAIN ENGINE
// ======================
app.post("/blue", (req, res) => {
  const { user_id, input } = req.body;

  const db = loadDB();
  const user = getUser(db, user_id || "guest");

  const result = brain(input, user);

  saveMemory(user, input, result.response);

  db.users[user.user_id] = user;
  db.logs.push({
    user_id: user.user_id,
    input,
    output: result.response,
    time: new Date().toISOString()
  });

  saveDB(db);

  res.json({
    system: BLUE,
    result,
    identity: user.user_id
  });
});

// ======================
app.get("/", (req, res) => {
  res.send("🔷 BLUE v3 MEMORY + DB + IDENTITY ACTIVE");
});

app.listen(3000, () => {
  console.log("BLUE v3 RUNNING ON PORT 3000");
});
