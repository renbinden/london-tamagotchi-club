CREATE TABLE IF NOT EXISTS events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  description TEXT NOT NULL,
  date TIMESTAMPTZ NOT NULL,
  eventbrite TEXT,
  map TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
