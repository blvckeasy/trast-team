import { Model } from "mongoose";
import { HttpStatus, Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { SignInDto } from "./dto";
import { User } from "src/schemas";
import { I18nContext } from "nestjs-i18n";

@Injectable()
export class AuthService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async signin(signinDto: SignInDto, i18n: I18nContext) {
        const founded = await this.userModel.findOne(signinDto).exec();

        if (!founded) {
            const message = i18n.t("user.not_found");
            const reason = i18n.t("user.not_found_reason", {
                args: { username: signinDto.username }
            })

            throw new UnauthorizedException({message, reason, status: HttpStatus.NOT_FOUND});
        }

        return founded;
    }
}
