"use client";

import { useState } from "react";

interface QueueRegistrationProps {
	onRegister: (data: {
		hospital: number;
		first_name: string;
		last_name: string;
		email: string;
		phone: string;
		address: string;
		date_of_birth: string;
		status: string;
		patient_id: string;
	}) => void;
}

export default function QueueRegistration({
	onRegister,
}: QueueRegistrationProps) {
	const [formData, setFormData] = useState({
		hospital: 5,
		first_name: "",
		last_name: "",
		email: "",
		phone: "",
		address: "",
		date_of_birth: "",
		status: "NEW",
		patient_id: "",
	});
	const [loading, setLoading] = useState(false);

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		setLoading(true);

		// simulate request
		await new Promise((resolve) => setTimeout(resolve, 500));

		onRegister(formData);
		setLoading(false);

	};

	return (
		<div className="w-full max-w-md">
			<div className="bg-white rounded-2xl shadow-xl border border-gray-100 py-4 px-6">
				<div className="mb-5">
					<h2 className="text-xl font-bold text-gray-900">Registration</h2>
					<p className="text-sm text-gray-500">
						Let&apos;s get you started by creating an account.
					</p>
				</div>

				<form onSubmit={handleSubmit} className="space-y-2">
					<div className="grid grid-cols-2 gap-4">
						{/* First Name */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								First Name
							</label>
							<input
								type="text"
								required
								value={formData.first_name}
								onChange={(e) =>
									setFormData({ ...formData, first_name: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
								placeholder="John"
							/>
						</div>

						{/* Last Name */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Last Name
							</label>
							<input
								type="text"
								required
								value={formData.last_name}
								onChange={(e) =>
									setFormData({ ...formData, last_name: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
								placeholder="Doe"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{/* Patient Id */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Patient ID
							</label>
							<input
								type="text"
								required
								value={formData.patient_id}
								onChange={(e) =>
									setFormData({ ...formData, patient_id: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
								placeholder="P123456789"
							/>
						</div>

						{/* Email */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Email Address
							</label>
							<input
								type="email"
								required
								value={formData.email}
								onChange={(e) =>
									setFormData({ ...formData, email: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
								placeholder="john@example.com"
							/>
						</div>
					</div>

					<div className="grid grid-cols-2 gap-4">
						{/* Phone */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Phone Number
							</label>
							<input
								type="tel"
								required
								value={formData.phone}
								onChange={(e) =>
									setFormData({ ...formData, phone: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
								placeholder="+234..."
							/>
						</div>

						{/* Address */}
						<div>
							<label className="block text-sm font-semibold text-gray-700 mb-2">
								Home Address
							</label>
							<input
								type="text"
								required
								value={formData.address}
								onChange={(e) =>
									setFormData({ ...formData, address: e.target.value })
								}
								className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
								placeholder="123 Main Street"
							/>
						</div>
					</div>

					{/* Date of Birth */}
					<div>
						<label className="block text-sm font-semibold text-gray-700 mb-2">
							Date of Birth
						</label>
						<input
							type="date"
							required
							value={formData.date_of_birth}
							onChange={(e) =>
								setFormData({
									...formData,
									date_of_birth: e.target.value,
								})
							}
							className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-primary outline-none"
						/>
					</div>

					<button
						type="submit"
						disabled={loading}
						className="w-full bg-primary-dark text-white py-3.5 rounded-xl font-semibold hover:shadow-lg hover:scale-[1.02] disabled:opacity-50 transition-all mt-6"
					>
						{loading ? "Creating Account..." : "Get Started"}
					</button>
				</form>
			</div>
		</div>
	);
}
