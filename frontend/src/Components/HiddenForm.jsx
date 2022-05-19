import React, { useContext, useEffect } from 'react';
import { MyContext } from '../context/Provider';
import '../css/FillButton.css';

const FillAgenda = () => {
  const { setHidden, setToDos, toDos } = useContext(MyContext);

  const handleClick = () => {
    setHidden(false);
  }

  const handleSortTitleClick = () => {
    const sortedTitleTodos = toDos.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    });
    setToDos(sortedTitleTodos);
    console.log(toDos); 
  }

  const handleSortDateClick = () => {
    const sortedDateTodos = toDos.sort((a, b) => a.dueDate.getTime() - b.dueDate.getTime());
    setToDos(sortedDateTodos);
  }

  const handleSortStatusClick = () => {
    const sortedStatusTodos = toDos.sort((a, b) => {
      if (a.status === 'Pendente') {
        return a.status > b.status;
      } if (a.status === 'Em andamento') {
        return a.status < b.status;
      } if (a.status === 'Concluído') {
        return 0;
      }
    });
    setToDos(sortedStatusTodos);
    console.log(toDos)
  }

  return (
    <div className='fill-button-container'>
      <button
        className='button'
        onClick={handleClick}
      >
        Preencher tarefa
      </button>
      <button
        className='button'
        onClick={handleSortTitleClick}
      >
        Ordenar por title
      </button>
      <button
        className='button'
        onClick={handleSortDateClick}
      >
        Ordenar por data
      </button>
      <button
        className='button'
        onClick={handleSortStatusClick}
      >
        Ordenar por status
      </button>
    </div>
  )
}

export default FillAgenda;