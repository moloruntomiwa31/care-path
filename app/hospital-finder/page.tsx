"use client";

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useAppStore } from "@/store/useAppStore";
import HospitalList from "@/components/hospital-finder/HospitalList";
import HospitalDetails from "@/components/hospital-finder/HospitalDetails";
import Preloader from "@/components/common/Preloader";
import Sidebar from "@/components/common/Sidebar";
import Toast from "@/components/common/Toast";
import {
	fetchNearbyHospitals,
	fetchLocationName,
	calculateDistance,
} from "@/utils/api";

const MapView = dynamic(() => import("@/components/hospital-finder/MapView"), {
	ssr: false,
});

export default function HospitalFinder() {
	const {
		loading,
		setLoading,
		userLocation,
		setUserLocation,
		setLocationName,
		setHospitals,
		selectedHospital,
	} = useAppStore();
	const [showList, setShowList] = useState(false);
	const [toast, setToast] = useState<{
		message: string;
		type: "error" | "success";
	} | null>(null);

	useEffect(() => {
		let isMounted = true;

		const loadData = async () => {
			if (!navigator.geolocation) return;

			setLoading(true);

			navigator.geolocation.getCurrentPosition(
				async (position) => {
					if (!isMounted) return;

					const location = {
						lat: position.coords.latitude,
						lng: position.coords.longitude,
					};
					setUserLocation(location);

					try {
						const name = await fetchLocationName(location.lat, location.lng);
						if (isMounted) setLocationName(name);
						localStorage.setItem("userLocation", JSON.stringify(name));
					} catch (error) {
						console.error("Error fetching location name:", error);
						if (isMounted) setLocationName("Unknown Location");
					}

					try {
						const data = await fetchNearbyHospitals(location.lat, location.lng);
						if (!isMounted) return;

						const hospitals = data.elements
							.map((el: any) => {
								const lat = el.lat || el.center?.lat;
								const lng = el.lon || el.center?.lon;
								if (!lat || !lng) return null;
								return {
									id: el.id.toString(),
									name: el.tags?.name || "Unnamed Hospital",
									lat,
									lng,
									address: el.tags?.["addr:street"]
										? `${el.tags["addr:housenumber"] || ""} ${
												el.tags["addr:street"]
										  }`.trim()
										: "Address not available",
									phone: el.tags?.phone || el.tags?.["contact:phone"] || "N/A",
									type: el.tags?.healthcare || el.tags?.emergency || "hospital",
									distance: calculateDistance(
										location.lat,
										location.lng,
										lat,
										lng
									),
								};
							})
							.filter(Boolean)
							.sort((a: any, b: any) => a.distance - b.distance);

						setHospitals(hospitals);
					} catch (error) {
						console.error("Error fetching hospitals:", error);
						if (isMounted) {
							setHospitals([]);
							setToast({
								message:
									"Failed to fetch hospitals. Please check your connection and refresh the page.",
								type: "error",
							});
						}
					} finally {
						if (isMounted) setLoading(false);
					}
				},
				(error) => {
					console.error("Geolocation error:", error);
					if (isMounted) {
						setLoading(false);
						setToast({
							message:
								"Unable to get your location. Please enable location services.",
							type: "error",
						});
					}
				}
			);
		};

		loadData();
		return () => {
			isMounted = false;
		};
	}, [setLoading, setUserLocation, setLocationName, setHospitals]);

	return (
		<div className="h-screen flex">
			{loading && <Preloader />}
			{toast && (
				<Toast
					message={toast.message}
					type={toast.type}
					onClose={() => setToast(null)}
				/>
			)}
			<Sidebar />
			<div className="flex-1 flex flex-col">
				<header className="bg-white shadow-sm px-4 py-3 flex items-center justify-between z-10 lg:pl-4 pl-16">
					<div className="flex flex-col justify-center h-10">
						<h2 className="text-lg font-bold text-gray-900">Hospital Finder</h2>
						<p className="text-xs text-gray-500">
							Find nearby healthcare facilities
						</p>
					</div>
					<button
						onClick={() => setShowList(!showList)}
						className="lg:hidden bg-primary text-white px-4 py-2 rounded-lg text-sm font-medium"
					>
						{showList ? "Map" : "List"}
					</button>
				</header>
				<div className="flex-1 flex overflow-hidden">
					<div
						className={`${showList ? "hidden" : "flex-1"} lg:flex-1 relative`}
					>
						{userLocation && <MapView />}
					</div>
					<div
						className={`${
							showList ? "flex-1" : "hidden"
						} lg:block lg:w-96 bg-white border-l border-gray-200`}
					>
						{selectedHospital ? <HospitalDetails /> : <HospitalList />}
					</div>
				</div>
			</div>
		</div>
	);
}
