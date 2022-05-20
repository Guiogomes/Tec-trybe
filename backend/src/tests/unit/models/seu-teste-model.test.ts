import { expect } from 'chai';
import mongoose, { Model } from 'mongoose';
import * as sinon from 'sinon';
import { Types } from 'mongoose';
import ToDoController from '../../../controllers/ToDo';
import ToDoModel from '../../../database/models/ToDo';
import { sucessToDoCreated } from './mocks';
import { ToDo } from '../../../interfaces/ToDoInterface';

enum statusOptions {
  pendente = 'Pendente',
  concluido = 'Concluido',
  emAndamento = 'Em andamento',
}

const todoSucess = {
  _id: new Types.ObjectId(),
  description: 'Descrição da tarefa 1',
  dueDate: new Date('2020-01-01'),
  title: 'Tarefa 1',
  status: statusOptions.pendente,
}

const toDoModel = new ToDoModel();

describe('Testings for model layer car', () => {
  before(async () => {
    sinon.stub(mongoose, 'connect').resolves();  
  });

  after(() => {
    (mongoose.connect as sinon.SinonStub).restore();
  });

  describe('Testing read method on car', () => {
    before(async () => {
      sinon.stub(mongoose.Model, 'find').resolves([todoSucess]);
    });
  
    after(() => {
      (mongoose.Model.find as sinon.SinonStub).restore();
    });
  
    it('should return all records', async () => {
      const result = await toDoModel.read();
      expect(result).to.be.an('array');
      expect(result).to.have.lengthOf(1);
    });
  })

  describe('Testing readOne method on car', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOne').resolves(todoSucess);
    });
  
    after(() => {
      (mongoose.Model.findOne as sinon.SinonStub).restore();
    });
  
    it('should return one record', async () => {
      const result = await toDoModel.readOne(todoSucess._id.toString());
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
    });
  })

  describe('Testing create method on car', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'create').resolves(todoSucess);
    });
  
    after(async () => {
      (mongoose.Model.create as sinon.SinonStub).restore();
    });
  
    it('should create a record', async () => {
      const toCreate = {
        status: sucessToDoCreated.status,
        description: sucessToDoCreated.description,
        dueDate: sucessToDoCreated.dueDate,
        title: sucessToDoCreated.title,
      };
      const result = await toDoModel.create(toCreate as ToDo);
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
    });
  });

  describe('Testing update method on car', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndUpdate').resolves(todoSucess);
    });
  
    after(async () => {
      (mongoose.Model.findOneAndUpdate as sinon.SinonStub).restore();
    });
  
    it('should update a record', async () => {
      const toUpdate = {
        status: sucessToDoCreated.status,
        description: sucessToDoCreated.description,
        dueDate: sucessToDoCreated.dueDate,
        title: sucessToDoCreated.title,
      };
      const result = await toDoModel.update(sucessToDoCreated._id.toString(), toUpdate as ToDo);
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
    });
  });

  describe('Testing delete method on car', () => {
    before(() => {
      sinon.stub(mongoose.Model, 'findOneAndDelete').resolves(todoSucess);
    });
  
    after(async () => {
      (mongoose.Model.findOneAndDelete as sinon.SinonStub).restore();
    });
  
    it('should delete a record', async () => {
      const result = await toDoModel.delete(sucessToDoCreated._id.toString());
      expect(result).to.be.an('object');
      expect(result).to.have.property('_id');
    });
  });
});

