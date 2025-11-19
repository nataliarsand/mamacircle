# Mama Circle

A grassroots digital space where mothers can gently connect and support one another. No sign-ups, no pressure — just a quiet signal that says "I'm here if you need someone."

**Visit:** [mamacircle.me](https://mamacircle.me)

---

## About the Project

Mama Circle is a community-driven platform designed to combat maternal isolation by creating low-barrier connections between mothers. The site offers:

- **Manifesto & Mission**: A welcoming space that validates the challenges of motherhood
- **Support Toolkit**: Practical resources for those who want to support new mothers
- **Community Guidelines**: A Code of Care that centers empathy, consent, and safety
- **Multilingual Access**: Full support for English and Portuguese speakers

### Design Philosophy

The project embraces simplicity and accessibility:
- **Zero barriers to entry**: No accounts, no apps, no complicated onboarding
- **Privacy-first**: Anonymous connection options with clear safety guidelines
- **Culturally responsive**: Bilingual content honoring diverse maternal experiences
- **Accessible by design**: Keyboard navigation, screen reader support, reduced motion support

---

## Tech Stack

Built with simplicity and maintainability in mind:

- **[Eleventy](https://www.11ty.dev/)** - Minimal static site generator
- **Nunjucks** templates for reusable components and layouts
- **Vanilla JavaScript** (ES6+) - No runtime frameworks
- **CSS3** with custom properties for theming
- **Dynamic i18n** system for seamless language switching
- **Mobile-first responsive design**
- **GitHub Pages** for zero-cost hosting

### Project Structure

```
mamacircle/
├── src/                    # Source templates
│   ├── _includes/         # Nunjucks layouts & components
│   │   ├── layouts/      # Page templates
│   │   └── components/   # Reusable UI components
│   ├── index.njk         # Homepage template
│   ├── toolkit.njk       # Support toolkit template
│   ├── code-of-care.njk  # Community guidelines
│   └── privacy.njk       # Privacy policy
├── lang/                  # Translation files (en.json, pt.json)
├── assets/                # Images and static files
├── script.js              # Client-side JavaScript
├── style.css              # Global styles
└── _site/                 # Generated output (not tracked in git)
```

### Key Features

- 🌍 **Bilingual Support**: Switch between English and Portuguese
- ♿ **Accessible**: WCAG 2.1 AA compliant with ARIA labels and keyboard navigation
- 📱 **Responsive**: Optimized for all screen sizes
- 🎨 **Themeable**: CSS custom properties for easy visual customization
- 🎠 **Interactive Components**: Testimonial carousel, tabbed content, smooth scroll
- 🧩 **Component-based**: Modular Nunjucks templates for maintainability

---

## Contributing

We welcome contributions that improve accessibility, add language support, or enhance the user experience.

**To contribute:**
1. Fork the repository and create a feature branch
2. Make changes in the `src/` directory (edit `.njk` templates, not generated HTML)
3. Test locally with `npm start` to ensure changes work correctly
4. Build with `npm run build` to verify production output
5. Submit a pull request with a clear description

**Important:** Edit source files in `src/`, not the generated files in `_site/` or at the project root. The HTML files at root are generated from templates and will be overwritten on build.

---

## Development

### Prerequisites

- Node.js (v14 or higher)
- npm

### Getting Started

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm start
   ```

   This runs Eleventy with live reload at [http://localhost:8080](http://localhost:8080)

3. **Build for production:**
   ```bash
   npm run build
   ```

   Outputs to the `_site/` directory

### Testing Languages

Add language parameter to any page:
- English: `?lang=en`
- Portuguese: `?lang=pt`

### Clean Build

To remove generated files:
```bash
npm run clean
```

---

Made with care for mamas everywhere 💞
