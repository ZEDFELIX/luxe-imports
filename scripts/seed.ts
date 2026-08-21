import Database from 'better-sqlite3';
import bcrypt from 'bcryptjs';
import { v4 as uuidv4 } from 'uuid';
import path from 'path';

const dbPath = path.join(process.cwd(), 'luxe-imports.db');
const db = new Database(dbPath);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    full_name TEXT NOT NULL DEFAULT '',
    phone TEXT,
    country TEXT,
    role TEXT NOT NULL DEFAULT 'CLIENT' CHECK (role IN ('ADMIN', 'STAFF', 'CLIENT')),
    avatar_url TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS vehicles (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    asset_type TEXT NOT NULL DEFAULT 'automobile',
    category TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    mileage INTEGER,
    color TEXT,
    fuel_type TEXT,
    transmission TEXT,
    engine TEXT,
    horsepower INTEGER,
    origin_country TEXT NOT NULL,
    location TEXT NOT NULL,
    condition TEXT,
    images TEXT DEFAULT '[]',
    featured INTEGER DEFAULT 0,
    published INTEGER DEFAULT 1,
    specifications TEXT DEFAULT '{}',
    estimated_shipping REAL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS aircraft (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    manufacturer TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    range_nm INTEGER,
    passengers INTEGER,
    crew INTEGER,
    engine_type TEXT,
    engine_count INTEGER,
    origin_country TEXT NOT NULL,
    location TEXT NOT NULL,
    condition TEXT,
    images TEXT DEFAULT '[]',
    featured INTEGER DEFAULT 0,
    published INTEGER DEFAULT 1,
    specifications TEXT DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS marine_assets (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    title TEXT NOT NULL,
    description TEXT,
    category TEXT NOT NULL,
    builder TEXT NOT NULL,
    model TEXT NOT NULL,
    year INTEGER NOT NULL,
    price REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    length_ft REAL,
    cabins INTEGER,
    capacity INTEGER,
    engine_type TEXT,
    engine_count INTEGER,
    top_speed_knots REAL,
    range_nm INTEGER,
    origin_country TEXT NOT NULL,
    location TEXT NOT NULL,
    condition TEXT,
    hull_material TEXT,
    images TEXT DEFAULT '[]',
    featured INTEGER DEFAULT 0,
    published INTEGER DEFAULT 1,
    specifications TEXT DEFAULT '{}',
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS sourcing_requests (
    id TEXT PRIMARY KEY,
    reference_number TEXT UNIQUE NOT NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_type TEXT NOT NULL,
    manufacturer TEXT,
    model TEXT,
    year INTEGER,
    budget REAL,
    currency TEXT DEFAULT 'USD',
    preferred_origin TEXT,
    destination TEXT,
    additional_requirements TEXT,
    status TEXT NOT NULL DEFAULT 'REQUESTED' CHECK (status IN (
      'REQUESTED', 'SOURCING', 'VERIFICATION', 'NEGOTIATION',
      'PURCHASE', 'SHIPPING', 'CUSTOMS', 'DELIVERY', 'COMPLETED'
    )),
    assigned_to TEXT REFERENCES users(id),
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS quotes (
    id TEXT PRIMARY KEY,
    quote_number TEXT UNIQUE NOT NULL,
    request_id TEXT REFERENCES sourcing_requests(id) ON DELETE SET NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_title TEXT NOT NULL,
    acquisition_price REAL NOT NULL DEFAULT 0,
    shipping_cost REAL NOT NULL DEFAULT 0,
    insurance_cost REAL NOT NULL DEFAULT 0,
    customs_duty REAL NOT NULL DEFAULT 0,
    service_fee REAL NOT NULL DEFAULT 0,
    total REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
    expires_at TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS invoices (
    id TEXT PRIMARY KEY,
    invoice_number TEXT UNIQUE NOT NULL,
    quote_id TEXT REFERENCES quotes(id) ON DELETE SET NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    description TEXT NOT NULL,
    amount REAL NOT NULL DEFAULT 0,
    currency TEXT NOT NULL DEFAULT 'USD',
    status TEXT NOT NULL DEFAULT 'DRAFT' CHECK (status IN ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED')),
    due_date TEXT,
    paid_at TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS shipments (
    id TEXT PRIMARY KEY,
    shipment_number TEXT UNIQUE NOT NULL,
    request_id TEXT REFERENCES sourcing_requests(id) ON DELETE SET NULL,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_title TEXT NOT NULL,
    origin TEXT NOT NULL,
    destination TEXT NOT NULL,
    carrier TEXT,
    tracking_number TEXT,
    status TEXT NOT NULL DEFAULT 'PREPARING' CHECK (status IN (
      'PREPARING', 'BOOKED', 'IN_TRANSIT', 'ARRIVED', 'CUSTOMS', 'DELIVERY', 'DELIVERED'
    )),
    departure_date TEXT,
    arrival_date TEXT,
    eta TEXT,
    notes TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    updated_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS documents (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    request_id TEXT REFERENCES sourcing_requests(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    file_url TEXT NOT NULL,
    file_type TEXT NOT NULL,
    file_size INTEGER NOT NULL DEFAULT 0,
    category TEXT,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS messages (
    id TEXT PRIMARY KEY,
    sender_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    receiver_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    request_id TEXT REFERENCES sourcing_requests(id) ON DELETE SET NULL,
    content TEXT NOT NULL,
    read INTEGER DEFAULT 0,
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );

  CREATE TABLE IF NOT EXISTS wishlists (
    id TEXT PRIMARY KEY,
    user_id TEXT NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    asset_type TEXT NOT NULL,
    asset_id TEXT NOT NULL,
    created_at TEXT NOT NULL DEFAULT (datetime('now')),
    UNIQUE(user_id, asset_type, asset_id)
  );

  CREATE TABLE IF NOT EXISTS contact_submissions (
    id TEXT PRIMARY KEY,
    full_name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    country TEXT,
    asset_type TEXT,
    budget REAL,
    requirements TEXT,
    preferred_contact TEXT DEFAULT 'email',
    created_at TEXT NOT NULL DEFAULT (datetime('now'))
  );
`);

console.log('Tables created.');

const passwordHash = bcrypt.hashSync('password123', 12);

const adminId = uuidv4();
const clientId = uuidv4();
const sarahId = uuidv4();

const insertUser = db.prepare('INSERT OR IGNORE INTO users (id, email, password_hash, full_name, role) VALUES (?, ?, ?, ?, ?)');
insertUser.run(adminId, 'admin@luxeimports.com', passwordHash, 'Admin User', 'ADMIN');
insertUser.run(clientId, 'client@luxeimports.com', passwordHash, 'James Wilson', 'CLIENT');
insertUser.run(sarahId, 'sarah@luxeimports.com', passwordHash, 'Sarah Chen', 'CLIENT');
console.log('Seeded 3 users.');

const insertVehicle = db.prepare(`INSERT OR IGNORE INTO vehicles (
  id, slug, title, description, asset_type, category, manufacturer, model, year, price, currency,
  mileage, color, fuel_type, transmission, engine, horsepower, origin_country, location, condition,
  images, featured, published, specifications, estimated_shipping
) VALUES (?, ?, ?, ?, 'automobile', ?, ?, ?, ?, ?, 'USD', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

const vehicles = [
  {
    slug: 'rolls-royce-ghost-2024', title: 'Rolls-Royce Ghost Extended',
    description: 'The Rolls-Royce Ghost Extended represents the pinnacle of automotive luxury. With its serene cabin and effortless power, this is travel redefined.',
    category: 'Executive Cars', manufacturer: 'Rolls-Royce', model: 'Ghost Extended', year: 2024, price: 450000,
    mileage: 1200, color: 'Arctic White', fuel_type: 'Petrol', transmission: 'Automatic',
    engine: '6.75L V12 Twin-Turbo', horsepower: 571, origin_country: 'United Kingdom', location: 'London, UK', condition: 'New',
    images: ['https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Engine': '6.75L V12 Twin-Turbo', 'Power': '571 HP', 'Torque': '850 Nm', 'Acceleration': '0-60 mph in 4.7s', 'Top Speed': '155 mph (limited)', 'Wheelbase': '3,465 mm', 'Weight': '2,490 kg', 'Seating': '4-5 passengers' }, estimated_shipping: 8500,
  },
  {
    slug: 'bentley-continental-gt-2024', title: 'Bentley Continental GT Speed',
    description: 'The Continental GT Speed is the fastest and most driver-focused Bentley ever created. A grand tourer without compromise.',
    category: 'Grand Tourer', manufacturer: 'Bentley', model: 'Continental GT Speed', year: 2024, price: 285000,
    mileage: 3400, color: 'Beluga Black', fuel_type: 'Petrol', transmission: 'Automatic',
    engine: '6.0L W12 Twin-Turbo', horsepower: 659, origin_country: 'United Kingdom', location: 'Crewe, UK', condition: 'New',
    images: ['https://images.unsplash.com/photo-1580273916550-e323be2ae537?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Engine': '6.0L W12 Twin-Turbo', 'Power': '659 HP', 'Torque': '900 Nm', 'Acceleration': '0-60 mph in 3.5s', 'Top Speed': '208 mph' }, estimated_shipping: 7200,
  },
  {
    slug: 'ferrari-sf90-stradale-2024', title: 'Ferrari SF90 Stradale',
    description: 'The SF90 Stradale marks a new era for Ferrari. Hybrid technology meets extreme performance.',
    category: 'Supercars', manufacturer: 'Ferrari', model: 'SF90 Stradale', year: 2024, price: 625000,
    mileage: 800, color: 'Rosso Corsa', fuel_type: 'Hybrid', transmission: '8-Speed DCT',
    engine: '4.0L V8 Twin-Turbo + Electric', horsepower: 986, origin_country: 'Italy', location: 'Maranello, Italy', condition: 'New',
    images: ['https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Engine': '4.0L V8 Twin-Turbo + 3 Electric Motors', 'Power': '986 HP combined', 'Torque': '800 Nm (V8) + electric', 'Acceleration': '0-62 mph in 2.5s', 'Top Speed': '211 mph' }, estimated_shipping: 12000,
  },
  {
    slug: 'porsche-911-gt3-rs-2024', title: 'Porsche 911 GT3 RS',
    description: 'The 911 GT3 RS is a road-legal race car. Track-bred performance with Porsche engineering perfection.',
    category: 'Sports Cars', manufacturer: 'Porsche', model: '911 GT3 RS', year: 2024, price: 315000,
    mileage: 1500, color: 'Guards Red', fuel_type: 'Petrol', transmission: '7-Speed PDK',
    engine: '4.0L Flat-6 Naturally Aspirated', horsepower: 518, origin_country: 'Germany', location: 'Stuttgart, Germany', condition: 'New',
    images: ['https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=800&q=80&auto=format'],
    featured: 0, published: 1, specifications: { 'Engine': '4.0L Flat-6 NA', 'Power': '518 HP', 'Torque': '465 Nm', 'Acceleration': '0-60 mph in 3.0s', 'Top Speed': '184 mph' }, estimated_shipping: 6800,
  },
  {
    slug: 'mercedes-amg-gt-63-2024', title: 'Mercedes-AMG GT 63 S E Performance',
    description: 'The most powerful Mercedes-AMG ever. A four-door supercar that defies every expectation.',
    category: 'Executive Cars', manufacturer: 'Mercedes-Benz', model: 'AMG GT 63 S E Performance', year: 2024, price: 245000,
    mileage: 2100, color: 'Obsidian Black', fuel_type: 'Hybrid', transmission: '9-Speed MCT',
    engine: '4.0L V8 Biturbo + Electric', horsepower: 831, origin_country: 'Germany', location: 'Affalterbach, Germany', condition: 'New',
    images: ['https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80&auto=format'],
    featured: 0, published: 1, specifications: { 'Engine': '4.0L V8 Biturbo + Electric Motor', 'Power': '831 HP', 'Torque': '1,470 Nm', 'Acceleration': '0-62 mph in 2.9s', 'Top Speed': '196 mph' }, estimated_shipping: 7000,
  },
  {
    slug: 'lamborghini-revuelto-2024', title: 'Lamborghini Revuelto',
    description: "The Revuelto is Lamborghini's first V12 hybrid. 1,001 horsepower of unbridled Italian passion meets the future.",
    category: 'Supercars', manufacturer: 'Lamborghini', model: 'Revuelto', year: 2024, price: 680000,
    mileage: 500, color: 'Verde Mantis', fuel_type: 'Hybrid', transmission: '8-Speed DCT',
    engine: '6.5L V12 + Electric', horsepower: 1001, origin_country: 'Italy', location: "Sant'Agata Bolognese, Italy", condition: 'New',
    images: ['https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Engine': '6.5L V12 + 3 Electric Motors', 'Power': '1,001 HP combined', 'Torque': '725 Nm (V12)', 'Acceleration': '0-62 mph in 2.5s', 'Top Speed': '217+ mph' }, estimated_shipping: 14000,
  },
];

for (const v of vehicles) {
  insertVehicle.run(uuidv4(), v.slug, v.title, v.description, v.category, v.manufacturer, v.model, v.year, v.price,
    v.mileage, v.color, v.fuel_type, v.transmission, v.engine, v.horsepower, v.origin_country, v.location, v.condition,
    JSON.stringify(v.images), v.featured, v.published, JSON.stringify(v.specifications), v.estimated_shipping);
}
console.log(`Seeded ${vehicles.length} vehicles.`);

const insertAircraft = db.prepare(`INSERT OR IGNORE INTO aircraft (
  id, slug, title, description, category, manufacturer, model, year, price, currency,
  range_nm, passengers, crew, engine_type, engine_count, origin_country, location, condition,
  images, featured, published, specifications
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'USD', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

const aircraft = [
  {
    slug: 'bombardier-global-7500-2024', title: 'Bombardier Global 7500',
    description: 'The Global 7500 is the flagship of business aviation.',
    category: 'Private Jets', manufacturer: 'Bombardier', model: 'Global 7500', year: 2024, price: 75000000,
    range_nm: 7700, passengers: 19, crew: 4, engine_type: 'GE Passport', engine_count: 2,
    origin_country: 'Canada', location: 'Montreal, Canada', condition: 'New',
    images: ['https://images.unsplash.com/photo-1560707303-4e980ce876ad?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Range': '7,700 nm', 'Speed': 'Mach 0.925', 'Cabin Length': '16.17 m', 'Cabin Height': '1.91 m' },
  },
  {
    slug: 'gulfstream-g700-2024', title: 'Gulfstream G700',
    description: 'The Gulfstream G700 redefines cabin comfort.',
    category: 'Private Jets', manufacturer: 'Gulfstream', model: 'G700', year: 2024, price: 65000000,
    range_nm: 7500, passengers: 19, crew: 4, engine_type: 'Rolls-Royce Pearl 700', engine_count: 2,
    origin_country: 'United States', location: 'Savannah, USA', condition: 'New',
    images: ['https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Range': '7,500 nm', 'Speed': 'Mach 0.925', 'Cabin Length': '16.01 m' },
  },
  {
    slug: 'cessna-citation-longitude-2023', title: 'Cessna Citation Longitude',
    description: 'The Citation Longitude combines transcontinental range.',
    category: 'Business Jets', manufacturer: 'Cessna', model: 'Citation Longitude', year: 2023, price: 28000000,
    range_nm: 3500, passengers: 12, crew: 2, engine_type: 'Williams FJ44', engine_count: 2,
    origin_country: 'United States', location: 'Wichita, USA', condition: 'Pre-Owned',
    images: ['https://images.unsplash.com/photo-1569629743817-70d8db6c323b?w=800&q=80&auto=format'],
    featured: 0, published: 1, specifications: { 'Range': '3,500 nm', 'Speed': 'Mach 0.83' },
  },
  {
    slug: 'pilatus-pc-24-2024', title: 'Pilatus PC-24',
    description: "The PC-24 is the world's first Super Versatile Jet.",
    category: 'Business Jets', manufacturer: 'Pilatus', model: 'PC-24', year: 2024, price: 12500000,
    range_nm: 2000, passengers: 10, crew: 2, engine_type: 'Williams FJ44-4A', engine_count: 2,
    origin_country: 'Switzerland', location: 'Stans, Switzerland', condition: 'New',
    images: ['https://images.unsplash.com/photo-1616432043562-3671ea2e5242?w=800&q=80&auto=format'],
    featured: 0, published: 1, specifications: { 'Range': '2,000 nm', 'Speed': 'Mach 0.78' },
  },
];

for (const a of aircraft) {
  insertAircraft.run(uuidv4(), a.slug, a.title, a.description, a.category, a.manufacturer, a.model, a.year, a.price,
    a.range_nm, a.passengers, a.crew, a.engine_type, a.engine_count, a.origin_country, a.location, a.condition,
    JSON.stringify(a.images), a.featured, a.published, JSON.stringify(a.specifications));
}
console.log(`Seeded ${aircraft.length} aircraft.`);

const insertMarine = db.prepare(`INSERT OR IGNORE INTO marine_assets (
  id, slug, title, description, category, builder, model, year, price, currency,
  length_ft, cabins, capacity, engine_type, engine_count, top_speed_knots, range_nm,
  origin_country, location, condition, hull_material, images, featured, published, specifications
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, 'USD', ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

const marine = [
  {
    slug: 'lurssen-alegria-2023', title: 'Lürssen Alegría',
    description: 'A 80-metre Lürssen masterpiece.',
    category: 'Superyachts', builder: 'Lürssen', model: 'Alegría', year: 2023, price: 75000000,
    length_ft: 262, cabins: 8, capacity: 16, engine_type: 'MTU', engine_count: 2, top_speed_knots: 18, range_nm: 5000,
    origin_country: 'Germany', location: 'Hamburg, Germany', condition: 'New', hull_material: 'Steel/Aluminium',
    images: ['https://images.unsplash.com/photo-1567899378494-47b22a2ae96a?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Length': '80m / 262ft', 'Beam': '12.6m', 'Guests': '16 in 8 staterooms' },
  },
  {
    slug: 'sunseeker-manhattan-90-2024', title: 'Sunseeker Manhattan 90',
    description: "The Manhattan 90 is Sunseeker's finest.",
    category: 'Motor Yachts', builder: 'Sunseeker', model: 'Manhattan 90', year: 2024, price: 8500000,
    length_ft: 90, cabins: 5, capacity: 10, engine_type: 'MAN V12', engine_count: 2, top_speed_knots: 30, range_nm: 1500,
    origin_country: 'United Kingdom', location: 'Poole, UK', condition: 'New', hull_material: 'Fibreglass',
    images: ['https://images.unsplash.com/photo-1517479149777-5f3b1511d5ad?w=800&q=80&auto=format'],
    featured: 1, published: 1, specifications: { 'Length': '27.3m / 90ft', 'Beam': '6.5m', 'Guests': '10 in 5 cabins' },
  },
  {
    slug: 'azimut-grande-trideck-2024', title: 'Azimut Grande Trideck',
    description: 'Three decks of Italian elegance.',
    category: 'Motor Yachts', builder: 'Azimut', model: 'Grande Trideck', year: 2024, price: 12000000,
    length_ft: 118, cabins: 6, capacity: 12, engine_type: 'MTU 16V', engine_count: 2, top_speed_knots: 24, range_nm: 3000,
    origin_country: 'Italy', location: 'Viareggio, Italy', condition: 'New', hull_material: 'GRP',
    images: ['https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=800&q=80&auto=format'],
    featured: 0, published: 1, specifications: { 'Length': '36m / 118ft', 'Beam': '8.1m', 'Guests': '12 in 6 cabins' },
  },
  {
    slug: 'princess-y85-2024', title: 'Princess Y85',
    description: 'The Y85 combines British craftsmanship.',
    category: 'Motor Yachts', builder: 'Princess Yachts', model: 'Y85', year: 2024, price: 6500000,
    length_ft: 85, cabins: 4, capacity: 8, engine_type: 'MAN V12', engine_count: 2, top_speed_knots: 28, range_nm: 1200,
    origin_country: 'United Kingdom', location: 'Plymouth, UK', condition: 'New', hull_material: 'Fibreglass',
    images: ['https://images.unsplash.com/photo-1605281317010-fe5ffe798166?w=800&q=80&auto=format'],
    featured: 0, published: 1, specifications: { 'Length': '26.16m / 85ft', 'Beam': '6.25m', 'Guests': '8 in 4 cabins' },
  },
];

for (const m of marine) {
  insertMarine.run(uuidv4(), m.slug, m.title, m.description, m.category, m.builder, m.model, m.year, m.price,
    m.length_ft, m.cabins, m.capacity, m.engine_type, m.engine_count, m.top_speed_knots, m.range_nm,
    m.origin_country, m.location, m.condition, m.hull_material,
    JSON.stringify(m.images), m.featured, m.published, JSON.stringify(m.specifications));
}
console.log(`Seeded ${marine.length} marine assets.`);

const insertRequest = db.prepare(`INSERT OR IGNORE INTO sourcing_requests (
  id, reference_number, user_id, asset_type, manufacturer, model, year, budget, preferred_origin, destination, additional_requirements, status
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

const req1Id = uuidv4();
const req2Id = uuidv4();
const req3Id = uuidv4();
insertRequest.run(req1Id, 'LR-001', clientId, 'automobile', 'Rolls-Royce', 'Phantom', 2024, 500000, 'United Kingdom', 'Kenya', 'Black exterior, cream interior', 'SOURCING');
insertRequest.run(req2Id, 'LR-002', clientId, 'yacht', 'Sunseeker', 'Manhattan 65', 2023, 3000000, 'United Kingdom', 'United Arab Emirates', 'Fly bridge preferred', 'REQUESTED');
insertRequest.run(req3Id, 'LR-003', sarahId, 'automobile', 'Porsche', '911 Turbo S', 2024, 250000, 'Germany', 'Japan', 'Manual transmission if available', 'VERIFICATION');
console.log('Seeded 3 sourcing requests.');

const insertQuote = db.prepare(`INSERT OR IGNORE INTO quotes (
  id, quote_number, request_id, user_id, asset_title, acquisition_price, shipping_cost, insurance_cost, customs_duty, service_fee, total, status, expires_at
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

const quote1Id = uuidv4();
const quote2Id = uuidv4();
insertQuote.run(quote1Id, 'Q-2024-001', req1Id, clientId, 'Rolls-Royce Phantom 2024', 420000, 12000, 5000, 18000, 25000, 480000, 'SENT', '2026-09-30');
insertQuote.run(quote2Id, 'Q-2024-002', null, sarahId, 'Porsche 911 Turbo S 2024', 210000, 8000, 3000, 9500, 15000, 245500, 'ACCEPTED', '2026-09-15');
console.log('Seeded 2 quotes.');

const insertInvoice = db.prepare(`INSERT OR IGNORE INTO invoices (
  id, invoice_number, quote_id, user_id, description, amount, currency, status, due_date
) VALUES (?, ?, ?, ?, ?, ?, 'USD', ?, ?)`);

insertInvoice.run(uuidv4(), 'INV-2024-001', quote1Id, clientId, 'Rolls-Royce Ghost Extended - Acquisition & Shipping', 480000, 'SENT', '2026-10-15');
insertInvoice.run(uuidv4(), 'INV-2024-002', quote2Id, sarahId, 'Porsche 911 Turbo S - Full Service', 245500, 'PAID', '2026-09-30');
console.log('Seeded 2 invoices.');

const insertShipment = db.prepare(`INSERT OR IGNORE INTO shipments (
  id, shipment_number, request_id, user_id, asset_title, origin, destination, carrier, tracking_number, status, departure_date, eta
) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`);

insertShipment.run(uuidv4(), 'SHP-2024-001', req1Id, clientId, 'Rolls-Royce Ghost Extended', 'London, UK', 'Nairobi, Kenya', 'Maersk Line', 'MAEU1234567', 'IN_TRANSIT', '2026-08-01', '2026-08-25');
insertShipment.run(uuidv4(), 'SHP-2024-002', req3Id, sarahId, 'Porsche 911 Turbo S', 'Stuttgart, Germany', 'Tokyo, Japan', 'NYK Line', 'NYK9876543', 'PREPARING', null, '2026-09-10');
console.log('Seeded 2 shipments.');

const insertMessage = db.prepare(`INSERT OR IGNORE INTO messages (
  id, sender_id, receiver_id, request_id, content, read, created_at
) VALUES (?, ?, ?, ?, ?, ?, datetime('now', ?))`);

insertMessage.run(uuidv4(), adminId, clientId, req1Id, 'Hello! We have begun sourcing your Rolls-Royce Phantom. Our team in the UK has identified several options matching your specifications.', 1, '-2 days');
insertMessage.run(uuidv4(), clientId, adminId, req1Id, 'That sounds great! Do you have any photos of the available options? I am particularly interested in the black exterior.', 1, '-1 days');
insertMessage.run(uuidv4(), adminId, clientId, req1Id, 'Yes, we have 3 vehicles that match. I will send detailed photos and inspection reports by end of week. The pricing is very competitive in the current market.', 0, '-3 hours');
console.log('Seeded 3 messages.');

console.log('Seeding complete!');
db.close();
