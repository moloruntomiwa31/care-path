import axios from "axios";

const API_BASE_URL = import.meta.env.API_BASE_URL;

export const apiClient = axios.create({
	baseURL: API_BASE_URL,
	headers: {
		"Content-Type": "multipart/form-data",
	},
});

export interface DrugValidationResponse {
	type: "validation";
	drug_identified: string;
	is_suitable: boolean;
	confidence: number;
	explanation: string;
}

export interface DrugAuthenticityResponse {
	type: "authenticity";
	drug_identified: string;
	is_authentic: boolean;
	confidence: number;
	explanation: string;
}

export const drugAuthenticatorService = {
	validateDrug: async (params: { symptoms: string; drug_image: File }) => {
		const formData = new FormData();
		formData.append("symptoms", params.symptoms);
		formData.append("drug_image", params.drug_image);

		const response = await apiClient.post<DrugValidationResponse>(
			"/drug/check/",
			formData
		);

		return response.data;
	},

	checkAuthenticity: async (params: { drug_image: File }) => {
		const formData = new FormData();
		formData.append("drug_image", params.drug_image);

		const response = await apiClient.post<{
			drug_identified: boolean;
			confidence: number;
			explanation: string;
			is_authentic: boolean;
		}>("/drug/authenticate/", formData);

		return { type: "authenticity", ...response.data };
	},
};
