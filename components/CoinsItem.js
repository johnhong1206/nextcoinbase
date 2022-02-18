import React, { useState, useEffect } from "react";
import { FaCheck } from "react-icons/fa";

function CoinsItem({
  key,
  token,
  sender,
  selectedToken,
  thirdWebtokens,
  setActionSend,
  setSelectedToken,
}) {
  const [imageUrl, setImageUrl] = useState(null);
  const [balance, setBalance] = useState(null);

  useEffect(() => {
    const btcimg = "./assets/btc.png";
    const ethimg = "./assets/eth.png";
    const solimg = "./assets/sol.png";
    if (token?.coins === "Bitcoin") setImageUrl(btcimg);
    if (token?.coins === "Ethereum") setImageUrl(ethimg);
    if (token?.coins === "Solana") setImageUrl(solimg);
  }, [token]);

  const getImg = () => {
    const btcimg = "./assets/btc.png";
    const ethimg = "./assets/eth.png";
    const solimg = "./assets/sol.png";
    if (token?.coins === "Bitcoin") setImageUrl(btcimg);
    if (token?.coins === "Ethereum") setImageUrl(ethimg);
    if (token?.coins === "Solana") setImageUrl(solimg);
  };

  useEffect(() => {
    const getBalance = async () => {
      let activeThirdWebToken;
      thirdWebtokens.map((thirdWebtoken) => {
        if (thirdWebtoken.address === token.contractAddress) {
          activeThirdWebToken = thirdWebtoken;
        }
      });
      const balance = await activeThirdWebToken.balanceOf(sender);
      return await setBalance(balance.displayValue.split(".")[0]);
    };
    if (token) {
      getBalance();
    }
  }, [thirdWebtokens, token]);

  return (
    <div
      onClick={() => {
        setSelectedToken(token);
        setActionSend("send");
      }}
      key={key}
      className={`flex flex-row items-center justify-between hover:bg-[#111214]  border border-gray-600 px-2 py-3 mx-10
      cursor-pointer
      ${balance && token.symbol === selectedToken.symbol && "bg-[#111214]"}`}
    >
      <div className="flex items-center justify-center space-x-2">
        <img
          src={imageUrl}
          slt={selectedToken?.coins}
          className="w-6 h-6 object-contain"
        />
        <h2 className="text-white">{token.symbol}</h2>
      </div>
      <div className="flex items-center justify-center space-x-2">
        {balance ? (
          <h2 className="text-gray-500 font-medium">
            <span className="mr-1 font-bold text-white">{balance}</span>
            {token?.symbol}
          </h2>
        ) : (
          <h2 className="text-gray-500 font-medium">Fetching...</h2>
        )}
        {balance && token.symbol === selectedToken.symbol && (
          <FaCheck class="w-3 h-3 text-blue-600" />
        )}
      </div>
    </div>
  );
}

export default CoinsItem;
