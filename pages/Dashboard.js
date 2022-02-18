import React, { useEffect, useState } from "react";
import Main from "../components/Main";
import Sidebar from "../components/Sidebar";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

const sdk = new ThirdwebSDK(
  new ethers.Wallet(
    process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY,
    ethers.getDefaultProvider(
      "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
    )
  )
);

function Dashboard({ address }) {
  const [sanitytokens, setSanityTokens] = useState([]);
  const [thirdWebtokens, setThirdWebTokens] = useState([]);

  //console.log("sanitytokens", sanitytokens);
  //console.log("thirdWebtokens", thirdWebtokens);

  useEffect(() => {
    const getSanityandThirdWebToken = async () => {
      const coins = await fetch(
        "https://h794aezm.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%20%27coins%27%5D%7B%0A%20%20coins%2CusdPrice%2CcontractAddress%2Csymbol%2Clogo%0A%7D"
      );
      const sanityTokens = (await coins.json()).result;

      setSanityTokens(sanityTokens);
      setThirdWebTokens(
        sanityTokens.map((token) => sdk.getTokenModule(token?.contractAddress))
      );
    };

    return getSanityandThirdWebToken();
  }, []);

  return (
    <div className="h-screen w-screen max-w-screen">
      <main className="flex flex-row">
        <Sidebar />
        {address && sanitytokens && thirdWebtokens ? (
          <Main
            walletAddress={address}
            sanitytokens={sanitytokens}
            thirdWebtokens={thirdWebtokens}
          />
        ) : (
          <div>
            <p>Loading...</p>
          </div>
        )}
      </main>
      <div className="pb-10" />
    </div>
  );
}

export default Dashboard;
