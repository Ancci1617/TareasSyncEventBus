import { TareaDetalle } from "../TareaDetalle";

export const TareaDetalleRepository_INJECTION_TOKEN = "TareaDetalleRepository"
export interface TareaDetalleRepository {
    
    save(tareaDetalle: TareaDetalle): Promise<void>;

    getAll() : Promise<Array<TareaDetalle>>

    getById(tareaId : string) : Promise<TareaDetalle | null>

}   

