import React from 'react';
import './NFTItem.css';
import { formatUnits } from "@ethersproject/units";

const NFTItem = ({ data }) => {

  const { id, name, image, description, owner } = data;

  return (
    <li className='nft-item'>
      <span>id: {id.toString()}</span>
      <span className='nft-name'>name: {name}</span>
      <img src={image} alt={description} />
      <p>description: {description}</p>
      <p>owner: {owner}</p>
    </li>
  );

}

export default NFTItem;
