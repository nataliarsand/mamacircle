# Mama Circle

Mama Circle is a static website that creates a grassroots space where mothers can gently connect and support one another.

## Project Structure

- `index.html` – Main landing page introducing the project and its manifesto.
- `toolkit.html` – Resource toolkit for participants.
- `code-of-care.html` – Guidelines and community principles.
- `style.css` – Global styles, including color themes and layout.
- `script.js` – Client-side logic for internationalization, tabs, carousel, and navigation.
- `lang/` – JSON files with English (`en.json`) and Portuguese (`pt.json`) translations.
- `assets/` – Images and icons used across the site.
- Other assets such as `sitemap.xml`, `robots.txt`, and favicon files support deployment.

## Running Locally

The site uses fetch requests to load translation files, so it needs to be served over HTTP.

```bash
# Clone and enter the repository
 git clone <repository-url>
 cd mamacircle

# Start a local web server (Python 3)
 python3 -m http.server 8000
```

Open your browser to [http://localhost:8000/index.html](http://localhost:8000/index.html) to view the site.

### Language and Theme

The interface language defaults to English but can be switched using the `lang` query parameter:

```
http://localhost:8000/index.html?lang=pt
```

A `theme` parameter can also be provided to change the color theme, e.g. `?theme=blue`.

## Contributing

Feel free to open issues or pull requests for improvements to the content, translations, or styling. All pages are plain HTML/CSS/JS and can be edited directly.

