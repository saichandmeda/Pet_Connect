import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { AuthService } from '../../services/auth.service';
import { HttpClientModule } from '@angular/common/http'; 
import { Router } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule, HttpClientModule],
  providers: [ AuthService ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signUpForm!: FormGroup;
  constructor(private fb: FormBuilder, private auth: AuthService, private router:Router,private toast: NgToastService ) { }

  ngOnInit(): void{
    this.signUpForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',Validators.required],
      // role: ['',Validators.required],
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


  onSignUp(){
    if(this.signUpForm.valid){
      
      
      this.auth.signUp(this.signUpForm.value)

      .subscribe({
        next:(res)=>{
          // alert(res.message)
          this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
          this.signUpForm.reset();
          this.router.navigate(['login']);
        },
        error:(err)=>{
          alert(err?.error.message)  
        }
      })

      // console.log(this.signUpForm.value)

    }else{

      // console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.signUpForm);
      alert("Your form is invalid")

    }
  }







  // onSignup(){
  //   if(this.signUpForm.valid){
  //     this.auth.signUp(this.signUpForm.value)
  //     .subscribe({
  //       next:(res=>{
  //         alert(res.message)
  //       })
  //       ,error:(err=>{
  //         alert(err?.error.message)
  //       })
  //     })
  //     console.log(this.signUpForm.value)


  //   }else{

  //     // console.log("Form is not valid");
  //     ValidateForm.validateAllFormFields(this.signUpForm);
  //     alert("Your form is invalid")

  //   }
  // }


}
