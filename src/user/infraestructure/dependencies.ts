
import { container } from "tsyringe"
import {UserRepository,UserRepository_INJECTION_TOKEN} from "../domain/interfaces/UserRepository"
import {TypeOrmUserRepository} from "../infraestructure/TypeOrmUserRepository/TypeOrmUserRepository";
container.register<UserRepository>(UserRepository_INJECTION_TOKEN,TypeOrmUserRepository);