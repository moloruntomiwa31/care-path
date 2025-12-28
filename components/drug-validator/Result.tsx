import { DrugAnalysisResult } from "@/utils/drugAuthenticatorApi";

interface ResultProps {
	result: DrugAnalysisResult;
}

export default function Result({ result }: ResultProps) {
	// Format confidence to a clean percentage string
	const formatConfidence = (val: number) => {
		const percentage = val <= 1 ? val * 100 : val;
		return `${percentage.toFixed(1)}%`;
	};

	// --- CASE 1: AUTHENTICITY CHECK ---
	if (result.type === "authenticity") {
		const isAuthentic = result.is_authentic;

		return (
			<div className="mt-4 p-6 rounded-xl border bg-white shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-purple-500">
				<h3 className="text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b">
					{isAuthentic ? "🛡️ Authenticity Verified" : "⚠️ Authenticity Warning"}
				</h3>

				<div className="space-y-4">
					<div className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-100">
						<span className="text-sm font-medium text-gray-500 uppercase tracking-wider">
							Verdict
						</span>
						<span
							className={`px-4 py-1.5 rounded-full text-xs md:text-sm font-bold border ${
								isAuthentic
									? "bg-green-100 text-green-700 border-green-200"
									: "bg-red-100 text-red-700 border-red-200"
							}`}
						>
							{isAuthentic ? "GENUINE / AUTHENTIC" : "POTENTIAL COUNTERFEIT"}
						</span>
					</div>

					<div className="grid grid-cols-2 gap-4">
						<div>
							<span className="block text-gray-500 text-xs uppercase tracking-wide">
								Confidence
							</span>
							<span className="font-medium text-gray-900 text-base">
								{formatConfidence(result.confidence)}
							</span>
						</div>
						<div>
							<span className="block text-gray-500 text-xs uppercase tracking-wide">
								Drug Detected
							</span>
							<span className="font-medium text-gray-900 text-base">
								{result.drug_identified ? "Yes" : "No"}
							</span>
						</div>
					</div>

					<div className="pt-2">
						<span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
							Analysis
						</span>
						<p className="text-gray-700 text-sm leading-relaxed">
							{result.explanation}
						</p>
					</div>
				</div>
			</div>
		);
	}

	// --- CASE 2: SUITABILITY CHECK ---
	// TypeScript knows this is 'suitability' type here automatically
	const isSuitable = result.is_suitable;

	return (
		<div className="mt-8 p-6 rounded-xl border bg-white shadow-sm animate-in fade-in slide-in-from-bottom-4 duration-500 border-l-4 border-l-blue-500">
			<h3 className="text-lg font-bold mb-4 flex items-center gap-2 pb-2 border-b">
				{isSuitable ? "✅ Suitable Match" : "🚫 Suitability Warning"}
			</h3>

			<div className="space-y-4 text-sm">
				<div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
					<div>
						<span className="block text-gray-500 text-xs uppercase tracking-wide">
							Identified Drug
						</span>
						<span className="font-medium text-gray-900 text-base">
							{result.drug_identified}
						</span>
					</div>
					<div>
						<span className="block text-gray-500 text-xs uppercase tracking-wide">
							Confidence
						</span>
						<span className="font-medium text-gray-900 text-base">
							{formatConfidence(result.confidence)}
						</span>
					</div>
				</div>

				<div className="pt-2">
					<span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
						Recommendation
					</span>
					<div
						className={`inline-flex items-center gap-2 px-3 py-2 rounded-lg w-full ${
							isSuitable
								? "bg-blue-50 text-blue-800 border border-blue-100"
								: "bg-orange-50 text-orange-800 border border-orange-100"
						}`}
					>
						<span className="text-lg">{isSuitable ? "👍" : "👎"}</span>
						<span className="font-semibold">
							{isSuitable ? "Suitable for Symptoms" : "Not Recommended"}
						</span>
					</div>
				</div>

				<div className="pt-2">
					<span className="block text-gray-500 text-xs uppercase tracking-wide mb-1">
						Explanation
					</span>
					<p className="text-gray-700 leading-relaxed bg-gray-50 p-3 rounded-lg border border-gray-100">
						{result.explanation}
					</p>
				</div>
			</div>
		</div>
	);
}
