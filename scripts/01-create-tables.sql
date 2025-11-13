-- Users table (for admin/staff)
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  role TEXT DEFAULT 'staff' CHECK (role IN ('admin', 'staff')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Packages table
CREATE TABLE IF NOT EXISTS packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  duration_days INTEGER NOT NULL,
  departure_date DATE NOT NULL,
  return_date DATE NOT NULL,
  base_price DECIMAL(10, 2) NOT NULL,
  single_room_price DECIMAL(10, 2) DEFAULT 330000,
  max_guests INTEGER DEFAULT 150,
  current_guests INTEGER DEFAULT 0,
  status TEXT DEFAULT 'active' CHECK (status IN ('active', 'sold_out', 'cancelled')),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Bookings table
CREATE TABLE IF NOT EXISTS bookings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_number TEXT UNIQUE NOT NULL,
  package_id UUID NOT NULL REFERENCES packages(id),
  user_email TEXT NOT NULL,
  total_guests INTEGER NOT NULL,
  single_rooms INTEGER DEFAULT 0,
  total_amount DECIMAL(12, 2) NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'cancelled', 'refunded')),
  payment_method TEXT,
  booking_date TIMESTAMP DEFAULT now(),
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Guests table
CREATE TABLE IF NOT EXISTS guests (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  name_ko TEXT NOT NULL,
  name_en TEXT NOT NULL,
  birth_date DATE NOT NULL,
  gender TEXT NOT NULL CHECK (gender IN ('male', 'female')),
  passport_number TEXT,
  passport_expiry DATE,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  dietary_restrictions TEXT[],
  medical_info TEXT,
  special_requests TEXT,
  is_primary BOOLEAN DEFAULT false,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  room_type TEXT NOT NULL CHECK (room_type IN ('double', 'single')),
  room_number TEXT,
  guest_ids UUID[] NOT NULL,
  check_in_date DATE NOT NULL,
  check_out_date DATE NOT NULL,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Payments table
CREATE TABLE IF NOT EXISTS payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  amount DECIMAL(12, 2) NOT NULL,
  payment_method TEXT NOT NULL,
  payment_status TEXT DEFAULT 'pending' CHECK (payment_status IN ('pending', 'completed', 'failed', 'refunded')),
  transaction_id TEXT UNIQUE,
  installments INTEGER DEFAULT 1,
  paid_at TIMESTAMP,
  refunded_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Itineraries table
CREATE TABLE IF NOT EXISTS itineraries (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  package_id UUID NOT NULL REFERENCES packages(id),
  day_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  activities TEXT[],
  breakfast TEXT,
  lunch TEXT,
  dinner TEXT,
  hotel TEXT,
  created_at TIMESTAMP DEFAULT now(),
  updated_at TIMESTAMP DEFAULT now()
);

-- Communications table
CREATE TABLE IF NOT EXISTS communications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID NOT NULL REFERENCES bookings(id) ON DELETE CASCADE,
  message_type TEXT NOT NULL CHECK (message_type IN ('email', 'sms', 'kakao')),
  subject TEXT,
  content TEXT NOT NULL,
  status TEXT DEFAULT 'sent' CHECK (status IN ('draft', 'sent', 'failed')),
  sent_at TIMESTAMP,
  created_at TIMESTAMP DEFAULT now()
);

-- Create indexes for better performance
CREATE INDEX idx_bookings_package_id ON bookings(package_id);
CREATE INDEX idx_bookings_user_email ON bookings(user_email);
CREATE INDEX idx_bookings_payment_status ON bookings(payment_status);
CREATE INDEX idx_guests_booking_id ON guests(booking_id);
CREATE INDEX idx_rooms_booking_id ON rooms(booking_id);
CREATE INDEX idx_payments_booking_id ON payments(booking_id);
CREATE INDEX idx_itineraries_package_id ON itineraries(package_id);
CREATE INDEX idx_communications_booking_id ON communications(booking_id);

-- Insert sample package data
INSERT INTO packages (name, description, duration_days, departure_date, return_date, base_price, single_room_price, max_guests)
VALUES (
  '글로벌트리브 로타리 세계대회 특별 투어',
  '세계 4대 박물관과 타이베이의 정취를 느끼는 특별한 여행',
  4,
  '2026-06-13',
  '2026-06-16',
  1290000,
  330000,
  150
);
