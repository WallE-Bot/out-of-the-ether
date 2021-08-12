import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';
import S3 from 'react-aws-s3';

const Canvas = ({ mintHandler }) => {

  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(600);

  // constant depending on degree of width reduction in logo
  const horizSkew = .1;
  let fromMid = 1;

  const getMidPoints = () => {
    return {
      midHeight: Math.floor(height/2),
      midWidth: Math.floor(width/2),
    };
  }

  const drawAnimatedRectangle = (fromMid) => {
    const { midHeight, midWidth } = getMidPoints();

    context.beginPath();
    context.rect(midWidth-fromMid, midHeight-fromMid, fromMid * 2, fromMid * 2);

    context.strokeStyle = 'purple';
    context.lineWidth = 1;
    context.shadowColor = 'purple';
    context.shadowBlur = 5;
    context.stroke();

    requestAnimationFrame(fromMid + 5);
  }

  const drawETHLogo = () => {
    const { midHeight, midWidth } = getMidPoints();

    context.beginPath();
    context.moveTo(midWidth, 0);

    // top-right edge
    context.lineTo(width - (width * horizSkew), midHeight);

    // bottom-right edge
    context.lineTo(midWidth, height);

    // bottom-left edge
    context.lineTo(0 + (width * horizSkew), midHeight);

    // top-left edge
    context.closePath();

    // styling
    context.strokeStyle = 'white';
    context.lineWidth = 1;
    context.shadowColor = 'white';
    context.shadowBlur = 10;
    context.stroke();
  }

  // canvas internal
  useEffect(() => {
    let unMounted = true;
    if (canvasRef.current) {
      const renderCtx = canvasRef.current.getContext('2d');

      if (renderCtx) {
        setContext(renderCtx);
      };
    };

    if(context) {
      drawETHLogo();
      drawAnimatedRectangle(fromMid);
    };

    return () => cancelAnimationFrame();
  });

  // canvas dimensions
  useEffect(() => {
    const currentHeight = canvasRef.current.height;
    const currentWidth = canvasRef.current.width;
    const min = 600;
    setHeight(currentHeight < min ? min : currentHeight);
    setWidth(currentWidth < min ? min : currentWidth);
  }, []);

  const convertCanvasToDataURL = () => {
    const dataUrl = context.canvas.toDataURL("image/jpeg");
    return dataUrl;
  };

  const mint = async () => {
    const dataURL = convertCanvasToDataURL();
    console.log(dataURL);
    const result = await mintHandler(dataURL);
  }

  return (
    <>
      <canvas
        id="canvas"
        ref={canvasRef}
        width={width}
        height={height}
        style={{
          border: '1px solid green',
          marginTop: 10,
        }}
      ></canvas>
      <button className='mint-button' onClick={mint}>mint</button>
    </>
  );

};

export default Canvas;
