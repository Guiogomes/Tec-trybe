# # Contexto
Teste Técnico da IK Solution. Foi desenvolvido um CRUD/Agenda eletrônica, onde é possivel adicionar, remover, editar e deletar.

## Técnologias usadas

Front-end:
  - JavaScript
  - React.js

Back-end:
  - JavaScript
  - Node.js(MSC)
  - Express
  - MySql(ORM - Sequelize)
  - Tests(Mocha, Sinon, Chai)

<br>

## Requisitos pedidos

[ ] - Acessar tela com relação de compromissos contendo os campos: Nome, Data, Hora e Título da atividade;

[ ] - Acessar tela de cadastro que permita inclusão de uma tarefa;

[ ] - Acessar tela que permita edição dos dados relacionados a tarefa;

[ ] - Criar tela de exclusão da tarefa;

<br>

## Clonando o projeto

Copie e cole em seu terminal:

```
git clone git@github.com:Guiogomes/agenda-eletronica.git && cd agenda-eletronica/app
```

<br>

## Instalando Dependências

Front-end:
```bash
cd front-end/ && npm install
``` 

Back-end:
```bash
cd back-end/ && npm install
``` 

<br>

## Executando aplicação
### Obs: executar os comandos a partir da raiz do projeto (pasta app)
### Obs 2: por favor, siga a ordem proposta, para não ter possíveis erros de execução da aplicação.

  - O comando instalara as dependências de front-end e back-end:

  **npm run start** 

  - separando em dois terminais faça os comando a seguir para rodar localmente a aplicação:
    - Iniciar o back-end:

      ```
      npm run start-application-back-end
      ```
    
    - Iniciar o front-end:

      ```
      npm run start-application-front-end
      ```
<br>


## Executando Testes

* Para rodar todos os testes:

 - Back-end:

  É nescessario que a porta 3001 esteja livre para rodar o test do back-end, então o npm start não pode estar ativos. 
  
  ```
  cd backend/ && npm test
  ```

  Para conferir a cobertura de testes:

  ```
  cd backend && npm run test:coverage
  ```
  
