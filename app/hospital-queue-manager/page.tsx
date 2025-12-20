import Sidebar from '@/components/Sidebar';

export default function HospitalQueueManager() {
  return (
    <div className="h-screen flex">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <header className="bg-white shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
          <div className="flex flex-col justify-center h-10">
            <h2 className="text-lg font-bold text-gray-900">Queue Manager</h2>
            <p className="text-xs text-gray-500">Manage hospital appointments</p>
          </div>
        </header>
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Queue Manager</h2>
            <p className="text-gray-500">Coming soon...</p>
          </div>
        </div>
      </div>
    </div>
  );
}
