import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from './users/users.module';
import { BattlesModule } from './battles/battles.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/devcamp'),
    UsersModule,
    BattlesModule,
  ],
})
export class AppModule {}
