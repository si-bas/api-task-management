import { Injectable, NotFoundException } from '@nestjs/common';
import { UserRepository } from 'src/auth/repositories/user.repository';
import { ProjectCreateDto } from '../dto/project-create.dto';
import { ProjectDeleteDto } from '../dto/project-delete.dto';
import { ProjectUpdateDto } from '../dto/project-update.dto';
import { ProjectEntity } from '../entities/project.entity';
import { ProjectRepository } from '../repositories/project.repository';

@Injectable()
export class ProjectService {
  constructor(
    private readonly projectRepository: ProjectRepository,
    private readonly userRepository: UserRepository,
  ) {}

  /**
   * Create new project
   */
  public async create(projectCreate: ProjectCreateDto): Promise<ProjectEntity> {
    const { userId } = projectCreate;

    const user = await this.userRepository.findOne(userId);
    if (!user) throw new NotFoundException('User not found!');

    const project = await this.projectRepository.create({
      ...projectCreate,
      user,
    });
    await project.save();

    return project;
  }

  /**
   * Update existing project
   */
  public async update(projectUpdate: ProjectUpdateDto): Promise<ProjectEntity> {
    const { id } = projectUpdate;

    const project = await this.projectRepository.findOne(id);
    if (!project) throw new NotFoundException('Project not found!');

    for (const key in projectUpdate) {
      if (
        Object.prototype.hasOwnProperty.call(projectUpdate, key) &&
        key !== 'id'
      ) {
        project[key] = projectUpdate[key];
      }
    }

    project.save();

    return project;
  }

  /**
   * Delete existing project
   */
  public async softDelete(projectDelete: ProjectDeleteDto): Promise<string> {
    const { id } = projectDelete;

    const project = await this.projectRepository.findOne(id);
    if (!project) throw new NotFoundException('Project not found!');

    await this.projectRepository.softRemove(project);

    return 'Project deleted successfully';
  }
}
