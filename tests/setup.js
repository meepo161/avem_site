const fs = require('fs');
const path = require('path');
const dotenv = require('dotenv');

// Загружаем переменные окружения из .env.local
const envPath = path.resolve(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  console.log('Загружаю переменные окружения из:', envPath);
  const envConfig = dotenv.config({ path: envPath });
  if (envConfig.error) {
    console.error('Ошибка при загрузке переменных окружения:', envConfig.error);
  } else {
    console.log('Переменные окружения успешно загружены');
    // Явно устанавливаем EMAIL_PASSWORD
    process.env.EMAIL_PASSWORD = envConfig.parsed.EMAIL_PASSWORD;
  }
} else {
  console.error('Файл .env.local не найден');
} 