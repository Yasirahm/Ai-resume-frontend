import React,{useState} from "react"
import axios from "axios"
import FileUpload from "./FileUpload"
import Loader from "./Loader"

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
        "https://ai-resume-rdva.onrender.com/api/ai/analyze",
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

  return(

    <div className="flex flex-col items-center gap-6 w-full">

      <FileUpload setFile={setFile} />

      <button
        onClick={analyzeResume}
        className="bg-purple-600 hover:bg-purple-500 px-6 py-3 rounded-lg text-white transition"
      >
        Analyze Resume
      </button>

      {loading && <Loader />}

      {!loading && result && (

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-5xl mt-8">

          <Card
            title="Detected Skills"
            content={sections.skills}
            color="text-green-400"
            emoji="🧠"
          />

          <Card
            title="Key Details"
            content={sections.details}
            color="text-blue-400"
            emoji="📄"
          />

          <Card
            title="Suggested Jobs"
            content={sections.jobs}
            color="text-purple-400"
            emoji="💼"
          />

          <Card
            title="Resume Weaknesses"
            content={sections.weakness}
            color="text-red-400"
            emoji="⚠️"
          />

          <Card
            title="Improvement Suggestions"
            content={sections.improve}
            color="text-yellow-400"
            emoji="🚀"
          />

          <Card
            title="Missing Skills"
            content={sections.missing}
            color="text-pink-400"
            emoji="📚"
          />

          <Card
            title="ATS Score"
            content={sections.score}
            color="text-emerald-400"
            emoji="⭐"
          />

        </div>

      )}

    </div>

  )

}

export default ChatBox