"use client";

import { QueueEntry } from "@/types/Queue";
import { QueueStatus } from "@/types/Queue";
import EmptyState from "../common/EmptyState";

interface ActiveQueuesProps {
	activeQueue: QueueEntry | null;
}

export default function ActiveQueues({ activeQueue }: ActiveQueuesProps) {

	if (!activeQueue) {
		return (
			<EmptyState
				icon="📋"
				title="No Active Queue"
				message="Join a hospital queue to get started."
			/>
		);
	}

	const getStatusColor = (status: QueueStatus) => {
		switch (status) {
			case QueueStatus.WAITING:
				return "bg-yellow-100 text-yellow-700 border-yellow-200";
			case QueueStatus.CALLED:
				return "bg-green-100 text-green-700 border-green-200 animate-pulse";
			case QueueStatus.COMPLETED:
				return "bg-blue-100 text-blue-700 border-blue-200";
			default:
				return "bg-gray-100 text-gray-700 border-gray-200";
		}
	};

	const getStatusIcon = (status: QueueStatus) => {
		switch (status) {
			case QueueStatus.WAITING:
				return "⏳";
			case QueueStatus.CALLED:
				return "🔔";
			case QueueStatus.COMPLETED:
				return "✓";
			default:
				return "•";
		}
	};

	const getStatusText = (status: QueueStatus) => {
		switch (status) {
			case QueueStatus.WAITING:
				return "Waiting in Queue";
			case QueueStatus.CALLED:
				return "You're Being Called!";
			case QueueStatus.COMPLETED:
				return "Completed";
			default:
				return status;
		}
	};

	return (
		<div className="mb-8">
			<div className="flex items-center gap-2 mb-4">
				<h3 className="text-2xl font-bold text-gray-900">Your Active Queue</h3>
			</div>

			<div className="bg-linear-to-br from-white to-gray-50 rounded-2xl shadow-lg border border-gray-200 p-6 hover:shadow-xl transition-all">
				<div className="flex justify-between items-start mb-6">
					<div>
						<h4 className="font-bold text-gray-900 text-xl mb-1">
							{activeQueue.hospital.name}
						</h4>
						<p className="text-sm text-gray-500">
							📍 {activeQueue.hospital.address}
						</p>
						<p className="text-xs text-gray-400 mt-1">
							Joined at{" "}
							{new Date(activeQueue.time_joined).toLocaleTimeString([], {
								hour: "2-digit",
								minute: "2-digit",
							})}
						</p>
					</div>
					<span
						className={`text-xs flex items-center whitespace-nowrap capitalize px-4 py-2 rounded-full font-semibold border-2 ${getStatusColor(
							activeQueue.queue_status
						)}`}
					>
						{getStatusIcon(activeQueue.queue_status)}{" "}
						{getStatusText(activeQueue.queue_status)}
					</span>
				</div>

				<div className="bg-linear-to-r from-primary to-secondary rounded-xl p-6 text-white mb-4">
					<div className="flex items-center justify-between">
						<div>
							<p className="text-sm font-medium mb-1 opacity-90">
								Your Queue Number
							</p>
							<p className="text-5xl font-bold">{activeQueue.queue_number}</p>
						</div>
						<div className="text-right">
							<p className="text-sm font-medium mb-1 opacity-90">Position</p>
							<p className="text-3xl font-bold">#{activeQueue.queue_number}</p>
						</div>
					</div>
				</div>

				<div className="grid grid-cols-2 gap-3">
					<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
						<p className="text-xs text-gray-600 mb-1">Patient Name</p>
						<p className="font-semibold text-gray-900">
							{activeQueue.patient.first_name} {activeQueue.patient.last_name}
						</p>
					</div>
					<div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
						<p className="text-xs text-gray-600 mb-1">Patient ID</p>
						<p className="font-semibold text-gray-900 font-mono text-sm">
							{activeQueue.patient.patient_id}
						</p>
					</div>
				</div>

				{activeQueue.queue_status === QueueStatus.CALLED && (
					<div className="mt-4 bg-green-50 border-2 border-green-200 rounded-lg p-4 animate-pulse">
						<p className="text-green-800 font-semibold">
							🔔 Please proceed to the consultation room.
						</p>
					</div>
				)}

				{activeQueue.queue_status === QueueStatus.WAITING && (
					<div className="mt-4 bg-blue-50 border border-blue-200 rounded-lg p-3">
						<p className="text-blue-800 text-sm">
							ℹ️ Please wait. We&apos;ll notify you when it&apos;s your turn.
						</p>
					</div>
				)}
			</div>
		</div>
	);
}
