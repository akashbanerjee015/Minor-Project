import React from 'react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { File } from 'lucide-react'

function ResumeUploadDialog({ openResumeUpload, setOpenResumeUpload }: any) {
  return (
       <Dialog open={openResumeUpload} onOpenChange={setOpenResumeUpload}>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload resume pdf file</DialogTitle>
              <DialogDescription>
                <label htmlFor="resumeUpload" className='flex items-center flex-col justify-center p-7 border-dashed '>
                  <File className='h-10 w-10' />
                   <h2 className='mt-3'>Click here to upload PDF file</h2>
                </label>
                <div>
                  <input type="file" id="resumeUpload" accept="application/pdf" />
                </div>
              </DialogDescription>
            </DialogHeader>
         </DialogContent>
       </Dialog> 
  )
}

export default ResumeUploadDialog
