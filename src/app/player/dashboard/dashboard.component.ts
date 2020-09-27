import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  template: `
    <div class="container">
      <div class="row">
          <div class="col-lg-4 col-md-6">
              <app-show-balance></app-show-balance>
          </div>
      </div>
  </div>
  `,
  styles: []
})
export class DashboardComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
