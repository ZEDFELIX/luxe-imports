import getDb from './index';

export function initDatabase() {
  const db = getDb();

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

    CREATE INDEX IF NOT EXISTS idx_vehicles_slug ON vehicles(slug);
    CREATE INDEX IF NOT EXISTS idx_vehicles_category ON vehicles(category);
    CREATE INDEX IF NOT EXISTS idx_vehicles_manufacturer ON vehicles(manufacturer);
    CREATE INDEX IF NOT EXISTS idx_vehicles_published ON vehicles(published);
    CREATE INDEX IF NOT EXISTS idx_vehicles_featured ON vehicles(featured);
    CREATE INDEX IF NOT EXISTS idx_aircraft_slug ON aircraft(slug);
    CREATE INDEX IF NOT EXISTS idx_aircraft_category ON aircraft(category);
    CREATE INDEX IF NOT EXISTS idx_aircraft_published ON aircraft(published);
    CREATE INDEX IF NOT EXISTS idx_marine_slug ON marine_assets(slug);
    CREATE INDEX IF NOT EXISTS idx_marine_category ON marine_assets(category);
    CREATE INDEX IF NOT EXISTS idx_marine_published ON marine_assets(published);
    CREATE INDEX IF NOT EXISTS idx_requests_user ON sourcing_requests(user_id);
    CREATE INDEX IF NOT EXISTS idx_requests_status ON sourcing_requests(status);
    CREATE INDEX IF NOT EXISTS idx_requests_ref ON sourcing_requests(reference_number);
    CREATE INDEX IF NOT EXISTS idx_quotes_user ON quotes(user_id);
    CREATE INDEX IF NOT EXISTS idx_invoices_user ON invoices(user_id);
    CREATE INDEX IF NOT EXISTS idx_shipments_user ON shipments(user_id);
    CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
    CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);
    CREATE INDEX IF NOT EXISTS idx_documents_user ON documents(user_id);
    CREATE INDEX IF NOT EXISTS idx_wishlists_user ON wishlists(user_id);
  `);

  return db;
}
