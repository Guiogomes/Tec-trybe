# # Contexto
Teste técnico proposto pela Trybe para treinamento de entrevistas técnicas para empresas.\
Desenvolver uma ToDo list que permita um CRUD e reordenação das tarefas.

## Técnologias usadas

Front-end:
  - JavaScript
  - React.js
  - RTL(React Test Library)

Back-end:
  - TypeScript
  - Node.js(MSC)
  - Express
  - MongoDB(Mongoose)
  - Tests(Mocha, Sinon, Chai)

<br>

## Requisitos pedidos

[ ] - Visualizar lista de tarefas, sendo possível reordená-la por ordem alfabética, data ou status;

[ ] - Inserir uma nova tarefa na lista;

[ ] - Remover uma tarefa na lista;

[ ] - Atualizar uma tarefa na lista;

[ ] - Deve ser possível editar o status da tarefa: pendente, em andamento ou pronta;


<br>

## Clonando o projeto

Copie e cole em seu terminal:

```
git clone git@github.com:Guiogomes/Tec-trybe.git && cd Tec-trybe
```

<br>

## Instalando Dependências

Front-end:
```bash
cd frontend/ && npm install
``` 

Back-end:
```bash
cd backend/ && npm install
``` 

<br>

## Executando aplicação
### Obs: por favor, siga a ordem proposta, para não ter possíveis erros de execução da aplicação.

  - separando em dois terminais faça os comando a seguir para rodar localmente a aplicação:
    - Iniciar o back-end:

      ```
      npm run dev
      ```
    
    - Iniciar o front-end:

      ```
      npm run start
      ```
<br>


## Executando Testes

* Para rodar todos os testes:

 - Back-end:

### Obs: É nescessario que a porta 3001 esteja livre para rodar o test do back-end, então o npm run dev não pode estar ativos. 
  
  ```
  cd backend/ && npm run test:dev
  ```

  Para conferir a cobertura de testes:

  ```
  cd backend && npm run test:coverage
  ```
  
  - Front-end:

  ```
  cd frontend/ && npm run test
  ```

  Para conferir a cobertura de testes:

  ```
  cd frontend && npm run test:coverage
  ```