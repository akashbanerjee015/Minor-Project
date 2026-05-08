"use client"

import { useState } from "react"
import axios from "axios"
import MDEditor from "@uiw/react-md-editor"
import ReactMarkdown from "react-markdown"
import { Download, Save, FileText } from "lucide-react"
import jsPDF from "jspdf"
import html2canvas from "html2canvas"
import { Document, Packer, Paragraph, TextRun } from "docx"

export default function ResumeBuilderPage() {
  const downloadPDF = async () => {
    const input = document.getElementById("resume-preview")

    if (!input) return

    const canvas = await html2canvas(input, {
      scale: 2,
    })

    const imgData = canvas.toDataURL("image/png")

    const pdf = new jsPDF("p", "mm", "a4")

    const pdfWidth = pdf.internal.pageSize.getWidth()
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight)
    pdf.save("Akash_Banerjee_Resume.pdf")
  }

  const downloadWord = async () => {
    const doc = new Document({
      sections: [
        {
          properties: {},
          children: markdown
            .split("\n")
            .map(
              (line) =>
                new Paragraph({
                  children: [
                    new TextRun({
                      text: line,
                    }),
                  ],
                })
            ),
        },
      ],
    })

    const blob = await Packer.toBlob(doc)

    const url = window.URL.createObjectURL(blob)

    const a = document.createElement("a")
    a.href = url
    a.download = "Akash_Banerjee_Resume.docx"
    a.click()
  }
  const [markdown, setMarkdown] = useState(`# AKASH BANERJEE
Software Engineer | Full Stack Developer

📧 akashbanerjee7478@gmail.com  
📱 +91 9564798461  
🌐 github.com/akashbanerjee015  
💼 linkedin.com/in/akash-banerjee-46b50624a  

---

## PROFESSIONAL SUMMARY
Motivated and detail-oriented Software Engineer and Full Stack Developer with expertise in modern web technologies, scalable SaaS architecture, AI integration, and full-stack application development. Experienced in building responsive, ATS-friendly applications using Next.js, React.js, FastAPI, PostgreSQL, and modern DevOps workflows.

---

## TECHNICAL SKILLS

### Frontend Development
React.js, Next.js, TypeScript, Tailwind CSS, Redux, HTML5, CSS3

### Backend Development
Node.js, Express.js, FastAPI, Next.js API Routes, REST APIs

### Database
PostgreSQL, MongoDB, SQL

### AI/ML
Machine Learning, NLP, LangChain, Sentence Transformers, XGBoost, LLM APIs

### DevOps & Tools
Docker, Git, GitHub, Vercel, Render, Hugging Face

---

## PROFESSIONAL EXPERIENCE

### Full Stack Developer Intern — WebDesert Technologies
📅 Jan 2025 – Jun 2025

- Developed and maintained scalable MERN stack web applications.
- Optimized frontend rendering performance by improving React component structure.
- Integrated secure authentication systems and REST APIs.
- Improved UI responsiveness and performance.

### Full Stack Developer Intern — Univolve Consulting
📅 Jul 2025 – Aug 2025

- Built API-driven GitHub repository analytics platform.
- Automated repository tracking and performance analysis.
- Reduced manual project monitoring effort.

---

## PROJECTS

### Smart AI Career Coach Platform
📅 Oct 2025 – Dec 2025

- Engineered AI-powered full-stack career platform with intelligent resume analysis.
- Developed scalable frontend using Next.js and TypeScript.
- Integrated AI/ML models using FastAPI and Hugging Face deployment.
- Added ATS-friendly resume generation and markdown support.

**Tech Stack:**
Next.js, TypeScript, PostgreSQL, FastAPI, Docker, NLP, LLM APIs

---

### Video Calling Web Application
📅 Jan 2025 – Apr 2025

- Built real-time peer-to-peer video calling platform.
- Integrated WebRTC and Socket.io for low-latency communication.
- Implemented real-time messaging and signaling systems.

---

### Stock Market Web Application
📅 Nov 2024 – Dec 2024

- Developed real-time stock trading dashboard connected to live APIs.
- Built responsive portfolio tracking interface.
- Integrated third-party stock market APIs.

---

## EDUCATION

### Adamas University
Bachelor of Technology in Computer Science Engineering
📅 Aug 2022 – Jun 2026

---

## ACHIEVEMENTS

- Built multiple production-ready SaaS applications.
- Developed AI-integrated full-stack systems.
- Experienced in ATS resume optimization.
- Strong problem-solving and debugging skills.
`)

  const [loading, setLoading] = useState(false)

  const saveResume = async () => {
    try {
      setLoading(true)

      await axios.post("/api/resume/create", {
        markdown,
      })

      alert("Resume Saved Successfully")
    } catch (error) {
      console.log(error)
      alert("Failed to save resume")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white p-6 lg:p-10">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-5xl lg:text-7xl font-bold tracking-tight">
            Resume Builder
          </h1>

          <p className="text-zinc-400 mt-3 text-lg">
            Build ATS-friendly resumes with live markdown editing.
          </p>
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={saveResume}
            className="flex items-center gap-2 bg-red-700 hover:bg-red-800 transition-all px-6 py-3 rounded-2xl font-medium"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Resume"}
          </button>

          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 bg-white text-black hover:bg-zinc-200 transition-all px-6 py-3 rounded-2xl font-medium"
          >
            <Download size={18} />
            Download PDF
          </button>

          <button
            onClick={downloadWord}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 transition-all px-6 py-3 rounded-2xl font-medium"
          >
            <FileText size={18} />
            Download Word
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
        {/* Markdown Editor */}
        <div className="rounded-3xl border border-zinc-800 bg-zinc-950 overflow-hidden shadow-2xl">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-5">
            <div>
              <h2 className="text-2xl font-semibold">
                Markdown Resume Editor
              </h2>

              <p className="text-zinc-400 mt-1 text-sm">
                Write and edit your ATS-friendly resume.
              </p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2 text-sm text-zinc-300">
              ATS Optimized
            </div>
          </div>

          <div data-color-mode="dark">
            <MDEditor
              value={markdown}
              onChange={(value) => setMarkdown(value || "")}
              height={950}
              preview="edit"
            />
          </div>
        </div>

        {/* Resume Preview */}
        <div className="sticky top-6 h-screen overflow-y-auto flex justify-center items-start pb-20">
          <div className="bg-zinc-300 p-6 rounded-3xl shadow-2xl w-full max-w-[850px]">
            <div className="border-b bg-white px-6 py-4 flex items-center justify-between rounded-t-2xl">
              <h2 className="font-semibold text-lg">
                Live Resume Preview
              </h2>

              <div className="text-sm text-zinc-600">
                A4 ATS Format
              </div>
            </div>

            <div
              id="resume-preview"
              className="w-full max-w-[760px] min-h-[1080px] mx-auto bg-white text-black px-[30px] py-[28px] rounded-none overflow-visible shadow-none"
            >
              <div className="w-full h-full font-serif leading-[1.35] resume-preview text-[10px] overflow-visible">
                

                <ReactMarkdown
                  components={{
                    h1: ({ children }) => (
                      <div className="text-center border-b pb-2 mb-3">
                        <h1 className="text-[24px] font-bold tracking-wide uppercase text-center leading-tight">
                          {children}
                        </h1>
                      </div>
                    ),

                    h2: ({ children }) => (
                      <h2 className="text-[13px] font-bold uppercase border-b border-black pb-1 mt-4 mb-2 tracking-wide">
                        {children}
                      </h2>
                    ),

                    h3: ({ children }) => (
                      <h3 className="text-[11px] font-bold flex items-center justify-between mt-2 mb-1">
                        {children}
                      </h3>
                    ),

                    p: ({ children }) => (
                      <p className="text-[10px] leading-[1.35] text-black mb-[2px]">
                        {children}
                      </p>
                    ),

                    ul: ({ children }) => (
                      <ul className="list-disc pl-3 space-y-[1px] mb-1 text-[10px]">
                        {children}
                      </ul>
                    ),

                    li: ({ children }) => (
                      <li className="leading-[1.3] text-black text-[10px]">
                        {children}
                      </li>
                    ),

                    strong: ({ children }) => (
                      <strong className="font-bold text-black">
                        {children}
                      </strong>
                    ),

                    hr: () => (
                      <div className="border-t border-black my-1" />
                    ),
                  }}
                >
                  {markdown}
                </ReactMarkdown>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}