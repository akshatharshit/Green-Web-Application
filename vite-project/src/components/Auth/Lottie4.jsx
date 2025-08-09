import React from 'react';
import Lottie from "lottie-react";
import treeAnimation from "../../assets/Animation - 1746837510837.json"; // rename your JSON file if needed

function Lottie4() {
  return (
    <div className="md:w-2/3 flex justify-center">
      <Lottie 
        animationData={treeAnimation} 
        loop={true} 
        className="w-full max-w-md"
      />
    </div>
  );
}

export default Lottie4;
