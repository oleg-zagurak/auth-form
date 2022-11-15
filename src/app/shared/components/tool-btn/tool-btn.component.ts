import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-tool-btn',
  template: `
    <button [disabled]="disabledBtn">
      <ng-content></ng-content>
    </button>
  `,
  styleUrls: ['./tool-btn.component.css']
})
export class ToolBtnComponent implements OnInit {
  @Input('disable') disabledBtn: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

}
