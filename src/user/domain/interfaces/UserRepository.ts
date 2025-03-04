import { User } from "../User"
import { UserId } from "../value_objects/UserId"

export const UserRepository_INJECTION_TOKEN = 'UserRepository'
export interface UserRepository {
    save(user: User): Promise<void>
    getById(userId: UserId): Promise<User | null>
}