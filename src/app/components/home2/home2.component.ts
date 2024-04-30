import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { Home2Component } from './home2.component';
import { RouterModule, Routes } from '@angular/router';
// import { Home2Component } from './home2.component.ts';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import ValidateForm from '../../helpers/validateform';
import { BrowserModule } from '@angular/platform-browser';
import { CardComponent } from '../card/card.component';
import { AuthService } from '../../services/auth.service';
// import { UiComponentsModule } from 'src/shared/ui-components/ui-components.module';

@Component({
  selector: 'app-home2',
  standalone: true,
  imports: [CommonModule, RouterOutlet, ReactiveFormsModule, CardComponent],
  providers: [ AuthService ],
  templateUrl: './home2.component.html',
  styleUrl: './home2.component.scss'
})
export class Home2Component {

    public cardConfig:any = [
      {
        icon : "PetShop.jpg",
        route: "home4"
        // name : "Pet Shop",
        // route: "../createauction"
        // route: "../../components2/home3/home3.component"
      },
      {
        icon : "PetCare.jpg",
        // name: "Pet Health",
        route: "home3"
      },
      {
        icon : "PetAdopt.jpg",
        route: "home5"
        // name: "Pet Forum",
        // route: "../settings"
      },
      {
        icon: "PetForum.jpg",
        route: "post"
        // name: "Pet Adoption",
        // route: "../createauction"
      }
     
    ];


    constructor(private router: Router,private auth: AuthService, private route: ActivatedRoute)
    {
      // console.log("Hello pet");
    }

    logOut(){
     
      this.auth.signOut();
      
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

    navigateToRoute(route: string) {
      this.router.navigate([route]);
    }

    onItemClicked(route: string) {
      // this.router.navigate([{outlets: { buyerHome : [route]}}], { skipLocationChange: true});
    }
}