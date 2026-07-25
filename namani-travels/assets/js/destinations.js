const DESTINATIONS = [
  {
    "id": "singapore",
    "name": "Singapore",
    "country": "Singapore",
    "vibe": "city",
    "blurb": "Futuristic skyline, hawker feasts, and gardens that glow after dark.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District%2C_Singapore%2C_at_dusk_-_20120805.jpg/1280px-Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District%2C_Singapore%2C_at_dusk_-_20120805.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2a/Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District%2C_Singapore%2C_at_dusk_-_20120805.jpg/1920px-Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District%2C_Singapore%2C_at_dusk_-_20120805.jpg",
    "credit": "Nicolas Lannuzel",
    "license": "CC BY-SA 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Marina_Bay_Sands_and_the_skyline_of_the_Central_Business_District,_Singapore,_at_dusk_-_20120805.jpg"
  },
  {
    "id": "dubai",
    "name": "Dubai",
    "country": "United Arab Emirates",
    "vibe": "city",
    "blurb": "Desert glamour, record-breaking towers, and rooftop everything.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg/1280px-Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/4/46/Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg/1920px-Dubai_Skyline_mit_Burj_Khalifa_%28cropped%29.jpg",
    "credit": "Tim Reckmann",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Dubai_Skyline_mit_Burj_Khalifa_(cropped).jpg"
  },
  {
    "id": "tokyo",
    "name": "Tokyo",
    "country": "Japan",
    "vibe": "city",
    "blurb": "Neon streets by night, quiet temples by morning.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower%2C_Ebisu%2C_Tokyo%2C_Japan%2C_2024_May.jpg/1280px-Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower%2C_Ebisu%2C_Tokyo%2C_Japan%2C_2024_May.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b0/Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower%2C_Ebisu%2C_Tokyo%2C_Japan%2C_2024_May.jpg/1920px-Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower%2C_Ebisu%2C_Tokyo%2C_Japan%2C_2024_May.jpg",
    "credit": "Simo Räsänen (Ximonic)",
    "license": "CC BY-SA 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Shibuya_and_Shinjuku_from_Yebisu_Garden_Place_Tower,_Ebisu,_Tokyo,_Japan,_2024_May.jpg"
  },
  {
    "id": "doha",
    "name": "Doha",
    "country": "Qatar",
    "vibe": "culture",
    "blurb": "Islamic art, desert dunes, and a skyline built on ambition.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Museum_of_Islamic_Art%2C_Doha_-_54726299556.jpg/1280px-Museum_of_Islamic_Art%2C_Doha_-_54726299556.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Museum_of_Islamic_Art%2C_Doha_-_54726299556.jpg/1920px-Museum_of_Islamic_Art%2C_Doha_-_54726299556.jpg",
    "credit": "Ninara",
    "license": "CC BY 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Museum_of_Islamic_Art,_Doha_-_54726299556.jpg"
  },
  {
    "id": "seoul",
    "name": "Seoul",
    "country": "South Korea",
    "vibe": "city",
    "blurb": "Palace courtyards, K-culture energy, and 24-hour street food.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Skyline_view_from_Seoul_City_%28South_Korea%29.jpg/1280px-Skyline_view_from_Seoul_City_%28South_Korea%29.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bb/Skyline_view_from_Seoul_City_%28South_Korea%29.jpg/1920px-Skyline_view_from_Seoul_City_%28South_Korea%29.jpg",
    "credit": "Laurie Nevay",
    "license": "CC BY-SA 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Skyline_view_from_Seoul_City_(South_Korea).jpg"
  },
  {
    "id": "cape-town",
    "name": "Cape Town",
    "country": "South Africa",
    "vibe": "adventure",
    "blurb": "Table Mountain sunsets, wine country, and wild coastline.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tablemountain_Cape_Town.jpg/1280px-Tablemountain_Cape_Town.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ad/Tablemountain_Cape_Town.jpg/1920px-Tablemountain_Cape_Town.jpg",
    "credit": "Coda.coza",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Tablemountain_Cape_Town.jpg"
  },
  {
    "id": "bali",
    "name": "Bali",
    "country": "Indonesia",
    "vibe": "beach",
    "blurb": "Emerald rice terraces, temple sunrises, and barefoot beach days.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Bali%2C_rice_terraces_1.jpg/1280px-Bali%2C_rice_terraces_1.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Bali%2C_rice_terraces_1.jpg/1920px-Bali%2C_rice_terraces_1.jpg",
    "credit": "Schnobby",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Bali,_rice_terraces_1.jpg"
  },
  {
    "id": "seychelles",
    "name": "Seychelles",
    "country": "Seychelles",
    "vibe": "beach",
    "blurb": "Powder-white sand, granite boulders, turquoise everything.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Anse_Lazio_Beach%2C_Seychelles_%2838720921075%29.jpg/1280px-Anse_Lazio_Beach%2C_Seychelles_%2838720921075%29.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Anse_Lazio_Beach%2C_Seychelles_%2838720921075%29.jpg/1920px-Anse_Lazio_Beach%2C_Seychelles_%2838720921075%29.jpg",
    "credit": "dronepicr",
    "license": "CC BY 2.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Anse_Lazio_Beach,_Seychelles_(38720921075).jpg"
  },
  {
    "id": "kenya",
    "name": "Kenya",
    "country": "Kenya",
    "vibe": "adventure",
    "blurb": "Maasai Mara game drives and the Great Migration up close.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Maasai_Mara_National_Reserve_Kenya.jpg/1280px-Maasai_Mara_National_Reserve_Kenya.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Maasai_Mara_National_Reserve_Kenya.jpg/1920px-Maasai_Mara_National_Reserve_Kenya.jpg",
    "credit": "Svein-Magne Tunli",
    "license": "CC BY-SA 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Maasai_Mara_National_Reserve_Kenya.jpg"
  },
  {
    "id": "tanzania",
    "name": "Tanzania",
    "country": "Tanzania",
    "vibe": "adventure",
    "blurb": "Serengeti horizons, Kilimanjaro views, safari season all year.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Wildebeest_Migration_in_Serengeti_National_Park%2C_Tanzania.jpg/1280px-Wildebeest_Migration_in_Serengeti_National_Park%2C_Tanzania.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6a/Wildebeest_Migration_in_Serengeti_National_Park%2C_Tanzania.jpg/1920px-Wildebeest_Migration_in_Serengeti_National_Park%2C_Tanzania.jpg",
    "credit": "Daniel Rosengren",
    "license": "CC BY 4.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Wildebeest_Migration_in_Serengeti_National_Park,_Tanzania.jpg"
  },
  {
    "id": "santorini",
    "name": "Santorini",
    "country": "Greece",
    "vibe": "culture",
    "blurb": "Whitewashed cliffs, blue domes, and the best sunset in Europe.",
    "img": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg/1280px-Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg",
    "imgLarge": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6d/Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg/1920px-Panoramic_view_of_Oia%2C_Santorini_island_%28Thira%29%2C_Greece.jpg",
    "credit": "Mstyslav Chernov",
    "license": "CC BY-SA 3.0",
    "creditUrl": "https://commons.wikimedia.org/wiki/File:Panoramic_view_of_Oia,_Santorini_island_(Thira),_Greece.jpg"
  }
];

const VIBES = {
  beach: { label: 'Beach', badge: 'badge--beach', icon: '🏖️', desc: 'Slow mornings, warm water, zero itinerary.' },
  city: { label: 'City Escape', badge: 'badge--city', icon: '🏙️', desc: 'Skylines, food scenes, a city that never sits still.' },
  adventure: { label: 'Adventure', badge: 'badge--adventure', icon: '🧭', desc: 'Wide open spaces and stories worth retelling.' },
  culture: { label: 'Culture', badge: 'badge--culture', icon: '🏛️', desc: 'History, art, and traditions worth slowing down for.' },
};

function destinationsByVibe(vibe) {
  if (!vibe || vibe === 'all') return DESTINATIONS;
  return DESTINATIONS.filter((d) => d.vibe === vibe);
}

function getDestination(id) {
  return DESTINATIONS.find((d) => d.id === id);
}

function destinationCardHtml(d) {
  const v = VIBES[d.vibe];
  return `
    <div class="card">
      <div class="card__media">
        <span class="badge ${v.badge} card__badge">${v.icon} ${v.label}</span>
        <img src="${d.img}" alt="${d.name}, ${d.country}" loading="lazy" />
      </div>
      <div class="card__body">
        <h3>${d.name}</h3>
        <p style="margin:0;">${d.blurb}</p>
        <div class="card__meta">
          <span>${d.country}</span>
          <a href="search.html?to=${encodeURIComponent(d.name)}" class="btn btn-ghost btn-sm" style="padding:6px 4px;">Plan trip →</a>
        </div>
      </div>
    </div>
  `;
}
