import { Injectable, Logger } from '@nestjs/common';
import { UsersService } from './users.service';
import { RolesService } from '../roles/roles.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AdminSeedService {
  private readonly logger = new Logger(AdminSeedService.name);

  constructor(
    private readonly usersService: UsersService,
    private readonly rolesService: RolesService,
  ) {}

  async seedAdminUser() {
    const adminRole = await this.rolesService.createRoleIfNotExists('ADMIN');

    const existingAdmin =
      await this.usersService.findByEmail('admin@sahihi.com');
    if (existingAdmin) {
      this.logger.log('Admin user already exists');
      return;
    }

    const hashedPassword = await bcrypt.hash('Admin123!', 10);
    console.log(hashedPassword);

    await this.usersService.createUser({
      first_name: 'System',
      last_name: 'Admin',
      email: 'admin@example.com',
      password_hash: hashedPassword,
      phone_number: '1234567890',
      kra_pin: 'AJ90783928193H',
      role: adminRole.name,
    });

    this.logger.log('Admin user created with email admin@example.com');
  }
}
