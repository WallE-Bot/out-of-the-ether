import React, { useState, useRef, useEffect } from 'react';
import './Canvas.css';

const Canvas = () => {

  const canvasRef = useRef(null);
  const [coords, setCoords] = useState(null);

  useEffect(() => {
    
  }, [coords]);

  return (
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
  );

};

export default Canvas;
