import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule,RouterOutlet, ReactiveFormsModule],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.scss'
})

export class SignupComponent {

  type: string = "password";
  isText: boolean = false;
  eyeIcon: string = "fa-eye-slash";
  signupForm!: FormGroup;
  constructor(private fb: FormBuilder ) { }

  ngOnInit(): void{
    this.signupForm = this.fb.group({
      firstName: ['',Validators.required],
      lastName: ['',Validators.required],
      userName: ['',Validators.required],
      email: ['',Validators.required],
      password: ['',Validators.required]
    }) 
  }

  hideShowPass(){
    this.isText = !this.isText;
    this.isText ? this.eyeIcon = "fa-eye" : this.eyeIcon = "fa-eye-slash";
    this.isText ? this.type="Text" : this.type = "password";
  }

      
      console.log(this.signupForm.value)

    }else{

      // console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.signupForm);
      alert("Your form is invalid")

    }
  }


}
