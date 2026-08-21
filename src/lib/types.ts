export type AssetType = 'automobile' | 'aircraft' | 'yacht' | 'boat' | 'other';

export type UserRole = 'ADMIN' | 'STAFF' | 'CLIENT';

export type RequestStatus =
  | 'REQUESTED'
  | 'SOURCING'
  | 'VERIFICATION'
  | 'NEGOTIATION'
  | 'PURCHASE'
  | 'SHIPPING'
  | 'CUSTOMS'
  | 'DELIVERY'
  | 'COMPLETED';

export type ShipmentStatus =
  | 'PREPARING'
  | 'BOOKED'
  | 'IN_TRANSIT'
  | 'ARRIVED'
  | 'CUSTOMS'
  | 'DELIVERY'
  | 'DELIVERED';

export type QuoteStatus = 'PENDING' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';

export type InvoiceStatus = 'DRAFT' | 'SENT' | 'PAID' | 'OVERDUE' | 'CANCELLED';

export interface Profile {
  id: string;
  email: string;
  full_name: string;
  phone?: string;
  country?: string;
  role: UserRole;
  avatar_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Vehicle {
  id: string;
  slug: string;
  title: string;
  description?: string;
  asset_type: 'automobile';
  category: string;
  manufacturer: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  mileage?: number;
  mileage_unit?: string;
  color?: string;
  fuel_type?: string;
  transmission?: string;
  engine?: string;
  horsepower?: number;
  origin_country: string;
  location: string;
  condition?: string;
  vin?: string;
  images: string[];
  video_url?: string;
  featured: boolean;
  published: boolean;
  specifications?: { [key: string]: string };
  estimated_shipping?: number;
  import_info?: string;
  created_at: string;
  updated_at: string;
}

export interface Aircraft {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  manufacturer: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  range_nm?: number;
  range_unit?: string;
  passengers?: number;
  crew?: number;
  engine_type?: string;
  engine_count?: number;
  total_time?: number;
  origin_country: string;
  location: string;
  condition?: string;
  serial_number?: string;
  images: string[];
  video_url?: string;
  featured: boolean;
  published: boolean;
  specifications?: { [key: string]: string };
  created_at: string;
  updated_at: string;
}

export interface MarineAsset {
  id: string;
  slug: string;
  title: string;
  description?: string;
  category: string;
  builder: string;
  model: string;
  year: number;
  price: number;
  currency: string;
  length_ft?: number;
  beam_ft?: number;
  draft_ft?: number;
  cabins?: number;
  heads?: number;
  capacity?: number;
  engine_type?: string;
  engine_count?: number;
  top_speed_knots?: number;
  range_nm?: number;
  origin_country: string;
  location: string;
  condition?: string;
  hull_material?: string;
  images: string[];
  video_url?: string;
  featured: boolean;
  published: boolean;
  specifications?: { [key: string]: string };
  created_at: string;
  updated_at: string;
}

export interface SourcingRequest {
  id: string;
  reference_number: string;
  user_id: string;
  asset_type: AssetType;
  manufacturer?: string;
  model?: string;
  year?: number;
  budget?: number;
  currency?: string;
  preferred_origin?: string;
  destination?: string;
  additional_requirements?: string;
  status: RequestStatus;
  assigned_to?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Quote {
  id: string;
  quote_number: string;
  request_id: string;
  user_id: string;
  asset_title: string;
  acquisition_price: number;
  shipping_cost: number;
  insurance_cost: number;
  customs_duty: number;
  service_fee: number;
  total: number;
  currency: string;
  status: QuoteStatus;
  expires_at: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Invoice {
  id: string;
  invoice_number: string;
  quote_id?: string;
  user_id: string;
  description: string;
  amount: number;
  currency: string;
  status: InvoiceStatus;
  due_date: string;
  paid_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Shipment {
  id: string;
  shipment_number: string;
  request_id?: string;
  user_id: string;
  asset_title: string;
  origin: string;
  destination: string;
  carrier?: string;
  tracking_number?: string;
  status: ShipmentStatus;
  departure_date?: string;
  arrival_date?: string;
  eta?: string;
  notes?: string;
  created_at: string;
  updated_at: string;
}

export interface Document {
  id: string;
  user_id: string;
  request_id?: string;
  title: string;
  file_url: string;
  file_type: string;
  file_size: number;
  category?: string;
  created_at: string;
}

export interface Message {
  id: string;
  sender_id: string;
  receiver_id: string;
  request_id?: string;
  content: string;
  read: boolean;
  created_at: string;
}

export interface Notification {
  id: string;
  user_id: string;
  title: string;
  message: string;
  type: string;
  read: boolean;
  link?: string;
  created_at: string;
}

export interface Wishlist {
  id: string;
  user_id: string;
  asset_type: string;
  asset_id: string;
  created_at: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string;
  cover_image: string;
  author: string;
  category: string;
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface ContactSubmission {
  id: string;
  full_name: string;
  email: string;
  phone?: string;
  country?: string;
  asset_type?: AssetType;
  budget?: number;
  requirements?: string;
  preferred_contact?: string;
  created_at: string;
}
