import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in React-Leaflet
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
    center: [number, number];
    zoom?: number;
    markers?: Array<{
        position: [number, number];
        popup?: string;
        icon?: L.Icon;
    }>;
    className?: string;
    onMapClick?: (lat: number, lng: number) => void;
}

// Component to handle map centering
const MapController: React.FC<{ center: [number, number]; zoom: number }> = ({ center, zoom }) => {
    const map = useMap();

    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);

    return null;
};

const Map: React.FC<MapProps> = ({
    center,
    zoom = 13,
    markers = [],
    className = '',
    onMapClick
}) => {
    return (
        <div className={`h-full w-full ${className}`}>
            <MapContainer
                center={center}
                zoom={zoom}
                className="h-full w-full rounded-xl"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <MapController center={center} zoom={zoom} />

                {markers.map((marker, index) => (
                    <Marker
                        key={index}
                        position={marker.position}
                        icon={marker.icon || DefaultIcon}
                    >
                        {marker.popup && <Popup>{marker.popup}</Popup>}
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;

// Create custom marker icons
export const createCustomIcon = (color: string, iconHtml?: string): L.DivIcon => {
    return L.divIcon({
        className: 'custom-marker',
        html: `
            <div class="custom-marker-icon" style="background-color: ${color};">
                ${iconHtml || '📍'}
            </div>
        `,
        iconSize: [32, 32],
        iconAnchor: [16, 32]
    });
};

export const pickupIcon = createCustomIcon('#10b981', '🟢');
export const dropoffIcon = createCustomIcon('#ef4444', '🔴');
export const driverIcon = createCustomIcon('#3b82f6', '🚗');
