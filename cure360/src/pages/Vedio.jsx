import React from 'react'

function Vedio() {
  return (
    <div className="w-full h-screen">
      <iframe
        src="https://whimsical-melomakarona-512245.netlify.app/"
        title="Embedded Video"
        className="w-[90%] h-[80%] border-2 rounded-lg shadow-lg"
        allowFullScreen
      ></iframe>
    </div>
  )
}

export default Vedio
