import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';

const Canvas = ({ mintHandler, toggleWalletHandler }) => {

  const canvasRef = useRef(null);
  const [context, setContext] = useState(null);
  const [height, setHeight] = useState(600);
  const [width, setWidth] = useState(600);

  // constant depending on degree of width reduction in logo
  const horizSkew = .25;
  let fromMid = -4;

  const getRandomColor = () => {
    const colors = [
      '#FFC7FF',
      '#FFAAFF',
      '#FE8DFF',
      '#DF70FF',
      '#BF53FF',
      '#9F33FF',
      '#7F00FF',
      '#C0E9EF',
      '#C4D8F3',
      '#C8C7F7',
    ];

    const randomIdx = Math.floor(Math.random() * colors.length);

    return colors[randomIdx];
  }

  const getMidPoints = () => {
    return {
      midHeight: Math.floor(height/2),
      midWidth: Math.floor(width/2),
    };
  }

  const drawAnimatedRectangle = () => {
    //if (fromMid >= midWidth) { return; }
    const { midHeight, midWidth } = getMidPoints();

    context.beginPath();
    context.rect(midWidth-fromMid, midHeight-fromMid, fromMid * 2, fromMid * 2);

    context.strokeStyle = getRandomColor();
    context.lineWidth = 2;
    context.shadowColor = getRandomColor();
    context.shadowBlur = 5;
    //context.rotate(45 * Math.PI / 180);
    context.stroke();
  }

  const drawETHLogo = () => {
    const { midHeight, midWidth } = getMidPoints();
    const context = canvasRef.current.getContext('2d');

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
    context.strokeStyle = 'black';
    context.lineWidth = 0;
    context.shadowColor = 'white';
    context.shadowBlur = 15;
    context.stroke();
  }

  const renderFrame = () => {
    const { midHeight, midWidth } = getMidPoints();

    drawETHLogo();
    if (fromMid < midWidth) {
      fromMid += 12;
    } else {
      fromMid = -4;
    }
    drawAnimatedRectangle();
    fromMid -= 6;
    drawAnimatedRectangle();
    fromMid += 4;
    drawAnimatedRectangle();
    fromMid -= 6;
    drawAnimatedRectangle();
    fromMid += 4;
    drawAnimatedRectangle();
  }

  const tick = () => {
    if (!canvasRef.current) { return; }
    const context = canvasRef.current.getContext('2d');
    context.clearRect(0,0,width,height);
    renderFrame();
    requestAnimationFrame(tick);
  }

  // canvas internal
  useEffect(() => {
    if (canvasRef.current) {
      setContext(canvasRef.current.getContext('2d'));
    }

    if (context) {
      requestAnimationFrame(tick);

      return () => {
        cancelAnimationFrame(requestAnimationFrame);
      }
    }
  });

  // responsive canvas dimensions
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
          background: 'black'
        }}
      ></canvas>
      <button className='wallet-button' onClick={toggleWalletHandler}>wallet</button>
      <button className='mint-button' onClick={mint}>mint</button>
    </>
  );

};

export default Canvas;
