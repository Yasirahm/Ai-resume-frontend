import { useState } from "react"
import Onboarding from "./components/Onboarding"
import ChatBox from "./components/ChatBox"

function App(){

  const [showIntro,setShowIntro] = useState(true)

  if(showIntro){
    return <Onboarding finish={()=>setShowIntro(false)} />
  }

  return <ChatBox />

}

export default App