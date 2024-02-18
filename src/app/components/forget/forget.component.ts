import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-forget',
  standalone: true,
  imports: [CommonModule,RouterOutlet],
  templateUrl: './forget.component.html',
  styleUrl: './forget.component.scss'
})
export class ForgetComponent {

type: string = "password";
isText: boolean = false;
eyeIcon: string = "fa-eye-slash";
constructor() { }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type="Text" : this.type = "password";
  }

}