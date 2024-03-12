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
        // name : "Pet Shop",
        // route: "../createauction"
      },
      {
        icon : "PetCare.jpg",
        // name: "Pet Health",
        // route: "../createauction"
      },
      {
        icon: "PetForum.jpg",
        // name: "Pet Adoption",
        // route: "../createauction"
      },
      {
        icon : "PetAdopt.jpg",
        // name: "Pet Forum",
        // route: "../settings"
      }
    ];


    constructor(private router: Router,private auth: AuthService, private route: ActivatedRoute)
    {
      // console.log("Hello pet");
    }

    logOut(){
      debugger
      this.auth.signOut();
      debugger
    }

    navigateToRoute(route: string) {
      // this.router.navigate([route]);
    }

    onItemClicked(route: string) {
      // this.router.navigate([{outlets: { buyerHome : [route]}}], { skipLocationChange: true});
    }
}