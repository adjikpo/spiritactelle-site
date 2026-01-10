export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type UserRole = 'user' | 'premium' | 'admin';

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string;
          full_name: string | null;
          avatar_url: string | null;
          role: UserRole;
          birth_date: string | null;
          birth_time: string | null;
          birth_place: string | null;
          birth_latitude: number | null;
          birth_longitude: number | null;
          birth_timezone: string | null;
          is_premium: boolean;
          premium_until: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id: string;
          email: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          birth_date?: string | null;
          birth_time?: string | null;
          birth_place?: string | null;
          birth_latitude?: number | null;
          birth_longitude?: number | null;
          birth_timezone?: string | null;
          is_premium?: boolean;
          premium_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          email?: string;
          full_name?: string | null;
          avatar_url?: string | null;
          role?: UserRole;
          birth_date?: string | null;
          birth_time?: string | null;
          birth_place?: string | null;
          birth_latitude?: number | null;
          birth_longitude?: number | null;
          birth_timezone?: string | null;
          is_premium?: boolean;
          premium_until?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      natal_charts: {
        Row: {
          id: string;
          user_id: string;
          name: string;
          birth_date: string;
          birth_time: string;
          birth_place: string;
          latitude: number;
          longitude: number;
          timezone: string;
          chart_data: Json;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          name: string;
          birth_date: string;
          birth_time: string;
          birth_place: string;
          latitude: number;
          longitude: number;
          timezone: string;
          chart_data: Json;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          name?: string;
          birth_date?: string;
          birth_time?: string;
          birth_place?: string;
          latitude?: number;
          longitude?: number;
          timezone?: string;
          chart_data?: Json;
          created_at?: string;
        };
      };
      card_readings: {
        Row: {
          id: string;
          user_id: string;
          spread_type: string;
          cards: Json;
          interpretation: string | null;
          question: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          spread_type: string;
          cards: Json;
          interpretation?: string | null;
          question?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          spread_type?: string;
          cards?: Json;
          interpretation?: string | null;
          question?: string | null;
          created_at?: string;
        };
      };
      articles: {
        Row: {
          id: string;
          title: string;
          slug: string;
          content: string;
          excerpt: string | null;
          cover_image: string | null;
          author_id: string;
          category: string;
          tags: string[];
          is_premium: boolean;
          is_published: boolean;
          published_at: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          slug: string;
          content: string;
          excerpt?: string | null;
          cover_image?: string | null;
          author_id: string;
          category: string;
          tags?: string[];
          is_premium?: boolean;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          slug?: string;
          content?: string;
          excerpt?: string | null;
          cover_image?: string | null;
          author_id?: string;
          category?: string;
          tags?: string[];
          is_premium?: boolean;
          is_published?: boolean;
          published_at?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
      meditations: {
        Row: {
          id: string;
          title: string;
          description: string | null;
          audio_url: string;
          duration: number;
          category: string;
          cover_image: string | null;
          is_premium: boolean;
          play_count: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          title: string;
          description?: string | null;
          audio_url: string;
          duration: number;
          category: string;
          cover_image?: string | null;
          is_premium?: boolean;
          play_count?: number;
          created_at?: string;
        };
        Update: {
          id?: string;
          title?: string;
          description?: string | null;
          audio_url?: string;
          duration?: number;
          category?: string;
          cover_image?: string | null;
          is_premium?: boolean;
          play_count?: number;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      user_role: UserRole;
    };
  };
}

// Helper types
export type Profile = Database['public']['Tables']['profiles']['Row'];
export type NatalChart = Database['public']['Tables']['natal_charts']['Row'];
export type CardReading = Database['public']['Tables']['card_readings']['Row'];
export type Article = Database['public']['Tables']['articles']['Row'];
export type Meditation = Database['public']['Tables']['meditations']['Row'];
