import { container } from "tsyringe";
import {UnitOfWork, UnitOfWork_INJECTION_TOKEN} from "../interfaces/UnitOfWork"

export function Transactional(
    target: any, propertyKey: string, descriptor: PropertyDescriptor
) {

    const metodoOriginal = descriptor.value!;

    descriptor.value = async function (...args : any[]){
        const unitOfWork = container.resolve<UnitOfWork>(UnitOfWork_INJECTION_TOKEN);

        if(unitOfWork.isInTransaction()){
            await metodoOriginal.call(this,...args);
            return;
        } 
        console.log("POR INICIAR TRANSACCION")
        await unitOfWork.beginTransaction(async () => {

            try {               
                await metodoOriginal.call(this,...args);
                await unitOfWork.commit();
            } catch (error) {
                console.log(error);
                await unitOfWork.rollback();
                throw error;
            }
        })

    }


}
