"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";

export default function DrugValidator() {
	const [drugName, setDrugName] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);
	const [loading, setLoading] = useState(false);

	// UX State: 0 = Start, 50 = Image Uploaded, 100 = Ready to Validate
	const [progress, setProgress] = useState(0);

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (file) {
			setImage(file);
			const reader = new FileReader();
			reader.onloadend = () => {
				setImagePreview(reader.result as string);
				// Simulate a small "processing" delay for better UX, then advance progress
				setTimeout(() => setProgress(50), 200);
			};
			reader.readAsDataURL(file);
		}
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImagePreview(null);
		setDrugName("");
		setProgress(0); // Reset progress
	};

	const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const val = e.target.value;
		setDrugName(val);
		// If name is entered, complete the progress bar
		if (val.length > 0) {
			setProgress(100);
		} else {
			setProgress(50); // Revert to "Image Uploaded" state
		}
	};

	const handleValidate = async () => {
		if (!drugName || !image) return;
		setLoading(true);
		// Simulation
		setTimeout(() => setLoading(false), 2000);
	};

	return (
		<div className="h-screen flex">
			<Sidebar />
			<div className="flex-1 flex flex-col bg-gray-50/50">
				<header className="bg-white shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
					<div className="flex flex-col justify-center h-10">
						<h2 className="text-lg font-bold text-gray-900">
							Drug Authenticator
						</h2>
						<p className="text-xs text-gray-500">
							AI-Powered Drug Authenticator
						</p>
					</div>
				</header>

				<div className="flex-1 overflow-y-auto p-6">
					<div className="max-w-2xl mx-auto">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-8 transition-all duration-300">
							<div className="mb-8 text-center">
								<h2 className="text-2xl font-bold text-gray-900 mb-2">
									Drug Authenticator
								</h2>
								<p className="text-gray-600 text-sm">
									Verify if a medication is genuine in just a few steps.
								</p>
							</div>

							{/* Progress Bar */}
							<div className="mb-8">
								<div className="flex justify-between text-xs font-medium text-gray-500 mb-2">
									<span className={progress >= 0 ? "text-primary" : ""}>
										Upload
									</span>
									<span className={progress >= 50 ? "text-primary" : ""}>
										Identify
									</span>
									<span className={progress >= 100 ? "text-primary" : ""}>
										Check
									</span>
								</div>
								<div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
									<div
										className={`h-2.5 rounded-full transition-all duration-700 ease-out ${
											progress === 100
												? "bg-green-500"
												: progress >= 50
												? "bg-primary-dark"
												: "bg-primary"
										}`}
										style={{ width: `${progress}%` }}
									></div>
								</div>
							</div>

							<div className="space-y-6">
								{/* Step 1: Image Upload */}
								<div
									className={`transition-opacity duration-500 ${
										progress >= 0 ? "opacity-100" : "opacity-50"
									}`}
								>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										1. Upload Drug Image
									</label>
									<div
										className={`border-2 border-dashed rounded-lg p-6 text-center transition-all duration-300 ${
											image
												? "border-primary bg-primary/5"
												: "border-gray-300 hover:border-primary hover:bg-gray-50"
										}`}
									>
										{imagePreview ? (
											<div className="relative animate-in fade-in zoom-in duration-300">
												<Image
													src={imagePreview}
													alt="Drug preview"
													width={220}
													height={180}
													className="max-h-48 mx-auto rounded-lg shadow-sm"
												/>
												<button
													onClick={handleRemoveImage}
													className="absolute -top-3 -right-3 bg-white text-red-500 border border-gray-200 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-red-50 transition-colors"
													title="Remove image"
												>
													✕
												</button>
												<p className="mt-3 text-sm text-primary font-medium">
													Image uploaded successfully
												</p>
											</div>
										) : (
											<label className="cursor-pointer block">
												<div className="text-4xl mb-3">📷</div>
												<p className="text-sm font-medium text-gray-900 mb-1">
													Click to upload photo
												</p>
												<p className="text-xs text-gray-500">
													PNG, JPG up to 10MB
												</p>
												<input
													type="file"
													accept="image/*"
													onChange={handleImageChange}
													className="hidden"
												/>
											</label>
										)}
									</div>
								</div>

								{/* Step 2: Drug Name (Hidden until image uploaded) */}
								{image && (
									<div className="animate-in slide-in-from-bottom-4 fade-in duration-500">
										<label className="block text-sm font-medium text-gray-700 mb-2">
											2. Enter Drug Name
										</label>
										<input
											type="text"
											value={drugName}
											onChange={handleNameChange}
											placeholder="e.g., Paracetamol 500mg"
											className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none transition-shadow"
											autoFocus
										/>
									</div>
								)}

								{/* Step 3: Action Button (Hidden until name entered) */}
								{image && drugName && (
									<div className="animate-in slide-in-from-bottom-2 fade-in duration-500 pt-2">
										<button
											onClick={handleValidate}
											disabled={loading}
											className="w-full bg-primary text-white py-3.5 rounded-lg font-medium hover:bg-primary-dark shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all disabled:bg-gray-400 disabled:shadow-none disabled:cursor-not-allowed flex items-center justify-center gap-2"
										>
											{loading ? (
												<>
													<svg
														className="animate-spin h-5 w-5 text-white"
														xmlns="http://www.w3.org/2000/svg"
														fill="none"
														viewBox="0 0 24 24"
													>
														<circle
															className="opacity-25"
															cx="12"
															cy="12"
															r="10"
															stroke="currentColor"
															strokeWidth="4"
														></circle>
														<path
															className="opacity-75"
															fill="currentColor"
															d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
														></path>
													</svg>
													Verifying...
												</>
											) : (
												"Check Authenticity"
											)}
										</button>
									</div>
								)}
							</div>

							<div className="mt-8 p-2 bg-blue-50/50 rounded-lg border border-blue-100">
								<p className="text-xs text-gray-600">
									<strong>ℹ️Disclaimer:</strong> This tool provides AI-generated
									suggestions and should not replace professional medical
									advice. Always consult a healthcare provider before taking any
									medication.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
