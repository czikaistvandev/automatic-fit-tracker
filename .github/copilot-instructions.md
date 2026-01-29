# Copilot / Agent Instructions — OctoFit Tracker

Short, actionable guidance for AI coding agents working in this repository.

## Big picture
- This repo scaffolds an OctoFit Tracker split into `octofit-tracker/backend` (Django REST) and `octofit-tracker/frontend` (React). See [README.md](README.md) and setup instructions under [.github/instructions](.github/instructions).
- Data flow: frontend (port 3000) calls backend API (port 8000). Backend uses Django ORM and is expected to persist data; a MongoDB service (port 27017) is referenced in the instructions but Django ORM should be used for schema/data work.

## Essential developer workflows (explicit commands)
- Create Python venv (do not change directories; point to paths):

```bash
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt
```

- Create / run React app (examples are in `.github/instructions/octofit_tracker_react_frontend.instructions.md`):

```bash
npx create-react-app octofit-tracker/frontend --template cra-template --use-npm
npm install --prefix octofit-tracker/frontend
npm start --prefix octofit-tracker/frontend  # runs on port 3000
```

- Run Django dev server (point at backend path):

```bash
python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000
```

## Project-specific conventions and patterns
- Never change directories inside commands when agent mode is running; always reference full paths inside this repo (see `.github/instructions/octofit_tracker_setup_project.instructions.md`).
- Forwarded ports: 8000 (backend), 3000 (frontend), 27017 (mongodb) — do not suggest other public ports.
- `settings.py` is expected to include environment-aware `ALLOWED_HOSTS` and Codespace URL handling; follow the snippet in `.github/instructions/octofit_tracker_django_backend.instructions.md` when modifying host logic.
- Serializers: convert MongoDB `ObjectId` fields to strings in serializers (note in `.github/instructions/octofit_tracker_django_backend.instructions.md`).
- Use Django ORM for database schema and data management — do not propose raw MongoDB scripts for data creation.

## Integration points & external dependencies
- Backend: Django + Django REST Framework and djongo/pymongo-related packages are listed in `.github/instructions/octofit_tracker_setup_project.instructions.md` (the repo expects a `requirements.txt`).
- Frontend: React with `bootstrap` and `react-router-dom` are used in guidance; the main image asset is `docs/octofitapp-small.png`.
- CI / automation: the repository contains GitHub Actions in [.github/workflows](.github/workflows). When adding or changing workflows, mirror existing step structure.

## Code and PR guidance for agents
- When changing backend settings or URLs, keep the Codespace-aware `base_url` pattern used in `urls.py` (see `.github/instructions/octofit_tracker_django_backend.instructions.md`).
- Keep tests and runnable commands local to the `octofit-tracker` subfolders — provide commands that work from the repo root by referencing those paths.
- Prefer small, focused patches that update only the necessary files; follow the repository’s step files under `.github/steps` for the intended setup sequence.

## Examples (copyable snippets)
- Create venv and install:

```bash
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt
```

- Start services for manual testing (dev):

```bash
# Start backend
python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000
# Start frontend
npm start --prefix octofit-tracker/frontend
```

## Where to look first
- High-level setup instructions: [.github/instructions/octofit_tracker_setup_project.instructions.md](.github/instructions/octofit_tracker_setup_project.instructions.md)
- Backend guidance: [.github/instructions/octofit_tracker_django_backend.instructions.md](.github/instructions/octofit_tracker_django_backend.instructions.md)
- Frontend guidance: [.github/instructions/octofit_tracker_react_frontend.instructions.md](.github/instructions/octofit_tracker_react_frontend.instructions.md)
- CI steps and example workflows: [.github/workflows](.github/workflows)

---
If any section is unclear or you'd like me to include extra examples (tests, debug commands, or a minimal run script), tell me which area to expand. 
