import React, { useContext } from 'react';
import { MyContext } from '../context/Provider';
import '../css/Forms.css';

const EditedForm = () => {
  const {
    Nome,
    setNome,
    Data,
    setData,
    Hora,
    setHora,
    Titulo,
    setTitulo,
    editToDo,
    setHidden,
    setIsEdited,
    setDisabled,
    setStatus,
    status
  } = useContext(MyContext);

  return(
    <form className='form-container'>
      <label htmlFor={ Nome }>
        Nome:
        <input
          name={ Nome }
          type='text'
          placeholder='Nome da tarefa'
          onChange={(e) => setNome(e.target.value)}
          value={ Nome }
        />
      </label>
      <label htmlFor={ Data }>
        Data:
        <input
          name={ Data }
          type='date'
          placeholder='Data de realização'
          onChange={(e) => setData(e.target.value)}
          value={ Data }
        />
      </label>
      <label htmlFor={ Hora }>
        Hora:
        <input
          name={ Hora }
          type='text'
          placeholder='Horário previsto (HH:MM)'
          onChange={(e) => setHora(e.target.value)}
          value={ Hora }
        />
      </label>
      <label htmlFor={ Titulo }>
        Descrição:
        <textarea
          name={ Titulo }
          type='text'
          placeholder='Breve descrição'
          maxLength={ 100 }
          onChange={(e) => setTitulo(e.target.value)}
          value={ Titulo }
        />
      </label>
      <label>
        Status:
        <select
          onChange={(e) => setStatus(e.target.value)}
          value={ status }
        >
          <option value='Pendente'>Pendente</option>
          <option value='Concluído'>Concluído</option>
          <option value='Em andamento'>Em andamento</option>
        </select>
      </label>
      <button
        type='button'
        onClick={() => {editToDo(); setHidden(true); setIsEdited(false); setDisabled(true);}}
      >
        Salvar
      </button>
    </form>
  )
};

export default EditedForm;