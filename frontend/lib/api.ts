import { PredictResponse, QuizAnswers } from "@/types/quiz";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export async function submitQuiz(answers: QuizAnswers): Promise<PredictResponse> {
    try {
        const response = await fetch(`${API_URL}/predict`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(
                answers
            )
        });
        
        if (!response.ok){
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json()
        return data;

    } catch(error) {
        console.error(`Error:`, error);
        throw error;
    }
}