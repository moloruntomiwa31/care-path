'use client';

import { useState } from 'react';

interface QueueRegistrationProps {
  onRegister: (data: { name: string; email: string; address: string; age: number }) => void;
}

export default function QueueRegistration({ onRegister }: QueueRegistrationProps) {
  const [formData, setFormData] = useState({ name: '', email: '', address: '', age: '' });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 500));
    onRegister({ ...formData, age: parseInt(formData.age) });
    setLoading(false);
  };

  return (
    <div className="w-full max-w-md">
      <div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-6">
        <div className="mb-5">
          <h2 className="text-xl font-bold text-gray-900">Registration</h2>
          <p className="text-sm text-gray-500">Let's get you started by creating an account.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-2">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Full Name</label>
            <input type="text" required value={formData.name} onChange={e => setFormData({ ...formData, name: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="John Doe" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Email Address</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="john@example.com" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Home Address</label>
            <input type="text" required value={formData.address} onChange={e => setFormData({ ...formData, address: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="123 Main Street" />
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Age</label>
            <input type="number" required min="1" max="120" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-all" placeholder="25" />
          </div>
          <button type="submit" disabled={loading} className="w-full bg-primary-dark text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 transition-all mt-6">
            {loading ? 'Creating Account...' : 'Get Started'}
          </button>
        </form>
      </div>
    </div>
  );
}
