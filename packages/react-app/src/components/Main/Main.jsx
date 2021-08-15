import React, { useState } from 'react';
import './Main.css';
import generateTokenURI from '../../helpers/generateTokenURI';
import tryToDisplay from "../Contract/utils";
import request from 'request';
import { Canvas, NFTList } from '../../components';

const Main = ({ mintNFT, dataSource }) => {

  const [walletModalOpen, setWalletModalOpen] = useState(false);

  const mintHandler = async (dataURL) => {

    // test image
    const tokenURI = generateTokenURI(dataURL);

    const returned = await mintNFT(
      '0xeF34d679Cb4217d1F7Bc81c02C4233D4Fd39566f',
      tokenURI
    );
  }

  const toggleWalletHandler = () => {
    setWalletModalOpen(!walletModalOpen);
  }

  const generateWalletModal = () => {
    return walletModalOpen
    ? <NFTList
        dataSource={dataSource}
      />
    : '';
  }

  return (
    <main>
      <Canvas
        mintHandler={mintHandler}
        toggleWalletHandler={toggleWalletHandler}
      />
      {generateWalletModal()}
    </main>
  )

};

export default Main;
