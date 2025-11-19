# Mama Circle 💞

Mama Circle is a grassroots space where mothers can gently connect and support one another. No sign-ups, no pressure — just a quiet signal that says "I'm here if you need someone."

## 🚀 Quick Start

### Running Locally

The site uses JavaScript to load translation files dynamically, so it **must be served over HTTP** (not opened as a file).

```bash
# Navigate to project directory
cd /Users/nataliaarsand/Dev/mamacircle

# Start a local web server (Python 3)
python3 -m http.server 8000
```

Open your browser to **[http://localhost:8000](http://localhost:8000)**

### Testing Different Languages

The interface defaults to English but supports Portuguese:

- English: `http://localhost:8000/?lang=en`
- Portuguese: `http://localhost:8000/?lang=pt`

You can also change themes with the `theme` parameter:
```
http://localhost:8000/?theme=blue
```

## 📁 Project Structure

```
mamacircle/
├── index.html              # Main landing page
├── toolkit.html            # Resource toolkit for mamas
├── code-of-care.html       # Community guidelines
├── privacy.html            # Privacy & safety policy
├── style.css               # Global styles and theme variables
├── script.js               # Internationalization, carousel, navigation
├── lang/
│   ├── en.json            # English translations
│   └── pt.json            # Portuguese translations
├── assets/
│   ├── mandala-circle.png # Logo and branding
│   └── css/               # Additional stylesheets
└── README.md              # This file
```

## 🎨 Key Features

- **Bilingual Support**: English and Portuguese with dynamic i18n
- **Testimonial Carousel**: Accessible, keyboard-navigable carousel with auto-play
- **Responsive Design**: Mobile-first, works on all devices
- **Accessibility**: ARIA labels, keyboard navigation, screen reader support
- **Theme Support**: CSS custom properties for easy theming

## 🌐 Deployment

The site is deployed via **GitHub Pages** from the **root directory** of the `main` branch to [https://mamacircle.me](https://mamacircle.me)

**Deployment is automatic** - any changes pushed to `main` will update the live site within a few minutes.

## 🛠️ Development Workflow

### 1. Make Changes
Edit files in the root directory:
- **Content**: Update HTML files or translation JSON files in `lang/`
- **Styling**: Edit `style.css`
- **Functionality**: Modify `script.js`

### 2. Test Locally
```bash
python3 -m http.server 8000
```
View at http://localhost:8000 and test both languages

### 3. Commit & Push
```bash
git add .
git commit -m "Brief description of changes"
git push origin main
```

### 4. Verify Deployment
Wait 1-2 minutes, then check https://mamacircle.me

## 🧪 Testing Checklist

Before pushing changes, test:
- [ ] Both English (`?lang=en`) and Portuguese (`?lang=pt`) versions
- [ ] Mobile responsiveness (resize browser or use DevTools)
- [ ] Carousel navigation (arrows, dots, keyboard, swipe on mobile)
- [ ] All links work correctly
- [ ] No console errors (check browser DevTools)

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch (`git checkout -b feature/improvement`)
3. Make your changes and test thoroughly
4. Submit a pull request with a clear description

## 📝 Notes

- **No Build Process**: This is a static site with no build step. Files are deployed as-is.
- **Translation Files**: All text content is in `lang/en.json` and `lang/pt.json`
- **CSS Variables**: Theme colors are defined at the top of `style.css` using CSS custom properties
- **Carousel**: Built with vanilla JavaScript, no dependencies
- **404 Page**: Custom error page at `404.html` for handling missing pages
- **Security**: `robots.txt` blocks crawlers from accessing development files
- **.nojekyll**: Tells GitHub Pages not to process files with Jekyll

## 🔧 Troubleshooting

**Site not loading?**
- Make sure you're accessing via HTTP (http://localhost:8000), not opening the HTML file directly
- Check that port 8000 isn't already in use: `lsof -ti:8000`

**Translations not showing?**
- Verify `lang/en.json` and `lang/pt.json` exist and are valid JSON
- Check browser console for fetch errors

**Changes not appearing?**
- Hard refresh: `Cmd+Shift+R` (Mac) or `Ctrl+Shift+R` (Windows/Linux)
- Clear browser cache

**404 page not showing locally?**
- The Python dev server doesn't auto-redirect to `404.html`
- To preview: visit `http://localhost:8000/404.html` directly
- On production (GitHub Pages), it works automatically for any missing page

---

Made with 💞 for mamas everywhere
