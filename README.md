# KRK Plumbing

A responsive React + Vite + Tailwind CSS website for KRK Plumbing. Booking, callback and contact forms prepare a message that opens in the visitor's own WhatsApp or email app, and festival greetings are read automatically from a Google Drive folder. There is no backend and no third-party email service.

## Run locally

```bash
pnpm install
pnpm dev
```

Build for production with `pnpm build`. The site deploys to Vercel as a static Vite app (`vercel.json` handles SPA routing).

## Configuration

All business settings live in `src/config/businessConfig.js`: business name, domain, phone, email, WhatsApp number, address, service areas, working hours, Google Maps embed URL, social links, and the Google Drive folder ID and API key. Empty values are hidden in the UI, so the site never shows made-up details.

### How forms work

Each form validates the input, then shows a review screen with the prepared message and three actions: send on WhatsApp, send by email (`mailto:`), or copy the message. Nothing is sent automatically, which means no API keys or email service are needed.

### Festival greetings

1. Create a Google Drive folder with the greeting images and share it as "Anyone with the link can view".
2. Name each image with the festival and date, for example `Diwali-2026-11-08.jpg` or `Pongal-01-14.png` (see `src/utils/googleDriveUtils.js` for the accepted patterns).
3. Create a browser API key in Google Cloud, enable only the Google Drive API, and restrict it to your website's HTTP referrers (`https://krkplumbing.site/*`).
4. Set `googleDriveFolderId` and `googleDriveApiKey` in `businessConfig.js`.

The site refreshes the list on a timer, so uploading a new image needs no code change or redeploy. The API key is public by design; never put OAuth secrets or service account credentials in this file.

## Structure

- `src/config`: business configuration
- `src/utils`: validation, date, booking message, email/WhatsApp link and Drive helpers
- `src/hooks`: form state, festival greetings and section navigation
- `src/components`: page sections, forms, booking modal, review screen, festival banner and carousel
