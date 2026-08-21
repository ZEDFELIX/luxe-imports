-- =============================================
-- LUXE IMPORTS — Supabase Database Schema
-- =============================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- =============================================
-- PROFILES
-- =============================================
create table public.profiles (
  id uuid references auth.users on delete cascade primary key,
  email text not null,
  full_name text not null default '',
  phone text,
  country text,
  role text not null default 'CLIENT' check (role in ('ADMIN', 'STAFF', 'CLIENT')),
  avatar_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Users can view own profile"
  on public.profiles for select
  using (auth.uid() = id);

create policy "Users can update own profile"
  on public.profiles for update
  using (auth.uid() = id);

create policy "Admins can view all profiles"
  on public.profiles for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'full_name', '')
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- =============================================
-- VEHICLES (Automotive)
-- =============================================
create table public.vehicles (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  asset_type text not null default 'automobile',
  category text not null,
  manufacturer text not null,
  model text not null,
  year integer not null,
  price numeric not null default 0,
  currency text not null default 'USD',
  mileage integer,
  mileage_unit text default 'km',
  color text,
  fuel_type text,
  transmission text,
  engine text,
  horsepower integer,
  origin_country text not null,
  location text not null,
  condition text,
  vin text,
  images text[] default '{}',
  video_url text,
  featured boolean default false,
  published boolean default false,
  specifications jsonb default '{}',
  estimated_shipping numeric,
  import_info text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.vehicles enable row level security;

create policy "Anyone can view published vehicles"
  on public.vehicles for select
  using (published = true);

create policy "Admins can manage vehicles"
  on public.vehicles for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- AIRCRAFT
-- =============================================
create table public.aircraft (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  category text not null,
  manufacturer text not null,
  model text not null,
  year integer not null,
  price numeric not null default 0,
  currency text not null default 'USD',
  range_nm integer,
  range_unit text default 'nm',
  passengers integer,
  crew integer,
  engine_type text,
  engine_count integer,
  total_time integer,
  origin_country text not null,
  location text not null,
  condition text,
  serial_number text,
  images text[] default '{}',
  video_url text,
  featured boolean default false,
  published boolean default false,
  specifications jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.aircraft enable row level security;

create policy "Anyone can view published aircraft"
  on public.aircraft for select
  using (published = true);

create policy "Admins can manage aircraft"
  on public.aircraft for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- MARINE ASSETS
-- =============================================
create table public.marine_assets (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  description text,
  category text not null,
  builder text not null,
  model text not null,
  year integer not null,
  price numeric not null default 0,
  currency text not null default 'USD',
  length_ft numeric,
  beam_ft numeric,
  draft_ft numeric,
  cabins integer,
  heads integer,
  capacity integer,
  engine_type text,
  engine_count integer,
  top_speed_knots numeric,
  range_nm integer,
  origin_country text not null,
  location text not null,
  condition text,
  hull_material text,
  images text[] default '{}',
  video_url text,
  featured boolean default false,
  published boolean default false,
  specifications jsonb default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.marine_assets enable row level security;

create policy "Anyone can view published marine assets"
  on public.marine_assets for select
  using (published = true);

create policy "Admins can manage marine assets"
  on public.marine_assets for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- SOURCING REQUESTS
-- =============================================
create table public.sourcing_requests (
  id uuid primary key default uuid_generate_v4(),
  reference_number text unique not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_type text not null,
  manufacturer text,
  model text,
  year integer,
  budget numeric,
  currency text default 'USD',
  preferred_origin text,
  destination text,
  additional_requirements text,
  status text not null default 'REQUESTED' check (status in (
    'REQUESTED', 'SOURCING', 'VERIFICATION', 'NEGOTIATION',
    'PURCHASE', 'SHIPPING', 'CUSTOMS', 'DELIVERY', 'COMPLETED'
  )),
  assigned_to uuid references public.profiles(id),
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.sourcing_requests enable row level security;

create policy "Users can view own requests"
  on public.sourcing_requests for select
  using (auth.uid() = user_id);

create policy "Users can create requests"
  on public.sourcing_requests for insert
  with check (auth.uid() = user_id);

create policy "Admins can manage all requests"
  on public.sourcing_requests for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- QUOTES
-- =============================================
create table public.quotes (
  id uuid primary key default uuid_generate_v4(),
  quote_number text unique not null,
  request_id uuid references public.sourcing_requests(id) on delete set null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_title text not null,
  acquisition_price numeric not null default 0,
  shipping_cost numeric not null default 0,
  insurance_cost numeric not null default 0,
  customs_duty numeric not null default 0,
  service_fee numeric not null default 0,
  total numeric not null default 0,
  currency text not null default 'USD',
  status text not null default 'PENDING' check (status in ('PENDING', 'SENT', 'ACCEPTED', 'REJECTED', 'EXPIRED')),
  expires_at timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.quotes enable row level security;

create policy "Users can view own quotes"
  on public.quotes for select
  using (auth.uid() = user_id);

create policy "Admins can manage all quotes"
  on public.quotes for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- INVOICES
-- =============================================
create table public.invoices (
  id uuid primary key default uuid_generate_v4(),
  invoice_number text unique not null,
  quote_id uuid references public.quotes(id) on delete set null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  description text not null,
  amount numeric not null default 0,
  currency text not null default 'USD',
  status text not null default 'DRAFT' check (status in ('DRAFT', 'SENT', 'PAID', 'OVERDUE', 'CANCELLED')),
  due_date timestamptz,
  paid_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.invoices enable row level security;

create policy "Users can view own invoices"
  on public.invoices for select
  using (auth.uid() = user_id);

create policy "Admins can manage all invoices"
  on public.invoices for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- PAYMENTS
-- =============================================
create table public.payments (
  id uuid primary key default uuid_generate_v4(),
  invoice_id uuid references public.invoices(id) on delete set null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  amount numeric not null,
  currency text not null default 'USD',
  method text,
  status text not null default 'PENDING' check (status in ('PENDING', 'COMPLETED', 'FAILED', 'REFUNDED')),
  reference text,
  created_at timestamptz not null default now()
);

alter table public.payments enable row level security;

create policy "Users can view own payments"
  on public.payments for select
  using (auth.uid() = user_id);

create policy "Admins can manage all payments"
  on public.payments for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- SHIPMENTS
-- =============================================
create table public.shipments (
  id uuid primary key default uuid_generate_v4(),
  shipment_number text unique not null,
  request_id uuid references public.sourcing_requests(id) on delete set null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_title text not null,
  origin text not null,
  destination text not null,
  carrier text,
  tracking_number text,
  status text not null default 'PREPARING' check (status in (
    'PREPARING', 'BOOKED', 'IN_TRANSIT', 'ARRIVED', 'CUSTOMS', 'DELIVERY', 'DELIVERED'
  )),
  departure_date timestamptz,
  arrival_date timestamptz,
  eta timestamptz,
  notes text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.shipments enable row level security;

create policy "Users can view own shipments"
  on public.shipments for select
  using (auth.uid() = user_id);

create policy "Admins can manage all shipments"
  on public.shipments for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- DOCUMENTS
-- =============================================
create table public.documents (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  request_id uuid references public.sourcing_requests(id) on delete set null,
  title text not null,
  file_url text not null,
  file_type text not null,
  file_size integer not null default 0,
  category text,
  created_at timestamptz not null default now()
);

alter table public.documents enable row level security;

create policy "Users can view own documents"
  on public.documents for select
  using (auth.uid() = user_id);

create policy "Users can upload own documents"
  on public.documents for insert
  with check (auth.uid() = user_id);

create policy "Admins can manage all documents"
  on public.documents for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- MESSAGES
-- =============================================
create table public.messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid references public.profiles(id) on delete cascade not null,
  receiver_id uuid references public.profiles(id) on delete cascade not null,
  request_id uuid references public.sourcing_requests(id) on delete set null,
  content text not null,
  read boolean default false,
  created_at timestamptz not null default now()
);

alter table public.messages enable row level security;

create policy "Users can view own messages"
  on public.messages for select
  using (auth.uid() = sender_id or auth.uid() = receiver_id);

create policy "Users can send messages"
  on public.messages for insert
  with check (auth.uid() = sender_id);

create policy "Users can update own messages"
  on public.messages for update
  using (auth.uid() = receiver_id);

-- =============================================
-- NOTIFICATIONS
-- =============================================
create table public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  message text not null,
  type text not null default 'info',
  read boolean default false,
  link text,
  created_at timestamptz not null default now()
);

alter table public.notifications enable row level security;

create policy "Users can view own notifications"
  on public.notifications for select
  using (auth.uid() = user_id);

create policy "Users can update own notifications"
  on public.notifications for update
  using (auth.uid() = user_id);

create policy "System can create notifications"
  on public.notifications for insert
  with check (true);

-- =============================================
-- WISHLISTS
-- =============================================
create table public.wishlists (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  asset_type text not null,
  asset_id uuid not null,
  created_at timestamptz not null default now(),
  unique(user_id, asset_type, asset_id)
);

alter table public.wishlists enable row level security;

create policy "Users can manage own wishlist"
  on public.wishlists for all
  using (auth.uid() = user_id);

-- =============================================
-- BLOG POSTS
-- =============================================
create table public.blog_posts (
  id uuid primary key default uuid_generate_v4(),
  slug text unique not null,
  title text not null,
  excerpt text not null default '',
  content text not null default '',
  cover_image text,
  author text not null default 'Luxe Imports Editorial',
  category text not null,
  published boolean default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.blog_posts enable row level security;

create policy "Anyone can view published posts"
  on public.blog_posts for select
  using (published = true);

create policy "Admins can manage blog posts"
  on public.blog_posts for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- SITE SETTINGS
-- =============================================
create table public.site_settings (
  id uuid primary key default uuid_generate_v4(),
  key text unique not null,
  value jsonb not null default '{}',
  updated_at timestamptz not null default now()
);

alter table public.site_settings enable row level security;

create policy "Anyone can read site settings"
  on public.site_settings for select
  using (true);

create policy "Admins can manage site settings"
  on public.site_settings for all
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role = 'ADMIN'
    )
  );

-- =============================================
-- CONTACT SUBMISSIONS
-- =============================================
create table public.contact_submissions (
  id uuid primary key default uuid_generate_v4(),
  full_name text not null,
  email text not null,
  phone text,
  country text,
  asset_type text,
  budget numeric,
  requirements text,
  preferred_contact text default 'email',
  created_at timestamptz not null default now()
);

alter table public.contact_submissions enable row level security;

create policy "Anyone can submit contact form"
  on public.contact_submissions for insert
  with check (true);

create policy "Admins can view contact submissions"
  on public.contact_submissions for select
  using (
    exists (
      select 1 from public.profiles
      where id = auth.uid() and role in ('ADMIN', 'STAFF')
    )
  );

-- =============================================
-- INDEXES
-- =============================================
create index idx_profiles_email on public.profiles(email);
create index idx_profiles_role on public.profiles(role);
create index idx_vehicles_slug on public.vehicles(slug);
create index idx_vehicles_manufacturer on public.vehicles(manufacturer);
create index idx_vehicles_category on public.vehicles(category);
create index idx_vehicles_published on public.vehicles(published);
create index idx_vehicles_featured on public.vehicles(featured);
create index idx_aircraft_slug on public.aircraft(slug);
create index idx_aircraft_manufacturer on public.aircraft(manufacturer);
create index idx_aircraft_published on public.aircraft(published);
create index idx_marine_assets_slug on public.marine_assets(slug);
create index idx_marine_assets_builder on public.marine_assets(builder);
create index idx_marine_assets_published on public.marine_assets(published);
create index idx_sourcing_requests_user on public.sourcing_requests(user_id);
create index idx_sourcing_requests_status on public.sourcing_requests(status);
create index idx_sourcing_requests_reference on public.sourcing_requests(reference_number);
create index idx_quotes_user on public.quotes(user_id);
create index idx_quotes_status on public.quotes(status);
create index idx_invoices_user on public.invoices(user_id);
create index idx_invoices_status on public.invoices(status);
create index idx_shipments_user on public.shipments(user_id);
create index idx_shipments_status on public.shipments(status);
create index idx_messages_sender on public.messages(sender_id);
create index idx_messages_receiver on public.messages(receiver_id);
create index idx_notifications_user on public.notifications(user_id);
create index idx_notifications_read on public.notifications(read);
create index idx_wishlists_user on public.wishlists(user_id);
create index idx_blog_posts_slug on public.blog_posts(slug);
create index idx_blog_posts_published on public.blog_posts(published);
