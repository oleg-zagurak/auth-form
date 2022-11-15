import { Blog } from './../blog';

export interface User {
    login: string,
    password: string,
    name: string,
    surname: string,
    email: string,
    sex: string,
    id?: number
}