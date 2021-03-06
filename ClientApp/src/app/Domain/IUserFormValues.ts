export interface IUserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;
}

export interface IUser {
    id: string;
    username: string;
    displayName: string;
    token: string;
}