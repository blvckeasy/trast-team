import { Body, Controller, Get, Headers, Inject, Post, Res } from "@nestjs/common";
import { CreateUserDto } from "./dto";
import { UserService } from "./user.service";

@Controller("user")
export class UserController {
    constructor(
        private userService: UserService,
    ) {}

    @Post("create")
    async create(
        @Body() createUserDto: CreateUserDto,
    ) {
        const user = await this.userService.create(createUserDto);
        return user;
    }

    @Get()
    async get() {
        return this.userService.get();
    }
}
