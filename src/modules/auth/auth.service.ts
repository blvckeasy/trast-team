import { Model } from "mongoose";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SignInDto } from "./dto/singin.dto";
import { User } from "src/schemas/user.schema";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async signin(singinDto: SignInDto, i18n: I18nContext) {
        const founded = await this.userModel.findOne(singinDto).exec();

        if (!founded) {
            throw new UnauthorizedException(i18n.t("common.user_not_found"));
        }

        return founded;
    }
}
