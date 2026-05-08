"use client"

import { useState } from "react"
import axios from "axios"
import {
  Brain,
  Sparkles,
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Target,
  Zap,
} from "lucide-react"

export default function SkillGapAnalyzerPage() {

  const [jobRole, setJobRole] =
    useState("")

  const [skills, setSkills] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  const [result, setResult] =
    useState<any>(null)

  const analyzeSkills = async () => {

    try {

      if (!jobRole || !skills) {

        alert(
          "Please enter job role and skills"
        )

        return
      }

      setLoading(true)

      const response =
        await axios.post(
          "/api/skill-gap/analyze",
          {
            jobRole,
            skills,
          }
        )

      setResult(response.data)

    } catch (error) {

      console.log(error)

      alert("Analysis failed")

    } finally {

      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-100 text-black p-6 lg:p-10">

      {/* HEADER */}

      <div className="mb-12">

        <div className="flex items-center gap-5">

          <div className="bg-gradient-to-br from-red-500 to-orange-500 p-5 rounded-3xl shadow-2xl text-white">

            <Brain size={40} />

          </div>

          <div>

            <h1 className="text-5xl lg:text-6xl font-black tracking-tight">

              Skill Gap Analyzer

            </h1>

            <p className="text-zinc-600 mt-3 text-lg">

              AI-powered skill analysis for your dream role.

            </p>

          </div>

        </div>

      </div>

      {/* MAIN GRID */}

      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">

        {/* LEFT PANEL */}

        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <Zap className="text-yellow-500" />

            <h2 className="text-3xl font-bold">
              Analyze Your Skills
            </h2>

          </div>

          <div className="space-y-6">

            {/* JOB ROLE */}

            <div>

              <label className="block mb-3 text-sm text-zinc-500">

                Target Job Role

              </label>

              <input
                type="text"
                placeholder="Frontend Developer"
                value={jobRole}
                onChange={(e) =>
                  setJobRole(e.target.value)
                }
                className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 outline-none focus:border-red-500 transition-all"
              />

            </div>

            {/* SKILLS */}

            <div>

              <label className="block mb-3 text-sm text-zinc-500">

                Your Skills

              </label>

              <textarea
                rows={10}
                placeholder="React.js, Next.js, TypeScript"
                value={skills}
                onChange={(e) =>
                  setSkills(e.target.value)
                }
                className="w-full bg-zinc-50 border border-zinc-300 rounded-2xl p-4 outline-none focus:border-red-500 transition-all"
              />

            </div>

            {/* BUTTON */}

            <button
              onClick={analyzeSkills}
              className="w-full bg-gradient-to-r from-red-500 to-orange-500 hover:scale-[1.02] transition-all rounded-2xl py-4 text-lg font-bold text-white flex items-center justify-center gap-3 shadow-lg"
            >

              <Sparkles size={22} />

              {loading
                ? "Analyzing..."
                : "Analyze Skill Gap"}

            </button>

          </div>

        </div>

        {/* RIGHT PANEL */}

        <div className="bg-white border border-zinc-200 rounded-3xl p-8 shadow-xl">

          <div className="flex items-center gap-3 mb-8">

            <TrendingUp
              className="text-red-500"
              size={30}
            />

            <h2 className="text-3xl font-bold">
              Analysis Result
            </h2>

          </div>

          {!result ? (

            <div className="h-full flex flex-col items-center justify-center text-zinc-500 text-lg">

              <Brain
                size={80}
                className="mb-5 opacity-40"
              />

              Run analysis to view AI results.

            </div>

          ) : (

            <div className="space-y-8">

              {/* MATCH SCORE */}

              <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6">

                <div className="flex items-center justify-between mb-5">

                  <h3 className="text-2xl font-bold">
                    Match Score
                  </h3>

                  <div
                    className={`text-5xl font-black ${
                      result.matchScore >= 75
                        ? "text-green-500"
                        : result.matchScore >= 50
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >

                    {result.matchScore}%

                  </div>

                </div>

                {/* PROGRESS BAR */}

                <div className="w-full bg-zinc-200 rounded-full h-5 overflow-hidden">

                  <div
                    className={`h-full rounded-full transition-all duration-700 ${
                      result.matchScore >= 75
                        ? "bg-gradient-to-r from-green-400 to-emerald-500"
                        : result.matchScore >= 50
                        ? "bg-gradient-to-r from-yellow-400 to-orange-500"
                        : "bg-gradient-to-r from-red-500 to-red-700"
                    }`}
                    style={{
                      width: `${result.matchScore}%`,
                    }}
                  />

                </div>

                {/* SCORE MESSAGE */}

                <div className="mt-5">

                  {result.matchScore >= 75 && (

                    <div className="bg-green-100 border border-green-300 text-green-700 rounded-2xl p-4">

                      Excellent match for this role 🚀

                    </div>
                  )}

                  {result.matchScore >= 50 &&
                    result.matchScore < 75 && (

                      <div className="bg-yellow-100 border border-yellow-300 text-yellow-700 rounded-2xl p-4">

                        Good skill alignment. Improve missing skills.

                      </div>
                    )}

                  {result.matchScore < 50 && (

                    <div className="bg-red-100 border border-red-300 text-red-700 rounded-2xl p-4">

                      Significant skill gaps detected. Focus on learning key technologies.

                    </div>
                  )}

                </div>

              </div>

              {/* MATCHED SKILLS */}

              <div>

                <div className="flex items-center gap-3 mb-5">

                  <CheckCircle className="text-green-500" />

                  <h3 className="text-2xl font-bold">
                    Matched Skills
                  </h3>

                </div>

                <div className="flex flex-wrap gap-3">

                  {result.matchedSkills?.map(
                    (
                      skill: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="bg-green-100 border border-green-300 text-green-700 px-5 py-3 rounded-2xl font-medium"
                      >

                        {skill}

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* MISSING SKILLS */}

              <div>

                <div className="flex items-center gap-3 mb-5">

                  <AlertCircle className="text-red-500" />

                  <h3 className="text-2xl font-bold">
                    Missing Skills
                  </h3>

                </div>

                <div className="flex flex-wrap gap-3">

                  {result.missingSkills?.map(
                    (
                      skill: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="bg-red-100 border border-red-300 text-red-700 px-5 py-3 rounded-2xl font-medium"
                      >

                        {skill}

                      </div>
                    )
                  )}

                </div>

              </div>

              {/* RECOMMENDATIONS */}

              <div>

                <div className="flex items-center gap-3 mb-5">

                  <Target className="text-blue-500" />

                  <h3 className="text-2xl font-bold">
                    Recommendations
                  </h3>

                </div>

                <div className="space-y-4">

                  {result.recommendations?.map(
                    (
                      item: string,
                      index: number
                    ) => (

                      <div
                        key={index}
                        className="bg-white border border-zinc-200 rounded-2xl p-5 text-zinc-700 leading-7 shadow-sm"
                      >

                        {item}

                      </div>
                    )
                  )}

                </div>

              </div>

            </div>
          )}

        </div>

      </div>

    </div>
  )
}