import { Tarea } from "../Tarea";
import { TareaId } from "../value_objects/TareaId";

export const TareaRepository_INJECTION_TOKEN = "TareaRepository";

export interface TareaRepository {

    save(tarea: Tarea): Promise<void>;
    
    getById(tareaId : TareaId) : Promise<Tarea | null>;
    
}