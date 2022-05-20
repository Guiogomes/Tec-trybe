import { screen, fireEvent, render } from '@testing-library/react';
import React from 'react';
import App from '../App';
import { Provider } from '../context/Provider';


describe('Testa a tela de Registro', () => {
  beforeEach(() => {
    render(
      <Provider>
        <App />
      </Provider>
    );
  });

  test('Verifica se tem o botão de Preencher tarefa', () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    fireEvent.click(btnFillTask);
    const inputName = screen.getByLabelText('Nome');
    expect(inputName).toBeInTheDocument();
  });

  test('Verifica se tem o botão de Adicionar tarefa', () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    fireEvent.click(btnFillTask);
    const btnCreateTask = screen.getByText('Criar');
    expect(btnCreateTask).toBeInTheDocument();
    expect(btnCreateTask).toBeDisabled();
  });

  test('Verifica se o botão de criar tarefa fica habilitado se tudo é preenchido corretamente', () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    fireEvent.click(btnFillTask);
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
    fireEvent.click(btnFillTask);
    const btnEditTask = screen.getByText('Editar');
    expect(btnEditTask).toBeInTheDocument();
    fireEvent.click(btnEditTask);
    expect(btnFillTask).not.toBeInTheDocument();
  });

  test(`Verifica que, ao clicar em deletar uma tarefa, ela desaparece da tela`, () => {
    const btnFillTask = screen.getByText('Preencher tarefa');
    expect(btnFillTask).toBeInTheDocument();
    fireEvent.click(btnFillTask);
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
    fireEvent.click(btnCreateTask);
    const getTableRows = screen.getAllByRole('tr');
    expect(getTableRows).toHaveLength(1);
    const btnDeleteTask = screen.getByText('Excluir');
    fireEvent.click(btnDeleteTask);
    expect(getTableRows).toHaveLength(0);
  })

}); 