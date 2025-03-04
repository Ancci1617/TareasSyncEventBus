import { EntitySchema } from "typeorm";
import { User } from "../../domain/User";
import { UserId } from "../../domain/value_objects/UserId";

export const UserSchema = new EntitySchema<User>({
    name : "User",
    target : User,
    tableName : "user",
    columns : {
        userId : {
            type : String,
            primary : true,
            nullable : false,
            transformer : {
                from : (value : string) => new UserId(value),
                to : (value : UserId) => value.value
            }
        },
        nombreDeUsuario : {
            type : String,
            nullable : false, 
        },
        
    }


})