'use client';

import { QueueHospital, QueueEntry } from '@/types/Queue';

interface AvailableHospitalsProps {
  hospitals: QueueHospital[];
  queues: QueueEntry[];
  loading: boolean;
  onJoinQueue: (hospitalId: string) => void;
}

export default function AvailableHospitals({ hospitals, queues, loading, onJoinQueue }: AvailableHospitalsProps) {
  return (
    <div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">Available Hospitals</h3>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map(h => (
          <div key={h.id} className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:scale-[1.02] transition-all">
            <div className="flex items-start gap-3 mb-4">
              <div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0">
                <span className="text-2xl">🏥</span>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-bold text-gray-900 mb-1 truncate">{h.name}</h4>
                <p className="text-xs text-gray-500 truncate">{h.address}</p>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-primary/5 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Queue Size</p>
                <p className="text-2xl font-bold text-primary">{h.currentQueue}</p>
              </div>
              <div className="bg-secondary/5 rounded-xl p-3">
                <p className="text-xs text-gray-600 mb-1">Est. Wait</p>
                <p className="text-2xl font-bold text-secondary">{h.estimatedWait}<span className="text-sm">m</span></p>
              </div>
            </div>
            <button onClick={() => onJoinQueue(h.id)} disabled={loading || queues.some(q => q.hospitalId === h.id)} className="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all">
              {queues.some(q => q.hospitalId === h.id) ? '✓ In Queue' : '+ Join Queue'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
