import React, { useState, useEffect } from "react";

function PortfilioItems({
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
  const [usdBalance, setUsdBalance] = useState(null);

  useEffect(() => {
    const btcimg = "./assets/btc.png";
    const ethimg = "./assets/eth.png";
    const solimg = "./assets/sol.png";
    if (token?.coins === "Bitcoin") setImageUrl(btcimg);
    if (token?.coins === "Ethereum") setImageUrl(ethimg);
    if (token?.coins === "Solana") setImageUrl(solimg);
  }, [token]);

  useEffect(() => {
    const getBalance = async () => {
      let activeThirdWebToken;
      thirdWebtokens.map((thirdWebtoken) => {
        if (thirdWebtoken.address === token.contractAddress) {
          activeThirdWebToken = thirdWebtoken;
        }
      });
      const balance = await activeThirdWebToken?.balanceOf(sender);
      return await setBalance(balance?.displayValue.split(".")[0]);
    };

    const getUsdBallances = async () => {
      const usdbalances = Number(balance) * Number(token?.usdPrice);
      setUsdBalance(usdbalances.toFixed(2));
    };
    if (token) {
      getBalance();
      getUsdBallances();
    }
  }, [thirdWebtokens, token, balance]);

  console.log(token);
  console.log(thirdWebtokens);
  console.log(usdBalance);

  return (
    <div
      key={key}
      className="flex items-center justify-between px-4 py-2 border border-gray-400"
    >
      <div className="flex items-center flex-[0.25]">
        <img
          src={imageUrl}
          alt={token.coins}
          className="w-10 h-10 object-contain"
        />
        <div className="ml-2">
          <h2 className="hidden lg:inline-flex text-xl text-white">
            {token.coins}
          </h2>
          <p className="text-sm text-gray-400">{token.symbol}</p>
        </div>
      </div>
      <div className="flex items-center justify-center flex-[0.25]">
        {usdBalance ? (
          <div className="ml-2">
            <h2 className="text-xl text-white">
              {"$"}
              {usdBalance}
            </h2>
            <p className="text-sm text-gray-400">
              {token.balanceCoin}
              {token.sign}
            </p>
          </div>
        ) : (
          <p>Loading</p>
        )}
      </div>
      <div className="flex items-center justify-center flex-[0.25]">
        <div className="ml-2">
          <h2 className=" text-white">
            {"$"}
            {token?.usdPrice}
          </h2>
        </div>
      </div>
      <div className="flex items-center justify-center flex-[0.25]">
        <h2>
          <span className="mr-1">{balance}</span>
          {token.symbol}
        </h2>
      </div>
    </div>
  );
}

export default PortfilioItems;
