import React from 'react';
import Lottie from "lottie-react";
import treeAnimation from "../../assets/Animation - 1746836490221.json"; // rename your JSON file if needed

function Lottie3() {
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

export default Lottie3;
