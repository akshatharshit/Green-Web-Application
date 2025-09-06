import React from 'react'
import natureVideo from '../assets/nature.mp4'

function Banner() {
  return (
    <>
      <div className="relative mb-16 shadow-md mt-5 bg-gradient-to-r from-green-200 via-green-100 to-green-200">

        <div className="mx-auto px-8 py-12 flex flex-col gap-6 md:flex-row items-center justify-evenly">
          {/* Left Text Section */}
          <div className="mb-8 md:mb-0 text-center md:text-left">
            <h1 className="text-3xl md:text-5xl font-bold text-green-800 mb-4">
              Empower Farmers, Nurture the Land
            </h1>
            <p className="text-lg md:text-xl text-gray-700 mb-3">
              Together, let’s strengthen agriculture, support farmers, and grow a sustainable future.
            </p>
            <p className="text-2xl md:text-4xl text-green-600 font-bold">
              Sow Today. Harvest Tomorrow.
            </p>
          </div>


          {/* Right Video Section */}
          <div className="w-1/3 relative aspect-video">
            <video
              src={natureVideo}
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-64 object-cover rounded-xl shadow-lg"
            />
          </div>

        </div>
      </div>
    </>
  )
}

export default Banner
