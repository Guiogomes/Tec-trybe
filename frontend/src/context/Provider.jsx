import PropTypes from 'prop-types';
import React, { createContext, useEffect, useState } from 'react';
import { createTask, deleteTask, editTask } from '../utils/Request';

export const MyContext = createContext();

export function Provider({ children }) {
  const [Nome, setNome] = useState('');
  const [Data, setData] = useState('');
  const [Hora, setHora] = useState('');
  const [Titulo, setTitulo] = useState('');
  const [status, setStatus] = useState('');
  const [hidden, setHidden] = useState(true);
  const [id, setId] = useState(1);
  const [isEdited, setIsEdited] = useState(false);
  const [toDos, setToDos] = useState([]);
  const [disabled, setDisabled] = useState(true);

  useEffect(() => {
    if (Nome.length !== 0 && Data.length !== 0 && Hora.length !== 0 && Titulo.length !== 0) {
      setDisabled(false);
    }
  }, [Nome, Data, Hora, Titulo]);

  const setToDo = async () => {
    console.log(`${Data} ${Hora}`);
    const newToDo = await createTask({ title: Nome, dueDate: new Date(`${Data} ${Hora}`), description: Titulo, status: status });
    setNome('');
    setData('');
    setHora('');
    setTitulo('');
    setHidden(true);
    setToDos([...toDos, newToDo]);
  }

  const updateToDo = async () => {
    setHidden(false);
    setIsEdited(true);
  }

  const deleteToDo = async (id) => {
    const leftToDos = toDos.filter(toDo => toDo._id !== id);
    await deleteTask(id);
    setToDos(leftToDos);
  }

  const editToDo = async () => {
    const editedToDoIndex = toDos.findIndex(todo => todo._id === id);
    const newAgenda = [...toDos];
    newAgenda[editedToDoIndex] = {
      ...newAgenda[editedToDoIndex],
      title: Nome,
      description: Titulo,
      dueDate: `${Data} ${Hora}`,
      status,
    }
    console.log(newAgenda[editedToDoIndex])
    await editTask(id, newAgenda[editedToDoIndex]);
    setNome('');
    setData('');
    setHora('');
    setTitulo('');
    setHidden(true);
    setToDos(newAgenda);
  }

  const context = {
    toDos,
    setToDos,
    Nome,
    setNome,
    Data,
    setData,
    status,
    setStatus,
    hidden,
    setHidden,
    Hora,
    setHora,
    Titulo,
    setTitulo,
    setId,
    setToDo,
    updateToDo,
    deleteToDo,
    isEdited,
    setIsEdited,
    editToDo,
    disabled,
    setDisabled,
  };

  return (
    <MyContext.Provider value={ context }>
      {children}
    </MyContext.Provider>
  );
}

Provider.propTypes = {
  children: PropTypes.node.isRequired,
};