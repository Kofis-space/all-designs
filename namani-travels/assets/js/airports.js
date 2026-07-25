// ============================================================
// Namani Travels — Airport/city dataset for search autocomplete.
// This is a curated list of ~170 major world airports (enough to
// demo/launch with). For full global IATA coverage, swap this file
// for a complete dataset — see "Grow the airport list" in SETUP.md.
// ============================================================

const AIRPORTS = [
  // West Africa
  { code: 'LOS', city: 'Lagos', country: 'Nigeria', airport: 'Murtala Muhammed International' },
  { code: 'ABV', city: 'Abuja', country: 'Nigeria', airport: 'Nnamdi Azikiwe International' },
  { code: 'PHC', city: 'Port Harcourt', country: 'Nigeria', airport: 'Port Harcourt International' },
  { code: 'ACC', city: 'Accra', country: 'Ghana', airport: 'Kotoka International' },
  { code: 'ABJ', city: 'Abidjan', country: "Côte d'Ivoire", airport: 'Félix-Houphouët-Boigny International' },
  { code: 'DKR', city: 'Dakar', country: 'Senegal', airport: 'Blaise Diagne International' },
  { code: 'COO', city: 'Cotonou', country: 'Benin', airport: 'Cadjehoun Airport' },
  { code: 'LFW', city: 'Lomé', country: 'Togo', airport: 'Lomé–Tokoin International' },

  // North & East Africa
  { code: 'CAI', city: 'Cairo', country: 'Egypt', airport: 'Cairo International' },
  { code: 'CMN', city: 'Casablanca', country: 'Morocco', airport: 'Mohammed V International' },
  { code: 'RAK', city: 'Marrakech', country: 'Morocco', airport: 'Marrakech Menara' },
  { code: 'TUN', city: 'Tunis', country: 'Tunisia', airport: 'Tunis–Carthage International' },
  { code: 'ADD', city: 'Addis Ababa', country: 'Ethiopia', airport: 'Bole International' },
  { code: 'NBO', city: 'Nairobi', country: 'Kenya', airport: 'Jomo Kenyatta International' },
  { code: 'MBA', city: 'Mombasa', country: 'Kenya', airport: 'Moi International' },
  { code: 'DAR', city: 'Dar es Salaam', country: 'Tanzania', airport: 'Julius Nyerere International' },
  { code: 'JRO', city: 'Kilimanjaro', country: 'Tanzania', airport: 'Kilimanjaro International' },
  { code: 'ZNZ', city: 'Zanzibar', country: 'Tanzania', airport: 'Abeid Amani Karume International' },
  { code: 'EBB', city: 'Entebbe', country: 'Uganda', airport: 'Entebbe International' },
  { code: 'KGL', city: 'Kigali', country: 'Rwanda', airport: 'Kigali International' },

  // Southern Africa
  { code: 'JNB', city: 'Johannesburg', country: 'South Africa', airport: 'O.R. Tambo International' },
  { code: 'CPT', city: 'Cape Town', country: 'South Africa', airport: 'Cape Town International' },
  { code: 'DUR', city: 'Durban', country: 'South Africa', airport: 'King Shaka International' },
  { code: 'WDH', city: 'Windhoek', country: 'Namibia', airport: 'Hosea Kutako International' },
  { code: 'MRU', city: 'Port Louis', country: 'Mauritius', airport: 'Sir Seewoosagur Ramgoolam International' },
  { code: 'SEZ', city: 'Mahé', country: 'Seychelles', airport: 'Seychelles International' },
  { code: 'TNR', city: 'Antananarivo', country: 'Madagascar', airport: "Ivato International" },

  // Middle East
  { code: 'DXB', city: 'Dubai', country: 'United Arab Emirates', airport: 'Dubai International' },
  { code: 'AUH', city: 'Abu Dhabi', country: 'United Arab Emirates', airport: 'Zayed International' },
  { code: 'DOH', city: 'Doha', country: 'Qatar', airport: 'Hamad International' },
  { code: 'RUH', city: 'Riyadh', country: 'Saudi Arabia', airport: 'King Khalid International' },
  { code: 'JED', city: 'Jeddah', country: 'Saudi Arabia', airport: 'King Abdulaziz International' },
  { code: 'MED', city: 'Medina', country: 'Saudi Arabia', airport: 'Prince Mohammad bin Abdulaziz' },
  { code: 'BAH', city: 'Manama', country: 'Bahrain', airport: 'Bahrain International' },
  { code: 'KWI', city: 'Kuwait City', country: 'Kuwait', airport: 'Kuwait International' },
  { code: 'MCT', city: 'Muscat', country: 'Oman', airport: 'Muscat International' },
  { code: 'AMM', city: 'Amman', country: 'Jordan', airport: 'Queen Alia International' },
  { code: 'TLV', city: 'Tel Aviv', country: 'Israel', airport: 'Ben Gurion' },
  { code: 'IST', city: 'Istanbul', country: 'Turkey', airport: 'Istanbul Airport' },

  // East Asia
  { code: 'NRT', city: 'Tokyo', country: 'Japan', airport: 'Narita International' },
  { code: 'HND', city: 'Tokyo', country: 'Japan', airport: 'Haneda Airport' },
  { code: 'KIX', city: 'Osaka', country: 'Japan', airport: 'Kansai International' },
  { code: 'ICN', city: 'Seoul', country: 'South Korea', airport: 'Incheon International' },
  { code: 'GMP', city: 'Seoul', country: 'South Korea', airport: 'Gimpo International' },
  { code: 'PVG', city: 'Shanghai', country: 'China', airport: 'Pudong International' },
  { code: 'PEK', city: 'Beijing', country: 'China', airport: 'Capital International' },
  { code: 'CAN', city: 'Guangzhou', country: 'China', airport: 'Baiyun International' },
  { code: 'HKG', city: 'Hong Kong', country: 'Hong Kong SAR', airport: 'Hong Kong International' },
  { code: 'TPE', city: 'Taipei', country: 'Taiwan', airport: 'Taoyuan International' },

  // Southeast Asia
  { code: 'SIN', city: 'Singapore', country: 'Singapore', airport: 'Changi Airport' },
  { code: 'DPS', city: 'Bali', country: 'Indonesia', airport: 'Ngurah Rai International' },
  { code: 'CGK', city: 'Jakarta', country: 'Indonesia', airport: 'Soekarno-Hatta International' },
  { code: 'BKK', city: 'Bangkok', country: 'Thailand', airport: 'Suvarnabhumi Airport' },
  { code: 'HKT', city: 'Phuket', country: 'Thailand', airport: 'Phuket International' },
  { code: 'KUL', city: 'Kuala Lumpur', country: 'Malaysia', airport: 'Kuala Lumpur International' },
  { code: 'MNL', city: 'Manila', country: 'Philippines', airport: 'Ninoy Aquino International' },
  { code: 'SGN', city: 'Ho Chi Minh City', country: 'Vietnam', airport: 'Tan Son Nhat International' },
  { code: 'HAN', city: 'Hanoi', country: 'Vietnam', airport: 'Noi Bai International' },

  // South Asia
  { code: 'DEL', city: 'New Delhi', country: 'India', airport: 'Indira Gandhi International' },
  { code: 'BOM', city: 'Mumbai', country: 'India', airport: 'Chhatrapati Shivaji Maharaj International' },
  { code: 'BLR', city: 'Bengaluru', country: 'India', airport: 'Kempegowda International' },
  { code: 'CMB', city: 'Colombo', country: 'Sri Lanka', airport: 'Bandaranaike International' },
  { code: 'DAC', city: 'Dhaka', country: 'Bangladesh', airport: 'Hazrat Shahjalal International' },
  { code: 'KTM', city: 'Kathmandu', country: 'Nepal', airport: 'Tribhuvan International' },
  { code: 'MLE', city: 'Malé', country: 'Maldives', airport: 'Velana International' },

  // Oceania
  { code: 'SYD', city: 'Sydney', country: 'Australia', airport: 'Kingsford Smith Airport' },
  { code: 'MEL', city: 'Melbourne', country: 'Australia', airport: 'Melbourne Airport' },
  { code: 'BNE', city: 'Brisbane', country: 'Australia', airport: 'Brisbane Airport' },
  { code: 'AKL', city: 'Auckland', country: 'New Zealand', airport: 'Auckland Airport' },
  { code: 'NAN', city: 'Nadi', country: 'Fiji', airport: 'Nadi International' },

  // UK & Ireland
  { code: 'LHR', city: 'London', country: 'United Kingdom', airport: 'Heathrow Airport' },
  { code: 'LGW', city: 'London', country: 'United Kingdom', airport: 'Gatwick Airport' },
  { code: 'MAN', city: 'Manchester', country: 'United Kingdom', airport: 'Manchester Airport' },
  { code: 'DUB', city: 'Dublin', country: 'Ireland', airport: 'Dublin Airport' },
  { code: 'EDI', city: 'Edinburgh', country: 'United Kingdom', airport: 'Edinburgh Airport' },

  // Western Europe
  { code: 'CDG', city: 'Paris', country: 'France', airport: 'Charles de Gaulle' },
  { code: 'NCE', city: 'Nice', country: 'France', airport: "Côte d'Azur Airport" },
  { code: 'AMS', city: 'Amsterdam', country: 'Netherlands', airport: 'Schiphol Airport' },
  { code: 'FRA', city: 'Frankfurt', country: 'Germany', airport: 'Frankfurt Airport' },
  { code: 'MUC', city: 'Munich', country: 'Germany', airport: 'Munich Airport' },
  { code: 'BER', city: 'Berlin', country: 'Germany', airport: 'Brandenburg Airport' },
  { code: 'ZRH', city: 'Zurich', country: 'Switzerland', airport: 'Zurich Airport' },
  { code: 'BRU', city: 'Brussels', country: 'Belgium', airport: 'Brussels Airport' },
  { code: 'VIE', city: 'Vienna', country: 'Austria', airport: 'Vienna International' },
  { code: 'LIS', city: 'Lisbon', country: 'Portugal', airport: 'Humberto Delgado Airport' },

  // Southern Europe & Greece
  { code: 'MAD', city: 'Madrid', country: 'Spain', airport: 'Adolfo Suárez Madrid–Barajas' },
  { code: 'BCN', city: 'Barcelona', country: 'Spain', airport: 'Josep Tarradellas Barcelona-El Prat' },
  { code: 'FCO', city: 'Rome', country: 'Italy', airport: 'Leonardo da Vinci–Fiumicino' },
  { code: 'MXP', city: 'Milan', country: 'Italy', airport: 'Malpensa Airport' },
  { code: 'VCE', city: 'Venice', country: 'Italy', airport: 'Marco Polo Airport' },
  { code: 'NAP', city: 'Naples', country: 'Italy', airport: 'Naples International (for Amalfi Coast)' },
  { code: 'ATH', city: 'Athens', country: 'Greece', airport: 'Eleftherios Venizelos International' },
  { code: 'JTR', city: 'Santorini', country: 'Greece', airport: 'Santorini (Thira) National Airport' },
  { code: 'JMK', city: 'Mykonos', country: 'Greece', airport: 'Mykonos Island National Airport' },

  // Nordics & Eastern Europe
  { code: 'CPH', city: 'Copenhagen', country: 'Denmark', airport: 'Copenhagen Airport' },
  { code: 'ARN', city: 'Stockholm', country: 'Sweden', airport: 'Arlanda Airport' },
  { code: 'OSL', city: 'Oslo', country: 'Norway', airport: 'Gardermoen Airport' },
  { code: 'WAW', city: 'Warsaw', country: 'Poland', airport: 'Chopin Airport' },
  { code: 'PRG', city: 'Prague', country: 'Czech Republic', airport: 'Václav Havel Airport' },
  { code: 'BUD', city: 'Budapest', country: 'Hungary', airport: 'Ferenc Liszt International' },

  // North America
  { code: 'JFK', city: 'New York', country: 'United States', airport: 'John F. Kennedy International' },
  { code: 'EWR', city: 'Newark', country: 'United States', airport: 'Newark Liberty International' },
  { code: 'LAX', city: 'Los Angeles', country: 'United States', airport: 'Los Angeles International' },
  { code: 'ORD', city: 'Chicago', country: 'United States', airport: "O'Hare International" },
  { code: 'ATL', city: 'Atlanta', country: 'United States', airport: 'Hartsfield–Jackson Atlanta International' },
  { code: 'IAD', city: 'Washington, D.C.', country: 'United States', airport: 'Dulles International' },
  { code: 'MIA', city: 'Miami', country: 'United States', airport: 'Miami International' },
  { code: 'SFO', city: 'San Francisco', country: 'United States', airport: 'San Francisco International' },
  { code: 'IAH', city: 'Houston', country: 'United States', airport: 'George Bush Intercontinental' },
  { code: 'YYZ', city: 'Toronto', country: 'Canada', airport: 'Toronto Pearson International' },
  { code: 'YVR', city: 'Vancouver', country: 'Canada', airport: 'Vancouver International' },
  { code: 'YUL', city: 'Montreal', country: 'Canada', airport: 'Montréal–Trudeau International' },
  { code: 'MEX', city: 'Mexico City', country: 'Mexico', airport: 'Benito Juárez International' },
  { code: 'CUN', city: 'Cancún', country: 'Mexico', airport: 'Cancún International' },

  // South America
  { code: 'GRU', city: 'São Paulo', country: 'Brazil', airport: 'Guarulhos International' },
  { code: 'GIG', city: 'Rio de Janeiro', country: 'Brazil', airport: 'Galeão International' },
  { code: 'EZE', city: 'Buenos Aires', country: 'Argentina', airport: 'Ministro Pistarini International' },
  { code: 'BOG', city: 'Bogotá', country: 'Colombia', airport: 'El Dorado International' },
  { code: 'LIM', city: 'Lima', country: 'Peru', airport: 'Jorge Chávez International' },
  { code: 'SCL', city: 'Santiago', country: 'Chile', airport: 'Arturo Merino Benítez International' },
];

function searchAirports(query, limit = 8) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const starts = [];
  const contains = [];
  for (const a of AIRPORTS) {
    const hay = `${a.city} ${a.code} ${a.country} ${a.airport}`.toLowerCase();
    if (a.city.toLowerCase().startsWith(q) || a.code.toLowerCase() === q) {
      starts.push(a);
    } else if (hay.includes(q)) {
      contains.push(a);
    }
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

function findAirportByCode(code) {
  return AIRPORTS.find((a) => a.code === code);
}
