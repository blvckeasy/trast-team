import { IsOptional, IsString } from "class-validator";

export class CreateUserDto {
    @IsString()
    first_name: string;

    @IsString()
    last_name: string;

    @IsString()
    username: string;

    @IsString()
    password: string;

    @IsOptional()
    profile_image?: string;
}
