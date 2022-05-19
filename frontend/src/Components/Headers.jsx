import React from 'react';
import '../css/Headers.css';

const Headers = () => {
  return (
    <header className='header-containe'>
      <h1 style={{
        fontSize: '2rem',
        fontWeight: 'bold',
        margin: '20px auto',
        textAlign: 'center',
        color: '#4F4F4F',
      }}>Lista de Tarefas</h1>
    </header>
  );
};

export default Headers;