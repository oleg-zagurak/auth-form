import { Injectable } from '@angular/core';

import { User } from './../interfaces/users/user'

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor() { }
  register(user: User): void {
    try{
      let id: number = this.getNewUserId();
      user.id = id;
      localStorage.setItem(user.login, JSON.stringify(user));
    } catch(e) {
      console.log(e);
    }
  }
  searchDuplicate(login: string): boolean {
    let state: boolean = true;
    try{
      state = !!localStorage.getItem(login);
    } catch(e){
      console.log(e);
    }
    return state;
  }
  private getNewUserId(): number{
    let currentIdValue: string | null = localStorage.getItem('id');
    let idNum: number = 0;
    if(typeof currentIdValue === 'string') idNum = +currentIdValue;
    localStorage.setItem('id', `${idNum + 1}`);
    return idNum + 1;
  }
}
