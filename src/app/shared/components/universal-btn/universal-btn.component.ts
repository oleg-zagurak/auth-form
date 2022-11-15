import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-universal-btn',
  template: `
    <button [disabled]="disabledBtn" type="button">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./universal-btn.component.css']
})
export class UniversalBtnComponent implements OnInit {
  @Input('disable') disabledBtn: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
