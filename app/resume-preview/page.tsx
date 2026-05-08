"use client";

import jsPDF from "jspdf";

type ResumeData = {
  name: string;
  email: string;
  skills: string;
  education: string;
  experience: string;
};

export default function ResumePreviewPage() {
  const data: ResumeData = JSON.parse(
    localStorage.getItem("resumeData") || "{}"
  );

  const downloadPDF = () => {
    const doc = new jsPDF();

    doc.text(`Name: ${data.name}`, 10, 10);
    doc.text(`Email: ${data.email}`, 10, 20);
    doc.text(`Skills: ${data.skills}`, 10, 30);
    doc.text(`Education: ${data.education}`, 10, 40);
    doc.text(`Experience: ${data.experience}`, 10, 50);

    doc.save("resume.pdf");
  };

  return (
    <div style={{ padding: "30px", maxWidth: "800px", margin: "auto" }}>
      <h1>{data.name}</h1>
      <p>{data.email}</p>

      <h3>Skills</h3>
      <p>{data.skills}</p>

      <h3>Education</h3>
      <p>{data.education}</p>

      <h3>Experience</h3>
      <p>{data.experience}</p>

      <button onClick={downloadPDF}>
        Download PDF
      </button>
    </div>
  );
}