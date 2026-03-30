import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

const TOKEN = process.env.BOT_TOKEN;

app.post("/send", async (req, res) => {
  const { chat_id, text, parse_mode } = req.body;

  try {
    const response = await fetch(`https://api.telegram.org/bot${TOKEN}/sendMessage`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id,
        text,
        parse_mode: parse_mode || "HTML",
      }),
    });

    const data = await response.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use(express.static("public"));

app.listen(3000, () => {
  console.log("Server running on http://localhost:3000");
});