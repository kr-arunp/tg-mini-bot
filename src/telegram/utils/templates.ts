export const templates = {
  greeting: (name: string) => `Hello, ${name}! Welcome to our bot.`,
  itemList: (items: number[]) => `
Your items:
${items.map((item, index) => `${index + 1}. ${item}`).join('\n')}
  `,
};