export default function Preloader() {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-998">
      <div className="bg-white rounded-lg p-6 flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
        <p className="text-gray-700 font-medium">Loading...</p>
      </div>
    </div>
  );
}
