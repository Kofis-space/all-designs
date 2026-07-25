# Namani Travels — Go-Live Guide

This is written for a non-technical owner. No coding required — just copying, pasting, and clicking "Deploy" a few times. Budget about 45–60 minutes for everything.

## What you have

A 5-page website, fully responsive, with light/dark mode:

- `index.html` — Home (hero, skippable "what kind of traveler are you" gate, search widget, destination preview, testimonials)
- `search.html` — Plan a Trip (search widget → quote/contact capture reveals inline, no separate page)
- `destinations.html` — Explore (destinations grid + travel journal + testimonials, with photo credits)
- `about.html` — About & Contact (brand story + WhatsApp/Instagram contact block)
- `privacy.html` — Privacy Policy & Terms (linked from the footer only, not the main nav)

Everything you'll actually need to edit lives in **one file**: `assets/js/config.js`.

---

## Step 0 — Preview it right now

You don't need to install anything to look at the site. Just double-click `index.html` and it opens in your browser. Click around, toggle dark mode (the little sun/moon switch in the top right), and shrink your browser window to see the mobile layout.

**One thing that won't work yet:** the "Get Your Quote" form won't actually send anywhere until you do Steps 3 and 4 below.

---

## Step 1 — Set your WhatsApp number

Open `assets/js/config.js` in any text editor (Notepad, TextEdit, or VS Code). Find this line near the top:

```js
whatsappNumber: '2348000000000',
```

Replace it with your real WhatsApp Business number — **country code + number, digits only, no `+`, no spaces, no dashes**. For example, a Nigerian number `+234 801 234 5678` becomes:

```js
whatsappNumber: '2348012345678',
```

Save the file. Every "Message Us on WhatsApp" button and the floating chat bubble now points to your real number, pre-filled with a friendly opening message.

---

## Step 2 — Update your Instagram handle and email

Still in `config.js`, update:

```js
instagramHandle: '@namanitravels',
instagramUrl: 'https://instagram.com/namanitravels',
```

And search for `hello@namanitravels.com` across `about.html`, `privacy.html`, and `assets/js/common.js` — replace with your real email address (use your editor's "Find in Files" / "Find All" feature).

---

## Step 3 — Connect the quote form to your inbox (Formspree)

This makes every "Get Your Quote" submission land in your email.

1. Go to [formspree.io](https://formspree.io) and create a free account.
2. Click **New Form**, name it "Namani Quote Requests", and set the email to wherever you want leads delivered.
3. Formspree gives you a form endpoint that looks like `https://formspree.io/f/abcd1234`.
4. Open `assets/js/config.js` and paste it in:

```js
formspreeEndpoint: 'https://formspree.io/f/abcd1234',
```

That's it — Formspree's free plan covers up to 50 submissions/month, which is plenty to start.

---

## Step 4 — Log every lead to a Google Sheet

This gives you a running, sortable spreadsheet of every request — handy for follow-up and reporting.

1. Create a new Google Sheet. In row 1, add these column headers exactly:
   `Timestamp | Trip Type | From | To | Depart | Return | Adults | Children | Infants | Cabin | Special Requests | Traveler Type Match | Email | Phone`
2. In the Sheet, go to **Extensions → Apps Script**. Delete anything in the editor and paste this:

```js
function doPost(e) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = JSON.parse(e.postData.contents);
  sheet.appendRow([
    new Date(),
    data.trip || '',
    data.from || '',
    data.to || '',
    data.depart || '',
    data.ret || '',
    data.adults || '',
    data.children || '',
    data.infants || '',
    data.cabin || '',
    data.requests || '',
    data.quizMatch || '',
    data.email || '',
    data.phone || '',
  ]);
  return ContentService.createTextOutput(JSON.stringify({ status: 'ok' }))
    .setMimeType(ContentService.MimeType.JSON);
}
```

`Special Requests` carries any flags a traveller checked in Advanced Search (unaccompanied minor, group trip, accessibility needs, corporate travel) — worth scanning for on every new row so the right person picks up the request. `Traveler Type Match` is filled in only when the lead came through the homepage "what kind of traveler are you" quiz.

3. Click **Deploy → New deployment**. For "Select type", choose **Web app**.
4. Set **Execute as**: Me. Set **Who has access**: Anyone.
5. Click **Deploy**, authorize the permissions Google asks for, then copy the **Web app URL** it gives you (ends in `/exec`).
6. Paste it into `assets/js/config.js`:

```js
googleSheetsWebAppUrl: 'https://script.google.com/macros/s/AKfycb.../exec',
```

Every quote request now appends a new row to your sheet **and** emails you via Formspree — belt and suspenders.

> **If you ever update the Apps Script code**, you must create a **new deployment** (or use "Manage deployments → Edit → New version") for changes to take effect — just saving the script isn't enough.

---

## Step 5 — Put it on the internet (Netlify — free, ~5 minutes)

1. Go to [netlify.com](https://www.netlify.com) and sign up (free plan is plenty).
2. On your dashboard, find the box that says **"Drag and drop your site folder here"**.
3. Drag your entire `namani-travels` folder into it.
4. Netlify uploads it and gives you a live URL like `https://random-name-123.netlify.app` within seconds.
5. To use your own domain (e.g. `namanitravels.com`): go to **Site settings → Domain management → Add a custom domain**, then follow Netlify's instructions to point your domain's DNS at Netlify (usually 2–4 records you add at wherever you bought the domain — GoDaddy, Namecheap, etc).

**Alternative:** Vercel and GitHub Pages work the same way (drag-and-drop or connect a repo) if you prefer either of those.

**Updating the live site later:** any time you edit a file, just drag the folder into Netlify again (or use their "Deploys" tab to redeploy) — no rebuild step needed, it's a plain HTML/CSS/JS site.

---

## Step 6 — Connect your real Instagram feed (optional, ~5 minutes)

The Contact section (bottom of the About & Contact page) currently shows placeholder travel photos in an Instagram-style grid. To show your *actual* Instagram posts:

1. Sign up at [snapwidget.com](https://snapwidget.com) (or elfsight.com) — free tier available.
2. Connect your Instagram account and choose a grid-style widget.
3. They'll give you an embed `<iframe>` snippet.
4. Open `about.html`, find the `<div class="instagram-embed">...</div>` block, and replace it with the snippet they gave you.

---

## Step 7 — Set up ads (Meta / Google) compliance

Both Meta and Google require a visible Privacy Policy before you can run ads collecting personal data — you already have one at `privacy.html`. Before running ads:

1. Open `privacy.html` and replace `[insert date when you publish this page]` with today's date.
2. Have a lawyer (even a quick paid consult) sanity-check the policy against your country's data protection law — it's written as a plain-language starting point, not legal advice.
3. If Meta/Google give you a "pixel" tracking snippet, paste it right before the `</head>` tag in every HTML page (yes, all 5 — this is a plain HTML site, there's no shared template file). Ask your ad platform's support if you get stuck; this part is copy-paste from their dashboard.

---

## Step 8 — Test everything before sending traffic

Go through this checklist live on your Netlify URL:

- [ ] Home page loads: passport intro plays once, then the "what kind of traveler are you" gate appears — try both Skip and answering it
- [ ] Toggle dark mode — check it looks right on every page, not just Home
- [ ] Shrink the browser (or open on your phone) — menu collapses into the mobile drawer correctly
- [ ] On `search.html`, try every cabin class button (Economy/Premium/Business/First) and confirm it's obviously selectable
- [ ] Submit a search → confirm the quote panel reveals inline (no page reload) with your route/dates/class shown correctly
- [ ] Check a special request (e.g. "Group trip") and confirm it shows up in the quote summary
- [ ] Take the traveler-type quiz on Home → confirm the matched destination shows when you land on `search.html`
- [ ] On the quiz, pick "Business trip" → confirm it routes to a corporate result and pre-sets Business class + the Corporate travel flag on `search.html`
- [ ] Submit the quote form with a real email/phone → check it arrives in your email (Formspree) **and** appears as a new row in your Google Sheet
- [ ] Click every WhatsApp button/bubble → confirm it opens WhatsApp with your number and a sensible pre-filled message
- [ ] Click through to Explore (`destinations.html`), filter by each category (Beach/City/Adventure/Culture), and scroll down to confirm the Stories section is there too
- [ ] Check `about.html` — confirm the Contact block near the bottom works
- [ ] Check `privacy.html` reads correctly and the date is updated
- [ ] Footer's "Retake Traveler Quiz" link reopens the gate from any page

---

## Optional: grow the airport list

The search bar currently recognizes about 120 major world airports (enough to demo and launch with). If a customer searches a smaller city and doesn't find it, that's why. To add more airports:

1. Open `assets/js/airports.js`.
2. Add more entries to the `AIRPORTS` array, following the same format:
   ```js
   { code: 'XYZ', city: 'City Name', country: 'Country', airport: 'Airport Name' },
   ```
3. For a truly exhaustive list, search for a free "IATA airport codes CSV/JSON" dataset online (e.g. OpenFlights.org's airport database) and have a developer import it into this same format.

---

## Questions?

Everything customer-facing lives in the 5 HTML files at the root of this folder. Everything you're likely to actually need to touch — phone number, email, links — lives in `assets/js/config.js`. If something breaks, that's the first file to check.
