import React from 'react';
import './Main.css';

const Main = ({ mintNFT }) => {

  const mintHandler = async () => {
    const result = await mintNFT(
      '0xeF34d679Cb4217d1F7Bc81c02C4233D4Fd39566f',
      'QmfVMAmNM1kDEBYrC2TPzQDoCRFH6F5tE1e9Mr4FkkR5Xr'
    );
  }

  return (
    <main>
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
