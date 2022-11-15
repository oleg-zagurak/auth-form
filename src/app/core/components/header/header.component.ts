import { Component, OnInit } from '@angular/core';

import { UserDataService } from './../../services/user-data.service';
import { AuthorizationDataService } from '../../authentication/authorization-data.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  private _name: string = '';
  private _surname: string = '';
  constructor(userData:UserDataService, private authorization: AuthorizationDataService) {
    if(userData.user !== null){
      this._surname = userData.user.surname;
      this._name = userData.user.name;
    }
    if(userData.admin !== null){
      this._surname = '';
      this._name = userData.admin.login;
    }
   }

  ngOnInit(): void {
  }
  logOut():void{
    this.authorization.logOut();
  }

  get surname(): string{
    return this._surname
  }
  get name(): string{
    return this._name
  }
}
