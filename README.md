# Helpdesk Hub

A small helpdesk application with a **Laravel 12 REST API** and a **React + Vite + React Router** frontend.

## Included requirements

- Login screen with protected routes
- Demo credentials: `itadmin` / `helpdesk123`
- Ticket dashboard, new ticket form, and ticket details/status screens
- Loading, empty, search, and API error states
- Browser localStorage persistence when no API URL is configured
- Laravel ticket API when `VITE_API_URL` is set
- Responsive purple interface

## Project structure

```text
medicine-inventory-system/
├── app/                    # Laravel ticket controller and model
├── database/               # Ticket migration and seed data
├── routes/api.php          # Ticket API routes
└── frontend/               # React/Vite single-page application
```

## First-time setup (PowerShell)

From the folder where you want to keep the project:

```powershell
git clone https://github.com/howellsy07/medicine-inventory-system.git
cd medicine-inventory-system

composer install
Copy-Item .env.example .env
php artisan key:generate
New-Item database/database.sqlite -ItemType File -Force
php artisan migrate --seed

cd frontend
npm install
```

## Run the system

Open **two PowerShell windows** in the project.

Terminal 1 — Laravel API:

```powershell
cd medicine-inventory-system
php artisan serve
```

Terminal 2 — React frontend:

```powershell
cd medicine-inventory-system\frontend
npm run dev
```

Open `http://localhost:5173` and log in using:

- Username: `itadmin`
- Password: `helpdesk123`

Without `VITE_API_URL`, the frontend runs independently and stores tickets in the browser. To use Laravel locally, create `frontend/.env.local` with `VITE_API_URL=http://127.0.0.1:8000/api`.

## API endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/tickets` | Load all tickets |
| POST | `/api/tickets` | Validate and save a ticket |
| GET | `/api/tickets/{id}` | Load one ticket |
| PUT | `/api/tickets/{id}` | Update a ticket |
| DELETE | `/api/tickets/{id}` | Delete a ticket |

## Run the checks

```powershell
php artisan test
cd frontend
npm run build
```

## Deploy the frontend to Vercel

In Vercel, set the project root directory to `frontend`. The build command is `npm run build` and the output directory is `dist`. The included `frontend/vercel.json` keeps direct links such as `/tickets/1` working after refresh.

The deployed frontend needs no backend because it uses localStorage by default. For a hosted Laravel API, add a Vercel environment variable named `VITE_API_URL` with the public API base URL, for example `https://example.com/api`.

Created by **John Howell J. Sy** for CCS112.
