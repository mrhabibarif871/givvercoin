const express = require('express');
const connectDB = require('./config/db');
const path = require('path');
const config = require('config');
const TelegramBot = require('node-telegram-bot-api');

// Load environment variables
const mongoURI = config.get('mongoURI');
const jwtSecret = config.get('jwtSecret');
const token = '8172381970:AAGwpA28tmQIcq-1RlES3cSDGU4vXvIX7iw'; // Your bot token

const bot = new TelegramBot(token, { polling: true });

// Connect to MongoDB
connectDB();

const app = express();
app.use(express.json());

// Define your API routes here
app.use('/api/users', require('./routes/api/users'));
app.use('/api/profile', require('./routes/api/profile'));
app.use('/api/auth', require('./routes/api/auth'));

// Remove static frontend serving (since it's not needed)
app.get('/', (req, res) => {
  res.send('API is running. Telegram Bot backend is live!');
});

// Telegram bot logic
bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Welcome to Givver Coin Bot!");
});

// Add your other bot commands here...

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => console.log(Server started on port ${PORT}));
