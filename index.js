const telegramBot = require('node-telegram-bot-api');
const config      = require('./config');
const convert     = require('./convert');

const token = config._token;

const bot   = new telegramBot(token, {polling:true});

// event listener
bot.onText(/start/, (msg, match) => {
  try {
    bot.sendMessage(
      msg.chat.id,
      `Hello ${msg.chat.first_name}!, 
       gunakan perintah '/convert' untuk mulai mengkonversi mata uang.
       contoh: /convert 10 IDR ke USD`
    );
  } catch (error) {
    console.log(error);
  }
});

bot.onText(/convert (.+)/, async (msg, match) => {
  try {
    const chatId = msg.chat.id;
    const isi    = match[1];
    const pecah  = isi.trim().split(" ");
    const uang   = parseInt(pecah[0])
    const resp   = await convert.ok(pecah[1], pecah[3]);
    const from   = pecah[1];
    const to     = pecah[3];
    let amount = await Object.values(resp.data)[0] * uang;
    bot.sendMessage(chatId, `${uang} ${from} bernilai \n${amount} ${to}`);
  } catch (error) {
    console.log(error);
  }
});