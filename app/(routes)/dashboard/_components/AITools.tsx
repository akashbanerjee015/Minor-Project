import React from 'react'
import AIToolCard from './AIToolCard'

const aiToolsList = [
  {
    name: 'AI Career Q&A Chat',
    desct: 'Chat With AI Agent',
    icon: '/chatbot.png',
    button: 'Lets Chat',
    path: '/ai-tools/ai-chat',
  },
  {
    name: 'Resume Analyzer',
    desct: 'Improve Your Resume',
    icon: '/resume.png',
    button: 'Generate Now',
    path: '/ai-resume-analyzer',
  },
  {
    name: 'Career Roadmap Generator',
    desct: 'Build your roadmap',
    icon: '/roadmap.png',
    button: 'Generate Now',
    path: '/career-roadmap-generator',
  },
  {
    name: 'Cover Letter Generator',
    desct: 'Write Cover Letter',
    icon: '/cover.png',
    button: 'Create Now',
    path: '/cover-letter-generator',
  },
  {
    name: 'Interview Simulator',
    desct: 'Practice Real Interview',
    icon: '/interview1.png',
    button: 'Start Interview',
    path: '/ai-interview',
  },
  {
    name: 'Resume Builder',
    desct: 'Create ATS Resume',
    icon: '/resumelogo1.jpeg',
    button: 'Build Now',
    path: '/resume-builder',
  },
  {
    name: 'Skill Gap Analyzer',
    desct: 'Find Missing Skills',
    icon: '/skillgap.png',
    button: 'Analyze',
    path: '/skill-gap',
  },
  {
    name: 'Quiz Flow',
    desct: 'Test your knowledge',
    icon: '/Mcq.png',
    button: 'Start',
    path: '/quiz-flow',
  },
]
function AiTools() {
  return (
    <div className='mt-7 p-5 bg-white border rounded-xl'> 
      <h2 className='font-bold text-2xl mb-5'>AI Tools</h2>
      <p>Start Building and shape your Career with this exclusive AI Tools</p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 mt-4'>
        {
            aiToolsList.map((tool, index)=>(
                <AIToolCard tool={tool} key={index}/>
            ))}
      </div>
    </div>
  )
}

export default AiTools
