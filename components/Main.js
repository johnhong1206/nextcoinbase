import React from "react";
import Header from "./Header";
import Portfolio from "./Portfolio";
import Promos from "./Promos";

function Main({ walletAddress, sanitytokens, thirdWebtokens }) {
  return (
    <div className="flex flex-col flex-1 h-screen overflow-y-auto scrollbar-hide">
      <Header
        walletAddress={walletAddress}
        sanitytokens={sanitytokens}
        thirdWebtokens={thirdWebtokens}
      />
      <div className="flex flex-col lg:flex-row">
        <Portfolio
          walletAddress={walletAddress}
          sanitytokens={sanitytokens}
          thirdWebtokens={thirdWebtokens}
        />
        <Promos />
      </div>
      <div className="pb-10" />
    </div>
  );
}

export default Main;
