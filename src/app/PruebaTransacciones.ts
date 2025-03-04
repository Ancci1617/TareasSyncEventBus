import { inject, singleton } from "tsyringe";
import { UserRepository, UserRepository_INJECTION_TOKEN } from "../user/domain/interfaces/UserRepository";
import { TareaRepository, TareaRepository_INJECTION_TOKEN } from "../tarea/domain/interfaces/TareaRepository";
import { Transactional } from "../shared/domain/decorators/Transactional";
import { User } from "../user/domain/User";
import { Tarea } from "../tarea/domain/Tarea";
import { UserId } from "../user/domain/value_objects/UserId";
import { SyncEventBus, SyncEventBus_INJECTION_TOKEN } from "../shared/domain/interfaces/SyncEventBus";

@singleton()
export class PruebaTransacciones{

    constructor(
        @inject(UserRepository_INJECTION_TOKEN)
        private userRepository : UserRepository,

        @inject(TareaRepository_INJECTION_TOKEN)
        private tareaRepository : TareaRepository,

        @inject(SyncEventBus_INJECTION_TOKEN)
        private syncEventBus : SyncEventBus
    ){

    }

    @Transactional
    async run(){
        const usuarioCreado = new User(new UserId("1"), "rodrigo")
        const tareaCreada = Tarea.crearTarea({
            fechaDeRealizacion : new Date("2025-02-02"),
            nombre : "Tarea por transaccion",
            user : new User(new UserId("1"), "rodrigo")
        });


        await this.userRepository.save(usuarioCreado);
        await this.tareaRepository.save(tareaCreada);
//        throw new Error("Probando transaccionesFallidas");
        await this.syncEventBus.publish(tareaCreada.pullEvents());
    }

}