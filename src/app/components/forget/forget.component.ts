import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

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
constructor(private router: Router) { }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type="Text" : this.type = "password";
  }

  home(){
    const localData = localStorage.getItem('token');
    if (localData != null) {
      this.router.navigateByUrl('/home2')
      return true;
    } else {
      this.router.navigateByUrl('/home')
      // alert("Please Login First")
      return false;
    }
  }

}