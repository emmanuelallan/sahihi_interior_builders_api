import { forwardRef, Module } from '@nestjs/common';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { CustomersModule } from '../customers/customers.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [
    UsersModule,
    forwardRef(() => ProjectsModule),
    CustomersModule,
    AuthModule,
  ],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}
