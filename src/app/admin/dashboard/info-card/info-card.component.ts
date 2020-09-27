import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-info-card',
  templateUrl: './info-card.component.html',
  styleUrls: ['./info-card.component.css']
})
export class InfoCardComponent implements OnInit {
  @Input('stat') stat: number;
  @Input('description') description: string;
  @Input('classes') classes: string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
