#!/bin/sh
echo "⏳ Aguardando MySQL em db:3306..."

# Espera até o MySQL responder na porta 3306
while ! nc -z db 3306; do
  sleep 1
done

echo "✅ MySQL pronto! Iniciando NestJS..."
exec npm run start:dev
