import { Component, DoCheck } from '@angular/core';

import { UserDataService } from './core/services/user-data.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements DoCheck {
  public authorized!: boolean;
  constructor(private dataService: UserDataService){
    this.authorized = dataService.authorized;
  }
  ngDoCheck(): void {
    this.authorized = this.dataService.authorized;
  }

}
