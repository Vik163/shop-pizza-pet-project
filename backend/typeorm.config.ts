import { DataSource } from 'typeorm';

export const myDataSource = new DataSource({
  type: 'mongodb',
  host: '127.0.0.1',
  port: 27017,
  database: 'storedb',
  synchronize: true,
  entities: [__dirname + '../**/*.entity.ts'],
  useUnifiedTopology: true,
  useNewUrlParser: true,
  // entities: [__dirname + './**/*.entity.ts'],
  // entities: [UsersEntity],
});
