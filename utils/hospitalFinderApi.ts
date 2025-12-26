export async function fetchNearbyHospitals(
	lat: number,
	lng: number,
	radius: number = 5000
) {
	const query = `
    [out:json][timeout:25];
    (
      node["amenity"="hospital"](around:${radius},${lat},${lng});
      way["amenity"="hospital"](around:${radius},${lat},${lng});
    );
    out center;
  `;

	const response = await fetch("https://overpass-api.de/api/interpreter", {
		method: "POST",
		body: query,
		headers: { "Content-Type": "text/plain" },
	});

	if (!response.ok) throw new Error("Failed to fetch hospitals");
	return response.json();
}

export async function fetchLocationName(lat: number, lng: number) {
	const response = await fetch(
		`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lng}&format=json`,
		{ headers: { "User-Agent": "CarePath" } }
	);

	if (!response.ok) throw new Error("Failed to fetch location");
	const data = await response.json();
	return (
		data.address?.city ||
		data.address?.town ||
		data.address?.village ||
		data.address?.county ||
		"Unknown Location"
	);
}

export function calculateDistance(
	lat1: number,
	lon1: number,
	lat2: number,
	lon2: number
) {
	const R = 6371;
	const dLat = ((lat2 - lat1) * Math.PI) / 180;
	const dLon = ((lon2 - lon1) * Math.PI) / 180;
	const a =
		Math.sin(dLat / 2) * Math.sin(dLat / 2) +
		Math.cos((lat1 * Math.PI) / 180) *
			Math.cos((lat2 * Math.PI) / 180) *
			Math.sin(dLon / 2) *
			Math.sin(dLon / 2);
	const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
	return R * c;
}
