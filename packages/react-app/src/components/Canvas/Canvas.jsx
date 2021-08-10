import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';
import S3 from 'react-aws-s3';

const Canvas = ({ mintHandler }) => {

  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);

  useEffect(() => {
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      };
    };

    console.log(context);
    if(context) {
      context.strokeStyle = "#FFFFFF";
      context.strokeRect(245,245,10,10);
    };
  }, [context]);

  const dataURIToBlob = (dataURI) => {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for(var i = 0; i < binary.length; i++) {
        array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], {type: 'image/jpeg'});
  };

  const convertCanvasToDataURL = () => {
    console.log(context);
    var dataUrl = context.canvas.toDataURL("image/jpeg");
    console.log(dataUrl);
    return dataUrl;
    /*var blobData = dataURIToBlob(dataUrl);
    console.log(blobData);
    uploadImg(blobData);*/
  };

  const mint = async () => {
    const dataURL = convertCanvasToDataURL();
    const result = await mintHandler(dataURL);
    console.log(result);
  }

  /*
  const uploadImg = async (blobData) => {
    const config = {
      bucketName: 'myBucket',
      dirName: 'media',
      region: 'eu-west-1',
      accessKeyId: 'JAJHAFJFHJDFJSDHFSDHFJKDSF',
      secretAccessKey: 'jhsdf99845fd98qwed42ebdyeqwd-3r98f373f=qwrq3rfr3rf',
    }

    const ReactS3Client = new S3(config);

    const newFileName = 'test-file';

    const data = await ReactS3Client.uploadFile(file, newFileName)
    console.log(data);
  }
  */

  return (
    <>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={500}
        height={500}
        style={{
          border: '1px solid white',
          marginTop: 10,
        }}
      ></canvas>
      <button onClick={mint}>mint</button>
    </>
  );

};

export default Canvas;
