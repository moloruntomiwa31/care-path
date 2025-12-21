'use client';

import { useAppStore } from '@/store/useAppStore';
import HospitalCard from './HospitalCard';

export default function HospitalList() {
  const { hospitals, setSelectedHospital } = useAppStore();

  return (
    <div className="overflow-y-auto h-full p-4 space-y-3">
      <h2 className="text-xl font-bold text-gray-900 mb-4">
        Nearby Hospitals ({hospitals.length})
      </h2>
      {hospitals.length === 0 ? (
        <p className="text-gray-500 text-center py-8">
          No hospitals found nearby
        </p>
      ) : (
        hospitals.map((hospital) => (
          <HospitalCard
            key={hospital.id}
            hospital={hospital}
            onClick={() => setSelectedHospital(hospital)}
          />
        ))
      )}
    </div>
  );
}
