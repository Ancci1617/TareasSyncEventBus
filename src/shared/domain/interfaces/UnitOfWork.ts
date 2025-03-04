
export const UnitOfWork_INJECTION_TOKEN = "UnitOfWork";

export interface UnitOfWork{

    commit(): Promise<void>;
    rollback(): Promise<void>;
    isInTransaction(): boolean;
    beginTransaction(callback : () => unknown) : Promise<void>
    
}


