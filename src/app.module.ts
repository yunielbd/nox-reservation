import { Module } from '@nestjs/common';
import { CommonModule } from './common/common.module';
import { DatabaseModule } from './database/database.module';
import { EnvModule } from './env/env.module';
import { ClientsModule } from 'clients/clients.module';

@Module({
  imports: [ClientsModule, CommonModule, DatabaseModule, EnvModule],
})
export class AppModule {}
