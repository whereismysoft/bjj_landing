# CHELUST BJJ

Русскоязычный сайт тренера по бразильскому джиу-джитсу. [Открыть сайт](https://whereismysoft.github.io/bjj_landing/).

## Разработка

Требуется Node.js 24.

```sh
npm ci
npm run dev
npm run typecheck
npm run build
npm run preview
```

Vite обслуживает сайт по пути `/bjj_landing/`. Оригинал фотографии хранится в `public/coach.jpg`. Кадрирование и цветокоррекция применяются через CSS.

Для публикации видео добавьте его идентификатор и заголовок в объект `videos` в `src/content.ts`. Там же хранятся анонсы для блога со ссылками на выпуски.

Форма подготавливает текст и, если браузер разрешает, копирует его в буфер обмена. Готовый текст также можно скопировать из поля. Отправка выполняется вручную в Telegram.

## GitHub Pages

В настройках репозитория откройте **Settings → Pages → Build and deployment → Source** и выберите **GitHub Actions**. Workflow **Deploy to GitHub Pages** запускается при отправке изменений в `main`. Для ручного запуска откройте его во вкладке **Actions**, выберите **Run workflow**, укажите `main` и подтвердите запуск.
