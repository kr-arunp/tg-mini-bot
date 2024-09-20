import { ENVConfig } from "../config/env.config";
import { TelegrafBot } from "./bot";
import { commandMiddleware } from "./middleware";


const bot = TelegrafBot.getInstance(ENVConfig.TELEGRAM_BOT_TOKEN!).getBotInstance();

//Apply telegram middlewares
bot.use(commandMiddleware)


bot.on('message', (ctx) => {
  ctx.reply('Hello from the bot!');
})
