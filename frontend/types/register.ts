import { User } from "./user";

export interface Register {
    success: boolean,
    message: string,
    user: User
}