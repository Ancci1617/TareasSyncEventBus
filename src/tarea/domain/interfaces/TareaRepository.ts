import { Tarea } from "../Tarea";

export const TareaRepository_INJECTION_TOKEN = "TareaRepository";

export interface TareaRepository {

    save(tarea: Tarea): Promise<void>;
    

    
}