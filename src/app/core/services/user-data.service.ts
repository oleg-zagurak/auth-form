import { Injectable } from '@angular/core';

import { User } from './../../core/interfaces/users/user';
import { UserAdmin } from './../../core/interfaces/users/user-admin';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {
  private _authorized: boolean = false;
  private _user!: User | null;
  private _admin!: UserAdmin | null;
  private _id!: number;
  private _userName!: string;
  private _isAdmin!: boolean;
  constructor() { }
  set data(user: User | UserAdmin | null) {
    this.setDefaultValue();
    if (user !== null && 'isAdmin' in user) {
      if (user.id !== undefined) this._id = user.id;
      this._admin = user;
      this._isAdmin = user.isAdmin;
      this._user = null;
      this._userName = user.login;
    }
    if (user !== null && !('isAdmin' in user)) {
      this._user = user;
      if (user.id !== undefined) this._id = user.id;
      this._userName = user.login;
      this._admin = null;
    }
    if(user === null){
      this._admin = this._user = null;
    }
  }
  private setDefaultValue(): void{
    this._id = -1;
    this._isAdmin = false;
    this._userName = '';
  }
  get user(): User | null {
    if(this._user !== null) return this._user;
    return null;
  }
  get admin(): UserAdmin | null {
    if(this._admin !== null) return this._admin;
    return null;
  }
  set authorized(state: boolean) {
    this._authorized = state;
  }
  get authorized(): boolean {
    return this._authorized;
  }
  get id(): number{
    return this._id
  }
  get userName(): string{
    return this._userName;
  }
  get isAdmin(): boolean{
    return this._isAdmin
  }
}
