// vibe is an array so a destination can live in more than one category
// (e.g. Cape Town is both an Adventure and a Honeymoon pick).
const DESTINATIONS = [
  {
    "id": "singapore",
    "name": "Singapore",
    "country": "Singapore",
    "vibe": ["city"],
    "blurb": "Futuristic skyline, hawker feasts, and gardens that glow after dark.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District%2C_Singapore%2C_at_dusk_-_20120805.jpg/1920px-Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District%2C_Singapore%2C_at_dusk_-_20120805.jpg",
    "credit": "Nicolas Lannuzel",
    "license": "CC BY-SA 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District,_Singapore,_at_dusk_-_20120805.jpg"
  },
  {
    "id": "dubai",
    "name": "Dubai",
    "country": "United Arab Emirates",
    "vibe": ["city"],
    "blurb": "Desert glamour, record-breaking towers, and rooftop everything.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg/1920px-Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg",
    "credit": "Tim Reckmann",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Dubai_Skyline_mit_Burj_Khalifa_(cropped).jpg"
  },
  {
    "id": "tokyo",
    "name": "Tokyo",
    "country": "Japan",
    "vibe": ["city"],
    "blurb": "Neon streets by night, quiet temples by morning.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower%2C_Ebisu%2C_Tokyo%2C_Japan%2C_2024_May.jpg/1920px-Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower%2C_Ebisu%2C_Tokyo%2C_Japan%2C_2024_May.jpg",
    "credit": "Simo Räsänen (Ximonic)",
    "license": "CC BY-SA 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower,_Ebisu,_Tokyo,_Japan,_2024_May.jpg"
  },
  {
    "id": "doha",
    "name": "Doha",
    "country": "Qatar",
    "vibe": ["adventure"],
    "blurb": "Islamic art, desert dunes, and a skyline built on ambition.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Museum_of_Islamic_Art%2C_Doha_-_54726299556.jpg/1920px-Museum_of_Islamic_Art%2C_Doha_-_54726299556.jpg",
    "credit": "Ninara",
    "license": "CC BY 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Museum_of_Islamic_Art,_Doha_-_54726299556.jpg"
  },
  {
    "id": "cape-town",
    "name": "Cape Town",
    "country": "South Africa",
    "vibe": ["adventure", "honeymoon"],
    "blurb": "Table Mountain sunsets, wine country, and wild coastline.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tablemountain_Cape_Town.jpg/1920px-Tablemountain_Cape_Town.jpg",
    "credit": "Coda.coza",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Tablemountain_Cape_Town.jpg"
  },
  {
    "id": "bali",
    "name": "Bali",
    "country": "Indonesia",
    "vibe": ["honeymoon"],
    "blurb": "Emerald rice terraces, temple sunrises, and barefoot beach days.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Bali%2C_rice_terraces_1.jpg/1920px-Bali%2C_rice_terraces_1.jpg",
    "credit": "Schnobby",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Bali,_rice_terraces_1.jpg"
  },
  {
    "id": "seychelles",
    "name": "Seychelles",
    "country": "Seychelles",
    "vibe": ["beach"],
    "blurb": "Powder-white sand, granite boulders, turquoise everything.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Anse_Lazio_Beach%2C_Seychelles_%2838720921075%29.jpg/1920px-Anse_Lazio_Beach%2C_Seychelles_%2838720921075%29.jpg",
    "credit": "dronepicr",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Anse_Lazio_Beach,_Seychelles_(38720921075).jpg"
  },
  {
    "id": "mauritius",
    "name": "Mauritius",
    "country": "Mauritius",
    "vibe": ["beach"],
    "blurb": "Powdered sand meets impossibly layered blues at every lagoon.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/10/Trou_aux_Biches_Beach_in_Mauritius%2C_a_view_from_the_north_%2853698229530%29.jpg/1920px-Trou_aux_Biches_Beach_in_Mauritius%2C_a_view_from_the_north_%2853698229530%29.jpg",
    "credit": "dronepicr",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Trou_aux_Biches_Beach_in_Mauritius,_a_view_from_the_north_(53698229530).jpg"
  },
  {
    "id": "maldives",
    "name": "Maldives",
    "country": "Maldives",
    "vibe": ["beach"],
    "blurb": "Stilted villas hover above glass-clear water and coral atolls.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/32/Diamonds_Thudufushi_Beach_and_Water_Villas%2C_May_2017_-08.jpg/1920px-Diamonds_Thudufushi_Beach_and_Water_Villas%2C_May_2017_-08.jpg",
    "credit": "Martin Falbisoner",
    "license": "CC BY-SA 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Diamonds_Thudufushi_Beach_and_Water_Villas,_May_2017_-08.jpg"
  },
  {
    "id": "nairobi",
    "name": "Nairobi",
    "country": "Kenya",
    "vibe": ["adventure"],
    "blurb": "Wildlife grazing wild against glass towers — safari and city, one skyline.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3a/A_giraffe_with_a_beautiful_background_of_Nairobi_City_Skyline_%28cropped%29.jpg/1920px-A_giraffe_with_a_beautiful_background_of_Nairobi_City_Skyline_%28cropped%29.jpg",
    "credit": "Alexmbogo",
    "license": "CC BY-SA 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:A_giraffe_with_a_beautiful_background_of_Nairobi_City_Skyline_(cropped).jpg"
  },
  {
    "id": "zanzibar",
    "name": "Zanzibar",
    "country": "Tanzania",
    "vibe": ["adventure"],
    "blurb": "Carved wooden doors and coral-stone alleys steeped in spice-trade history.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c8/Stone_Town%2C_Zanzibar-3.jpg/1920px-Stone_Town%2C_Zanzibar-3.jpg",
    "credit": "David Berkowitz",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Stone_Town,_Zanzibar-3.jpg"
  },
  {
    "id": "serengeti",
    "name": "Serengeti",
    "country": "Tanzania",
    "vibe": ["honeymoon"],
    "blurb": "Endless horizons and the Great Migration, best shared with someone.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Wildebeest_Migration_in_Serengeti_National_Park%2C_Tanzania.jpg/1920px-Wildebeest_Migration_in_Serengeti_National_Park%2C_Tanzania.jpg",
    "credit": "Daniel Rosengren",
    "license": "CC BY 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Wildebeest_Migration_in_Serengeti_National_Park,_Tanzania.jpg"
  },
  {
    "id": "santorini",
    "name": "Santorini",
    "country": "Greece",
    "vibe": ["honeymoon"],
    "blurb": "Whitewashed cliffs, blue domes, and the best sunset in Europe.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg/1920px-Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg",
    "credit": "Mstyslav Chernov",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Oia,_Santorini_island_(Thira),_Greece.jpg"
  },
  {
    "id": "bora-bora",
    "name": "Bora Bora",
    "country": "French Polynesia",
    "vibe": ["honeymoon"],
    "blurb": "A lagoon so vivid it seems lit from within, ringed by a distant reef.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Bora_Bora_%2816542797633%29.jpg/1920px-Bora_Bora_%2816542797633%29.jpg",
    "credit": "The TerraMar Project",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Bora_Bora_(16542797633).jpg"
  },
  {
    "id": "st-lucia",
    "name": "St Lucia",
    "country": "Saint Lucia",
    "vibe": ["honeymoon"],
    "blurb": "Twin volcanic spires plunge into the Caribbean like green sentinels.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/3/37/Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG/1920px-Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG",
    "credit": "Aneil Lutchman",
    "license": "CC BY-SA 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Gros_Piton_and_Petit_Piton_in_Saint_Lucia.JPG"
  },
  {
    "id": "london",
    "name": "London",
    "country": "United Kingdom",
    "vibe": ["city"],
    "blurb": "Royal history, world-class theatre, and a skyline that mixes centuries.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c2/London_Skyline_2021.jpg/1920px-London_Skyline_2021.jpg",
    "credit": "Farbades420",
    "license": "CC0 1.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:London_Skyline_2021.jpg"
  },
  {
    "id": "new-york",
    "name": "New York City",
    "country": "United States",
    "vibe": ["city"],
    "blurb": "The city that never sits still — Broadway lights to boardroom views.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/New_York_City_skyline.jpg/1920px-New_York_City_skyline.jpg",
    "credit": "William Warby",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:New_York_City_skyline.jpg"
  },
  {
    "id": "hong-kong",
    "name": "Hong Kong",
    "country": "Hong Kong SAR",
    "vibe": ["city"],
    "blurb": "Harbour views, dim sum, and a financial pulse that never slows.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Hong_Kong_Skyline_%28157974881%29.jpeg/1920px-Hong_Kong_Skyline_%28157974881%29.jpeg",
    "credit": "Mike",
    "license": "CC BY 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Hong_Kong_Skyline_(157974881).jpeg"
  },
  {
    "id": "cape-coast",
    "name": "Cape Coast",
    "country": "Ghana",
    "vibe": ["culture"],
    "blurb": "Whitewashed ramparts overlook Atlantic surf at the historic Cape Coast Castle.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a0/Cape_Coast_Castle%2C_Cape_Coast%2C_Ghana.JPG/1920px-Cape_Coast_Castle%2C_Cape_Coast%2C_Ghana.JPG",
    "credit": "Rjruiziii",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Cape_Coast_Castle,_Cape_Coast,_Ghana.JPG"
  },
  {
    "id": "rome",
    "name": "Rome",
    "country": "Italy",
    "vibe": ["culture"],
    "blurb": "Nearly two thousand years on, the Colosseum still commands the skyline.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/83/Colosseum_-_Rome_-_Italy_%2816800139540%29.jpg/1920px-Colosseum_-_Rome_-_Italy_%2816800139540%29.jpg",
    "credit": "Sam Valadi",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Colosseum_-_Rome_-_Italy_(16800139540).jpg"
  },
  {
    "id": "ouidah",
    "name": "Ouidah",
    "country": "Benin",
    "vibe": ["culture"],
    "blurb": "The Door of No Return stands facing the surf, a solemn piece of history.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2e/Porte_du_non-retour_au_Benin.jpg/1920px-Porte_du_non-retour_au_Benin.jpg",
    "credit": "Borisghost",
    "license": "CC0 1.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Porte_du_non-retour_au_Benin.jpg"
  },
  {
    "id": "lalibela",
    "name": "Lalibela",
    "country": "Ethiopia",
    "vibe": ["culture"],
    "blurb": "Entire churches chiselled downward from solid rock, still standing today.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Rock-Hewn_Churches%2C_Lalibela-107574.jpg/1920px-Rock-Hewn_Churches%2C_Lalibela-107574.jpg",
    "credit": "Francesco Bandarin",
    "license": "CC BY-SA 3.0 IGO",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Rock-Hewn_Churches,_Lalibela-107574.jpg"
  },
  {
    "id": "marrakech",
    "name": "Marrakech",
    "country": "Morocco",
    "vibe": ["culture"],
    "blurb": "Snake charmers, storytellers, and spice smoke fill Jemaa el-Fnaa at dusk.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7f/Maroc_Marrakech_Jemaa-el-Fna_Luc_Viatour.JPG/1920px-Maroc_Marrakech_Jemaa-el-Fna_Luc_Viatour.JPG",
    "credit": "Luc Viatour / https://Lucnix.be",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Maroc_Marrakech_Jemaa-el-Fna_Luc_Viatour.JPG"
  }
];

const VIBES = {
  beach: { label: 'Beach please', badge: 'badge--beach', desc: 'Slow mornings, warm water, zero itinerary.' },
  city: { label: 'City Escape', badge: 'badge--city', desc: 'Skylines, food scenes, a city that never sits still.' },
  adventure: { label: 'Adventures', badge: 'badge--adventure', desc: 'Wide open spaces and stories worth retelling.' },
  honeymoon: { label: 'Honeymoon', badge: 'badge--honeymoon', desc: 'Trips built for two, with the romance left in.' },
  culture: { label: 'Culture', badge: 'badge--culture', desc: 'History, art, and traditions worth slowing down for.' },
};

// Traveler types the intro quiz sorts people into. The four leisure types map
// straight onto a destination vibe; corporate has no destination filter of its
// own — it changes the search defaults (special request + cabin class) instead.
const PERSONAS = {
  adventurer: { label: 'Adventurer', vibe: 'adventure', badge: 'badge--adventure', tagline: 'Wide open spaces and a story worth retelling.' },
  city: { label: 'City Escape', vibe: 'city', badge: 'badge--city', tagline: 'Skylines, food scenes, a place that never slows down.' },
  beach: { label: 'Beach please', vibe: 'beach', badge: 'badge--beach', tagline: 'Slow mornings, warm water, zero itinerary.' },
  culture: { label: 'Culture', vibe: 'culture', badge: 'badge--culture', tagline: 'History, art, and traditions worth slowing down for.' },
  corporate: { label: 'Corporate Traveler', vibe: null, badge: 'badge--corporate', tagline: 'Efficient routing, priority handling, invoicing sorted.' },
};

function destinationsByVibe(vibe) {
  if (!vibe || vibe === 'all') return DESTINATIONS;
  return DESTINATIONS.filter((d) => d.vibe.includes(vibe));
}

function getDestination(id) {
  return DESTINATIONS.find((d) => d.id === id);
}

function destinationCardHtml(d) {
  const badges = d.vibe.map((v) => `<span class="badge ${VIBES[v].badge} card__badge">${iconSpan(v)} ${VIBES[v].label}</span>`).join('');
  return `
    <div class="card">
      <div class="card__media">
        <div class="card__badge-stack">${badges}</div>
        <img src="${d.img}" alt="${d.name}, ${d.country}" loading="lazy" />
      </div>
      <div class="card__body">
        <h3>${d.name}</h3>
        <p style="margin:0;">${d.blurb}</p>
        <div class="card__meta">
          <span>${d.country}</span>
          <a href="index.html?to=${encodeURIComponent(d.name)}#plan-trip" class="btn btn-ghost btn-sm" style="padding:6px 4px;">Plan trip →</a>
        </div>
      </div>
    </div>
  `;
}
