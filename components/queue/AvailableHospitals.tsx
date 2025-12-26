"use client";

import { QueueHospital, QueueEntry } from "@/types/Queue";
import EmptyState from "../common/EmptyState";

interface AvailableHospitalsProps {
	hospitals: QueueHospital[];
	queues: QueueEntry[];
	loading: boolean;
	onJoinQueue: (hospitalId: number) => void;
	currentPatientId: number;
}

export default function AvailableHospitals({
	hospitals,
	queues,
	loading,
	onJoinQueue,
	currentPatientId,
}: AvailableHospitalsProps) {
	// Check if current patient is already in any queue
	const isPatientInAnyQueue = () => {
		if (!currentPatientId || !queues || queues.length === 0) return false;
		console.log("Current Patient ID:", currentPatientId);
		console.log("Queues:", queues);
		return queues.some((q) => {
			console.log(
				"Checking patient:",
				q.patient.id,
				"against",
				currentPatientId
			);
			return q.patient.id === currentPatientId;
		});
	};

	// Check if patient is in queue for a specific hospital
	const isInQueueForHospital = (hospitalId: number) => {
		if (!currentPatientId || !queues || queues.length === 0) return false;
		return queues.some(
			(q) => q.patient.id === currentPatientId && q.hospital.id === hospitalId
		);
	};

	if (hospitals.length === 0) {
		return (
			<EmptyState
				icon="🏥"
				title="No Hospitals Available"
				message="There are currently no hospitals available to join."
			/>
		);
	}

	const inAnyQueue = isPatientInAnyQueue();

	return (
		<div>
			<h3 className="text-2xl font-bold text-gray-900 mb-4">
				Available Hospitals
			</h3>
			<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
				{hospitals.map((h) => {
					const inThisQueue = isInQueueForHospital(h.id);

					return (
						<div
							key={h.id}
							className="bg-white rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl hover:scale-[1.02] transition-all"
						>
							<div className="p-4 bg-white rounded-2xl border border-gray-100 shadow-xs">
								<div className="flex items-start gap-3 mb-4">
									<div className="w-12 h-12 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-xl flex items-center justify-center flex-shrink-0 text-2xl">
										🏥
									</div>
									<div className="flex-1 min-w-0">
										<h4 className="font-bold text-gray-900 leading-tight truncate">
											{h.name}
										</h4>
										<p className="text-xs text-gray-500 mt-1 truncate">
											{h.address}
										</p>
										<p className="text-xs text-gray-400 truncate">
											{h.city}, {h.state}
										</p>
									</div>
								</div>

								{/* --- Contact Details --- */}
								<div className="bg-gray-50 rounded-lg p-3 mb-4 grid grid-cols-2 gap-3">
									<div className="min-w-0">
										<p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
											Phone
										</p>
										<p
											className="text-xs font-medium text-gray-700 truncate"
											title={h.phone}
										>
											{h.phone}
										</p>
									</div>
									<div className="min-w-0">
										<p className="text-[10px] uppercase tracking-wider text-gray-400 font-semibold mb-0.5">
											Email
										</p>
										<p
											className="text-xs font-medium text-gray-700 truncate"
											title={h.email}
										>
											{h.email}
										</p>
									</div>
								</div>

								{/* --- Stats Section --- */}
								<div className="grid grid-cols-2 gap-3">
									<div className="bg-primary/5 border border-primary/10 rounded-xl p-3 flex flex-col justify-center">
										<p className="text-xs text-gray-600 mb-1 font-medium">
											Queue Size
										</p>
										<p className="text-2xl font-bold text-primary tracking-tight">
											{h.queue_count}
										</p>
									</div>
									<div className="bg-secondary/5 border border-secondary/10 rounded-xl p-3 flex flex-col justify-center">
										<p className="text-xs text-gray-600 mb-1 font-medium">
											Est. Wait
										</p>
										<p className="text-xl font-bold text-secondary tracking-tight">
											{h.estimated_waiting_time}
										</p>
									</div>
								</div>
							</div>
							<button
								onClick={() => onJoinQueue(h.id)}
								disabled={loading || inAnyQueue}
								className="w-full bg-primary text-white py-3 rounded-xl text-sm font-semibold hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed transition-all"
							>
								{inThisQueue
									? "✓ In Queue"
									: inAnyQueue
									? "Already in Queue"
									: "+ Join Queue"}
							</button>
						</div>
					);
				})}
			</div>
		</div>
	);
}
