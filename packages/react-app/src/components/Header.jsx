import { PageHeader } from "antd";
import React from "react";
import { BrowserRouter, Link } from "react-router-dom";
import './Header.css';
import { Account } from "./";

// displays a page header

export default function Header({
  setRoute,
  address,
  localProvider,
  userSigner,
  mainnetProvider,
  price,
  web3Modal,
  loadWeb3Modal,
  logoutOfWeb3Modal,
  blockExplorer,
 }) {

  const generateLogoLink = () => {
    return (
      <Link
        onClick={() => {
          setRoute("/");
        }}
        to="/"
      >
      </Link>
    );
  };

  return (
      <header>
        <BrowserRouter>
          {generateLogoLink()}
        </BrowserRouter>
        {/* 👨‍💼 Your account is in the top right with a wallet at connect options */}
        <div style={{ position: "fixed", textAlign: "right", right: 0, top: 0, padding: 5 }}>
          <Account
            address={address}
            localProvider={localProvider}
            userSigner={userSigner}
            mainnetProvider={mainnetProvider}
            price={price}
            web3Modal={web3Modal}
            loadWeb3Modal={loadWeb3Modal}
            logoutOfWeb3Modal={logoutOfWeb3Modal}
            blockExplorer={blockExplorer}
          />
        </div>
      </header>
  );
}
