const fs = require('fs-extra');
const { Sequelize } = require('sequelize');
if (fs.existsSync('set.env'))
    require('dotenv').config({ path: __dirname + '/set.env' });
const path = require("path");
const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined
    ? databasePath
    : process.env.DATABASE_URL;
module.exports = { session_ID='eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiYU9Fc1RHV3Rsa3JIT21pN0JLZURVcFFVNlIxUHJRaXZ5aWdxcitmbXRYND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiM2pqdG5NbTBoMjZrbHRYWmdqYkk1eHFRVUppdld4ZEp1TjNnUHpVWGtCUT0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJPQ1NwbHV2NnBHcVJSMDg5amtHWThndU5jVmQveUpvc3pGSUdRNGJUMUZvPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJJU3dzNE5YdUkzZnlFV0ZsSm9GZ2hjNG1WNHRNMmpMeXBIenk4YnFIOUM0PSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InlIZUVOMjRsbUlJOE52ekxaSy9PV1hIV2tHSHByWDA3QXIyLzZ4U1pzRlk9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IjFJYWtGMXJxa0RQWkUzQVNhd2VKSEVZS09relliVlhiT29QZ1lDWHJXSFU9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVUp4VjNtZ1E3VzQydUZWbndxUFdmdTc2Um9mZlZEelBZUk16TDNJL3ZXWT0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoieXZIUDZYZUJxNUkzVzJSSnN2VjdGTlhYczR0TlJxcEEyMUhFQk1XWXlCUT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkN2T0xqSGJKdHV3dWdackhSSG5LSjBaczBLOGhOUGc4dlBJc1FTbkJsVEFUc0d0dmdic1Z4V0N0dWZDa0R0dGVBL1dMRFBBNW1BeVFrd2VxRVFtNENRPT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MTI2LCJhZHZTZWNyZXRLZXkiOiJFbEZMTU9CTjVTZ1hnMkREZGsxQ3NzWS9EUStNbFE1OEE3WDBlVkRpdTBJPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjIzNzYyMDEzODY4OUBzLndoYXRzYXBwLm5ldCIsImZyb21NZSI6dHJ1ZSwiaWQiOiIzQTEzMUQwNzk3NDM4MjVFQUIwQyJ9LCJtZXNzYWdlVGltZXN0YW1wIjoxNzI1NDk5Nzc0fV0sIm5leHRQcmVLZXlJZCI6NDEsImZpcnN0VW51cGxvYWRlZFByZUtleUlkIjo0MSwiYWNjb3VudFN5bmNDb3VudGVyIjoxLCJhY2NvdW50U2V0dGluZ3MiOnsidW5hcmNoaXZlQ2hhdHMiOmZhbHNlfSwiZGV2aWNlSWQiOiJpM2tOendta1FreThsdlZtOXVvSjJRIiwicGhvbmVJZCI6IjczNWNmMmQxLWE1OGQtNDg3MS1iODJkLTZlYjBlNjhkY2ZkYiIsImlkZW50aXR5SWQiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVNXltc01BNmM1bXZVV2JZZEdOS0t6L0FSMjQ9In0sInJlZ2lzdGVyZWQiOnRydWUsImJhY2t1cFRva2VuIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiZjNhczNYdVRPcTE0NDdNSU8zaGZhSXdKcERFPSJ9LCJyZWdpc3RyYXRpb24iOnt9LCJwYWlyaW5nQ29kZSI6IjhMSDE2VFM3IiwibWUiOnsiaWQiOiIyMzc2MjAxMzg2ODk6MTVAcy53aGF0c2FwcC5uZXQiLCJuYW1lIjoi8J2aqvCdmqvwnZCY8J2Qi/CdmrXwnZqw8J2QhvCdmq4g8J2QkvCdmrDwnZCL8J2bgfCdmrXwnZqqIPCdkIvwnZq18J2ar/CdmrTwnZqw8J2Qg/CdmqvwnZCSIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNLenQrODhHRU9xUzVMWUdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiI1L0ErejdOM3BtaHUxR0lRdlh6VWFiMjd3ZkdadkpXVlc4TTJBQTJwRWpNPSIsImFjY291bnRTaWduYXR1cmUiOiJtbTZGV3JaTk54RXluQzZMejQ4am95VTh4QWlSQVE0U0lQNkhIeUhsT1pzNlJOdjlFTWJQVm4zS3hFU1FRU1ZITENjS3RjblV6cml1Y0NmNm5nQTBoUT09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTFk0TFd1Y0xOWmwxN1NEYmduMCtXaVFHS01ZaE5DUnZ6dTcyNmhPeFA5bzdmc2JrOFIwcm9JTWhBNnpEOTZ5VC9JTGpodWNiMXpBd2dhY3JpV2xiQXc9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiIyMzc2MjAxMzg2ODk6MTVAcy53aGF0c2FwcC5uZXQiLCJkZXZpY2VJZCI6MH0sImlkZW50aWZpZXJLZXkiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJCZWZ3UHMremQ2Wm9idFJpRUwxODFHbTl1OEh4bWJ5VmxWdkROZ0FOcVJJeiJ9fV0sInBsYXRmb3JtIjoiaXBob25lIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzI1NDk5OTU2LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQU5SaCJ9',
    PREFIXE: process.env.PREFIX || "•",
    OWNER_NAME: process.env.OWNER_NAME || "DEMON KING  LEONIDAS ",
    NUMERO_OWNER : process.env.NUMERO_OWNER || "237620138689",              
    AUTO_READ_STATUS: process.env.AUTO_READ_STATUS || "yes",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_DOWNLOAD_STATUS || 'no',
    BOT : process.env.BOT_NAME || 'DIABLO LEONIDAS ',
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
