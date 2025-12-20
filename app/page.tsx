'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAppStore } from '@/store/useAppStore';
import SplashScreen from '@/components/SplashScreen';

export default function Home() {
  const showSplash = useAppStore((state) => state.showSplash);
  const router = useRouter();

  useEffect(() => {
    if (!showSplash) {
      router.push('/hospital-finder');
    }
  }, [showSplash, router]);

  return <>{showSplash && <SplashScreen />}</>;
}
