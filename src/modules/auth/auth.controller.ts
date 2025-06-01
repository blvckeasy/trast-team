import { Body, Controller, Post } from "@nestjs/common";
import { SignInDto } from "./dto/singin.dto";
import { AuthService } from "./auth.service";
import { I18n, I18nContext } from "nestjs-i18n";

@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post("signin")
    async signin(@Body() signinDto: SignInDto, @I18n() i18n: I18nContext) {
        return this.authService.signin(signinDto, i18n);
    }
}
