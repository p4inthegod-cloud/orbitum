export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const { chat_id, text, parse_mode = "HTML" } = req.body || {};
  const token = process.env.BOT_TOKEN;

  if (!token) {
    return res.status(500).json({ error: "BOT_TOKEN is missing" });
  }

  if (!chat_id || !text) {
    return res.status(400).json({ error: "chat_id and text are required" });
  }

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id, text, parse_mode })
    });

    const data = await telegramRes.json();
    return res.status(telegramRes.ok ? 200 : 400).json(data);
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unknown error" });
  }
}
