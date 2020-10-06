import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-approve-page',
  templateUrl: './approve-page.component.html',
  styleUrls: ['./approve-page.component.css']
})
export class ApprovePageComponent implements OnInit {
  menu = [
    {
      title: 'Approve Games',
      link: 'games'
    },
    {
      title: 'Approve Pay-In',
      link: 'pay-in'
    },
    {
      title: 'Approve Pay-Out',
      link: 'pay-out'
    }
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
