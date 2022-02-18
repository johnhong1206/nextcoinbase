import React, { useState, useEffect } from "react";
import { BiCopy } from "react-icons/bi";
import { FaCheck } from "react-icons/fa";

function Received({
  selectedToken,
  walletAddress,
  thirdWebtokens,
  setActionSend,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const btcimg = "./assets/btc.png";
    const ethimg = "./assets/eth.png";
    const solimg = "./assets/sol.png";
    if (selectedToken?.coins === "Bitcoin") setImageUrl(btcimg);
    if (selectedToken?.coins === "Ethereum") setImageUrl(ethimg);
    if (selectedToken?.coins === "Solana") setImageUrl(solimg);
  }, [selectedToken]);

  return (
    <div className="flex flex-col h-full w-full flex-1">
      <div className="flex-1 flex flex-col items-center justify-center h-1/2 w-full">
        <img
          src={`https://api.qrserver.com/v1/create-qr-code/?data=${walletAddress}&amp;size=250x250`}
          alt="qr"
        />
      </div>
      <div>
        <div className="mt-10">
          <div className=" cursor-pointer flex flex-col items-start border px-2 py-2 space-y-2 border-gray-600">
            <div
              className="flex flex-row items-center"
              onClick={() => setActionSend("coins")}
            >
              <img
                src={imageUrl}
                slt={selectedToken?.coins}
                className="w-6 h-6 object-contain"
              />

              <h2 className="text-white">{selectedToken?.coins}</h2>
            </div>
          </div>
          <div className=" cursor-pointer flex flex-row items-center justify-between border px-2 py-2 space-y-2 border-gray-600">
            <div className>
              <h2 className="text-white text-lg font-medium">
                {selectedToken?.symbol} Address
              </h2>
              <h2 className="text-gray-500 text-xs font-bold">
                {walletAddress}
              </h2>
            </div>
            <div
              onClick={() => {
                navigator.clipboard.writeText(walletAddress);
                setCopied(true);
              }}
            >
              {copied ? (
                <FaCheck className="text-green-500 w-5 h-5" />
              ) : (
                <BiCopy className="text-gray-500 w-5 h-5" />
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Received;
