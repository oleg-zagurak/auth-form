import { Injectable } from '@angular/core';

import { UserDataService } from './../services/user-data.service';

import { init } from "./../../shared/mocks/users.mocks";

import { User } from './../interfaces/users/user';
import { UserAdmin } from './../interfaces/users/user-admin';
import { LoginFormI } from './../interfaces/form/login-form-i';

@Injectable({
  providedIn: 'root'
})
export class AuthorizationDataService {
  constructor(private userData: UserDataService) {
    init();
  }
  autorization(inData: LoginFormI): boolean {
    const { login, password } = inData;
    if (localStorage.getItem(login) !== null) {
      let userText: string = localStorage.getItem(login) || '{}';
      let user: User | UserAdmin = JSON.parse(userText);
      if (password === user.password) {
        this.userData.authorized = true;
        this.userData.data = user;
        return true;
      }
    }
    return false;
  }
  logOut(): void {
    this.userData.authorized = false;
    this.userData.data = null;
  }
}