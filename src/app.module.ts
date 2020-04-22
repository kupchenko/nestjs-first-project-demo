import { Module } from '@nestjs/common';
import { UserModule } from './entity/user/user.module';
import { AuthModule } from './entity/auth/auth.module';
import { databaseProviders } from './database/database.providers';

@Module({
  imports: [UserModule, AuthModule, ...databaseProviders],
  controllers: [],
  providers: [],
})
export class AppModule {
}
