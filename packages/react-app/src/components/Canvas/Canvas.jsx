import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';

const Canvas = () => {

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
    var blobData = dataURIToBlob(dataUrl);
    console.log(blobData);
  };

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
      <button onClick={convertCanvasToDataURL}>convert</button>
    </>
  );

};

export default Canvas;
