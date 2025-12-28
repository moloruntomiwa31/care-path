"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Sidebar() {
	const pathname = usePathname();
	const [isOpen, setIsOpen] = useState(false);

	const [locationName, setLocationName] = useState<string | null>(
		"Searching..."
	);
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);

		// Only access localStorage in the browser
		if (typeof window !== "undefined") {
			try {
				const stored = localStorage.getItem("userLocation");
				const parsed = stored ? JSON.parse(stored) : null;
				setLocationName(parsed);
			} catch (e) {
				console.error("Failed to parse user location", e);
				setLocationName(null);
			}
		}
	}, []);

	const links = [
		{ href: "/hospital-finder", label: "Hospital Finder", icon: "🏥" },
		{ href: "/hospital-queue-manager", label: "Queue Manager", icon: "📋" },
		{ href: "/drug-validator", label: "Drug Authenticator", icon: "💊" },
	];

	// Optional: Prevent hydration mismatch by returning null until mounted
	// OR render a skeleton. For a sidebar, usually rendering is fine if we handle dynamic data carefully.
	if (!isMounted) {
		// Return static version or nothing during SSR to prevent hydration errors on dynamic parts
		// However, for sidebar structure, usually fine to return the shell.
	}

	return (
		<>
			<button
				onClick={() => setIsOpen(!isOpen)}
				className={`lg:hidden fixed top-4 z-50 bg-primary text-white p-2 rounded-lg shadow-lg w-10 h-10 flex items-center justify-center transition-all duration-300 ${
					isOpen ? "left-64 ml-4" : "left-4"
				}`}
			>
				<span className="text-lg">{isOpen ? "✕" : "☰"}</span>
			</button>

			{isOpen && (
				<div
					className="lg:hidden fixed inset-0 bg-black/50 z-40"
					onClick={() => setIsOpen(false)}
				/>
			)}

			<div
				className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 flex flex-col transform transition-transform duration-300 ease-in-out lg:transform-none ${
					isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
				}`}
			>
				<div className="p-4 border-b border-gray-200">
					<h1 className="text-xl font-bold text-primary">CarePath</h1>
					<p className="text-xs text-gray-500">Healthcare Platform</p>
				</div>

				<div className="px-4 py-3 bg-gray-50 border-b border-gray-200 grid place-items-start">
					<p className="text-xs text-gray-500 mb-1">📍Your Location</p>
					<p className="text-xs font-medium text-gray-700 truncate w-full">
						{/* Only show "Searching..." if not mounted yet or logic dictates */}
						{isMounted ? locationName || "Location not set" : "Loading..."}
					</p>
				</div>

				<nav className="flex-1 p-4 overflow-y-auto">
					{links.map((link) => (
						<Link
							key={link.href}
							href={link.href}
							onClick={() => setIsOpen(false)}
							className={`flex items-center gap-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
								pathname === link.href
									? "bg-primary text-white"
									: "text-gray-700 hover:bg-gray-100"
							}`}
						>
							<span className="text-xl">{link.icon}</span>
							<span className="text-sm font-medium">{link.label}</span>
						</Link>
					))}
				</nav>
			</div>
		</>
	);
}
