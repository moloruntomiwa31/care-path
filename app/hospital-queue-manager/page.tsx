'use client';

import { useState, useEffect } from 'react';
import Sidebar from '@/components/common/Sidebar';
import QueueRegistration from '@/components/queue/QueueRegistration';
import AvailableHospitals from '@/components/queue/AvailableHospitals';
import ActiveQueues from '@/components/queue/ActiveQueues';
import { User, QueueHospital, QueueEntry } from '@/types/Queue';
import { fetchQueueHospitals, joinQueue, fetchUserQueues } from '@/utils/queueApi';

export default function HospitalQueueManager() {
  const [user, setUser] = useState<User | null>(null);
  const [hospitals, setHospitals] = useState<QueueHospital[]>([]);
  const [queues, setQueues] = useState<QueueEntry[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      loadData();
      const interval = setInterval(loadData, 5000);
      return () => clearInterval(interval);
    }
  }, [user]);

  const loadData = async () => {
    const [hospitalData, queueData] = await Promise.all([
      fetchQueueHospitals(),
      fetchUserQueues(user!.id)
    ]);
    setHospitals(hospitalData);
    setQueues(queueData);
  };

  const handleRegister = (data: { name: string; email: string; address: string; age: number }) => {
    setUser({ id: Date.now().toString(), ...data });
  };

  const handleJoinQueue = async (hospitalId: string) => {
    if (!user) return;
    setLoading(true);
    const entry = await joinQueue(hospitalId, user.id);
    setQueues([...queues, entry]);
    setLoading(false);
  };

  if (!user) {
    return (
      <div className="h-screen flex">
        <Sidebar />
        <div className="flex-1 flex flex-col bg-gradient-to-br from-primary/5 to-secondary/5">
          <header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
            <div className="flex flex-col justify-center h-10">
              <h2 className="text-lg font-bold text-gray-900">Queue Manager</h2>
              <p className="text-xs text-gray-500">Register to join hospital queues</p>
            </div>
          </header>
          <div className="flex-1 flex items-center justify-center p-4">
            <QueueRegistration onRegister={handleRegister} />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col bg-linear-to-br from-gray-50 to-gray-100">
        <header className="bg-white/80 backdrop-blur-sm shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-lg font-bold text-gray-900">Queue Manager</h2>
              <p className="text-xs text-gray-500">Welcome back, {user.name} 👋</p>
            </div>
            <div className="flex items-center gap-2 bg-linear-to-r from-primary/10 to-secondary/10 px-4 py-2 rounded-full">
              <span className="text-xs font-medium text-gray-700 hidden md:block">Live Updates</span>
              <span className="text-xs font-medium text-gray-700 md:hidden">Live</span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>
          </div>
        </header>
        <div className="flex-1 overflow-y-auto p-6">
          <ActiveQueues queues={queues} />
          <AvailableHospitals hospitals={hospitals} queues={queues} loading={loading} onJoinQueue={handleJoinQueue} />
        </div>
      </div>
    </div>
  );
}
