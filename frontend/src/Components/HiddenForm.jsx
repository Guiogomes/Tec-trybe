import React, { useContext } from 'react';
import { MyContext } from '../context/Provider';
import '../css/FillButton.css';

const FillAgenda = () => {
  const { setHidden } = useContext(MyContext);

  const handleClick = () => {
    setHidden(false);
  }

  return (
    <div className='fill-button-container'>
      <button
        className='button'
        onClick={handleClick}
      >
        Preencher agenda
      </button>
    </div>
  )
}

export default FillAgenda;