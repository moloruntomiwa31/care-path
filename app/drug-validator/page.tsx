"use client";

import Image from "next/image";
import { useState } from "react";
import Sidebar from "@/components/common/Sidebar";
import {
	drugAuthenticatorService,
	DrugValidationResponse,
	DrugAuthenticityResponse,
} from "@/utils/drugAuthenticatorApi";
import { AxiosError } from "axios";
import Result from "@/components/drug-validator/Result";

export default function DrugValidator() {
	const [activeTab, setActiveTab] = useState<"analyze" | "results">("analyze");

	const [symptoms, setSymptoms] = useState("");
	const [image, setImage] = useState<File | null>(null);
	const [imagePreview, setImagePreview] = useState<string | null>(null);

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState<string | null>(null);

	const [suitabilityResult, setSuitabilityResult] =
		useState<DrugValidationResponse | null>(null);
	const [authenticityResult, setAuthenticityResult] =
		useState<DrugAuthenticityResponse | null>(null);

	const progress = image ? (symptoms ? 100 : 50) : 0;

	const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const file = e.target.files?.[0];
		if (!file) return;

		setImage(file);
		// Clear results on new image
		setSuitabilityResult(null);
		setAuthenticityResult(null);

		const previewReader = new FileReader();
		previewReader.onloadend = () =>
			setImagePreview(previewReader.result as string);
		previewReader.readAsDataURL(file);
	};

	const handleRemoveImage = () => {
		setImage(null);
		setImagePreview(null);
		setSymptoms("");
		setSuitabilityResult(null);
		setAuthenticityResult(null);
		setError(null);
	};

	const handleReset = () => {
		handleRemoveImage();
		setActiveTab("analyze");
	};

	const handleAnalyze = async () => {
		if (!image || !symptoms) return;

		setLoading(true);
		setSuitabilityResult(null);
		setAuthenticityResult(null);
		setError(null);

		try {
			const [suitabilityData, authenticityData] = await Promise.all([
				drugAuthenticatorService.validateDrug({
					symptoms,
					drug_image: image,
				}),
				drugAuthenticatorService.checkAuthenticity({
					drug_image: image,
				}),
			]);

			setSuitabilityResult(suitabilityData);
			setAuthenticityResult(authenticityData);

			// Automatically switch to results tab on success
			setActiveTab("results");
		} catch (err: unknown) {
			console.error("Analysis failed:", err);
			let errorMessage = "Something went wrong. Please try again.";

			if (err instanceof AxiosError) {
				errorMessage = err.response?.data?.detail || err.message;
			}

			setError(errorMessage);
			// We stay on the analyze tab so the user can fix input/retry
		} finally {
			setLoading(false);
		}
	};

	const hasResults = suitabilityResult && authenticityResult;

	return (
		<div className="h-screen flex">
			<Sidebar />

			<div className="flex-1 flex flex-col bg-gray-50/50">
				<header className="bg-white shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
					<h2 className="text-lg font-bold text-gray-900">
						Drug Authenticator
					</h2>
					<p className="text-xs text-gray-500">
						Complete Analysis: Suitability & Authenticity
					</p>
				</header>

				<div className="flex-1 overflow-y-auto p-6">
					<div className="max-w-2xl mx-auto">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 min-h-150 flex flex-col">
							{/* --- TABS --- */}
							<div className="flex border-b border-gray-200">
								<button
									onClick={() => setActiveTab("analyze")}
									className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
										activeTab === "analyze"
											? "text-blue-900 border-b-2 border-blue-900 bg-blue-50/50"
											: "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
									}`}
								>
									1. Analyze
								</button>
								<button
									onClick={() => hasResults && setActiveTab("results")}
									disabled={!hasResults}
									className={`flex-1 py-4 text-sm font-medium text-center transition-colors ${
										activeTab === "results"
											? "text-blue-900 border-b-2 border-blue-900 bg-blue-50/50"
											: !hasResults
											? "text-gray-300 cursor-not-allowed"
											: "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
									}`}
								>
									2. Results {hasResults && "✅"}
								</button>
							</div>

							<div className="p-8 flex-1">
								{activeTab === "analyze" && (
									<div className="space-y-6 animate-in fade-in slide-in-from-left-4 duration-300">
										<div className="text-center mb-6">
											<h2 className="text-2xl font-bold text-gray-900 mb-2">
												Analyze Medication
											</h2>
											<p className="text-gray-600 text-sm">
												Upload an image and describe symptoms to perform a
												complete safety check.
											</p>
										</div>

										{/* Progress Bar */}
										<div className="mb-8">
											<div className="w-full bg-gray-100 rounded-full h-2 overflow-hidden">
												<div
													className="h-2 rounded-full transition-all duration-700 ease-out bg-blue-900"
													style={{ width: `${progress}%` }}
												/>
											</div>
										</div>

										{/* 1. Image Upload */}
										<div>
											<label className="block text-sm font-medium text-gray-700 mb-2">
												1. Upload Drug Image
											</label>
											<div
												className={`border-2 border-dashed rounded-lg p-6 text-center transition relative ${
													image
														? "border-primary bg-blue-50/30"
														: "border-gray-300 hover:border-primary"
												}`}
											>
												{imagePreview ? (
													<div className="relative inline-block">
														<Image
															src={imagePreview}
															alt="Drug preview"
															width={220}
															height={180}
															className="rounded-lg shadow-sm object-cover max-h-48 w-auto mx-auto"
														/>
														<button
															onClick={handleRemoveImage}
															className="absolute -top-3 -right-3 bg-white text-red-500 border border-red-100 rounded-full w-8 h-8 shadow-sm flex items-center justify-center hover:bg-red-50 transition"
														>
															✕
														</button>
													</div>
												) : (
													<label className="cursor-pointer block w-full h-full">
														<div className="text-4xl mb-3">📷</div>
														<p className="text-sm font-medium text-gray-500">
															Upload image PNG, JPG (max 10MB)
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

										{/* 2. Symptoms Input */}
										{image && (
											<div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
												<label className="block text-sm font-medium text-gray-700 mb-2">
													2. Enter Symptoms
												</label>
												<textarea
													rows={3}
													value={symptoms}
													onChange={(e) => setSymptoms(e.target.value)}
													placeholder="e.g. Severe headache, fever, body pain..."
													className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary outline-none resize-none transition"
												/>
											</div>
										)}

										{/* Error Display */}
										{error && (
											<div className="p-4 bg-red-50 text-red-700 text-sm rounded-lg border border-red-200 animate-in fade-in">
												<strong>Error:</strong> {error}
											</div>
										)}

										{/* Analyze Button */}
										{image && symptoms && (
											<button
												onClick={handleAnalyze}
												disabled={loading}
												className="w-full bg-blue-900 text-white py-4 rounded-lg font-bold text-lg hover:bg-blue-800 transition disabled:bg-gray-300 disabled:cursor-not-allowed shadow-md flex items-center justify-center gap-2"
											>
												{loading ? (
													<>
														<div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
														Analyzing...
													</>
												) : (
													"Check Drug Safety"
												)}
											</button>
										)}
									</div>
								)}

								{activeTab === "results" && (
									<div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-300">
										<div className="text-center">
											<h2 className="text-2xl font-bold text-gray-900">
												Analysis Complete
											</h2>
											<p className="text-gray-600 text-sm mt-1">
												Here are the findings based on the image and symptoms
												provided.
											</p>
										</div>

										<div className="space-y-6">
											{/* Suitability Result */}
											{suitabilityResult && (
												<Result result={suitabilityResult} />
											)}

											{/* Authenticity Result */}
											{authenticityResult && (
												<Result result={authenticityResult} />
											)}
										</div>

										<div className="pt-6 border-t border-gray-100">
											<button
												onClick={handleReset}
												className="w-full py-3 text-gray-600 bg-gray-100 hover:bg-gray-200 rounded-lg font-medium transition"
											>
												Check Another Drug
											</button>
										</div>
									</div>
								)}
							</div>

							{/* Disclaimer Footer */}
							<div className="p-4 bg-blue-50 border-t border-blue-100 rounded-b-xl">
								<p className="text-xs text-center text-blue-900">
									<strong>ℹ️ Disclaimer:</strong> This tool provides
									AI-generated suggestions. It cannot physically verify chemical
									composition. Always consult a healthcare provider.
								</p>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
