const url = process.env.REACT_APP_HOSTNAME || 'http://localhost:3001';
const contentType = 'application/json; charset=utf-8';

export const createTask = async (data) => {
  const options = {
    method: 'POST',
    headers: { 'Content-Type': contentType },
    body: JSON.stringify({ ...data }),
  };
  const response = await fetch(`${url}/todos`, options);
  const resolve = response.json();
  return resolve;
};

export const readTasks = async () => {
  const options = {
    method: 'GET',
    headers: { 'Content-Type': contentType },    
  }
  const response = await fetch(`${url}/todos`, options);
  const resolve = response.json();
  return resolve;
};

export const editTask = async (id, data) => {
  const options = {
    method: 'PUT',
    headers: { 'Content-Type': contentType },
    body: JSON.stringify({ ...data }),
  }

  const response = await fetch(`${url}/todos/${id}`, options);
  const resolve = response.json();
  return resolve;
};

export const deleteTask = async (id) => {
  const options = {
    method: 'DELETE',
    headers: { 'Content-Type': contentType },
  }

  const response = await fetch(`${url}/todos/${id}`, options);
  const resolve = response.json();
  return resolve;
};