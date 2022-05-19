import React, { useContext } from 'react';
import { MyContext } from '../context/Provider';
import '../css/Forms.css';

const RegularForm = () => {
  const {
    Nome,
    setNome,
    Data,
    setData,
    Hora,
    setHora,
    Titulo,
    setTitulo,
    setToDo,
    disabled,
  } = useContext(MyContext);

  return(
    <form className='form-container'>
      <label>
        Nome:
        <input
          name={ Nome }
          type='text'
          placeholder='Nome da tarefa'
          onChange={(e) => setNome(e.target.value)}
          value={ Nome }
        />
      </label>
      <label>
        Data:
        <input
          name={ Data }
          type='date'
          placeholder='Data de realização'
          onChange={(e) => setData(e.target.value)}
          value={ Data }
        />
      </label>
      <label>
        Hora:
        <input
          name={ Hora }
          type='text'
          placeholder='Horário previsto (HH:MM)'
          onChange={(e) => setHora(e.target.value)}
          value={ Hora }
        />
      </label>
      <label>
        Titulo:
        <textarea
          name={ Titulo }
          type='text'
          placeholder='Breve descrição'
          maxLength={ 100 }
          onChange={(e) => setTitulo(e.target.value)}
          value={ Titulo }
        />
      </label>
      <button
        type='button'
        disabled = { disabled }
        style={{
          backgroundColor: disabled ? '#A42C2C' : '#4CAF50',
        }}
        onClick={() => setToDo()}
      >
        Criar
      </button>
    </form>
  )
};

export default RegularForm;