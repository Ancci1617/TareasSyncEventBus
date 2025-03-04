import { EntitySchema } from "typeorm";
import { TypeOrmRepository } from "../../../shared/infraestructure/TypeOrm/TypeOrmRepository";
import { User } from "../../domain/User";
import { UserSchema } from "./UserSchema";
import { UserRepository } from "../../domain/interfaces/UserRepository";
import { UserId } from "../../domain/value_objects/UserId";


export class TypeOrmUserRepository extends TypeOrmRepository<User> implements UserRepository{
    
    entitySchema(): EntitySchema<User> {
        return UserSchema;
    }
    
    async getById(userId: UserId): Promise<User | null> {
        const user = await this.repository().findOne({where : {userId}});
        return user;
    }

    async save(user: User): Promise<void> {
        await this.repository().save(user);
    }
    

}