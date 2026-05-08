"use client"

import { useState } from "react"
import {
  Trophy,
  CheckCircle,
  XCircle,
} from "lucide-react"

const questions = [

  {
    question:
      "What is React?",

    options: [
      "Database",
      "Library",
      "Server",
      "Language",
    ],

    correctAnswer:
      "Library",

    explanation:
      "React is a JavaScript library for building user interfaces.",
  },

  {
    question:
      "What is useState used for?",

    options: [
      "Routing",
      "API",
      "State Management",
      "Database",
    ],

    correctAnswer:
      "State Management",

    explanation:
      "useState is used to manage component state.",
  },

  {
    question:
      "Which hook is used for side effects?",

    options: [
      "useState",
      "useEffect",
      "useMemo",
      "useRef",
    ],

    correctAnswer:
      "useEffect",

    explanation:
      "useEffect handles side effects like API calls.",
  },

  {
    question:
      "What is Node.js?",

    options: [
      "Frontend Library",
      "Runtime Environment",
      "Database",
      "CSS Framework",
    ],

    correctAnswer:
      "Runtime Environment",

    explanation:
      "Node.js is a JavaScript runtime environment.",
  },

  {
    question:
      "What does SQL stand for?",

    options: [
      "Structured Query Language",
      "Simple Query Language",
      "Server Query Language",
      "Standard Question Language",
    ],

    correctAnswer:
      "Structured Query Language",

    explanation:
      "SQL stands for Structured Query Language.",
  },

  {
    question:
      "What is Tailwind CSS?",

    options: [
      "Backend Framework",
      "Database",
      "CSS Utility Framework",
      "API",
    ],

    correctAnswer:
      "CSS Utility Framework",

    explanation:
      "Tailwind CSS is a utility-first CSS framework.",
  },

  {
    question:
      "Which company developed React?",

    options: [
      "Google",
      "Microsoft",
      "Facebook",
      "Amazon",
    ],

    correctAnswer:
      "Facebook",

    explanation:
      "React was developed by Facebook.",
  },

  {
    question:
      "Which method fetches API data?",

    options: [
      "fetch()",
      "push()",
      "map()",
      "filter()",
    ],

    correctAnswer:
      "fetch()",

    explanation:
      "fetch() is used for making HTTP requests.",
  },

  {
    question:
      "What is MongoDB?",

    options: [
      "Library",
      "Database",
      "Framework",
      "Compiler",
    ],

    correctAnswer:
      "Database",

    explanation:
      "MongoDB is a NoSQL database.",
  },

  {
    question:
      "Which language is used with React?",

    options: [
      "Python",
      "Java",
      "JavaScript",
      "C++",
    ],

    correctAnswer:
      "JavaScript",

    explanation:
      "React is primarily used with JavaScript.",
  },
]

export default function QuizFlowPage() {

  const [currentQuestion, setCurrentQuestion] =
    useState(0)

  const [selectedAnswer, setSelectedAnswer] =
    useState("")

  const [answers, setAnswers] =
    useState<any[]>([])

  const [quizFinished, setQuizFinished] =
    useState(false)

  const [score, setScore] =
    useState(0)

  const nextQuestion = () => {

    const question =
      questions[currentQuestion]

    const isCorrect =
      selectedAnswer ===
      question.correctAnswer

    setAnswers([
      ...answers,
      {
        ...question,
        selectedAnswer,
        isCorrect,
      },
    ])

    if (isCorrect) {

      setScore((prev) => prev + 1)
    }

    setSelectedAnswer("")

    if (
      currentQuestion + 1 <
      questions.length
    ) {

      setCurrentQuestion(
        currentQuestion + 1
      )

    } else {

      setQuizFinished(true)
    }
  }

  // =====================================
  // RESULT PAGE
  // =====================================

  if (quizFinished) {

    const percentage = Math.round(
      (score / questions.length) * 100
    )

    return (
      <div className="min-h-screen bg-zinc-100 p-6 lg:p-10">

        <div className="max-w-5xl mx-auto">

          {/* HEADER */}

          <h1 className="text-6xl font-black">

            Quiz Flow

          </h1>

          <p className="text-zinc-600 mt-2">

            Quiz Results

          </p>

          {/* RESULT CARD */}

          <div className="mt-10 bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl">

            <div className="flex items-center justify-between mb-8">

              <div className="flex items-center gap-4">

                <div className="bg-yellow-100 p-4 rounded-2xl">

                  <Trophy
                    className="text-yellow-500"
                    size={35}
                  />

                </div>

                <div>

                  <h2 className="text-3xl font-bold">

                    Quiz Results

                  </h2>

                  <p className="text-zinc-500">

                    Technical Performance

                  </p>

                </div>

              </div>

              <div
                className={`text-5xl font-black px-6 py-3 rounded-2xl ${
                  percentage >= 75
                    ? "bg-green-100 text-green-600"
                    : percentage >= 50
                    ? "bg-yellow-100 text-yellow-600"
                    : "bg-red-100 text-red-600"
                }`}
              >

                {percentage}%

              </div>

            </div>

            {/* PROGRESS */}

            <div className="w-full bg-zinc-200 rounded-full h-5 overflow-hidden">

              <div
                className={`h-full transition-all duration-500 ${
                  percentage >= 75
                    ? "bg-green-500"
                    : percentage >= 50
                    ? "bg-yellow-500"
                    : "bg-red-500"
                }`}
                style={{
                  width: `${percentage}%`,
                }}
              />

            </div>

            {/* MESSAGE */}

            <div className="mt-6">

              {percentage >= 75 && (

                <div className="bg-green-100 border border-green-300 text-green-700 p-5 rounded-2xl font-semibold">

                  Excellent Performance 

                </div>
              )}

              {percentage >= 50 &&
                percentage < 75 && (

                  <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 p-5 rounded-2xl font-semibold">

                    Good Job. Keep Practicing.

                  </div>
                )}

              {percentage < 50 && (

                <div className="bg-red-100 border border-red-300 text-red-700 p-5 rounded-2xl font-semibold">

                  You Need More Practice.

                </div>
              )}

            </div>

          </div>

          {/* REVIEW */}

          <div className="mt-10 space-y-6">

            {answers.map(
              (
                item,
                index
              ) => (

                <div
                  key={index}
                  className="bg-white border border-zinc-200 rounded-3xl p-6 shadow-sm"
                >

                  <div className="flex items-start justify-between">

                    <div className="w-full">

                      <h2 className="text-2xl font-bold">

                        {item.question}

                      </h2>

                      {/* YOUR ANSWER */}

                      <p className="mt-5 text-lg">

                        <span className="font-bold text-zinc-700">

                          Your Answer:

                        </span>{" "}

                        <span
                          className={`font-bold ${
                            item.isCorrect
                              ? "text-green-600"
                              : "text-red-600"
                          }`}
                        >

                          {item.selectedAnswer}

                        </span>

                      </p>

                      {/* CORRECT ANSWER */}

                      <p className="mt-3 text-lg">

                        <span className="font-bold text-zinc-700">

                          Correct Answer:

                        </span>{" "}

                        <span className="font-bold text-green-600">

                          {item.correctAnswer}

                        </span>

                      </p>

                      {/* EXPLANATION */}

                      <div className="mt-5 bg-zinc-100 rounded-2xl p-5 text-zinc-700 leading-7">

                        <span className="font-bold">

                          Explanation:

                        </span>{" "}

                        {item.explanation}

                      </div>

                    </div>

                    <div className="ml-5">

                      {item.isCorrect ? (

                        <CheckCircle
                          className="text-green-500"
                          size={32}
                        />

                      ) : (

                        <XCircle
                          className="text-red-500"
                          size={32}
                        />

                      )}

                    </div>

                  </div>

                </div>
              )
            )}

          </div>

        </div>

      </div>
    )
  }

  // =====================================
  // QUIZ PAGE
  // =====================================

  const question =
    questions[currentQuestion]

  return (
    <div className="min-h-screen bg-zinc-100 p-6 lg:p-10">

      <div className="max-w-5xl mx-auto">

        {/* HEADER */}

        <h1 className="text-6xl font-black">

          Quiz Flow

        </h1>

        <p className="text-zinc-600 mt-2">

          Test your knowledge with technical MCQs

        </p>

        {/* QUIZ CARD */}

        <div className="mt-10 bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl">

          <p className="text-zinc-500 mb-5 font-medium">

            Question {currentQuestion + 1}
            {" "}of{" "}
            {questions.length}

          </p>

          <h2 className="text-3xl font-bold leading-snug">

            {question.question}

          </h2>

          {/* OPTIONS */}

          <div className="mt-8 space-y-4">

            {question.options.map(
              (
                option,
                index
              ) => (

                <button
                  key={index}
                  onClick={() =>
                    setSelectedAnswer(
                      option
                    )
                  }
                  className={`w-full text-left border rounded-2xl p-5 transition-all text-lg font-medium ${
                    selectedAnswer === option
                      ? "border-blue-500 bg-blue-50"
                      : "border-zinc-200 bg-white hover:bg-zinc-50"
                  }`}
                >

                  {option}

                </button>
              )
            )}

          </div>

          {/* NEXT BUTTON */}

          <div className="mt-8 flex justify-end">

            <button
              disabled={!selectedAnswer}
              onClick={nextQuestion}
              className="bg-black hover:bg-zinc-800 text-white px-8 py-4 rounded-2xl font-semibold disabled:opacity-50 transition-all"
            >

              {currentQuestion + 1 ===
              questions.length
                ? "Finish Quiz"
                : "Next Question"}

            </button>

          </div>

        </div>

      </div>

    </div>
  )
}