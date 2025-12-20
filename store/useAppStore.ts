import { create } from 'zustand';
import { Hospital } from '@/types/Hospital';

interface AppState {
  showSplash: boolean;
  loading: boolean;
  userLocation: { lat: number; lng: number } | null;
  locationName: string | null;
  hospitals: Hospital[];
  selectedHospital: Hospital | null;
  setShowSplash: (show: boolean) => void;
  setLoading: (loading: boolean) => void;
  setUserLocation: (location: { lat: number; lng: number } | null) => void;
  setLocationName: (name: string | null) => void;
  setHospitals: (hospitals: Hospital[]) => void;
  setSelectedHospital: (hospital: Hospital | null) => void;
}

export const useAppStore = create<AppState>((set) => ({
  showSplash: true,
  loading: false,
  userLocation: null,
  locationName: null,
  hospitals: [],
  selectedHospital: null,
  setShowSplash: (show) => set({ showSplash: show }),
  setLoading: (loading) => set({ loading }),
  setUserLocation: (location) => set({ userLocation: location }),
  setLocationName: (name) => set({ locationName: name }),
  setHospitals: (hospitals) => set({ hospitals }),
  setSelectedHospital: (hospital) => set({ selectedHospital: hospital }),
}));
