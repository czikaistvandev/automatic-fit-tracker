# Copilot / Agent Instructions — OctoFit Tracker

Short, actionable guidance for AI coding agents working in this repository.

## 🚧 Big picture
- Monorepo split: `octofit-tracker/backend` (Django REST API) and `octofit-tracker/frontend` (React app / expected on port 3000).
- Data flow: frontend → backend API (`/api/*`) on port **8000**. Backend uses **djongo** to talk to MongoDB (default host `mongodb://localhost:27017/`).
- API implemented with DRF ModelViewSets. Root (`/`) returns `api_root` links for users, teams, activities, workouts, and leaderboard.

## ✅ Essential developer workflows (explicit commands)
- Create & activate Python venv (run from repo root; do NOT `cd`):

```bash
python3 -m venv octofit-tracker/backend/venv
source octofit-tracker/backend/venv/bin/activate
pip install -r octofit-tracker/backend/requirements.txt
```

- Database & dev server (Django):

```bash
# Make migrations and migrate
python octofit-tracker/backend/manage.py makemigrations
python octofit-tracker/backend/manage.py migrate
# Populate test data (destructive - see warning)
python octofit-tracker/backend/manage.py populate_db
# Start dev server
python octofit-tracker/backend/manage.py runserver 0.0.0.0:8000
```

- Run tests:

```bash
python octofit-tracker/backend/manage.py test
```

> Tip: Always reference full paths from repo root when running commands in agent mode.

## ⚠️ Project-specific rules & gotchas
- **Never** change directories in commands when agent mode is running. Reference full paths instead.
- Forwarded ports: **8000** (backend), **3000** (frontend), **27017** (MongoDB). Do not suggest other public ports.
- `settings.py` contains Codespace-aware `ALLOWED_HOSTS` logic. Keep that pattern when making host-related edits.
- The repository includes a `populate_db` management command (`octofit-tracker/backend/octofit_tracker/management/commands/populate_db.py`) that **drops** collections and inserts sample docs via `pymongo`. It's intended for tests/demos only — document its destructive nature in PRs.
- Prefer Django ORM for creating and changing schema and seed data (the management command is an exception used by the exercise).

## 🔧 Code patterns & examples (concrete)
- ObjectId handling in serializers (`serializers.py`): uses a small `ObjectIdField` to convert ObjectId <-> string.

```python
class ObjectIdField(serializers.Field):
    def to_representation(self, value):
        return str(value)
    def to_internal_value(self, data):
        return ObjectId(data)
```

- Models use djongo fields (example: `Team.members` is `ArrayReferenceField` to `User`). Tests use `team.members.add(user)`.
- API endpoints (see `urls.py`): `/api/users/`, `/api/teams/`, `/api/activities/`, `/api/workouts/`, `/api/leaderboard/`.
- Management command: `python octofit-tracker/backend/manage.py populate_db` (drops collections; re-seeds data).

## 🔁 CI / step-checks to be aware of
- Workflows in `.github/workflows` validate step-specific changes. Step 3 checks for the presence of `djongo`, `octofit_db` in `settings.py`, and `populate_db.py`.
- When adding/removing workflow steps, follow the existing step structure and use the same patterns for messages/comments.

## 🧪 Tests & local verification
- Tests live in `octofit-tracker/backend/octofit_tracker/tests.py` and use Django `TestCase`.
- Tests may assume a MongoDB instance is reachable (djongo uses MongoDB), so ensure `mongod` is running on `localhost:27017` when running tests locally.
- Quick manual API check:

```bash
curl http://localhost:8000/api/users/
```

## PR guidance for agents
- Make small, focused changes. Prefer addressing a single step/issue per PR.
- If you change seed or populate scripts, add clear docs and emphasize destructive behavior.
- Follow `.github/steps/*` prompts and instructions when authoring exercise-focused changes.

## Where to look first 🔎
- Config & env: `octofit-tracker/backend/octofit_tracker/settings.py`
- Models & API: `models.py`, `serializers.py`, `views.py`, `urls.py` (backend app)
- Tests & admin: `tests.py`, `admin.py`
- Management command: `management/commands/populate_db.py`
- Step-based guidance: `.github/steps/*` and `.github/instructions/*`

---
If any section is unclear or you'd like more examples (safer data-load patterns, extra test snippets, or sample curl/httpie requests), tell me which area to expand.
 
