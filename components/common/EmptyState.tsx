    export default function EmptyState({icon, title, message}: {icon: string; title: string; message: string}) {
        return (
					<div className="mb-8">
						<div className="bg-linear-to-br from-gray-50 to-gray-100 rounded-2xl border-2 border-dashed border-gray-300 p-8 text-center">
							<div className="text-gray-400 text-5xl mb-3">{icon}</div>
							<h3 className="text-lg font-semibold text-gray-700 mb-2">
								{title}
							</h3>
							<p className="text-sm text-gray-500">
								{message}
							</p>
						</div>
					</div>
				);
    }