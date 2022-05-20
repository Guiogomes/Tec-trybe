import { screen, fireEvent } from '@testing-library/react';
import renderWithRouter from './helpers/renderWithRouter';
import React from 'react';
import App from './App';


describe('Testa a tela de Registro', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  test('Verifica se tem o botão de Preencher tarefa', () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    btnFillTask.fireEvent('click');
    const inputName = screen.getByLabelText('Nome');
    expect(inputName).toBeInTheDocument();
  });

  test('Verifica se tem o botão de Adicionar tarefa', () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    btnFillTask.fireEvent('click');
    const btnCreateTask = screen.getByText('Criar');
    expect(btnCreateTask).toBeInTheDocument();
    expect(btnCreateTask).toBeDisabled();
  });

  test('Verifica se o botão de criar tarefa fica habilitado se tudo é preenchido corretamente', () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    btnFillTask.fireEvent('click');
    const btnCreateTask = screen.getByText('Criar');
    expect(btnCreateTask).toBeInTheDocument();
    const inputName = screen.getByLabelText('Nome');
    fireEvent.change(inputName, { target: { value: 'Teste' } });
    const inputDescription = screen.getByLabelText('Descrição');
    fireEvent.change(inputDescription, { target: { value: 'Teste' } });
    const inputDate = screen.getByLabelText('Data');
    fireEvent.change(inputDate, { target: { value: '12-12-2022' } });
    const inputHour = screen.getByLabelText('Hora');
    fireEvent.change(inputHour, { target: { value: '12:30' } });
    expect(btnCreateTask).toBeEnabled();
  });

  test(`Verifica que, ao clicar em editar uma tarefa,
  o botão de preencher tarefa some da tela`, () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    btnFillTask.fireEvent('click');
    const btnEditTask = screen.getByText('Editar');
    expect(btnEditTask).toBeInTheDocument();
    btnEditTask.fireEvent('click');
    expect(btnFillTask).not.toBeInTheDocument();
  });


}); 