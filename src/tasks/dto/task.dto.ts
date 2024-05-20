import { IsNotEmpty, IsOptional, IsString } from "class-validator";
import { TaskProrityEnum } from "src/shared/constants";

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
