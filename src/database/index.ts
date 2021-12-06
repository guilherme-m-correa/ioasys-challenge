import { getConnectionOptions, createConnection } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export default class Database {
  static async connect() {
    const connectionOptions = await getConnectionOptions();

    Object.assign(connectionOptions, {
      namingStrategy: new SnakeNamingStrategy(),
    });

    await createConnection();
  }
}
