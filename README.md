# Happy Birthday — Purple Theme

This is a small static site you can publish via GitHub Pages.

Files included:

- `index.html` — main page
- `css/styles.css` — purple theme and layout
- `js/script.js` — confetti and simple interactions

How to publish:

1. Create a new repository on GitHub (or use an existing one).
2. Move this folder's contents to the repo root and push to `main`.
3. In the repo: Settings → Pages → Source: `main` branch, folder: `/ (root)` → Save.
4. Wait a minute — your site will be at `https://<your-username>.github.io/<repo-name>/`.

Quick git commands (run from inside this folder):

```powershell
git init
git add .
git commit -m "Add birthday site"
git branch -M main
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

Optional: Use the GitHub desktop app or the website to create the repo first, then push.
