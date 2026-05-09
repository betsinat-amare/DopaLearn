import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthorizationModule } from './modules/authorization/authorization.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [AuthorizationModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
