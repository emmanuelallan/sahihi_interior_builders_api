import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Project } from './project.entity';
import { CreateProjectDto } from './dto/create-project.dto';
import { User } from '../users/user.entity';

@Injectable()
export class ProjectsService {
  constructor(
    @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>,
  ) {}

  async create(
    createProjectDto: CreateProjectDto,
    createdBy: User,
  ): Promise<Project> {
    const project = this.projectRepository.create({
      ...createProjectDto,
      created_by: createdBy,
    });
    await this.projectRepository.save(project);

    return this.findOne(project.id);
  }

  async findByUserRole(user: User): Promise<Project[]> {
    if (user.role.name === 'ADMIN') {
      return this.projectRepository.find({
        relations: ['created_by', 'project_manager', 'engineer'],
      });
    } else if (user.role.name === 'PROJECT_MANAGER') {
      return this.projectRepository.find({
        where: { project_manager: user },
        relations: ['created_by', 'project_manager', 'engineer'],
      });
    } else if (user.role.name === 'ENGINEER') {
      return this.projectRepository.find({
        where: { engineer: user },
        relations: ['created_by', 'project_manager', 'engineer'],
      });
    }
    return [];
  }

  async updateProject(
    id: number,
    updateData: Partial<CreateProjectDto>,
    user: User,
  ): Promise<Project> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);

    // Check role-based permissions
    if (
      user.role.name === 'ADMIN' ||
      (user.role.name === 'PROJECT_MANAGER' &&
        project.project_manager.id === user.id)
    ) {
      Object.assign(project, updateData);
      return await this.projectRepository.save(project);
    } else {
      throw new NotFoundException(
        `You do not have permissions to edit this project`,
      );
    }
  }

  async deleteProject(id: number, user: User): Promise<void> {
    const project = await this.projectRepository.findOne({ where: { id } });
    if (!project)
      throw new NotFoundException(`Project with ID ${id} not found`);

    if (user.role.name === 'ADMIN') {
      await this.projectRepository.remove(project);
    } else {
      throw new NotFoundException(
        `You do not have permissions to delete this project`,
      );
    }
  }

  async findOne(id: number): Promise<Project> {
    const project = await this.projectRepository.findOne({
      where: { id },
      relations: ['created_by', 'project_manager', 'engineer'],
    });

    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }

    return project;
  }

  async countActiveProjects(): Promise<number> {
    return this.projectRepository.count();
  }
}
