import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-authorization',
  templateUrl: './authorization.component.html',
  styleUrls: ['./authorization.component.css']
})
export class AuthorizationComponent implements OnInit {
  private _formState: boolean = true;
  constructor() { }

  ngOnInit(): void {
  }
  setForm(): void{
    this._formState = !this._formState;
  }

  get state(): boolean {
    return this._formState;
  }
}
