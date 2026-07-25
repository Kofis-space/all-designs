// ============================================================
// Namani Travels — SITE CONFIG
// Edit the values below to go live. See SETUP.md for the full
// step-by-step guide (WhatsApp number, Formspree, Google Sheets).
// ============================================================

const SITE_CONFIG = {
  // Full international format, digits only, no + no spaces (e.g. Nigeria number: "2348012345678")
  whatsappNumber: '2348000000000',

  // Default pre-filled WhatsApp message. {trip} is replaced with a trip summary when available.
  whatsappMessage: "Hi Namani Travels! I'm interested in booking a trip.{trip}",

  // Formspree form endpoint — replace with your real form ID from formspree.io (Step 3 in SETUP.md)
  formspreeEndpoint: 'https://formspree.io/f/YOUR_FORM_ID',

  // Google Apps Script Web App URL that appends leads to a Google Sheet (Step 4 in SETUP.md)
  googleSheetsWebAppUrl: 'https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec',

  instagramHandle: '@namanitravels',
  instagramUrl: 'https://instagram.com/namanitravels',

  brandName: 'Namani Travels',
  supportHoursNote: 'within 24 hours (Mon–Sat)',
};

function buildWhatsAppLink(customMessage) {
  const text = encodeURIComponent(customMessage || SITE_CONFIG.whatsappMessage.replace('{trip}', ''));
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
}
