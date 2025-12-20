"use client"


import { useState, useMemo } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import ResumeUploadDialog from './ResumeUploadDialog'
import RoadmapGeneratorDialog from './RoadmapGeneratorDialog'

import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs'

interface TOOL{
  name: string
  desct: string
  icon: string
  button: string
  path: string
}

type AIToolCardProps = {
  tool: TOOL
}

function AiToolCard({ tool }: AIToolCardProps) {
  const id = useMemo(() => (typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : String(Date.now())), []);
  const {user} = useUser();
  const router = useRouter();
  const [openResumeUpload, setOpenResumeUpload] = useState(false);
  const [openRoadmapDialog, setOpenRoadmapDialog] = useState(false);
  const onClickButton = async () => {

      if(tool.name =="Resume Analyzer"){
        setOpenResumeUpload(true);
      return ;
    }

    if(tool.path =="career-roadmap-generator"){
      setOpenRoadmapDialog(true);
      return;
    }
    //Create new record to history table
    const result = await fetch('/api/history/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        recordId: id,
        content: []
      })
    });
    console.log(result);
    router.push(tool.path + "/" + id);
  }
  return (
    <div className="p-2 border rounded-lg">
        <Image src={tool.icon} alt={tool.name} width={40} height={40} />
        
          <h2 className="font-bold mt-2">{tool.name}</h2>
          <p className="text-gray-400">{tool.desct}</p>
          <Link href={tool.path}>
            <Button className="w-full mt-3">{tool.button}</Button>
          </Link>

          < ResumeUploadDialog openResumeUpload={openResumeUpload} setOpenResumeUpload={setOpenResumeUpload} />
          
      </div>
      
  )
}

export default AiToolCard
