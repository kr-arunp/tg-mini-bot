import { Context, Telegraf } from 'telegraf';
import { Update } from 'telegraf/types';

export class TelegrafBot {

  private static instances: Map<string, TelegrafBot> = new Map();
  private bot: Telegraf<Context<Update>>;

  private constructor(token: string) {
    this.bot = new Telegraf(token);
  }

  public static getInstance(token: string): TelegrafBot {
    if (!token) {
      throw new Error('Bot token is required');
    }

    if (!TelegrafBot.instances.has(token)) {
      TelegrafBot.instances.set(token, new TelegrafBot(token));
    }
    console.log(`Bot instance for token ${token} created.${JSON.stringify(TelegrafBot.instances.get(token))} instances in total.`);
    return TelegrafBot.instances.get(token)!;
  }

  public async stopBot(): Promise<void> {
    return this.bot.stop();
  }
  public async startBot(): Promise<void> {
    console.log(`Starting bot for token ${this.bot.botInfo?.first_name}`);
  
    await this.bot.launch();
  }
  public getBotInstance(): Telegraf<Context<Update>> {
    return this.bot;
  }
}