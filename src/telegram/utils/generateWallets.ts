import { generatePrivateKey, privateKeyToAccount } from 'viem/accounts'
export const generate_wallets = (count: number = 10) => {

  const wallets = [];
  for (let i = 0; i < count; i++) {
    const privateKey = generatePrivateKey();
    const account = privateKeyToAccount(privateKey);
    wallets.push({
      number: i + 1,
      address: account.address,
      privateKey: privateKey,
    });
  }
  return wallets;


}

export const generate_wallets_reply = (count: number = 10) => {
  const wallets = generate_wallets(count);

  let message = `🏦 Generated ${count} new wallets:\n\n`;

  wallets.forEach((wallet) => {
    message += `Wallet #${wallet.number}:\n`;
    message += `Address: \`${wallet.address}\`\n`;
    message += `Private Key: \`${wallet.privateKey}\`\n\n`;
  });


  message += '⚠️ IMPORTANT: Keep your private keys secret and secure!';

  return message;
}