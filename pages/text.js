import React, { useEffect, useState, useLayoutEffect } from "react";
import { ThirdwebSDK } from "@3rdweb/sdk";
import { ethers } from "ethers";

function text({ sanityTokens }) {
  console.log(sanityTokens);
  const [sanitytoken, setSanityToken] = useState([]);
  const [thirdWebtoken, setThirdWebToken] = useState([]);
  const sdk = new ThirdwebSDK(
    new ethers.Wallet(
      process.env.NEXT_PUBLIC_METAMASK_PRIVATE_KEY,
      ethers.getDefaultProvider(
        "https://rinkeby.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161"
      )
    )
  );
  const module = sdk.getTokenModule(
    "0x6Ef5B3813c474f9f0CE14B99926BB95060d11211"
  );

  useEffect(() => {
    setSanityToken(sanityTokens);
    setThirdWebToken(
      sanityTokens.map((token) => sdk.getTokenModule(token?.contractAddress))
    );
  }, [sanityTokens]);

  console.log("thirdWebtoken", thirdWebtoken);

  const getbalance = async () => {
    const address = "0x8C3386CE2Fecd7e015014bA0d4388752697EBB84";
    const balance = await module.balanceOf(address);
    console.log(balance);
  };
  getbalance();

  useEffect(() => {
    const calculateTotalBalance = async () => {
      const totalBalance = await Promise.all(
        thirdWebtoken.map(async (token) => {
          const balance = await token.balanceOf(
            "0x1599414596B7c0f2c5cA24C2c4b52dED0f71A800"
          );
          return Number(balance.displayValue) * tokenToUSD[token.address];
        })
      );
      console.log("totalBalance", totalBalance);
    };
    return calculateTotalBalance();
  }, []);

  return <div>text</div>;
}

export default text;
export const getServerSideProps = async () => {
  const coins = await fetch(
    "https://h794aezm.api.sanity.io/v1/data/query/production?query=*%5B_type%3D%3D%20%27coins%27%5D%7B%0A%20%20coins%2CusdPrice%2CcontractAddress%2Csymbol%2Clogo%0A%7D"
  );
  const sanityTokens = (await coins.json()).result;

  return {
    props: {
      sanityTokens,
    },
  };
};
