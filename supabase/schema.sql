-- ============================================
-- SPIRITACTELLE - Schéma de base de données
-- ============================================

-- Extension pour générer des UUIDs
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- ENUM Types
-- ============================================

CREATE TYPE user_role AS ENUM ('user', 'premium', 'admin');

-- ============================================
-- Table: profiles
-- Profils utilisateurs avec données de naissance
-- ============================================

CREATE TABLE profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT NOT NULL,
  full_name TEXT,
  avatar_url TEXT,
  role user_role DEFAULT 'user',

  -- Données de naissance pour l'astrologie
  birth_date DATE,
  birth_time TIME,
  birth_place TEXT,
  birth_latitude DECIMAL(10, 7),
  birth_longitude DECIMAL(10, 7),
  birth_timezone TEXT,

  -- Abonnement premium
  is_premium BOOLEAN DEFAULT FALSE,
  premium_until TIMESTAMP WITH TIME ZONE,

  -- Métadonnées
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Index pour les requêtes fréquentes
CREATE INDEX idx_profiles_email ON profiles(email);
CREATE INDEX idx_profiles_role ON profiles(role);
CREATE INDEX idx_profiles_is_premium ON profiles(is_premium);

-- ============================================
-- Table: natal_charts
-- Thèmes astraux des utilisateurs
-- ============================================

CREATE TABLE natal_charts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,

  -- Données de naissance
  birth_date DATE NOT NULL,
  birth_time TIME NOT NULL,
  birth_place TEXT NOT NULL,
  latitude DECIMAL(10, 7) NOT NULL,
  longitude DECIMAL(10, 7) NOT NULL,
  timezone TEXT NOT NULL,

  -- Données du thème calculé (positions planétaires, maisons, aspects)
  chart_data JSONB NOT NULL,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_natal_charts_user ON natal_charts(user_id);

-- ============================================
-- Table: card_readings
-- Tirages de cartes
-- ============================================

CREATE TABLE card_readings (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,

  spread_type TEXT NOT NULL, -- '1-card', '3-cards', 'celtic-cross', etc.
  cards JSONB NOT NULL, -- Liste des cartes tirées avec positions
  interpretation TEXT,
  question TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_card_readings_user ON card_readings(user_id);
CREATE INDEX idx_card_readings_created ON card_readings(created_at DESC);

-- ============================================
-- Table: articles
-- Articles du blog
-- ============================================

CREATE TABLE articles (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  content TEXT NOT NULL,
  excerpt TEXT,
  cover_image TEXT,

  author_id UUID NOT NULL REFERENCES profiles(id),
  category TEXT NOT NULL,
  tags TEXT[] DEFAULT '{}',

  is_premium BOOLEAN DEFAULT FALSE,
  is_published BOOLEAN DEFAULT FALSE,
  published_at TIMESTAMP WITH TIME ZONE,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_articles_slug ON articles(slug);
CREATE INDEX idx_articles_category ON articles(category);
CREATE INDEX idx_articles_published ON articles(is_published, published_at DESC);

-- ============================================
-- Table: meditations
-- Méditations audio
-- ============================================

CREATE TABLE meditations (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  audio_url TEXT NOT NULL,
  duration INTEGER NOT NULL, -- durée en secondes
  category TEXT NOT NULL,
  cover_image TEXT,

  is_premium BOOLEAN DEFAULT FALSE,
  play_count INTEGER DEFAULT 0,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

CREATE INDEX idx_meditations_category ON meditations(category);
CREATE INDEX idx_meditations_premium ON meditations(is_premium);

-- ============================================
-- Table: user_meditation_progress
-- Suivi de progression des méditations
-- ============================================

CREATE TABLE user_meditation_progress (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES profiles(id) ON DELETE CASCADE,
  meditation_id UUID NOT NULL REFERENCES meditations(id) ON DELETE CASCADE,

  progress INTEGER DEFAULT 0, -- position en secondes
  completed BOOLEAN DEFAULT FALSE,
  last_played_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(user_id, meditation_id)
);

-- ============================================
-- Table: daily_horoscopes
-- Horoscopes quotidiens pré-générés
-- ============================================

CREATE TABLE daily_horoscopes (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  zodiac_sign TEXT NOT NULL,
  date DATE NOT NULL,

  general TEXT NOT NULL,
  love TEXT,
  career TEXT,
  health TEXT,
  lucky_number INTEGER,
  lucky_color TEXT,

  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),

  UNIQUE(zodiac_sign, date)
);

CREATE INDEX idx_horoscopes_date ON daily_horoscopes(date DESC);

-- ============================================
-- Row Level Security (RLS)
-- ============================================

-- Activer RLS sur toutes les tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE natal_charts ENABLE ROW LEVEL SECURITY;
ALTER TABLE card_readings ENABLE ROW LEVEL SECURITY;
ALTER TABLE articles ENABLE ROW LEVEL SECURITY;
ALTER TABLE meditations ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_meditation_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE daily_horoscopes ENABLE ROW LEVEL SECURITY;

-- Policies pour profiles
CREATE POLICY "Users can view their own profile"
  ON profiles FOR SELECT
  USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile"
  ON profiles FOR UPDATE
  USING (auth.uid() = id);

-- Policies pour natal_charts
CREATE POLICY "Users can view their own charts"
  ON natal_charts FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own charts"
  ON natal_charts FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own charts"
  ON natal_charts FOR DELETE
  USING (auth.uid() = user_id);

-- Policies pour card_readings
CREATE POLICY "Users can view their own readings"
  ON card_readings FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own readings"
  ON card_readings FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Policies pour articles (lecture publique pour les publiés)
CREATE POLICY "Anyone can view published articles"
  ON articles FOR SELECT
  USING (is_published = TRUE);

CREATE POLICY "Admins can manage articles"
  ON articles FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policies pour meditations (lecture publique)
CREATE POLICY "Anyone can view meditations"
  ON meditations FOR SELECT
  USING (TRUE);

CREATE POLICY "Admins can manage meditations"
  ON meditations FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM profiles
      WHERE profiles.id = auth.uid()
      AND profiles.role = 'admin'
    )
  );

-- Policies pour user_meditation_progress
CREATE POLICY "Users can view their own progress"
  ON user_meditation_progress FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can manage their own progress"
  ON user_meditation_progress FOR ALL
  USING (auth.uid() = user_id);

-- Policies pour daily_horoscopes (lecture publique)
CREATE POLICY "Anyone can view horoscopes"
  ON daily_horoscopes FOR SELECT
  USING (TRUE);

-- ============================================
-- Functions & Triggers
-- ============================================

-- Fonction pour mettre à jour updated_at automatiquement
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Triggers pour updated_at
CREATE TRIGGER profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER articles_updated_at
  BEFORE UPDATE ON articles
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at();

-- Fonction pour créer un profil automatiquement à l'inscription
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, avatar_url)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    NEW.raw_user_meta_data->>'avatar_url'
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger pour créer le profil à l'inscription
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION handle_new_user();

-- ============================================
-- Données initiales (seed)
-- ============================================

-- Catégories d'articles
-- 'astrologie', 'tarot', 'meditation', 'spiritualite', 'bien-etre'

-- Catégories de méditations
-- 'relaxation', 'sommeil', 'energie', 'chakras', 'guidance'
