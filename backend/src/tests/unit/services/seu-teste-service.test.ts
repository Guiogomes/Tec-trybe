import { ZodError } from 'zod';
import * as sinon from 'sinon';
import { expect } from 'chai';
import ToDoModel from '../../../database/models/ToDo';
import ToDoService from '../../../services/ToDo';
import { ToDo, ToDoSchema } from '../../../interfaces/ToDoInterface';
import { errorToDoCreated, sucessToDoCreated } from './mocks';
import ServiceError from '../../../interfaces/ServiceErrors';

const toDoModel = new ToDoModel();
const toDoService = new ToDoService(toDoModel);

describe('Testing ToDo Service methods', () => {
  describe('Testing create method', () => {    
    describe('Failure create method case', () => {
      before(() => {
        sinon
          .stub(ToDoSchema, 'safeParse')
          .resolves(new ZodError([]));
      })
  
      after(() => {
        (ToDoSchema.safeParse as sinon.SinonStub).restore();
      })
      it('Pass a invalid object returns an error', async () => {
        const parsed = await toDoService.create(errorToDoCreated as any);
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
      });
    });

    describe('Success create method case', () => {      
      before(async () => {
        sinon
          .stub(toDoService, 'create')
          .resolves(sucessToDoCreated as ToDo);
      });

      after(() => {
        (toDoService.create as sinon.SinonStub).restore();
      })
      it('Pass a valid object returns a success', async () => {
        const created = await toDoService.create(sucessToDoCreated as ToDo);
        expect(created).to.be.an('object');
        expect(created).to.have.property('_id');
      });
    });
  });

  describe('Testing read method', () => {
    describe('Success read method case', () => {
      before(() => {
        sinon
          .stub(toDoModel, 'read')
          .resolves([sucessToDoCreated] as ToDo[]);
      });

      after(() => {
        (toDoModel.read as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const read = await toDoService.read();
        expect(read).to.be.an('array');
        expect(read).to.have.lengthOf(1);
      });
    });
  });

  describe('Testing update method', () => {
    describe('Failure update method case', () => {
      it('Pass a invalid object returns an error', async () => {
        const parsed = ToDoSchema.safeParse(errorToDoCreated) as ServiceError;
        expect(parsed).to.be.an('object');
        expect(parsed).to.have.property('error');
        expect(parsed.error.issues).to.be.an('array');
      })
    });

    describe('Success update method case', () => {
      before(() => {
        sinon
          .stub(toDoModel, 'update')
          .resolves(sucessToDoCreated as ToDo);
      });

      after(() => {
        (toDoModel.update as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const toUpdate = {
          status: sucessToDoCreated.status,
          description: sucessToDoCreated.description,
          dueDate: sucessToDoCreated.dueDate,
          title: sucessToDoCreated.title,
        };
        const updated = await toDoService.update(sucessToDoCreated._id.toString(), toUpdate as ToDo);
        expect(updated).to.be.an('object');
        expect(updated).to.have.property('_id');
      });
    });
  });

  describe('Testing delete method', () => {
    describe('Failure delete method case', () => {
      before(() => {
        sinon
          .stub(toDoModel, 'delete')
          .rejects(new Error('Error'));
      });

      after(() => {
        (toDoModel.delete as sinon.SinonStub).restore();
      })

      it('Pass a invalid object returns an error', async () => {
        try {
          await toDoService.deleteToDo('');
        } catch (error) {
          expect(error).to.be.an('error');
        }
      });
    });

    describe('Success delete method case', () => {
      before(() => {
        sinon
          .stub(toDoModel, 'delete')
          .resolves(sucessToDoCreated as ToDo);
      });

      after(() => {
        (toDoModel.delete as sinon.SinonStub).restore();
      })

      it('Pass a valid object returns a success', async () => {
        const deleted = await toDoService.deleteToDo(sucessToDoCreated._id.toString());
        expect(deleted).to.be.an('object');
        expect(deleted).to.have.property('_id');
      });
    });
  })
});
