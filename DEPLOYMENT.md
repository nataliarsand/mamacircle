# Deployment Guide

## Official Deployment Process

Mama Circle uses **GitHub Pages** for automatic, zero-cost deployment.

### How It Works

1. **Source**: The site is deployed directly from the `main` branch **root directory**
2. **Trigger**: Any push to `main` automatically triggers a deployment
3. **Build**: No build step required - GitHub Pages serves static files as-is
4. **Domain**: Custom domain `mamacircle.me` configured via `CNAME` file
5. **Speed**: Changes are live within 1-2 minutes

### GitHub Pages Configuration

- **Source Branch**: `main`
- **Source Folder**: `/ (root)`
- **Custom Domain**: `mamacircle.me`
- **HTTPS**: Enabled (enforced)
- **Jekyll**: Disabled via `.nojekyll` file

### Deployment Workflow

```bash
# 1. Make your changes
vim index.html  # or any file

# 2. Test locally first
python3 -m http.server 8000
# Visit http://localhost:8000

# 3. Commit changes
git add .
git commit -m "Description of changes"

# 4. Push to main (triggers automatic deployment)
git push origin main

# 5. Verify deployment
# Wait 1-2 minutes, then visit https://mamacircle.me
```

### What Gets Deployed

✅ **All files in the root directory:**
- `*.html` - All HTML pages
- `style.css` - Stylesheet
- `script.js` - JavaScript
- `lang/` - Translation files
- `assets/` - Images and resources
- `robots.txt`, `sitemap.xml` - SEO files
- `CNAME` - Custom domain configuration
- `.nojekyll` - Disables Jekyll processing
- `404.html` - Custom error page

❌ **Excluded from deployment** (via `.gitignore`):
- `.DS_Store` - macOS metadata
- `.vscode/`, `.idea/` - IDE files
- `.env*` - Environment variables
- Temporary files (`*.tmp`, `*.swp`)

### No Build Process

This is a **static site** with:
- ✅ No npm dependencies
- ✅ No build step
- ✅ No package.json
- ✅ No bundler or compiler
- ✅ Files deployed exactly as written

### DNS Configuration

The custom domain `mamacircle.me` is configured with:
- `CNAME` file in repository root
- DNS A records pointing to GitHub Pages IPs
- HTTPS certificate automatically provided by GitHub

### Troubleshooting Deployment

**Changes not appearing on live site?**
1. Check GitHub Actions/Pages status in repository settings
2. Verify commit was pushed to `main` branch
3. Hard refresh browser: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows)
4. Clear browser cache

**404 errors after deployment?**
1. Verify file exists in repository root
2. Check file paths are correct (case-sensitive)
3. Ensure `.nojekyll` file exists in root

**Custom domain not working?**
1. Verify `CNAME` file contains `mamacircle.me`
2. Check DNS settings point to GitHub Pages
3. Enable "Enforce HTTPS" in repository settings

---

## Alternative Deployment Methods (Not Used)

For reference, these deployment methods are **NOT** currently used:

### ❌ Eleventy (Previously Considered, Now Removed)
- Static site generator
- Would require `npm install` and build step
- Added complexity without benefit for this project
- **Removed August 2024**

### ❌ Netlify/Vercel
- Alternative hosting platforms
- Require build configuration
- GitHub Pages is simpler and free

### ❌ Self-Hosted Server
- Requires server maintenance
- Costs money
- GitHub Pages provides better uptime

---

**Current deployment is optimal for this project.** Simple, fast, free, and automatic.
