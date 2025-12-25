import axios from 'axios';

const API_BASE_URL = 'https://063db69c-8000.uks1.devtunnels.ms/api';

export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export interface RegisterUserPayload {
  hospital: number;
  first_name: string;
  last_name: string;  
  email: string;
  phone: string;
  address: string;
  date_of_birth: string;
  status: string;
  patient_id: string;
}

export interface JoinQueuePayload {
	queue_status: string;
	patient: number;
	hospital: number;
}

export const queueService = {
  registerUser: async (data: RegisterUserPayload) => {
    const response = await apiClient.post('/patient/create/', data);
    return response.data;
  },

  getHospitals: async () => {
    const response = await apiClient.get('/hospitals/list/');
    return response.data;
  },

  getUserQueueData: async (patientId: number) => {
    const response = await apiClient.get(`/queue/find/${patientId}/`);
    // console.log('User Queue Data:', response.data);
    return response.data;
  },

  getQueues: async () => {
    const response = await apiClient.get('/queue/list/');
    // console.log('Queues Data:', response.data);
    return response.data;
  },

  joinQueue: async (data: JoinQueuePayload) => {
    const response = await apiClient.post('/queue/join/', data);
    // console.log('Join Queue Response:', response.data);
    return response.data;
  },

  changePatientStatus: async (patientId: string, status: string) => {
    const response = await apiClient.put(`/queue/update/${patientId}/`, { queue_status: status.toLocaleUpperCase });
    return response.data;
  }
};
