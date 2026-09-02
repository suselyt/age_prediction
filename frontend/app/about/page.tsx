"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export default function AboutPage() {
  const [activeSection, setActiveSection] = useState("about-project");

  const handleNavClick = (sectionId: string) => {
    setActiveSection(sectionId);
  };

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["about-project", "how-to-play", "about-model", "about-me"];
      const scrollPosition = window.scrollY + 150;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetHeight = element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(sectionId);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <main className="container mx-auto flex min-h-screen gap-8 px-4 py-8">
      {/* Navigation Sidebar - Fixed Left */}
      <nav className="sticky top-24 h-screen w-48 shrink-0 border-r border-gray-200 pr-6">
        <ul className="flex flex-col gap-2">
          <li>
            <Link
              href="#about-project"
              onClick={() => handleNavClick("about-project")}
              className={`block rounded px-3 py-2 transition-colors ${
                activeSection === "about-project"
                  ? "bg-gray-100 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
            >
              About Project
            </Link>
          </li>
          <li>
            <Link
              href="#how-to-play"
              onClick={() => handleNavClick("how-to-play")}
              className={`block rounded px-3 py-2 transition-colors ${
                activeSection === "how-to-play"
                  ? "bg-gray-100 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
            >
              How to Play
            </Link>
          </li>
          <li>
            <Link
              href="#about-model"
              onClick={() => handleNavClick("about-model")}
              className={`block rounded px-3 py-2 transition-colors ${
                activeSection === "about-model"
                  ? "bg-gray-100 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
            >
              About the Model
            </Link>
          </li>
          <li>
            <Link
              href="#about-me"
              onClick={() => handleNavClick("about-me")}
              className={`block rounded px-3 py-2 transition-colors ${
                activeSection === "about-me"
                  ? "bg-gray-100 text-emerald-700"
                  : "text-gray-700 hover:bg-gray-100 hover:text-emerald-700"
              }`}
            >
              About Me
            </Link>
          </li>
        </ul>
      </nav>

      {/* Content Sections */}
      <div className="flex-1 space-y-12">
        {/* About Project */}
        <section>
          <h2 id="about-project" className="text-2xl font-bold text-gray-900">
            About This Project
          </h2>
          <div className="mt-4 space-y-3 text-gray-700">
            <p>
              This app predicts your &quot;biological age&quot; based on 11 lifestyle factors
              like sleep, diet, stress, and physical activity.
            </p>
            <p>
              A machine learning model (XGBoost) was trained on anonymized health data
              from Kaggle to find patterns between lifestyle habits and age. The model
              has an accuracy of ±4.79 years.
            </p>
            <p>
              Your answers are not stored or shared. This is a learning project to
              demonstrate ML concepts in a practical, interactive way.
            </p>
          </div>
        </section>

        {/* How to Play */}
        <section>
          <h2 id="how-to-play" className="text-2xl font-bold text-gray-900">
            How to Play
          </h2>
          <div className="mt-4 space-y-3 text-gray-700">
            <p>
              <strong>Requirements:</strong> You must be at least 18 years old (the model
              was trained on adults aged 18-89).
            </p>
            <ol className="list-inside list-decimal space-y-2">
              <li>Click &quot;Play&quot; on the home page or &quot;Quiz&quot; in the navigation menu.</li>
              <li>Answer 11 lifestyle questions (one at a time).</li>
              <li>The model will predict your biological age.</li>
              <li>Tell us if the prediction was close or not (optional feedback).</li>
              <li>See how your lifestyle compares to your actual age.</li>
            </ol>
          </div>
        </section>

        {/* About the Model */}
        <section>
          <h2 id="about-model" className="text-2xl font-bold text-gray-900">
            About the Model
          </h2>
          <div className="mt-4 space-y-3 text-gray-700">
            <p>
              <strong>Model Type:</strong> XGBoost Regressor
            </p>
            <p>
              <strong>Training Data:</strong>{" "}
              <a
                href="https://www.kaggle.com/datasets/abdullah0a/human-age-prediction-dataset"
                target="_blank"
                rel="noopener noreferrer"
                className="text-emerald-700 underline transition-colors hover:text-emerald-600"
              >
                Kaggle Human Age Prediction Dataset
              </a>
            </p>
            <p>
              <strong>Accuracy:</strong>
            </p>
            <ul className="list-inside list-disc space-y-1 pl-4">
              <li>Mean Absolute Error (MAE): 4.79 years</li>
              <li>R² Score: 0.909 (90.9% variance explained)</li>
            </ul>
            <p>
              <strong>Features Used:</strong> Bone density, vision sharpness, hearing ability,
              physical activity level, smoking status, alcohol consumption, diet, mental health
              status, sleep patterns, stress levels, and income level.
            </p>
          </div>
        </section>

        {/* About Me */}
        <section>
          <h2 id="about-me" className="text-2xl font-bold text-gray-900">
            About Me
          </h2>
          <div className="mt-4 space-y-3 text-gray-700">
            <p>
              I built this project to learn how machine learning models work in practice,
              from data cleaning to training to deployment in a real web application.
            </p>
            <p>This is a portfolio project demonstrating:</p>
            <ul className="list-inside list-disc space-y-1 pl-4">
              <li>End-to-end ML workflow (data → model → API → web)</li>
              <li>Python (FastAPI, scikit-learn, XGBoost)</li>
              <li>JavaScript (Next.js, TypeScript, Tailwind CSS)</li>
            </ul>
            <p>Connect with me:</p>
            <ul className="list-inside list-disc space-y-1 pl-4">
              <li>
                <a
                  href="https://github.com/YOUR_USERNAME"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-emerald-700 underline transition-colors hover:text-emerald-600"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="mailto:YOUR_EMAIL@example.com"
                  className="text-emerald-700 underline transition-colors hover:text-emerald-600"
                >
                  Email
                </a>
              </li>
            </ul>
          </div>
        </section>

        {/* Disclaimer */}
        <section className="border-t border-gray-200 pt-8">
          <h2 id="disclaimer" className="text-lg font-semibold text-gray-900">
            Disclaimer
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            <strong>Note:</strong> This is for educational and entertainment purposes only.
            The predictions are estimates based on statistical patterns, not medical advice.
            Always consult healthcare professionals for health-related decisions.
          </p>
        </section>
      </div>
    </main>
  );
}
