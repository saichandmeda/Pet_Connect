import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-card-component',
  standalone: true,
  imports:[],
  templateUrl: './card.component.html',
  styleUrl: './card.component.scss'
})
export class CardComponent implements OnInit {
  @Input("config") config: any;
  public iconPath = "";
  constructor() {
    
  }

  ngOnInit(): void {
    console.log(this.config);
    this.iconPath = `../../../assets/Images/${this.config.icon}`;
  }

}