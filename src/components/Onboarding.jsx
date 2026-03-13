import { useState } from "react"

const slides = [

  {
    title: "Welcome to AI Study Assistant",
    desc: "An intelligent platform that helps students and professionals analyze documents using AI."
  },
  {
    title: "AI Notes Provider",
    desc: "Upload study material or notes and AI will generate summaries, key points, exam questions, and revision material."
  },
  {
    title: "Resume Analyzer",
    desc: "Upload your resume and AI will detect your skills, suggest suitable job roles, highlight weaknesses, and give improvement tips."
  },
  {
    title: "PDF Content Extractor",
    desc: "Upload any PDF document and quickly extract important information, concepts, and structured content."
  },
  {
    title: "Smart AI Learning",
    desc: "Ask questions about your uploaded documents and get clear explanations in simple and advanced levels."
  },
  {
    title: "Built for Productivity",
    desc: "Save time studying, preparing for interviews, and analyzing documents with powerful AI assistance."
  },
  {
    title: "Developer",
    desc: "Developed by Yasir Hamid Rather — AI enthusiast building tools to make learning easier."
  }
]

function Onboarding({ finish }) {

  const [step,setStep] = useState(0)

  const next = () => {

    if(step < slides.length-1){
      setStep(step+1)
    } else {
      finish()
    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center">

      <h1 className="text-4xl font-bold mb-4">
        {slides[step].title}
      </h1>

      <p className="text-gray-400 mb-8">
        {slides[step].desc}
      </p>

      <button
        onClick={next}
        className="bg-purple-600 px-6 py-3 rounded-lg"
      >
        {step === slides.length-1 ? "Start App" : "Next"}
      </button>

    </div>

  )

}

export default Onboarding