'use client';

import { useAppStore } from '@/store/useAppStore';

export default function HospitalDetails() {
  const { selectedHospital, setSelectedHospital } = useAppStore();

  if (!selectedHospital) return null;

  return (
    <div className="h-full overflow-y-auto p-4">
      <button
        onClick={() => setSelectedHospital(null)}
        className="mb-4 text-primary cursor-pointer text-sm font-medium flex items-center gap-1 hover:underline"
      >
        ← Back to list
      </button>
      <div className="mb-4 flex-row-reverse flex items-center justify-between">
        <span className="capitalize inline-block px-3 py-1 bg-secondary text-white text-xs rounded-full mb-2">
          {selectedHospital.type}
        </span>
        <h2 className="text-xl font-bold text-gray-900">{selectedHospital.name}</h2>
      </div>
      <div className="space-y-4">
        <div className="flex items-start gap-3">
          <span className="text-primary text-xl">📍</span>
          <div>
            <p className="text-sm font-medium text-gray-700">Address</p>
            <p className="text-sm text-gray-600">{selectedHospital.address}</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <span className="text-primary text-xl">📞</span>
          <div>
            <p className="text-sm font-medium text-gray-700">Phone</p>
            <p className="text-sm text-gray-600">{selectedHospital.phone}</p>
          </div>
        </div>
        {selectedHospital.distance && (
          <div className="flex items-start gap-3">
            <span className="text-primary text-xl">📏</span>
            <div>
              <p className="text-sm font-medium text-gray-700">Distance</p>
              <p className="text-sm text-gray-600">{selectedHospital.distance.toFixed(1)} km</p>
            </div>
          </div>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/dir/?api=1&destination=${selectedHospital.lat},${selectedHospital.lng}`}
        target="_blank"
        rel="noopener noreferrer"
        className="block w-full mt-6 bg-primary text-white py-3 rounded-lg font-medium shadow hover:bg-primary-dark transition-colors text-center"
      >
        Get Directions
      </a>
    </div>
  );
}
