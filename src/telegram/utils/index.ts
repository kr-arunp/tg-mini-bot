export * from "./formatting";
export * from "./templates";

export function escapeMarkdown(text: string) {
  const specialChars = ['_', '*', '[', ']', '(', ')', '~', '`', '>', '#', '+', '-', '=', '|', '{', '}', '.', '!'];
  return specialChars.reduce((acc, char) => acc.replace(new RegExp('\\' + char, 'g'), '\\' + char), text);
}