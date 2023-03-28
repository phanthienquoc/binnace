import MongoDB from '../../providers/mongodb';

class Dababase {
  constructor() {}
  public static async initialize(): Promise<Dababase> {
    let instance = new Dababase();
    try {
      instance = await MongoDB.initialize();
    } catch (error) {}

    return instance;
  }
}

export default Dababase;
