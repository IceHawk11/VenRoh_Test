import { Frown } from 'lucide-react'
import React from 'react'

const Failure = () => {
  return (
        <div className="flex items-center justify-center h-[80vh]">
          <div className="bg-[#FBF5E2] rounded-lg shadow p-10 border-black border-2 flex flex-col items-center justify-center text-center">
            <h1 className="mb-2 text-red-500 text-2xl">Payment Failed</h1>
            <span><Frown className="text-red-500 w-10 h-10" /></span>
          </div>
        </div>
  )
}

export default Failure
