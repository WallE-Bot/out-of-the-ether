import React from 'react';
import './Main.css';
import generateTokenURI from '../../helpers/generateTokenURI';
import tryToDisplay from "../Contract/utils";
import request from 'request';
import { Canvas } from '../../components';

const Main = ({ mintNFT }) => {

  const mintHandler = async (dataURL) => {

    // test image
    const tokenURI = generateTokenURI(dataURL);

    const returned = await mintNFT(
      '0xeF34d679Cb4217d1F7Bc81c02C4233D4Fd39566f',
      tokenURI
    );
  }

  return (
    <main>
      <Canvas mintHandler={mintHandler}/>
    </main>
  )

};

export default Main;
