import React from 'react'

function Report({ data }: any) {
  // Extract dynamic ML data
  const overall = data?.overall_score ?? 0;
  const overallFeedback = data?.overall_feedback ?? "N/A";
  const summaryComment = data?.summary_comment ?? "";

const contact = data?.sections?.contact_info?.score ?? 0;
const experience = data?.sections?.experience?.score ?? 0;
const education = data?.sections?.education?.score ?? 0;
const skills = data?.sections?.skills?.score ?? 0;


  const contactComment = data?.sections?.contact_info?.comment ?? "";
  const experienceComment = data?.sections?.experience?.comment ?? "";
  const educationComment = data?.sections?.education?.comment ?? "";
  const skillsComment = data?.sections?.skills?.comment ?? "";

  const tips = data?.tips_for_improvement ?? [];
  const whatsGood = data?.whats_good ?? [];
  const needsImprovement = data?.needs_improvement ?? [];

  const getScoreColor = (score: number) => {
  if (score >= 80) return "text-green-500";
  if (score >= 60) return "text-yellow-500";
  return "text-red-500";
};

  const getCardGlow = (score: number) => {
  if (score >= 80) return "shadow-green-300 border-green-400";
  if (score >= 60) return "shadow-yellow-300 border-yellow-400";
  return "shadow-red-300 border-red-400";
};



  return (
    <div className="flex justify-between items-center ">
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-full">

          {/* OVERALL SCORE CARD */}
          <div className="bg-gradient-to-r from-[#BE575F] via-[#A338E3] to-[#AC7606] rounded-xl shadow-sm p-8 mb-6">
            <h3 className="text-white text-sm font-medium mb-4">Overall Score</h3>

            <div className="flex items-end gap-4 mb-2">
              <div className="text-5xl font-extrabold text-white">{overall}</div>
              <div className="text-2xl text-white mb-2">/100</div>

              <div className="mb-3 ml-auto">
                <span className="text-yellow-300 font-semibold">{overallFeedback}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full bg-gray-400 rounded-full h-3">
              <div
                className="bg-white h-3 rounded-full"
                style={{ width: `${overall}%` }}
              ></div>
            </div>

            <p className="text-gray-200 text-sm mt-3">
              {summaryComment}
            </p>
          </div>

          {/* SECTION SCORES */}
          <div className="grid grid-cols-2 gap-4 mb-6">

            {/* Contact Info */}
            <div className={`bg-white rounded-xl border shadow-md p-6 ${getCardGlow(contact)}`}>
              <h4 className="text-gray-600 text-sm font-medium mb-2">Contact Info</h4>
              <div className={`text-3xl font-bold ${getScoreColor(contact)} mb-2`}>{contact}%</div>
              <p className="text-gray-500 text-sm">{contactComment}</p>
            </div>

            {/* Experience */}
            <div className={`bg-white rounded-xl border shadow-md p-6 ${getCardGlow(experience)}`}>
              <h4 className="text-gray-600 text-sm font-medium mb-2">Experience</h4>
              <div className={`text-3xl font-bold ${getScoreColor(experience)} mb-2`}>{experience}%</div>
              <p className="text-gray-500 text-sm">{experienceComment}</p>
            </div>

            {/* Education */}
            <div className={`bg-white rounded-xl border shadow-md p-6 ${getCardGlow(education)}`}>
              <h4 className="text-gray-600 text-sm font-medium mb-2">Education</h4>
              <div className={`text-3xl font-bold ${getScoreColor(education)} mb-2`}>{education}%</div>
              <p className="text-gray-500 text-sm">{educationComment}</p>
            </div>

            {/* Skills */}
            <div className={`bg-white rounded-xl border shadow-md p-6 ${getCardGlow(skills)}`}>
              <h4 className="text-gray-600 text-sm font-medium mb-2">Skills</h4>
              <div className={`text-3xl font-bold ${getScoreColor(skills)} mb-2`}>{skills}%</div>
              <p className="text-gray-500 text-sm">{skillsComment}</p>
            </div>
          </div>

          {/* TIPS FOR IMPROVEMENT */}
          <div className="bg-white rounded-xl shadow-md  p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Tips for Improvement</h3>

            <div className="space-y-4">
              {tips.map((tip: string, i: number) => (
                <div key={i}>
                  <h4 className="font-medium text-gray-700 mb-1">{tip}</h4>
                </div>
              ))}
            </div>
          </div>

          {/* WHAT’S GOOD + NEEDS IMPROVEMENT SIDE BY SIDE */}
          <div className="grid grid-cols-2 gap-4 mt-6 mb-6">
 
          {/* WHAT’S GOOD SECTION */}
          <div className="bg-white rounded-xl shadow-md p-6">
           <h3 className="font-semibold text-gray-800 mb-4">What's Good</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
               {whatsGood.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
            </ul>
          </div>

          {/* NEEDS IMPROVEMENT SECTION */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Needs Improvement</h3>
            <ul className="list-disc pl-5 space-y-2 text-gray-700">
            {needsImprovement.map((item: string, i: number) => (
            <li key={i}>{item}</li>
          ))}
            </ul>
          </div>
         </div>

        </div>
      </div>
    </div>
  );
}

export default Report;
