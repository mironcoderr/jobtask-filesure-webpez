import { User } from "./user";

export interface Login {
    success: boolean,
    message: string,
    token: string,
    user: User
}