"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { useUser, SignInButton, UserButton } from "@clerk/nextjs"

export default function Home() {
  const { user } = useUser()

  return (
    <div className="relative min-h-screen bg-white overflow-hidden">

      {/* ===== ANIMATED BACKGROUND BLOBS ===== */}
      <motion.div
        animate={{ x: [0, 50, -30, 0], y: [0, -40, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity }}
        className="absolute top-[-200px] left-[-200px] w-[600px] h-[600px] bg-indigo-300/30 rounded-full blur-3xl -z-10"
      />
      <motion.div
        animate={{ x: [0, -60, 40, 0], y: [0, 50, -30, 0] }}
        transition={{ duration: 25, repeat: Infinity }}
        className="absolute bottom-[-200px] right-[-200px] w-[600px] h-[600px] bg-purple-300/30 rounded-full blur-3xl -z-10"
      />

      {/* ================= NAVBAR ================= */}
      <header className="fixed top-0 w-full backdrop-blur-xl bg-white/70 border-b z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

          <h1 className="text-xl font-bold tracking-tight">
            Smart Career Coach
          </h1>

          {!user ? (
            <SignInButton mode="modal" signUpForceRedirectUrl="/dashboard">
              <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg shadow transition">
                Get Started
              </button>
            </SignInButton>
          ) : (
            <UserButton afterSignOutUrl="/" />
          )}

        </div>
      </header>

      {/* ================= HERO ================= */}
      <section className="pt-44 pb-32 text-center max-w-6xl mx-auto px-6">

        <motion.h2
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-7xl font-extrabold leading-tight"
        >
          The AI Platform for
          <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Career Acceleration
          </span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-lg text-gray-600 max-w-2xl mx-auto"
        >
          Resume scoring. AI interview simulations. Career roadmaps.
          Smart Q&A. Everything powered by Machine Learning.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 flex justify-center gap-6"
        >
          <Link href="/dashboard">
            <button className="bg-indigo-600 text-white px-10 py-4 rounded-xl shadow-xl hover:scale-105 transition">
              Launch Dashboard
            </button>
          </Link>

          <Link href="/ai-interview">
            <button className="border px-10 py-4 rounded-xl hover:border-indigo-600 hover:text-indigo-600 transition">
              Watch Demo
            </button>
          </Link>
        </motion.div>

      </section>

      {/* ================= FEATURES ================= */}
      <section className="max-w-7xl mx-auto px-6 pb-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8">

        {features.map((f, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15 }}
            viewport={{ once: true }}
            className="bg-white/80 backdrop-blur-lg border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-3 transition-all duration-300"
          >
            <h3 className="text-xl font-semibold">{f.title}</h3>
            <p className="mt-4 text-gray-600 text-sm">{f.desc}</p>
          </motion.div>
        ))}

      </section>

      {/* ================= STATS ================= */}
      <section className="py-28 bg-gray-50 border-t">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-12 text-center">

          <Stat number="95%" label="Model Accuracy" />
          <Stat number="10K+" label="Students Guided" />
          <Stat number="4 Core AI Modules" label="Integrated Platform" />

        </div>
      </section>

      {/* ================= CTA ================= */}
      <section className="py-32 text-center bg-gradient-to-r from-indigo-600 to-purple-600 text-white">

        <motion.h3
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl font-bold"
        >
          Start Building Your Future Today
        </motion.h3>

        <Link href="/dashboard">
          <button className="mt-10 bg-white text-indigo-600 px-10 py-4 rounded-xl font-semibold hover:bg-gray-100 transition shadow-lg">
            Get Started Free
          </button>
        </Link>

      </section>

    </div>
  )
}

const features = [
  {
    title: "Resume Analyzer",
    desc: "Machine learning powered resume scoring and skill gap analysis."
  },
  {
    title: "AI Interview Simulator",
    desc: "Real-time AI interview evaluation with feedback."
  },
  {
    title: "Career Roadmap",
    desc: "Personalized AI-generated career growth plans."
  },
  {
    title: "AI Career Q&A",
    desc: "Ask career questions and receive smart AI insights."
  },
]

function Stat({ number, label }: any) {
  return (
    <div>
      <h4 className="text-5xl font-bold text-indigo-600">{number}</h4>
      <p className="mt-3 text-gray-600">{label}</p>
    </div>
  )
}