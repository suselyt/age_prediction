"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

const questions = [
  {
    id: "bone_density",
    question: "Do you experience joint pain or stiffness?",
    options: [
      { label: "No, my joints feel great", value: 1.5 },
      { label: "Occasionally, mild discomfort", value: 1.0 },
      { label: "Yes, moderate joint pain", value: 0.7 },
      { label: "Yes, frequent joint pain", value: 0.5 },
    ],
  },
  {
    id: "vision_sharpness",
    question: "How would you describe your vision?",
    options: [
      { label: "Perfect vision, no glasses needed", value: 100 },
      { label: "Slight blurriness, glasses sometimes", value: 70 },
      { label: "Need glasses for reading", value: 50 },
      { label: "Poor vision, glasses always needed", value: 30 },
    ],
  },
  {
    id: "hearing_ability",
    question: "How is your hearing?",
    options: [
      { label: "Excellent, I hear everything clearly", value: 10 },
      { label: "Good, occasional difficulty in noisy places", value: 30 },
      { label: "Fair, I sometimes ask people to repeat", value: 50 },
      { label: "Poor, I struggle to hear conversations", value: 70 },
    ],
  },
  {
    id: "physical_activity_level",
    question: "How physically active are you?",
    options: [
      { label: "Low - Mostly sedentary lifestyle", value: "Low" },
      { label: "Moderate - Exercise a few times a week", value: "Moderate" },
      { label: "High - Exercise daily or very active job", value: "High" },
    ],
  },
  {
    id: "smoking_status",
    question: "What is your smoking status?",
    options: [
      { label: "Never smoked", value: "Never" },
      { label: "Former smoker, quit", value: "Former" },
      { label: "Current smoker", value: "Current" },
    ],
  },
  {
    id: "alcohol_consumption",
    question: "How often do you consume alcohol?",
    options: [
      { label: "None - I don't drink", value: "None" },
      { label: "Occasional - A few drinks per month", value: "Occasional" },
      { label: "Frequent - Several drinks per week", value: "Frequent" },
    ],
  },
  {
    id: "diet",
    question: "How would you describe your diet?",
    options: [
      { label: "Balanced - Mix of everything", value: "Balanced" },
      { label: "Low-carb - Reduced carbohydrates", value: "Low-carb" },
      { label: "Vegetarian - No meat", value: "Vegetarian" },
      { label: "High-fat - Keto or similar", value: "High-fat" },
    ],
  },
  {
    id: "mental_health_status",
    question: "How would you rate your mental health?",
    options: [
      { label: "Excellent - Feeling great", value: "Excellent" },
      { label: "Good - Generally positive", value: "Good" },
      { label: "Fair - Some stress or anxiety", value: "Fair" },
      { label: "Poor - Struggling often", value: "Poor" },
    ],
  },
  {
    id: "sleep_patterns",
    question: "How would you describe your sleep?",
    options: [
      { label: "Normal - 7-8 hours, restful", value: "Normal" },
      { label: "Insomnia - Difficulty falling or staying asleep", value: "Insomnia" },
      { label: "Excessive - Sleeping more than 9 hours", value: "Excessive" },
    ],
  },
  {
    id: "stress_levels",
    question: "How stressed do you feel on average?",
    options: [
      { label: "Very low - Rarely stressed", value: 2 },
      { label: "Moderate - Some daily stress", value: 5 },
      { label: "High - Frequently stressed", value: 7 },
      { label: "Very high - Constantly stressed", value: 9 },
    ],
  },
  {
    id: "income_level",
    question: "What is your income bracket?",
    options: [
      { label: "Low - Below average income", value: "Low" },
      { label: "Medium - Average income", value: "Medium" },
      { label: "High - Above average income", value: "High" },
    ],
  },
];

export default function QuizPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, unknown>>({});

  const handleSelectOption = (questionId: string, value: unknown) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: value,
    }));
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const isQuestionAnswered = answers[questions[currentQuestion].id] !== undefined;

  return (
    <main className="flex flex-1 flex-col py-8">
      {/* Progress Bar */}
      <div className="container mx-auto mb-8 px-4">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-600">
            Question {currentQuestion + 1} of {questions.length}
          </span>
          <span className="text-sm font-medium text-blue-600">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-blue-600 transition-all duration-300"
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Content Grid */}
      <div className="container mx-auto grid flex-1 grid-cols-1 items-center gap-12 px-4 md:grid-cols-2">
        {/* LEFT - Image */}
        <div className="flex items-center justify-center">
          <div className="relative aspect-square w-full max-w-md overflow-hidden rounded-lg bg-gray-100">
            <Image
              src="/placeholder.jpg"
              alt="Quiz illustration"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* RIGHT - Question + Options */}
        <div className="flex flex-col">
          {/* Question Number + Text */}
          <h2 className="text-xl font-bold md:text-2xl">
            Question {currentQuestion + 1}
          </h2>
          <p className="mt-2 text-lg text-gray-700">
            {questions[currentQuestion].question}
          </p>

          {/* Answer Options */}
          <div className="mt-6 flex flex-col gap-3">
            {questions[currentQuestion].options.map((option) => {
              const isSelected = answers[questions[currentQuestion].id] === option.value;
              return (
                <button
                  key={String(option.value)}
                  onClick={() => handleSelectOption(questions[currentQuestion].id, option.value)}
                  className={`rounded-lg border-2 px-4 py-3 text-left transition-colors ${
                    isSelected
                      ? "border-blue-600 bg-blue-50 text-blue-700"
                      : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50"
                  }`}
                >
                  {option.label}
                </button>
              );
            })}
          </div>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleBack}
              disabled={currentQuestion === 0}
              className="flex items-center gap-2 text-gray-600 transition-colors hover:text-gray-900 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <svg className="size-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back
            </button>
            {currentQuestion < questions.length - 1 ? (
              <button
                onClick={handleNext}
                disabled={!isQuestionAnswered}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Next
              </button>
            ) : (
              <Link
                href={{
                  pathname: "/result",
                  query: { answers: JSON.stringify(answers) },
                }}
                className="rounded-lg bg-blue-600 px-6 py-2 text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-gray-300"
                aria-disabled={!isQuestionAnswered}
              >
                See Results
              </Link>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
