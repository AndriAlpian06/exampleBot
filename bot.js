const { google } = require('googleapis');
const TelegramBot = require('node-telegram-bot-api');
const dotenv = require('dotenv');
const { json } = require('express');

dotenv.config();

const bot = new TelegramBot(process.env.TELEGRAM_BOT_TOKEN, { polling: true });

// Inisialisasi Google Sheets API
async function appendToSheet(data){

    try {
        const auth = await google.auth.getClient({
            keyFile: 'sheets/spreedsheet.json',
            scope: ['https://www.googleapis.com/auth/spreadsheets'],
        });

        google.options({ auth })

        const sheetsClient = google.sheets({ version: 'v4' });

        const spreadsheetId = process.env.SPREADSHEET_ID;
        const range = 'Dunno'

        const valueInputOption = 'RAW';
        const insertDataOption = 'INSERT_ROWS';

        const valueRangeBody = {
            values: [[data]]
        }

        const request = {
            spreadsheetId,
            range,
            valueInputOption,
            insertDataOption,
            resource: valueRangeBody
        }

        const response = await sheets.spreadsheets.values.append(request);
        console.log('Data berhasil ditambahkan ke Google Sheets:', response.data);
    } catch (e){
        console.error('Gagal menambahkan data ke Google Sheets:', e.message);
    }
}

function handleStart(msg) {
  const chatId = msg.chat.id;

  // Teks pesan
  const messageText = 'PT Infomedia Nusantara merupakan subsidiary PT Telkom Indonesia yang memfokuskan bisnisnya pada penyediaan solusi Business Process Outsourcing (BPO) melalui 2 portofolio bisnis, yaitu: Customer Relationship Management (CRM) dan Shared Service Operation (SSO). Hingga saat ini, kami telah mengelola proses bisnis dari 600 lebih perusahaan dari berbagai segmen industri. Dalam perjalanan bisnisnya, Infomedia menguasai 53% market share contact center, yang terus dikembangkan dengan mengadopsi teknologi digital terdepan untuk memastikan experience terbaik bagi pelanggan.';
  const messageText2 = '*Tujuan*\nBerkolaborasi untuk mewujudkan bangsa digital yang lebih berdaya saing dan memberikan nilai tambah yang terbaik bagi para pemangku kepentingan.'
  const messageText3 = '*Visi*\nMenjadi mitra BPO Digital pilihan utama untuk memajukan masyarakat.'
  const messageText4 = '*Misi*\n1. Menghadirkan solusi CRM menyeluruh dan terintegrasi untuk menghasilkan pengalaman dan nilai bisnis yang terbaik bagi pelanggan.\n2. Menghadirkan solusi SSO yang didukung dengan teknologi terkini untuk mendisrupsi pengelolaan proses back office pelanggan.'
  
  // Menggabungkan teks pesan
  const fullMessage = `${messageText}\n\n${messageText2}\n\n${messageText3}\n\n${messageText4}`;
  
  // Membuat Inline Keyboard
  const keyboard = {
    inline_keyboard: [
      [{ text: 'Customer Relationship Management (CRM)', callback_data: 'CRM' }],
      [{ text: 'Shared Service Operational (SSO)', callback_data: 'SSO' }],
    ],
  };

  // Menyiapkan opsi pesan dengan keyboard
  const options = {
    reply_markup: JSON.stringify(keyboard)
  };

  // Mengirim pesan dengan Inline Keyboard
  bot.sendMessage(chatId, fullMessage, options);
}

function handleCRM(msg){
    const chatId = msg.chat.id;

    // action teks
    const messageText = 'Manfaatkan keunggulan digital CRM perusahaan agar semakin efektif mengelola saluran komunikasi, melacak interaksi, dan melakukan personalisasi dalam aktivitas pemasaran. Dengan Digitalisasi CRM, perusahaan tidak hanya meningkatkan kepuasan dan loyalitas pelanggan, namun juga memberikan wawasan yang sangat berharga untuk strategi bisnis di masa yang akan datang.'
    const messageText2 = 'Temukan beragam solusi pengelolaan pelayanan pelanggan atau customer relationship management (CRM) terlengkap. Hubungi tim kami untuk membantu anda menemukan solusi CRM terbaik.'

    const fullMessage = `${messageText}\n\n${messageText2}`

    // action button
    const button = {
        inline_keyboard: [
            [{text: 'CRM Analytic', callback_data: 'CRM_Analytic'}],
            [{text: 'CRM Platform', callback_data: 'CRM_Platform'}],
            [{text: 'CRM Solution', callback_data: 'CRM_Solution'}],
        ]
    }

    const options = {
        reply_markup: JSON.stringify(button)
    }

    bot.sendMessage(chatId, fullMessage, options)
}

function handleCRMPlatform (msg){
    const chatId = msg.chat.id;

    // action teks
    const messageText = 'Rasakan pengalaman untuk semakin dekat dengan pelanggan, mengetahui ketertarikan mereka serta memberikan masukan berupa hasil analitik yang akan bermanfaat bagi produk dan jasa.'
    const messageText2 = 'Omnix adalah platform omnichannel terintegrasi yang merupakan karya anak bangsa. Omnix mengorkestrasikan seluruh channel komunikasi melalui seamless interaction journey, sehingga seluruh interaksi bersama pelanggan dari berbagai channel komunikasi dapat dikelola dalam satu platform.'

    const fullMessage = `${messageText}\n\n${messageText2}`

    // action button
    const button = {
        inline_keyboard: [
            [{text: 'OMNIX Service', callback_data: 'OMNIX_Service'}],
            [{text: 'OMNIX Sales', callback_data: 'OMNIX_Sales'}],
            [{text: 'OMNIX Marketing', callback_data: 'OMNIX_Marketing'}],
            [{text: 'OMNIX Survey', callback_data: 'OMNIX_Survey'}],
            [{text: 'OMNIX AI & Automation', callback_data: 'OMNIX_AI_Automation'}],
        ]
    }

    const options = {
        reply_markup: JSON.stringify(button)
    }

    bot.sendMessage(chatId, fullMessage, options)
}

function handleDunno (msg){
    const chatId = msg.chat.id;

    // action teks
    const messageText = 'Maaf bot belum mengerti yang kamu ketik'

    bot.sendMessage(chatId, messageText)
}

// Tanggapi pesan /start
bot.onText(/\/start/, (msg) => {
  handleStart(msg);

  // Mencatat log pesan dari pengguna berserta jam dan tanggal
  const currentTime = new Date();
  console.log(`Pesan dari pengguna di chat ${chatId} pada ${currentTime.toLocaleString()}: ${fullMessage}`);
});

bot.onText(/\/CRM/, (msg) => {
    handleCRM(msg);

    const currentTime = new Date();
    console.log(`Pesan dari pengguna di chat ${chatId} pada ${currentTime.toLocaleString()}: ${fullMessage}`);
})

bot.onText(/\/CRM_Platform/, (msg) => {
    handleCRMPlatform(msg);

    const currentTime = new Date();
    console.log(`Pesan dari pengguna di chat ${chatId} pada ${currentTime.toLocaleString()}: ${fullMessage}`);
})

bot.onText(/.*/, (msg) => {
    const chatId = msg.chat.id;
    const userMessage = msg.text.toLocaleLowerCase()

    // Handle pesan "kembali" atau "menu"
    if (userMessage === 'kembali' || userMessage === 'menu') {
        handleStart(msg);
        return;
    }else{
         // Handle pesan bebas
        handleDunno(msg);

        appendToSheet(`User ${chatId}: ${msg.text}`)
    }
  
    const currentTime = new Date();
    console.log(`Pesan bebas dari pengguna di chat ${msg.chat.id} pada ${currentTime.toLocaleString()}: ${msg.text}`);
  });

// Fungsi penanganan aksi tombol
bot.on('callback_query', (callbackQuery) => {
  const chatId = callbackQuery.message.chat.id;
  const data = callbackQuery.data;

  // Mencatat log interaksi berserta jam dan tanggal
  const currentTime = new Date();
  console.log(`Interaksi di chat ${chatId} pada ${currentTime.toLocaleString()}`);

    //Tanggapi berdasarkan tombol yang diklik
    // if(data === 'CRM'){
    //     // Handle tombol CRM
    //     handleCRM({ chat: { id: chatId } });
    // } else if (data === 'CRM Platform'){
    //     handleCRMPlatform({ chat: { id : chatId } });
    // } else {
    //     console.log(`Bot merespon di chat ${chatId} pada ${currentTime.toLocaleString()}: ${messageText4}`);
    //     handleDunno({ chat: { id : chatId } })
    // }
    switch (data) {
        case 'CRM':
            handleCRM({ chat: { id: chatId } });
            break;
        case 'CRM_Platform':
            handleCRMPlatform({ chat: { id : chatId } });
            break;
        default:
            handleDunno({ chat: { id : chatId } })
            break;
    }
        
});
