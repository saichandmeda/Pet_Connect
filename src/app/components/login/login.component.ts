import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup'
import { NgToastModule } from 'ng-angular-popup'

// import { AppComponent }  from './app.component';
// import { BrowserModule } from '@angular/platform-browser';
// import { NgModule } from '@angular/core';
// import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,RouterOutlet, RouterModule, ReactiveFormsModule, HttpClientModule ],
  providers: [ AuthService ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})

export class LoginComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router, private toast: NgToastService ) { }

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

  onLogin(){
    if(this.loginForm.valid){
      
      console.log(this.loginForm.value)
      this.auth.login(this.loginForm.value)
      .subscribe({
        next:(res)=>{
          // alert(res.message)
          this.auth.storeToken(res.token);
          this.auth.storeUserId(res.id);
          this.auth.storeUserName(this.loginForm.value.userName)
          this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
          this.loginForm.reset();
          this.router.navigate(['home2']);
        },
        error:(err)=>{
          // alert(err?.error.message)
          this.toast.error({detail:"ERROR", summary:"Something went wrong!", duration:5000});
        }
      })

    }else{

      // console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.loginForm);
      alert("Your form is invalid")

    }
  }
}
