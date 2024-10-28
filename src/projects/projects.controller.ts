import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
} from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/guards/roles.guard';
import { Roles } from '../auth/decorators/roles.decorator';
import { RequestWithUser } from '../auth/types/request-with-user.interface';

@Controller('projects')
@UseGuards(JwtAuthGuard, RolesGuard)
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Roles('ADMIN')
  @Post()
  async create(
    @Body() createProjectDto: CreateProjectDto,
    @Req() req: RequestWithUser,
  ) {
    return this.projectsService.create(createProjectDto, req.user);
  }

  @Roles('ADMIN', 'PROJECT_MANAGER', 'ENGINEER')
  @Get()
  async findAll(@Req() req: RequestWithUser) {
    return this.projectsService.findByUserRole(req.user);
  }

  @Roles('ADMIN', 'PROJECT_MANAGER')
  @Patch(':id')
  async update(
    @Param('id') id: number,
    @Body() updateData: Partial<CreateProjectDto>,
    @Req() req: RequestWithUser,
  ) {
    return this.projectsService.updateProject(id, updateData, req.user);
  }

  @Roles('ADMIN')
  @Delete(':id')
  async delete(@Param('id') id: number, @Req() req: RequestWithUser) {
    await this.projectsService.deleteProject(id, req.user);
  }
}
