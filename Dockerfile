# Базовый образ Node.js
FROM node:20-alpine

# Устанавливаем рабочую директорию
WORKDIR /app

# Копируем package.json и package-lock.json
COPY package*.json ./

# Устанавливаем зависимости
RUN  yarn

# Копируем исходный код
COPY . .

# Собираем приложение (если используешь TypeScript)
RUN yarn run build

# Экспонируем порт
EXPOSE 3000

# Запуск приложения
CMD ["npm", "run", "start:prod"]
