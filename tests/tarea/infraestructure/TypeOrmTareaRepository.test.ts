import "reflect-metadata"
import "../../../src/app/dependency_injection";
import {initDB} from "../../../src/shared/infraestructure/TypeOrm/TypeOrmDataSource"
import {TypeOrmTareaRepository } from "../../../src/tarea/infraestructure/TypeOrmTareaRepository/TypeOrmTareaRepository"
import { describe, expect, it } from "vitest";
import { TareaMother } from "../domain/TareaMother";


const repository = new TypeOrmTareaRepository();

describe("TypeOrmTareaRepository", async () => {
    await initDB();

    it("debe almacenar una tarea", async () => {

        const tarea = TareaMother.random();
        await repository.save(tarea);
        const savedAndReturned = await repository.getById(tarea.getId());
        expect(tarea).toStrictEqual(savedAndReturned);
    })
})
