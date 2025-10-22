import { User } from "../models/userModel";

export const getAllUsersService = async () => {
    const users = await User.find();
    return users;
};
