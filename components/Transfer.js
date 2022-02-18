import React, { useState, useEffect } from "react";
import { FaWallet } from "react-icons/fa";
import imageUrlBuilder from "@sanity/image-url";
import { client, urlFor } from "../lib/sanity";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { TailSpin } from "react-loader-spinner";

function Transfer({
  selectedToken,
  walletAddress,
  thirdWebtokens,
  setActionSend,
}) {
  const [amount, setAmount] = useState();
  const [recepient, setRecipients] = useState("");
  const [imageUrl, setImageUrl] = useState(null);
  const [activeThirdWebToken, setActiveThirdWebToken] = useState();
  const [balance, setBalance] = useState(null);
  const [transfer, setTransfer] = useState(false);
  const [status, setStatus] = useState("default");

  useEffect(() => {
    const activeToken = thirdWebtokens.find(
      (token) => token.address === selectedToken?.contractAddress
    );
    setActiveThirdWebToken(activeToken);
  }, [thirdWebtokens, selectedToken]);

  useEffect(() => {
    const getBalance = async () => {
      const balance = await activeThirdWebToken.balanceOf(walletAddress);
      setBalance(balance.displayValue);
    };
    if (activeThirdWebToken) {
      getBalance();
    }
  }, [activeThirdWebToken]);

  useEffect(() => {
    const btcimg = "./assets/btc.png";
    const ethimg = "./assets/eth.png";
    const solimg = "./assets/sol.png";
    if (selectedToken?.coins === "Bitcoin") setImageUrl(btcimg);
    if (selectedToken?.coins === "Ethereum") setImageUrl(ethimg);
    if (selectedToken?.coins === "Solana") setImageUrl(solimg);
  }, [selectedToken]);

  const sendCrypto = async (amount) => {
    console.log("sending...");
    setTransfer(true);

    if (activeThirdWebToken && amount && recepient) {
      const tx = await activeThirdWebToken.transfer(
        recepient,
        amount.toString().concat("000000000000000000")
      );
      console.log(tx);
      setStatus("complete");
      setTransfer(false);
      setAmount(0);
      setRecipients("");
    } else {
      console.error("missing data");
      setStatus("default");
      setTransfer(false);
      setAmount(0);
    }
  };

  return (
    <div className="flex flex-col h-full flex-1 ">
      {!transfer ? (
        <div className="flex flex-col w-full h-full">
          {status === "default" && (
            <div className="flex flex-col flex-1">
              <div className="flex items-center justify-center flex-1">
                <input
                  placeholder="0"
                  type="number"
                  min="0"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className=" whitespace-normal max-w-[30%] text-center bg-transparent outline-none text-white placeholder-gray-400 text-6xl mr-[1rem] appearance-none"
                />
                <span className="text-blue-600 mb-[0.5rem] text-5xl">
                  {selectedToken?.symbol}
                </span>
              </div>

              <p className="text-xs mt-1 text-white text-center font-bold">
                Amount is Required, Your Current Amount is {balance}{" "}
                {selectedToken?.symbol}
              </p>
            </div>
          )}
          {status === "complete" && (
            <div
              onClick={() => setActionSend("send")}
              className="flex flex-col items-center justify-center w-full h-full flex-1 cursor-pointer"
            >
              <div onClick={() => setActionSend("send")}>
                <h2 className="text-2xl mt-1 text-green-500 text-center font-bold">
                  Trasaction Complete....
                </h2>
                <p className="text-white font-bold text-center">
                  Return Sending
                </p>
              </div>
            </div>
          )}
          {status === "default" && (
            <div>
              <div className="mt-10">
                <div>
                  <div className="flex flex-row items-center  border border-gray-600 px-2 py-3 mx-10">
                    <h2 className="text-white">To</h2>
                    <FaWallet className="text-gray-500 w-4 h-4 mx-4" />
                    <input
                      value={recepient}
                      onChange={(e) => setRecipients(e.target.value)}
                      placeholder="Address"
                      className="flex-[0.75] whitespace-normal max-w-[30%] text-center bg-transparent outline-none text-white placeholder-gray-400 text-xl mr-[1rem] appearance-none"
                    />
                  </div>
                </div>
                <div>
                  <div
                    onClick={() => setActionSend("coins")}
                    className=" cursor-pointer flex flex-row items-center border border-gray-600 px-2 py-3 mx-10 space-x-3"
                  >
                    <h2 className="text-white">Pay With</h2>

                    <img
                      src={imageUrl}
                      slt={selectedToken?.coins}
                      className="w-6 h-6 object-contain"
                    />

                    <h2 className="text-white">{selectedToken?.coins}</h2>
                  </div>
                </div>
                <div className="flex flex-row items-center justify-center mt-4 w-full">
                  <button
                    onClick={() => sendCrypto(amount, recepient)}
                    className="w-full mx-4 border border-[#282b2f] px-5 py-1 lg:px-10 lg:py-3   bg-[#3773f5] text-black font-medium rounded-xl hover:text-white"
                  >
                    Continue
                  </button>
                </div>
              </div>{" "}
              <div className="flex flex-row items-center justify-between mx-5 mt-4 font-bold">
                <h2 className="text-white text-center">
                  <span className="mr-2">{selectedToken?.symbol}</span>Balance:
                </h2>
                {balance ? (
                  <h2 className="text-white text-center">
                    <span className="mr-1">{balance}</span>
                    {selectedToken?.symbol}
                  </h2>
                ) : (
                  <h2 className="text-white text-center">Fetching....</h2>
                )}
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="grid place-items-center h-full w-full">
          <div className="flex flex-col items-center justify-center space-y-2">
            <p className="text-lg font-bold text-white">
              Tranfer In Progress....
            </p>
            <TailSpin
              height="100"
              width="100"
              color="grey"
              ariaLabel="loading"
            />
          </div>
        </div>
      )}
      <div className="pb-10" />
    </div>
  );
}

export default Transfer;
