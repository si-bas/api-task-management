import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class TaskListDto {
    @IsNotEmpty()
    @IsNumber()
    userId: number;

    @IsOptional()
    @IsNumber()
    projectId: number;
}