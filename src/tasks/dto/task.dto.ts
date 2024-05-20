import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskProrityEnum } from "src/shared/constants";

export class UpdateTaskDto {
    @IsString()
    @IsOptional()
    title?: string

    @IsString()
    @IsOptional()
    description?: string

    @IsString()
    @IsOptional()
    category?: string

    @IsString()
    @IsOptional()
    status?: string

    @IsString()
    @IsOptional()
    priority?: TaskProrityEnum

    @IsString()
    @IsOptional()
    attachment?: string

    @IsString()
    @IsOptional()
    dueDate?: string
}

export class CreateTaskDto {
    @IsString()
    @IsNotEmpty()
    title: string

    @IsString()
    @IsNotEmpty()
    description: string

    @IsString()
    @IsNotEmpty()
    category: string

    @IsString()
    @IsNotEmpty()
    status: string

    @IsString()
    @IsNotEmpty()
    priority: TaskProrityEnum

    @IsString()
    @IsOptional()
    attachment?: string

    @IsString()
    @IsNotEmpty()
    dueDate: string
}
