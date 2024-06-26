import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { BrowserModule } from '@angular/platform-browser';




@Component({
    selector: 'app-home',
    standalone: true,
    imports: [CommonModule,RouterOutlet, ReactiveFormsModule ],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss'
  })
  
  export class HomeComponent {
    constructor(private fb: FormBuilder,private router: Router ) { }

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