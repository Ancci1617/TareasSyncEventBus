import { inject, singleton } from "tsyringe";
import { TareaRepository, TareaRepository_INJECTION_TOKEN } from "../domain/interfaces/TareaRepository";
import { Tarea } from "../domain/Tarea";
import { UserId } from "../../user/domain/value_objects/UserId";
import { SyncEventBus, SyncEventBus_INJECTION_TOKEN } from "../../shared/domain/interfaces/SyncEventBus";
import { UserRepository, UserRepository_INJECTION_TOKEN } from "../../user/domain/interfaces/UserRepository";

@singleton()
export class GenerarTarea{


    constructor(
        @inject(TareaRepository_INJECTION_TOKEN)
        private tareaRepository : TareaRepository,
        
        @inject(SyncEventBus_INJECTION_TOKEN)
        private syncEventBus : SyncEventBus,

        @inject(UserRepository_INJECTION_TOKEN)
        private userRepository : UserRepository
    ){

    }
    async run(params : {
        fechaString : string,
        nombre : string
    }){

        const userId = new UserId("primerId");
        
        const user = await this.userRepository.getById(userId);
        if(!user) throw new Error("Usuario no encontrado");
        
        
        const tareaCreada = Tarea.crearTarea({
            user,
            fechaDeRealizacion : new Date(params.fechaString),
            nombre : params.nombre
        })
        
        await this.tareaRepository.save(tareaCreada);
        await this.syncEventBus.publish(tareaCreada.pullEvents());
    }

}