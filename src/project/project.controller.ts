import {
  Body,
  Controller,
  Delete,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ProjectCreateDto } from './dto/project-create.dto';
import { ProjectDeleteDto } from './dto/project-delete.dto';
import { ProjectUpdateDto } from './dto/project-update.dto';
import { ProjectResponseInterface } from './interfaces/project-response.interface';
import { ProjectService } from './services/project.service';

@Controller('project')
@UseGuards(AuthGuard())
export class ProjectController {
  constructor(private readonly projectService: ProjectService) {}

  @Post('create')
  async create(
    @Body() projectCreate: ProjectCreateDto,
  ): Promise<ProjectResponseInterface> {
    const project = await this.projectService.create(projectCreate);

    return {
      statusCode: 201,
      data: project,
    };
  }

  @Patch('update')
  async update(
    @Body() projectUpdate: ProjectUpdateDto,
  ): Promise<ProjectResponseInterface> {
    const project = await this.projectService.update(projectUpdate);

    return {
      statusCode: 201,
      data: project,
    };
  }

  @Delete('delete')
  async delete(@Body() projectDelete: ProjectDeleteDto): Promise<any> {
    const message = await this.projectService.softDelete(projectDelete);

    return {
      statusCode: 200,
      message,
    };
  }
}
