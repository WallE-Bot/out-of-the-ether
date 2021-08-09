/* eslint no-use-before-define: "warn" */
const ipfsAPI = require('ipfs-http-client');
const ipfs = ipfsAPI({host: 'ipfs.infura.io', port: '5001', protocol: 'https' })

const generateTokenURI = async (image) => {

  const printMetaData = {
    "description": "Out of the Ether Print",
    "external_url": "https://hcti.io/v1/image/c12626fb-15bd-4916-99e3-1721bedaf59c",// <-- this can link to a page for the specific file too
    "image": "https://hcti.io/v1/image/c12626fb-15bd-4916-99e3-1721bedaf59c",
    "name": "Out of the Ether",
    "attributes": [
       {
         "trait_type": "test",
         "value": "test"
       }
    ]
  }
  console.log("Uploading print...")
  const uploaded = await ipfs.add(JSON.stringify(printMetaData))

  return uploaded.path;
};

export default generateTokenURI;
