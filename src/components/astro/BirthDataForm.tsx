'use client';

import { useState, useEffect, useCallback } from 'react';
import { Button } from '@/components/ui';
import { GeoLocation } from '@/lib/astro/types';
import { searchCitiesLocal } from '@/lib/astro/cities';

interface BirthDataFormProps {
  onSubmit: (data: {
    date: string;
    time: string;
    location: GeoLocation;
  }) => void;
  isLoading?: boolean;
}

export function BirthDataForm({ onSubmit, isLoading = false }: BirthDataFormProps) {
  const [date, setDate] = useState('');
  const [time, setTime] = useState('12:00');
  const [cityQuery, setCityQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState<GeoLocation | null>(null);
  const [suggestions, setSuggestions] = useState<GeoLocation[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Recherche de villes avec debounce
  useEffect(() => {
    if (cityQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    const timer = setTimeout(() => {
      const results = searchCitiesLocal(cityQuery, 8);
      setSuggestions(results);
      setShowSuggestions(results.length > 0);
    }, 200);

    return () => clearTimeout(timer);
  }, [cityQuery]);

  const handleCitySelect = useCallback((city: GeoLocation) => {
    setSelectedCity(city);
    setCityQuery(`${city.name}, ${city.country}`);
    setShowSuggestions(false);
    setErrors((prev) => ({ ...prev, location: '' }));
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};

    if (!date) {
      newErrors.date = 'La date de naissance est requise';
    }

    if (!time) {
      newErrors.time = 'L\'heure de naissance est requise';
    }

    if (!selectedCity) {
      newErrors.location = 'Le lieu de naissance est requis';
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    onSubmit({
      date,
      time,
      location: selectedCity!,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Date de naissance */}
      <div>
        <label
          htmlFor="birthDate"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          Date de naissance
        </label>
        <input
          type="date"
          id="birthDate"
          value={date}
          onChange={(e) => {
            setDate(e.target.value);
            setErrors((prev) => ({ ...prev, date: '' }));
          }}
          className={`w-full px-4 py-3 rounded-xl border bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
            errors.date
              ? 'border-red-500'
              : 'border-[var(--color-border)]'
          }`}
          max={new Date().toISOString().split('T')[0]}
        />
        {errors.date && (
          <p className="mt-1 text-sm text-red-500">{errors.date}</p>
        )}
      </div>

      {/* Heure de naissance */}
      <div>
        <label
          htmlFor="birthTime"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          Heure de naissance
        </label>
        <input
          type="time"
          id="birthTime"
          value={time}
          onChange={(e) => {
            setTime(e.target.value);
            setErrors((prev) => ({ ...prev, time: '' }));
          }}
          className={`w-full px-4 py-3 rounded-xl border bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
            errors.time
              ? 'border-red-500'
              : 'border-[var(--color-border)]'
          }`}
        />
        {errors.time && (
          <p className="mt-1 text-sm text-red-500">{errors.time}</p>
        )}
        <p className="mt-1 text-xs text-[var(--color-text-muted)]">
          Si vous ne connaissez pas l'heure exacte, indiquez 12:00
        </p>
      </div>

      {/* Lieu de naissance */}
      <div className="relative">
        <label
          htmlFor="birthPlace"
          className="block text-sm font-medium text-[var(--color-text-primary)] mb-2"
        >
          Lieu de naissance
        </label>
        <input
          type="text"
          id="birthPlace"
          value={cityQuery}
          onChange={(e) => {
            setCityQuery(e.target.value);
            setSelectedCity(null);
            setErrors((prev) => ({ ...prev, location: '' }));
          }}
          onFocus={() => {
            if (suggestions.length > 0) {
              setShowSuggestions(true);
            }
          }}
          onBlur={() => {
            // Délai pour permettre le clic sur une suggestion
            setTimeout(() => setShowSuggestions(false), 200);
          }}
          placeholder="Tapez une ville..."
          className={`w-full px-4 py-3 rounded-xl border bg-white text-[var(--color-text-primary)] focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] transition-all ${
            errors.location
              ? 'border-red-500'
              : 'border-[var(--color-border)]'
          }`}
          autoComplete="off"
        />

        {/* Suggestions dropdown */}
        {showSuggestions && suggestions.length > 0 && (
          <div className="absolute z-50 w-full mt-1 bg-white border border-[var(--color-border)] rounded-xl shadow-lg max-h-60 overflow-auto">
            {suggestions.map((city, index) => (
              <button
                key={`${city.name}-${city.country}-${index}`}
                type="button"
                onClick={() => handleCitySelect(city)}
                className="w-full px-4 py-3 text-left hover:bg-[var(--color-bg-tertiary)] transition-colors first:rounded-t-xl last:rounded-b-xl"
              >
                <span className="font-medium text-[var(--color-text-primary)]">
                  {city.name}
                </span>
                <span className="text-sm text-[var(--color-text-muted)] ml-2">
                  {city.country}
                </span>
              </button>
            ))}
          </div>
        )}

        {errors.location && (
          <p className="mt-1 text-sm text-red-500">{errors.location}</p>
        )}

        {selectedCity && (
          <p className="mt-1 text-xs text-[var(--color-text-muted)]">
            Coordonnées: {selectedCity.latitude.toFixed(4)}°N, {selectedCity.longitude.toFixed(4)}°E
          </p>
        )}
      </div>

      {/* Bouton de soumission */}
      <Button
        type="submit"
        variant="gold"
        size="lg"
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? (
          <span className="flex items-center justify-center gap-2">
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            Calcul en cours...
          </span>
        ) : (
          'Calculer mon thème astral'
        )}
      </Button>
    </form>
  );
}
