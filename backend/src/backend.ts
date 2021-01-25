import { api } from '../../api/api';
import { Log } from '../../api/models';
import { sayHiController } from './controllers/greetings.controller';
import { createLogController, deleteLogController, getLogController, getLogsController } from './controllers/logs.controller';
import { handleRequest } from './framework/http/request';
import { resolver } from './framework/ioc/resolver';
import { Controller, Repository } from './framework/models';
import { SpreadsheetRepository } from './repositories/spreadsheet.repository';

export default {
  handleRequest: handleRequest
}

export const controllers = resolver({
  sayHi: (): Controller<typeof api.sayHi.payloadType> => sayHiController,
  getLogs: (): Controller<typeof api.getLogs.payloadType> => getLogsController,
  getLog: (): Controller<typeof api.getLog.payloadType> => getLogController,
  createLog: (): Controller<typeof api.createLog.payloadType> => createLogController,
  deleteLog: (): Controller<typeof api.deleteLog.payloadType> => deleteLogController,
});

export const services = resolver({});

export const repositories = resolver({
  logs: (): Repository<Log> => new SpreadsheetRepository<Log>('1KQ_V8pdqrELD2o01xEY4wvaEPYBcdpvVMLouMJXh3HY', 'logs')
});

export const validators = resolver({});