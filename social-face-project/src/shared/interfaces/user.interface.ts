import { Roles } from "../enums/roles.enum";

export interface IUser {
    username: string;
    password: string;
    email: string;
    firstName: string;
    lastName: string;
    birthDate: Date
    notificationPreference: boolean;
    token?: string;
    role?: Roles;
}