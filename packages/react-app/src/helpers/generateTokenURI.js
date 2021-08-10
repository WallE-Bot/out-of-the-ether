/* eslint no-use-before-define: "warn" */
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const generateTokenURI = async (image) => {

  const printMetaData = {
    "description": "Out of the Ether Print",
    "external_url": "https://hcti.io/v1/image/c12626fb-15bd-4916-99e3-1721bedaf59c",// <-- this can link to a page for the specific file too
    "image": `${image}`,
    "name": "Out of the Ether",
    "attributes": [
       {
         "trait_type": "test",
         "value": "test"
       }
    ]
  }

  const uploaded = await ipfs.add(JSON.stringify(printMetaData))
  const path = await uploaded.path;

  return path;
};

export default generateTokenURI;
