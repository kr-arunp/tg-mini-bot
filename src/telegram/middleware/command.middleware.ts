import { Composer, Markup } from "telegraf";
import { INFO_MSG } from "../replies";
import { generate_wallets_reply } from "../utils/generateWallets";

const bot = new Composer();

bot.command('start', async (ctx) => {
  const botList = [
    { name: '@Zefris_bot', users: 1 },
  ];

  let message = '👋 Welcome to Web3 Bot Home (Testnet)\n\n';

  botList.forEach((bot, index) => {
    message += `#${index + 1} ➡️ ${bot.name} 👥 (${bot.users})\n`;
  });

  message += '\n🔔 Join our Telegram Channel: @Zefris_bot\n\n';
  message += 'on all bots, we suggest you to generate 10 new ones and use the ';
  message += 'wallet #1 for bot #1, the wallet #2 for bot #2 etc...\n\n';
  message += `🕒 Last update: ${new Date().toUTCString()}`;

  const keyboard = Markup.inlineKeyboard([
    [Markup.button.callback('🔄 Refresh List And Data', 'refresh_data')],
    [Markup.button.callback('🏦 Generate 10 Wallets', 'generate_wallets')]
  ]);

  await ctx.replyWithHTML(message, keyboard);
});

// Handle button callbacks
bot.action('refresh_data', (ctx) => {
  ctx.answerCbQuery('Refreshing data...');
  // Implement refresh logic here
});

bot.action('generate_wallets', async (ctx) => {
  ctx.answerCbQuery('Generating wallets...');

  const message = generate_wallets_reply(10);

  // Send the message in chunks if it's too long
  const maxLength = 4096; // Telegram's max message length
  try {
    for (let i = 0; i < message.length; i += maxLength) {
      await ctx.replyWithMarkdownV2(message.slice(i, i + maxLength), {
        parse_mode: 'Markdown',
      });
    }
  } catch (error) {
    console.error('Error generating wallets:', error);
    await ctx.reply('An error occurred while generating wallets. Please try again later.');
  }
});



bot.command('help', (ctx) => {
  ctx.reply(INFO_MSG);
});

bot.command('info', (ctx) => {
  ctx.reply('This bot is designed to help you interact with our web3 services. Use /help to see available commands.');
});

bot.command('quit', (ctx) => {
  // Explicit usage
  ctx.telegram.leaveChat(ctx.message.chat.id);

  // Context shortcut
  ctx.leaveChat();
});

bot.command('keyboard', (ctx) => {
  ctx.reply(
    'Keyboard',
    Markup.inlineKeyboard([
      Markup.button.callback('First option', 'first'),
      Markup.button.callback('Second option', 'second'),
    ])
  );
});

export { bot as commandMiddleware };