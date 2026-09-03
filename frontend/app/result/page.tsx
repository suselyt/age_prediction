"use client";

import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PredictResponse} from "@/types/quiz";
import { submitQuiz } from "@/lib/api";
import { Suspense } from "react";

export default function ResultPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <ResultContent />
        </Suspense>
    )
}

function ResultContent() {
    // takes the data from the url
    const searchParams = useSearchParams();
    const answersString = searchParams.get("answers");

    const [prediction, setPrediction] = useState<PredictResponse | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // call predict API
    useEffect(() => {
        if(!answersString) {
            setError("No quiz data found");
            setLoading(false);
            return;
        }
        
        const answers = JSON.parse(answersString);
        submitQuiz(answers)
            .then((data) => setPrediction(data))
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, [answersString]);

    if (loading) return <div>Calculatinf your biological age...</div>;
    if (error) return <div>Error: {error}</div>;
 
    return (
        <main className="flex flex-col items-center justify-center min-h-screen px-4 py-16">
            <div className="text-center space-y-6">
                <h2 className="text-2xl font-semibold text-gray-700">Your Biological Age Is...</h2>
                <p className="text-7xl font-bold text-emerald-600">{prediction?.predicted_age}</p>
                <p className="text-lg text-gray-600">Confidence Range: {prediction?.confidence_range}</p>
                <p className="text-lg text-gray-700">{prediction?.message}</p>
            </div>

            {/* feedback section */}
            <div className="mt-12 text-center">
                <p className="text-lg font-medium text-gray-700 mb-4">How accurate was this?</p>
                <div className="flex gap-1">
                    <button className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors">Very Accurate</button>
                    <button className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors">Close</button>
                    <button className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors">Not Accurate</button>
                </div>
            </div>

            {/* play again & share results buttons */}
            <div className="mt-8 flex gap-4">
                <button className="px-6 py-3 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors">Play Again</button>
                <button className="px-6 py-3 border-2 border-emerald-700 text-emerald-700 rounded-lg hover:bg-emerald-50 transition-colors">Share Result</button>
            </div>
        </main>
    )
}