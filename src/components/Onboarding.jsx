import { useState } from "react"

const slides = [

  {
    title: "Welcome to AI Study Assistant",
    desc: "An intelligent platform that helps students and professionals analyze documents using AI. Upload files and let AI organize knowledge for you."
  },

  {
    title: "Powerful AI Tools",
    desc: "This app provides three smart features: AI Notes Generator, Resume Analyzer, and PDF Content Extractor. Instantly get summaries, skills detection, job suggestions, and structured information."
  },

  {
    title: "Built for Productivity",
    desc: "Save time studying, preparing for interviews, and understanding documents with powerful AI assistance. Developed by Yasir Hamid Rather."
  }

]

function Onboarding({ finish }) {

  const [step,setStep] = useState(0)

  const next = () => {

    if(step < slides.length - 1){
      setStep(step + 1)
    } else {
      finish()
    }

  }

  return (

    <div className="min-h-screen bg-slate-950 text-white flex flex-col items-center justify-center px-6 text-center">

      {/* Title */}

      <h1 className="text-3xl md:text-4xl font-bold mb-6">
        {slides[step].title}
      </h1>

      {/* Description */}

      <p className="text-gray-400 max-w-md mb-10 leading-relaxed">
        {slides[step].desc}
      </p>

      {/* Button */}

      <button
        onClick={next}
        className="bg-purple-600 hover:bg-purple-500 px-8 py-3 rounded-lg transition"
      >
        {step === slides.length - 1 ? "Start App" : "Next"}
      </button>

      {/* Indicator */}

      <div className="flex gap-2 mt-8">

        {slides.map((_,index)=>(
          <div
            key={index}
            className={`h-2 w-2 rounded-full ${
              step === index ? "bg-purple-500" : "bg-gray-600"
            }`}
          />
        ))}

      </div>

    </div>

  )

}

export default Onboarding