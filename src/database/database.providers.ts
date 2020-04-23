import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '../entity/user/user.entity';

export const databaseProviders = [
  SequelizeModule.forRoot({
    dialect: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'root',
    password: 'root',
    database: 'test',
    models: [User],
    synchronize: true,
  }),
];
