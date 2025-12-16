## COLPUNO Astro Landing – campaign flow

Коротко: это funnel --> zтрафик в основной COLPUNO‑продукт.    

- **Astro shell**
  - `src/pages/index.astro` – входная точка, `noindex, nofollow`.
  - Реакт‑приложение монтируется в `<AppLanding client:only="react" />`.

- **Главный лендинг**
  - `src/AppLanding.tsx` – обёртка с `QueryClientProvider` и темой.
  - `src/sections/landing-page/landing-page.tsx` – сборка всех секций:
    - Hero
    - Jobs module
    - Why COLPUNO
    - How it works
    - Profile motivator
    - FAQ
    - Final CTA
    - Footer + mobile sticky CTA

---

### 2. User flow

1. Пользователь попадает на **Single Page** по campaign‑URL (paid traffic).
2. Вводит email в Hero / Final CTA → `reg_started` → редирект на `/registration?email=...`.
3. Проходит регистрацию / верификацию (в проде – в основном COLPUNO продукте).
4. Если нажимал **Apply** по конкретной вакансии – после логина попадает на job page  
   с уже открытым Confirm Application и создаёт заявку.
---

### 3. Hero (Above the fold)

Компонент: `landing-hero.tsx`

- **Цель**: запустить воронку через email.
- Вёрстка:
  - Слева: заголовок, подзаголовок, email‑форма.
  - Справа: `LandingJobPreview` с 3 job‑тизерами.
- Поведение:
  - Валидация email.
  - `trackRegStarted(email)` при submit.
  - Редирект: `/registration?email=${encodeURIComponent(email)}`.
  - Копирайт и бейджи – строго по Single Page Copy V1.

---

### 4. Jobs module

Компонент: `landing-jobs.tsx` + `job-card.tsx` + `landing-job-detail-modal.tsx`

- **Что показывает**
  - Реальные вакансии из `JobOfferService.getJobOffers`.
  - Табы: **National (PH)** / **International (Preview)**.
  - До 6 карточек на таб, плюс 1 **blurred teaser card**:
    - `+1 more job revealed after registration`
    - CTA: `Unlock jobs` (disabled, для UX).
- **Job card**
  - Role title, facility type, location, shift (опционально), salary, start window.
  - CTA: **View details** / **Apply Now**.
- **Трекинг**
  - При клике по карточке:
    - открываем `LandingJobDetailModal`,
    - шлём `trackJobView(job.id)` → `job_view(job_id)`.

---

### 5. Job detail modal + Apply flow

Компонент: `landing-job-detail-modal.tsx`

- **Содержимое**
  - Title: `job.title`.
  - Subline: `location • facility_type • employment_type`.
  - Job snapshot (2–3 строки из `description`).
  - Quick requirements:
    - PRC License: Required / Preferred.
    - Experience: Not required / N years required.
    - Documents: CV, PRC ID (если есть).
    - Shift (если задан).
    - Start window (Immediate / This month / Q1 / TBD).
  - Блок “What happens next” - взято  Copy V1.

- **Поведение Apply**
  - Сейчас `user` захардкожен как `null` → всегда ветка “не залогинен”.
  - Логика:
    - берём `jobId` из `job['@id']` или `job.id`,
    - кладём `pendingJobApplication` в `sessionStorage`,
    - редиректим на `/registration`.
  - В бою:
    - после реальной регистрации фронт/бэк должен:
      - дернуть `reg_completed`,
      - прочитать `pendingJobApplication`,
      - отправить пользователя на `/jobs/{jobId}?openConfirmApplication=1`,
      - по confirm внутри платформы вызвать `application_created(jobId)`.

---

### 6. Registration placeholder

Файл: `src/pages/registration.astro`

- Локальная заглушка, чтобы не было 404 по `/registration?email=...`.
- Поведение:
  - читает `email` из query‑параметра и префиллит поле Email,
  - форма не сабмитится (кнопка `Continue` disabled),
  - страница помечена `noindex, nofollow`.
- В проде эту страницу надо заменить/перенаправить на реальный product signup.

---

### 7. Trust, How it works, Profile, FAQ, Final CTA

Все эти блоки маппятся 1:1 на Single Page Copy V1:

- `landing-trust.tsx` – **Why COLPUNO** + trusted network копирайт.
- `landing-how-it-works.tsx` – 3 шага “From ad → job → onboarding → application”.
- `landing-profile-motivator.tsx` – профайл как “career passport”, прогресс‑бар 0–100%.
- `landing-faq.tsx` – 4 FAQ из документа.
- `landing-final-cta.tsx` – финальный email + `Unlock jobs` + микрокопирайт про verification link.
- `landing-sticky-cta.tsx` – мобильный sticky CTA, скроллит к Hero.

---

### 8. Tracking (быстрый справочник)

Реализация: `src/sections/landing-page/utils/tracking.ts`

- `trackEvent(name, params?)`
  - обёртка над `window.gtag('event', ...)` с защитой от SSR.
- `trackRegStarted(email?)`
  - вызывается при сабмите email на лендинге.
- `trackRegCompleted(email?)`
  - ожидается использовать в основном продукте после успешной регистрации.
- `trackJobView(jobId)`
  - вызывается при открытии job‑модалки.
- `trackApplicationCreated(jobId)`
  - ожидается дергать после Confirm Application в платформе.

---

### 9. Локальный запуск

```bash

pnpm  install          # один раз
pnpm  start          # astro dev
```

После старта:

- лендинг: `http://localhost:4323/` (порт может отличаться, смотри логи),
- тест регистрации: `http://localhost:4323/registration?email=test@example.com`.


