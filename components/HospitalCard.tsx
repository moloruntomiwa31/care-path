'use client';

import { Hospital } from '@/types/Hospital';

interface HospitalCardProps {
  hospital: Hospital;
  onClick: () => void;
}

export default function HospitalCard({ hospital, onClick }: HospitalCardProps) {
  return (
    <div
      onClick={onClick}
      className="bg-white rounded-xl p-4 shadow-sm border border-gray-100 hover:shadow-md hover:border-primary transition-all cursor-pointer"
    >
      <div className="flex justify-between items-start mb-2">
        <h3 className="font-semibold text-gray-900 text-sm">
          {hospital.name}
        </h3>
        <span className="text-xs px-2 py-1 capitalize bg-secondary text-white rounded-full">
          {hospital.type}
        </span>
      </div>
      <p className="text-xs text-gray-600 mb-2">{hospital.address}</p>
      <div className="flex justify-between items-center text-xs">
        <span className="text-gray-500">{hospital.phone}</span>
        {hospital.distance && (
          <span className="text-primary font-medium">
            {hospital.distance.toFixed(1)} km
          </span>
        )}
      </div>
    </div>
  );
}
