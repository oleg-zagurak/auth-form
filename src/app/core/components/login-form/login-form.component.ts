import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { AuthorizationDataService } from './../../authentication/authorization-data.service';
import { LoginFormI } from './../../interfaces/form/login-form-i';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.css']
})
export class LoginFormComponent implements OnInit {
  @Output('showRegisterForm') changeEvent: EventEmitter<void> = new EventEmitter<void>();
  public status: boolean = false;
  public logField: boolean = false;
  public passField: boolean = false;
  constructor(private authorizationData: AuthorizationDataService) { }

  ngOnInit(): void {
  }
  clearFields(inputs: HTMLFormElement): void {
    let items = inputs.elements;
    for (let i: number = 0; i < inputs.length; i++) {
      if (items[i].tagName === 'INPUT') {
        let item = <HTMLInputElement>items[i];
        item.value = '';
      }
    }
  }
  autorization(data: LoginFormI, form: HTMLFormElement): void {
    this.clearFieldStatus();
    const { login, password } = data;
    if (login === '' && password !== '') this.logField = true;
    if (login !== '' && password === '') this.passField = true;
    if (!this.logField && !this.passField) {
      let success: boolean = this.authorizationData.autorization(data);
      if (!success) {
        this.clearFieldStatus(true);
        this.clearFields(form);
      }
    }
  }
  clearFieldStatus(state: boolean = false): void {
    if (!state) {
      this.logField = this.passField = this.status = false;
    } else {
      this.logField = this.passField = this.status = true;
    }
  }
  changeFieldStatus(item: HTMLInputElement): void {
    if (item.classList.contains('wrong') && item.value !== '') {
      if (item.getAttribute('name') === 'login') {
        this.logField = false;
      } else {
        this.passField = false;
      }
    }
  }
  close(): void{
    this.changeEvent.emit();
  }
}
