"use client"

import { useState, useRef } from "react"

const allQuestions = [
  "Explain Object Oriented Programming.",
  "What is React and how does it work?",
  "Explain difference between var, let and const.",
  "What is REST API?",
  "Explain SQL JOIN.",
  "What is Encapsulation in OOP?",
]

declare global {
  interface Window {
    webkitSpeechRecognition: any
  }
}

export default function InterviewSimulator() {

  const [step, setStep] = useState<
    "form" | "interview"
  >("form")

  const [role, setRole] = useState("")

  const [level, setLevel] = useState("")

  const [currentQuestion, setCurrentQuestion] =
    useState("")

  const [countdown, setCountdown] =
    useState(5)

  const [recording, setRecording] =
    useState(false)

  const [transcript, setTranscript] =
    useState("")

  const [result, setResult] =
    useState<any>(null)

  const recognitionRef =
    useRef<any>(null)

  // =====================================================
  // RANDOM QUESTION
  // =====================================================

  const getRandomQuestion = () => {

    const random =
      allQuestions[
        Math.floor(
          Math.random() *
            allQuestions.length
        )
      ]

    setCurrentQuestion(random)
  }

  // =====================================================
  // START INTERVIEW
  // =====================================================

  const startInterview = async () => {

    try {

      if (!role) {

        alert("Please enter your role")

        return
      }

      setStep("interview")

      getRandomQuestion()

      // Ask microphone permission
      await navigator.mediaDevices.getUserMedia({
        audio: true,
      })

      startCountdown()

    } catch (error) {

      console.log(error)

      alert("Microphone access denied")
    }
  }

  // =====================================================
  // COUNTDOWN
  // =====================================================

  const startCountdown = () => {

    setCountdown(5)

    let timer = 5

    const interval = setInterval(() => {

      timer--

      setCountdown(timer)

      if (timer <= 0) {

        clearInterval(interval)

        startRecording()
      }

    }, 1000)
  }

  // =====================================================
  // START RECORDING
  // =====================================================

  const startRecording = async () => {

    try {

      console.log(
        "Starting microphone..."
      )

      const SpeechRecognition =
        window.webkitSpeechRecognition

      if (!SpeechRecognition) {

        alert(
          "Speech Recognition not supported"
        )

        return
      }

      const recognition =
        new SpeechRecognition()

      recognition.lang = "en-US"

      recognition.continuous = true

      recognition.interimResults = true

      recognition.onstart = () => {

        console.log(
          "Recording started"
        )

        setRecording(true)
      }

      recognition.onresult = (
        event: any
      ) => {

        let speech = ""

        for (
          let i = event.resultIndex;
          i < event.results.length;
          i++
        ) {

          speech +=
            event.results[i][0]
              .transcript + " "
        }

        setTranscript(speech)
      }

      recognition.onerror = (
        event: any
      ) => {

        console.log(event.error)

        alert(event.error)
      }

      recognition.onend = () => {

        console.log(
          "Recording ended"
        )

        setRecording(false)
      }

      recognition.start()

      recognitionRef.current =
        recognition

    } catch (error) {

      console.log(error)

      alert("Microphone failed")
    }
  }

  // =====================================================
  // STOP RECORDING + ML PREDICTION
  // =====================================================

  const stopRecording = async () => {

    try {

      recognitionRef.current?.stop()

      setRecording(false)

      // SEND TO BACKEND
      const response = await fetch(
        "/api/interview/analyze",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            role,
            level,
            question: currentQuestion,
            answer: transcript,
          }),
        }
      )

      const data = await response.json()

      console.log(data)

      setResult(data)

    } catch (error) {

      console.log(error)

      alert("Prediction failed")
    }
  }

  // =====================================================
  // NEXT QUESTION
  // =====================================================

  const nextQuestion = async () => {

    await stopRecording()

    setTranscript("")

    setResult(null)

    getRandomQuestion()

    startCountdown()
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">

      <div className="bg-white rounded-xl shadow-md w-full max-w-xl p-8">

        {/* ================================================= */}
        {/* FORM STEP */}
        {/* ================================================= */}

        {step === "form" && (
          <>
            <h1 className="text-3xl font-bold text-center mb-6">
              Interview Simulator
            </h1>

            <div className="space-y-4">

              <input
                placeholder="Enter Your Role"
                value={role}
                onChange={(e) =>
                  setRole(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
              />

              <select
                value={level}
                onChange={(e) =>
                  setLevel(e.target.value)
                }
                className="w-full border rounded-lg px-4 py-2"
              >

                <option value="">
                  Select Experience Level
                </option>

                <option>
                  Fresher
                </option>

                <option>
                  1-3 Years
                </option>

                <option>
                  3+ Years
                </option>

              </select>

              <button
                onClick={startInterview}
                className="w-full bg-black text-white py-2 rounded-lg"
              >
                Start Interview
              </button>

            </div>
          </>
        )}

        {/* ================================================= */}
        {/* INTERVIEW STEP */}
        {/* ================================================= */}

        {step === "interview" && (
          <>
            <h2 className="text-xl font-semibold">
              🎤 {role} Interview
            </h2>

            {/* QUESTION */}

            <div className="mt-6 bg-gray-50 p-4 rounded-lg">

              <p className="font-semibold">
                Question:
              </p>

              <p className="mt-2">
                {currentQuestion}
              </p>

            </div>

            {/* COUNTDOWN */}

            {!recording &&
              countdown > 0 && (

                <div className="text-center mt-6">

                  <p className="text-gray-500">
                    Read the question
                  </p>

                  <div className="text-4xl font-bold text-red-500">
                    {countdown}
                  </div>

                </div>
              )}

            {/* RECORDING */}

            {recording && (

              <div className="mt-6 text-center">

                <p className="text-green-600 font-semibold">
                  🎙 Recording...
                </p>

                <button
                  onClick={stopRecording}
                  className="mt-3 bg-red-500 text-white px-5 py-2 rounded-lg"
                >
                  Stop
                </button>

              </div>
            )}

            {/* TRANSCRIPT */}

            {transcript && (

              <div className="mt-6 bg-gray-50 p-4 rounded-lg">

                <p className="font-semibold">
                  Your Answer:
                </p>

                <p className="mt-2 text-gray-700">
                  {transcript}
                </p>

              </div>
            )}

            {/* RESULT */}

            {result && (

              <div className="mt-6 grid grid-cols-2 gap-4">

                <div className="bg-green-100 border border-green-300 rounded-lg p-5">

                  <p className="font-semibold">
                    Technical Score
                  </p>

                  <div className="text-4xl font-bold mt-3 text-green-700">

                    {Math.round(result.technical_score)}/10

                  </div>

                  <p className="mt-2">
                    {result.technical_label}
                  </p>

                </div>

                <div className="bg-blue-100 border border-blue-300 rounded-lg p-5">

                  <p className="font-semibold">
                    Communication Score
                  </p>

                  <div className="text-4xl font-bold mt-3 text-blue-700">

                    {Math.round(result.communication_score)}/10

                  </div>

                  <p className="mt-2">
                    {result.communication_label}
                  </p>

                </div>

              </div>
            )}

            {/* BUTTONS */}

            <div className="mt-6 flex justify-between">

              <button
                onClick={nextQuestion}
                className="bg-black text-white px-5 py-2 rounded-lg"
              >
                Next Question
              </button>

              <button
                onClick={async () => {

                  await stopRecording()

                  setStep("form")
                }}
                className="border px-5 py-2 rounded-lg"
              >
                End Interview
              </button>

            </div>
          </>
        )}
      </div>
    </div>
  )
}