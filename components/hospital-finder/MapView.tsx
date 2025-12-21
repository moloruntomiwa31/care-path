'use client';

import { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import { useAppStore } from '@/store/useAppStore';

const userIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIxNiIgY3k9IjE2IiByPSIxMiIgZmlsbD0iIzI1NjNlYiIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIzIi8+PC9zdmc+',
  iconSize: [32, 32],
  iconAnchor: [16, 16],
});

const hospitalIcon = L.icon({
  iconUrl: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBkPSJNMTYgMkM5LjM3MyAyIDQgNy4zNzMgNCAxNEMgNCAyMi41IDE2IDMwIDE2IDMwQzE2IDMwIDI4IDIyLjUgMjggMTRDMjggNy4zNzMgMjIuNjI3IDIgMTYgMloiIGZpbGw9IiMxMGI5ODEiIHN0cm9rZT0id2hpdGUiIHN0cm9rZS13aWR0aD0iMiIvPjxyZWN0IHg9IjE0IiB5PSI4IiB3aWR0aD0iNCIgaGVpZ2h0PSIxMiIgZmlsbD0id2hpdGUiLz48cmVjdCB4PSIxMCIgeT0iMTIiIHdpZHRoPSIxMiIgaGVpZ2h0PSI0IiBmaWxsPSJ3aGl0ZSIvPjwvc3ZnPg==',
  iconSize: [32, 32],
  iconAnchor: [16, 32],
  popupAnchor: [0, -32],
});

function MapController() {
  const map = useMap();
  const userLocation = useAppStore((state) => state.userLocation);

  useEffect(() => {
    if (userLocation) {
      map.setView([userLocation.lat, userLocation.lng], 13);
    }
  }, [userLocation, map]);

  return null;
}

export default function MapView() {
  const { userLocation, hospitals, setSelectedHospital } = useAppStore();

  if (!userLocation) return null;

  return (
		<MapContainer
			center={[userLocation.lat, userLocation.lng]}
			zoom={13}
			className="w-full h-full"
			zoomControl={true}
		>
			<TileLayer
				url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
				attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
			/>
			<MapController />
			<Marker position={[userLocation.lat, userLocation.lng]} icon={userIcon}>
				<Tooltip direction="top" offset={[0, -10]} opacity={0.9} permanent>
					<span className="text-xs font-sans">Your Location</span>
				</Tooltip>
			</Marker>
			{hospitals.map((hospital) => (
				<Marker
					key={hospital.id}
					position={[hospital.lat, hospital.lng]}
					icon={hospitalIcon}
					eventHandlers={{
						click: () => setSelectedHospital(hospital),
					}}
				>
					<Tooltip direction="top" offset={[0, -32]} opacity={0.9} permanent>
						<div className="text-xs font-sans">
							<p className="font-bold capitalize">{hospital.name}</p>
							<p className="text-gray-600 capitalize">{hospital.type}</p>
						</div>
					</Tooltip>
				</Marker>
			))}
		</MapContainer>
	);
}
