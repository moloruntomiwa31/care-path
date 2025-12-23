'use client';

import { QueueEntry } from '@/types/Queue';

interface ActiveQueuesProps {
  queues: QueueEntry[];
}

export default function ActiveQueues({ queues }: ActiveQueuesProps) {
  if (queues.length === 0) return null;

  return (
    <div className="mb-8">
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-2xl font-bold text-gray-900">Your Active Queues</h3>
        <span className="bg-primary text-white text-xs px-2 py-1 rounded-full font-semibold">{queues.length}</span>
      </div>
      <div className="grid lg:grid-cols-2 gap-4">
        {queues.map(q => (
          <div key={q.id} className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
            <div className="flex justify-between items-start mb-4">
              <div>
                <h4 className="font-bold text-gray-900 text-lg mb-1">{q.hospitalName}</h4>
                <p className="text-xs text-gray-500">Joined at {new Date(q.joinedAt).toLocaleTimeString()}</p>
              </div>
              <span className={`text-xs px-3 py-1.5 rounded-full font-semibold ${q.status === 'waiting' ? 'bg-yellow-100 text-yellow-700' : q.status === 'called' ? 'bg-green-100 text-green-700 animate-pulse' : 'bg-gray-100 text-gray-700'}`}>
                {q.status === 'waiting' ? '⏳ Waiting' : q.status === 'called' ? '✓ Called' : '✓ Done'}
              </span>
            </div>
            <div className="bg-linear-to-r from-primary to-secondary rounded-xl p-4 text-white">
              <p className="text-sm font-medium mb-1">Your Position</p>
              <p className="text-4xl font-bold">{q.position}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
