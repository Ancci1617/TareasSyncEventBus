import { EntityId } from "../../../shared/domain/EntityId";
import { v4 as uuid } from "uuid";
export class UserId extends EntityId {
  constructor(value: string) {
    super(value);
  }
  getValue() {
    return this.value;
  }
  static create(){
    return new UserId(uuid());
  }
}
