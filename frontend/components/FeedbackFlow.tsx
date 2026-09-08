"use client";

import { useState } from "react";
import { QuizAnswers, PredictResponse, FeedbackPayload } from "@/types/quiz";
import { submitFeedback } from "@/lib/api";
import AgeInputModal from "./AgeInputModal";

interface FeedbackFlowProps {
    features: QuizAnswers;
    prediction: PredictResponse;
    onSubmitSuccess?: () => void;
}

type FeedbackType = "very_accurate" | "close" | "not_accurate";

export default function FeedbackFlow({features, prediction, onSubmitSuccess}: FeedbackFlowProps) {
    const [showModal, setShowModal] = useState(false);
    const [feedbackType, setFeedbackType] = useState<FeedbackType | null>(null);

    // when feedback is very accurate
    const handleFeedbackClick = async (type: FeedbackType) => {
        if (type === "very_accurate"){
            const payload: FeedbackPayload = {
                features: features,
                predicted_age: prediction.predicted_age,
                actual_age: null,
                feedback_type: type,
            };

            // call api
            try{
                await submitFeedback(payload);
                onSubmitSuccess?.()
            } catch(error) {
                console.error("Failed to submit feedback:", error)
            }

        } else {
            setFeedbackType(type)
            setShowModal(true)
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleModalSubmit = async (age:number) => {
        const payload: FeedbackPayload = {
            features: features,
            predicted_age: prediction.predicted_age,
            actual_age: age,
            feedback_type: feedbackType!,
        };

        try {
            await submitFeedback(payload);
            setShowModal(false);
            onSubmitSuccess?.();
        } catch(error) {
            console.error("Failed to submit feedback:", error);
        }
    };

    return (
        <>
        {/* feedback buttons */}
            <div className="mt-12 text-center">
                <p className="text-lg font-medium text-gray-700 mb-4">How accurate was this?</p>
                <div className="flex gap-1">
                    <button onClick={() => handleFeedbackClick("very_accurate")} 
                        className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors">Very Accurate
                    </button>
                    <button onClick={() => handleFeedbackClick("close")}
                        className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors">Close
                    </button>
                    <button onClick={() => handleFeedbackClick("not_accurate")}
                        className="px-6 py-2 border-2 border-gray-300 rounded-lg text-gray-700 hover:border-emerald-700 hover:text-emerald-700 transition-colors">Not Accurate
                    </button>
                </div>
            </div>

            {/* modal */}
            {showModal && (
                <AgeInputModal
                    onClose={handleCloseModal}
                    onSubmit={handleModalSubmit}
                />
            )}
        </>
    );
}