import express from "express";
import axios from "axios";
import bodyParser from "body-parser";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(bodyParser.json());

const TELEGRAM_TOKEN = process.env.TELEGRAM_TOKEN;

// Webhook endpoint
app.post(`/webhook/${TELEGRAM_TOKEN}`, async (req, res) => {
    const { message } = req.body;
    if (!message || !message.text) return res.sendStatus(200);

    const chatId = message.chat.id;
    const userMessage = message.text;

    // Custom bot logic
    let reply = "";
    if (userMessage.toLowerCase().includes("hello")) {
        reply = "Hello! Welcome to TryHelpMe bot!";
    } else if (userMessage.toLowerCase().includes("/help")) {
        reply = "Available commands:\n/hello - Greet the bot\n/help - Show this message";
    } else {
        reply = "I don't understand that command yet. Try /help!";
    }

    // Send response
    await axios.post(`https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`, {
        chat_id: chatId,
        text: reply,
    });

    res.sendStatus(200);
});

app.listen(process.env.PORT, () => console.log(`Server running on port ${process.env.PORT}`));
