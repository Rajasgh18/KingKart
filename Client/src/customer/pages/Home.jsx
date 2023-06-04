import React, { useEffect, useState } from 'react'

const Home = () => {
  const handleButtonClick = () => {
    const event = new KeyboardEvent('keydown', {
      key: 'Escape', // Specify the keyboard button you want to simulate
    });
    document.dispatchEvent(event);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') {
      console.log('Escape key pressed');
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <button onClick={handleButtonClick}>Simulate Keyboard Button Press</button>
  );
};

export default Home