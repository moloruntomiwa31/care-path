export interface User {
  id: number;
  hospital: number;
  first_name: string;
  last_name: string;
  email: string;
  address: string;
  date_of_birth: string;
  status: string;
  patient_id: string;
}

export interface QueueHospital {
	id: number;
	queue_count: string;
	estimated_waiting_time: string;
	name: string;
	address: string;
	city: string;
	state: string;
	email: string;
	phone: string;
	longitude: number;
	latitude: number;
}

export enum QueueStatus {
  WAITING = "WAITING",
  CALLED = "CALLED",
  COMPLETED = "COMPLETED"
}
export interface QueueEntry {
	id: number;
	hospital: QueueHospital
	patient: User;
	queue_number: number;
	queue_status: QueueStatus;
	time_joined: string;
}
