// prisma.config.js

// Импортируем функцию defineConfig и env из конфигурационного пакета Prisma.
// Мы используем require, так как это JS-файл в CommonJS среде,
// но также поддерживается синтаксис ES Modules (import/export).
const { defineConfig, env } = require('prisma/config');

// Экспортируем конфигурацию, используя функцию defineConfig.
module.exports = defineConfig({
  // Укажите путь к вашему файлу схемы.
  schema: 'prisma/schema.prisma', 
  
  // Конфигурация источников данных (datasource)
  datasource: {
    // 1. 'url': Основной URL подключения к базе данных.
    // Используется для большинства операций Prisma CLI.
    // Читает значение из переменной окружения DATABASE_URL.
    url: env('DATABASE_URL'), 
    
    // 2. 'directUrl': Прямой URL подключения к базе данных.
    // Используется для специальных команд, таких как 'prisma migrate dev',
    // когда Prisma требуется установить прямое соединение (без прокси).
    // Читает значение из переменной окружения DIRECT_URL.
    directUrl: env('DIRECT_URL'), 
  },
});