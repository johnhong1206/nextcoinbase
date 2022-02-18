import React from "react";
import CoinsItem from "./CoinsItem";

function Coins({
  selectedToken,
  walletAddress,
  thirdWebtokens,
  setActionSend,
  sanitytokens,
  setSelectedToken,
}) {
  return (
    <div className="flex flex-col h-full flex-1">
      <h2 className="text-white text-center font-semibold text-2xl uppercase">
        Select Asset
      </h2>
      <div className="my-5 cursor-pointer">
        {sanitytokens.map((token, index) => (
          <CoinsItem
            key={index}
            token={token}
            sender={walletAddress}
            selectedToken={selectedToken}
            thirdWebtokens={thirdWebtokens}
            setActionSend={setActionSend}
            setSelectedToken={setSelectedToken}
          />
        ))}
      </div>
    </div>
  );
}

export default Coins;
