"use client";

import { useState } from "react";
import jsPDF from "jspdf";
import { Document, Packer, Paragraph, TextRun } from "docx";
import { saveAs } from "file-saver";

export default function CoverLetterPage() {
  const [form, setForm] = useState({
    name: "",
    jobRole: "",
    company: "",
    experience: "",
    skills: "",
  });

  const [loading, setLoading] = useState(false);
  const [coverLetter, setCoverLetter] = useState("");

  // Generate cover letter
  const generateCoverLetter = async () => {
    setLoading(true);

    try {
      const res = await fetch("/api/cover-letter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      setCoverLetter(data.coverLetter || "");
    } catch (error) {
      console.error(error);
      alert("Failed to generate cover letter");
    }

    setLoading(false);
  };

  // Download TXT
  const downloadTXT = () => {
    const blob = new Blob([coverLetter], {
      type: "text/plain",
    });

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = `${form.name || "cover-letter"}.txt`;
    a.click();

    URL.revokeObjectURL(url);
  };

  // Download PDF
  const downloadPDF = () => {
    const pdf = new jsPDF({
      unit: "pt",
      format: "a4",
    });

    const margin = 40;

    const pageWidth =
      pdf.internal.pageSize.getWidth() - margin * 2;

    pdf.setFont("Times", "Normal");

    pdf.setFontSize(12);

    pdf.text(coverLetter, margin, 60, {
      maxWidth: pageWidth,
      lineHeightFactor: 1.5,
    });

    pdf.save(`${form.name || "cover-letter"}.pdf`);
  };

  // Download Word (.docx)
  const downloadWord = async () => {
    const paragraphs = coverLetter.split("\n").map(
      (line) =>
        new Paragraph({
          children: [
            new TextRun({
              text: line,
              size: 24,
              font: "Times New Roman",
            }),
          ],
          spacing: {
            after: 200,
          },
        })
    );

    const doc = new Document({
      sections: [
        {
          children: paragraphs,
        },
      ],
    });

    const blob = await Packer.toBlob(doc);

    saveAs(
      blob,
      `${form.name || "cover-letter"}.docx`
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-8">

      {/* Title */}
      <h1 className="text-2xl font-bold mb-6">
        Cover Letter Generator
      </h1>

      {/* Form */}
      <div className="grid gap-4 mb-6">

        <input
          className="border p-2"
          placeholder="Your Name"
          onChange={(e) =>
            setForm({
              ...form,
              name: e.target.value,
            })
          }
        />

        <input
          className="border p-2"
          placeholder="Job Role"
          onChange={(e) =>
            setForm({
              ...form,
              jobRole: e.target.value,
            })
          }
        />

        <input
          className="border p-2"
          placeholder="Company Name"
          onChange={(e) =>
            setForm({
              ...form,
              company: e.target.value,
            })
          }
        />

        <textarea
          className="border p-2"
          rows={3}
          placeholder="Experience Summary"
          onChange={(e) =>
            setForm({
              ...form,
              experience: e.target.value,
            })
          }
        />

        <textarea
          className="border p-2"
          rows={2}
          placeholder="Skills (comma separated)"
          onChange={(e) =>
            setForm({
              ...form,
              skills: e.target.value,
            })
          }
        />

      </div>

      {/* Generate Button */}
      <button
        onClick={generateCoverLetter}
        className="bg-black text-white px-6 py-2 rounded mb-6"
      >
        {loading
          ? "Generating..."
          : "Generate Cover Letter"}
      </button>

      {/* Result */}
      {coverLetter && (
        <div>

          <h2 className="text-lg font-semibold mb-2">
            Edit Your Cover Letter
          </h2>

          <textarea
            className="border w-full p-4 min-h-[300px]"
            value={coverLetter}
            onChange={(e) =>
              setCoverLetter(e.target.value)
            }
          />

          {/* Download Buttons */}
          <div className="flex gap-4 mt-4">

            <button
              onClick={downloadPDF}
              className="bg-purple-600 text-white px-4 py-2 rounded"
            >
              Download PDF
            </button>

            <button
              onClick={downloadWord}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Download Word
            </button>

            <button
              onClick={downloadTXT}
              className="bg-gray-600 text-white px-4 py-2 rounded"
            >
              Download TXT
            </button>

          </div>

        </div>
      )}

    </div>
  );
}
