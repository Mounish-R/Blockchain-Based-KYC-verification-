import { GoogleGenerativeAI } from "@google/generative-ai";

// ⚠️ REPLACE WITH YOUR ACTUAL API KEY
const API_KEY = "AIzaSyDcSVUfn0tajWmSHE0KxdqRXKVdg5Sj6jU";

const genAI = new GoogleGenerativeAI(API_KEY);

/**
 * Converts a File object to a GoogleGenerativeAI Part object.
 * @param {File} file 
 * @returns {Promise<{inlineData: {data: string, mimeType: string}}>}
 */
async function fileToGenerativePart(file) {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            const base64Data = reader.result.split(',')[1];
            resolve({
                inlineData: {
                    data: base64Data,
                    mimeType: file.type,
                },
            });
        };
        reader.readAsDataURL(file);
    });
}

/**
 * Analyzes KYC documents using Gemini.
 * @param {File} idCardFile - The uploaded ID card image.
 * @param {string} selfieBase64 - Base64 string of the webcam selfie (optional).
 * @returns {Promise<Object>} - The extracted data and verification result.
 */
export async function analyzeKYC(idCardFile, selfieBase64) {
    try {
        // Try the stable alias first
        const model = genAI.getGenerativeModel({ model: "gemini-flash-latest" });

        const parts = [];

        // 1. Add ID Card
        if (idCardFile) {
            parts.push(await fileToGenerativePart(idCardFile));
        }

        // 2. Add Selfie (if provided)
        if (selfieBase64) {
            // Remove header if present (data:image/jpeg;base64,...)
            const cleanBase64 = selfieBase64.replace(/^data:image\/\w+;base64,/, "");
            parts.push({
                inlineData: {
                    data: cleanBase64,
                    mimeType: "image/jpeg",
                },
            });
        }

        const prompt = `
      You are an expert KYC (Know Your Customer) Identity Verification AI.
      
      Task 1: Extract the following details from the official ID card provided:
      - Full Name
      - Date of Birth (format YYYY-MM-DD)
      - Gender
      - ID Number (Aadhaar/PAN/Passport number)
      - Address (Simplify to City, State, PIN)
      - Phone Number (if visible)

      Return the result STRICTLY as this JSON format:
      {
        "fullName": "...",
        "dob": "...",
        "gender": "...",
        "idNumber": "...",
        "address": "...",
        "phone": "...",
        "isTampered": false
      }
      
      If the image is blurry or readable, set field values to null.
      Check for any signs of digital tampering (photoshop artifacts). Set isTampered to true if suspicious.
    `;

        const result = await model.generateContent([prompt, ...parts]);
        const response = await result.response;
        const text = response.text();

        // Clean up code blocks if Gemini mimics markdown
        const jsonString = text.replace(/```json|```/g, "").trim();

        return JSON.parse(jsonString);

    } catch (error) {
        console.error("Gemini KYC Error:", error);

        // --- FALLBACK MOCK DATA ---
        // If API fails (Quota limit/404), return demo data so the user can verify the rest of the flow.
        console.warn("⚠️ API Failed. Returning MOCK DATA for demonstration purposes.");

        return {
            fullName: "John Doe (Demo)",
            dob: "1995-08-15",
            gender: "Male",
            idNumber: "ABCDE1234F",
            address: "123 Blockchain Street, Crypto City, 560001",
            matchScore: 92,
            isTampered: false,
            mock: true // Flag to indicate this is mock data
        };
    }
}
