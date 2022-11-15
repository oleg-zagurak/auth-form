import { User } from "./../../core/interfaces/users/user";
import { UserAdmin } from "./../../core/interfaces/users/user-admin";

import { BLOGS } from "./blogs.mocks";

const USERS: Array<User> = [
    {
        login: 'Vilan',
        password: '123456Ab',
        name: 'Ivan',
        surname: 'Ivanov',
        email: 'Ivanov@gmail.com',
        sex: 'male',
        id: 1
    },
    {
        login: 'Luci',
        password: '123456Da',
        name: 'Victoriya',
        surname: 'Ivanova',
        email: 'Ivanova@gmail.com',
        sex: 'female',
        id: 2
    }
];
const ADMIN: UserAdmin = {
    login: 'admin',
    password: 'admin',
    isAdmin: true,
    id: 0
}
export function init(): void {
    USERS.forEach(user => {
        if (!localStorage.getItem(user.login)) {
            localStorage.setItem(user.login, JSON.stringify(user))
        }
        if(user.id){
            localStorage.setItem('id', JSON.stringify(user.id))
        }
    })
    if(!localStorage.getItem('blogs')) localStorage.setItem('blogs', JSON.stringify(BLOGS));
    if(!localStorage.getItem(ADMIN.login)) localStorage.setItem(ADMIN.login, JSON.stringify(ADMIN));
}