'use client';

import { useAppStore } from '@/store/useAppStore';

export default function SplashScreen() {
  const setShowSplash = useAppStore((state) => state.setShowSplash);

  const features = [
    {
      icon: '🏥',
      title: 'Hospital Finder',
      description: 'Locate nearby hospitals and healthcare facilities with real-time distance tracking and detailed information.'
    },
    {
      icon: '📋',
      title: 'Queue Manager',
      description: 'Book appointments and manage your position in hospital queues to see doctors without long waiting times.'
    },
    {
      icon: '💊',
      title: 'Drug Validator',
      description: 'Verify drug authenticity and check if medications match your symptoms using our AI-powered validation system.'
    }
  ];

  return (
    <div className="fixed inset-0 bg-primary-dark flex items-center justify-center z-50 p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-8">
          <div className="text-white text-6xl font-bold mb-2">+</div>
          <h1 className="text-white text-5xl font-bold mb-2">CarePath</h1>
          <p className="text-white/90 text-lg">Your Complete Healthcare Companion</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {features.map((feature, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-center">
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-white font-bold text-lg mb-2">{feature.title}</h3>
              <p className="text-white/80 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <button
            onClick={() => setShowSplash(false)}
            className="bg-white text-primary px-8 py-3 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg cursor-pointer"
          >
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}
