export interface User {
  id: string;
  name: string;
  email: string;
  address: string;
  age: number;
}

export interface QueueHospital {
  id: string;
  name: string;
  address: string;
  currentQueue: number;
  estimatedWait: number;
}

export interface QueueEntry {
  id: string;
  hospitalId: string;
  hospitalName: string;
  position: number;
  status: 'waiting' | 'called' | 'completed';
  joinedAt: string;
}
