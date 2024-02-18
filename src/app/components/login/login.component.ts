import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';

// import { AppComponent }  from './app.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;
  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void{
    this.loginForm = this.fb.group({
      userName: ['',Validators.required],
      password: ['',Validators.required]
    }) 
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type="Text" : this.type = "password";
  }

  onSubmit(){
    if(this.loginForm.valid){
      
      console.log(this.loginForm.value)

    }else{

      // console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")

    }
  }
}
