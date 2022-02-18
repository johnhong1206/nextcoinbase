import React, { useEffect, useState } from "react";
import BalanceChart from "./BalanceChart";
import PortfilioItems from "./PortfilioItems";

const coins = [
  {
    name: "Bitcoin",
    sign: "BTC",
    logo: "./assets/btc.png",
    balanceUsd: 230.32,
    balanceCoin: 6.35667736,
    priceUsd: 5.32,
    change: -4.74,
    allocation: 41.89,
  },
  {
    name: "Solana",
    sign: "CRV",
    logo: "./assets/sol.png",
    balanceUsd: 120.2,
    balanceCoin: 6.35667736,
    priceUsd: 5.32,
    change: 4.74,
    allocation: 41.89,
  },
  {
    name: "Polygon",
    sign: "MATIC",
    logo: "./assets/matic.png",
    balanceUsd: 1.2,
    balanceCoin: 3.35664236,
    priceUsd: 5.22,
    change: -5.24,
    allocation: 17.89,
  },
  {
    name: "Ethereum",
    sign: "ETH",
    logo: "./assets/eth.png",
    balanceUsd: 1.2,
    balanceCoin: 3.35664236,
    priceUsd: 5.22,
    change: 6.24,
    allocation: 17.89,
  },
  {
    name: "Terra",
    sign: "LUNA",
    logo: "./assets/luna.png",
    balanceUsd: 1.2,
    balanceCoin: 3.35664236,
    priceUsd: 5.22,
    change: -5.24,
    allocation: 17.89,
  },
  {
    name: "Dogecoin 🌙",
    sign: "DOGE",
    logo: "./assets/doge.png",
    balanceUsd: 1.2,
    balanceCoin: 3.35664236,
    priceUsd: 5.22,
    change: 200.24,
    allocation: 17.89,
  },
];

function Portfolio({ walletAddress, sanitytokens, thirdWebtokens }) {
  const [imageUrl, setImageUrl] = useState(null);

  const [walletBallance, setWalletBallance] = useState(0);
  const tokenToUSD = {};
  for (const token of sanitytokens) {
    tokenToUSD[token.contractAddress] = Number(token.usdPrice);
  }

  console.log(sanitytokens);

  useEffect(() => {
    const btcimg = "./assets/btc.png";
    const ethimg = "./assets/eth.png";
    const solimg = "./assets/sol.png";
    if (token?.coins === "Bitcoin") setImageUrl(btcimg);
    if (token?.coins === "Ethereum") setImageUrl(ethimg);
    if (token?.coins === "Solana") setImageUrl(solimg);
  }, [token]);

  useEffect(() => {
    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        thirdWebtokens.map(async (token) => {
          const balance = await token.balanceOf(walletAddress);
          return Number(balance.displayValue) * tokenToUSD[token.address];
        })
      );
      console.log(totalBalance);
      console.log(totalBalance.reduce((acc, curr) => acc + curr, 0));
      setWalletBallance(totalBalance.reduce((acc, curr) => acc + curr, 0));
    };
    return calculateTotalBalance();
  }, [walletAddress, thirdWebtokens]);

  return (
    <div className="flex flex-col flex-grow flex-1">
      <div className="px-4 py-1">
        <h1 className="font-bold">Portfolio Balance</h1>
        <p className="font-bold">
          <span className="mr-1">{`$`}</span>
          {walletBallance.toString()}
        </p>
        <BalanceChart />
      </div>

      <div className=" border-b border-gray-400 py-2 flex items-center justify-center w-full max-w-3xl mx-auto">
        <h1>Your Asset</h1>
      </div>
      <div className=" w-full max-w-3xl mx-auto">
        <div className="flex items-center justify-between px-4 py-2 border">
          <div className="flex-[0.25] text-center">
            <h2>Name</h2>
          </div>
          <div className="flex-[0.25] text-center">
            <h2>Balance</h2>
          </div>
          <div className="flex-[0.25] text-center">
            <h2>Price</h2>
          </div>
          <div className="flex-[0.25] text-center">
            <h2>Allocation</h2>
          </div>
        </div>
      </div>
      <div className=" w-full max-w-3xl mx-auto">
        {sanitytokens.map((token, index) => (
          <PortfilioItems
            key={index}
            token={token}
            sender={walletAddress}
            thirdWebtokens={thirdWebtokens}
            tokenToUSD={tokenToUSD}
          />
        ))}
      </div>
    </div>
  );
}

export default Portfolio;
{
  /**<div
            key={index}
            className="flex items-center justify-between px-4 py-2 border border-gray-400"
          >
            <div className="flex items-center flex-[0.25]">
              <img
                src={coin.logo}
                alt={coin.name}
                className="w-10 h-10 object-contain"
              />
              <div className="ml-2">
                <h2 className="hidden lg:inline-flex text-xl text-white">
                  {coin.name}
                </h2>
                <p className="text-sm text-gray-400">{coin.sign}</p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-[0.25]">
              <div className="ml-2">
                <h2 className="text-xl text-white">
                  {"$"}
                  {coin.balanceUsd}
                </h2>
                <p className="text-sm text-gray-400">
                  {coin.balanceCoin}
                  {coin.sign}
                </p>
              </div>
            </div>
            <div className="flex items-center justify-center flex-[0.25]">
              <div className="ml-2">
                <h2 className=" text-white">
                  {"$"}
                  {coin.priceUsd}
                </h2>
                <div
                  className={`flex ${
                    coin.change < 0 ? "text-red-500" : "text-green-500"
                  }`}
                >
                  {coin.change > 0 && <p className="">+</p>}
                  <p>{coin.change}%</p>
                </div>
              </div>
            </div>
            <div className="flex items-center justify-center flex-[0.25]">
              <h2>{coin.allocation}</h2>
            </div>
          </div> */
}
