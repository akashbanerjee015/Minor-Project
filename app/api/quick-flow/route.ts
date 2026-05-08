import { NextResponse } from "next/server"

export async function GET() {

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
        "React is a JavaScript library for building UI.",
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
        "useState manages component state.",
    },

    {
      question:
        "Which hook handles side effects?",

      options: [
        "useRef",
        "useState",
        "useEffect",
        "useMemo",
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
        "Runtime Environment",
        "Library",
        "Database",
        "Framework",
      ],

      correctAnswer:
        "Runtime Environment",

      explanation:
        "Node.js is a JavaScript runtime.",
    },

    {
      question:
        "What does SQL stand for?",

      options: [
        "Structured Query Language",
        "Server Query Language",
        "Simple Query Language",
        "System Query Language",
      ],

      correctAnswer:
        "Structured Query Language",

      explanation:
        "SQL stands for Structured Query Language.",
    },

    {
      question:
        "Which company created React?",

      options: [
        "Google",
        "Microsoft",
        "Facebook",
        "Amazon",
      ],

      correctAnswer:
        "Facebook",

      explanation:
        "React was created by Facebook.",
    },

    {
      question:
        "What is Tailwind CSS?",

      options: [
        "Database",
        "Framework",
        "CSS Utility Framework",
        "API",
      ],

      correctAnswer:
        "CSS Utility Framework",

      explanation:
        "Tailwind is a utility-first CSS framework.",
    },

    {
      question:
        "Which method fetches APIs?",

      options: [
        "map()",
        "push()",
        "fetch()",
        "filter()",
      ],

      correctAnswer:
        "fetch()",

      explanation:
        "fetch() performs HTTP requests.",
    },

    {
      question:
        "What is MongoDB?",

      options: [
        "Library",
        "Database",
        "Compiler",
        "Language",
      ],

      correctAnswer:
        "Database",

      explanation:
        "MongoDB is a NoSQL database.",
    },

    {
      question:
        "Which language works with React?",

      options: [
        "Python",
        "JavaScript",
        "Java",
        "C++",
      ],

      correctAnswer:
        "JavaScript",

      explanation:
        "React primarily uses JavaScript.",
    },
  ]

  return NextResponse.json({
    questions,
  })
}