# Half Weekend typography

Half Weekend uses **[Space Grotesk](https://fonts.google.com/specimen/Space+Grotesk)** as its primary typeface and **[Space Mono](https://fonts.google.com/specimen/Space+Mono)** as its utility typeface. Keep this pairing consistent across the website and new Half Weekend materials.

| Use | Typeface | Default weight |
| --- | --- | --- |
| Hero tagline, section headings, body copy | Space Grotesk | 500 for headings, 400 for body copy |
| Navigation, section labels, calls to action, small metadata | Space Mono | 400 |

The Half Weekend logotype is supplied brand artwork. Use the approved image files rather than recreating the lettering with a website font. The website uses the white horizontal logotype in the hero.

The website loads both typefaces from Google Fonts in `index.html`; the `--font-body` and `--font-label` tokens in `style.css` define their roles. Use sensible sans-serif and monospace fallbacks when the web fonts cannot load.
