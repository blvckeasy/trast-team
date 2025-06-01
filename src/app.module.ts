import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { UserController } from "./modules/user/user.controller";
import { UserModule } from "./modules/user/user.module";
import { AuthController } from "./modules/auth/auth.controller";
import { AuthService } from "./modules/auth/auth.service";
import { AuthModule } from "./modules/auth/auth.module";
import { AcceptLanguageResolver, I18nModule, QueryResolver } from "nestjs-i18n";
import { join } from "path";

@Module({
    imports: [
        I18nModule.forRoot({
            fallbackLanguage: "uz",
            loaderOptions: {
                path: join(__dirname, "../src/i18n/"),
                watch: true,
            },
            resolvers: [
                { use: QueryResolver, options: ["lang", "locale"] },
                AcceptLanguageResolver,
            ],
        }),
        MongooseModule.forRoot("mongodb://localhost/trast-team"),
        AuthModule,
        UserModule,
    ],
    controllers: [UserController, AuthController],
    providers: [AuthService],
})
export class AppModule {}
