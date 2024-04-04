import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule, } from '@angular/material/button';
import { MatCommonModule, } from '@angular/material/core';
import { MatInputModule, } from '@angular/material/input';
import { MatFormFieldModule, } from '@angular/material/form-field';
import { GridDialogComponent } from '../grid-dialog/grid-dialog.component';
import { MatRadioModule } from '@angular/material/radio';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute, Router, RouterModule, RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { CommonModule } from '@angular/common';
import { NgToastService } from 'ng-angular-popup'
import { HttpClientModule } from '@angular/common/http';
import { NgToastModule } from 'ng-angular-popup'
import { AppointmentListComponent } from '../appointment-list/appointment-list.component';
// import { PickerInteractionMode } from 'igniteui-angular';



// import { ExampleDialogComponent } from './example-dialog'; 

@Component({
  selector: 'app-home3',
  standalone: true,
  imports: [CommonModule,MatRadioModule,FormsModule,ReactiveFormsModule, RouterOutlet,RouterModule,HttpClientModule ],
  providers:[AuthService],
  templateUrl: './home3.component.html',
  styleUrl: './home3.component.scss'
})
export class Home3Component {

  
  appointmentForm!: FormGroup;
  
  startTime:string="";
  isReadOnly:boolean=false;


  appointmentHospital:any = "";
  appointdisable: boolean = false;

  constructor(public dialog: MatDialog,private fb: FormBuilder, private router:Router,private auth: AuthService,private toast: NgToastService) {}

  ngOnInit(): void{
    this.appointmentForm = this.fb.group({
      Name: ['',Validators.required],
      MobileNo: ['',Validators.required],
      City: ['',Validators.required],
      PetAge: ['',Validators.required],
      PetClinic: ['',Validators.required],
      FirstVisit: ['',Validators.required],
      AppointmentDate: ['',Validators.required],
      AppointmentTime: ['',Validators.required],
      Narration: ['',Validators.required],
      Gender:['',Validators.required]
    }) 
  }

  openDialog() {

    let dialogRef = this.dialog.open(GridDialogComponent, {
      height: '500px',width: '800px',
      // data: { name: "Sai", animal: "Tiger" } 
      data : {
        onSelection: (name:string)=> this.setHospital(name)
      }
    });
  }


  openDialog2() {

    let dialogRef = this.dialog.open(AppointmentListComponent, {
      height: '500px',width: '500px',
      // data: { name: "Sai", animal: "Tiger" } 
      // data : {
      //   onSelection: (name:string)=> this.setHospital(name)
      // }
    });
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

  logOut(){
    
    this.auth.signOut();
    
  }
  // navigateToRoute(route: string) {
  //   this.router.navigate([route]);
  // }

  setHospital(name: string) {
    console.log(name);
    this.appointmentHospital = name;
    this.appointmentForm.patchValue({PetClinic: name})
    // this.appointmentForm.setValue()
    // this.appointdisable = true;
  }

  bookAppointment(){
    // this.appointmentHospital = name;
    // this.appointmentForm.patchValue({Veterinary: name})
    if(this.appointmentForm.valid){
      this.auth.bookAppointment(this.appointmentForm.value)
      .subscribe({
        next:(res)=>{
          // alert(res.message)
          this.toast.success({detail:"SUCCESS", summary:res.message, duration:5000});
          console.log(res);
          this.appointmentForm.reset();
          // this.router.navigate(['home3']);
        },
        error:(err)=>{
          alert(err?.error.message)  
          // this.toast.error({detail:"ERROR", summary:err?.error.message, duration:5000});
        }
      })

      // console.log(this.signUpForm.value)

    }else{

      // console.log("Form is not valid");
      ValidateForm.validateAllFormFields(this.appointmentForm);
      alert("Your form is invalid")

    }
  }

}
