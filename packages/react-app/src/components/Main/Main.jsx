import React from 'react';
import './Main.css';
import generateTokenURI from '../../helpers/generateTokenURI';
import tryToDisplay from "../Contract/utils";
import request from 'request';
import { Canvas } from '../../components';

const Main = ({ mintNFT }) => {

  const mintHandler = async () => {

    // test image
    const tokenURI = generateTokenURI(
      'https://hcti.io/v1/image/c12626fb-15bd-4916-99e3-1721bedaf59c'
    );

    const returned = await mintNFT(
      '0xeF34d679Cb4217d1F7Bc81c02C4233D4Fd39566f',
      tokenURI
    );
  }

  return (
    <main>
      <Canvas />
      <button
        className='mint-button'
        onClick={mintHandler}
      >
        mint
      </button>
    </main>
  )

};

export default Main;
