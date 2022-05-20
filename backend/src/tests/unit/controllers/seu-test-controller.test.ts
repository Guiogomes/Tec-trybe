// template para criação dos testes de cobertura da camada de controller

import { Response, Request } from 'express';
import * as sinon from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import ToDoController, { ResponseError } from '../../../../src/controllers/ToDo';
import RequestIncrement, { RequestWithId } from '../../../interfaces/RequestIncrement';
import { ZodError } from 'zod';
import ToDoService from '../../../services/ToDo';
import { ToDo } from '../../../interfaces/ToDoInterface';
import { sucessToDoCreated } from './mocks';
import { Types } from 'mongoose';

const toDoService = new ToDoService();
const toDoController = new ToDoController(toDoService);

chai.use(chaiHttp);
const { expect } = chai;


describe('Testing ToDoController methods', () => {
  describe('testing get route method', () => {      
    it('route is equal a /cars', () => {
      const route = toDoController.route;
      expect(route).to.be.equal('/todos');
    })
  })
  describe('Testing create method', () => {
    const response = {} as Response;
    const request = {} as RequestIncrement<ToDo>;
    describe('Success case', () => {
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
        sinon
          .stub(toDoService, 'create')
          .resolves(sucessToDoCreated as ToDo);
      });
    
      after(()=>{
        (toDoService.create as sinon.SinonStub).restore();
      })
    
      it('Success create toDo', async () => {
        await toDoController.create(request as RequestIncrement<ToDo>, response as unknown as Response)
        expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
        expect((response.json as sinon.SinonStub).calledWith(sucessToDoCreated)).to.be.true;
      });
    })

    describe('Error case', () => {
      describe('Testing invalid fields', () => {
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          sinon
            .stub(toDoService, 'create')
            .resolves({ error: new ZodError([]) });
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Error create toDo', async () => {
          await toDoController.create(request as RequestIncrement<ToDo>, response as unknown as Response)
          expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith({ error: 'Bad request' })).to.be.true;
        });
      });
    })

  });

  describe('Testing read method', () => {
    const response = {} as Response;
    const request = {} as Request;
    before(async () => {
      const toCreate = {
        status: sucessToDoCreated.status,
        description: sucessToDoCreated.description,
        dueDate: sucessToDoCreated.dueDate,
        title: sucessToDoCreated.title,
      };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub();
      sinon
        .stub(toDoService, 'read')
        .resolves([toCreate] as ToDo[]);
    });
  
    after(()=>{
      (toDoService.read as sinon.SinonStub).restore();
    })
  
    it('Success read toDo', async () => {
      await toDoController.read(request, response);
      expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
    });

  });
});
