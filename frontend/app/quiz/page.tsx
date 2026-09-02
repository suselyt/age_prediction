"use client";

import { useState } from "react";
import { questions } from "@/lib/questions";
import Image from "next/image";
import Link from "next/link";

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
          <span className="text-sm font-medium text-emerald-600">
            {Math.round(((currentQuestion + 1) / questions.length) * 100)}%
          </span>
        </div>
        <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-gray-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all duration-300"
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
                      ? "border-emerald-600 bg-blue-50 text-emerald-700"
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
                className="rounded-lg bg-emerald-600 px-6 py-2 text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
              >
                Next
              </button>
            ) : (
              <Link
                href={{
                  pathname: "/result",
                  query: { answers: JSON.stringify(answers) },
                }}
                className="rounded-lg bg-emerald-600 px-6 py-2 text-white transition-colors hover:bg-emerald-700 disabled:cursor-not-allowed disabled:bg-gray-300"
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
