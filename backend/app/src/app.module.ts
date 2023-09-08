import { Module, forwardRef } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    forwardRef(() => ProfileModule),
    forwardRef(() => AuthModule),
    PrismaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
