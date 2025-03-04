import { UserId } from "./value_objects/UserId";

export class User{

    constructor(
        readonly userId : UserId,
        readonly nombreDeUsuario : string,
    ){}
    getId(){
        return this.userId
    }

    toPrimitives(){
        return {
            userId : this.userId.getValue(),
            nombreDeUsuario : this.nombreDeUsuario
        }
    }

}