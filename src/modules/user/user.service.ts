import { Model } from "mongoose";
import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { User } from "../../schemas/user.schema";
import { CreateUserDto } from "./dto/create-user.dto";

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) {}

    async create(createUserDto: CreateUserDto): Promise<User> {
        const createdCat = new this.userModel(createUserDto);
        return createdCat.save();
    }

    async findAll(): Promise<User[]> {
        return await this.userModel.find().exec();
    }
}
