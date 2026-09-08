
import express from "express";
import OpenAI from "openai";

const app = express();
const port = process.env.PORT || 10000;

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

app.use(express.json());
app.use(express.static("."));

app.post("/api/chat", async (req, res) => {
  try {
    const message = req.body.message;

    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Pesan tidak valid" });
    }

    const response = await client.responses.create({
      model: "gpt-5",
      instructions: "Kamu adalah AI assistant yang ramah. Jawab dalam bahasa Indonesia dengan jelas.",
      input: message
    });

    res.json({ reply: response.output_text });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Gagal menghubungi AI" });
  }
});

app.listen(port, "0.0.0.0", () => {
  console.log(`AI Chat berjalan di port ${port}`);
});
