import { Component ,OnInit} from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NgToastService } from 'ng-angular-popup';
import { AuthService } from '../../services/auth.service';
import { PetShopService } from '../../services/pet-shop.service';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-home4',
  standalone: true,
  // imports: [CommonModule,MatRadioModule,FormsModule,ReactiveFormsModule, RouterOutlet,RouterModule,HttpClientModule],
  imports:[CommonModule],
  providers:[AuthService],
  templateUrl: './home4.component.html',
  styleUrl: './home4.component.scss'
})
export class Home4Component {

  constructor(private router:Router,private auth: AuthService,private auth2: PetShopService ,private toast: NgToastService) {}

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

  // search(event:any){
  //   this.searchTerm = (event.target as HTMLInputElement).value;
  //   console.log(this.searchTerm);
  //   this.cartService.search.next(this.searchTerm);
  // }


}
