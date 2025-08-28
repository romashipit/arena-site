# ARENA — starter

Файлы:
- `index.html` — страница
- `styles.css` — стили
- `script.js` — логика (таймер, языки, загрузка `arena.json`)
- `arena.json` — данные арены (меняешь каждый день)

## Как запустить на GitHub Pages
1) Создай репозиторий `arena-site` (Public).
2) Зальи **содержимое** папки (не .zip).
3) Settings → Pages → Source: Deploy from a branch → Branch: `main` → Save.
4) Открой ссылку вида `https://<user>.github.io/arena-site/`

## Что обновлять каждый день
- В `arena.json` меняй:
  - `themeToday`
  - `dexLink` — ссылка на swap токена на Base
  - `ticketLink` — ссылка на бота (покупка PASS)
  - `chatLink` — ссылка на чат дня
  - `arenaEndsAtISO` — время конца арены в формате ISO (UTC)

## Языки
Кнопки EN/RU переключают язык. По умолчанию английский.
