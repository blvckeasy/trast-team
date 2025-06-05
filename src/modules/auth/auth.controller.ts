import { Body, Controller, Headers, Inject, Post, Res } from "@nestjs/common";
import { SignInDto } from "./dto/signin.dto";
import { AuthService } from "./auth.service";
import { I18n, I18nContext } from "nestjs-i18n";
import { JwtService } from "@nestjs/jwt";
import { CACHE_MANAGER } from "@nestjs/cache-manager";
import { Response } from "express";
import { Cache } from "cache-manager";
import { v4 as uuidv4 } from 'uuid';

@Controller("auth")
export class AuthController {
    constructor(
        @Inject(CACHE_MANAGER) private cacheManager: Cache,
        private authService: AuthService,
        private jwtService: JwtService,
    ) {}

    @Post("signin")
    async signin(
        @Headers() headers: Headers, 
        @Body() signinDto: SignInDto, 
        @I18n() i18n: I18nContext,
        @Res({ passthrough: true }) response: Response,
    ) {
        const user = await this.authService.signin(signinDto, i18n);

        const userAgent = headers['user-agent'];

        const tokenUUID = uuidv4();

        const token = await this.jwtService.signAsync({ userId: user._id, userAgent, tokenUUID }, {
            secret: "THIS IS SECRET KEY"
        })

        response.cookie('tokenUUID', tokenUUID);

        return {
            data: {
                user,
                token,
            },
            message: i18n.t("user.found")
        }
    }
}
