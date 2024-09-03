const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session: process.env.SESSION_ID || 'eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiT0dsNEtjcGY5VjIyOVFBaTl1WlY2RW91bEdBdjNubWVVR0VtSk5ybDJHdz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoielYwS1lCWk90SzkrZC92L202UW1yV1hRS0o5TEljRjlmZVY5NzdjYkkzZz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0REVqOE5HUWtSWUVad3lPRjg3TnZ5S0xnSTlkb3lLNUVNZnEzYitOUDI4PSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJqUXkxWTU0NkJXdG44MlZDTk0wYlhIdHIyajZ2a0RyaHkzT25WcTlrcDBBPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkVDTFNjaGVURUYxSGJvS0dKS0xQVCt2WjFobWRCVG1nYjNvUkc1ODRLRnM9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Inc0OUIwQ2kzSnFKZy84UUFzWjhQc0NNcUdacUhkLy9VYlBYTmhEei82MDA9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoib09vT3RCTk9LZ0ZOOHFtdFlVWGNlUE93UlNxcnFOejd4cWQ5MXFmMlhrUT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoidkJkeVdLOU4wSnlDZ2VVWThYY0ZXdVA0VnVxeTlJR0JzTWxSNTlpWVVYUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlRTakNBc0lRZVZYeDNuOHBEV3lvNTlHTU03TEJwOElFQmgzUElXWWF5d0Yxdmp1c2MxTGc1RGNXS0xPQ29tdXVLYlN0UWxOOWVJSW1NZFRTSUlZSmhRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6OTksImFkdlNlY3JldEtleSI6Imt5SlZqOGNwY0gwZVBCakJYblJkSldiOUN6NXFMdE5FcXpVclBFcDJkeXc9IiwicHJvY2Vzc2VkSGlzdG9yeU1lc3NhZ2VzIjpbXSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjAsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IlpLTnVBUjRBUjRXdDF4T0N1RUpHZlEiLCJwaG9uZUlkIjoiZTNjNDQwY2MtZTM3Yi00NTY5LTg1ZGEtNzNmODIyNTE5M2E4IiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjU1SjJwb21vOWtaOGRadXMzQWpiaURTcm5BYz0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiI0RDdpb20vejZpbStSeFlPNHZRS3plODRsZXc9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiQTJUMjFYNDciLCJtZSI6eyJpZCI6IjIzNzYyMDEzODY4OToxMUBzLndoYXRzYXBwLm5ldCJ9LCJhY2NvdW50Ijp7ImRldGFpbHMiOiJDTkw4OTZZRkVMZTcyN1lHR0FFZ0FDZ0EiLCJhY2NvdW50U2lnbmF0dXJlS2V5IjoiNS9BK3o3TjNwbWh1MUdJUXZYelVhYjI3d2ZHWnZKV1ZXOE0yQUEycEVqTT0iLCJhY2NvdW50U2lnbmF0dXJlIjoiY1pKa2hSQkxxUXBXZnRHRGtmVXVxTm16TUhuTW8rTS9oQS90WGxGTndITGNYU0N5SnpoNjFMTTdjeU5SQkNwMFpRaHd5L3FwcUdrTDlrY1pHeTdRaGc9PSIsImRldmljZVNpZ25hdHVyZSI6InAyeW12VnNuTytobTVQVUNLRW9YNFNUbWxkaDJjM2ZxUW4vU2s0U1AvTUNHNnJvb09ZdTB6VkhwbStRRndxbU9TWHpNakM3Q2JOOFJQZ2c2V00vaGlBPT0ifSwic2lnbmFsSWRlbnRpdGllcyI6W3siaWRlbnRpZmllciI6eyJuYW1lIjoiMjM3NjIwMTM4Njg5OjExQHMud2hhdHNhcHAubmV0IiwiZGV2aWNlSWQiOjB9LCJpZGVudGlmaWVyS2V5Ijp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiQmVmd1BzK3pkNlpvYnRSaUVMMTgxR205dThIeG1ieVZsVnZETmdBTnFSSXoifX1dLCJwbGF0Zm9ybSI6ImlwaG9uZSIsImxhc3RBY2NvdW50U3luY1RpbWVzdGFtcCI6MTcyNTM1NzUwOCwibXlBcHBTdGF0ZUtleUlkIjoiQUFBQUFDYlIifQ==',
    PREFIXE: process.env.PREFIX || "•",
    OWNER_NAME: process.env.OWNER_NAME || "𝚪𝚫𝐘𝐋𝚵𝚰𝐆𝚮 𝐒𝚰𝐋𝛁𝚵𝚪 𝐋𝚵𝚯𝚴𝚰𝐃𝚫𝐒",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "237620138689",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || '𝚪𝚫𝐘𝐋𝚵𝚰𝐆𝚮 𝐒𝚰𝐋𝛁𝚵𝚪 𝐋𝚵𝚯𝚴𝚰𝐃𝚫𝐒',
    URL : process.env.BOT_MENU_LINKS || 'https://telegra.ph/file/0c351a67f1dffd1f34cf5.jpg',
    MODE: process.env.PUBLIC_MODE || "no",
    PM_PERMIT: process.env.PM_PERMIT || 'yes',
    HEROKU_APP_NAME : process.env.HEROKU_APP_NAME,
    HEROKU_APY_KEY : process.env.HEROKU_APY_KEY ,
    WARN_COUNT : process.env.WARN_COUNT || '3' ,
    ETAT : process.env.PRESENCE || '',
    CHATBOT : process.env.PM_CHATBOT || 'yes',
    DP : process.env.STARTING_BOT_MESSAGE || "yes",
    ADM : process.env.ANTI_DELETE_MESSAGE || 'yes',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway" : "postgresql://postgres:bKlIqoOUWFIHOAhKxRWQtGfKfhGKgmRX@viaduct.proxy.rlwy.net:47738/railway",
   
};
let fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`mise à jour ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
