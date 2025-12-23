import { QueueHospital, QueueEntry } from '@/types/Queue';

const mockHospitals: QueueHospital[] = [
  { id: '1', name: 'City General Hospital', address: '123 Main St', currentQueue: 12, estimatedWait: 45 },
  { id: '2', name: 'St. Mary Medical Center', address: '456 Oak Ave', currentQueue: 8, estimatedWait: 30 },
  { id: '3', name: 'Central Health Clinic', address: '789 Pine Rd', currentQueue: 5, estimatedWait: 20 },
  { id: '4', name: 'Metro Emergency Hospital', address: '321 Elm St', currentQueue: 15, estimatedWait: 60 },
];

export const fetchQueueHospitals = async (): Promise<QueueHospital[]> => {
  await new Promise(resolve => setTimeout(resolve, 800));
  return mockHospitals;
};

export const joinQueue = async (hospitalId: string, userId: string): Promise<QueueEntry> => {
  await new Promise(resolve => setTimeout(resolve, 1500));
  const hospital = mockHospitals.find(h => h.id === hospitalId);
  return {
    id: Date.now().toString(),
    hospitalId,
    hospitalName: hospital?.name || '',
    position: (hospital?.currentQueue || 0) + 1,
    status: 'waiting',
    joinedAt: new Date().toISOString(),
  };
};

export const fetchUserQueues = async (userId: string): Promise<QueueEntry[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return [];
};
