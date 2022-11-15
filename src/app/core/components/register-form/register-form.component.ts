import { Component, EventEmitter, OnInit, Output } from '@angular/core';

import { User } from './../../interfaces/users/user';
import { RegFormElI } from './../../interfaces/form/reg-form-el-i';

import { RegistrationService } from './../../authentication/registration.service';

@Component({
  selector: 'app-register-form',
  templateUrl: './register-form.component.html',
  styleUrls: ['./register-form.component.css']
})
export class RegisterFormComponent implements OnInit {
  @Output('showLoginForm') formState: EventEmitter<void> = new EventEmitter<void>();
  private _passwordCopy: boolean = false;
  private _pswdTouched: boolean = false;
  private _login: boolean = false;
  private _quiz: { [index: string]: boolean } = {
    name: false,
    surname: false,
    login: false,
    password: false
  };
  constructor(private registration: RegistrationService) { }

  ngOnInit(): void {
  }
  close() {
    this.formState.emit();
  }
  validation(items: HTMLFormControlsCollection, userData: User): void {
    let nameState: boolean = false;
    let passwordState: boolean = false;
    let emailState: boolean = false;
    let elements: RegFormElI = this.getOrder(items);
    const { name, surname, login, password, password2, email } = elements;

    this.checkEmpty(elements);
    this.registration.searchDuplicate(login.value) ? this._login = true : this._login = false;

    nameState = this.validateNames([name, surname, login])
    passwordState = this.validatePass(password, password2);
    emailState = this.validateEmail(email);
    console.log(nameState, passwordState, emailState, !this._passwordCopy, !this._login)
    if (nameState && passwordState && emailState && !this._passwordCopy && !this._login) {
      this.registration.register(userData);
      this.close();
    }
    this._pswdTouched = false;
  }
  private getOrder(items: HTMLFormControlsCollection): RegFormElI {
    let elements: RegFormElI = {};
    for (let i = 0; i < items.length - 1; i++) {
      let elem = <HTMLInputElement>items[i];
      if (elem.tagName === 'INPUT' && elem.type !== 'radio') {
        elements[elem.name] = elem;
      }
    }
    return elements;
  }
  private checkEmpty(elements: RegFormElI): boolean {
    let status: boolean = true;
    for (const key in elements) {
      if (Object.prototype.hasOwnProperty.call(elements, key)) {
        if (elements[key].value === '' && elements[key].type !== 'email') {
          elements[key].dataset['empty'] = 'invalid';
          status = false;
        } else if (elements[key].value !== '' && elements[key].type !== 'email') {
          elements[key].dataset['empty'] = '';
        }
      }
    }
    return status;
  }

  private validateNames(elements: HTMLInputElement[]): boolean {
    let pattern: RegExp = /^[a-zA-Z]{3,20}$/i;
    let status!: boolean;
    elements.forEach(element => {
      if (element.value) {
        if (!element.value.match(pattern)) {
          element.dataset['invalid'] = 'invalid';
          status = false;
        } else if (element.value.match(pattern)) {
          element.dataset['invalid'] = '';
          status = true;
        }
      } else {
        status = false;
        element.dataset['invalid'] = '';
      }
    })
    return status;
  }
  private validatePass(origin: HTMLInputElement, twin: HTMLInputElement): boolean {
    let pattern: RegExp = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[a-z])[A-Za-z0-9]{3,20}$/;
    let status!: boolean;
    if (origin.value) {
      if (!pattern.test(origin.value)) {
        origin.dataset['invalid'] = 'invalid';
        status = false;
      } else if (pattern.test(origin.value)) {
        origin.dataset['invalid'] = '';
        status = true;
      }
    } else {
      status = false;
      origin.dataset['invalid'] = '';
    }
    if(!twin.value) this._passwordCopy = false;
    return status;
  }
  private validateEmail(element: HTMLInputElement): boolean {
    let pattern: RegExp = /[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    let status: boolean = true;
    if (element.value !== '' && !pattern.test(element.value)) {
      element.dataset['invalid'] = 'invalid';
      status = false;
    } else if (element.value !== '' && pattern.test(element.value)) {
      element.dataset['invalid'] = '';
      status = true;
    } else {
      element.dataset['invalid'] = '';
    }
    return status;
  }
  setQuiz(item: HTMLInputElement, blur: boolean = false): void {
    let value: string = item.value;
    let name: string = item.name;
    if (value === '') {
      this._quiz[name] = true;
    } else {
      this._quiz[name] = false;
    }
    if (blur) {
      this._quiz[name] = false;
    }
  }
  pswdConfirm(original: string, twin: string): void {
    if (twin !== '' && !this._pswdTouched) {
      this._pswdTouched = true;
    }
    if (this._pswdTouched) {
      twin !== original ? this._passwordCopy = true : this._passwordCopy = false;
    }
  }
  get loginTwin(): boolean {
    return this._login
  }
  get passwordCopy(): boolean {
    return this._passwordCopy
  }
  get quiz(): { [index: string]: boolean } {
    return this._quiz;
  }
}
