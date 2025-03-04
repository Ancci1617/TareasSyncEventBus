import { ESTADO_DE_TAREA } from "../../tarea/domain/Tarea";

export class TareaDetalle{

    constructor(
        readonly creadoPor : {
            id : string,
            nombre : string
        },
        readonly estadoDeTarea : ESTADO_DE_TAREA,
        readonly fechaDeCreacion : string,
        readonly nombre : string,
        readonly fechaDeRealizacion : string,
        readonly tareaId : string
    ){}




}