import React from "react"

function Footer(){

  return(

    <footer className="w-full bg-slate-900 border-t border-slate-800 mt-20">

      <div className="max-w-6xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8 text-gray-400">

        {/* App Info */}

        <div>

          <h2 className="text-white text-lg font-semibold mb-3">
            AI Resume Analyzer
          </h2>

          <p className="text-sm">
            An AI powered platform that analyzes resumes,
            extracts skills, suggests job roles, and helps
            improve your professional profile.
          </p>

        </div>


        {/* Features */}

        <div>

          <h2 className="text-white text-lg font-semibold mb-3">
            Features
          </h2>

          <ul className="space-y-2 text-sm">

            <li>AI Resume Analysis</li>
            <li>Skill Detection</li>
            <li>Job Role Suggestions</li>
            <li>ATS Resume Score</li>
            <li>Resume Improvement Tips</li>

          </ul>

        </div>


        {/* Developer */}

        <div>

          <h2 className="text-white text-lg font-semibold mb-3">
            Developer
          </h2>

          <p className="text-sm mb-2">
            Built by <span className="text-purple-400"><a href="https://yasirhamid.netlify.app/" target="_blank" rel="noopener noreferrer">
              Yasir Hamid Rather
            </a></span>
          </p>


        </div>

      </div>


      {/* Bottom */}

      <div className="border-t border-slate-800 text-center py-4 text-gray-500 text-sm">

        © {new Date().getFullYear()} AI Resume Analyzer. All rights reserved.

      </div>

    </footer>

  )

}

export default Footer