"use client";

import { useState } from "react";

interface AgeModalProps {
    onClose: () => void;
    onSubmit: (age: number) => void;

};

export default function AgeInputModal({onClose, onSubmit}: AgeModalProps) {
    const [age, setAge] = useState<number>(20);

    const handleSubmit = () => {
        if (age >= 18 && age <= 89){
            onSubmit(age);
        }
    };

    return( 
        <>
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
                <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-xl">
                    <h2 className="text-xl font-semibold text-gray-800 mb-2">What's your actual age?</h2>
                    <p className="text-gray-600 mb-4">This helps us improve our predictions</p>
                    <label htmlFor="age" className="block text-gray-700 mb-2">Age:</label>
                    <input id="age" type="number" 
                        className="w-full px-3 py-2 border-2 border-gray-300 rounded-lg focus:border-emerald-700 focus:outline-none"
                        value={age} onChange={(e) => setAge(parseInt(e.target.value) || 20)} min={18} max={89}/>

                    {/* send & close buttons */}
                    <div className="flex gap-3 mt-6">
                        <button className="flex-1 px-4 py-2 bg-emerald-700 text-white rounded-lg hover:bg-emerald-800 transition-colors"
                            onClick={handleSubmit}>
                            Submit
                        </button>
                        <button className="flex-1 px-4 py-2 border-2 border-gray-300 text-gray-700 rounded-lg hover:border-emerald-700 hover:text-emerald-700 transition-colors"
                            onClick={onClose}>Close
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}