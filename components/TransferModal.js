import React, { useState, useEffect } from "react";
import Coins from "./Coins";
import Received from "./Received";
import Transfer from "./Transfer";

function TransferModal({ walletAddress, sanitytokens, thirdWebtokens }) {
  const [actionSend, setActionSend] = useState("send");
  const [selectedToken, setSelectedToken] = useState(sanitytokens[1] || null);

  return (
    <div className=" h-[35rem] w-[27rem] z-50 border border-[#282b2f] flex flex-col">
      <div className="flex flex-row items-center justify-evenly h-20">
        <div
          onClick={() => setActionSend("send")}
          className={`h-full w-full grid place-items-center hover:cursor-pointer hover:bg-[#111214] text-white font-bold text-lg ${
            actionSend === "send" && "text-blue-500 border border-gray-500"
          }`}
        >
          <p className="">Send</p>
        </div>
        <div
          onClick={() => setActionSend("received")}
          className={`h-full w-full grid place-items-center hover:cursor-pointer hover:bg-[#111214] text-white font-bold text-lg ${
            actionSend === "received" && "text-blue-500 border  border-gray-500"
          }`}
        >
          <p className="">Received</p>
        </div>
      </div>
      <div className="flex-1">
        {actionSend === "send" && (
          <Transfer
            selectedToken={selectedToken}
            walletAddress={walletAddress}
            thirdWebtokens={thirdWebtokens}
            setActionSend={setActionSend}
          />
        )}
        {actionSend === "received" && (
          <Received
            selectedToken={selectedToken}
            walletAddress={walletAddress}
            thirdWebtokens={thirdWebtokens}
            setActionSend={setActionSend}
          />
        )}
        {actionSend === "coins" && (
          <Coins
            selectedToken={selectedToken}
            walletAddress={walletAddress}
            thirdWebtokens={thirdWebtokens}
            setActionSend={setActionSend}
            setSelectedToken={setSelectedToken}
            sanitytokens={sanitytokens}
          />
        )}
      </div>
    </div>
  );
}

export default TransferModal;
