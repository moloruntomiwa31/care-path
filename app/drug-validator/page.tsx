'use client';
import Image from 'next/image';
import { useState } from 'react';
import Sidebar from '@/components/Sidebar';

export default function DrugValidator() {
  const [drugName, setDrugName] = useState('');
  const [symptoms, setSymptoms] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [result, setResult] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleValidate = async () => {
    if (!drugName || !symptoms || !image) return;
    
    setLoading(true);
    // TODO: Replace with actual AI API call
    // const formData = new FormData();
    // formData.append('image', image);
    // formData.append('drugName', drugName);
    // formData.append('symptoms', symptoms);
    // const response = await fetch('/api/validate-drug', { method: 'POST', body: formData });
    
    setTimeout(() => {
      setResult({
        valid: Math.random() > 0.3,
        confidence: Math.floor(Math.random() * 30) + 70,
        message: Math.random() > 0.3 
          ? 'This medication is appropriate for the symptoms described.'
          : 'This medication may not be suitable for the symptoms. Please consult a healthcare professional.',
      });
      setLoading(false);
    }, 1500);
  };

  return (
		<div className="h-screen flex">
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<header className="bg-white shadow-sm px-4 py-3 z-10 lg:pl-4 pl-16">
					<div className="flex flex-col justify-center h-10">
						<h2 className="text-lg font-bold text-gray-900">Drug Validator</h2>
						<p className="text-xs text-gray-500">AI-Powered Drug Validation</p>
					</div>
				</header>
				<div className="flex-1 overflow-y-auto p-6">
					<div className="max-w-2xl mx-auto">
						<div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
							<h2 className="text-2xl font-bold text-gray-900 mb-2">
								Drug Validator
							</h2>
							<p className="text-gray-600 text-sm mb-6">
								Verify if a medication is appropriate for your symptoms using AI
								analysis.
							</p>

							<div className="space-y-4">
								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Upload Drug Image
									</label>
									<div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-primary transition-colors">
										{imagePreview ? (
											<div className="relative">
												<Image
													src={imagePreview}
													alt="Drug preview"
													className="max-h-48 mx-auto rounded-lg"
												/>
												<button
													onClick={() => {
														setImage(null);
														setImagePreview(null);
													}}
													className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs"
												>
													✕
												</button>
											</div>
										) : (
											<label className="cursor-pointer">
												<div className="text-4xl mb-2">📷</div>
												<p className="text-sm text-gray-600 mb-1">
													Click to upload drug image
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

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Drug Name
									</label>
									<input
										type="text"
										value={drugName}
										onChange={(e) => setDrugName(e.target.value)}
										placeholder="e.g., Paracetamol"
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none"
									/>
								</div>

								<div>
									<label className="block text-sm font-medium text-gray-700 mb-2">
										Symptoms
									</label>
									<textarea
										value={symptoms}
										onChange={(e) => setSymptoms(e.target.value)}
										placeholder="Describe your symptoms..."
										rows={4}
										className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent outline-none resize-none"
									/>
								</div>

								<button
									onClick={handleValidate}
									disabled={!drugName || !symptoms || !image || loading}
									className="w-full bg-primary text-white py-3 rounded-lg font-medium hover:bg-primary-dark transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
								>
									{loading ? "Validating..." : "Validate Drug"}
								</button>
							</div>

							{result && (
								<div
									className={`mt-6 p-4 rounded-lg ${
										result.valid
											? "bg-secondary/10 border border-secondary"
											: "bg-red-50 border border-red-300"
									}`}
								>
									<div className="flex items-start gap-3">
										<span className="text-2xl">{result.valid ? "✓" : "⚠"}</span>
										<div className="flex-1">
											<h3
												className={`font-bold mb-1 ${
													result.valid ? "text-secondary" : "text-red-600"
												}`}
											>
												{result.valid
													? "Validation Successful"
													: "Caution Required"}
											</h3>
											<p className="text-sm text-gray-700 mb-2">
												{result.message}
											</p>
											<p className="text-xs text-gray-500">
												Confidence: {result.confidence}%
											</p>
										</div>
									</div>
								</div>
							)}

							<div className="mt-6 p-4 bg-gray-50 rounded-lg">
								<p className="text-xs text-gray-600">
									<strong>Disclaimer:</strong> This tool provides AI-generated
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
