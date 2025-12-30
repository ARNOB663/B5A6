import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Polyline, useMap } from 'react-leaflet';
import L from 'leaflet';
import { Coordinates, generateRoutePath, calculateDistance, estimateTime } from '../../utils/mapUtils';
import { pickupIcon, dropoffIcon, driverIcon } from './Map';
import { Clock, MapPin } from 'lucide-react';

interface RouteMapProps {
    pickup?: Coordinates;
    dropoff?: Coordinates;
    driverLocation?: Coordinates;
    className?: string;
    showRoute?: boolean;
}

// Component to fit map bounds to show all markers
const FitBounds: React.FC<{ bounds: L.LatLngBounds }> = ({ bounds }) => {
    const map = useMap();

    useEffect(() => {
        if (bounds.isValid()) {
            map.fitBounds(bounds, { padding: [50, 50] });
        }
    }, [bounds, map]);

    return null;
};

const RouteMap: React.FC<RouteMapProps> = ({
    pickup,
    dropoff,
    driverLocation,
    className = '',
    showRoute = true
}) => {
    const [routePath, setRoutePath] = useState<[number, number][]>([]);
    const [distance, setDistance] = useState<number>(0);
    const [estimatedTime, setEstimatedTime] = useState<number>(0);

    // Calculate route when pickup and dropoff change
    useEffect(() => {
        if (pickup && dropoff && showRoute) {
            const path = generateRoutePath(pickup, dropoff);
            setRoutePath(path);

            const dist = calculateDistance(pickup, dropoff);
            setDistance(dist);
            setEstimatedTime(estimateTime(dist));
        } else {
            setRoutePath([]);
            setDistance(0);
            setEstimatedTime(0);
        }
    }, [pickup, dropoff, showRoute]);

    // Calculate map bounds
    const getBounds = (): L.LatLngBounds => {
        const points: [number, number][] = [];

        if (pickup) points.push([pickup.latitude, pickup.longitude]);
        if (dropoff) points.push([dropoff.latitude, dropoff.longitude]);
        if (driverLocation) points.push([driverLocation.latitude, driverLocation.longitude]);

        if (points.length === 0) {
            // Default bounds (Dhaka)
            return L.latLngBounds([[23.7, 90.3], [23.9, 90.5]]);
        }

        return L.latLngBounds(points);
    };

    const center: [number, number] = pickup
        ? [pickup.latitude, pickup.longitude]
        : [23.8103, 90.4125];

    return (
        <div className={`relative h-full w-full ${className}`}>
            <MapContainer
                center={center}
                zoom={13}
                className="h-full w-full rounded-xl"
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <FitBounds bounds={getBounds()} />

                {/* Pickup Marker */}
                {pickup && (
                    <Marker
                        position={[pickup.latitude, pickup.longitude]}
                        icon={pickupIcon}
                    />
                )}

                {/* Dropoff Marker */}
                {dropoff && (
                    <Marker
                        position={[dropoff.latitude, dropoff.longitude]}
                        icon={dropoffIcon}
                    />
                )}

                {/* Driver Marker */}
                {driverLocation && (
                    <Marker
                        position={[driverLocation.latitude, driverLocation.longitude]}
                        icon={driverIcon}
                    />
                )}

                {/* Route Polyline */}
                {routePath.length > 0 && (
                    <Polyline
                        positions={routePath}
                        color="#6366f1"
                        weight={4}
                        opacity={0.7}
                    />
                )}
            </MapContainer>

            {/* Route Info Overlay */}
            {distance > 0 && (
                <div className="absolute bottom-4 left-4 right-4 bg-white rounded-lg shadow-lg p-4 animate-slide-up z-[1000]">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                            <MapPin className="h-5 w-5 text-indigo-600" />
                            <div>
                                <p className="text-sm text-gray-500">Distance</p>
                                <p className="text-lg font-bold text-gray-900">{distance.toFixed(2)} km</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            <Clock className="h-5 w-5 text-indigo-600" />
                            <div>
                                <p className="text-sm text-gray-500">Est. Time</p>
                                <p className="text-lg font-bold text-gray-900">{estimatedTime} min</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RouteMap;
