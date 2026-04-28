# Smoak Salon Static Website

This is a mobile-first static redesign for Smoak Salon, ready for GitHub Pages or any static host.

## Files

- Main pages live at the project root: `index.html`, `about.html`, `services.html`, `team.html`, `testimonials.html`, `careers.html`, `special-offers.html`, `policies.html`, `faq.html`, `employees.html`, `privacy.html`, and `terms.html`.
- Shared styling is in `assets/css/styles.css`.
- Shared navigation, footer, testimonials filtering, mobile menu, and cookie consent are in `assets/js/main.js`.
- Placeholder image assets are in `assets/img/`.

## Update Images

Replace the SVG placeholders in `assets/img/` with real salon photography using the same filenames, or update the image paths in the HTML. Team images are clearly named by stylist. Keep images compressed and use the same approximate aspect ratios for best results.

## Google Analytics 4

Open `assets/js/main.js` and replace:

```js
const GA4_ID = 'G-XXXXXXXXXX';
```

Analytics will not load until a visitor accepts analytics cookies. The cookie banner stores consent in `localStorage`.

## Booking Link

The current booking URL is:

```text
https://smoaksalon.glossgenius.com/
```

To change it globally, update `BOOKING_URL` in `assets/js/main.js` and any static links in the HTML if needed.

## Editing Content

- Services: edit the service sections in `services.html`.
- Offers: edit the offer cards in `special-offers.html`.
- Testimonials: edit testimonial cards in `testimonials.html`.
- Team members: edit profile cards in `team.html` and replace the matching images in `assets/img/`.
- Policies and FAQ: edit `policies.html` and `faq.html`.

## GitHub Pages

1. Create a GitHub repository.
2. Upload these files with `index.html` at the repository root.
3. In GitHub, go to Settings > Pages.
4. Choose the main branch and root folder.
5. Save, then wait for GitHub Pages to publish.

## SEO Notes

The site includes unique titles and meta descriptions, Open Graph tags, Twitter card tags, canonical tags, schema markup, `robots.txt`, and `sitemap.xml`. Update canonical URLs if the site launches on a different domain.
