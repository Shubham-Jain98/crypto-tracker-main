import React from "react";
import SingleTrending from "./SingleTrending";

const Banner = () => {
  return (
    <div className="h-96">
      <div className="text-white text-6xl font-bold flex justify-center pt-4 tracking-widest">
        CRYPTO WATCH
      </div>
      <div className="text-white flex justify-center mt-4 text-lg">
        Stay Ahead, Watch Crypto Unfold
      </div>
      <SingleTrending />
    </div>
  );
};

export default Banner;
