import React from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import Link from "next/link";
import TransferModal from "./TransferModal";

Modal.setAppElement("#__next");

function Header({ walletAddress, sanitytokens, thirdWebtokens }) {
  const router = useRouter();

  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      transform: "translate(-50% ,-50%)",
      backgroundColor: "#0a0b0d",
      padding: 0,
      border: "none",
    },
    overlay: {
      backgroundColor: "rgba(10, 11, 13, 0.75)",
    },
  };

  return (
    <div
      className={`gradient-bg lg:bg-transparent sticky z-10 top-0 w-full px-4 py-6 flex flex-col items-start lg:items-center lg:flex-row justify-between  ${
        !router.query.transfer && "border-b border-gray-00"
      }"`}
    >
      <h1 className={`${!!router.query.transfer && "hidden"} text-3xl`}>
        Assets
      </h1>
      <div
        className={`${!!router.query.transfer && "hidden"}
        flex flex-row items-center justify-center space-x-2 lg:space-x-4`}
      >
        <div>
          <h2 className="text-green-400">Wallet Connected</h2>
          {walletAddress.slice(0, 7)}...{walletAddress.slice(35)}
        </div>
        <button className=" border border-[#282b2f] px-5 py-1 lg:px-10 lg:py-3  loginbutton hover:loginbutton:hover text-gray-600 font-medium rounded-xl hover:text-white">
          Buy/Sell
        </button>
        <Link href={`/?transfer=1`}>
          <button className="px-5 py-1 lg:px-10 lg:py-3 font-medium text-white hover:underline text-lg">
            Send / Received
          </button>
        </Link>
      </div>
      <Modal
        isOpen={!!router.query.transfer}
        onRequestClose={() => router.push("/")}
        style={customStyles}
      >
        <TransferModal
          walletAddress={walletAddress}
          sanitytokens={sanitytokens}
          thirdWebtokens={thirdWebtokens}
        />
      </Modal>
    </div>
  );
}

export default Header;
