import React from "react";

function Promos() {
  return (
    <div className="flex flex-col items-center flex-[0.3] p-5 space-y-5">
      <div className="border border-gray-600 px-2 py-5 w-full ">
        <h1 className="text-xl my-1">Yield earned</h1>
        <p className="text-sm my-1">Earn up to 2.84% APY on your crypto</p>
        <div className="flex items-center justify-between w-full my-4">
          <h2 className="text-lg font-bold">$0.000066</h2>
          <h2 className="font-bold text-gray-500">2.84% APY</h2>
        </div>
      </div>
      <div className="border border-gray-600 px-2 py-5 w-full ">
        <h1 className="text-xl my-1">Learn adn Earn</h1>
        <p className="text-sm my-1">Earn up to 2.84% APY on your crypto</p>
        <div className="flex items-center justify-between w-full my-4">
          <h1 className="text-center text-blue-400 font-semibold">
            Verify Identity
          </h1>
        </div>
      </div>
    </div>
  );
}

export default Promos;
