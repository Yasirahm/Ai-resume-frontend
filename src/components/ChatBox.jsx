import React,{useState} from "react"
import axios from "axios"
import FileUpload from "./FileUpload"
import Loader from "./Loader"
import Footer from "./Footer"

function ChatBox(){

  const [file,setFile] = useState(null)
  const [result,setResult] = useState("")
  const [loading,setLoading] = useState(false)

  const analyzeResume = async ()=>{

    if(!file){
      alert("Upload resume first")
      return
    }

    const formData = new FormData()
    formData.append("file",file)

    try{

      setLoading(true)

      const res = await axios.post(
        "https://kashbit.in/api/ai/analyze",
        formData
      )

      const clean = res.data.reply.replace(/\*/g,"")

      setResult(clean)

    }catch(err){

      console.log(err)
      alert("Analysis failed")

    }finally{
      setLoading(false)
    }

  }

  // -------- PARSE AI RESPONSE --------

  const getSections = (text)=>{

    if(!text) return {}

    const sections={
      skills:"",
      details:"",
      jobs:"",
      weakness:"",
      improve:"",
      missing:"",
      score:""
    }

    const lines = text.split("\n")

    let current=""

    lines.forEach(line=>{

      const lower = line.toLowerCase()

      if(lower.includes("detected skills")) current="skills"
      else if(lower.includes("key details")) current="details"
      else if(lower.includes("suggested job")) current="jobs"
      else if(lower.includes("resume weakness")) current="weakness"
      else if(lower.includes("improvement")) current="improve"
      else if(lower.includes("missing skills")) current="missing"
      else if(lower.includes("ats score")) current="score"

      if(current){
        sections[current]+=line+"\n"
      }

    })

    return sections

  }

  const sections = getSections(result)

  // -------- CARD COMPONENT --------

  const Card = ({title,content,color,emoji})=>{

    if(!content) return null

    return(

      <div className="bg-slate-800 border border-slate-700 p-6 rounded-xl shadow-lg hover:scale-[1.02] transition">

        <h2 className={`text-xl font-bold mb-3 ${color}`}>
          {emoji} {title}
        </h2>

        <p className="text-gray-200 whitespace-pre-wrap">
          {content}
        </p>

      </div>

    )

  }

 return (

<div className="min-h-screen bg-slate-950 text-white">

{/* HERO */}

<div className="text-center pt-24 pb-10 px-6">

<h1 className="text-4xl font-bold mb-4">
AI Resume Analyzer
</h1>

<p className="text-gray-400 max-w-xl mx-auto">
Upload your resume and instantly discover your skills,
career opportunities and improvements using AI.
</p>

</div>

{/* UPLOAD CARD */}

<div className="flex justify-center px-4">

<div className="bg-slate-900 border border-slate-800 p-10 rounded-2xl shadow-xl w-full max-w-md text-center">

<FileUpload setFile={setFile} />

<button
onClick={analyzeResume}
className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg text-white transition mt-6 w-full"
>
Analyze Resume
</button>

</div>

</div>

{/* LOADER */}

{loading && (
<div className="flex justify-center mt-10">
<Loader />
</div>
)}

{/* RESULT */}

{!loading && result && (

<div className="mt-16 px-6">

<h2 className="text-2xl font-semibold text-center mb-10">
AI Resume Analysis
</h2>

<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">

<Card title="Detected Skills" content={sections.skills} />
<Card title="Key Details" content={sections.details} />
<Card title="Suggested Jobs" content={sections.jobs} />
<Card title="Resume Weaknesses" content={sections.weakness} />
<Card title="Improvement Suggestions" content={sections.improve} />
<Card title="Missing Skills" content={sections.missing} />
<Card title="ATS Score" content={sections.score} />

</div>

</div>

)}

{/* FEATURES */}

<div className="mt-24 px-6">

<h2 className="text-2xl text-center mb-10 font-semibold">
Why Use AI Resume Analyzer
</h2>

<div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">

<div className="bg-slate-900 p-6 rounded-xl">
<h3 className="font-semibold mb-2">Skill Detection</h3>
<p className="text-gray-400 text-sm">
AI automatically detects technical and professional skills from your resume.
</p>
</div>

<div className="bg-slate-900 p-6 rounded-xl">
<h3 className="font-semibold mb-2">Job Suggestions</h3>
<p className="text-gray-400 text-sm">
Discover job roles that match your experience and skills.
</p>
</div>

<div className="bg-slate-900 p-6 rounded-xl">
<h3 className="font-semibold mb-2">Resume Improvement</h3>
<p className="text-gray-400 text-sm">
Get AI recommendations to improve your resume and increase your ATS score.
</p>
</div>

</div>

</div>

<Footer />

</div>

)

}

export default ChatBox