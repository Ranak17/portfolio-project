export interface User {
    username: string;
    displayName: string;
    token: string;
    iamge?: string;
}

export interface UserFormValues {
    email: string;
    password: string;
    displayName?: string;
    username?: string;

}