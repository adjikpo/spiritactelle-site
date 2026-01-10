-- Supabase initial setup for local development
-- This creates the necessary roles and schemas for Supabase to work

-- Create roles
DO $$
BEGIN
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'anon') THEN
    CREATE ROLE anon NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticated') THEN
    CREATE ROLE authenticated NOLOGIN NOINHERIT;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'service_role') THEN
    CREATE ROLE service_role NOLOGIN NOINHERIT BYPASSRLS;
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_auth_admin') THEN
    CREATE ROLE supabase_auth_admin NOINHERIT CREATEROLE LOGIN PASSWORD 'postgres';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'supabase_admin') THEN
    CREATE ROLE supabase_admin NOINHERIT CREATEROLE LOGIN PASSWORD 'postgres';
  END IF;
  IF NOT EXISTS (SELECT FROM pg_catalog.pg_roles WHERE rolname = 'authenticator') THEN
    CREATE ROLE authenticator NOINHERIT LOGIN PASSWORD 'postgres';
  END IF;
END
$$;

-- Grant roles
GRANT anon TO authenticator;
GRANT authenticated TO authenticator;
GRANT service_role TO authenticator;
GRANT supabase_auth_admin TO authenticator;

-- Create schemas
CREATE SCHEMA IF NOT EXISTS auth;
CREATE SCHEMA IF NOT EXISTS storage;
CREATE SCHEMA IF NOT EXISTS graphql_public;

-- Grant schema permissions
GRANT USAGE ON SCHEMA public TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA public TO supabase_admin;

GRANT USAGE ON SCHEMA auth TO anon, authenticated, service_role;
GRANT ALL ON SCHEMA auth TO supabase_auth_admin;

-- Enable extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp" WITH SCHEMA public;
CREATE EXTENSION IF NOT EXISTS pgcrypto WITH SCHEMA public;

-- Auth schema tables (minimal for GoTrue)
CREATE TABLE IF NOT EXISTS auth.users (
  instance_id uuid,
  id uuid NOT NULL PRIMARY KEY DEFAULT uuid_generate_v4(),
  aud varchar(255),
  role varchar(255),
  email varchar(255) UNIQUE,
  encrypted_password varchar(255),
  email_confirmed_at timestamptz,
  invited_at timestamptz,
  confirmation_token varchar(255),
  confirmation_sent_at timestamptz,
  recovery_token varchar(255),
  recovery_sent_at timestamptz,
  email_change_token_new varchar(255),
  email_change varchar(255),
  email_change_sent_at timestamptz,
  last_sign_in_at timestamptz,
  raw_app_meta_data jsonb,
  raw_user_meta_data jsonb,
  is_super_admin boolean,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  phone varchar(15) UNIQUE,
  phone_confirmed_at timestamptz,
  phone_change varchar(15),
  phone_change_token varchar(255),
  phone_change_sent_at timestamptz,
  confirmed_at timestamptz GENERATED ALWAYS AS (LEAST(email_confirmed_at, phone_confirmed_at)) STORED,
  email_change_token_current varchar(255),
  email_change_confirm_status smallint DEFAULT 0,
  banned_until timestamptz,
  reauthentication_token varchar(255),
  reauthentication_sent_at timestamptz,
  is_sso_user boolean DEFAULT false,
  deleted_at timestamptz
);

CREATE TABLE IF NOT EXISTS auth.refresh_tokens (
  instance_id uuid,
  id bigserial PRIMARY KEY,
  token varchar(255),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  revoked boolean,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  parent varchar(255),
  session_id uuid
);

CREATE TABLE IF NOT EXISTS auth.instances (
  id uuid PRIMARY KEY,
  uuid uuid,
  raw_base_config text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS auth.sessions (
  id uuid PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  factor_id uuid,
  aal varchar(255),
  not_after timestamptz
);

CREATE TABLE IF NOT EXISTS auth.identities (
  id text NOT NULL,
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  identity_data jsonb NOT NULL,
  provider text NOT NULL,
  last_sign_in_at timestamptz,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  email text GENERATED ALWAYS AS (lower(identity_data->>'email')) STORED,
  PRIMARY KEY (provider, id)
);

-- Grant permissions on auth tables
GRANT ALL ON ALL TABLES IN SCHEMA auth TO supabase_auth_admin;
GRANT ALL ON ALL SEQUENCES IN SCHEMA auth TO supabase_auth_admin;

-- Create indexes
CREATE INDEX IF NOT EXISTS users_instance_id_idx ON auth.users(instance_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_instance_id_idx ON auth.refresh_tokens(instance_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_instance_id_user_id_idx ON auth.refresh_tokens(instance_id, user_id);
CREATE INDEX IF NOT EXISTS refresh_tokens_token_idx ON auth.refresh_tokens(token);
CREATE INDEX IF NOT EXISTS sessions_user_id_idx ON auth.sessions(user_id);
CREATE INDEX IF NOT EXISTS identities_user_id_idx ON auth.identities(user_id);

COMMENT ON TABLE auth.users IS 'Auth: Stores user login data within a secure schema.';
