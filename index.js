const { Client, GatewayIntentBits } = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ]
});

client.on("ready", () => {
  console.log(`Logged in as ${client.user.tag}`);
});

client.on("messageCreate", (message) => {
  if (message.author.bot) return;

  const msg = message.content;

  // السلام
  if (msg === "السلام عليكم") {
    message.reply("وعليكم السلام ورحمة الله وبركاته 🤍");
  }

  // باك
  if (msg === "باك") {
    message.reply("ولكم باك 😄 طولت علينا!");
  }

  // تست
  if (msg === "تست") {
    message.reply("ها +");
  }

  // نقطة
  if (msg === "نقطة") {
    message.reply("أحلا من ينقط 😎");
  }
});

client.login(process.env.DISCORD_TOKEN);
