'use client';

import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import dynamic from 'next/dynamic';
import { FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import styles from '@/styles/LocationWidget.module.css';
import 'leaflet/dist/leaflet.css';

// Dynamically import map to avoid SSR issues
const MapContainer = dynamic(
  () => import('react-leaflet').then((mod) => mod.MapContainer),
  { ssr: false }
);
const TileLayer = dynamic(
  () => import('react-leaflet').then((mod) => mod.TileLayer),
  { ssr: false }
);
const Marker = dynamic(
  () => import('react-leaflet').then((mod) => mod.Marker),
  { ssr: false }
);
const Popup = dynamic(
  () => import('react-leaflet').then((mod) => mod.Popup),
  { ssr: false }
);

interface LocationWidgetProps {
  city?: string;
  country?: string;
  latitude?: number;
  longitude?: number;
  timezone?: string;
}

export default function LocationWidget({
  city = 'New Delhi',
  country = 'India',
  latitude = 28.6139,
  longitude = 77.2090,
  timezone = 'Asia/Kolkata',
}: LocationWidgetProps) {
  const [currentTime, setCurrentTime] = useState<string>('');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    
    const updateTime = () => {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      setCurrentTime(timeString);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, [timezone]);

  useEffect(() => {
    if (mounted && typeof window !== 'undefined') {
      // Fix for default marker icon
      (async () => {
        const L = (await import('leaflet')).default;
        // @ts-expect-error - Leaflet marker icon workaround
        delete L.Icon.Default.prototype._getIconUrl;
        L.Icon.Default.mergeOptions({
          iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
          iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
          shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
        });
      })();
    }
  }, [mounted]);

  return (
    <motion.div
      className={styles.locationWidget}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className={styles.header}>
        <h3 className={styles.title}>Location</h3>
      </div>

      <div className={styles.content}>
        <div className={styles.info}>
          <div className={styles.infoItem}>
            <FaMapMarkerAlt className={styles.icon} />
            <div>
              <div className={styles.city}>{city}</div>
              <div className={styles.country}>{country}</div>
            </div>
          </div>

          <div className={styles.infoItem}>
            <FaClock className={styles.icon} />
            <div>
              <div className={styles.time}>{currentTime || '00:00'}</div>
              <div className={styles.timezone}>Local Time</div>
            </div>
          </div>
        </div>

        {mounted && (
          <div className={styles.mapContainer}>
            <MapContainer
              center={[latitude, longitude]}
              zoom={11}
              scrollWheelZoom={false}
              className={styles.map}
              zoomControl={false}
              dragging={false}
            >
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Marker position={[latitude, longitude]}>
                <Popup>
                  {city}, {country}
                </Popup>
              </Marker>
            </MapContainer>
          </div>
        )}
      </div>
    </motion.div>
  );
}

