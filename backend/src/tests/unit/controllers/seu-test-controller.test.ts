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

describe('Testing Controller methods', () => {
  describe('Testing CarsController methods', () => {
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
      
        it('Success create car', async () => {
          await toDoController.create(request as RequestIncrement<ToDo>, response as unknown as Response)
          expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(sucessToDoCreated)).to.be.true;
        });
      })

      describe('Error case', () => {
        describe('Testing catch', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(toDoService, 'create')
              .rejects();
          });
        
          after(()=>{
            (toDoService.create as sinon.SinonStub).restore();
          })
        
          it('Error create car', async () => {
            await toDoController.create(request as RequestIncrement<ToDo>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'internal Server Error' })).to.be.true;
          });
        });
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
        
          it('Error create car', async () => {
            await toDoController.create(request as RequestIncrement<ToDo>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Bad request' })).to.be.true;
          });
        });
        describe('Testing undefined return', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(toDoService, 'create')
              .resolves(undefined);
          });
        
          after(()=>{
            sinon.restore();
          });

          it('Returns undefined', async() => {
            await toDoController.create(request as RequestIncrement<Car>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(500)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'internal Server Error' })).to.be.true;
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
    
      it('Success read car', async () => {
        await toDoController.read(request, response);
        expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((response.json as sinon.SinonStub).calledWith([sucessToDoCreated])).to.be.true;
      });

    });

    describe('Testing update method', () => {
      describe('Error case', () => {
        describe('Testing invalid fields', () => {
          const response = {} as Response;
          const request = {} as RequestIncrement<ToDo>;
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
            .stub(toDoService, 'update')
            .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car with invalid fields', async () => {
            await toDoController.update(request as RequestIncrement<ToDo>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          });
        });
        
      });

    });

    describe('Testing delete method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(toDoService, 'deleteToDo')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error delete car', async () => {
            await toDoController.deleteTodo(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(toDoService, 'deleteToDo')
            .resolves(sucessToDoCreated as ToDo);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success delete car', async () => {
          await toDoController.deleteTodo(request, response);
          expect((response.status as sinon.SinonStub).calledWith(204)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(sucessToDoCreated)).to.be.true;
        });
      });

    });
  });

  describe('Testing MotorcycleController methods', () => {
    describe('testing get route method', () => {      
      it('route is equal a /motorcycles', () => {
        const route = motorcycleController.route;
        expect(route).to.be.equal('/motorcycles');
      })
    })
    describe('Testing create method', () => {
      const response = {} as Response;
      const request = {} as RequestIncrement<Motorcycle>;
      describe('Success case', () => {
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.body = motorcycleSuccessCreate;
          sinon
            .stub(motorcycleService, 'create')
            .resolves(motorcycleSuccessCreateReturn);
        });
      
        after(()=>{
          (motorcycleService.create as sinon.SinonStub).restore();
        })
      
        it('Success create motorcycle', async () => {
          await motorcycleController.create(request as RequestIncrement<Motorcycle>, response as unknown as Response)
          expect((response.status as sinon.SinonStub).calledWith(201)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(motorcycleSuccessCreateReturn)).to.be.true;
        });
      })

      describe('Error case', () => {
        describe('Testing invalid fields', () => {
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            sinon
              .stub(motorcycleService, 'create')
              .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error create motorcycle', async () => {
            await motorcycleController.create(request as RequestIncrement<Motorcycle>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Bad request' })).to.be.true;
          });
        });
        describe('Testing wrong category return', () => {
          const request = {} as RequestIncrement<Motorcycle>;
          const response = {} as Response;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.body = {
              ...motorcycleSuccessCreate,
              category: 'wrong' as categoryOption,
            }
            sinon
              .stub(motorcycleService, 'create')
              .resolves(undefined);
          });
        
          after(()=>{
            sinon.restore();
          });

          it('Returns a bad request status', async() => {
            await motorcycleController.create(request as RequestIncrement<Motorcycle>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          });
        });
      })

    });

    describe('Testing read method', () => {
      const response = {} as Response;
      const request = {} as Request;
      before(async () => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub();
        sinon
          .stub(motorcycleService, 'read')
          .resolves([motorcycleSuccessCreateReturn]);
      });
    
      after(()=>{
        (motorcycleService.read as sinon.SinonStub).restore();
      })
    
      it('Success read car', async () => {
        await motorcycleController.read(request, response);
        expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
        expect((response.json as sinon.SinonStub).calledWith([motorcycleSuccessCreateReturn])).to.be.true;
      });

    });

    describe('Testing readOne method', () => {
      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {          
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(motorcycleService, 'readOne')
            .resolves(motorcycleSuccessCreateReturn);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success readOne car', async () => {
          await motorcycleController.readOne(request, response);
          expect((response.status as sinon.SinonStub).calledWith(200)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(motorcycleSuccessCreateReturn)).to.be.true;
        });
      });

      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(motorcycleService, 'readOne')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car', async () => {
            await motorcycleController.readOne(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

    });

    describe('Testing update method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(motorcycleService, 'readOne')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car', async () => {
            await motorcycleController.readOne(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });

        describe('Testing invalid fields', () => {
          const response = {} as Response;
          const request = {} as RequestIncrement<Motorcycle>;
          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
            .stub(motorcycleService, 'update')
            .resolves({ error: new ZodError([]) });
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error readOne car with invalid fields', async () => {
            await motorcycleController.update(request as RequestIncrement<Motorcycle>, response as unknown as Response)
            expect((response.status as sinon.SinonStub).calledWith(400)).to.be.true;
          });
        });
        
      });

    });

    describe('Testing delete method', () => {
      describe('Error case', () => {
        describe('Testing invalid id', () => {
          const response = {} as Response;
          const request = {} as Request;

          before(async () => {
            response.status = sinon.stub().returns(response);
            response.json = sinon.stub();
            request.params = { id: new Types.ObjectId().toString() };
            sinon
              .stub(motorcycleService, 'delete')
              .resolves(null);
          });
        
          after(()=>{
            sinon.restore();
          })
        
          it('Error delete car', async () => {
            await motorcycleController.delete(request, response);
            expect((response.status as sinon.SinonStub).calledWith(404)).to.be.true;
            expect((response.json as sinon.SinonStub).calledWith({ error: 'Object not found' })).to.be.true;
          });
        });
      });

      describe('Success case', () => {
        const response = {} as Response;
        const request = {} as Request;
        before(async () => {
          response.status = sinon.stub().returns(response);
          response.json = sinon.stub();
          request.params = { id: new Types.ObjectId().toString() };
          sinon
            .stub(motorcycleService, 'delete')
            .resolves(motorcycleSuccessCreateReturn);
        });
      
        after(()=>{
          sinon.restore();
        })
      
        it('Success delete car', async () => {
          await motorcycleController.delete(request, response);
          expect((response.status as sinon.SinonStub).calledWith(204)).to.be.true;
          expect((response.json as sinon.SinonStub).calledWith(motorcycleSuccessCreateReturn)).to.be.true;
        });
      });

    });
  });
});