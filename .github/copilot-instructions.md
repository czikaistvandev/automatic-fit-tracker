# OctoFit Tracker - AI Agent Instructions

## Project Overview
OctoFit Tracker is a fitness tracking application for Mergington High School, built as a learning exercise using GitHub Copilot agent mode. The app enables students to log activities, form teams, compete on leaderboards, and receive workout suggestions.

## Architecture

### Tech Stack
- **Frontend**: React.js (port 3000) in `octofit-tracker/frontend/`
- **Backend**: Django REST Framework (port 8000) in `octofit-tracker/backend/octofit_tracker/`
- **Database**: MongoDB (port 27017) - database name: `octofit_db`
- **Environment**: GitHub Codespaces with Dev Container

### Directory Structure
```
octofit-tracker/
├── backend/
│   ├── venv/                    # Python virtual environment (NEVER recreate)
│   └── octofit_tracker/         # Django project root
└── frontend/                    # React application
```

## Critical Workflows

### Python Virtual Environment
**NEVER create a new venv** - always use existing `octofit-tracker/backend/venv`:
```bash
source octofit-tracker/backend/venv/bin/activate
```

### Directory Navigation
**NEVER `cd` into directories** - always use absolute paths or `--prefix`:
```bash
# Good
python octofit-tracker/backend/manage.py migrate
npm install bootstrap --prefix octofit-tracker/frontend

# Bad
cd octofit-tracker/backend && python manage.py migrate
```

### MongoDB Service
Check if running: `ps aux | grep mongod` (NOT `systemctl status`)  
Data directory: `/data/db` (created by `post_start.sh`)  
Client tool: `mongosh` (NOT `mongo`)

### Running the Application
Use VS Code launch configurations in `.vscode/launch.json`:
- **Django Backend**: "Launch Django Backend" → runs on `0.0.0.0:8000`
- **React Frontend**: "Launch React Frontend" → runs on port 3000

**DO NOT** run servers via terminal commands like `python manage.py runserver`.

## GitHub Codespaces Integration

### Environment Variables
Django settings and frontend use `$CODESPACE_NAME` for dynamic URLs:
```python
# settings.py pattern
ALLOWED_HOSTS = ['localhost', '127.0.0.1']
if os.environ.get('CODESPACE_NAME'):
    ALLOWED_HOSTS.append(f"{os.environ.get('CODESPACE_NAME')}-8000.app.github.dev")
```

### API Endpoints
Format: `https://$CODESPACE_NAME-8000.app.github.dev/api/{collection}/`  
Collections: `users`, `teams`, `activities`, `leaderboard`, `workouts`

**NEVER hard-code** the codespace name - always use the environment variable.

### Port Configuration
- 8000 (Django): public
- 3000 (React): public  
- 27017 (MongoDB): private

Set by `post_start.sh` via `gh cs ports visibility`.

## Django Conventions

### Database Connection
Use Djongo adapter in `settings.py`:
```python
DATABASES = {
    'default': {
        'ENGINE': 'djongo',
        'NAME': 'octofit_db',
    }
}
```
No authentication required. Collections: users, teams, activities, leaderboard, workouts.

### Serializers
**Must convert ObjectId to string** for JSON serialization:
```python
# Serializers should handle MongoDB ObjectId → string conversion
```

### URL Patterns
Root `/` must point to API root. Include codespace URL in `api_root` view for endpoint discovery.

### CORS Configuration
Allow all origins in development:
```python
CORS_ALLOW_ALL_ORIGINS = True
ALLOWED_HOSTS = ['*']  # Plus codespace-specific hosts
```

## React Conventions

### API Integration
Components fetch from backend with environment variable:
```javascript
const apiUrl = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/component/`;
```

### Bootstrap Usage
- Import in `src/index.js`: `import 'bootstrap/dist/css/bootstrap.min.css';`
- Use bootstrap tables, buttons, and headings consistently across components

### Component Structure
Core components: `Activities.js`, `Leaderboard.js`, `Teams.js`, `Users.js`, `Workouts.js`  
Navigation: Use `react-router-dom` in `App.js`

### Response Handling
Handle both paginated (`.results`) and plain array responses:
```javascript
const data = response.results || response;
```

## Testing APIs
Use `curl` to test Django REST endpoints:
```bash
curl https://$CODESPACE_NAME-8000.app.github.dev/api/activities/
```

## Prompt Files
Reusable prompts in `.github/prompts/`:
- `/create-django-project` - Initialize Django structure
- `/init-populate-octofit_db` - Setup MongoDB with test data (superhero themed: Team Marvel vs Team DC)

Create new prompt files with frontmatter:
```markdown
---
mode: 'agent'
model: GPT-4.1
description: 'Task description'
---
```

## Dependencies

### Python (requirements.txt)
Django 4.1.7, djangorestframework, djongo 1.3.6, pymongo 3.12, django-cors-headers, dj-rest-auth

### Node.js
React, react-router-dom, bootstrap (installed with `--prefix octofit-tracker/frontend`)

## Common Pitfalls
1. **Don't recreate venv** - reuse `octofit-tracker/backend/venv`
2. **Don't change directories** - use absolute paths in commands
3. **Don't hard-code codespace names** - use `$CODESPACE_NAME` variable
4. **Don't use `systemctl`** - MongoDB managed by `post_start.sh`
5. **Don't start servers in terminal** - use VS Code launch configurations
