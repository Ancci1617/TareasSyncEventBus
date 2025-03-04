import { container } from "tsyringe"
import {SyncEventBus,SyncEventBus_INJECTION_TOKEN} from "../domain/interfaces/SyncEventBus"
import {UnitOfWork,UnitOfWork_INJECTION_TOKEN} from "../domain/interfaces/UnitOfWork"
import {MapSyncEventBus} from "./MapSyncEventBus/MapSyncEventBus";
import { AsyncLocalStorageUnitOfWork } from "./AsyncLocalStorageUnitOfWork/AsyncLocalStorageUnitOfWork";

container.registerSingleton<SyncEventBus>(SyncEventBus_INJECTION_TOKEN,MapSyncEventBus);

container.registerSingleton<UnitOfWork>(UnitOfWork_INJECTION_TOKEN,AsyncLocalStorageUnitOfWork);