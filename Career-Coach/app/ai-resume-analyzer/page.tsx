"use client";
import ResumeUploadDialog from "../(routes)/dashboard/_components/ResumeUploadDialog";
import React, { useState } from "react";
import Report from "./_components/Report";

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogFooter,
} from "@/components/ui/dialog";
import { File, Loader2Icon, Sparkles, FileText, Download, Share2, ZoomIn, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function AIResumeAnalyzer() {
  // Open the dialog automatically when the page loads so users see the upload UI
  const [open, setOpen] = useState(true);
  const [file, setFile] = useState<File | null>(null);
  const [pdfUrl, setPdfUrl] = useState<string | null>(null);
 
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

 const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  const f = e.target.files?.[0] ?? null;
  setFile(f);

  if (f) {
    const preview = URL.createObjectURL(f);  // ⚡ this creates the preview URL
    setPdfUrl(preview);
  }
};


  const onUpload = async () => {
    if (!file) return;

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const form = new FormData();
      form.append("file", file);

      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: form,
      });

      const text = await res.text();

      if (!res.ok) {
        setError(text);
      } else {
        try {
          const json = JSON.parse(text);
          setResult(json);
        } catch (e) {
          setError("Unexpected non-JSON response: " + text);
        }
      }

      if (res.ok) setOpen(false);
    } catch (err: any) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  };
  const onUploadAndAnalyze = async () => {
    if (!file) return;
    setLoading(true);
    setError(null);
    setResult(null);

    const recordId = crypto.randomUUID();
    const formData = new FormData();
    formData.append("recordId", recordId);
    // ml forwarder expects the field name 'file'
    formData.append("file", file, file.name);

    try {
      const res = await fetch("/api/upload-resume", {
        method: "POST",
        body: formData,
      });

      const text = await res.text();
      if (!res.ok) {
        setError(text);
      } else {
        try {
          const json = JSON.parse(text);
          setResult(json);
          setOpen(false);
        } catch (e) {
          setError("Unexpected non-JSON response: " + text);
        }
      }
    } catch (err: any) {
      console.error(err);
      setError(String(err));
    } finally {
      setLoading(false);
    }
  }


  return (
    
  <div className="p-8">

  {/* Heading + Re-analyze Button */}
  <div className="flex justify-between items-center">
    <h1 className="text-2xl font-bold">Resume Analyzer</h1>

    {result && (
      <button
        onClick={() => setOpen(true)}
        className="
          px-4 py-2 
          bg-black text-white
          rounded-lg
          shadow-sm
          hover:bg-gray-900
          flex items-center gap-2
          transition
        "
      >
        Re-analyze
        <Sparkles className="w-4 h-4" />
      </button>
    )}
  </div>

  {/* Subtext */}
  <p className="mt-2 text-muted-foreground">
    Upload your resume (PDF) and get suggestions to improve it.
  </p>


      {/* UPLOAD BUTTON + DIALOG */}
       <Dialog open={open} onOpenChange={setOpen}>
          {/* <DialogTrigger>Open</DialogTrigger> */}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Upload resume pdf file</DialogTitle>
              <DialogDescription>
                <label htmlFor="resumeUpload" className='flex items-center flex-col justify-center p-7 border-dashed rounded-xl hover:bg-slate-100 cursor-pointer'>
                  <File className='h-10 w-10' />
                  {file?
                  <h2 className='mt-3 text-blue-600'>{file?.name}</h2>:
                   <h2 className='mt-3'>Click here to upload PDF file</h2>}
                </label>
                <div>
                  <input type="file" id="resumeUpload" accept="application/pdf" className='hidden ' onChange={onChange} />
                </div>
              </DialogDescription>
            </DialogHeader>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant={"outline"}>Cancel</Button>
                </DialogClose>

                <Button disabled={!file || loading} onClick={onUploadAndAnalyze}>
                  {loading?<Loader2Icon className="animate-spin"/> : <Sparkles />} Upload & Analyze
                </Button>
              </DialogFooter>
         </DialogContent>
       </Dialog> 
      
                    
     
      {/* RESULT AREA */}
      <div className="grid lg:grid-cols-5 grid-cols-1 ml-20 gap-8 mt-8">
          <div className="col-span-2" >
             <Report data={result} />
          </div>
          <div className="col-span-3">
            <h2 className="font-bold text-2xl mb-5">Resume Preview</h2>
              <iframe src={`${pdfUrl}#toolbar=0&navpanes=0&scrollbar=0`}
               width={'90%'} height={900}
               className="min-w-lg"
                style={{
                border: 'none'
               }}></iframe>
          </div>
      </div>
      
      

      
    </div>
  );
}
