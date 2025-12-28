import axios from "axios";

const API_BASE_URL = "https://063db69c-8000.uks1.devtunnels.ms/api";

export const apiClient = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "multipart/form-data",
    },
});

export interface DrugValidationResponse {
    type: 'suitability'; // Discriminator
    drug_identified: string;
    is_suitable: boolean;
    confidence: number;
    explanation: string;
}

export interface DrugAuthenticityResponse {
    type: 'authenticity'; // Discriminator
    drug_identified: string | boolean; // API might return boolean or name string
    is_authentic: boolean;
    confidence: number;
    explanation: string;
}

export type DrugAnalysisResult = DrugValidationResponse | DrugAuthenticityResponse;

export const drugAuthenticatorService = {
    validateDrug: async (params: { symptoms: string; drug_image: File }) => {
        const formData = new FormData();
        formData.append("symptoms", params.symptoms);
        formData.append("drug_image", params.drug_image);

        const response = await apiClient.post<Omit<DrugValidationResponse, 'type'>>(
            "/drug/check/",
            formData
        );

        return { ...response.data, type: 'suitability' as const };
    },

    checkAuthenticity: async (params: { drug_image: File }) => {
        const formData = new FormData();
        formData.append("drug_image", params.drug_image);

        const response = await apiClient.post<Omit<DrugAuthenticityResponse, 'type'>>(
            "/drug/authenticate/",
            formData
        );

        return { ...response.data, type: 'authenticity' as const };
    },
};