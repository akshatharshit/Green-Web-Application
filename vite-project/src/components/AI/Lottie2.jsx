import React from 'react';
import Lottie from "lottie-react";
import treeAnimation from "../../assets/Animation - 1745701458708.json";


function Lottie2() {
  return (
    <div className="md:w-1/2 flex justify-center">
      <Lottie 
        animationData={treeAnimation} 
        loop={true} 
        className="w-full max-w-md"
      />
    </div>
  );
}

export default Lottie2;
