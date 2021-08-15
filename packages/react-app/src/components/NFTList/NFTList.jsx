import React from 'react';
import './NFTList.css';
import { NFTItem } from '../';
import { uuid } from 'uuidv4';

const NFTList = ({ dataSource }) => {

  const generateNFTItemList = () => {
    const list = dataSource
      .map(dataObj => {
          return <NFTItem key={uuid()} data={dataObj} />
      });

    return (
      <ul className='nft-list'>
        {list}
      </ul>
    );
  };

  return (
    <div className='nft-list-container'>
      {generateNFTItemList()}
    </div>
  );

}

export default NFTList;
