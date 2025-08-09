import React from 'react';
import Lottie from "lottie-react";
import treeAnimation from '../../assets/Animation - 1746880846466.json'

function Lottie5() {
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

export default Lottie5;
