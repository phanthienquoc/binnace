import telegram from '../src/providers/telegram';
import { TELEGRAM } from '../constants/constants';
class IRepository {
  _database: any;
  _serviceName: string;

  constructor(public database?: any, serviceName: string = '') {
    this._database = database;
    this._serviceName = serviceName;
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `Initial <b>[${this._serviceName}]</b> ONLINE!!`
    );
  }
  public async get(id: string) {
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `${this._serviceName}\n ${JSON.stringify(id)}`
    );
    return this._database.get(id);
  }
  public async getItems(params: any) {
    return this._database.getItem(params);
  }
  public async create(item: any) {
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `${this._serviceName}\n ${JSON.stringify(item)}`
    );
    return this._database.create(item);
  }
  public async update(item: any) {
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `${this._serviceName}\n ${JSON.stringify(item)}`
    );
    return this._database.update(item);
  }
  public async delete(id: string) {
    telegram.sendChannel(
      TELEGRAM.CHANNEL.SERVICE.ID,
      `${this._serviceName}\n ${id}`
    );
    return this._database.delete(id);
  }
}

export default IRepository;
