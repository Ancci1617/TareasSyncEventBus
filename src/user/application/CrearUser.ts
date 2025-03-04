import { inject, singleton } from "tsyringe";
import { UserRepository, UserRepository_INJECTION_TOKEN } from "../domain/interfaces/UserRepository";
import { User } from "../domain/User";
import { UserId } from "../domain/value_objects/UserId";

@singleton()
export class CrearUser{

    constructor(
        @inject(UserRepository_INJECTION_TOKEN)
        private userRepository : UserRepository
    ){

    }

    async run(){

        await this.userRepository.save(new User(new UserId("primerId"), "rodrigo"));
    }

}