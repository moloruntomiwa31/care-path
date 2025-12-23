'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import SplashScreen from '@/components/common/SplashScreen';

export default function Home() {
  const router = useRouter();
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const hasSeenSplash = localStorage.getItem('hasSeenSplash');
    if (hasSeenSplash) {
      router.push('/hospital-finder');
    } else {
      setShowSplash(true);
    }
  }, [router]);

  const handleGetStarted = () => {
    localStorage.setItem('hasSeenSplash', 'true');
    router.push('/hospital-finder');
  };

  if (!showSplash) return null;

  return <SplashScreen onGetStarted={handleGetStarted} />;
}
