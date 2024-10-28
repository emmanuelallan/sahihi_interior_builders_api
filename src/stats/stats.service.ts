import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { ProjectsService } from '../projects/projects.service';
import { CustomerService } from '../customers/customers.service';
import { StatDto } from './dto/stats.dto';

@Injectable()
export class StatsService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly userService: UsersService,
    private readonly projectService: ProjectsService,
    private readonly customerService: CustomerService,
  ) {}

  async getStats(): Promise<StatDto[]> {
    const [activeProjects, totalUsers, totalCustomers, totalLeads] =
      await Promise.all([
        this.projectService.countActiveProjects(),
        this.userService.countTotalUsers(),
        this.customerService.countTotalCustomers(),
        this.customerService.countLeads(),
      ]);

    return [
      { label: 'Active Projects', value: activeProjects },
      { label: 'Total Users', value: totalUsers },
      { label: 'Total Customers', value: totalCustomers },
      { label: 'New Leads', value: totalLeads },
    ];
  }
}
