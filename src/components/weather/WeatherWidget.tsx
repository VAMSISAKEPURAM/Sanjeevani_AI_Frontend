'use client';

import { useState, useEffect, useRef } from 'react';
import {
  Droplets,
  Wind,
  MapPin,
  Loader2,
  AlertCircle,
  CalendarDays,
} from 'lucide-react';
import { getWeather, getForecast, WeatherData, ForecastData } from '@/lib/weather';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/utils';

interface WeatherWidgetProps {
  onLocationAccessed?: () => void;
  className?: string;
}

export default function WeatherWidget({
  onLocationAccessed,
  className,
}: WeatherWidgetProps) {
  const { t } = useLanguage();
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [forecast, setForecast] = useState<ForecastData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const isMounted = useRef(false);

  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);

  const fetchWeather = async (lat: number, lon: number, isRetry = false) => {
    try {
      const [weatherData, forecastData] = await Promise.all([
        getWeather(lat, lon),
        getForecast(lat, lon),
      ]);

      if (isMounted.current) {
        setWeather(weatherData);
        setForecast(forecastData);
        setError(null);
      }
    } catch (err: unknown) {
      console.error('Error fetching weather:', err);
      if (isMounted.current) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to fetch weather data';
        setError(errorMessage);
        if (!isRetry) fallbackToDemo();
      }
    } finally {
      if (isMounted.current) setLoading(false);
    }
  };

  const fallbackToDemo = () => {
    setWeather({
      temp: 28,
      condition: 'Partly Cloudy',
      humidity: 65,
      windSpeed: 12,
      location: 'Tirupati (Demo)',
      icon: '02d',
    });
    setForecast(null); // Or set demo forecast if needed
  };

  const handleSuccess = (position: GeolocationPosition) => {
    if (!isMounted.current) return;
    fetchWeather(position.coords.latitude, position.coords.longitude);
    if (onLocationAccessed) {
      onLocationAccessed();
    }
  };

  const handleError = (err: GeolocationPositionError) => {
    if (!isMounted.current) return;

    console.error('Geolocation error:', err);
    let msg = 'Location error';
    if (err.code === 1) msg = 'Location denied';
    if (err.code === 2) msg = 'Position unavailable';
    if (err.code === 3) msg = 'Location timed out';

    setError(`${msg} (${err.message})`);
    setLoading(false);
    fallbackToDemo();
  };

  const getLocation = () => {
    if (!('geolocation' in navigator)) {
      setError('Geolocation is not supported by your browser');
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);

    const options = {
      enableHighAccuracy: false,
      timeout: 15000,
      maximumAge: 30000,
    };

    navigator.geolocation.getCurrentPosition(
      handleSuccess,
      handleError,
      options
    );
  };

  useEffect(() => {
    getLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleManualRetry = () => {
    getLocation();
  };

  const getDailyForecast = () => {
    if (!forecast) return [];

    // Group by day and take noon reading or first reading of the day
    const daily: Record<string, any> = {};
    forecast.list.forEach((item) => {
      const date = item.dt_txt.split(' ')[0];
      if (!daily[date] && Object.keys(daily).length < 5) {
        daily[date] = item;
      } else if (daily[date] && item.dt_txt.includes('12:00:00')) {
        // Prefer noon forecast if available
        daily[date] = item;
      }
    });
    return Object.values(daily);
  };

  if (loading) {
    return (
      <div className="rounded-xl border border-border/60 bg-linear-to-br from-white via-green-50/30 to-blue-50/30 p-4 shadow-sm sm:h-[105px] h-[210px] flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
        <span className="ml-2 text-sm text-muted-foreground">Locating...</span>
      </div>
    );
  }

  const displayWeather = weather || {
    temp: 28,
    condition: 'Partly Cloudy',
    humidity: 65,
    windSpeed: 12,
    location: 'Tirupati (Demo)',
    icon: '02d',
  };

  const dailyForecast = getDailyForecast();

  return (
    <div
      className={cn(
        'rounded-2xl border border-border/60 bg-linear-to-br from-white via-green-50/30 to-blue-50/30 p-5 shadow-sm transition-all duration-300',
        className
      )}
    >
      <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
        {/* Main Weather Info */}
        <div className="flex items-center gap-5">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-600 shadow-sm ring-1 ring-blue-500/10 overflow-hidden relative">
            <img
              src={`https://openweathermap.org/img/wn/${displayWeather.icon}@2x.png`}
              alt={displayWeather.condition}
              className="w-12 h-12 object-contain"
            />
          </div>
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold tracking-tight text-foreground">
                {displayWeather.temp}°
              </span>
              <span className="text-sm font-medium text-muted-foreground/80">
                {t.weatherWidget.celsius}
              </span>
            </div>
            <div className="text-base font-medium text-foreground/80">
              {displayWeather.condition}
            </div>
          </div>
        </div>

        {/* Stats & Location */}
        <div className="flex flex-1 w-full sm:w-auto items-center justify-between sm:justify-end gap-x-8 gap-y-4 flex-wrap">
          <div className="flex items-center gap-3 space-x-2">
            <div className="rounded-full bg-blue-100/50 p-2 text-blue-600">
              <Droplets className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t.weatherWidget.humidity}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {displayWeather.humidity}%
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 space-x-2">
            <div className="rounded-full bg-slate-100/50 p-2 text-slate-600">
              <Wind className="h-4 w-4" />
            </div>
            <div className="space-y-0.5">
              <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
                {t.weatherWidget.wind}
              </p>
              <p className="text-sm font-semibold text-foreground">
                {displayWeather.windSpeed} km/h
              </p>
            </div>
          </div>

          <div className="hidden sm:block h-8 w-px bg-border/60" />

          <div className="flex items-center rounded-full bg-white/60 px-3 py-1.5 text-xs font-medium text-muted-foreground border border-border/40 shadow-sm backdrop-blur-sm">
            <MapPin className="mr-1.5 h-3.5 w-3.5 text-primary" />
            {displayWeather.location}
          </div>
        </div>
      </div>

      {/* Rain Percentage - Desktop: inline, Mobile: new row/wrap */}
      {forecast && forecast.list.length > 0 && (
        <div className="mt-4 flex items-center justify-end sm:justify-start gap-3 px-1 border-t border-border/40 pt-3 sm:border-0 sm:pt-0 sm:mt-0 sm:absolute sm:top-5 sm:right-64 sm:mr-4">
          <div className="flex items-center gap-2 text-cyan-700 bg-cyan-50/50 px-2 py-1 rounded-lg">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-800/70">{t.weatherWidget.rain}</span>
            <span className="font-bold text-cyan-900">{Math.round(forecast.list[0].pop * 100)}%</span>
          </div>
        </div>
      )}

      {/* Forecast Section */}
      {dailyForecast.length > 0 && (
        <div className="mt-6 pt-4 border-t border-border/40">
          <div className="flex items-center gap-2 mb-3 text-sm font-medium text-muted-foreground">
            <CalendarDays className="h-4 w-4" />
            <span>5-Day Forecast</span>
          </div>
          <div className="grid grid-cols-5 gap-2">
            {dailyForecast.map((day, idx) => (
              <div key={idx} className="flex flex-col items-center p-2 rounded-lg bg-white/40 hover:bg-white/60 transition-colors">
                <span className="text-xs font-medium text-muted-foreground">
                  {new Date(day.dt * 1000).toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                {/* 
                  Since we don't have separate icons for all conditions in the component yet,
                  we can try to map them or just use a generic one if we don't want to import all.
                  The weather API gives an icon code. We can use it if we construct the URL.
                  http://openweathermap.org/img/wn/10d@2x.png
                */}
                <img
                  src={`https://openweathermap.org/img/wn/${day.weather[0].icon}.png`}
                  alt={day.weather[0].main}
                  className="w-8 h-8 opacity-80"
                />
                <span className="text-sm font-semibold text-foreground">
                  {Math.round(day.main.temp)}°
                </span>
              </div>
            ))}
          </div>
        </div>
      )
      }

      {
        error && (
          <div className="mt-4 flex items-center justify-center gap-2 rounded-lg bg-amber-50 p-2 text-xs font-medium text-amber-700 border border-amber-100">
            <AlertCircle className="h-3.5 w-3.5 shrink-0" />
            <span className="flex-1">
              {t.weatherWidget.demoData}: {error}
            </span>
            <button
              onClick={handleManualRetry}
              className="ml-2 p-1 hover:bg-amber-100 rounded-full transition-colors"
              title="Retry Location"
            >
              <Loader2 className={`h-3 w-3 ${loading ? 'animate-spin' : ''}`} />
            </button>
          </div>
        )
      }
    </div >
  );
}
