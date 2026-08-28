# Happy Raksha Bandhan, Aashapurna 💗
A little interactive website — a digital surprise from Manab.

## What's inside
```
index.html        → the site itself
style.css          → all styling/animations
script.js          → all logic + the CUSTOMIZE section at the top
assets/
  photo1.jpg...5.jpg  → her 5 photos, already placed into the story
  music.mp3           → (optional, not included — see below)
  click.mp3, open.mp3, sparkle.mp3 → (optional sound effects, not included)
```

## Running it locally
No install needed. Just double-click `index.html` and it opens in your browser.
(Or right-click → Open with → Chrome.)

## Adding music (optional)
The site works perfectly without music. If you want background music:
1. Get an mp3 file you're allowed to use.
2. Rename it to `music.mp3`.
3. Drop it into the `assets/` folder.
That's it — the 🎵 button will start playing it automatically.

Same idea for sound effects: `assets/click.mp3`, `assets/open.mp3`, `assets/sparkle.mp3` are all optional.

## Changing text/names/messages
Open `script.js` in any text editor (even Notepad). Everything editable is
right at the top, under:
```
==============================
CUSTOMIZE YOUR WEBSITE HERE
==============================
```
You can change:
- `sisterName` / `brotherName`
- the 3 memory card messages (`memoryCards`)
- the gift card message (`giftCardMessage`)
- the 3 "pick one" reveals (`pickMessages`)
- the hidden star easter egg text
- the final lingering secret message

## Changing photos
Replace the files inside `assets/` (keep the same names — `photo1.jpg` etc.)
or edit the `photos` array in `script.js` to point to different filenames.

## Deploying so she can open it on her phone
Easiest option — **Netlify Drop**:
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You'll get a live link in ~10 seconds — send that to her on WhatsApp.

Other options that work the same way:
- **Vercel**: vercel.com → New Project → drag & drop / upload the folder.
- **GitHub Pages**: push this folder to a GitHub repo, then enable Pages in
  repo Settings → Pages → deploy from the main branch.

No backend, no build step — it's a static site, so any of the above works
as-is.

## A note on the photos
Your 5 photos are already placed into the site as part of the story
(intro card, fun scrapbook moment, gift-card frame, cinematic reveal, and
the final floating memory card) — nothing needs to be done there unless
you want to swap them out.
